"use client";

import { useEffect, useRef, useState } from "react";
import StickyLayer from "@/components/StickyLayer";
import SevenSeg from "@/components/SevenSeg";
import { TRACKS } from "@/data/portfolioData";
import { useStrike } from "@/context/StrikeContext";
import { pointerLerp } from "@/lib/pointerLerp";
import { useGhostDrift } from "@/lib/useGhostDrift";

export default function TurntableSection() {
  const {
    lang,
    isPlayingBeat,
    toggleBeat,
    activeTrackIdx,
    setActiveTrackIdx,
    playClick,
    playScratch,
  } = useStrike();

  const activeTrack = TRACKS[activeTrackIdx] ?? TRACKS[0];

  const sectionWrapRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const plinthRef = useRef<HTMLDivElement>(null);
  const platterRef = useRef<HTMLDivElement>(null);

  const angleRef = useRef(0);
  const scratchDeltaAccumRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isInViewRef = useRef(false);
  const lastPointerAngleRef = useRef(0);

  const [isScratching, setIsScratching] = useState(false);
  const [visualSpin, setVisualSpin] = useState(false);

  const isSpinning = isPlayingBeat || visualSpin;

  // Auto-spin platter visually when entering viewport (threshold 0.25) & pause when offscreen
  useEffect(() => {
    const wrap = sectionWrapRef.current;
    if (!wrap) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !prefersReduced) {
          setVisualSpin(true);
        } else if (!entry.isIntersecting) {
          setVisualSpin(false);
        }
      },
      { threshold: 0.25 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  // 3D Perspective Tilt (--rx, --ry) on .plinth via pointerLerp
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (prefersReduced || !finePointer) return;

    const unsub = pointerLerp.subscribe((wx, wy) => {
      const plinth = plinthRef.current;
      if (!plinth) return;
      const rect = plinth.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible && !isDraggingRef.current) {
        plinth.style.setProperty("--rx", `${(-wy * 8 + 4).toFixed(2)}deg`);
        plinth.style.setProperty("--ry", `${(wx * 10).toFixed(2)}deg`);
      } else {
        plinth.style.setProperty("--rx", "0deg");
        plinth.style.setProperty("--ry", "0deg");
      }
    });

    return () => unsub();
  }, []);

  // Ghost watermark horizontal scroll drift via batched scrollEngine
  useGhostDrift(sectionWrapRef, ghostRef);

  // Smooth rAF platter rotation — ONLY runs while visible in viewport and spinning
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || !isSpinning || !visualSpin) return;

    let rafId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(50, now - lastTime);
      lastTime = now;

      if (isInViewRef.current && !isDraggingRef.current) {
        angleRef.current = (angleRef.current + dt * 0.16) % 360;
        if (platterRef.current) {
          platterRef.current.style.transform = `rotate(${angleRef.current}deg)`;
          platterRef.current.setAttribute(
            "aria-valuenow",
            String(activeTrackIdx + 1),
          );
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isSpinning, visualSpin, activeTrackIdx]);

  const getPointerAngle = (
    clientX: number,
    clientY: number,
    el: HTMLElement,
  ) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const handlePlatterPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    scratchDeltaAccumRef.current = 0;
    setIsScratching(true);
    lastPointerAngleRef.current = getPointerAngle(
      e.clientX,
      e.clientY,
      e.currentTarget,
    );
    e.currentTarget.setPointerCapture(e.pointerId);
    playScratch(1.2);
  };

  const handlePlatterPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const nextAngle = getPointerAngle(e.clientX, e.clientY, e.currentTarget);
    let delta = nextAngle - lastPointerAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    lastPointerAngleRef.current = nextAngle;
    angleRef.current = (angleRef.current + delta) % 360;
    scratchDeltaAccumRef.current += delta;

    if (platterRef.current) {
      platterRef.current.style.transform = `rotate(${angleRef.current}deg)`;
    }
    if (Math.abs(delta) > 2.5) {
      playScratch(Math.min(3, Math.abs(delta) / 6));
    }

    if (scratchDeltaAccumRef.current >= 150) {
      scratchDeltaAccumRef.current = 0;
      setActiveTrackIdx((activeTrackIdx + 1) % TRACKS.length);
    } else if (scratchDeltaAccumRef.current <= -150) {
      scratchDeltaAccumRef.current = 0;
      setActiveTrackIdx(
        activeTrackIdx === 0 ? TRACKS.length - 1 : activeTrackIdx - 1,
      );
    }
  };

  const handlePlatterPointerUp = () => {
    isDraggingRef.current = false;
    setIsScratching(false);
  };

  const handlePlatterKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      angleRef.current = (angleRef.current + dir * 40) % 360;
      if (platterRef.current) {
        platterRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      }
      playScratch(1.4);
      setActiveTrackIdx(
        (activeTrackIdx + dir + TRACKS.length) % TRACKS.length,
      );
    } else if (e.key === " ") {
      e.preventDefault();
      toggleBeat();
    }
  };

  const handleSelectTrack = (idx: number) => {
    playScratch(1.5);
    setActiveTrackIdx(idx);
  };

  const tonearmAngle = isSpinning ? 14 + activeTrackIdx * 3.4 : 0;

  return (
    <StickyLayer
      id="trayectoria"
      zIndex={3}
      nowPlayingLabel="A2 · CAREER"
      nowPlayingColor="#e9ff2e"
      className="deck-section pt-24 md:pt-[120px] pb-32 md:pb-[156px] px-4 sm:px-8 lg:px-14"
    >
      <div ref={sectionWrapRef} className="relative max-w-[1320px] mx-auto w-full">
        {/* Outlined Horizontal Scroll-Drift Ghost Watermark (.ghost) */}
        <div
          ref={ghostRef}
          aria-hidden="true"
          className="pointer-events-none select-none font-sign uppercase absolute left-0 whitespace-nowrap"
          style={{
            top: "clamp(-30px, -1vw, 10px)",
            fontSize: "clamp(7rem, 20vw, 19rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(244, 241, 234, 0.1)",
            willChange: "transform",
          }}
        >
          {lang === "id" ? "REKAM JEJAK REKAM JEJAK" : "CAREER CAREER"}
        </div>

        {/* Section Head matching Strike.uno (.section-head) */}
        <div className="relative z-10 mb-10 flex flex-wrap items-end gap-x-8 gap-y-3">
          <h2
            className="font-sign uppercase m-0 leading-[0.95] tracking-[-0.01em] text-[#f4f1ea]"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)" }}
          >
            {lang === "id" ? "KARIR & KARYA" : "CAREER"}
          </h2>

          <p className="flex-1 basis-[520px] max-w-[64ch] pb-2 m-0 text-[#b9bfcc] text-[16px] sm:text-[17px] leading-[1.55]">
            {lang === "id" ? (
              <>
                Setiap proyek, tim, dan tantangan ikut membentuk cara saya
                membangun software hari ini — dari sistem produksi hingga proyek
                keluarga.{" "}
                <strong className="text-[#f4f1ea] font-extrabold">
                  Putar piringan ceritanya.
                </strong>
              </>
            ) : (
              <>
                Every project, team, and production challenge has shaped the way
                I engineer software today. Some tracks shipped fast, others
                taught hard security lessons.{" "}
                <strong className="text-[#f4f1ea] font-extrabold">
                  Press play on my story.
                </strong>
              </>
            )}
          </p>
        </div>

        {/* .deck-layout: Equal 2-Column Split (1fr 1fr above 900px) */}
        <div className="relative z-10 grid grid-cols-1 min-[901px]:grid-cols-2 gap-7 lg:gap-16 items-start">
          {/* LEFT COLUMN: Sticky Turntable Plinth (.deck > .plinth) */}
          <div className="min-[901px]:sticky min-[901px]:top-24 w-full max-w-[560px] mx-auto min-[901px]:max-w-none">
            <div ref={plinthRef} className="plinth">
              {/* Platter + Vinyl Record + Sheen */}
              <div className="platter">
                <div
                  ref={platterRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Career vinyl record. Drag or use arrow keys to switch tracks."
                  aria-valuemin={1}
                  aria-valuemax={TRACKS.length}
                  aria-valuenow={activeTrackIdx + 1}
                  aria-valuetext={`${activeTrack.code}: ${activeTrack.title} - ${activeTrack.role}`}
                  onPointerDown={handlePlatterPointerDown}
                  onPointerMove={handlePlatterPointerMove}
                  onPointerUp={handlePlatterPointerUp}
                  onKeyDown={handlePlatterKeyDown}
                  className={`vinyl-record outline-none focus-visible:ring-2 focus-visible:ring-[#e9ff2e] ${
                    isScratching ? "cursor-grabbing" : "cursor-grab"
                  }`}
                >
                  {/* Color-Coded Center Label (.record-label) */}
                  <div
                    className="absolute left-1/2 top-1/2 w-[34%] aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-0.5 text-center transition-colors duration-300"
                    style={{
                      background: activeTrack.color,
                      color: "#0b0d12",
                    }}
                  >
                    <span className="font-sign text-[10px] sm:text-[13px] leading-none">
                      {activeTrack.code}
                    </span>
                    <span className="max-w-[86%] font-tag text-[12px] sm:text-[17px] leading-none line-clamp-2">
                      {activeTrack.title}
                    </span>
                    <span className="font-extrabold text-[8px] sm:text-[10px] tracking-[0.06em] uppercase">
                      {activeTrack.period}
                    </span>
                    <span className="absolute left-[46.5%] top-[46.5%] w-[7%] aspect-square rounded-full bg-[#c9ced8]" />
                  </div>
                </div>
                <div className="record-sheen" />
              </div>

              {/* Pivoting SVG Tonearm with Red Cartridge */}
              <svg
                viewBox="0 0 120 330"
                aria-hidden="true"
                focusable="false"
                style={{
                  transform: `rotate(${tonearmAngle}deg)`,
                  transformOrigin: "50% 12.1%",
                  transition: "transform 0.8s var(--ease-out)",
                  filter: "drop-shadow(4px 10px 8px rgba(0, 0, 0, 0.6))",
                }}
                className="absolute right-[4%] top-[4%] w-[15%] h-auto pointer-events-none"
              >
                <circle
                  cx="60"
                  cy="40"
                  r="30"
                  fill="#1d212b"
                  stroke="#3b4250"
                  strokeWidth="3"
                />
                <circle cx="60" cy="40" r="12" fill="#c9ced8" />
                <path
                  d="M60 40 L60 250 L40 285"
                  fill="none"
                  stroke="#c9ced8"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="24"
                  y="278"
                  width="30"
                  height="40"
                  rx="5"
                  transform="rotate(28 39 298)"
                  fill="#ff3b24"
                />
              </svg>

              {/* Bottom Deck Controls (.deck-controls) */}
              <div className="absolute left-[6%] right-[6%] bottom-[5%] flex items-center gap-3 sm:gap-[18px]">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    toggleBeat();
                  }}
                  aria-pressed={isPlayingBeat}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border-2 bg-[#2b303c] font-sign text-[13px] cursor-pointer transition-colors ${
                    isPlayingBeat
                      ? "border-[#3dff8a] text-[#3dff8a]"
                      : "border-[#3b4250] text-[#f4f1ea] hover:border-[#e9ff2e]"
                  }`}
                  style={{ boxShadow: "inset 0 -3px rgba(0,0,0,0.4)" }}
                >
                  <span>{isPlayingBeat ? "❚❚" : "▶"}</span>
                  <span className="hidden sm:inline">
                    {isPlayingBeat ? "Pause" : "Play"}
                  </span>
                </button>

                <div className="flex items-end gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#232836] bg-[#07080b]">
                  <SevenSeg value="90" color="#ff3b24" height={20} />
                  <small className="text-[#8a91a1] text-[11px] font-extrabold tracking-[0.08em] leading-none">
                    BPM
                  </small>
                </div>

                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#232836] bg-[#07080b]">
                  <span
                    className="w-[9px] h-[9px] rounded-full bg-[#ff3b24]"
                    style={{ boxShadow: "0 0 8px #ff3b24" }}
                  />
                  <small className="text-[#8a91a1] text-[11px] font-extrabold tracking-[0.08em] leading-none">
                    33⅓
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Open Tracklist (.tracklist) + Taped Detail Card (#trackDetail) */}
          <div>
            <ol className="m-0 p-0 list-none border-t-2 border-[#232836]">
              {TRACKS.map((track, idx) => {
                const isActive = idx === activeTrackIdx;
                return (
                  <li key={track.code}>
                    <button
                      type="button"
                      aria-current={isActive ? "true" : "false"}
                      onClick={() => handleSelectTrack(idx)}
                      style={{ "--tc": track.color } as React.CSSProperties}
                      className="track-row"
                    >
                      <span
                        className={`font-sign text-[14px] ${
                          isActive
                            ? "justify-self-start px-1.5 py-0.5 rounded-[6px] text-[#0b0d12]"
                            : "text-[#8a91a1]"
                        }`}
                        style={{
                          background: isActive ? track.color : "transparent",
                        }}
                      >
                        {track.code}
                      </span>

                      <span className="min-w-0">
                        <span
                          className="block font-sign leading-[1.15]"
                          style={{
                            fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
                            color: isActive ? track.color : "#f4f1ea",
                          }}
                        >
                          {track.title}
                        </span>
                        <span className="block mt-0.5 text-[14.5px] text-[#b9bfcc]">
                          {track.role}
                        </span>
                      </span>

                      <span className="t-yr text-[#b9bfcc] font-extrabold text-[13px] tracking-[0.04em] tabular-nums whitespace-nowrap flex items-center">
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="inline-flex items-end gap-[2px] h-4 mr-2.5 px-[3px] py-[2px] rounded-[3px] bg-[#07080b]"
                          >
                            {[0, -0.3, -0.55, -0.15].map((delay, b) => (
                              <i
                                key={b}
                                className="w-[3px] eq-bar block not-italic"
                                style={{
                                  height: "100%",
                                  background: track.color,
                                  animationDelay: `${delay}s`,
                                }}
                              />
                            ))}
                          </span>
                        )}
                        <span>{track.period}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Taped Paper Liner-Note Card (#trackDetail) */}
            <article
              key={activeTrack.code}
              aria-live="polite"
              style={{ "--tc": activeTrack.color } as React.CSSProperties}
              className="track-detail-card animate-swap-in"
            >
              <h3 className="font-sign text-[1.35rem] leading-[1.15] text-[#0b0d12] m-0">
                {activeTrack.role}
              </h3>
              <p className="mt-1.5 mb-0 text-[#4a4d55] text-[14px] font-bold tracking-[0.04em] uppercase">
                {activeTrack.title} · {activeTrack.period}
              </p>

              <p className="mt-4 mb-0 text-[#24262c] text-[15.5px] leading-relaxed">
                {activeTrack.summary[lang]}
              </p>

              <ul className="td-list grid gap-2.5 mt-4 p-0 list-none">
                {activeTrack.highlights[lang].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </StickyLayer>
  );
}
