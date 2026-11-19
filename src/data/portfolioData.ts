export type Lang = "en" | "id";

export interface TrackItem {
  code: string;
  title: string;
  role: string;
  period: string;
  color: string;
  accentName: "yellow" | "pink" | "cyan" | "green" | "lamp";
  summary: { en: string; id: string };
  highlights: { en: string[]; id: string[] };
  tags: string[];
}

export interface ProjectPoster {
  num: string;
  title: string;
  category: string;
  year: string;
  accentColor: string;
  coverSubtitle: string;
  coverHeadline: string;
  tags: string[];
  desc: { en: string; id: string };
  screenshot: string | null;
  aspect: "landscape" | "portrait";
  tilt: string;
  liveLink?: string;
  githubLink?: string;
}

export interface StickerItem {
  id: string;
  label: string;
  shape: "pill" | "rect" | "circle" | "tag";
  bg: string;
  fg: string;
  x: number;
  y: number;
  rot: number;
}

export interface SkillGroup {
  code: string;
  title: string;
  color: string;
  items: string[];
}

export interface CrateRecord {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  color: string;
  textColor: string;
  badgeColor?: string;
  labelCode: string;
  desc: { en: string; id: string };
  highlights: { en: string[]; id: string[] };
}

export interface SingleArticle {
  id: string;
  side: string;
  dateLabel: string;
  title: string;
  minutes: number;
  color: string;
  ink: string;
  coverImage: string;
  coverPosition?: string;
  tags: string[];
  excerpt: { en: string; id: string };
  body: { en: string[]; id: string[] };
  link?: string;
}

export const PROFILE = {
  tagName: "ATHALLAH",
  fullName: "Athallah Muhammad Syaffa",
  email: "athallahmsyaffa@gmail.com",
  whatsapp: "https://wa.me/628565001877",
  whatsappDisplay: "+62 856-5001-877",
  github: "https://github.com/athallahsy",
  linkedin: "https://linkedin.com/in/athallahsy",
  location: "Banjarbaru, Indonesia · Open to relocate to Bandung",
  education: "D4 TRPL Politeknik IDN Bogor (Semester 5)",
};

export const HERO_SKILLS_LINE =
  "LARAVEL 12 · CODEIGNITER 4 · REACT & NEXT.JS · FLUTTER · GEMINI AI · WHATSAPP API";

export const HERO_COUNTERS = [
  {
    value: "05",
    label: { en: "SEMESTER · D4 TRPL", id: "SEMESTER · D4 TRPL" },
  },
  {
    value: "12+",
    label: { en: "CHECKOUT SEC FIXES", id: "PERBAIKAN KEAMANAN" },
  },
  {
    value: "07+",
    label: { en: "SHIPPED APPS & APIS", id: "PROYEK RILIS & API" },
  },
  {
    value: "30",
    label: { en: "JUZ · HAFIZ AL-QURAN", id: "JUZ · HAFIZ AL-QURAN" },
  },
];

