"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Lang } from "@/data/portfolioData";

interface StrikeContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  soundEnabled: boolean;
  isPlayingBeat: boolean;
  toggleBeat: () => void;
  toggleSound: () => void;
  activeTrackIdx: number;
  setActiveTrackIdx: (idx: number) => void;
  nowPlaying: string;
  setNowPlaying: (label: string) => void;
  nowPlayingColor: string;
  setNowPlayingColor: (color: string) => void;
  doorOpened: boolean;
  setDoorOpened: (open: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  playClick: () => void;
  playSlap: () => void;
  playScratch: (intensity?: number) => void;
  playShutter: () => void;
  playCratePull: () => void;
}

const StrikeContext = createContext<StrikeContextValue | null>(null);

export function StrikeProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [nowPlaying, setNowPlaying] = useState("INTRO · SHUTTER");
  const [nowPlayingColor, setNowPlayingColor] = useState("#ff3b24");
  const [doorOpened, setDoorOpened] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);
  const schedulerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const nextNoteTimeRef = useRef(0);
  const lastScratchRef = useRef(0);

  const ensureAudio = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return null;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    if (!noiseBufferRef.current) {
      const bufferSize = ctx.sampleRate * 0.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      noiseBufferRef.current = buffer;
    }
    return ctx;
  }, []);

  // ── Procedural 90 BPM Boom-Bap Synthesizer ──────────────────
  const triggerKick = useCallback((ctx: AudioContext, time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.14);
    gain.gain.setValueAtTime(0.45, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.25);
  }, []);

  const triggerSnare = useCallback((ctx: AudioContext, time: number) => {
    const noise = noiseBufferRef.current;
    if (noise) {
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1750, time);
      filter.Q.setValueAtTime(0.9, time);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.24, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.17);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(time);
      src.stop(time + 0.18);
    }

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(185, time);
    osc.frequency.exponentialRampToValueAtTime(95, time + 0.08);
    oscGain.gain.setValueAtTime(0.22, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.11);
  }, []);

  const triggerHat = useCallback(
    (ctx: AudioContext, time: number, open: boolean) => {
      const noise = noiseBufferRef.current;
      if (!noise) return;
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(7500, time);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(open ? 0.11 : 0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + (open ? 0.18 : 0.045));
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(time);
      src.stop(time + (open ? 0.2 : 0.05));
    },
    [],
  );

  const triggerBass = useCallback(
    (ctx: AudioContext, time: number, freq: number) => {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, time);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, time);
      gain.gain.setValueAtTime(0.14, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.3);
    },
    [],
  );

  // Beat sequencer loop (90 BPM, 16-step boom-bap pattern with swing)
  useEffect(() => {
    if (!isPlayingBeat || !soundEnabled) {
      if (schedulerRef.current) {
        window.clearInterval(schedulerRef.current);
        schedulerRef.current = null;
      }
      return;
    }

    const ctx = ensureAudio();
    if (!ctx) return;

    const bpm = 90;
    const sixteenth = 60 / bpm / 4;
    nextNoteTimeRef.current = ctx.currentTime + 0.05;

    const kicks = new Set([0, 3, 7, 10]);
    const snares = new Set([4, 12]);
    const bassNotes: Record<number, number> = {
      0: 55, // A1
      6: 65.41, // C2
      10: 73.42, // D2
      14: 61.74, // B1
    };

    const schedule = () => {
      while (nextNoteTimeRef.current < ctx.currentTime + 0.12) {
        const s = stepRef.current % 16;
        // Classic MPC boom-bap swing on odd 16th steps
        const swingOffset = s % 2 === 1 ? sixteenth * 0.16 : 0;
        const t = nextNoteTimeRef.current + swingOffset;

        if (kicks.has(s)) triggerKick(ctx, t);
        if (snares.has(s)) triggerSnare(ctx, t);
        if (s % 2 === 0 || s === 15) triggerHat(ctx, t, s === 14);
        if (bassNotes[s]) triggerBass(ctx, t, bassNotes[s]);

        nextNoteTimeRef.current += sixteenth;
        stepRef.current = (stepRef.current + 1) % 16;
      }
    };

    schedulerRef.current = window.setInterval(schedule, 30);
    return () => {
      if (schedulerRef.current) {
        window.clearInterval(schedulerRef.current);
        schedulerRef.current = null;
      }
    };
  }, [
    isPlayingBeat,
    soundEnabled,
    ensureAudio,
    triggerKick,
    triggerSnare,
    triggerHat,
    triggerBass,
  ]);

  // ── UI Foley Effects ──────────────────
  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.04);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }, [soundEnabled, ensureAudio]);

  const playSlap = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(240, t);
    osc.frequency.exponentialRampToValueAtTime(75, t + 0.07);
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.09);
  }, [soundEnabled, ensureAudio]);

  const playScratch = useCallback(
    (intensity = 1) => {
      if (!soundEnabled) return;
      const now = performance.now();
      if (now - lastScratchRef.current < 45) return;
      lastScratchRef.current = now;
      const ctx = ensureAudio();
      if (!ctx || !noiseBufferRef.current) return;
      const t = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = noiseBufferRef.current;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(
        800 + Math.min(intensity, 3) * 700,
        t,
      );
      filter.Q.setValueAtTime(3.2, t);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(t);
      src.stop(t + 0.065);
    },
    [soundEnabled, ensureAudio],
  );

  const playShutter = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = ensureAudio();
    if (!ctx || !noiseBufferRef.current) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noiseBufferRef.current;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(320, t);
    filter.frequency.exponentialRampToValueAtTime(1400, t + 0.38);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(t);
    src.stop(t + 0.44);
  }, [soundEnabled, ensureAudio]);

  const playCratePull = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = ensureAudio();
    if (!ctx || !noiseBufferRef.current) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noiseBufferRef.current;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(950, t);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(t);
    src.stop(t + 0.12);
  }, [soundEnabled, ensureAudio]);

  const toggleLang = useCallback(() => {
    playClick();
    setLang((prev) => (prev === "en" ? "id" : "en"));
  }, [playClick]);

  const toggleBeat = useCallback(() => {
    ensureAudio();
    setSoundEnabled(true);
    setIsPlayingBeat((prev) => !prev);
  }, [ensureAudio]);

  const toggleSound = useCallback(() => {
    if (!soundEnabled) {
      ensureAudio();
      setSoundEnabled(true);
      setIsPlayingBeat(true);
    } else {
      setIsPlayingBeat((prev) => !prev);
    }
  }, [soundEnabled, ensureAudio]);

  return (
    <StrikeContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        soundEnabled,
        isPlayingBeat,
        toggleBeat,
        toggleSound,
        activeTrackIdx,
        setActiveTrackIdx,
        nowPlaying,
        setNowPlaying,
        nowPlayingColor,
        setNowPlayingColor,
        doorOpened,
        setDoorOpened,
        isDrawerOpen,
        setIsDrawerOpen,
        playClick,
        playSlap,
        playScratch,
        playShutter,
        playCratePull,
      }}
    >
      {children}
    </StrikeContext.Provider>
  );
}

export function useStrike() {
  const ctx = useContext(StrikeContext);
  if (!ctx) {
    throw new Error("useStrike must be used inside StrikeProvider");
  }
  return ctx;
}
