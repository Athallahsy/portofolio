"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import StickyLayer from "@/components/StickyLayer";
import {
  FEATURED_PROJECTS,
  PROFILE,
  type ProjectPoster,
} from "@/data/portfolioData";
import { useStrike } from "@/context/StrikeContext";
import { useGhostDrift } from "@/lib/useGhostDrift";

export default function Projects() {
  const { lang, playClick } = useStrike();
  const [selectedProject, setSelectedProject] = useState<ProjectPoster | null>(
    null,
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  useGhostDrift(wrapRef, ghostRef);

  return (
    <StickyLayer
      id="portafolio"
      zIndex={4}
      nowPlayingLabel="A3 · PORTFOLIO"
      nowPlayingColor="#22d3ff"
      className="brick-wall py-24 md:py-[120px] px-4 sm:px-8 lg:px-14"
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
          {lang === "id" ? "PORTOFOLIO PORTOFOLIO" : "PORTFOLIO PORTFOLIO"}
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto w-full">
          {/* Section Head matching Strike.uno (.section-head single horizontal row on desktop) */}
          <div className="relative z-10 mb-10 flex flex-wrap items-end gap-x-8 gap-y-3">
            <h2
              className="font-sign uppercase m-0 leading-[0.95] tracking-[-0.01em] text-[#f4f1ea]"
              style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.75rem)" }}
            >
              {lang === "id" ? "PORTOFOLIO" : "PORTFOLIO"}
            </h2>

            <p className="flex-1 basis-[280px] max-w-[64ch] m-0 mb-2 px-4 py-3 rounded-[10px] bg-[#090b10]/80 backdrop-blur-[2px] text-[#d6d9e1] text-[15px] sm:text-[16px] leading-[1.55]">
              {lang === "id" ? (
                <>
                  Dari membangun REST API aman, bot WhatsApp bertenaga AI,
                  hingga aplikasi Android lapangan dan toko online.{" "}
                  <strong className="text-[#f4f1ea] font-extrabold">
                    Teknologi adalah alatnya. Dampak nyata adalah tujuannya.
                  </strong>
                </>
              ) : (
                <>
                  From building secure REST APIs and AI WhatsApp bots to
                  shipping Android field tools and e-commerce storefronts.{" "}
                  <strong className="text-[#f4f1ea] font-extrabold">
                    The stack is the medium. Real usage is the goal.
                  </strong>
                </>
              )}
            </p>
          </div>

          {/* Wheat-Paste Poster Grid (.posters > .bposter) */}
          <ul className="relative z-10 grid grid-cols-1 min-[901px]:grid-cols-3 gap-7 lg:gap-12 items-start m-0 p-0 list-none">
            {FEATURED_PROJECTS.map((proj) => (
              <li key={proj.num} className="bposter">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedProject(proj);
                  }}
                  className="bposter-card group w-full text-left cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e9ff2e]"
                >
                  {/* Angled Masking Tape Corners (.tape-l & .tape-r) */}
                  <span aria-hidden="true" className="tape tape-l" />
                  <span aria-hidden="true" className="tape tape-r" />

                  {/* 808 / 632 Framed Behance-Style Poster Cover (.bp-img) */}
                  <span
                    className="relative block w-full aspect-[808/632] p-[9px] overflow-hidden"
                    style={{ background: proj.accentColor }}
                  >
                    {/* Pop-In Go Sticker */}
                    <span
                      style={{
                        transition:
                          "opacity 0.2s ease, transform 0.45s var(--ease-slap)",
                      }}
                      className="pointer-events-none opacity-0 scale-[1.4] -rotate-[14deg] group-hover:opacity-100 group-hover:scale-100 group-hover:-rotate-[4deg] group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:-rotate-[4deg] absolute top-4 right-4 z-30 px-3 py-2 border-[3px] border-white rounded-[10px] bg-[#e9ff2e] text-[#0b0d12] font-sign text-[12px] leading-none shadow-lg"
                    >
                      {lang === "id" ? "BUKA ->" : "VIEW ->"}
                    </span>

                    <span className="relative block w-full h-full rounded-[10px] overflow-hidden bg-[#12151c]">
                      {proj.screenshot ? (
                        proj.aspect === "portrait" ? (
                          <span className="relative flex w-full h-full items-center justify-center bg-[#14171f] pb-8 pt-3 px-6">
                            <span className="relative h-full aspect-[9/16] rounded-[14px] overflow-hidden border-[3px] border-white/15 shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]">
                              <Image
                                src={proj.screenshot}
                                alt={proj.title}
                                fill
                                sizes="220px"
                                className="object-cover object-top"
                              />
                            </span>
                          </span>
                        ) : (
                          <Image
                            src={proj.screenshot}
                            alt={proj.title}
                            fill
                            sizes="(max-width: 900px) min(92vw, 500px), 30vw"
                            className="object-cover object-top transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] group-hover:saturate-115 group-hover:contrast-105"
                          />
                        )
                      ) : (
                        <span className="relative flex flex-col justify-start w-full h-full p-4 bg-[#10131a] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                          <span className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
                            <span className="font-mono text-[10px] text-[#3dff8a] font-bold">
                              WA-BOT · ONLINE
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-[#ffb12b] text-[#0b0d12] font-sign text-[9px]">
                              PROD
                            </span>
                          </span>
                          <span className="mt-2.5 grid grid-cols-2 gap-2">
                            <span className="p-2 rounded bg-[#181c26] border border-white/10">
                              <span className="block text-[9px] uppercase text-[#8a91a1] font-bold">
                                LCP SPEED
                              </span>
                              <span className="block font-sign text-sm text-[#e9ff2e] mt-0.5">
                                23.1s -&gt; 3.6s
                              </span>
                            </span>
                            <span className="p-2 rounded bg-[#181c26] border border-white/10">
                              <span className="block text-[9px] uppercase text-[#8a91a1] font-bold">
                                AUDIT FIXES
                              </span>
                              <span className="block font-sign text-sm text-[#3dff8a] mt-0.5">
                                12+ PATCHED
                              </span>
                            </span>
                          </span>
                        </span>
                      )}

                      {/* Strike-style Behance Cover Bottom Title Scrim */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end px-3.5 pb-3 pt-10 bg-gradient-to-t from-black/95 via-black/75 to-transparent"
                      >
                        <span
                          className="text-[11px] font-bold tracking-tight leading-tight drop-shadow"
                          style={{ color: proj.accentColor }}
                        >
                          {proj.coverSubtitle}
                        </span>
                        <span className="text-white font-extrabold text-[21px] sm:text-[24px] leading-[1.06] tracking-[-0.02em] drop-shadow-md mt-0.5">
                          {proj.coverHeadline}
                        </span>
                      </span>
                    </span>
                  </span>

                  {/* Bungee Poster Title (turns --red on hover) */}
                  <h3 className="mt-3.5 mb-0 font-sign uppercase font-normal leading-[1.12] text-[#0b0d12] group-hover:text-[#ff3b24] transition-colors duration-200 text-[clamp(1rem,1.45vw,1.22rem)]">
                    {proj.title}
                  </h3>

                  {/* Red Uppercase Year / Category Strip */}
                  <time className="block mt-2 text-[#ff3b24] font-extrabold text-[12px] tracking-[0.08em] uppercase">
                    {proj.year} · {proj.category}
                  </time>
                </button>
              </li>
            ))}
          </ul>

          {/* Bottom Cyan CTA (.section-cta > .btn.btn-cyan) */}
          <div className="relative z-10 mt-12 flex flex-wrap gap-3.5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              style={{ "--r": "1.5deg" } as React.CSSProperties}
              className="strike-btn inline-flex items-center gap-2.5 px-[22px] py-[14px] rounded-[14px] border-[3px] border-white bg-[#22d3ff] text-[#0b0d12] font-sign text-[15px] tracking-[0.02em] leading-[1.1] shadow-[0_2px_2px_rgba(0,0,0,0.35),0_10px_22px_-6px_rgba(0,0,0,0.55)]"
            >
              <span>
                {lang === "id" ? "LIHAT SEMUA DI GITHUB" : "VIEW ALL ON GITHUB"}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── PROJECT POSTER MODAL ───────────────────────────────── */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="paper-sheet relative max-w-2xl w-full p-6 sm:p-8 shadow-2xl animate-swap-in"
          >
            <button
              type="button"
              onClick={() => {
                playClick();
                setSelectedProject(null);
              }}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-9 h-9 bg-[#0b0d12] text-[#e9ff2e] font-sign text-lg flex items-center justify-center hover:bg-[#ff3b24] hover:text-white transition-colors cursor-pointer"
            >
              ×
            </button>

            <span className="inline-block px-2.5 py-1 bg-[#0b0d12] text-[#e9ff2e] font-sign text-[10px] tracking-[0.14em] mb-3">
              POSTER #{selectedProject.num} · {selectedProject.category}
            </span>

            <h3 className="font-sign text-2xl sm:text-3xl text-[#0b0d12] m-0 mb-4">
              {selectedProject.title}
            </h3>

            <div className="relative w-full aspect-[16/9] bg-[#12151c] border border-[#0b0d12]/20 overflow-hidden mb-5">
              {selectedProject.screenshot ? (
                <Image
                  src={selectedProject.screenshot}
                  alt={selectedProject.title}
                  fill
                  sizes="680px"
                  className="object-contain p-2"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <span className="font-tag text-3xl text-[#e9ff2e] mb-2">
                    {selectedProject.title}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8a91a1]">
                    PRODUCTION CASE · IT STAFF
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-base text-[#24262c] leading-relaxed mb-4">
              {selectedProject.desc[lang]}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[#0b0d12]/10 text-[#0b0d12] text-[11px] font-bold uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#0b0d12]/15">
              {selectedProject.liveLink && (
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#0b0d12] text-[#e9ff2e] font-sign text-xs uppercase tracking-wider hover:bg-[#ff3d8b] hover:text-white transition-colors"
                >
                  {lang === "id" ? "BUKA WEBSITE ↗" : "LIVE DEMO ↗"}
                </a>
              )}
              {selectedProject.githubLink && (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border-2 border-[#0b0d12] text-[#0b0d12] font-sign text-xs uppercase tracking-wider hover:bg-[#0b0d12] hover:text-[#f4f1ea] transition-colors"
                >
                  GITHUB REPO ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </StickyLayer>
  );
}
