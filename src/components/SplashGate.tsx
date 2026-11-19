"use client";

import { useState, useSyncExternalStore } from "react";
import Splash from "@/components/Splash";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TapeBand from "@/components/TapeBand";
import PreviaSection from "@/components/PreviaSection";
import TurntableSection from "@/components/TurntableSection";
import Projects from "@/components/Projects";
import BrandsBand from "@/components/BrandsBand";
import Skills from "@/components/Skills";
import CratesSection from "@/components/CratesSection";
import SinglesSection from "@/components/SinglesSection";
import FooterContact from "@/components/FooterContact";

const emptySubscribe = () => () => {};

export default function SplashGate() {
  const [splashDone, setSplashDone] = useState(false);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <>
      {isMounted && !splashDone && (
        <Splash onComplete={() => setSplashDone(true)} />
      )}
      <Nav />
      <main className="relative">
        <Hero />
        <TapeBand />
        <PreviaSection />
        <TurntableSection />
        <Projects />
        <BrandsBand />
        <Skills />
        <CratesSection />
        <SinglesSection />
        <FooterContact />
      </main>
    </>
  );
}
