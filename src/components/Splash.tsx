"use client";

import { useEffect, useRef, useState } from "react";
import { useStrike } from "@/context/StrikeContext";

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const { lang, playShutter, playClick, setDoorOpened } = useStrike();
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const startYRef = useRef<number | null>(null);

  const openShutter = () => {
    if (isOpening) return;
    setIsOpening(true);
    setDoorOpened(true);
    playShutter();
    document.body.style.overflow = "";
    window.setTimeout(() => {
      onComplete();
    }, 1150);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        openShutter();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isOpening) return;
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    startYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startYRef.current === null || isOpening) return;
    const delta = Math.min(0, e.clientY - startYRef.current);
    setDragY(delta);
    if (delta < -110) {
      setIsDragging(false);
      openShutter();
    }
  };

  const handlePointerUp = () => {
    if (!isDragging || isOpening) return;
    setIsDragging(false);
    if (dragY < -55) {
      openShutter();
    } else {
      setDragY(0);
    }
  };

  const promptText =
    lang === "id"
      ? "TARIK ROLLING DOOR KE ATAS"
      : "PULL UP THE SHUTTER";

  return (
    <div
      role="dialog"
      aria-label="Roll-up shutter entrance"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={() => openShutter()}
      className="fixed inset-0 z-[9999] shutter-surface flex flex-col justify-between select-none touch-none cursor-grab active:cursor-grabbing"
      style={{
        transform: isOpening
          ? "translateY(-101%)"
          : `translateY(${dragY}px)`,
        transition: isDragging
          ? "none"
          : "transform 1.15s cubic-bezier(0.7, 0, 0.2, 1)",
        borderBottom: "10px solid #1e222d",
        boxShadow: "0 24px 60px rgba(0,0,0,0.95)",
      }}
    >
      {/* Top Metal Lock Rail */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#232836] bg-[#090b10]/85">
        <span className="font-sign text-[11px] tracking-[0.2em] text-[#8a91a1]">
          VOL. 05 // BANJARBARU - BOGOR
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            openShutter();
          }}
          className="px-3 py-1 border border-[#3b4250] bg-[#12151c] text-[11px] font-bold uppercase tracking-[0.16em] text-[#e9ff2e] hover:bg-[#e9ff2e] hover:text-[#0b0d12] transition-colors cursor-pointer"
        >
          {lang === "id" ? "BUKA SEKARANG" : "OPEN SHUTTER"} ↑
        </button>
      </div>

      {/* Center Street Tag */}
      <div className="flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <span
          className="font-tag uppercase text-[#ff3d8b] mb-3 -rotate-2"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.35rem)" }}
        >
          FULLSTACK DEVELOPER · EST. IDN
        </span>
        <div
          className="font-tag uppercase leading-none select-none -rotate-2"
          style={{
            fontSize: "clamp(3.4rem, 13vw, 9.2rem)",
            color: "#e9ff2e",
            textShadow: "6px 6px 0px #ff3d8b, 12px 12px 24px rgba(0,0,0,0.85)",
          }}
        >
          ATHALLAH
        </div>
        <p className="mt-6 font-sign text-xs sm:text-sm tracking-[0.24em] text-[#d6d9e1]/80 animate-pulse">
          ↑ {promptText} ↑
        </p>
      </div>

      {/* Bottom Shutter Pull Handle + Hazard Strip */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openShutter();
          }}
          className="group mb-4 flex flex-col items-center gap-2 cursor-pointer"
          aria-label="Open shutter"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9bfcc] group-hover:text-[#e9ff2e] transition-colors">
            {lang === "id" ? "KLIK ATAU GESER ATAS" : "CLICK OR DRAG UP"}
          </span>
          {/* Chrome Handle Bar */}
          <div className="w-40 h-4 rounded-full bg-gradient-to-b from-[#d6d9e1] to-[#687082] border-2 border-[#0b0d12] shadow-[0_6px_14px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform" />
        </button>
        <div className="hazard-stripe" />
      </div>
    </div>
  );
}
