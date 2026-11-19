"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import StickyLayer from "@/components/StickyLayer";
import {
  PROFILE,
  SINGLE_ARTICLES,
  type SingleArticle,
} from "@/data/portfolioData";
import { useStrike } from "@/context/StrikeContext";
import { useGhostDrift } from "@/lib/useGhostDrift";

export default function SinglesSection() {
  const { lang, playClick } = useStrike();
  const [activeArticle, setActiveArticle] = useState<SingleArticle | null>(
    null,
  );

  const wrapRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);

  // Horizontal Scroll-Drift Ghost Watermark via batched scrollEngine
  useGhostDrift(wrapRef, ghostRef);

  return (
    <StickyLayer
      id="articulos"
      zIndex={7}
      nowPlayingLabel="B3 · NOTES & CASES"
      nowPlayingColor="#ff3d8b"
      className="singles-section py-24 md:py-[120px] px-4 sm:px-8 lg:px-14"
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
          {lang === "id" ? "CATATAN ARTIKEL" : "ARTICLES NOTES"}
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto w-full">
          {/* Section Head matching Strike.uno (.section-head single horizontal row on desktop) */}
          <div className="relative z-10 mb-10 flex flex-wrap items-end gap-x-8 gap-y-3">
            <h2
              className="font-sign uppercase m-0 leading-[0.95] tracking-[-0.01em] text-[#f4f1ea]"
              style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.75rem)" }}
            >
              {lang === "id" ? "CATATAN & KASUS" : "NOTES & CASES"}
            </h2>

            <p className="flex-1 basis-[280px] max-w-[64ch] pb-2 m-0 text-[#b9bfcc] text-[15.5px] sm:text-[16.5px] leading-[1.55]">
              {lang === "id"
                ? "Catatan teknis terbaru tentang audit keamanan Laravel, optimasi LCP produksi, dan desain aplikasi lapangan. Tiga single, Side A."
                : "Engineering write-ups on Laravel security fixes, production LCP optimization, and offline Flutter UX. Three singles, side A."}
            </p>
          </div>

          {/* 3 Square 45-RPM Die-Cut Duotone Singles (.singles) */}
          <ul className="singles p-0 list-none">
            {SINGLE_ARTICLES.map((art) => (
              <li
                key={art.id}
                style={{ "--lbl": art.color } as React.CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setActiveArticle(art);
                  }}
                  className="single-card w-full"
                >
                  {/* 78% Square Die-Cut Disc Sleeve + Peeking Vinyl */}
                  <span className="s-disc" aria-hidden="true">
                    <span className="s-vinyl" />
                    <span className="s-sleeve">
                      <Image
                        src={art.coverImage}
                        alt=""
                        fill
                        sizes="(max-width: 900px) 64vw, 22vw"
                        style={{
                          objectPosition: art.coverPosition ?? "center center",
                        }}
                      />
                    </span>
                    <span className="s-side">{art.side}</span>
                    <span className="s-rpm">45</span>
                    <span className="s-go-sticker">
                      {lang === "id" ? "BACA ARTIKEL ->" : "READ ARTICLE ->"}
                    </span>
                  </span>

                  {/* Dark-Ground Meta, Bold Headline & Outlined Pill Tags */}
                  <span className="s-meta">
                    {art.dateLabel} · {art.minutes}{" "}
                    {lang === "id" ? "MENIT BACA" : "MIN READ"} ·{" "}
                    {lang === "id" ? "STUDI KASUS" : "CASE STUDY"}
                  </span>
                  <span className="s-title">{art.title}</span>
                  <span className="s-tags">
                    {art.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Bottom Paper CTA (.section-cta > .btn.btn-paper) */}
          <div className="relative z-10 mt-12 flex flex-wrap gap-3.5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              style={{ "--r": "-1.5deg" } as React.CSSProperties}
              className="strike-btn inline-flex items-center gap-2.5 px-[22px] py-[14px] rounded-[14px] border-[3px] border-white bg-[#f4f1ea] text-[#0b0d12] font-sign text-[15px] tracking-[0.02em] leading-[1.1] shadow-[0_2px_2px_rgba(0,0,0,0.35),0_10px_22px_-6px_rgba(0,0,0,0.55)]"
            >
              <span>
                {lang === "id"
                  ? "LIHAT CATATAN DI GITHUB"
                  : "READ EVERYTHING ON GITHUB"}
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeArticle.title}
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <article
            onClick={(e) => e.stopPropagation()}
            className="paper-sheet relative max-w-2xl w-full p-6 sm:p-9 shadow-2xl animate-swap-in max-h-[88vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveArticle(null);
              }}
              aria-label="Close article"
              className="absolute top-4 right-4 w-9 h-9 bg-[#0b0d12] text-[#e9ff2e] font-sign text-lg flex items-center justify-center hover:bg-[#ff3d8b] hover:text-white transition-colors cursor-pointer"
            >
              ×
            </button>

            <span
              className="inline-block px-3 py-1 font-sign text-[11px] mb-3"
              style={{
                background: activeArticle.color,
                color: activeArticle.ink,
              }}
            >
              {activeArticle.side} · {activeArticle.minutes} MIN READ
            </span>

            <h3 className="font-sign text-2xl sm:text-3xl text-[#0b0d12] m-0 mb-5 leading-tight">
              {activeArticle.title}
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-[#24262c] leading-relaxed mb-6">
              {activeArticle.body[lang].map((para, i) => (
                <p key={i} className="m-0">
                  {para}
                </p>
              ))}
            </div>

            {activeArticle.link && (
              <div className="pt-4 border-t border-[#0b0d12]/15">
                <a
                  href={activeArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b0d12] text-[#e9ff2e] font-sign text-xs uppercase tracking-wider hover:bg-[#ff3d8b] hover:text-white transition-colors"
                >
                  {lang === "id"
                    ? "LIHAT PROYEK TERKAIT ↗"
                    : "VIEW RELATED PROJECT ↗"}
                </a>
              </div>
            )}
          </article>
        </div>
      )}
    </StickyLayer>
  );
}
