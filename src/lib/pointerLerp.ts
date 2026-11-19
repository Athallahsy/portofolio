// Shared high-frequency pointer normalization & 0.08 lerp loop (zero React re-renders)

type PointerListener = (wx: number, wy: number, rawX: number, rawY: number) => void;

class PointerLerpEngine {
  private targetX = 0;
  private targetY = 0;
  private rawClientX = 0;
  private rawClientY = 0;
  private currentX = 0;
  private currentY = 0;
  private rafId: number | null = null;
  private initialized = false;
  private listeners = new Set<PointerListener>();

  private canTrack(): boolean {
    if (typeof window === "undefined") return false;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return fine && !reduced;
  }

  private ensureInit() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;
    this.rawClientX = window.innerWidth * 0.7;
    this.rawClientY = window.innerHeight * 0.3;

    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
  }

  private onPointerMove = (e: PointerEvent) => {
    if (!this.canTrack()) return;
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    this.targetX = e.clientX / w - 0.5;
    this.targetY = e.clientY / h - 0.5;
    this.rawClientX = e.clientX;
    this.rawClientY = e.clientY;
    this.schedule();
  };

  private schedule() {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  }

  private tick = () => {
    this.rafId = null;
    this.currentX += (this.targetX - this.currentX) * 0.08;
    this.currentY += (this.targetY - this.currentY) * 0.08;

    this.listeners.forEach((fn) =>
      fn(this.currentX, this.currentY, this.rawClientX, this.rawClientY),
    );

    if (
      Math.abs(this.targetX - this.currentX) > 0.001 ||
      Math.abs(this.targetY - this.currentY) > 0.001
    ) {
      this.schedule();
    }
  };

  subscribe(fn: PointerListener): () => void {
    this.ensureInit();
    this.listeners.add(fn);
    // Emit initial state immediately
    fn(this.currentX, this.currentY, this.rawClientX, this.rawClientY);
    return () => {
      this.listeners.delete(fn);
    };
  }
}

export const pointerLerp = new PointerLerpEngine();
