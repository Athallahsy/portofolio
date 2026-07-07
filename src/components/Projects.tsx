  "use client";

  import { useEffect, useRef } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";

  const FEATURED_PROJECTS = [
    {
      num: "01",
      title: "AyamKu",
      badge: "Mobile · Personal Project · Flutter",
      tags: ["Flutter", "Dart", "Hive", "Provider", "fl_chart"],
      desc: "My father used to manage his chicken farm with handwritten notes — feed calculations, expenses, all on paper. I built him an Android app to replace that.\n\nAyamKu supports up to 3 coops, auto-calculates daily feed and water needs based on growth phase (Starter, Grower, Finisher), tracks income and expenses with weekly charts, and estimates profit/loss per harvest cycle. Designed with large text and minimal UI — because the user isn't a tech-savvy young person, it's my dad.",
      screenshot: "/images/ayamku.png",
      aspect: "portrait",
      rotation: "-rotate-2",
    },
    {
      num: "02",
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
      num: "03",
      title: "Finote",
      badge: "Web App · Personal Project · Laravel",
      tags: ["Laravel 12", "Sanctum", "Filament", "MySQL", "REST API"],
      desc: "A personal finance manager built API-first. Full REST API for transaction recording, financial categories, and monthly reports — secured with Laravel Sanctum. Complete admin panel via Filament, and PDF export for monthly financial reports.",
      screenshot: "/images/finote.png",
      aspect: "landscape",
      rotation: "-rotate-1.5",
      githubLink: "https://github.com/Athallahsy/finote",
    },
    {
      num: "04",
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

  export default function Projects() {
    const airplaneRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

      // Header eyebrow animation
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

      // Header title animation
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

      // Featured projects entry animation
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

      // Airplane along zigzag motion path with trail effect
      const container = document.getElementById("projects");
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (container && airplaneRef.current && canvas) {
        const resizeCanvas = () => {
          canvas.width = container.offsetWidth;
          canvas.height = container.offsetHeight;
        };

        resizeCanvas();

        type PathPoint = { x: number; y: number };
        type TrailDot = { x: number; y: number; timestamp: number };

        let trail: TrailDot[] = [];
        let points: PathPoint[] = [];
        let lastX = 0;
        let lastY = 0;
        let pathAnimation: gsap.core.Tween | null = null;

        const planeOffset = 60; // Setengah dari 120px (lebar/tinggi elemen pesawat tetap)

        const calculatePath = (): PathPoint[] => {
          const containerRect = container.getBoundingClientRect();
          const rows = Array.from(
            document.querySelectorAll<HTMLElement>(".featured-project-row"),
          );

          const rowCenters = rows.map((row) => {
            const rowRect = row.getBoundingClientRect();
            return rowRect.top - containerRect.top + rowRect.height / 2;
          });

          if (rowCenters.length < 2) return [];

          const nextPoints: PathPoint[] = [
            {
              // Start point: above the section (off-screen top)
              x: containerRect.width * 0.15 - planeOffset,
              y: -200 - planeOffset,
            },
          ];

          rowCenters.forEach((centerY, i) => {
            const x =
              i % 2 === 0
                ? containerRect.width * 0.85
                : containerRect.width * 0.15;

            nextPoints.push({
              x: x - planeOffset,
              y: centerY - planeOffset,
            });
          });

          const lastIndex = rowCenters.length - 1;
          const endX =
            lastIndex % 2 === 0
              ? containerRect.width * 0.15
              : containerRect.width * 0.85;

          nextPoints.push({
            // End point: below the section (off-screen bottom)
            x: endX - planeOffset,
            y: container.offsetHeight + 200 - planeOffset,
          });

          return nextPoints;
        };

        const createPathAnimation = () => {
          points = calculatePath();

          if (!points.length || !airplaneRef.current) return;

          lastX = points[0].x;
          lastY = points[0].y;

          gsap.set(airplaneRef.current, {
            x: points[0].x,
            y: points[0].y,
          });

          pathAnimation = gsap.to(airplaneRef.current, {
            ease: "none",
            motionPath: {
              path: points,
              autoRotate: true,
              curviness: 1.2,
            },
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!airplaneRef.current) return;

                const x = gsap.getProperty(airplaneRef.current, "x") as number;
                const y = gsap.getProperty(airplaneRef.current, "y") as number;

                if (Math.abs(self.getVelocity()) > 10) {
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
                }
              },
            },
          });
        };

        createPathAnimation();

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

        const handleResize = () => {
          resizeCanvas();
          trail = [];

          pathAnimation?.kill();
          createPathAnimation();

          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
          gsap.ticker.remove(renderTrail);
          pathAnimation?.kill();
        };
      }
    }, []);

    return (
      <section
        id="projects"
        style={{
          padding: "120px 64px",
          position: "relative",
          zIndex: 20,
          background: "#FAFAFA",
          overflow: "hidden",
        }}
      >
        {/* Watermark WORK */}
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

        {/* Trail Canvas Overlay */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 25,
          }}
        />

        {/* Airplane SVG */}
        <div
          ref={airplaneRef}
          className="block"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 120,
            height: 120,
            pointerEvents: "none",
            zIndex: 30,
          }}
        >
          <img
            src="/images/pesawat.svg"
            alt="airplane"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="sec-inner max-w-[1200px] mx-auto relative z-10">
          {/* Eyebrow */}
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

          {/* Title */}
          <h2 className="sec-title mb-[100px]">
            <span className="clip-wrap">
              <span
                className="clip-inner"
                style={{ color: "#0A0A0A", fontFamily: "var(--font-anton)", fontWeight: 400, textTransform: "uppercase" }}
              >
                Selected
              </span>
            </span>
            <span className="clip-wrap">
              <span
                className="clip-inner"
                style={{ color: "#555555", fontFamily: "var(--font-anton)", fontWeight: 400, textTransform: "uppercase" }}
              >
                Projects.
              </span>
            </span>
          </h2>

          {/* Zigzag list */}
          <div className="flex flex-col gap-32 lg:gap-40">
            {FEATURED_PROJECTS.map((proj, i) => {
              const isOdd = i % 2 === 0;
              const isPortrait = proj.aspect === "portrait";

              return (
                <div
                  key={proj.num}
                  className="featured-project-row grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
                >
                  {/* Photo Column */}
                  <div
                    className={`flex justify-center ${isOdd ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div
                      className={`polaroid-card bg-white p-4 pb-10 border border-[#E5E5E5] rounded-xl shadow-md transition-all duration-300 ease-out hover:rotate-0 hover:scale-[1.03] hover:shadow-xl ${proj.rotation}`}
                      style={{
                        width: "100%",
                        maxWidth: isPortrait ? "290px" : "480px",
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
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info Column */}
                  <div
                    className={`flex flex-col ${isOdd ? "lg:order-1" : "lg:order-2"}`}
                  >
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
                        fontSize: "clamp(24px, 3vw, 36px)",
                        fontWeight: 800,
                        color: "#0A0A0A",
                        marginBottom: 16,
                      }}
                    >
                      {proj.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-jakarta)",
                        fontSize: 15,
                        fontWeight: 400,
                        lineHeight: 1.75,
                        color: "#4A4A4A",
                        marginBottom: 24,
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
                </div>
              );
            })}
          </div>

          {/* Archive Section */}
          <div
            className="mt-32 pt-16 border-t border-[#E0E0E0]"
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
                marginBottom: 24,
              }}
            >
              // Also built
            </span>

            <div className="flex flex-col gap-6">
              {/* Item 1 */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-3 border-b border-[#F0F0F0]">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <span className="font-bold text-[#0A0A0A] text-lg min-w-[100px]">
                    Inkwell
                  </span>
                  <span className="text-sm text-[#666666]">
                    Blog platform with role-based auth & editorial UI. Laravel ·
                    Breeze · MySQL · Blade
                  </span>
                </div>
                <a
                  href="https://github.com/Athallahsy/inkwell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold hover:text-[#7DD3FC] transition-colors self-start md:self-auto"
                  style={{ color: "#888888" }}
                >
                  github.com/Athallahsy/inkwell ↗
                </a>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-3 border-b border-[#F0F0F0]">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <span className="font-bold text-[#0A0A0A] text-lg min-w-[100px]">
                    Portfolio
                  </span>
                  <span className="text-sm text-[#666666]">
                    This website. React · Tailwind CSS · Three.js · GSAP
                  </span>
                </div>
                <a
                  href="https://portofolio-eight-vert.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold hover:text-[#7DD3FC] transition-colors self-start md:self-auto"
                  style={{ color: "#888888" }}
                >
                  portofolio-eight-vert.vercel.app ↗
                </a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 767px) {
            #projects {
              padding: 72px 20px !important;
            }
            #projects .sec-inner {
              max-width: 100% !important;
            }
            #projects .featured-project-row {
              gap: 32px !important;
            }
          }
        `}</style>
      </section>
    );
  }