export const TRACKS: TrackItem[] = [
  {
    code: "A1",
    title: "JS Florist & Poppy Florist",
    role: "IT Staff / Support · Banjarbaru",
    period: "Sep 2026 - Present",
    color: "#ff3b24",
    accentName: "yellow",
    summary: {
      en: "Managing production e-commerce, Laravel POS maintenance, AI WhatsApp customer service automation, web performance optimization, and cPanel infrastructure.",
      id: "Menangani sistem e-commerce produksi, maintenance POS berbasis Laravel, otomasi CS WhatsApp berbasis AI, optimasi performa web, dan infrastruktur cPanel.",
    },
    highlights: {
      en: [
        "Built an AI-powered WhatsApp bot for customer service and ordering, tested on the store's official number.",
        "Audited e-commerce checkout and fixed 12+ security findings, including server-side price validation.",
        "Maintained a Laravel POS system: fixed duplicate transaction ID checkout errors and added cashier accounts.",
        "Cut homepage LCP from 23.1 s to 3.6 s via WebP conversion, bulk resizing, and caching.",
        "Managed cPanel hosting: deployments, backups, databases, and staff email.",
      ],
      id: [
        "Membangun bot WhatsApp bertenaga AI untuk customer service dan pemesanan, diuji langsung di nomor resmi toko.",
        "Mengaudit checkout e-commerce dan memperbaiki 12+ temuan keamanan, termasuk validasi harga di sisi server.",
        "Memelihara sistem POS Laravel: memperbaiki error checkout akibat duplicate transaction ID dan menambah akun kasir.",
        "Memangkas LCP homepage dari 23,1 dtk menjadi 3,6 dtk lewat konversi WebP, bulk resizing, dan caching.",
        "Mengelola hosting cPanel: deployment, backup, database, dan email staf.",
      ],
    },
    tags: ["Laravel", "Gemini AI", "WhatsApp API", "Web Security", "cPanel"],
  },
  {
    code: "A2",
    title: "Finote API & Admin",
    role: "Backend & API Architect · Laravel 12",
    period: "2025",
    color: "#e9ff2e",
    accentName: "pink",
    summary: {
      en: "Personal finance manager built API-first with Laravel Sanctum, Filament admin panel, automated feature tests, and PDF monthly reports.",
      id: "Aplikasi manajemen keuangan pribadi berbasis API-first menggunakan Laravel Sanctum, panel admin Filament, automated tests, dan ekspor laporan PDF.",
    },
    highlights: {
      en: [
        "Audited and patched an IDOR vulnerability so users strictly access only their own financial records.",
        "Powers a companion Flutter mobile app over the exact same versioned REST API.",
      ],
      id: [
        "Melakukan audit keamanan dan menutup celah IDOR agar data transaksi tiap user terisolasi penuh.",
        "Digunakan langsung oleh aplikasi mobile Flutter lewat REST API yang sama.",
      ],
    },
    tags: ["Laravel 12", "Sanctum", "Filament", "MySQL", "REST API"],
  },
  {
    code: "B1",
    title: "TaskFlow Kanban",
    role: "Fullstack Developer · Node.js & React",
    period: "2025",
    color: "#22d3ff",
    accentName: "cyan",
    summary: {
      en: "Trello-style project and task manager built from scratch with JWT auth, bcrypt hashing, Sequelize ORM, and TiDB Cloud MySQL.",
      id: "Aplikasi manajemen proyek ala Trello dari nol dengan autentikasi JWT, hashing bcrypt, Sequelize ORM, dan database cloud MySQL (TiDB).",
    },
    highlights: {
      en: [
        "3-column kanban board, per-project task CRUD, and live progress chart dashboard.",
        "Deployed as a serverless backend communicating over SSL with a cloud SQL cluster.",
      ],
      id: [
        "Kanban board 3 kolom, CRUD tugas per proyek, serta grafik progres real-time.",
        "Deploy backend serverless yang terhubung ke cloud database melalui koneksi SSL.",
      ],
    },
    tags: ["Node.js", "Express", "Sequelize", "React", "JWT"],
  },
  {
    code: "B2",
    title: "AyamKu Mobile",
    role: "Flutter Mobile Engineer · Android",
    period: "2025",
    color: "#3dff8a",
    accentName: "green",
    summary: {
      en: "Built an offline-ready Android poultry management app for my father's chicken farm to replace handwritten paper notebooks.",
      id: "Membangun aplikasi Android manajemen peternakan ayam untuk menggantikan catatan kertas manual milik ayah saya.",
    },
    highlights: {
      en: [
        "Auto-calculates daily feed and water across Starter, Grower, and Finisher growth phases.",
        "Large high-contrast UI tailored for effortless daily use directly inside the farm.",
      ],
      id: [
        "Hitung otomatis kebutuhan pakan dan air harian untuk fase Starter, Grower, dan Finisher.",
        "Antarmuka teks besar ber-kontras tinggi agar mudah dipakai langsung di lapangan.",
      ],
    },
    tags: ["Flutter", "Dart", "Hive", "Provider", "fl_chart"],
  },
  {
    code: "B3",
    title: "Herbal Qaf & Muhayya Fair",
    role: "Next.js Storefront & Client Delivery",
    period: "2025",
    color: "#ffb12b",
    accentName: "lamp",
    summary: {
      en: "Shipped a Next.js + RajaOngkir e-commerce storefront for a family herbal brand and a live event landing page for SD Muhammadiyah Haijah Nurijah.",
      id: "Merilis toko online Next.js + RajaOngkir untuk brand herbal keluarga dan landing page acara sekolah SD Muhammadiyah Haijah Nurijah.",
    },
    highlights: {
      en: [
        "Automated shipping cost lookup via RajaOngkir API and 1-click pre-filled WhatsApp orders.",
        "Delivered the school event landing page on deadline for live attendee usage on Vercel.",
      ],
      id: [
        "Kalkulasi ongkir otomatis via API RajaOngkir dan pesanan WhatsApp siap kirim dalam 1 klik.",
        "Merilis landing page acara sekolah tepat waktu di Vercel untuk dipakai peserta acara.",
      ],
    },
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel", "Bootstrap"],
  },
];

