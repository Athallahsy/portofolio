"use client";

import React from "react";

const DIGIT_SEGMENTS: Record<string, number[]> = {
  "0": [1, 1, 1, 1, 1, 1, 0],
  "1": [0, 1, 1, 0, 0, 0, 0],
  "2": [1, 1, 0, 1, 1, 0, 1],
  "3": [1, 1, 1, 1, 0, 0, 1],
  "4": [0, 1, 1, 0, 0, 1, 1],
  "5": [1, 0, 1, 1, 0, 1, 1],
  "6": [1, 0, 1, 1, 1, 1, 1],
  "7": [1, 1, 1, 0, 0, 0, 0],
  "8": [1, 1, 1, 1, 1, 1, 1],
  "9": [1, 1, 1, 1, 0, 1, 1],
  "+": [0, 0, 0, 0, 0, 0, 0],
  "-": [0, 0, 0, 0, 0, 0, 1],
};

function SingleDigit({
  char,
  color,
  height,
}: {
  char: string;
  color: string;
  height: number;
}) {
  if (char === "+") {
    return (
      <svg
        width={height * 0.48}
        height={height}
        viewBox="0 0 24 50"
        aria-hidden="true"
      >
        <rect x="4" y="22" width="16" height="5" rx="1.5" fill={color} />
        <rect x="9.5" y="16.5" width="5" height="16" rx="1.5" fill={color} />
      </svg>
    );
  }

  const segs = DIGIT_SEGMENTS[char] ?? [0, 0, 0, 0, 0, 0, 0];
  const offColor = "rgba(255, 255, 255, 0.08)";

  return (
    <svg
      width={height * 0.56}
      height={height}
      viewBox="0 0 28 50"
      aria-hidden="true"
    >
      {/* A (top) */}
      <polygon
        points="5,3 23,3 20,7 8,7"
        fill={segs[0] ? color : offColor}
      />
      {/* B (top-right) */}
      <polygon
        points="24,4 24,23 20,20 20,8"
        fill={segs[1] ? color : offColor}
      />
      {/* C (bottom-right) */}
      <polygon
        points="24,26 24,45 20,41 20,29"
        fill={segs[2] ? color : offColor}
      />
      {/* D (bottom) */}
      <polygon
        points="5,46 23,46 20,42 8,42"
        fill={segs[3] ? color : offColor}
      />
      {/* E (bottom-left) */}
      <polygon
        points="4,26 4,45 8,41 8,29"
        fill={segs[4] ? color : offColor}
      />
      {/* F (top-left) */}
      <polygon
        points="4,4 4,23 8,20 8,8"
        fill={segs[5] ? color : offColor}
      />
      {/* G (middle) */}
      <polygon
        points="5,24.5 8,22 20,22 23,24.5 20,27 8,27"
        fill={segs[6] ? color : offColor}
      />
    </svg>
  );
}

export default function SevenSeg({
  value,
  color = "#e9ff2e",
  height = 34,
}: {
  value: string;
  color?: string;
  height?: number;
}) {
  return (
    <span
      className="inline-flex items-center gap-[3px]"
      style={{ filter: `drop-shadow(0 0 8px ${color}44)` }}
      aria-label={value}
    >
      {value.split("").map((ch, idx) => (
        <SingleDigit key={idx} char={ch} color={color} height={height} />
      ))}
    </span>
  );
}
