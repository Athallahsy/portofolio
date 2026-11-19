"use client";

import React, { useEffect, useRef } from "react";
import { scrollEngine } from "@/lib/scrollEngine";

interface StickyLayerProps {
  id: string;
  zIndex: number;
  nowPlayingLabel?: string;
  nowPlayingColor?: string;
  isFirst?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Replicates Strike.uno's `.layer` sticky-stacking + dynamic `--dim`
 * dimming system using a single batched scroll engine and automatic
 * `visibility: hidden` culling once completely covered by the next curtain.
 */
export default function StickyLayer({
  id,
  zIndex,
  isFirst = false,
  className = "",
  style,
  children,
}: StickyLayerProps) {
  const layerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateStickyTop = () => {
      if (prefersReduced) {
        el.style.position = "relative";
        el.style.top = "auto";
        return;
      }
      el.style.position = "sticky";
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      const topOffset = Math.min(0, vh - h);
      el.style.top = `${topOffset}px`;
    };

    updateStickyTop();
    const ro = new ResizeObserver(updateStickyTop);
    ro.observe(el);
    window.addEventListener("resize", updateStickyTop);

    let nextDim = "0";
    let nextHidden = false;
    let lastDim = "";
    let lastHidden: boolean | null = null;

    const unsubScroll = scrollEngine.subscribe({
      read: (_sy, vh) => {
        if (prefersReduced) {
          nextDim = "0";
          nextHidden = false;
          return;
        }
        let cursor: Element | null = el.nextElementSibling;
        while (cursor && !cursor.classList.contains("strike-layer")) {
          cursor = cursor.nextElementSibling;
        }
        const targetLayer = cursor as HTMLElement | null;
        if (!targetLayer) {
          nextDim = "0";
          nextHidden = false;
          return;
        }
        const nextTop = targetLayer.getBoundingClientRect().top;
        const overlap = Math.max(0, Math.min(1, 1 - nextTop / vh));
        nextDim = (overlap * 0.6).toFixed(3);
        // Once the next opaque curtain + top gradient shadow completely cover this layer,
        // cull painting/compositing of this buried layer to keep laptop FPS smooth.
        nextHidden = nextTop <= -48;
      },
      write: () => {
        if (nextDim !== lastDim) {
          el.style.setProperty("--dim", nextDim);
          lastDim = nextDim;
        }
        if (nextHidden !== lastHidden) {
          el.style.visibility = nextHidden ? "hidden" : "visible";
          lastHidden = nextHidden;
        }
      },
    });

    return () => {
      ro.disconnect();
      unsubScroll();
      window.removeEventListener("resize", updateStickyTop);
    };
  }, []);

  return (
    <>
      <div id={id} className="anchor-point" aria-hidden="true" />
      <section
        ref={layerRef}
        className={`strike-layer ${isFirst ? "strike-layer-first" : ""} ${className}`}
        style={{
          zIndex,
          ...style,
        }}
      >
        {children}
        {/* Dynamic darkening overlay controlled by --dim */}
        <div className="strike-dim-overlay" aria-hidden="true" />
      </section>
    </>
  );
}
