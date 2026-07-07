"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const ContactScene = dynamic(() => import("./ContactScene"), { ssr: false });

export default function Contact() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const eyebrowSpan = document.querySelector<HTMLElement>(".contact-eyebrow span");
    const eyebrowDash = document.querySelector<HTMLElement>(".contact-eyebrow-dash");
    if (eyebrowSpan) {
      gsap.to(eyebrowSpan, {
        y: "0%", duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: "#contact", start: "top 83%" }
      });
    }
    if (eyebrowDash) {
      gsap.to(eyebrowDash, {
        scaleX: 1, duration: 0.5, ease: "power2.inOut", delay: 0.1,
        scrollTrigger: { trigger: "#contact", start: "top 83%" }
      });
    }
    gsap.from(".contact-title", {
      y: 44, opacity: 0, duration: 1.0, ease: "power4.out",
      scrollTrigger: { trigger: ".contact-title", start: "top 80%" }
    });
    gsap.from(".contact-sub", {
      y: 24, opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.14,
      scrollTrigger: { trigger: ".contact-sub", start: "top 85%" }
    });
    gsap.from(".contact-email", {
      y: 16, opacity: 0, duration: 0.7, ease: "power2.out", delay: 0.22,
      scrollTrigger: { trigger: ".contact-email", start: "top 90%" }
    });
    gsap.from(".social-links", {
      x: 24, opacity: 0, duration: 0.75, ease: "power3.out", delay: 0.18,
      scrollTrigger: { trigger: "#contact", start: "top 75%" }
    });
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "var(--accent)", padding: "120px 64px" }}
    >
      <ContactScene />
      <div
        className="contact-inner relative z-10 max-w-[1280px] mx-auto grid gap-[80px] items-end"
        style={{ gridTemplateColumns: "1fr auto" }}
      >
        {/* LEFT — main content */}
        <div>
          <div className="contact-eyebrow flex items-center gap-4 mb-6 overflow-hidden">
            <span>Get In Touch</span>
            <div className="contact-eyebrow-dash" />
          </div>
          <h2 className="contact-title mb-7">
            Let&apos;s Build<br />Something.
          </h2>
          <p className="contact-sub mb-11 max-w-[460px]">
            Open for internship opportunities, freelance projects, and collaboration.
            Always happy to connect and talk ideas.
          </p>
          <a
            href="mailto:athallahmsyaffa@gmail.com"
            className="contact-email"
          >
            athallahmsyaffa@gmail.com ↗
          </a>
        </div>

        {/* RIGHT — social links */}
        <div className="social-links flex flex-col gap-[18px] items-end">
          <a
            href="https://github.com/athallahsy"
            target="_blank"
            rel="noopener noreferrer"
            className="soc-link"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/athallahsy"
            target="_blank"
            rel="noopener noreferrer"
            className="soc-link"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://athallahsy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="soc-link"
          >
            Portfolio ↗
          </a>
        </div>
      </div>
    </section>
  );
}
