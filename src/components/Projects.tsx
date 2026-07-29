"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const FEATURED_PROJECTS = [
  {
    num: "01",
    title: "Finote",
    badge: "Web App · Personal Project · Live",
    tags: ["Laravel 12", "Sanctum", "Filament", "MySQL", "REST API"],
    desc: "A personal finance manager built API-first. Full REST API for transaction recording, financial categories, and monthly reports — secured with Laravel Sanctum. Complete admin panel via Filament, and PDF export for monthly financial reports.\n\nCovered by automated feature tests, and patched after a real security audit that fixed an IDOR vulnerability (users could access other users' data by changing an ID in the URL) — a story worth telling in interviews. A companion Flutter mobile app, built by a collaborator, consumes the same API.",
    screenshot: "/images/finote.png",
    aspect: "landscape",
    rotation: "-rotate-1.5",
    liveLink: "https://finote-production-eb03.up.railway.app",
    githubLink: "https://github.com/Athallahsy/finote",
  },
  {
    num: "02",
    title: "TaskFlow",
    badge: "Fullstack Web App · Personal Project · Live",
    tags: ["Node.js", "Express", "Sequelize", "MySQL", "React", "JWT"],
    desc: "A lightweight Trello/Jira-style project & task manager, built fullstack from scratch: a real REST API with JWT authentication and bcrypt-hashed passwords, backed by MySQL (TiDB Cloud) via Sequelize.\n\nFeatures a 3-column kanban board, per-project task CRUD, and a dashboard with live progress charts. Deployed as a Vercel serverless function on the backend, talking to a serverless cloud database over SSL — a genuinely modern deployment setup, not just a local demo.",
    screenshot: "/images/taskflow.png",
    aspect: "landscape",
    rotation: "rotate-2",
    liveLink: "https://taskflow-frontend-atha.vercel.app",
  },
  {
    num: "03",
    title: "AyamKu",
    badge: "Mobile · Personal Project · Flutter",
    tags: ["Flutter", "Dart", "Hive", "Provider", "fl_chart"],
    desc: "My father used to manage his chicken farm with handwritten notes — feed calculations, expenses, all on paper. I built him an Android app to replace that.\n\nAyamKu supports up to 3 coops, auto-calculates daily feed and water needs based on growth phase (Starter, Grower, Finisher), tracks income and expenses with weekly charts, and estimates profit/loss per harvest cycle. Designed with large text and minimal UI — because the user isn't a tech-savvy young person, it's my dad.",
    screenshot: "/images/ayamku.png",
    aspect: "portrait",
    rotation: "-rotate-2",
  },
  {
    num: "04",
    title: "Herbal Qaf",
    badge: "Web · Family Business · Live",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "RajaOngkir API"],
    desc: "My mother runs a herbal drink brand. Orders used to come in through scattered WhatsApp messages — slow and error-prone.\n\nI built a branded e-commerce website that handles the entire order flow: product selection → address input → automatic shipping cost via RajaOngkir API → a pre-filled WhatsApp message with complete order details. What used to take 10 back-and-forth messages now takes one click.",
    screenshot: "/images/herbal-qaf.png",
    aspect: "landscape",
    rotation: "rotate-3",
    liveLink: "https://herbal-qaf.vercel.app",
  },
  {
    num: "05",
    title: "Muhayya Fair 2025",
    badge: "Landing Page · Freelance · Live",
    tags: ["HTML", "CSS", "Bootstrap", "AOS"],
    desc: "Event landing page for SD Muhammadiyah Haijah Nurijah Banjarmasin — a real school event with a real deadline. Scroll animations via AOS, deployed to Vercel, used live during the event. Simple stack, real client, shipped on time.",
    screenshot: "/images/muhayya-fair.png",
    aspect: "landscape",
    rotation: "rotate-2",
    liveLink: "https://muhayya-fair.vercel.app",
  },
];

