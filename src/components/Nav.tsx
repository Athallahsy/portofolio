"use client";

import { useEffect, useRef, useState } from "react";
import { useStrike } from "@/context/StrikeContext";
import { PROFILE } from "@/data/portfolioData";
import { scrollEngine } from "@/lib/scrollEngine";

const SETLIST_ITEMS = [
  { code: "INTRO", label: { en: "Warm-Up", id: "Beranda" }, id: "inicio", color: "#ff3b24" },
  { code: "A1", label: { en: "The Brief", id: "Ringkasan" }, id: "previa", color: "#f4f1ea" },
  { code: "A2", label: { en: "Career", id: "Rekam Jejak" }, id: "trayectoria", color: "#e9ff2e" },
  { code: "A3", label: { en: "Portfolio", id: "Portofolio" }, id: "portafolio", color: "#22d3ff" },
  { code: "B1", label: { en: "Skills", id: "Skills" }, id: "skills", color: "#ff3d8b" },
  { code: "B2", label: { en: "Education", id: "Edukasi" }, id: "formacion", color: "#ffb12b" },
  { code: "B3", label: { en: "Articles", id: "Catatan" }, id: "articulos", color: "#f4f1ea" },
  { code: "OUTRO", label: { en: "Contact", id: "Kontak" }, id: "contacto", color: "#3dff8a" },
];

const QUICK_NAV = [
  { label: { en: "Warm-Up", id: "Beranda" }, id: "previa" },
  { label: { en: "Career", id: "Jejak" }, id: "trayectoria" },
  { label: { en: "Portfolio", id: "Karya" }, id: "portafolio" },
  { label: { en: "Skills", id: "Skills" }, id: "skills" },
  { label: { en: "Education", id: "Edukasi" }, id: "formacion" },
  { label: { en: "Articles", id: "Catatan" }, id: "articulos" },
  { label: { en: "Contact", id: "Kontak" }, id: "contacto" },
];

