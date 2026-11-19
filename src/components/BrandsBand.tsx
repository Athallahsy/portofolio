"use client";

import { useEffect, useRef, useState } from "react";
import { MARQUEE_STACK } from "@/data/portfolioData";

/**
 * Standalone tilted newsprint marquee ribbon placed directly between
 * `#portafolio` (z-4) and `#skills` (z-5) at `z-index: 30` so it rides
 * upward across the seam above both layers without getting covered by `#skills`.
 */
export default function BrandsBand() {
  const wrapRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { rootMargin: "100px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const repeatedMarquee = [...MARQUEE_STACK, ...MARQUEE_STACK, ...MARQUEE_STACK];

  return (
    <section
      ref={wrapRef}
      aria-label="Tech stack marquee"
      className="relative z-30 overflow-hidden -mt-[14px] -mb-[18px] py-3.5 sm:py-4 paper-sheet border-y-4 border-[#0b0d12] rotate-[2deg] scale-[1.04]"
      style={{
        boxShadow: "0 14px 30px -10px rgba(0, 0, 0, 0.72)",
      }}
    >
      <div
        className="animate-strike-marquee-reverse flex items-center"
        style={{ animationPlayState: inView ? "running" : "paused" }}
      >
        {repeatedMarquee.map((tech, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-6 px-5 font-sign text-sm sm:text-base text-[#0b0d12] whitespace-nowrap"
          >
            <span>{tech}</span>
            <span
              aria-hidden="true"
              className="inline-block w-2.5 h-2.5 bg-[#0b0d12] rotate-45"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
