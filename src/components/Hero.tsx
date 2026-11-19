"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StickyLayer from "@/components/StickyLayer";
import SevenSeg from "@/components/SevenSeg";
import {
  HERO_COUNTERS,
  HERO_SKILLS_LINE,
  PROFILE,
} from "@/data/portfolioData";
import { useStrike } from "@/context/StrikeContext";
import { pointerLerp } from "@/lib/pointerLerp";

const LED_TARGETS = [
  { num: 5, suffix: "", pad: 2 },
  { num: 12, suffix: "+", pad: 2 },
  { num: 7, suffix: "+", pad: 2 },
  { num: 30, suffix: "", pad: 2 },
];

export default function Hero() {
  const { lang, playClick, doorOpened } = useStrike();
  const heroWrapRef = useRef<HTMLDivElement>(null);

  const buffsRef = useRef<HTMLDivElement>(null);
  const bokehRef = useRef<HTMLDivElement>(null);
  const nameTagRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const bombRef = useRef<HTMLDivElement>(null);
  const cyanStickerRef = useRef<HTMLSpanElement>(null);
  const pinkStickerRef = useRef<HTMLSpanElement>(null);

  const [ledValues, setLedValues] = useState<string[]>(() =>
    HERO_COUNTERS.map((c) => c.value),
  );

  // Cursor Spotlight (--lx, --ly) + Multi-Layer Lerp Parallax ([data-mouse])
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (prefersReduced || !finePointer) return;

    const unsub = pointerLerp.subscribe((wx, wy, rawX, rawY) => {
      if (window.scrollY > window.innerHeight) return;

      const wrap = heroWrapRef.current;
      if (wrap) {
        const rect = wrap.getBoundingClientRect();
        wrap.style.setProperty("--lx", `${(rawX - rect.left).toFixed(1)}px`);
        wrap.style.setProperty("--ly", `${(rawY - rect.top).toFixed(1)}px`);
      }

      const layers: Array<[HTMLElement | null, number]> = [
        [buffsRef.current, -8],
        [bokehRef.current, 40],
        [nameTagRef.current, 10],
        [polaroidRef.current, -14],
        [bombRef.current, 22],
        [cyanStickerRef.current, 24],
        [pinkStickerRef.current, 18],
      ];

      for (const [el, mult] of layers) {
        if (el) {
          el.style.translate = `${(wx * mult).toFixed(1)}px ${(wy * mult).toFixed(1)}px`;
        }
      }
    });

    return () => unsub();
  }, []);

  // 7-Segment LED Count-Up triggered when the Shutter Door opens
  useEffect(() => {
    if (!doorOpened) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const timers: number[] = [];
    const intervals: number[] = [];

    const resetTimer = window.setTimeout(() => {
      setLedValues(
        LED_TARGETS.map((t) => "0".padStart(t.pad, "0") + t.suffix),
      );
    }, 0);
    timers.push(resetTimer);

    LED_TARGETS.forEach((target, idx) => {
      const startTimer = window.setTimeout(() => {
        let step = 0;
        const totalSteps = 16;
        const iv = window.setInterval(() => {
          step += 1;
          const progress = Math.pow(step / totalSteps, 0.6);
          const current = Math.round(target.num * progress);
          const formatted =
            String(current).padStart(target.pad, "0") + target.suffix;
          setLedValues((prev) => {
            const copy = [...prev];
            copy[idx] = formatted;
            return copy;
          });
          if (step >= totalSteps) {
            window.clearInterval(iv);
          }
        }, 55);
        intervals.push(iv);
      }, 250 + idx * 140);
      timers.push(startTimer);
    });

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      intervals.forEach((iv) => window.clearInterval(iv));
    };
  }, [doorOpened]);

  return (
    <StickyLayer
      id="inicio"
      zIndex={1}
      isFirst
      nowPlayingLabel="INTRO · SHUTTER"
      nowPlayingColor="#ff3b24"
      className="shutter-surface min-h-[100dvh] flex flex-col justify-between pt-20 pb-12 border-b border-[#232836]"
    >
      <div
        ref={heroWrapRef}
        className="relative flex-1 flex flex-col justify-between px-5 sm:px-9 lg:px-14"
      >
        {/* Cursor-Tracking Streetlamp Spotlight Overlay */}
        <div className="hero-lamp absolute inset-0 z-0" aria-hidden="true" />

        {/* Subtle Background Street Buff Tags ([data-mouse="-8"]) */}
        <div
          ref={buffsRef}
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0 opacity-[0.045]"
        >
          <span className="font-tag text-[16vw] text-[#f4f1ea] absolute top-[6%] right-[12%] -rotate-6">
            ATHA
          </span>
          <span className="font-tag text-[12vw] text-[#ff3d8b] absolute bottom-[14%] left-[4%] rotate-3">
            DEV
          </span>
        </div>

        {/* Pre-softened Streetlamp Bokeh Circles ([data-mouse="40"]) — identical brightness, zero GPU blur pass */}
        <div
          ref={bokehRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden z-0"
        >
          <div
            className="w-80 h-80 rounded-full absolute bottom-[4%] right-[-2%]"
            style={{
              background:
                "radial-gradient(circle, rgba(233,255,46,0.30) 0%, rgba(233,255,46,0.14) 38%, rgba(233,255,46,0) 70%)",
            }}
          />
          <div
            className="w-72 h-72 rounded-full absolute top-[2%] left-[34%]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,61,139,0.20) 0%, rgba(255,61,139,0.09) 38%, rgba(255,61,139,0) 70%)",
            }}
          />
        </div>

        {/* Main Hero Grid — Generous proportions matching Strike.uno */}
        <div className="max-w-[1340px] mx-auto w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center py-4 relative z-10">
          {/* Left 7 Cols: Huge Red & White Name-Tag + Headline + Cyan Micro-Line + 2 Big Sticker CTAs */}
          <div className="md:col-span-7 flex flex-col items-start relative">
            {/* Scattered Slap Stickers behind/around Name-Tag ([data-mouse="22"]) */}
            <div ref={bombRef} className="pointer-events-none absolute inset-0 z-0">
              <span className="hidden sm:inline-block absolute -top-3 -left-6 px-3.5 py-1 rounded bg-[#f4f1ea] text-[#0b0d12] font-tag text-xs -rotate-12 shadow-lg">
                ATHALLAH
              </span>
              <span className="hidden sm:inline-block absolute top-14 right-[10%] px-3 py-1 rounded-md border-2 border-[#f4f1ea] bg-[#e9ff2e] text-[#0b0d12] font-sign text-[11px] -rotate-12 shadow-lg">
                12+ SEC FIXES
              </span>
              <span className="hidden sm:inline-block absolute -bottom-4 right-[10%] px-3 py-1 rounded-md border-2 border-[#f4f1ea] bg-[#ff3b24] text-[#f4f1ea] font-sign text-[11px] rotate-6 shadow-lg">
                GEMINI AI
              </span>
            </div>

            {/* Huge Red & White "HEY YO / they call me / ATHA" Name-Tag Card */}
            <div
              ref={nameTagRef}
              className="name-tag relative z-10 mb-7 cursor-default"
            >
              <div className="name-tag-head" aria-hidden="true">
                <span
                  className="block font-sign uppercase leading-none tracking-[0.02em]"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
                >
                  HEY YO
                </span>
                <span className="block mt-1 font-bold text-[17px] sm:text-[19px] tracking-[0.03em]">
                  {lang === "id" ? "panggil aja gue" : "they call me"}
                </span>
              </div>
              <h1
                className="name-tag-body m-0"
                aria-label="ATHA - Athallah Muhammad Syaffa"
              >
                <span className="name-tag-marker">ATHA</span>
              </h1>
            </div>

            {/* Bold 2-Line Bungee Role Headline */}
            <h2
              className="font-sign uppercase leading-[1.08] m-0 mb-2.5 relative z-10"
              style={{ fontSize: "clamp(1.45rem, 2.7vw, 2.25rem)" }}
            >
              <span className="text-[#f4f1ea]">FULLSTACK &amp; </span>
              <span className="text-[#ffb12b]">MOBILE DEVELOPER</span>
            </h2>

            {/* Cyan Micro-Skills Strip (Ready for your updated skills) */}
            <p className="font-sign text-[11px] sm:text-xs text-[#22d3ff] tracking-[0.1em] m-0 mb-3 relative z-10">
              {HERO_SKILLS_LINE}
            </p>

            {/* Concise Bio */}
            <p className="font-body text-base sm:text-[17px] text-[#b9bfcc] max-w-[54ch] leading-relaxed mb-7 relative z-10">
              {lang === "id"
                ? "IT Staff / Support di JS Florist & Poppy Florist & mahasiswa D4 TRPL Politeknik IDN (Sem 5). Membangun AI WhatsApp bot, merawat POS Laravel, mengamankan checkout, serta memangkas LCP web dari 23,1s ke 3,6s."
                : "IT Staff / Support at JS Florist & Poppy Florist & D4 Software Engineering student (Sem 5). Building AI WhatsApp bots, maintaining Laravel POS systems, securing checkouts, and cutting LCP from 23.1s to 3.6s."}
            </p>

            {/* 2 Big Tilted Rounded-Rect Sticker CTAs (Yellow Email + Green WhatsApp) */}
            <div className="flex flex-wrap items-center gap-4 relative z-10">
              <a
                href={`mailto:${PROFILE.email}`}
                onClick={() => playClick()}
                style={{ "--r": "-1.5deg" } as React.CSSProperties}
                className="strike-btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border-2 border-[#f4f1ea] bg-[#e9ff2e] text-[#0b0d12] font-sign text-xs sm:text-sm uppercase tracking-wider shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
              >
                <span>✉</span>
                <span>{PROFILE.email}</span>
              </a>

              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                style={{ "--r": "1.5deg" } as React.CSSProperties}
                className="strike-btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border-2 border-[#f4f1ea] bg-[#3dff8a] text-[#0b0d12] font-sign text-xs sm:text-sm uppercase tracking-wider shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
              >
                <span>WHATSAPP</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Right 5 Cols: Editorial Polaroid Frame ([data-mouse="-14"]) + Clean Accent Stickers */}
          <div className="md:col-span-5 relative flex items-center justify-center py-4">
            {/* Cyan Pill Top-Right above Polaroid ([data-mouse="24"]) */}
            <span
              ref={cyanStickerRef}
              className="hidden sm:inline-block absolute -top-3 right-0 lg:right-2 z-20 px-4 py-1.5 rounded-full border-2 border-[#f4f1ea] bg-[#22d3ff] text-[#0b0d12] font-sign text-xs rotate-[4deg] shadow-xl"
            >
              LARAVEL · CI4 · REACT
            </span>

            {/* Pink Slap Sticker overlapping Bottom-Left portrait corner ([data-mouse="18"]) */}
            <span
              ref={pinkStickerRef}
              className="hidden sm:inline-block absolute bottom-28 sm:bottom-32 -left-3 lg:-left-7 z-20 px-4 py-2 rounded-lg border-2 border-[#f4f1ea] bg-[#ff3d8b] text-[#f4f1ea] font-sign text-[11px] leading-tight -rotate-[5deg] shadow-xl max-w-[190px]"
            >
              LCP 23.1S → 3.6S
            </span>

            {/* Editorial Polaroid Frame */}
            <div
              ref={polaroidRef}
              className="hero-polaroid group relative z-10 w-[300px] sm:w-[360px] lg:w-[400px] xl:w-[420px] p-4 pb-11 sm:pb-12 rotate-[3.2deg]"
            >
              {/* Frosted Cream Masking Tape pinning Top Center */}
              <span
                aria-hidden="true"
                className="masking-tape absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 w-28 h-7 -rotate-[1.5deg] pointer-events-none"
                style={{ background: "rgba(244, 241, 234, 0.72)" }}
              />

              {/* Recessed Analog Photo Window — cleanly cropped to portrait only */}
              <div className="relative w-full aspect-[4/4.15] bg-[#dde1e8] overflow-hidden rounded-[2px] border border-[#0b0d12]/15 shadow-[inset_0_2px_18px_rgba(11,13,18,0.22)]">
                <Image
                  src="/images/profile.png"
                  alt={PROFILE.fullName}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 340px, 420px"
                  className="object-cover scale-[1.42] group-hover:scale-[1.46] contrast-[1.04] saturate-[1.05] transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    objectPosition: "50% 6%",
                    transformOrigin: "50% 8%",
                  }}
                />
                {/* Subtle studio film vignette & warm lower edge for depth */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 shadow-[inset_0_0_28px_rgba(11,13,18,0.18)] bg-gradient-to-t from-[#0b0d12]/20 via-transparent to-white/10"
                />
              </div>

              {/* Clean Archival Metadata Stamp (Left) + Handwritten Marker Signature (Right) */}
              <div className="mt-4 flex items-end justify-between gap-3 px-1">
                <div className="flex flex-col gap-0.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#4a4d55]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] inline-block" />
                    TAKE #05 · 2026
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#6d717c]">
                    D4 TRPL · POLITEKNIK IDN
                  </span>
                </div>

                <span className="font-tag text-xl sm:text-2xl leading-none text-[#0b0d12] -rotate-[1.5deg] select-none">
                  Athallah Syaffa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Digital 7-Segment LED Counters */}
        <div className="max-w-[1340px] mx-auto w-full pt-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {HERO_COUNTERS.map((counter, idx) => (
              <div
                key={counter.label.en}
                className="bg-[#07080b] border border-[#232836] p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-inner"
              >
                <SevenSeg
                  value={ledValues[idx] ?? counter.value}
                  color="#e9ff2e"
                  height={28}
                />
                <span className="font-sign text-[10px] sm:text-[11px] leading-tight text-[#8a91a1] text-right">
                  {counter.label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StickyLayer>
  );
}
