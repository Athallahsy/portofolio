// Batched scroll animation loop: performs all DOM geometry reads first,
// then all style/transform writes in a single rAF callback (zero layout thrashing).

type ReadFn = (scrollY: number, vh: number, maxScroll: number) => void;
type WriteFn = () => void;

interface ScrollTask {
  read: ReadFn;
  write: WriteFn;
}

class ScrollEngine {
  private tasks = new Set<ScrollTask>();
  private rafId: number | null = null;
  private initialized = false;

  private ensureInit() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;
    window.addEventListener("scroll", this.schedule, { passive: true });
    window.addEventListener("resize", this.schedule, { passive: true });
  }

  private schedule = () => {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(this.flush);
    }
  };

  private flush = () => {
    this.rafId = null;
    const sy = window.scrollY;
    const vh = window.innerHeight || 1;
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - vh,
    );

    // Phase 1: Batch all DOM reads
    this.tasks.forEach((t) => t.read(sy, vh, maxScroll));
    // Phase 2: Batch all DOM writes
    this.tasks.forEach((t) => t.write());
  };

  subscribe(task: ScrollTask): () => void {
    this.ensureInit();
    this.tasks.add(task);
    // Run initial measure cleanly on next frame
    this.schedule();
    return () => {
      this.tasks.delete(task);
    };
  }
}

export const scrollEngine = new ScrollEngine();
