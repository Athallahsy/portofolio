"use client";

import { useEffect, type RefObject } from "react";
import { scrollEngine } from "@/lib/scrollEngine";

export function useGhostDrift(
  wrapRef: RefObject<HTMLElement | null>,
  ghostRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let nextTx: string | null = null;

    return scrollEngine.subscribe({
      read: (_sy, vh) => {
        const wrap = wrapRef.current;
        if (!wrap) {
          nextTx = null;
          return;
        }
        const rect = wrap.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= vh) {
          const progress = (vh - rect.top) / (vh + rect.height);
          nextTx = `${(-progress * 40 + 5).toFixed(2)}%`;
        } else {
          nextTx = null;
        }
      },
      write: () => {
        const el = ghostRef.current;
        if (el && nextTx !== null) {
          el.style.transform = `translate3d(${nextTx}, 0, 0)`;
        }
      },
    });
  }, [wrapRef, ghostRef]);
}
