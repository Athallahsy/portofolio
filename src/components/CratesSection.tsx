"use client";

import { useRef, useState } from "react";
import StickyLayer from "@/components/StickyLayer";
import { CRATE_RECORDS } from "@/data/portfolioData";
import { useStrike } from "@/context/StrikeContext";
import { useGhostDrift } from "@/lib/useGhostDrift";

const SLEEVE_TILTS = [-1.8, -0.6, 0.6, 1.8, -1.2, 0, 1.2, -1.8];

export default function CratesSection() {
  const { lang, playCratePull } = useStrike();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const wrapRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const sleeveRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const selected = CRATE_RECORDS[selectedIdx] ?? CRATE_RECORDS[0];

  // Horizontal Scroll-Drift Ghost Watermark via batched scrollEngine
  useGhostDrift(wrapRef, ghostRef);

  const handleSelect = (idx: number) => {
    if (idx < 0 || idx >= CRATE_RECORDS.length) return;
    playCratePull();
    setSelectedIdx(idx);
    const rec = CRATE_RECORDS[idx];
    if (rec) {
      sleeveRefs.current[rec.id]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handlePrev = () => {
    if (selectedIdx > 0) handleSelect(selectedIdx - 1);
  };

  const handleNext = () => {
    if (selectedIdx < CRATE_RECORDS.length - 1) handleSelect(selectedIdx + 1);
  };

  return (
    <StickyLayer
      id="formacion"
      zIndex={6}
      nowPlayingLabel="B2 · EDUCATION"
      nowPlayingColor="#ffb12b"
      className="bg-[#12151c] py-24 md:py-[120px] px-4 sm:px-8 lg:px-14"
    >
      <div ref={wrapRef} className="relative w-full">
        {/* Outlined Horizontal Scroll-Drift Ghost Watermark (.ghost) */}
        <div
          ref={ghostRef}
          aria-hidden="true"
          className="pointer-events-none select-none font-sign uppercase absolute -left-4 sm:-left-8 lg:-left-14 whitespace-nowrap"
          style={{
            top: "clamp(-50px, -2vw, -10px)",
            fontSize: "clamp(7rem, 20vw, 19rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(244, 241, 234, 0.1)",
            willChange: "transform",
          }}
        >
          EDUCATION EDUCATION
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto w-full">
          {/* Section Head matching Strike.uno (.section-head single horizontal row on desktop) */}
          <div className="relative z-10 mb-10 flex flex-wrap items-end gap-x-8 gap-y-3">
            <h2
              className="font-sign uppercase m-0 leading-[0.95] tracking-[-0.01em] text-[#f4f1ea]"
              style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.75rem)" }}
            >
              {lang === "id" ? "EDUKASI" : "EDUCATION"}
            </h2>

            <p className="flex-1 basis-[300px] max-w-[64ch] pb-2 m-0 text-[#b9bfcc] text-[15.5px] sm:text-[16.5px] leading-[1.55]">
              {lang === "id" ? (
                <>
                  <em className="not-italic font-tag text-[#e9ff2e]">
                    Menggali crate edukasi.
                  </em>{" "}
                  Setiap piringan menyimpan ilmu dan fondasi yang saya pelajari.
                  Dari menghafal 30 Juz hingga merancang sistem web aman, semua
                  mengajarkan bahwa{" "}
                  <strong className="text-[#f4f1ea] font-extrabold">
                    konsistensi membangun hasil nyata.
                  </strong>
                </>
              ) : (
                <>
                  <em className="not-italic font-tag text-[#e9ff2e]">
                    Diggin&apos; in the crates.
                  </em>{" "}
                  Every record holds something I learned. Some shaped my
                  engineering discipline, others sharpened security and AI
                  skills, and each taught me that{" "}
                  <strong className="text-[#f4f1ea] font-extrabold">
                    consistency turns ideas into shipped software.
                  </strong>
                </>
              )}
            </p>
          </div>

          {/* 3D Record Crate + Paper Detail Card (.crate-layout) */}
          <div className="crate-layout">
            {/* Left: Interactive 3D Crate & LP Sleeves */}
            <div className="crate">
              <div
                role="listbox"
                aria-label="Education and core milestones"
                aria-orientation="horizontal"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    handleNext();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    handlePrev();
                  }
                }}
                className="crate-row"
              >
                {CRATE_RECORDS.map((rec, idx) => {
                  const isPulled = idx === selectedIdx;
                  const tiltDeg = SLEEVE_TILTS[idx % SLEEVE_TILTS.length] ?? 0;
                  const artVariant = `art-${idx % 5}`;
                  return (
                    <button
                      key={rec.id}
                      ref={(el) => {
                        sleeveRefs.current[rec.id] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={isPulled}
                      aria-label={`${rec.year} ${rec.subtitle} - ${rec.title}`}
                      onClick={() => handleSelect(idx)}
                      className={`crate-sleeve ${artVariant}`}
                      style={
                        {
                          "--sbg": rec.color,
                          "--sfg": rec.textColor,
                          "--sr": `${tiltDeg}deg`,
                        } as React.CSSProperties
                      }
                    >
                      <span className="crate-vinyl" aria-hidden="true" />
                      <span className="sleeve-face">
                        <span className="sleeve-art" aria-hidden="true" />
                        <span className="sleeve-year">{rec.year}</span>
                        <span className="sleeve-inst">{rec.subtitle}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Overlapping Foreground Crate Faceplate with Recessed Handle Cutout */}
              <div className="crate-front" aria-hidden="true">
                <span>ATHA · RECORDS</span>
              </div>
            </div>

            {/* Right: Active Liner-Note Paper Card (.crate-detail) */}
            <article
              key={selected.id}
              aria-live="polite"
              className="crate-detail animate-swap-in"
              style={
                {
                  "--cd": selected.badgeColor ?? selected.color,
                } as React.CSSProperties
              }
            >
              <p className="cd-year m-0">{selected.year}</p>

              <h3 className="mt-3 mb-0 font-sign font-normal text-[1.3rem] leading-[1.15] text-[#0b0d12]">
                {selected.title}
              </h3>

              <p className="mt-1.5 mb-0 text-[14px] font-bold uppercase tracking-[0.04em] text-[#4a4d55]">
                {selected.subtitle}
              </p>

              <p className="mt-4 mb-0 text-[15.5px] leading-[1.55] text-[#24262c]">
                {selected.desc[lang]}
              </p>

              <div className="mt-[22px] flex gap-2.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={selectedIdx === 0}
                  className="btn-crate-nav"
                >
                  <span aria-hidden="true">←</span>
                  <span>{lang === "id" ? "SEBELUMNYA" : "PREVIOUS"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedIdx === CRATE_RECORDS.length - 1}
                  className="btn-crate-nav"
                >
                  <span>{lang === "id" ? "BERIKUTNYA" : "NEXT"}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </StickyLayer>
  );
}