export const FEATURED_PROJECTS: ProjectPoster[] = [
  {
    num: "01",
    title: "Finote Finance API",
    category: "LARAVEL · RAILWAY LIVE",
    year: "2025",
    accentColor: "#b7e600",
    coverSubtitle: "Finote · Laravel 12 & Filament",
    coverHeadline: "Finance API",
    tags: ["Laravel 12", "Sanctum", "Filament", "MySQL"],
    desc: {
      en: "API-first personal finance manager with Filament admin, PDF reports, automated tests, and patched IDOR security.",
      id: "Manajer keuangan API-first dengan panel Filament, laporan PDF, automated test, dan perbaikan keamanan IDOR.",
    },
    screenshot: "/images/finote.png",
    aspect: "landscape",
    tilt: "-rotate-2",
    liveLink: "https://finote-production-eb03.up.railway.app",
    githubLink: "https://github.com/Athallahsy/finote",
  },
  {
    num: "02",
    title: "TaskFlow Workspace",
    category: "FULLSTACK · VERCEL LIVE",
    year: "2025",
    accentColor: "#3dff8a",
    coverSubtitle: "TaskFlow · Express & React",
    coverHeadline: "Kanban SaaS",
    tags: ["Node.js", "Express", "React", "TiDB Cloud"],
    desc: {
      en: "Fullstack Kanban workspace with JWT auth, Sequelize ORM, progress charts, and serverless deployment.",
      id: "Kanban workspace fullstack dengan JWT auth, Sequelize ORM, grafik progres, dan backend serverless.",
    },
    screenshot: "/images/taskflow.png",
    aspect: "landscape",
    tilt: "rotate-1",
    liveLink: "https://taskflow-frontend-atha.vercel.app",
  },
  {
    num: "03",
    title: "AyamKu Farm Tracker",
    category: "FLUTTER · GITHUB",
    year: "2025",
    accentColor: "#e9ff2e",
    coverSubtitle: "AyamKu · Flutter & Hive",
    coverHeadline: "Mobile App",
    tags: ["Flutter", "Dart", "Hive", "fl_chart"],
    desc: {
      en: "Android poultry farm tracker built for my dad - feed calculator, coop logs, and harvest profit charts.",
      id: "Aplikasi Android peternakan ayam untuk ayah - kalkulator pakan, catatan kandang, dan grafik profit panen.",
    },
    screenshot: "/images/ayamku.png",
    aspect: "portrait",
    tilt: "-rotate-1",
    githubLink: "https://github.com/Athallahsy/AyamKu",
  },
  {
    num: "04",
    title: "Herbal Qaf Storefront",
    category: "E-COMMERCE · VERCEL LIVE",
    year: "2025",
    accentColor: "#22d3ff",
    coverSubtitle: "Herbal Qaf · Next.js & RajaOngkir",
    coverHeadline: "Storefront",
    tags: ["Next.js", "Tailwind", "RajaOngkir"],
    desc: {
      en: "Family herbal drink storefront with automated RajaOngkir shipping cost and 1-click WhatsApp checkout.",
      id: "Toko online minuman herbal keluarga dengan cek ongkir RajaOngkir otomatis dan checkout WhatsApp 1 klik.",
    },
    screenshot: "/images/herbal-qaf.png",
    aspect: "landscape",
    tilt: "rotate-2",
    liveLink: "https://herbal-qaf.vercel.app",
  },
  {
    num: "05",
    title: "Muhayya Fair 2025",
    category: "FREELANCE · VERCEL LIVE",
    year: "2025",
    accentColor: "#ff3d8b",
    coverSubtitle: "Muhayya Fair · Event Portal",
    coverHeadline: "Landing Page",
    tags: ["HTML", "Bootstrap", "AOS", "Vercel"],
    desc: {
      en: "Live event landing page for SD Muhammadiyah Haijah Nurijah Banjarmasin, shipped on deadline.",
      id: "Landing page acara resmi SD Muhammadiyah Haijah Nurijah Banjarmasin yang dirilis tepat waktu.",
    },
    screenshot: "/images/muhayya-fair.png",
    aspect: "landscape",
    tilt: "-rotate-2",
    liveLink: "https://muhayya-fair.vercel.app",
  },
  {
    num: "06",
    title: "Florist AI Bot & Audit",
    category: "PRODUCTION · IT STAFF",
    year: "2026",
    accentColor: "#ffb12b",
    coverSubtitle: "JS & Poppy Florist · Production",
    coverHeadline: "AI & Security",
    tags: ["Gemini API", "WhatsApp API", "Laravel", "cPanel"],
    desc: {
      en: "AI WhatsApp ordering bot, 12+ checkout security fixes, Laravel POS maintenance, and 23.1s -> 3.6s LCP optimization.",
      id: "Bot WhatsApp AI pemesanan, 12+ perbaikan keamanan checkout, maintenance POS Laravel, dan optimasi LCP 23,1s -> 3,6s.",
    },
    screenshot: null,
    aspect: "landscape",
    tilt: "rotate-1",
  },
];

