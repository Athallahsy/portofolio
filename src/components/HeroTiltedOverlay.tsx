import React from 'react';

export default function HeroTiltedOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/25 to-transparent rounded-[15px] pointer-events-none select-none w-[380px] h-[420px]">
      <div className="font-display italic text-[24px] text-white font-light tracking-wide leading-tight">
        Athallah M. Syaffa
      </div>
      <div className="font-body text-[11px] uppercase tracking-[0.2em] text-[#BED8C8] font-semibold mt-1">
        Fullstack Developer
      </div>
    </div>
  );
}
