"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiLaravel,
  SiReact,
  SiPhp,
  SiMysql,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiFlutter,
  SiNextdotjs,
} from "react-icons/si";

const STACK = [
  { num: "01", name: "Laravel",      category: "Framework",        status: "mastered", Icon: SiLaravel     },
  { num: "02", name: "React",        category: "Library",          status: "mastered", Icon: SiReact       },
  { num: "03", name: "PHP",          category: "Language",         status: "mastered", Icon: SiPhp         },
  { num: "04", name: "MySQL",        category: "Database",         status: "mastered", Icon: SiMysql       },
  { num: "05", name: "JavaScript",   category: "Language",         status: "mastered", Icon: SiJavascript  },
  { num: "06", name: "Tailwind CSS", category: "Styling",          status: "mastered", Icon: SiTailwindcss },
  { num: "07", name: "Git",          category: "Version Control",  status: "mastered", Icon: SiGit         },
  { num: "08", name: "Flutter",      category: "Mobile",           status: "mastered", Icon: SiFlutter     },
  { num: "09", name: "Next.js",      category: "Framework",        status: "learning", Icon: SiNextdotjs   },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];
    const timelines: gsap.core.Timeline[] = [];

    // --- Badge + heading + desc: scrubbed individually ---
    const badge = document.querySelector<HTMLElement>("#skills .ts-badge");
    const headingLines = Array.from(
      document.querySelectorAll<HTMLElement>("#skills .ts-heading-line")
    );
    const desc = document.querySelector<HTMLElement>("#skills .ts-desc");

    // Left-column header — one shared scrubbed timeline
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 85%",
        end: "top 55%",
        scrub: 0.8,
      },
    });
    if (badge) {
      gsap.set(badge, { opacity: 0, y: 24 });
      headerTl.to(badge, { opacity: 1, y: 0, ease: "power2.out" }, 0);
    }
    headingLines.forEach((line, i) => {
      gsap.set(line, { opacity: 0, y: 60 });
      headerTl.to(line, { opacity: 1, y: 0, ease: "power3.out" }, i * 0.12);
    });
    if (desc) {
      gsap.set(desc, { opacity: 0, y: 28 });
      headerTl.to(desc, { opacity: 1, y: 0, ease: "power2.out" }, 0.25);
    }
    timelines.push(headerTl);

    // --- 9 grid items: single timeline with stagger, scrubbed ---
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("#skills .ts-item")
    );
    const grid = document.querySelector<HTMLElement>("#skills .ts-grid");

    if (grid && items.length) {
      gsap.set(items, { opacity: 0, y: 24 });

      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.6,   // slight smoothing — follows scroll but with subtle lag
        },
      });

      // Add each item sequentially with stagger offset
      items.forEach((item, i) => {
        gridTl.to(
          item,
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.4 },
          i * 0.15   // stagger: item 01 leads, 09 trails
        );
      });

      timelines.push(gridTl);
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      timelines.forEach((tl) => tl.kill());
      triggers.forEach((t) => t.kill());
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: "#080808",
        padding: "120px 64px",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Watermark */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-0.05em",
          right: "-0.05em",
          fontSize: "clamp(120px, 18vw, 220px)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "#ffffff",
          opacity: 0.04,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          fontFamily: "var(--font-anton)",
          zIndex: 0,
        }}
      >
        TOOLS
      </span>

      {/* ── Two-column layout ─────────────────────────────────── */}
      <div
        className="relative z-10 max-w-[1280px] mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* ── LEFT: Badge + Heading + Desc ──────────────── */}
        <div>
          {/* Badge */}
          <div className="ts-badge" style={{ marginBottom: 32 }}>
            <span style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#7DD3FC",
              fontFamily: "var(--font-jakarta)",
            }}>
              // TOOLKIT
            </span>
            <div style={{
              width: 40,
              height: 1,
              background: "#7DD3FC",
              marginTop: 8,
              opacity: 0.6,
            }} />
          </div>

          {/* Heading */}
          <h2 style={{ margin: 0, lineHeight: 0.88, marginBottom: 32 }}>
            <span
              className="ts-heading-line"
              style={{
                display: "block",
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(56px, 7vw, 100px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#F5F5F5",
                textTransform: "uppercase",
              }}
            >
              TECH
            </span>
            <span
              className="ts-heading-line"
              style={{
                display: "block",
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(56px, 7vw, 100px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#525252",
                textTransform: "uppercase",
              }}
            >
              STACK
            </span>
          </h2>

          {/* Description */}
          <p
            className="ts-desc"
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 15,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "#525252",
              maxWidth: 340,
              margin: 0,
            }}
          >
            A curated collection of modern technologies I use to build
            scalable web applications — from backend logic to interactive
            user interfaces.
          </p>
        </div>

        {/* ── RIGHT: 9-item grid (3 col × 3 row) ─────────── */}
        <div
          className="ts-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {STACK.map((item, i) => {
            const isLearning = item.status === "learning";
            const col = i % 3;
            const row = Math.floor(i / 3);
            const totalRows = Math.ceil(STACK.length / 3);
            const isLastRow = row === totalRows - 1;
            const isLastCol = col === 2;
            const isHovered = hoveredIdx === i;
            const { Icon } = item;

            return (
              <div
                key={item.num}
                className="ts-item"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  padding: "28px 28px 24px",
                  borderBottom: isLastRow ? "none" : "1px solid #1F1F1F",
                  borderRight: isLastCol ? "none" : "1px solid #1F1F1F",
                  position: "relative",
                  cursor: "default",
                }}
              >
                {/* Top row: number (left) + icon (right) */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: isLearning ? "#2D2D2D" : "#7DD3FC",
                    opacity: isLearning ? 0.8 : 1,
                  }}>
                    {item.num}
                  </span>
                  <Icon
                    style={{
                      fontSize: 20,
                      color: isHovered ? "#7DD3FC" : "#A0A0A0",
                      opacity: isLearning ? 0.35 : 1,
                      transition: "color 0.3s ease, opacity 0.3s ease",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Name */}
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-jakarta)",
                  fontSize: "clamp(15px, 1.5vw, 20px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: isLearning ? "#3A3A3A" : "#F5F5F5",
                  marginBottom: 5,
                  lineHeight: 1.2,
                }}>
                  {item.name}
                </span>

                {/* Category */}
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-jakarta)",
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  color: "#2E2E2E",
                  textTransform: "uppercase",
                }}>
                  {item.category}
                </span>

                {/* Learning badge */}
                {isLearning && (
                  <span style={{
                    position: "absolute",
                    top: 28,
                    right: 20,
                    fontSize: 8,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#3A3A3A",
                    border: "1px dashed #2A2A2A",
                    padding: "3px 7px",
                    fontFamily: "var(--font-jakarta)",
                  }}>
                    LEARNING
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive: stack vertically on mobile */}
      <style>{`
        @media (max-width: 1023px) {
          #skills > div.relative {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 767px) {
          #skills {
            padding: 72px 24px !important;
          }
          #skills > div.relative {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #skills .ts-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 400px) {
          #skills .ts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