export const MARQUEE_STACK = [
  "LARAVEL 12",
  "CODEIGNITER 4",
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "FLUTTER & DART",
  "GEMINI API & VISION",
  "WHATSAPP BUSINESS API",
  "WEBHOOK & HMAC",
  "FILAMENT & SANCTUM",
  "GSAP & THREE.JS",
  "MYSQL & SEQUELIZE",
  "CPANEL & VERCEL",
  "ANTIGRAVITY",
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    code: "01",
    title: "Backend",
    color: "#ff3b24",
    items: [
      "Laravel 12",
      "CodeIgniter 4",
      "PHP",
      "Node.js",
      "Express",
      "Filament",
      "Sanctum",
      "REST API",
      "JWT",
      "Webhook & HMAC",
    ],
  },
  {
    code: "02",
    title: "Frontend",
    color: "#e9ff2e",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Framer Motion",
      "GSAP",
      "Three.js",
    ],
  },
  {
    code: "03",
    title: "Mobile",
    color: "#22d3ff",
    items: ["Flutter", "Dart", "Hive", "Provider", "fl_chart"],
  },
  {
    code: "04",
    title: "Database & Tools",
    color: "#3dff8a",
    items: [
      "MySQL",
      "Sequelize",
      "Git",
      "GitHub",
      "cPanel",
      "Vercel",
      "Bootstrap",
      "WhatsApp Business API",
    ],
  },
  {
    code: "05",
    title: "AI Tools",
    color: "#ff3d8b",
    items: ["Antigravity", "Gemini API", "Gemini Vision"],
  },
];