// SVG Variant A: Round / Chubby Cloud
function CloudVariantA({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 50" fill="currentColor">
      <path d="M 20,40 Q 8,40 8,28 Q 8,16 20,15 Q 26,5 40,8 Q 50,0 64,8 Q 78,5 84,18 Q 94,20 94,30 Q 94,40 82,40 Z" />
    </svg>
  );
}

// SVG Variant B: Elongated / Flatter Cloud
function CloudVariantB({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 35" fill="currentColor">
      <path d="M 12,28 Q 3,28 3,19 Q 3,10 14,9 Q 22,2 35,5 Q 46,-1 58,4 Q 68,0 78,7 Q 88,3 96,10 Q 106,12 106,20 Q 106,28 95,28 Z" />
    </svg>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const mm = gsap.matchMedia();

    // Header eyebrow & title animations
    const eyebrowText = document.querySelector<HTMLElement>(
      "#projects .sec-eyebrow-text",
    );
    const eyebrowDash = document.querySelector<HTMLElement>(
      "#projects .sec-eyebrow-dash",
    );
    if (eyebrowText) {
      gsap.to(eyebrowText, {
        y: "0%",
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: "#projects", start: "top 83%" },
      });
    }
    if (eyebrowDash) {
      gsap.to(eyebrowDash, {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.inOut",
        delay: 0.1,
        scrollTrigger: { trigger: "#projects", start: "top 83%" },
      });
    }

    document
      .querySelectorAll<HTMLElement>("#projects .sec-title .clip-inner")
      .forEach((line, i) => {
        gsap.to(line, {
          y: "0%",
          duration: 1.05,
          ease: "power4.out",
          delay: i * 0.07,
          scrollTrigger: { trigger: "#projects .sec-title", start: "top 83%" },
        });
      });

    type TrailDot = { x: number; y: number; timestamp: number };
    let trail: TrailDot[] = [];
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const renderTrail = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      trail = trail.filter((dot) => now - dot.timestamp < 800);
      trail.forEach((dot) => {
        const age = now - dot.timestamp;
        const life = age / 800;
        const opacity = 1 - life;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(51, 51, 51, ${opacity * 0.7})`;
        ctx.fill();
      });
    };

    gsap.ticker.add(renderTrail);

    mm.add("(min-width: 1024px)", () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      if (cloudsRef.current) {
        cloudsRef.current.style.width = `${track.scrollWidth}px`;
      }

      const resizeCanvas = () => {
        if (canvas) {
          canvas.width = track.scrollWidth;
          canvas.height = container.offsetHeight;
        }
      };
      resizeCanvas();

      type PathPoint = { x: number; y: number };
      const planeOffset = 60;

      const calculateDesktopPath = (): PathPoint[] => {
        const cards = Array.from(
          document.querySelectorAll<HTMLElement>(".featured-project-card"),
        );
        const containerHeight = container.offsetHeight || window.innerHeight;
        if (!cards.length) return [];

        const centerY = containerHeight * 0.5; // ← PUSAT TENGAH
        const waveAmplitude = containerHeight * 0.25; // ← ±25% amplitudo

        const points: PathPoint[] = [
          {
            x: -100 - planeOffset,
            y: centerY - planeOffset, // ← Mulai dari tengah
          },
        ];

        cards.forEach((card, i) => {
          const cardLeft = card.offsetLeft;
          const cardWidth = card.offsetWidth;
          const centerX = cardLeft + cardWidth * 0.5;

          // Gelombang dengan pusat di 50% tinggi layar
          const y = centerY + Math.sin(i * 1.2) * waveAmplitude;

          points.push({
            x: centerX - planeOffset,
            y: y - planeOffset,
          });
        });

        const lastCard = cards[cards.length - 1];
        const endX =
          (lastCard
            ? lastCard.offsetLeft + lastCard.offsetWidth
            : track.scrollWidth) + 800;
        points.push({
          x: endX - planeOffset,
          y: centerY - planeOffset, // ← Akhir di tengah
        });

        return points;
      };

      const points = calculateDesktopPath();

      if (points.length && airplaneRef.current) {
        gsap.set(airplaneRef.current, {
          x: points[0].x,
          y: points[0].y,
        });
      }

      let lastX = points[0]?.x || 0;
      let lastY = points[0]?.y || 0;

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Main track horizontal scroll (1.0x speed)
      mainTl.to(
        track,
        {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          duration: 1,
        },
        0,
      );

      // 2. Cloud Parallax Layer (0.4x speed for background depth across entire track width)
      if (cloudsRef.current) {
        mainTl.to(
          cloudsRef.current,
          {
            x: () => -(track.scrollWidth - window.innerWidth) * 0.4,
            ease: "none",
            duration: 1,
          },
          0,
        );
      }

      // 3. Parallax shift inside each card screenshot
      const cardImages = Array.from(
        document.querySelectorAll<HTMLElement>(".card-image-parallax"),
      );
      cardImages.forEach((img) => {
        mainTl.fromTo(img, { x: 30 }, { x: -30, ease: "none", duration: 1 }, 0);
      });

      // 4. Airplane motion path (z-10, behind cards at z-20) synchronized to scroll
      if (airplaneRef.current && points.length) {
        mainTl.to(
          airplaneRef.current,
          {
            motionPath: {
              path: points,
              autoRotate: true,
              curviness: 1.2,
            },
            ease: "none",
            duration: 1,
            onUpdate: function () {
              if (!airplaneRef.current) return;
              const x = gsap.getProperty(airplaneRef.current, "x") as number;
              const y = gsap.getProperty(airplaneRef.current, "y") as number;
              const dist = Math.hypot(x - lastX, y - lastY);
              if (dist > 18) {
                trail.push({
                  x: x + planeOffset,
                  y: y + planeOffset,
                  timestamp: Date.now(),
                });
                lastX = x;
                lastY = y;
              }
            },
          },
          0,
        );
      }
    });

    mm.add("(max-width: 1023px)", () => {
      document
        .querySelectorAll<HTMLElement>(".featured-project-row")
        .forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 75%",
              },
            },
          );
        });
    });

    // Debounced window resize handler (200ms)
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(renderTrail);
      mm.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        position: "relative",
        zIndex: 20,
        background: "#FAFAFA",
        overflow: "hidden",
      }}
      className="lg:h-screen lg:w-full"
    >
      {/* Watermark WORK (z-0) */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          fontSize: "clamp(120px, 20vw, 320px)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "#000000",
          opacity: 0.05,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          fontFamily: "var(--font-anton)",
          zIndex: 0,
        }}
      >
        WORK
      </span>

      {/* Track wrapper for Desktop horizontal scroll & Mobile vertical layout */}
      <div
        ref={trackRef}
        className="w-full lg:h-full lg:flex lg:items-center lg:px-20 lg:gap-16 lg:w-max py-28 lg:py-0 px-6 max-w-[1200px] lg:max-w-none mx-auto lg:mx-0 relative z-10"
        style={{ willChange: "transform" }}
      >
        {/* Cloud Parallax Layer (z-5: evenly distributed across full track width, 2 shape variants) */}
        <div
          ref={cloudsRef}
          className="hidden lg:block pointer-events-none absolute top-0 left-0 h-full z-5 overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {/* Cloud 1 - Variant A */}
          <CloudVariantA className="absolute top-[12%] left-[4%] w-[180px] h-[60px] opacity-30 text-[#7DD3FC]" />
          {/* Cloud 2 - Variant B */}
          <CloudVariantB className="absolute top-[68%] left-[13%] w-[240px] h-[75px] opacity-25 text-[#38BDF8]" />
          {/* Cloud 3 - Variant A */}
          <CloudVariantA className="absolute top-[18%] left-[22%] w-[200px] h-[65px] opacity-35 text-[#7DD3FC]" />
          {/* Cloud 4 - Variant B */}
          <CloudVariantB className="absolute top-[72%] left-[31%] w-[220px] h-[70px] opacity-20 text-[#38BDF8]" />
          {/* Cloud 5 - Variant A */}
          <CloudVariantA className="absolute top-[14%] left-[40%] w-[190px] h-[60px] opacity-30 text-[#7DD3FC]" />
          {/* Cloud 6 - Variant B */}
          <CloudVariantB className="absolute top-[65%] left-[49%] w-[250px] h-[80px] opacity-25 text-[#38BDF8]" />
          {/* Cloud 7 - Variant A */}
          <CloudVariantA className="absolute top-[20%] left-[58%] w-[210px] h-[68px] opacity-35 text-[#7DD3FC]" />
          {/* Cloud 8 - Variant B */}
          <CloudVariantB className="absolute top-[70%] left-[67%] w-[230px] h-[72px] opacity-20 text-[#38BDF8]" />
          {/* Cloud 9 - Variant A */}
          <CloudVariantA className="absolute top-[15%] left-[76%] w-[185px] h-[62px] opacity-30 text-[#7DD3FC]" />
          {/* Cloud 10 - Variant B */}
          <CloudVariantB className="absolute top-[66%] left-[85%] w-[245px] h-[78px] opacity-25 text-[#38BDF8]" />
          {/* Cloud 11 - Variant A */}
          <CloudVariantA className="absolute top-[18%] left-[94%] w-[205px] h-[66px] opacity-35 text-[#7DD3FC]" />
        </div>

        {/* Trail Canvas Overlay (z-10: BEHIND cards at z-20) */}
        <canvas
          ref={canvasRef}
          className="hidden lg:block pointer-events-none absolute top-0 left-0 z-10"
        />

        {/* Airplane SVG (z-10: BEHIND cards at z-20) */}
        <div
          ref={airplaneRef}
          className="hidden lg:block pointer-events-none absolute top-0 left-0 w-[120px] h-[120px] z-10"
        >
          <img
            src="/images/pesawat.svg"
            alt="airplane"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Header Block (z-20: on top of airplane and smoke trail) */}
        <div className="sec-inner mb-16 lg:mb-0 lg:flex-shrink-0 lg:w-[360px] lg:pr-8 relative z-20">
          <div className="sec-eyebrow flex items-center gap-4 mb-5 overflow-hidden">
            <span
              className="sec-eyebrow-text"
              style={{ color: "#0088CC", fontWeight: 600 }}
            >
              // SELECTED WORK
            </span>
            <div
              className="sec-eyebrow-dash"
              style={{ background: "#7DD3FC", width: 40 }}
            />
          </div>

          <h2 className="sec-title">
            <span className="clip-wrap block">
              <span
                className="clip-inner inline-block"
                style={{
                  color: "#0A0A0A",
                  fontFamily: "var(--font-anton)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: "clamp(48px, 5vw, 72px)",
                }}
              >
                Selected
              </span>
            </span>
            <span className="clip-wrap block">
              <span
                className="clip-inner inline-block"
                style={{
                  color: "#555555",
                  fontFamily: "var(--font-anton)",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  fontSize: "clamp(48px, 5vw, 72px)",
                }}
              >
                Projects.
              </span>
            </span>
          </h2>
        </div>

        {/* Projects Cards List (z-20: on top of airplane and smoke trail) */}
        <div className="flex flex-col gap-24 lg:flex-row lg:gap-16 lg:items-center relative z-20">
          {FEATURED_PROJECTS.map((proj) => {
            const isPortrait = proj.aspect === "portrait";

            return (
              <div
                key={proj.num}
                className="featured-project-row featured-project-card grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none border border-[#E5E5E5] lg:border-none shadow-sm lg:shadow-none lg:flex-shrink-0 lg:w-[820px]"
              >
                {/* Info Column (Always Left) */}
                <div className="flex flex-col lg:order-1">
                  {/* Number & Badge */}
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      style={{
                        fontFamily: "var(--font-jakarta)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0088CC",
                        flexShrink: 0,
                      }}
                    >
                      {proj.num}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "3px 8px",
                        border: "1px solid #7DD3FC",
                        borderRadius: "4px",
                        color: "#0088CC",
                        fontFamily: "var(--font-jakarta)",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {proj.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-jakarta)",
                      fontSize: "clamp(24px, 2.5vw, 32px)",
                      fontWeight: 800,
                      color: "#0A0A0A",
                      marginBottom: 12,
                    }}
                  >
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-jakarta)",
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: "#4A4A4A",
                      marginBottom: 20,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {proj.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          padding: "4px 10px",
                          background: "#FFFFFF",
                          border: "1px solid #D0D0D0",
                          borderRadius: "6px",
                          color: "#333333",
                          fontFamily: "var(--font-jakarta)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-6">
                    {"liveLink" in proj && (
                      <a
                        href={proj.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold hover:text-[#0088CC] transition-colors"
                        style={{ color: "#333333" }}
                      >
                        Visit Website ↗
                      </a>
                    )}
                    {"githubLink" in proj && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold hover:text-[#0088CC] transition-colors"
                        style={{ color: "#333333" }}
                      >
                        GitHub Repository ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Photo Column (Always Right) */}
                <div className="flex justify-center lg:order-2">
                  <div
                    className={`polaroid-card bg-white p-4 pb-10 border border-[#E5E5E5] rounded-xl shadow-md transition-all duration-300 ease-out hover:rotate-0 hover:scale-[1.03] hover:shadow-xl ${proj.rotation}`}
                    style={{
                      width: "100%",
                      maxWidth: isPortrait ? "290px" : "440px",
                    }}
                  >
                    <div
                      className={`overflow-hidden rounded-lg bg-gray-100 ${
                        isPortrait ? "aspect-[3/4]" : "aspect-[16/10]"
                      }`}
                    >
                      <img
                        src={proj.screenshot}
                        alt={proj.title}
                        onLoad={() => ScrollTrigger.refresh()}
                        className="card-image-parallax w-full h-full object-cover scale-[1.12]"
                        style={{ willChange: "transform" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Archive Section (z-20: on top of airplane and smoke trail) */}
        <div
          className="mt-20 lg:mt-0 pt-12 lg:pt-0 lg:pl-12 lg:border-l lg:border-[#E0E0E0] border-t border-[#E0E0E0] lg:border-t-0 lg:flex-shrink-0 lg:w-[480px] relative z-20"
          style={{
            fontFamily: "var(--font-jakarta)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#888888",
              marginBottom: 20,
            }}
          >
            // Also built
          </span>

          <div className="flex flex-col gap-6">
            {/* Item 1 */}
            <div className="flex flex-col gap-1 py-3 border-b border-[#F0F0F0]">
              <span className="font-bold text-[#0A0A0A] text-lg">Inkwell</span>
              <span className="text-sm text-[#666666] mb-2">
                Blog platform with role-based auth & editorial UI. Laravel ·
                Breeze · MySQL · Blade
              </span>
              <a
                href="https://github.com/Athallahsy/inkwell"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:text-[#7DD3FC] transition-colors self-start"
                style={{ color: "#888888" }}
              >
                github.com/Athallahsy/inkwell ↗
              </a>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col gap-1 py-3 border-b border-[#F0F0F0]">
              <span className="font-bold text-[#0A0A0A] text-lg">
                Portfolio
              </span>
              <span className="text-sm text-[#666666] mb-2">
                This website. React · Tailwind CSS · Three.js · GSAP
              </span>
              <a
                href="https://portofolio-eight-vert.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold hover:text-[#7DD3FC] transition-colors self-start"
                style={{ color: "#888888" }}
              >
                portofolio-eight-vert.vercel.app ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