export default function Nav() {
  const {
    lang,
    toggleLang,
    isPlayingBeat,
    toggleSound,
    nowPlaying,
    setNowPlaying,
    nowPlayingColor,
    setNowPlayingColor,
    isDrawerOpen,
    setIsDrawerOpen,
    playClick,
  } = useStrike();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [activeNavId, setActiveNavId] = useState("inicio");
  const [visitedIds, setVisitedIds] = useState<Record<string, boolean>>({});
  const discWrapRef = useRef<HTMLSpanElement>(null);
  const discInnerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let nextScrolled = false;
    let nextFab = false;
    let nextP = "0";
    let nextSpin = "0deg";
    let nextActiveItem = SETLIST_ITEMS[0];
    let nextVisited: Record<string, boolean> = {};

    return scrollEngine.subscribe({
      read: (sy, vh, maxScroll) => {
        nextScrolled = sy > vh * 0.55;
        nextFab = sy > vh * 1.15;
        nextP = Math.min(1, sy / maxScroll).toFixed(4);
        nextSpin = `${(sy * 0.6).toFixed(1)}deg`;

        const threshold = sy + vh * 0.45;
        let currentItem = SETLIST_ITEMS[0];
        const newlyVisited: Record<string, boolean> = {};
        for (const item of SETLIST_ITEMS) {
          const el = document.getElementById(item.id);
          if (el && threshold >= el.offsetTop) {
            currentItem = item;
            newlyVisited[item.id] = true;
          }
        }
        nextActiveItem = currentItem;
        nextVisited = newlyVisited;
      },
      write: () => {
        if (discWrapRef.current) {
          discWrapRef.current.style.setProperty("--p", nextP);
        }
        if (discInnerRef.current) {
          discInnerRef.current.style.setProperty("--spin", nextSpin);
        }
        setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
        setShowFab((prev) => (prev === nextFab ? prev : nextFab));
        setActiveNavId((prev) =>
          prev === nextActiveItem.id ? prev : nextActiveItem.id,
        );
        setNowPlaying(
          `${nextActiveItem.code} · ${nextActiveItem.label[lang].toUpperCase()}`,
        );
        setNowPlayingColor(nextActiveItem.color);
        setVisitedIds((prev) => {
          const hasNew = Object.keys(nextVisited).some((k) => !prev[k]);
          return hasNew ? { ...prev, ...nextVisited } : prev;
        });
      },
    });
  }, [lang, setNowPlaying, setNowPlayingColor]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  const jumpTo = (id: string) => {
    playClick();
    setIsDrawerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── FIXED URBAN TOPBAR (Matches Strike.uno Layout) ─────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-5 md:px-9 py-4 flex items-center justify-between pointer-events-none">
        {/* Left: Street Tag Logo */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            jumpTo("inicio");
          }}
          className="pointer-events-auto font-tag text-2xl md:text-[28px] tracking-wider -rotate-2 hover:rotate-0 transition-transform"
          style={{
            color: "#e9ff2e",
            textShadow: "2.5px 2.5px 0px #ff3d8b",
          }}
        >
          ATHA
        </a>

        {/* Center: Clean Borderless Text Links with SVG Scrawl Underline */}
        <nav
          aria-label="Primary sections"
          className={`hidden xl:flex items-center gap-4 pointer-events-auto transition-all duration-300 ${
            isScrolled
              ? "opacity-0 -translate-y-4 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          {QUICK_NAV.map((item) => {
            const isActive = activeNavId === item.id;
            const isVisited = visitedIds[item.id] && !isActive;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpTo(item.id)}
                className={`nav-link-btn relative px-1.5 py-1 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer ${
                  isActive
                    ? "is-active text-[#f4f1ea]"
                    : isVisited
                      ? "is-visited text-[#d6d9e1]"
                      : "text-[#b9bfcc] hover:text-[#e9ff2e]"
                }`}
              >
                <span>{item.label[lang]}</span>
                <svg
                  className="nav-scrawl absolute left-0 right-0 -bottom-0.5 w-full h-[5px] pointer-events-none"
                  viewBox="0 0 120 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2 6 Q 35 2, 62 5 T 118 4"
                    fill="none"
                    stroke="#e9ff2e"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            );
          })}
        </nav>

        {/* Right: EN|ID Switcher + Circular Sound Icon + Rectangular Green WhatsApp CTA + Hamburger */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center p-0.5 border border-[#3b4250] bg-[#0b0d12]/95 text-[11px] font-bold uppercase tracking-[0.1em] rounded-full cursor-pointer shadow-md"
          >
            <span
              className={`px-2.5 py-1 rounded-full transition-colors ${
                lang === "en"
                  ? "bg-[#e9ff2e] text-[#0b0d12]"
                  : "text-[#8a91a1] hover:text-[#d6d9e1]"
              }`}
            >
              EN
            </span>
            <span
              className={`px-2.5 py-1 rounded-full transition-colors ${
                lang === "id"
                  ? "bg-[#e9ff2e] text-[#0b0d12]"
                  : "text-[#8a91a1] hover:text-[#d6d9e1]"
              }`}
            >
              ID
            </span>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={isPlayingBeat ? "Mute beat" : "Play boom-bap beat"}
            title={isPlayingBeat ? "90 BPM Playing (Click to mute)" : "Play 90 BPM Beat"}
            className={`w-9 h-9 rounded-full border flex items-center justify-center bg-[#0b0d12]/95 transition-all active:scale-92 cursor-pointer ${
              isPlayingBeat
                ? "border-[#e9ff2e] text-[#e9ff2e]"
                : "border-[#3b4250] text-[#b9bfcc] hover:border-[#e9ff2e]"
            }`}
          >
            {isPlayingBeat ? (
              <span className="flex items-end gap-[2px] h-3.5" aria-hidden="true">
                {[0, 1, 2].map((b) => (
                  <span
                    key={b}
                    className="w-[2.5px] bg-[#e9ff2e] rounded-t eq-bar"
                    style={{
                      height: "100%",
                      animationDelay: `${b * 120}ms`,
                    }}
                  />
                ))}
              </span>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            )}
          </button>

          <a
            href={PROFILE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            style={{ "--r": "1deg" } as React.CSSProperties}
            className="strike-btn hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-[#f4f1ea]/80 bg-[#3dff8a] text-[#0b0d12] font-sign text-[11px] uppercase tracking-[0.08em] shadow-[0_6px_18px_rgba(61,255,138,0.28)]"
          >
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsDrawerOpen(!isDrawerOpen);
            }}
            aria-label="Open Setlist Navigation"
            aria-expanded={isDrawerOpen}
            className={`w-10 h-10 rounded-full border-2 border-[#e9ff2e] bg-[#0b0d12] text-[#e9ff2e] flex flex-col items-center justify-center gap-[4px] hover:bg-[#e9ff2e] hover:text-[#0b0d12] active:scale-92 transition-all cursor-pointer shadow-lg ${
              isScrolled ? "flex" : "xl:hidden flex"
            }`}
          >
            <span
              className="w-4 h-[2px] bg-current transition-transform"
              style={{
                transform: isDrawerOpen
                  ? "translateY(6px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="w-4 h-[2px] bg-current transition-opacity"
              style={{ opacity: isDrawerOpen ? 0 : 1 }}
            />
            <span
              className="w-4 h-[2px] bg-current transition-transform"
              style={{
                transform: isDrawerOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* ── FULL-SCREEN SETLIST DRAWER WITH STAGGERED ENTRANCE ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isDrawerOpen}
        aria-label="Setlist Navigation"
        className={`fixed inset-0 z-[70] shutter-surface overflow-y-auto flex flex-col justify-between p-6 md:p-12 transition-transform duration-600 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          isDrawerOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#232836] pb-4">
          <div>
            <span className="font-tag text-lg text-[#ff3d8b] block -rotate-1">
              ATHALLAH RECORDS · SETLIST
            </span>
            <h2 className="font-sign text-2xl md:text-4xl text-[#f4f1ea] m-0">
              {lang === "id" ? "PILIH TRACK / SECTION" : "SELECT TRACK / SECTION"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsDrawerOpen(false);
            }}
            className="w-11 h-11 rounded-full bg-[#e9ff2e] text-[#0b0d12] font-sign text-xl flex items-center justify-center hover:scale-105 active:scale-92 transition-transform cursor-pointer"
            aria-label="Close Setlist"
          >
            ×
          </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 my-8 max-w-5xl w-full mx-auto list-none p-0">
          {SETLIST_ITEMS.map((item, idx) => {
            const isCurrent = activeNavId === item.id;
            return (
              <li
                key={item.id}
                style={{
                  opacity: isDrawerOpen ? 1 : 0,
                  transform: isDrawerOpen
                    ? "translateY(0)"
                    : "translateY(-16px)",
                  transition:
                    "opacity 0.5s var(--ease-slap), transform 0.5s var(--ease-slap)",
                  transitionDelay: isDrawerOpen
                    ? `${0.13 + idx * 0.05}s`
                    : "0s",
                }}
              >
                <button
                  type="button"
                  onClick={() => jumpTo(item.id)}
                  className={`group w-full flex items-center justify-between p-4 border bg-[#0b0d12]/85 hover:border-[#e9ff2e] hover:bg-[#12151c] transition-all text-left cursor-pointer ${
                    isCurrent ? "border-[#e9ff2e]" : "border-[#232836]"
                  }`}
                >
                  <div className="flex items-center gap-4 transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2.5">
                    <span
                      className="px-2.5 py-1 font-sign text-xs font-bold rounded"
                      style={{
                        background: item.color,
                        color: "#0b0d12",
                      }}
                    >
                      {item.code}
                    </span>
                    <span className="font-sign text-lg md:text-xl text-[#d6d9e1] group-hover:text-[#e9ff2e] transition-colors">
                      {item.label[lang]}
                    </span>
                  </div>
                  <span className="font-tag text-sm text-[#8a91a1] group-hover:text-[#ff3d8b]">
                    {isCurrent ? "● ACTIVE" : "PLAY →"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#232836] pt-4 text-xs font-bold uppercase tracking-[0.15em] text-[#8a91a1]">
          <span>{PROFILE.location}</span>
          <div className="flex items-center gap-5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e9ff2e]"
            >
              GITHUB ↗
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#22d3ff]"
            >
              LINKEDIN ↗
            </a>
            <a
              href={PROFILE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#3dff8a]"
            >
              WHATSAPP ↗
            </a>
          </div>
        </div>
      </div>

      {/* ── BOTTOM-LEFT FLOATING "NOW PLAYING" SCROLL-DRIVEN VINYL PILL ── */}
      <button
        type="button"
        onClick={() => {
          playClick();
          setIsDrawerOpen(true);
        }}
        style={{
          transition:
            "opacity 0.5s var(--ease-slap), transform 0.5s var(--ease-slap), border-color 0.2s",
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? "translateY(0)" : "translateY(140%)",
          pointerEvents: isScrolled ? "auto" : "none",
        }}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full border border-[#3b4250] bg-[#0b0d12]/95 shadow-xl hover:border-[#e9ff2e] cursor-pointer"
      >
        <span
          ref={discWrapRef}
          className="sl-disc w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        >
          <span
            ref={discInnerRef}
            className="sl-disc-inner w-full h-full rounded-full bg-[#12151c] flex items-center justify-center"
          >
            <span
              className="w-2.5 h-2.5 rounded-full flex items-center justify-center"
              style={{ background: nowPlayingColor }}
            >
              <span className="w-1 h-1 rounded-full bg-[#0b0d12]" />
            </span>
          </span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a91a1]">
          {lang === "id" ? "SEDANG PUTAR" : "NOW PLAYING"}
        </span>
        <span
          className="text-[11px] font-sign transition-colors"
          style={{ color: nowPlayingColor }}
        >
          {nowPlaying}
        </span>
      </button>

      {/* ── BOTTOM-RIGHT SCROLL-TO-TOP SLAP FAB ──────────────── */}
      <button
        type="button"
        onClick={() => {
          playClick();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label="Scroll to top"
        style={{
          transition:
            "opacity 0.5s var(--ease-slap), transform 0.5s var(--ease-slap)",
          opacity: showFab ? 1 : 0,
          transform: showFab
            ? "translateY(0) rotate(0deg)"
            : "translateY(140%) rotate(-20deg)",
          pointerEvents: showFab ? "auto" : "none",
        }}
        className="fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-[#e9ff2e] text-[#0b0d12] font-sign text-lg flex items-center justify-center shadow-[0_6px_20px_rgba(233,255,46,0.35)] hover:scale-110 active:scale-92 cursor-pointer"
      >
        ↑
      </button>
    </>
  );
}