export const INITIAL_STICKERS: StickerItem[] = [
  {
    id: "st-1",
    label: "Laravel 12 & PHP",
    shape: "rect",
    bg: "#e9ff2e",
    fg: "#0b0d12",
    x: 15,
    y: 20,
    rot: -9,
  },
  {
    id: "st-2",
    label: "CodeIgniter 4 & REST",
    shape: "pill",
    bg: "#22d3ff",
    fg: "#0b0d12",
    x: 32,
    y: 15,
    rot: 6,
  },
  {
    id: "st-3",
    label: "React, Next.js & TS",
    shape: "circle",
    bg: "#ff3d8b",
    fg: "#f4f1ea",
    x: 49,
    y: 24,
    rot: -4,
  },
  {
    id: "st-4",
    label: "Gemini AI & Vision",
    shape: "tag",
    bg: "#f4f1ea",
    fg: "#0b0d12",
    x: 65,
    y: 14,
    rot: 11,
  },
  {
    id: "st-5",
    label: "WhatsApp Business API",
    shape: "rect",
    bg: "#3dff8a",
    fg: "#0b0d12",
    x: 84,
    y: 23,
    rot: -7,
  },
  {
    id: "st-6",
    label: "JWT & Sanctum",
    shape: "pill",
    bg: "#ff3b24",
    fg: "#f4f1ea",
    x: 18,
    y: 47,
    rot: 8,
  },
  {
    id: "st-7",
    label: "Webhook & HMAC",
    shape: "tag",
    bg: "#ffb12b",
    fg: "#0b0d12",
    x: 35,
    y: 42,
    rot: -12,
  },
  {
    id: "st-8",
    label: "Flutter, Dart & Hive",
    shape: "circle",
    bg: "#22d3ff",
    fg: "#0b0d12",
    x: 52,
    y: 50,
    rot: 5,
  },
  {
    id: "st-9",
    label: "Filament & Sequelize",
    shape: "rect",
    bg: "#f4f1ea",
    fg: "#0b0d12",
    x: 69,
    y: 42,
    rot: -6,
  },
  {
    id: "st-10",
    label: "Three.js, GSAP & Motion",
    shape: "pill",
    bg: "#e9ff2e",
    fg: "#0b0d12",
    x: 84,
    y: 50,
    rot: 10,
  },
  {
    id: "st-11",
    label: "Checkout Security",
    shape: "tag",
    bg: "#ff3d8b",
    fg: "#f4f1ea",
    x: 15,
    y: 75,
    rot: -5,
  },
  {
    id: "st-12",
    label: "MySQL & Query Opt",
    shape: "circle",
    bg: "#e9ff2e",
    fg: "#0b0d12",
    x: 32,
    y: 70,
    rot: 9,
  },
  {
    id: "st-13",
    label: "Node.js & Express",
    shape: "rect",
    bg: "#ff3b24",
    fg: "#f4f1ea",
    x: 50,
    y: 78,
    rot: -10,
  },
  {
    id: "st-14",
    label: "Tailwind & Antigravity",
    shape: "pill",
    bg: "#3dff8a",
    fg: "#0b0d12",
    x: 66,
    y: 69,
    rot: 4,
  },
  {
    id: "st-15",
    label: "cPanel, Git & Vercel",
    shape: "tag",
    bg: "#22d3ff",
    fg: "#0b0d12",
    x: 84,
    y: 76,
    rot: -8,
  },
];

