"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollReveal({ text, className, style }: ScrollRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".char-span");
    if (chars.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { color: "#6B6B6B" },
        {
          color: "#F5F5F5",
          stagger: 0.015, // Smooth sequential transition per character
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 85%", // Starts animation when the top of paragraph enters 85% of the viewport height
            end: "bottom 65%", // Finishes before it scrolls out too far
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [text]);

  // Split text by words first, then split each word by characters.
  // This approach keeps characters grouped by word wrappers (with whiteSpace: nowrap)
  // to preserve word wrapping correctly while animating letters individually.
  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        display: "inline-block",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="char-span"
              style={{
                color: "#6B6B6B",
                willChange: "color",
                display: "inline-block",
              }}
            >
              {char}
            </span>
          ))}
          {/* Render space between words except after the last word */}
          {wordIdx < words.length - 1 && (
            <span
              style={{
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {" "}
            </span>
          )}
        </span>
      ))}
    </p>
  );
}
