"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import StickyLayer from "@/components/StickyLayer";
import { PROFILE } from "@/data/portfolioData";
import { useStrike } from "@/context/StrikeContext";

type NozzleType = "skinny" | "fat" | "soft" | "splatter" | "calligraphy";

const SPRAY_COLORS = [
  { hex: "#e9ff2e", label: "Fluorescent yellow" },
  { hex: "#ff3d8b", label: "Pink" },
  { hex: "#22d3ff", label: "Cyan" },
  { hex: "#ff3b24", label: "Red" },
  { hex: "#3dff8a", label: "Green" },
  { hex: "#ffb12b", label: "Amber" },
  { hex: "#f4f1ea", label: "White" },
  { hex: "#0b0d12", label: "Black" },
];

const NOZZLES: { id: NozzleType; label: string; dotClass: string }[] = [
  { id: "skinny", label: "Skinny", dotClass: "spray-cap-skinny" },
  { id: "fat", label: "Fat", dotClass: "spray-cap-fat" },
  { id: "soft", label: "Soft", dotClass: "spray-cap-soft" },
  { id: "splatter", label: "Splatter", dotClass: "spray-cap-splatter" },
  { id: "calligraphy", label: "Calligraphy", dotClass: "spray-cap-calligraphy" },
];

interface Drip {
  x: number;
  y: number;
  r: number;
  vy: number;
  life: number;
  color: string;
}

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function FooterContact() {
  const { lang, playClick } = useStrike();
  const [copied, setCopied] = useState(false);

  // Spray Wall state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#e9ff2e");
  const [customActive, setCustomActive] = useState(false);
  const [nozzle, setNozzle] = useState<NozzleType>("skinny");
  const [size, setSize] = useState(14);
  const [pressurePct, setPressurePct] = useState(70);
  const [antidrip, setAntidrip] = useState(false);
  const [hasPainted, setHasPainted] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  const isPaintingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const dripsRef = useRef<Drip[]>([]);
  const dripRafRef = useRef<number | null>(null);

  const saveSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current.push(snap);
    if (historyRef.current.length > 20) historyRef.current.shift();
    setHistoryCount(historyRef.current.length);
  }, []);

  const handleUndo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || historyRef.current.length === 0) return;
    const prev = historyRef.current.pop();
    if (prev) {
      ctx.putImageData(prev, 0, 0);
      setHistoryCount(historyRef.current.length);
    }
    if (historyRef.current.length === 0) {
      setHasPainted(false);
    }
    dripsRef.current = [];
  }, []);

  // Keyboard Undo (Ctrl+Z / Cmd+Z)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        const activeTag = document.activeElement?.tagName;
        if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleUndo]);

  // Gravity Paint Drips rAF loop - runs only while active drips exist
  const startDripLoop = useCallback(() => {
    if (dripRafRef.current !== null) return;
    const stepDrips = () => {
      dripRafRef.current = null;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx && dripsRef.current.length > 0) {
        const next: Drip[] = [];
        for (const d of dripsRef.current) {
          d.y += d.vy;
          d.life -= 1;
          d.r = Math.max(1.2, d.r * 0.992);
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(d.color, 0.72);
          ctx.fill();
          if (d.life > 0 && d.y < canvas.height) {
            next.push(d);
          }
        }
        dripsRef.current = next;
      }
      if (dripsRef.current.length > 0) {
        dripRafRef.current = requestAnimationFrame(stepDrips);
      }
    };
    dripRafRef.current = requestAnimationFrame(stepDrips);
  }, []);

  useEffect(() => {
    return () => {
      if (dripRafRef.current !== null) {
        cancelAnimationFrame(dripRafRef.current);
      }
    };
  }, []);

  const getCanvasPointFromClient = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>) =>
    getCanvasPointFromClient(e.clientX, e.clientY);

  const sprayAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pressure = pressurePct / 100;
    const brushSize = size * 2;

    if (nozzle === "fat") {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
      grad.addColorStop(0, hexToRgba(color, pressure * 0.45));
      grad.addColorStop(0.55, hexToRgba(color, pressure * 0.2));
      grad.addColorStop(1, hexToRgba(color, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();

      const dots = Math.floor(14 * pressure + 6);
      for (let i = 0; i < dots; i++) {
        const a = Math.random() * Math.PI * 2;
        const rad = Math.random() * brushSize * 1.15;
        ctx.fillStyle = hexToRgba(color, pressure * 0.55);
        ctx.fillRect(
          x + Math.cos(a) * rad,
          y + Math.sin(a) * rad,
          1.8,
          1.8,
        );
      }
    } else if (nozzle === "skinny") {
      const r = Math.max(4, brushSize * 0.35);
      ctx.fillStyle = hexToRgba(color, pressure * 0.85);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    } else if (nozzle === "soft") {
      const r = brushSize * 1.35;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, hexToRgba(color, pressure * 0.16));
      grad.addColorStop(1, hexToRgba(color, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    } else if (nozzle === "splatter") {
      const count = Math.floor(24 * pressure + 8);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.7) * brushSize * 1.4;
        const dr = Math.random() * 4.5 + 1;
        ctx.beginPath();
        ctx.arc(
          x + Math.cos(a) * dist,
          y + Math.sin(a) * dist,
          dr,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = hexToRgba(color, pressure * 0.8);
        ctx.fill();
      }
    } else if (nozzle === "calligraphy") {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-Math.PI / 4);
      ctx.fillStyle = hexToRgba(color, pressure * 0.9);
      ctx.fillRect(-brushSize * 0.45, -4, brushSize * 0.9, 8);
      ctx.restore();
    }

    if (
      !antidrip &&
      (nozzle === "fat" || nozzle === "skinny") &&
      Math.random() < 0.12 * pressure
    ) {
      dripsRef.current.push({
        x: x + (Math.random() - 0.5) * brushSize * 0.5,
        y: y + brushSize * 0.25,
        r: Math.random() * 2.5 + 2,
        vy: Math.random() * 1.2 + 0.6,
        life: Math.floor(Math.random() * 65 + 35),
        color,
      });
      startDripLoop();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    saveSnapshot();
    setHasPainted(true);
    isPaintingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = getCanvasPoint(e);
    lastPointRef.current = pt;
    sprayAt(pt.x, pt.y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPaintingRef.current) return;
    const nativeEvt = e.nativeEvent as PointerEvent;
    const events = nativeEvt.getCoalescedEvents
      ? nativeEvt.getCoalescedEvents()
      : [nativeEvt];
    const samples = events.length > 0 ? events : [nativeEvt];

    for (const sample of samples) {
      const pt = getCanvasPointFromClient(sample.clientX, sample.clientY);
      const last = lastPointRef.current ?? pt;
      const dist = Math.hypot(pt.x - last.x, pt.y - last.y);
      const steps = Math.max(1, Math.ceil(dist / 6));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        sprayAt(last.x + (pt.x - last.x) * t, last.y + (pt.y - last.y) * t);
      }
      lastPointRef.current = pt;
    }
  };

  const handlePointerUp = () => {
    isPaintingRef.current = false;
    lastPointRef.current = null;
  };

  const handleClear = () => {
    playClick();
    saveSnapshot();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    dripsRef.current = [];
    setHasPainted(false);
  };

  const handleDownload = () => {
    playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ex = exportCanvas.getContext("2d");
    if (!ex) return;

    ex.fillStyle = "#161820";
    ex.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    ex.strokeStyle = "rgba(0,0,0,0.45)";
    ex.lineWidth = 3;
    for (let y = 0; y < exportCanvas.height; y += 48) {
      ex.beginPath();
      ex.moveTo(0, y);
      ex.lineTo(exportCanvas.width, y);
      ex.stroke();
      const offset = (y / 48) % 2 === 0 ? 0 : 75;
      for (let x = offset; x < exportCanvas.width; x += 150) {
        ex.beginPath();
        ex.moveTo(x, y);
        ex.lineTo(x, y + 48);
        ex.stroke();
      }
    }

    ex.drawImage(canvas, 0, 0);
    const link = document.createElement("a");
    link.download = "athallah-spray-tag.png";
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StickyLayer
      id="contacto"
      zIndex={8}
      nowPlayingLabel="OUTRO · CONTACT"
      nowPlayingColor="#3dff8a"
      className="shutter-surface"
    >
      {/* ── CONTACT + SPRAY WALL (.contact) ─────────────────────── */}
      <div className="pt-[130px] pb-[120px] px-4 sm:px-8 lg:px-14 w-full">
        <div className="contact-inner">
          {/* Left Column: Editorial Contact Pitch (.contact-copy) */}
          <div>
            <h2
              className="font-sign uppercase m-0 leading-[0.95] tracking-[-0.01em] text-[#f4f1ea]"
              style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)" }}
            >
              {lang === "id" ? (
                <>
                  MAU BANGUN{" "}
                  <span className="font-tag font-normal text-[#e9ff2e] normal-case tracking-normal">
                    sistem berikutnya
                  </span>
                  ?
                </>
              ) : (
                <>
                  SHALL WE BUILD{" "}
                  <span className="font-tag font-normal text-[#e9ff2e] normal-case tracking-normal">
                    the next set
                  </span>
                  ?
                </>
              )}
            </h2>

            <p className="max-w-[46ch] mt-[18px] mb-0 text-[#d6d9e1] text-[17px] sm:text-[18px] leading-[1.55]">
              {lang === "id" ? (
                <>
                  Butuh backend Laravel aman, bot WhatsApp AI, atau web &amp;
                  aplikasi mobile yang cepat? Berdomisili di Banjarbaru dan siap
                  pindah ke Bandung.{" "}
                  <strong className="text-[#f4f1ea] font-extrabold">
                    Mari ngobrol.
                  </strong>
                </>
              ) : (
                <>
                  Need a secure Laravel backend, an AI WhatsApp ordering bot, or
                  a crisp Next.js &amp; Flutter app? Based in Banjarbaru and
                  open to relocate to Bandung.{" "}
                  <strong className="text-[#f4f1ea] font-extrabold">
                    Let&apos;s talk.
                  </strong>
                </>
              )}
            </p>

            {/* Giant Yellow Bungee Email with Pink Underline Grow */}
            <a
              href={`mailto:${PROFILE.email}?subject=Let%27s%20talk%20about%20a%20project`}
              onClick={() => playClick()}
              className="big-mail"
            >
              {PROFILE.email.toUpperCase()}
            </a>

            {/* Primary Actions: Ghost Copy Email + Sticker Green WhatsApp */}
            <div className="mt-[26px] flex flex-wrap gap-3.5">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="strike-btn inline-flex items-center gap-2.5 px-[22px] py-[14px] rounded-[14px] border-[3px] border-[#3b4250] bg-transparent text-[#f4f1ea] font-sign text-[15px] tracking-[0.02em] leading-[1.1] hover:border-[#e9ff2e] hover:text-[#e9ff2e] cursor-pointer"
                style={{ "--r": "0deg", boxShadow: "none" } as React.CSSProperties}
              >
                <svg
                  className="w-[20px] h-[20px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>
                  {copied
                    ? lang === "id"
                      ? "EMAIL TERSALIN"
                      : "COPIED"
                    : lang === "id"
                      ? "SALIN EMAIL"
                      : "COPY EMAIL"}
                </span>
              </button>

              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                style={{ "--r": "1.5deg" } as React.CSSProperties}
                className="strike-btn inline-flex items-center gap-2.5 px-[22px] py-[14px] rounded-[14px] border-[3px] border-white bg-[#3dff8a] text-[#0b0d12] font-sign text-[15px] tracking-[0.02em] leading-[1.1] shadow-[0_2px_2px_rgba(0,0,0,0.35),0_10px_22px_-6px_rgba(0,0,0,0.55)]"
              >
                <svg
                  className="w-[20px] h-[20px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>{PROFILE.whatsappDisplay}</span>
              </a>
            </div>

            {/* Secondary Inline Underlined Links */}
            <div className="mt-[28px] flex flex-wrap gap-x-7 gap-y-2.5">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="inline-flex items-center gap-2 text-[#b9bfcc] font-bold text-[15px] underline underline-offset-[5px] decoration-[#3b4250] hover:text-[#22d3ff] hover:decoration-[#22d3ff] transition-colors"
              >
                <svg
                  className="w-[18px] h-[18px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span>linkedin.com/in/athallahsy</span>
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="inline-flex items-center gap-2 text-[#b9bfcc] font-bold text-[15px] underline underline-offset-[5px] decoration-[#3b4250] hover:text-[#22d3ff] hover:decoration-[#22d3ff] transition-colors"
              >
                <svg
                  className="w-[18px] h-[18px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>github.com/Athallahsy</span>
              </a>
            </div>
          </div>

          {/* Right Column: Brick Spray Wall ABOVE Spray Kit Tray (.spray-kit) */}
          <div className="spray-kit" id="sprayKit">
            {/* Brick Wall Canvas Frame */}
            <div className="spray-wall-frame">
              <canvas
                ref={canvasRef}
                width={1200}
                height={960}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair block"
                aria-label="Wall for spray painting. Drag to leave your tag."
              />

              <p
                aria-hidden="true"
                className={`spray-wall-hint m-0 ${hasPainted ? "opacity-0" : "opacity-100"}`}
              >
                {lang === "id" ? "Tinggalkan tag di sini" : "Leave your tag here"}
              </p>

              <button
                type="button"
                onClick={handleDownload}
                style={{ "--r": "-1.5deg" } as React.CSSProperties}
                className="strike-btn absolute right-3 top-3 z-[3] inline-flex items-center gap-2 px-3.5 py-[9px] rounded-[11px] border-2 border-white bg-[#e9ff2e] text-[#0b0d12] font-sign text-[13px] tracking-[0.02em] leading-[1.1] shadow-[0_2px_2px_rgba(0,0,0,0.35),0_10px_22px_-6px_rgba(0,0,0,0.55)] cursor-pointer"
              >
                <svg
                  className="w-[17px] h-[17px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>
                  {lang === "id" ? "UNDUH TAG KAMU" : "TAKE YOUR TAG HOME"}
                </span>
              </button>
            </div>

            {/* Control Kit Tray BELOW Brick Wall (.kit) */}
            <div className="spray-kit-tray" role="group" aria-label="Spray tools">
              {/* Row 1: Spray Paint Cans */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                <span
                  id="colorLabel"
                  className="min-w-[74px] font-sign text-[12px] tracking-[0.06em] text-[#e9ff2e] uppercase"
                >
                  {lang === "id" ? "WARNA" : "COLOR"}
                </span>
                <div
                  className="flex flex-wrap items-end gap-2.5 pt-2.5"
                  role="radiogroup"
                  aria-labelledby="colorLabel"
                >
                  {SPRAY_COLORS.map((c) => {
                    const isSelected =
                      !customActive &&
                      color.toLowerCase() === c.hex.toLowerCase();
                    return (
                      <button
                        key={c.hex}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={c.label}
                        onClick={() => {
                          playClick();
                          setCustomActive(false);
                          setColor(c.hex);
                        }}
                        className="spray-can"
                        style={{ "--c": c.hex } as React.CSSProperties}
                      />
                    );
                  })}
                  <label
                    title="Custom color"
                    className={`spray-can spray-can-custom ${customActive ? "is-active" : ""}`}
                  >
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => {
                        setCustomActive(true);
                        setColor(e.target.value);
                      }}
                      aria-label="Custom color"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {/* Row 2: Capsule Nozzle Caps with Spray Previews */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                <span
                  id="capLabel"
                  className="min-w-[74px] font-sign text-[12px] tracking-[0.06em] text-[#e9ff2e] uppercase"
                >
                  CAP
                </span>
                <div
                  className="flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-labelledby="capLabel"
                >
                  {NOZZLES.map((n) => {
                    const isChecked = nozzle === n.id;
                    return (
                      <button
                        key={n.id}
                        type="button"
                        role="radio"
                        aria-checked={isChecked}
                        onClick={() => {
                          playClick();
                          setNozzle(n.id);
                        }}
                        className={`spray-cap ${n.dotClass}`}
                      >
                        <span className="spray-cap-dot" aria-hidden="true" />
                        <span>{n.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Size, Pressure, Antidrip Switch & Undo/Clear Icon Buttons */}
              <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3.5 pt-1">
                <div className="flex-1 basis-[140px] grid gap-1 text-[13px] font-bold text-[#b9bfcc]">
                  <span className="flex items-center gap-1.5">
                    <label htmlFor="sizeRange" className="cursor-pointer">
                      {lang === "id" ? "Ukuran" : "Size"}
                    </label>
                    <output
                      htmlFor="sizeRange"
                      className="text-[#f4f1ea] tabular-nums"
                    >
                      {size}
                    </output>
                  </span>
                  <input
                    id="sizeRange"
                    type="range"
                    min={3}
                    max={48}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="w-full accent-[#e9ff2e]"
                  />
                </div>

                <div className="flex-1 basis-[140px] grid gap-1 text-[13px] font-bold text-[#b9bfcc]">
                  <span className="flex items-center gap-1.5">
                    <label htmlFor="flowRange" className="cursor-pointer">
                      {lang === "id" ? "Tekanan" : "Pressure"}
                    </label>
                    <output
                      htmlFor="flowRange"
                      className="text-[#f4f1ea] tabular-nums"
                    >
                      {pressurePct}%
                    </output>
                  </span>
                  <input
                    id="flowRange"
                    type="range"
                    min={15}
                    max={100}
                    value={pressurePct}
                    onChange={(e) => setPressurePct(Number(e.target.value))}
                    className="w-full accent-[#e9ff2e]"
                  />
                </div>

                <label className="relative inline-flex items-center gap-2 cursor-pointer text-[13px] font-extrabold text-[#b9bfcc] select-none">
                  <input
                    type="checkbox"
                    checked={antidrip}
                    onChange={() => {
                      playClick();
                      setAntidrip((prev) => !prev);
                    }}
                    className="sr-only peer"
                  />
                  <span
                    aria-hidden="true"
                    className="relative w-10 h-[22px] rounded-full bg-[#3b4250] transition-colors peer-checked:bg-[#3dff8a] peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-[#e9ff2e] after:content-[''] after:absolute after:left-[3px] after:top-[3px] after:w-4 after:h-4 after:rounded-full after:bg-[#f4f1ea] after:transition-transform peer-checked:after:translate-x-[18px]"
                  />
                  <span>Antidrip</span>
                </label>

                <div className="flex gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      handleUndo();
                    }}
                    disabled={historyCount === 0}
                    aria-label="Undo (Ctrl + Z)"
                    title="Undo (Ctrl + Z)"
                    className="spray-icon-btn"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M9 14 4 9l5-5" />
                      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label={lang === "id" ? "Bersihkan tembok" : "Clear the wall"}
                    title={lang === "id" ? "Bersihkan tembok" : "Clear the wall"}
                    className="spray-icon-btn"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
                      <path d="M22 21H7" />
                      <path d="m5 11 9 9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SHUTTER FOOTER WITH HAZARD STRIPE (.footer) ──────────── */}
      <footer className="strike-footer">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] gap-8 md:gap-12">
          {/* Col 1: Brand Tag + Bio */}
          <div>
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                playClick();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-block font-tag leading-none no-underline text-[#e9ff2e] -rotate-[4deg]"
              style={{
                fontSize: "clamp(3rem, 6vw, 4.6rem)",
                textShadow: "3px 3px 0px #ff3d8b",
              }}
            >
              {PROFILE.tagName}
            </a>
            <p className="mt-[18px] mb-0 text-[#b9bfcc] text-[15px] leading-[1.55] max-w-[34ch]">
              {lang === "id"
                ? "Fullstack developer dengan eksekusi cepat & rapi. Dari masalah produksi hingga sistem yang teruji."
                : "Fullstack developer with street flow. From tricky production bugs to reliable shipped systems."}
            </p>
          </div>

          {/* Col 2: Single-Column Setlist */}
          <nav aria-label="Footer">
            <h2 className="m-0 mb-3.5 font-sign font-normal text-[15px] tracking-[0.06em] text-[#e9ff2e]">
              SETLIST
            </h2>
            <ul className="grid gap-2 m-0 p-0 list-none">
              {[
                { label: lang === "id" ? "Intro" : "Warm-up", id: "previa" },
                { label: lang === "id" ? "Karier" : "Career", id: "trayectoria" },
                { label: lang === "id" ? "Portofolio" : "Portfolio", id: "portafolio" },
                { label: "Skills", id: "skills" },
                { label: lang === "id" ? "Edukasi" : "Education", id: "formacion" },
                { label: lang === "id" ? "Catatan" : "Notes & Cases", id: "articulos" },
                { label: lang === "id" ? "Kontak" : "Contact", id: "contacto" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      playClick();
                      document
                        .getElementById(item.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center text-[#d6d9e1] font-bold hover:text-[#e9ff2e] hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Let's Talk with Inline SVG Icons */}
          <div>
            <h2 className="m-0 mb-3.5 font-sign font-normal text-[15px] tracking-[0.06em] text-[#e9ff2e]">
              {lang === "id" ? "MARI NGOBROL" : "LET'S TALK"}
            </h2>
            <ul className="grid gap-2 m-0 p-0 list-none">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2.5 text-[#d6d9e1] font-bold hover:text-[#e9ff2e] hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <svg
                    className="w-[18px] h-[18px] text-[#b9bfcc] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>{PROFILE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#d6d9e1] font-bold hover:text-[#e9ff2e] hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <svg
                    className="w-[18px] h-[18px] text-[#b9bfcc] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>{PROFILE.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#d6d9e1] font-bold hover:text-[#e9ff2e] hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <svg
                    className="w-[18px] h-[18px] text-[#b9bfcc] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[#d6d9e1] font-bold hover:text-[#e9ff2e] hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <svg
                    className="w-[18px] h-[18px] text-[#b9bfcc] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1320px] mx-auto mt-12 pt-[22px] border-t border-white/10 flex flex-wrap items-center justify-between gap-x-7 gap-y-3 text-[14px] text-[#8a91a1]">
          <p className="m-0">
            © {new Date().getFullYear()} {PROFILE.fullName} · {PROFILE.location}
          </p>
          <button
            type="button"
            onClick={() => {
              playClick();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 bg-transparent border-0 p-0 text-[#f4f1ea] font-bold hover:text-[#e9ff2e] transition-colors cursor-pointer"
          >
            <span>{lang === "id" ? "Kembali ke atas" : "Back to top"}</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </footer>
    </StickyLayer>
  );
}