export const CRATE_RECORDS: CrateRecord[] = [
  {
    id: "cr-1",
    year: "2026",
    title: "D4 TRPL · Software Engineering (Sem 5)",
    subtitle: "Politeknik IDN Bogor",
    color: "#e9ff2e",
    textColor: "#0b0d12",
    labelCode: "IDN-05",
    desc: {
      en: "Applied Bachelor in Software Engineering (D4 Teknologi Rekayasa Perangkat Lunak) currently in semester 5, combining backend system design, security auditing, and real-world product delivery.",
      id: "Sarjana Terapan Teknologi Rekayasa Perangkat Lunak (D4 TRPL) semester 5, memadukan perancangan sistem backend, audit keamanan, dan rilis produk nyata.",
    },
    highlights: {
      en: [
        "Fullstack web & mobile engineering tracks",
        "Production deployments alongside academic study",
      ],
      id: [
        "Fokus rekayasa web fullstack & aplikasi mobile",
        "Merilis proyek produksi nyata di samping studi kuliah",
      ],
    },
  },
  {
    id: "cr-2",
    year: "2026",
    title: "Production E-Commerce, POS & Hosting Ops",
    subtitle: "JS & Poppy Florist · Banjarbaru",
    color: "#ff3d8b",
    textColor: "#0b0d12",
    labelCode: "EXP-01",
    desc: {
      en: "IT Staff / Support since Sep 2026: shipped an AI WhatsApp ordering bot, fixed 12+ checkout security findings with server-side validation, maintained Laravel POS, and cut LCP from 23.1s to 3.6s.",
      id: "IT Staff / Support sejak Sep 2026: merilis bot WhatsApp AI order, menutup 12+ bug keamanan checkout dengan validasi server-side, maintenance POS Laravel, dan memangkas LCP 23,1s ke 3,6s.",
    },
    highlights: {
      en: [
        "Server-side price validation & duplicate transaction ID fixes",
        "WebP conversion, bulk resizing, caching & cPanel management",
      ],
      id: [
        "Validasi harga server-side & perbaikan duplicate transaction ID POS",
        "Konversi WebP, bulk resizing, caching, dan kelola cPanel",
      ],
    },
  },
  {
    id: "cr-3",
    year: "2026",
    title: "AI Automation & WhatsApp Business API",
    subtitle: "Gemini API · Vision · HMAC",
    color: "#22d3ff",
    textColor: "#0b0d12",
    labelCode: "AI-02",
    desc: {
      en: "Building conversational customer service and order-taking agents using Gemini API, Gemini Vision, Antigravity workflows, and HMAC-verified Meta webhooks on live business numbers.",
      id: "Membangun agen customer service dan pemesanan otomatis memakai Gemini API, Gemini Vision, workflow Antigravity, serta webhook Meta terverifikasi HMAC di nomor resmi toko.",
    },
    highlights: {
      en: [
        "Tested live on official store WhatsApp number",
        "Secure webhook signature validation via HMAC",
      ],
      id: [
        "Teruji langsung di nomor WhatsApp resmi toko",
        "Validasi signature webhook aman dengan HMAC",
      ],
    },
  },
  {
    id: "cr-4",
    year: "2025",
    title: "PHP Backend Engineering & Auth Security",
    subtitle: "Laravel 12 · CodeIgniter 4 · Filament",
    color: "#ff3b24",
    textColor: "#f4f1ea",
    badgeColor: "#ff3b24",
    labelCode: "PHP-12",
    desc: {
      en: "Architecting multi-role REST APIs and admin dashboards with Laravel 12, CodeIgniter 4, Filament, Sanctum, JWT, and MySQL — hardening IDOR and transaction race conditions.",
      id: "Merancang REST API multi-role dan dashboard admin menggunakan Laravel 12, CodeIgniter 4, Filament, Sanctum, JWT, dan MySQL dengan mitigasi IDOR dan race condition.",
    },
    highlights: {
      en: [
        "Patched IDOR & server-side checkout integrity bugs",
        "POS cashier role management & automated PDF reports",
      ],
      id: [
        "Menutup bug IDOR & validasi integritas checkout server-side",
        "Manajemen akun kasir POS & pelaporan PDF otomatis",
      ],
    },
  },
  {
    id: "cr-5",
    year: "2025",
    title: "Interactive Frontend & Motion Architecture",
    subtitle: "React · Next.js · GSAP · Three.js",
    color: "#f4f1ea",
    textColor: "#ff3b24",
    badgeColor: "#ffb12b",
    labelCode: "FE-16",
    desc: {
      en: "Crafting fast, expressive web interfaces with React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP scroll choreography, and 3D Three.js visuals deployed on Vercel.",
      id: "Membangun antarmuka web ekspresif dan ringan dengan React, Next.js, TypeScript, Tailwind CSS, Framer Motion, koreografi scroll GSAP, dan Three.js di Vercel.",
    },
    highlights: {
      en: [
        "Core Web Vitals tuning & asset optimization",
        "Accessible responsive interfaces deployed on Vercel",
      ],
      id: [
        "Optimasi Core Web Vitals & kompresi aset",
        "Antarmuka responsif yang di-deploy di Vercel",
      ],
    },
  },
  {
    id: "cr-6",
    year: "2025",
    title: "Cross-Platform Android & Offline Storage",
    subtitle: "Flutter · Dart · Hive · Provider",
    color: "#3dff8a",
    textColor: "#0b0d12",
    labelCode: "FLT-04",
    desc: {
      en: "Shipping utility Android apps like AyamKu with Flutter, Dart, Hive local persistence, Provider state management, and fl_chart financial analytics for real daily field operations.",
      id: "Merilis aplikasi Android fungsional seperti AyamKu dengan Flutter, Dart, penyimpanan offline Hive, Provider, serta grafik profit fl_chart untuk kebutuhan lapangan sehari-hari.",
    },
    highlights: {
      en: [
        "Offline-first local persistence via Hive",
        "Weekly profit/loss visualization via fl_chart",
      ],
      id: [
        "Penyimpanan lokal offline-first dengan Hive",
        "Visualisasi rugi/laba mingguan via fl_chart",
      ],
    },
  },
  {
    id: "cr-7",
    year: "CORE",
    title: "Hafiz of the Quran · 30 Juz Memorization",
    subtitle: "Focus · Daily Consistency",
    color: "#ffb12b",
    textColor: "#0b0d12",
    labelCode: "HFZ-30",
    desc: {
      en: "Completed memorizing all 30 Juz of the Quran — instilling calm patience under pressure, structured revision discipline, and deep endurance before writing my first line of code.",
      id: "Menyelesaikan hafalan 30 Juz Al-Quran — menanamkan ketenangan menghadapi masalah teknis, disiplin murajaah terstruktur, dan ketekunan jangka panjang sebelum mengenal coding.",
    },
    highlights: {
      en: [
        "Daily discipline & long-term memory habits",
        "Calm persistence when debugging production issues",
      ],
      id: [
        "Disiplin harian & kebiasaan menjaga konsistensi",
        "Ketenangan saat menangani debugging sistem produksi",
      ],
    },
  },
  {
    id: "cr-8",
    year: "NEXT",
    title: "Open to Fullstack Roles & Internships",
    subtitle: "Banjarbaru -> Bandung / Remote",
    color: "#1e2a6e",
    textColor: "#e9ff2e",
    badgeColor: "#22d3ff",
    labelCode: "BND-26",
    desc: {
      en: "Currently based in Banjarbaru, Indonesia and ready to relocate to Bandung (or join remote teams) for fullstack engineering internships, junior dev positions, and collaborative product builds.",
      id: "Berdomisili di Banjarbaru, Indonesia dan siap pindah ke Bandung (atau bekerja remote) untuk magang fullstack, junior developer, maupun kolaborasi tim produk.",
    },
    highlights: {
      en: [
        "Available for on-site in Bandung or remote",
        "Proven experience shipping & securing live systems",
      ],
      id: [
        "Siap on-site di Bandung maupun remote",
        "Berpengalaman langsung merilis & mengamankan sistem produksi",
      ],
    },
  },
];

