"use client";

import dynamic from "next/dynamic";
import { Suspense, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ScrollReveal";
import Particles from "./Particles";

gsap.registerPlugin(ScrollTrigger);

const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ minHeight: "400px" }}
    >
      <div
        className="w-[60px] h-[60px] rounded-full border-2 animate-spin"
        style={{
          borderColor: "rgba(125, 211, 252, 0.2)",
          borderTopColor: "#7DD3FC",
        }}
      />
    </div>
  ),
});

export default function LanyardSection() {
  const [showParticles, setShowParticles] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [startEntrance, setStartEntrance] = useState(false);

  useEffect(() => {
    // Only render particles on non-mobile devices (>= 768px)
    if (window.innerWidth >= 768) {
      setShowParticles(true);
    }

    const handleResize = () => {
      setShowParticles(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 95%",
      once: true,
      onEnter: () => setStartEntrance(true),
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#080808", padding: "100px 64px 100px" }}
    >
      {/* Background Particles Layer */}
      {showParticles && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            particleColors={["#ffffff", "#a0a0a0"]}
            particleCount={100}
            particleSpread={8}
            speed={0.05}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
      )}

      <div className="max-w-[1280px] ml-auto mr-0 flex items-center justify-between gap-[48px] lanyard-section-inner relative z-10 pointer-events-none">
        {/* LEFT — Copy */}
        <div
          className="lanyard-text flex-1 min-w-0 pointer-events-auto"
          style={{ maxWidth: "480px" }}
        >
          <div className="flex items-center gap-4 mb-5 overflow-hidden">
            <span
              className="text-[11px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#7DD3FC" }}
            >
              ABOUT ME
            </span>
            <div
              className="flex-shrink-0"
              style={{
                width: "44px",
                height: "1px",
                background: "#7DD3FC",
              }}
            />
          </div>
          <h2
            className="font-display font-bold leading-tight mb-6"
            style={{
              fontSize: "clamp(32px, 4.5vw, 54px)",
              letterSpacing: "-0.025em",
              color: "#ffffff",
              fontVariationSettings: "'opsz' 72",
            }}
          >
            Hi, I'm
            <br />
            <span style={{ fontStyle: "italic", color: "#7DD3FC" }}>
              Athallah.
            </span>
          </h2>

          <div
            className="flex flex-col gap-5"
            style={{
              fontFamily: "var(--font-jakarta)",
              fontWeight: 300,
              fontSize: "14px",
              lineHeight: "1.75",
            }}
          >
            <ScrollReveal text="A Junior Fullstack Developer currently studying Software Engineering (D4 TRPL) at Politeknik IDN Bogor — semester 4, and counting every project as a step closer to building software that actually gets used." />
            <ScrollReveal text="I work with Laravel, Filament, and Sanctum on the backend, React and Tailwind on the front — recently built Finote, a personal finance manager with full REST API and PDF reporting, and shipped a real event landing page that's already live and used by an actual school event." />
            <ScrollReveal text="What I care about most isn't just making things work — it's making them work for someone. Whether that's an admin managing data through Filament, or a visitor scrolling through a landing page on their phone." />
            <ScrollReveal
              text="Outside of code, I'm a Hafiz of the Quran (30 Juz) — something that taught me patience and discipline long before I ever wrote a line of code."
              style={{
                fontWeight: 400,
                borderLeft: "2px solid #7DD3FC",
                paddingLeft: "16px",
                marginTop: "12px",
              }}
            />
          </div>
        </div>

        {/* RIGHT — Spacer to preserve height and desktop structure */}
        <div
          className="lanyard-spacer flex-1 min-w-0 hidden md:block"
          style={{ height: "580px" }}
        />
      </div>

      {/* Lanyard Canvas Container */}
      <div className="lanyard-canvas-wrap">
        <Suspense fallback={null}>
          <Lanyard
            position={[2.5, 1.9, 14.8]}
            gravity={[0, -40, 0]}
            frontImage="/images/profile.png"
            imageFit="cover"
            startEntrance={startEntrance}
          />
        </Suspense>
      </div>

      <style>{`
        @media (min-width: 901px) {
          .lanyard-canvas-wrap {
            position: absolute !important;
            top: 0;
            left: 0;
            width: 100% !important;
            height: 100% !important;
            z-index: 20;
          }
        }
        @media (max-width: 900px) {
          #about { padding: 72px 24px 72px !important; }
          .lanyard-section-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
            position: relative;
            z-index: 20;
            pointer-events: auto !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .lanyard-text { max-width: 100% !important; }
          .lanyard-canvas-wrap {
            position: relative;
            width: 100% !important;
            height: clamp(320px, 80vw, 480px) !important;
            margin-top: 0 !important;
            margin-right: 0 !important;
            z-index: 10;
          }
        }
      `}</style>
    </section>
  );
}
