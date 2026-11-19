"use client";

import StickyLayer from "@/components/StickyLayer";
import { useStrike } from "@/context/StrikeContext";

const CAPABILITY_TAGS = {
  en: [
    "LARAVEL 12 & CODEIGNITER 4",
    "AI WHATSAPP BOT & GEMINI",
    "REACT, NEXT.JS & TYPESCRIPT",
    "FLUTTER ANDROID APPS",
    "CHECKOUT SECURITY AUDITS",
    "CPANEL, VERCEL & MYSQL",
  ],
  id: [
    "LARAVEL 12 & CODEIGNITER 4",
    "AI WHATSAPP BOT & GEMINI",
    "REACT, NEXT.JS & TYPESCRIPT",
    "APLIKASI ANDROID FLUTTER",
    "AUDIT KEAMANAN CHECKOUT",
    "CPANEL, VERCEL & MYSQL",
  ],
};

export default function PreviaSection() {
  const { lang, playClick } = useStrike();

  return (
    <StickyLayer
      id="previa"
      zIndex={2}
      nowPlayingLabel="A1 · THE BRIEF"
      nowPlayingColor="#f4f1ea"
      className="grain-bg bg-[#12151c] pt-24 md:pt-[120px] pb-24 md:pb-[110px] px-4 sm:px-8 lg:px-14"
      style={{ marginTop: "-6px" }}
    >
      <div className="max-w-[1320px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)] gap-7 lg:gap-14 items-start">
        {/* Left 1.6fr: Tilted Warm Newsprint Poster (.poster) */}
        <article
          className="relative p-7 sm:p-11 lg:p-[52px] text-[#0b0d12] -rotate-[0.8deg] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.78)]"
          style={{
            background:
              "radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.6), transparent 50%), radial-gradient(ellipse at 90% 90%, rgba(120,100,60,0.18), transparent 50%), #f4f1ea",
          }}
        >
          {/* Semi-transparent cream masking tapes (.tape-b & .tape-c) */}
          <span
            aria-hidden="true"
            className="masking-tape absolute -top-3 left-6 w-[120px] h-[30px] -rotate-[8deg] z-10"
            style={{ background: "rgba(244, 241, 234, 0.72)" }}
          />
          <span
            aria-hidden="true"
            className="masking-tape absolute -top-2.5 right-7 w-[120px] h-[30px] rotate-[6deg] z-10"
            style={{ background: "rgba(244, 241, 234, 0.72)" }}
          />

          <h2
            className="font-sign uppercase m-0 leading-[0.95] tracking-[-0.01em] max-w-[16ch]"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)" }}
          >
            {lang === "id" ? (
              <>
                DARI IDE KE{" "}
                <span className="font-tag font-normal text-[#ff3b24] normal-case tracking-normal">
                  hasil nyata
                </span>
              </>
            ) : (
              <>
                FROM IDEA TO{" "}
                <span className="font-tag font-normal text-[#ff3b24] normal-case tracking-normal">
                  measurable results
                </span>
              </>
            )}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7 mt-7 text-[#24262c] text-[16px] sm:text-[16.5px] leading-[1.55]">
            <p className="m-0">
              {lang === "id"
                ? "IT Staff / Support di JS Florist & Poppy Florist Banjarbaru sekaligus mahasiswa D4 TRPL Politeknik IDN Bogor (Semester 5). Saya membangun bot WhatsApp AI untuk customer service & pemesanan, merawat sistem POS berbasis Laravel (memperbaiki error duplicate transaction ID & menambah akun kasir), serta mengelola hosting cPanel, database, dan backup produksi."
                : "IT Staff / Support at JS Florist & Poppy Florist in Banjarbaru and D4 Software Engineering student at Politeknik IDN Bogor (Semester 5). I build AI-powered WhatsApp bots for customer service and ordering, maintain Laravel POS systems (fixing duplicate transaction ID errors and adding cashier accounts), and manage production cPanel hosting, databases, and backups."}
            </p>
            <p className="m-0">
              {lang === "id"
                ? "Di sistem live e-commerce, saya mengaudit alur checkout dan menutup 12+ temuan keamanan termasuk validasi harga di sisi server, serta memangkas LCP homepage dari 23,1 detik menjadi 3,6 detik melalui konversi WebP, bulk resizing, dan caching. Di luar kode, saya seorang Hafiz Al-Quran (30 Juz) dan siap pindah ke Bandung."
                : "In live e-commerce production, I audited the checkout flow and resolved 12+ security findings including server-side price validation, and cut homepage LCP from 23.1s to 3.6s via WebP conversion, bulk resizing, and caching. Outside of code, I am a Hafiz of the Quran (30 Juz) and open to relocate to Bandung."}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2.5 mt-8 p-0 list-none">
            {CAPABILITY_TAGS[lang].map((tag) => (
              <li
                key={tag}
                className="px-3 py-[7px] border-2 border-[#0b0d12] rounded-full font-extrabold text-[13px] tracking-[0.04em] uppercase text-[#0b0d12]"
                style={{ fontVariationSettings: '"wdth" 78' }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </article>

        {/* Right 0.8fr: Compact Sticky Pink Flyer (.flyer) */}
        <aside
          aria-label="Collaboration Flyer"
          className="lg:sticky lg:top-[100px] rounded-[6px] bg-[#ff3d8b] text-[#0b0d12] p-[30px_26px_26px] rotate-[2.5deg] shadow-[0_30px_50px_-20px_rgba(0,0,0,0.78)]"
        >
          <p
            className="font-sign m-0 mt-2.5 leading-[1.05]"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
          >
            {lang === "id"
              ? "Siap bergabung di tim Fullstack, Magang & Proyek Freelance"
              : "Open for Fullstack Roles, Internships & Custom Builds"}
          </p>

          <p className="m-0 mt-3.5 text-[15px] leading-[1.45] text-[#0b0d12]">
            {lang === "id"
              ? "Berdomisili di Banjarbaru, Indonesia dan siap pindah ke Bandung untuk tim yang butuh software cepat, aman, dan benar-benar terpakai."
              : "Based in Banjarbaru, Indonesia and open to relocating to Bandung for engineering teams building fast, secure software."}
          </p>

          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              playClick();
              document
                .getElementById("contacto")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block mt-5 text-[#0b0d12] font-tag text-[24px] -rotate-[3deg] no-underline hover:underline decoration-wavy underline-offset-[6px]"
          >
            <span>{lang === "id" ? "Hubungi gue" : "Book a chat"}</span>{" "}
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </StickyLayer>
  );
}
