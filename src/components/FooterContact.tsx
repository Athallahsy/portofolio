"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap"; // Pastikan import sesuai setup kamu, atau tetap 'gsap' biasa jika pakai npm package standar
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────
   MOON SVG
───────────────────────────────────────── */
const MoonSVG = () => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}
    aria-hidden
  >
    <defs>
      <filter id="moon-glow-fc" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <circle cx="50" cy="50" r="38" fill="#FFFDE7" filter="url(#moon-glow-fc)" />
    <circle cx="68" cy="42" r="32" fill="#080808" />
    <circle cx="32" cy="44" r="2.5" fill="#F5E9B0" opacity="0.4" />
    <circle cx="25" cy="60" r="1.8" fill="#F5E9B0" opacity="0.3" />
    <circle cx="40" cy="70" r="1.5" fill="#F5E9B0" opacity="0.25" />
    <circle cx="20" cy="50" r="1.2" fill="#F5E9B0" opacity="0.2" />
  </svg>
);

/* ─────────────────────────────────────────
   ICON COMPONENTS
───────────────────────────────────────── */
const IconEmail = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M2 8l10 7 10-7" />
  </svg>
);
const IconGithub = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconArrow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    icon: IconEmail,
    label: "athallahmsyaffa@gmail.com",
    sub: "Email",
    href: "mailto:athallahmsyaffa@gmail.com",
    target: undefined,
  },
  {
    icon: IconGithub,
    label: "github.com/athallahsy",
    sub: "GitHub",
    href: "https://github.com/athallahsy",
    target: "_blank",
  },
  {
    icon: IconLinkedin,
    label: "linkedin.com/in/athallahsy",
    sub: "LinkedIn",
    href: "https://linkedin.com/in/athallahsy",
    target: "_blank",
  },
];

const STARS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: (i * 97 + 13) % 100,
  y: (i * 61 + 7) % 55,
  size: ((i * 37 + 3) % 3) + 1,
  delay: (i * 0.31) % 3,
  duration: 1.8 + ((i * 0.29) % 2.2),
}));

const COPYRIGHT_HEIGHT = 38;