export const SINGLE_ARTICLES: SingleArticle[] = [
  {
    id: "art-1",
    side: "Side A · 1",
    dateLabel: "SEP 2026",
    title: "Cutting Florist LCP from 23.1s to 3.6s & Fixing 12+ Checkout Bugs",
    minutes: 4,
    color: "#ff3d8b",
    ink: "#0b0d12",
    coverImage: "/images/herbal-qaf.png",
    coverPosition: "75% center",
    tags: ["performance", "checkout-security", "cpanel"],
    excerpt: {
      en: "How bulk WebP conversion, image resizing, caching, and server-side price validation transformed a live florist e-commerce site.",
      id: "Bagaimana konversi WebP massal, resize gambar, caching, dan validasi harga server-side mengubah performa & keamanan toko bunga produksi.",
    },
    body: {
      en: [
        "When I joined JS Florist & Poppy Florist as IT Staff / Support, the live e-commerce homepage took 23.1 seconds to reach Largest Contentful Paint due to oversized uncompressed product photos.",
        "Through automated bulk resizing, WebP conversion, and caching configuration on cPanel, homepage LCP dropped from 23.1s down to 3.6s.",
        "Alongside speed, I audited the entire checkout flow and resolved 12+ security findings — most critically enforcing server-side price validation so tampered client payloads could never alter order totals.",
        "On the in-store Laravel POS built by a previous developer, I also diagnosed and fixed duplicate transaction ID checkout errors and added multi-cashier account support.",
      ],
      id: [
        "Saat bergabung di JS Florist & Poppy Florist sebagai IT Staff / Support, homepage e-commerce yang berjalan sempat membutuhkan 23,1 detik untuk mencapai Largest Contentful Paint karena foto produk raksasa tanpa kompresi.",
        "Melalui bulk resizing, konversi WebP, dan konfigurasi caching di cPanel, LCP homepage turun drastis dari 23,1 detik menjadi 3,6 detik.",
        "Selain kecepatan, saya mengaudit alur checkout dan menutup 12+ temuan keamanan — terutama memastikan validasi harga berjalan di server-side agar payload dari sisi klien tidak bisa memanipulasi total belanja.",
        "Di sistem POS Laravel buatan developer sebelumnya, saya juga memperbaiki error checkout akibat duplicate transaction ID dan menambahkan fitur akun kasir.",
      ],
    },
    link: "https://github.com/Athallahsy",
  },
  {
    id: "art-2",
    side: "Side A · 2",
    dateLabel: "AUG 2025",
    title: "How I Found & Patched an IDOR Bug in My Own Laravel API",
    minutes: 4,
    color: "#e9ff2e",
    ink: "#0b0d12",
    coverImage: "/images/taskflow.png",
    coverPosition: "center top",
    tags: ["laravel-12", "sanctum", "idor-fix"],
    excerpt: {
      en: "Changing a numeric ID in a URL let User A view User B's transactions. Here is how Policies and feature tests locked it down permanently.",
      id: "Mengganti angka ID di URL sempat membuat User A bisa mengintip transaksi User B. Ini cara saya menutupnya permanen dengan Laravel Policy & test.",
    },
    body: {
      en: [
        "While building Finote's REST API with Laravel Sanctum, every authenticated request passed token checks, yet an endpoint like GET /api/transactions/42 only checked if a user was logged in, not if they owned record #42.",
        "During a self-audit, swapping the ID exposed another account's financial category and amount. Classic Insecure Direct Object Reference (IDOR).",
        "The fix had two layers: scoping Eloquent queries directly through `$request->user()->transactions()` AND enforcing Laravel Policies (`$this->authorize('view', $transaction)`) on every show, update, and delete action.",
        "Finally, I added automated feature tests asserting 403/404 responses whenever User B probes User A's IDs so the regression can never ship again.",
      ],
      id: [
        "Saat membangun REST API Finote dengan Laravel Sanctum, semua endpoint memang sudah mewajibkan token login. Namun, endpoint seperti GET /api/transactions/42 awalnya hanya mengecek apakah user sudah login, bukan apakah data #42 itu milik mereka.",
        "Saat melakukan audit mandiri, mengganti angka ID di URL ternyata menampilkan transaksi akun lain — celah klasik Insecure Direct Object Reference (IDOR).",
        "Perbaikannya dilakukan di dua lapis: membatasi query Eloquent melalui relasi `$request->user()->transactions()` DAN menerapkan Laravel Policy (`$this->authorize('view', $transaction)`) di setiap aksi detail, ubah, dan hapus.",
        "Terakhir, saya menambahkan automated feature test yang memverifikasi status 403/404 setiap kali User B mencoba mengakses ID milik User A agar bug ini tidak pernah kembali.",
      ],
    },
    link: "https://github.com/Athallahsy/finote",
  },
  {
    id: "art-3",
    side: "Side A · 3",
    dateLabel: "JUL 2025",
    title: "Designing AyamKu for My Dad (Not for Designers)",
    minutes: 3,
    color: "#22d3ff",
    ink: "#0b0d12",
    coverImage: "/images/ayamku.png",
    coverPosition: "center 30%",
    tags: ["flutter", "hive-offline", "field-ux"],
    excerpt: {
      en: "Why large buttons, zero jargon, and offline Hive storage mattered way more than trendy gradients when building an Android app for a real chicken farm.",
      id: "Mengapa tombol besar, bahasa sederhana, dan penyimpanan offline Hive jauh lebih penting daripada efek gradasi saat membuat aplikasi untuk kandang ayam.",
    },
    body: {
      en: [
        "My father used to track daily chicken feed, mortality, and weekly expenses in handwritten paper notebooks. Most farm apps fail because they feel like cramped Excel spreadsheets on a 6-inch screen.",
        "I built AyamKu in Flutter with one constraint: he must be able to log feed in under 10 seconds while standing inside the coop with dusty hands and bright sunlight.",
        "We stripped out tiny icons, increased font contrast and tap targets, stored everything offline in Hive so weak rural signal never blocks an entry, and automated Starter/Grower/Finisher feed ratios.",
        "Lesson learned: software gets used when it respects the user's real physical environment.",
      ],
      id: [
        "Ayah saya dulu mencatat pakan harian, kematian ayam, dan pengeluaran mingguan di buku tulis. Banyak aplikasi ternak gagal dipakai karena tampilannya seperti spreadsheet sempit di layar HP.",
        "Saya merancang AyamKu di Flutter dengan satu syarat utama: ayah harus bisa mencatat pakan kurang dari 10 detik sambil berdiri di area kandang dengan pencahayaan terik.",
        "Semua ikon kecil dibuang, ukuran font dan tombol diperbesar dengan kontras tinggi, data disimpan lokal secara offline memakai Hive agar tidak tergantung sinyal, dan rasio pakan Starter/Grower/Finisher dihitung otomatis.",
        "Pelajarannya sederhana: software benar-benar terpakai saat ia menghormati kondisi nyata penggunanya.",
      ],
    },
    link: "https://github.com/Athallahsy/AyamKu",
  },
];
