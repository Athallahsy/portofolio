"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const AboutScene = dynamic(() => import("./AboutScene"), { ssr: false });

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const eyebrowSpan = document.querySelector<HTMLElement>(".about-eyebrow span");
    const eyebrowDash = document.querySelector<HTMLElement>(".about-eyebrow-dash");
    const quoteEl = document.querySelector<HTMLElement>(".about-quote");
    const bodyEl = document.querySelector<HTMLElement>(".about-body");

    if (eyebrowSpan) {
      gsap.to(eyebrowSpan, {
        y: "0%", duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: "#about", start: "top 83%" }
      });
    }
    if (eyebrowDash) {
      gsap.to(eyebrowDash, {
        scaleX: 1, duration: 0.5, ease: "power2.inOut", delay: 0.1,
        scrollTrigger: { trigger: "#about", start: "top 83%" }
      });
    }
    if (quoteEl) {
      gsap.from(quoteEl, {
        x: -36, opacity: 0, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: ".about-quote", start: "top 80%" }
      });
    }
    if (bodyEl) {
      gsap.from(bodyEl, {
        x: 28, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.12,
        scrollTrigger: { trigger: ".about-body", start: "top 82%" }
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--text)", padding: "120px 64px" }}
    >
      <AboutScene />
      <div
        className="about-inner relative z-10 max-w-[1280px] mx-auto grid gap-[80px] items-start"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* LEFT — eyebrow + quote */}
        <div>
          <div className="about-eyebrow flex items-center gap-4 mb-9 overflow-hidden">
            <span>About</span>
            <div className="about-eyebrow-dash" />
          </div>
          <blockquote className="about-quote">
            &ldquo;Code with passion,{" "}
            <em>debug with patience.</em>&rdquo;
          </blockquote>
        </div>

        {/* RIGHT — bio */}
        <div className="about-right" style={{ paddingTop: "60px" }}>
          <div className="about-body">
            <p>
              Fullstack Developer in progress — currently studying IT and building real skills
              through <strong>real projects</strong>.
            </p>
            <p>
              I enjoy the challenge of going from{" "}
              <strong>database schema to polished UI</strong> — every layer of the
              stack has its own puzzle.
            </p>
            <p>
              Currently deepening my knowledge in{" "}
              <strong>Node.js, TypeScript, and Next.js</strong>.
            </p>
            <p>
              When I&apos;m not coding: strategy games, tech blogs, and
              coffee — always coffee. ☕
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