export default function FooterContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const skyGroupRef = useRef<HTMLDivElement>(null);
  const carWrapRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null); // Hanya merujuk ke trail di dalam mobil
  const starsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Import langsung di sini untuk memastikan aman di SSR Next.js
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    let handleScroll: () => void;

    const ctx = gsap.context(() => {
      /* ── 1. CINEMATIC ENTRANCE SEQUENCE ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, // DIUBAH: Gunakan section utama sebagai trigger, bukan carWrap yang sembunyi
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        starsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2 },
        0,
      );
      tl.fromTo(
        moonRef.current,
        { x: 120, y: -150, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1.4, ease: "power2.out" },
        0.3,
      );
      tl.fromTo(
        skyGroupRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        0.6,
      );
      tl.fromTo(
        ".fc-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        1.5,
      );
      tl.fromTo(
        ".fc-title-line",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.0, stagger: 0.1 },
        1.65,
      );
      tl.fromTo(
        ".fc-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.9,
      );
      tl.fromTo(
        ".fc-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
        2.0,
      );

      /* ── 2. STARS TWINKLE ── */
      tl.add(() => {
        if (!starsRef.current) return;
        const starEls =
          starsRef.current.querySelectorAll<HTMLElement>(".fc-star");
        starEls.forEach((star, i) => {
          gsap.to(star, {
            opacity: 0.8,
            duration: STARS[i]?.duration ?? 2,
            delay: STARS[i]?.delay ?? 0,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }, ">");

      /* ── 3. MOON PARALLAX ── */
      if (moonRef.current) {
        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(moonRef.current, { y: -30 + p * 30, x: 20 - p * 20 });
          },
        });
      }

      /* ── 4. SKYLINE PARALLAX ── */
      gsap.to(skyGroupRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Set posisi awal mobil (Sembunyi di kiri)
      gsap.set(carWrapRef.current, { x: -800, opacity: 0 });
      gsap.set(trailRef.current, { opacity: 0 });

      const enterCar = () => {
        gsap.killTweensOf([carWrapRef.current, trailRef.current]);
        gsap.to(carWrapRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          overwrite: true,
        });
        gsap.to(trailRef.current, {
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      };

      /* ── 5. CAR SCROLL-TRIGGERED ENTRANCE ── */
      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        invalidateOnRefresh: true,
        onEnter: enterCar,
        onEnterBack: enterCar,
      });

      let reachedBottom = false;
      let maxScrollY = 0;
      let carExited = false;
      let lastScrollY = window.scrollY;

      handleScroll = () => {
        const currentScrollY = window.scrollY;
        const isAtBottom =
          window.innerHeight + currentScrollY >=
          document.documentElement.scrollHeight - 25;

        if (isAtBottom) {
          reachedBottom = true;
          if (currentScrollY > maxScrollY) maxScrollY = currentScrollY;
        }

        if (reachedBottom && !carExited) {
          if (maxScrollY - currentScrollY >= 20) {
            carExited = true;
            reachedBottom = false;
            gsap.killTweensOf([carWrapRef.current, trailRef.current]);
            gsap.to(carWrapRef.current, {
              x: 1600,
              opacity: 0,
              duration: 0.8,
              ease: "expo.in",
              overwrite: true,
              onComplete: () =>
                gsap.set(carWrapRef.current, { x: -800, opacity: 0 }),
            });
            gsap.to(trailRef.current, {
              opacity: 0,
              duration: 0.4,
              ease: "expo.in",
              overwrite: true,
            });
          }
        }

        if (carExited && currentScrollY > lastScrollY) {
          carExited = false;
          reachedBottom = false;
          enterCar();
        }

        lastScrollY = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
    }, section);

    return () => {
      ctx.revert();
      if (handleScroll) window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      style={{
        background: "#080808",
        position: "relative",
        overflow: "hidden",
        zIndex: 10,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ── STARS ── */}
      <div
        ref={starsRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0,
        }}
      >
        {STARS.map((s) => (
          <div
            key={s.id}
            className="fc-star"
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: "#ffffff",
              opacity: 0.2,
              boxShadow:
                s.size >= 2
                  ? `0 0 ${s.size * 2}px rgba(255,255,255,0.4)`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* ── SKY GRADIENT ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "55%",
          background:
            "linear-gradient(to bottom, rgba(5,8,20,0.7) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── MOON ── */}
      <div
        ref={moonRef}
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(24px, 4vw, 56px)",
          right: "clamp(24px, 6vw, 80px)",
          width: "clamp(70px, 8vw, 120px)",
          height: "clamp(70px, 8vw, 120px)",
          filter: "drop-shadow(0 0 28px rgba(255,240,160,0.35))",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0,
        }}
      >
        <MoonSVG />
      </div>

      {/* ── SKYLINE + ROAD + CAR GROUP ── */}
      <div
        ref={skyGroupRef}
        aria-hidden
        style={{
          position: "absolute",
          bottom: COPYRIGHT_HEIGHT,
          left: 0,
          right: 0,
          height: "var(--road-bottom)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <img
          src="/images/gambar.png"
          alt=""
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "auto",
            objectFit: "unset",
            objectPosition: "bottom",
            display: "block",
            opacity: 0.38,
            mixBlendMode: "luminosity",
            filter: "brightness(0.55)",
            zIndex: 1,
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              to bottom,
              #080808 0%,
              rgba(8,8,8,0.92) 18%,
              rgba(8,8,8,0.72) 40%,
              rgba(8,8,8,0.25) 70%,
              transparent 100
            )`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* DIUBAH: Trail statis luar dihapus/tidak pakai ref kembar lagi agar GSAP tidak bingung */}

        {/* Car */}
        <div
          ref={carWrapRef}
          className="fc-car"
          style={{
            position: "absolute",
            left: "clamp(24px, 6vw, 96px)",
            height: "auto",
            opacity: 0,
            willChange: "transform, opacity",
            bottom: "calc(var(--road-bottom) - (var(--car-width) * 0.2656))",
            width: "var(--car-width)",
            zIndex: 3,
            overflow: "visible",
          }}
        >
          {/* Trail dalam carWrap */}
          <div
            ref={trailRef}
            style={{
              position: "absolute",
              right: "92%",
              top: "50%",
              transform: "translateY(-50%)",
              width: "clamp(120px, 16vw, 220px)",
              height: "clamp(10px, 1.2vw, 22px)",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(200,200,200,0.12) 60%, rgba(255,255,255,0.22) 100%)",
              filter: "blur(5px)",
              opacity: 0,
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          <img
            src="/images/mobil.gif"
            alt=""
            style={{ width: "100%", height: "auto", display: "block" }}
            draggable={false}
          />
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div
        ref={contentRef}
        style={{
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          padding: "clamp(40px, 5vh, 60px) clamp(24px, 6vw, 96px) 0",
          position: "relative",
          zIndex: 3,
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(280px, 40%, 460px) 1fr",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "start",
            width: "100%",
          }}
          className="fc-grid"
        >
          {/* LEFT COLUMN */}
          <div>
            <div
              className="fc-badge"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#7DD3FC",
                  letterSpacing: "0.04em",
                }}
              >
                {"// CONTACT"}
              </span>
              <div
                style={{
                  height: 1,
                  width: 36,
                  background: "#7DD3FC",
                  opacity: 0.7,
                  borderRadius: 1,
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-anton)",
                fontSize: "clamp(42px, 5.5vw, 84px)",
                fontWeight: 400,
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                marginBottom: 20,
                overflow: "hidden",
              }}
            >
              <span
                className="fc-title-line"
                style={{
                  display: "block",
                  color: "#FFFFFF",
                  opacity: 0,
                  textShadow:
                    "0 2px 40px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.8)",
                }}
              >
                Let&apos;s Build
              </span>
              <span
                className="fc-title-line"
                style={{
                  display: "block",
                  color: "#666666",
                  opacity: 0,
                  textShadow: "0 2px 30px rgba(0,0,0,0.95)",
                }}
              >
                Something.
              </span>
            </h2>

            <p
              className="fc-sub"
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                fontWeight: 400,
                color: "#B0B0B0",
                lineHeight: 1.8,
                maxWidth: 380,
                opacity: 0,
                textShadow: "0 1px 20px rgba(0,0,0,0.9)",
              }}
            >
              Open to full-time roles, freelance projects, and interesting
              collaborations. Based in Banjarmasin — available remote.
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div
            className="fc-cards"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              paddingTop: 4,
            }}
          >
            {SOCIAL_LINKS.map(({ icon: Icon, label, sub, href, target }) => (
              <a
                key={label}
                href={href}
                target={target}
                rel={target ? "noopener noreferrer" : undefined}
                className="fc-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 22px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  background: "rgba(8,8,8,0.65)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  textDecoration: "none",
                  color: "#A0A0A0",
                  transition:
                    "border-color 0.35s ease, color 0.35s ease, background 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease",
                  cursor: "pointer",
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "#7DD3FC";
                  el.style.color = "#FFFFFF";
                  el.style.background = "rgba(8,8,8,0.85)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow =
                    "0 12px 40px rgba(125,211,252,0.08), inset 0 1px 0 rgba(255,255,255,0.08)";
                  const arrow = el.querySelector<HTMLElement>(".fc-arrow");
                  if (arrow) arrow.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.color = "#A0A0A0";
                  el.style.background = "rgba(8,8,8,0.65)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05)";
                  const arrow = el.querySelector<HTMLElement>(".fc-arrow");
                  if (arrow) arrow.style.transform = "translateX(0)";
                }}
              >
                <span style={{ flexShrink: 0, opacity: 0.75 }}>
                  <Icon />
                </span>
                <span style={{ flex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-jakarta)",
                      fontSize: "clamp(13px, 3.5vw, 15px)",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-jakarta)",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#444",
                      marginTop: 3,
                    }}
                  >
                    {sub}
                  </span>
                </span>
                <span
                  className="fc-arrow"
                  style={{
                    flexShrink: 0,
                    opacity: 0.4,
                    transition: "transform 0.35s ease",
                  }}
                >
                  <IconArrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── COPYRIGHT ── */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "0 0 16px",
          height: COPYRIGHT_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: 11,
            color: "#444444",
            letterSpacing: "0.03em",
            margin: 0,
          }}
        >
          © 2025 Athallah Muhammad Syaffa. Built with Next.js &amp; a lot of
          coffee.
        </p>
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        :root { --road-bottom: 100px; }
        .fc-car {
          --car-width: clamp(240px, 26vw, 380px);
          width: var(--car-width) !important;
          bottom: calc(var(--road-bottom) - (var(--car-width) * 0.2656)) !important;
        }
        @media (max-width: 768px) {
          :root { --road-bottom: 80px; }
          .fc-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .fc-car { --car-width: clamp(160px, 40vw, 220px); }
        }
        @media (max-width: 1024px) and (min-width: 769px) {
          .fc-grid { grid-template-columns: 1fr 1fr !important; }
          .fc-car { --car-width: clamp(220px, 28vw, 340px); }
        }
      `}</style>
    </footer>
  );
}
