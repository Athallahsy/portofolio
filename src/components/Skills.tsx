"use client";

import { useEffect, useRef, useState } from "react";
import StickyLayer from "@/components/StickyLayer";
import {
  INITIAL_STICKERS,
  SKILL_GROUPS,
  type StickerItem,
} from "@/data/portfolioData";
import { useStrike } from "@/context/StrikeContext";
import { pointerLerp } from "@/lib/pointerLerp";
import { useGhostDrift } from "@/lib/useGhostDrift";

interface PositionedSticker extends StickerItem {
  z: number;
}

const STICKER_DEPTHS = INITIAL_STICKERS.map(
  (_, i) => 0.4 + ((i * 37) % 10) * 0.09,
);

export default function Skills() {
  const { lang, playSlap, playClick } = useStrike();
  const wrapRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLUListElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const stickerRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const [stickers, setStickers] = useState<PositionedSticker[]>(() =>
    INITIAL_STICKERS.map((s, idx) => ({ ...s, z: idx + 1 })),
  );
  const [hasEntered, setHasEntered] = useState(false);
  const [slapSeed, setSlapSeed] = useState(0);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const dragStateRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const topZRef = useRef(INITIAL_STICKERS.length + 2);

  // Trigger staggered slap-in animation ONLY when scrolled into view (threshold 0.25)
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(board);
    return () => io.disconnect();
  }, []);

  // Horizontal parallax watermark tied to scroll via batched scrollEngine
  useGhostDrift(wrapRef, watermarkRef);

  // Per-Sticker Cursor Parallax (--tx, --ty) driven by pointerLerp
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (prefersReduced || !finePointer) return;

    const unsub = pointerLerp.subscribe((wx, wy) => {
      const board = boardRef.current;
      if (!board) return;
      const rect = board.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

      INITIAL_STICKERS.forEach((item, i) => {
        const el = stickerRefs.current[item.id];
        if (!el) return;
        const depth = STICKER_DEPTHS[i] ?? 0.8;
        el.style.setProperty("--tx", `${(wx * 26 * depth).toFixed(1)}px`);
        el.style.setProperty("--ty", `${(wy * 20 * depth).toFixed(1)}px`);
      });
    });

    return () => unsub();
  }, []);

  const handleStickerPointerDown = (
    e: React.PointerEvent<HTMLLIElement>,
    sticker: PositionedSticker,
  ) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    topZRef.current += 1;
    const newZ = topZRef.current;
    setDraggingId(sticker.id);

    dragStateRef.current = {
      id: sticker.id,
      startX: e.clientX,
      startY: e.clientY,
      origX: sticker.x,
      origY: sticker.y,
    };

    setStickers((prev) =>
      prev.map((s) => (s.id === sticker.id ? { ...s, z: newZ } : s)),
    );
  };

  const handleStickerPointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    const drag = dragStateRef.current;
    const board = boardRef.current;
    if (!drag || !board) return;

    const rect = board.getBoundingClientRect();
    const dxPct = ((e.clientX - drag.startX) / rect.width) * 100;
    const dyPct = ((e.clientY - drag.startY) / rect.height) * 100;

    const nextX = Math.max(8, Math.min(92, drag.origX + dxPct));
    const nextY = Math.max(10, Math.min(90, drag.origY + dyPct));

    setStickers((prev) =>
      prev.map((s) =>
        s.id === drag.id ? { ...s, x: nextX, y: nextY } : s,
      ),
    );
  };

  const handleStickerPointerUp = () => {
    const drag = dragStateRef.current;
    if (!drag) return;
    dragStateRef.current = null;
    setDraggingId(null);
    const dropRot = Math.round(Math.random() * 16 - 8);
    setStickers((prev) =>
      prev.map((s) => (s.id === drag.id ? { ...s, rot: dropRot } : s)),
    );
    playSlap();
  };

  const handleReslap = () => {
    playClick();
    window.setTimeout(() => playSlap(), 90);
    setHasEntered(true);
    setSlapSeed((prev) => prev + 1);
    setStickers(
      INITIAL_STICKERS.map((base, idx) => ({
        ...base,
        x: Math.max(10, Math.min(90, base.x + (Math.random() * 6 - 3))),
        y: Math.max(12, Math.min(88, base.y + (Math.random() * 6 - 3))),
        rot: base.rot + Math.round(Math.random() * 10 - 5),
        z: idx + 1,
      })),
    );
  };

  const getVariantClass = (shape: StickerItem["shape"]) => {
    switch (shape) {
      case "pill":
        return "st-pill";
      case "circle":
        return "st-round";
      case "tag":
        return "st-tag";
      default:
        return "st-label";
    }
  };

  return (
    <StickyLayer
      id="skills"
      zIndex={5}
      nowPlayingLabel="B1 · SKILLS"
      nowPlayingColor="#ff3d8b"
      className="shutter-surface py-24 md:py-[120px] px-4 sm:px-8 lg:px-14"
    >
      <div ref={wrapRef} className="relative w-full">
        {/* Outlined Horizontal Parallax Watermark with Yellow Stroke (.skills .ghost) */}
        <div
          ref={watermarkRef}
          aria-hidden="true"
          className="pointer-events-none select-none font-sign uppercase absolute -left-4 sm:-left-8 lg:-left-14 whitespace-nowrap"
          style={{
            top: "clamp(-50px, -2vw, -10px)",
            fontSize: "clamp(7rem, 20vw, 19rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(233, 255, 46, 0.08)",
            willChange: "transform",
          }}
        >
          SKILLS SKILLS
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto w-full">
          {/* Section Head matching Strike.uno (.section-head + ghost button right) */}
          <div className="relative z-10 mb-10 flex flex-wrap items-end gap-x-8 gap-y-3">
            <h2
              className="font-sign uppercase m-0 leading-[0.95] tracking-[-0.01em] text-[#f4f1ea]"
              style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.75rem)" }}
            >
              {lang === "id" ? "KEAHLIAN UTAMA" : "CORE SKILLS"}
            </h2>

            <p className="flex-1 basis-[280px] max-w-[64ch] pb-2 m-0 text-[#b9bfcc] text-[15.5px] sm:text-[16.5px] leading-[1.55]">
              {lang === "id"
                ? "Setiap stiker adalah skill utama. Klik, seret, atur ulang, tempel sesukamu."
                : "Every sticker is a core skill. Grab them, drag them around, slap them anywhere on the shutter."}
            </p>

            <button
              type="button"
              onClick={handleReslap}
              className="ml-auto mb-2 inline-flex items-center gap-2 px-3.5 py-[9px] rounded-[11px] border-2 border-[#3b4250] bg-transparent text-[#f4f1ea] font-sign text-[13px] tracking-[0.02em] hover:border-[#e9ff2e] hover:text-[#e9ff2e] active:scale-[0.97] transition-colors cursor-pointer"
            >
              <span aria-hidden="true">↻</span>
              <span>{lang === "id" ? "TEMPEL ULANG" : "RE-STICK ALL"}</span>
            </button>
          </div>

          {/* Dashed Interactive Sticker Wall (.sticker-wall) */}
          <ul ref={boardRef} className="sticker-wall m-0 p-0 list-none">
            {stickers.map((sticker, idx) => {
              const isThisDragging = draggingId === sticker.id;
              return (
                <li
                  key={`${sticker.id}-${slapSeed}`}
                  ref={(el) => {
                    stickerRefs.current[sticker.id] = el;
                  }}
                  tabIndex={0}
                  aria-label={`Draggable skill sticker ${sticker.label}`}
                  onPointerDown={(e) => handleStickerPointerDown(e, sticker)}
                  onPointerMove={handleStickerPointerMove}
                  onPointerUp={handleStickerPointerUp}
                  className={`skill-sticker ${getVariantClass(sticker.shape)} ${
                    hasEntered ? "animate-slap opacity-100" : "opacity-0"
                  } ${isThisDragging ? "is-dragging" : ""}`}
                  style={
                    {
                      "--bg": sticker.bg,
                      "--fg": sticker.fg,
                      "--d": `${idx * 70}ms`,
                      "--x": `${sticker.x}%`,
                      "--y": `${sticker.y}%`,
                      "--rot": `${sticker.rot}deg`,
                      "--z": sticker.z,
                    } as React.CSSProperties
                  }
                >
                  {sticker.label}
                </li>
              );
            })}
          </ul>

          {/* Compact Cassette Liner-Note Stack Index (replaces boxy cards) */}
          <div className="relative z-10 mt-7 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-4">
            {SKILL_GROUPS.map((group) => (
              <div key={group.code} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: group.color }}
                  />
                  <span className="font-sign text-[11px] tracking-[0.12em] uppercase text-[#f4f1ea]">
                    {group.code} · {group.title}
                  </span>
                </div>
                <p className="m-0 text-[12px] leading-[1.6] text-[#9ea6b8] font-medium">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StickyLayer>
  );
}
