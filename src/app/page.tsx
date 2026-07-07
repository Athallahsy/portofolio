"use client";

import { useState } from "react";
import Splash from "@/components/Splash";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechStackStrip from "@/components/TechStackStrip";
import LanyardSection from "@/components/LanyardSection";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import FooterContact from "@/components/FooterContact";

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <Splash onComplete={() => setSplashDone(true)} />}
      <main style={{ position: "relative", isolation: "isolate" }}>
        <Nav />
        <Hero />
        <TechStackStrip />
        <LanyardSection />
        <Skills />
        <Projects />
        <FooterContact />
      </main>
    </>
  );
}
