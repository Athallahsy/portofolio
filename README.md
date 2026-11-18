# 🚀 Premium Developer Portfolio

A highly optimized, visually stunning, and interactive developer portfolio built with modern web technologies. This project is carefully engineered for visual elegance, smooth user interactions, and top-tier performance on both desktop and mobile devices.

🌐 **Live Demo:** [athallahsy.vercel.app](https://athallahsy.vercel.app)

---

## ✨ Features

- **🌐 3D Interactive Lanyard:** A fully physical, interactive 3D ID badge built using **React Three Fiber (R3F)** and **Rapier physics simulation**. Features custom texture mapping, and optimized drag-and-drop physics with page-scroll locking (`touch-none`) on mobile.
- **✈️ Zigzag Canvas Trail:** An animated airplane path that dynamically follows a scroll-triggered zigzag pattern using **GSAP MotionPath** and renders a lightweight smoke trail on a synchronized HTML5 Canvas.
- **✨ Fluid Micro-animations:** Premium, high-performance scroll animations, clip-text reveal headers, and interactive card physics built entirely using **GSAP** and **Lenis Smooth Scroll**.
- **⚡ Performance Audited:** Optimized to prevent layout thrashing and forced reflows (e.g., zero DOM cost calculations in animations), with efficient state handling for lightweight CPU/battery usage on mobile devices.
- **📱 Fully Responsive:** Hand-tuned media queries and fluid CSS `clamp()` typography tailored specifically for desktop and modern mobile breakpoints (375px–430px) without layout leaks (`overflow-x-hidden`).
- **🔍 SEO & Accessiblity (a11y) Optimized:** Validated semantic HTML hierarchy, dynamic canonical URLs, search-engine-hidden screen-reader H1 tags, sitemap/robots generation, and verified OpenGraph/Twitter card images.

---

## ⚡ Lighthouse & Performance Benchmark

Engineered with a heavy focus on **Core Web Vitals** and real-world performance, achieving top-tier scores on Google Lighthouse & PageSpeed Insights despite running complex 3D WebGL physics and rich GSAP animations.

| Metric | Score / Result | Benchmark Target |
| :--- | :---: | :---: |
| **Performance** | **95+** 🟢 | Google Target ≥ 90 |
| **Accessibility** | **95+** 🟢 | Google Target ≥ 90 |
| **Best Practices** | **100** 🟢 | Google Target ≥ 90 |
| **SEO** | **100** 🟢 | Google Target ≥ 90 |
| **Total Blocking Time (TBT)** | **< 200 ms** ⚡ | Google Target ≤ 200 ms |
| **Cumulative Layout Shift (CLS)** | **0.000** 🟢 | Google Target ≤ 0.1 |

<!-- Place your Lighthouse screenshot at public/images/lighthouse-score.png -->
<p align="center">
  <img src="public/images/lighthouse-score.png" alt="Lighthouse Score" width="800" style="border-radius: 8px;" />
</p>

### 🛠️ Key Performance Engineering
- **On-Demand 3D & Physics Loading:** Isolated heavy Three.js, React Three Fiber, and Rapier WASM physics engines behind viewport-based Intersection Observers with dynamic imports (`next/dynamic`), reducing initial Total Blocking Time (TBT) from 7,200ms to <200ms.
- **Direct-DOM Splash Animation:** Replaced high-frequency React state intervals (20 re-renders/sec) with GSAP direct DOM transforms to avoid main-thread blocking during critical hydration.
- **Native-First Touch Scrolling:** Disabled JavaScript-driven smooth scroll (Lenis) on touch/mobile devices (`(pointer: coarse)`), preserving native 120Hz GPU-accelerated scrolling with zero battery/CPU overhead.
- **Modern Code Splitting & Polyfill Stripping:** Removed legacy browser polyfills and fragmented below-the-fold modules (`TechStack`, `Skills`, `Projects`, `Footer`) into asynchronous chunks.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS variables
- **3D Render & Physics:** [Three.js](https://threejs.org/), `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
- **Animations:** [GSAP](https://gsap.com/) (ScrollTrigger, MotionPath), [Framer Motion](https://www.framer.com/motion/)
- **Scroll Engine:** [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Athallahsy/portofolio.git
   cd portofolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

To create a fully optimized static production build:
```bash
npm run build
```

---

## 🧹 Quality Assurance & Clean Code

This project has been thoroughly audited for code hygiene and performance:
- **Zero Hydration Mismatches:** Cleaned up server-vs-client inline CSS styling conflicts.
- **Asset Cleanliness:** Cleared all boilerplate images, template SVGs, and unused asset files to reduce bundle size.
- **Reflow Elimination:** Replaced expensive DOM measurements with memory-based variables inside animations to optimize JS main-thread ticks.
- **No Dead CSS:** Removed unused legacy CSS rules and duplicate classes from `globals.css`.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
