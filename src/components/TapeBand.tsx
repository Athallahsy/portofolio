"use client";

import { useEffect, useRef, useState } from "react";

const HERO_TAPE_ITEMS = [
  "LARAVEL 12",
  "CODEIGNITER 4",
  "REACT & NEXT.JS",
  "FLUTTER ANDROID",
  "GEMINI API & VISION",
  "WHATSAPP BUSINESS API",
  "WEBHOOK & HMAC",
  "GSAP & THREE.JS",
  "LCP 23.1S -> 3.6S",
  "BANJARBARU -> BANDUNG",
];

/**
 * Standalone tilted yellow caution-tape marquee placed between `#inicio` (z-1)
 * and `#previa` (z-2) at `z-index: 30` so it seals the seam cleanly just like strike.uno.
 */
export default function TapeBand() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

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

  const tapeLoop = [...HERO_TAPE_ITEMS, ...HERO_TAPE_ITEMS, ...HERO_TAPE_ITEMS];

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative z-30 overflow-hidden -mt-[18px] -mb-[10px] bg-[#e9ff2e] text-[#0b0d12] border-y-4 border-[#0b0d12] -rotate-[2deg] scale-[1.04]"
      style={{
        boxShadow: "0 14px 30px -10px rgba(0, 0, 0, 0.72)",
      }}
    >
      <div
        className="animate-strike-marquee flex items-center"
        style={{ animationPlayState: inView ? "running" : "paused" }}
      >
        {tapeLoop.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center px-[22px] py-3 font-sign text-lg sm:text-[20px] whitespace-nowrap"
          >
            <span>{item}</span>
            <span
              aria-hidden="true"
              className="inline-block w-3 h-3 ml-11 bg-[#0b0d12] rotate-45 -translate-y-0.5"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
