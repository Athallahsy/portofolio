"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: "480px" }}
    >
      <div
        className="px-4 py-2 border text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      >
        LOADING 3D BADGE...
      </div>
    </div>
  ),
});

export default function LanyardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [startEntrance, setStartEntrance] = useState(false);
  const [shouldMountLanyard, setShouldMountLanyard] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lanyardObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMountLanyard(true);
          lanyardObserver.disconnect();
        }
      },
      { rootMargin: "120px 0px" },
    );
    lanyardObserver.observe(section);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      once: true,
      onEnter: () => setStartEntrance(true),
    });

    return () => {
      lanyardObserver.disconnect();
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full border-b"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        borderColor: "var(--border)",
      }}
    >
      {/* 12-Column Architectural Grid with 1-Col Left/Right Gutters */}
      <div className="grid grid-cols-4 md:grid-cols-12">
        <div
          className="col-span-4 md:col-span-10 md:col-start-2 md:border-x"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Section Header Row */}
          <div
            className="border-b px-6 md:px-10 pt-16 md:pt-28 pb-8 md:pb-10"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="block text-[11px] font-bold uppercase tracking-[0.18em] opacity-70 mb-2">
              THE
            </span>
            <h2
              className="font-display font-bold lowercase m-0"
              style={{
                fontSize: "clamp(3rem, 7vw, 6.2rem)",
                lineHeight: 0.86,
                letterSpacing: "-0.06em",
              }}
            >
              developer.
            </h2>
          </div>

          {/* 2-Column Content Split: Bio (Left) + 3D Interactive Lanyard (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-10">
            {/* Left Column: Editorial Bio + Specs + CTA */}
            <div
              className="lg:col-span-5 border-b lg:border-b-0 lg:border-r p-6 md:p-10 flex flex-col justify-between gap-10"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex flex-col gap-5">
                <p
                  className="font-display text-lg md:text-xl font-medium leading-relaxed m-0"
                  style={{ maxWidth: "46ch" }}
                >
                  A Junior Fullstack Developer currently studying Software
                  Engineering (D4 TRPL) at Politeknik IDN Bogor, now in semester
                  5, counting every project as a step closer to building
                  software that actually gets used.
                </p>

                <p
                  className="font-body text-sm md:text-base leading-relaxed m-0 opacity-85"
                  style={{ maxWidth: "48ch" }}
                >
                  I work with Laravel, Filament, and Sanctum on the backend, and
                  React, Next.js, and Tailwind on the frontend. Recently I built
                  Finote, a personal finance manager with a complete REST API
                  and PDF reporting, and shipped a live event landing page used
                  by an actual school event.
                </p>

                <p
                  className="font-body text-sm md:text-base leading-relaxed m-0 opacity-85"
                  style={{ maxWidth: "48ch" }}
                >
                  What I care about most is making products work reliably for
                  real people, whether that is an admin managing data through
                  Filament or a parent ordering on their phone. Outside of code,
                  I am a Hafiz of the Quran (30 Juz), a journey that taught me
                  patience and consistency long before I wrote my first line of
                  code.
                </p>
              </div>

              {/* Architectural Metadata Table & CTA */}
              <div className="flex flex-col gap-6">
                <div
                  className="grid grid-cols-2 border-t border-b py-4 gap-4"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] opacity-60 mb-1">
                      EDUCATION
                    </span>
                    <span className="font-display text-xs md:text-sm font-bold uppercase tracking-[0.04em]">
                      Politeknik IDN (Sem 5)
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] opacity-60 mb-1">
                      LOCATION
                    </span>
                    <span className="font-display text-xs md:text-sm font-bold uppercase tracking-[0.04em]">
                      Banjarbaru / Relocate to Bandung
                    </span>
                  </div>
                </div>

                <div>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 border px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[var(--inv-bg)] hover:text-[var(--inv-text)]"
                    style={{
                      borderColor: "var(--text)",
                      color: "var(--text)",
                    }}
                  >
                    <span className="roll-link">
                      <span className="roll-link-inner">START A PROJECT</span>
                      <span className="roll-link-clone" aria-hidden="true">
                        START A PROJECT
                      </span>
                    </span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Lanyard ID Card */}
            <div
              className="lg:col-span-5 relative flex flex-col justify-between overflow-hidden"
              style={{
                minHeight: "540px",
                background:
                  "radial-gradient(circle at 50% 45%, rgba(61, 18, 23, 0.14) 0%, transparent 72%)",
              }}
            >
              {/* Top Corner Instruction Label */}
              <div className="relative z-20 flex items-center justify-between px-6 pt-5 pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-65">
                  INTERACTIVE 3D ID
                </span>
                <span
                  className="px-2.5 py-1 border text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ borderColor: "var(--border)" }}
                >
                  DRAG &amp; RELEASE CARD
                </span>
              </div>

              {/* 3D Canvas Container */}
              <div className="relative inset-0 flex-1 w-full h-[500px] md:h-[560px]">
                {shouldMountLanyard ? (
                  <Suspense fallback={null}>
                    <Lanyard
                      position={[0, 1.9, 14.8]}
                      gravity={[0, -40, 0]}
                      startEntrance={startEntrance}
                    />
                  </Suspense>
                ) : (
                  <div className="w-full h-full" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
