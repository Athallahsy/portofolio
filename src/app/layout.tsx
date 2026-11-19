import type { Metadata, Viewport } from "next";
import { Bungee, Permanent_Marker, Archivo } from "next/font/google";
import "./globals.css";
import { StrikeProvider } from "@/context/StrikeContext";

const bungee = Bungee({
  variable: "--f-sign",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  variable: "--f-tag",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const archivo = Archivo({
  variable: "--f-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://athallahsy.vercel.app"),
  title: "ATHALLAH - Fullstack Developer & Digital Craft",
  description:
    "Portfolio of Athallah Muhammad Syaffa, Junior Fullstack Developer specializing in Laravel, React, Next.js, and Flutter.",
  keywords: [
    "Athallah Muhammad Syaffa",
    "Fullstack Developer",
    "Laravel",
    "React",
    "Next.js",
    "Flutter",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ATHALLAH - Fullstack Developer",
    description:
      "Interactive urban-vinyl developer portfolio of Athallah Muhammad Syaffa.",
    url: "https://athallahsy.vercel.app",
    siteName: "ATHALLAH",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 630,
        alt: "Athallah Muhammad Syaffa",
      },
    ],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bungee.variable} ${permanentMarker.variable} ${archivo.variable} h-full antialiased overflow-x-clip`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col overflow-x-clip bg-[#0b0d12] text-[#d6d9e1]"
      >
        <StrikeProvider>{children}</StrikeProvider>
      </body>
    </html>
  );
}
