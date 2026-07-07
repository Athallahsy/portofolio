# PRD — Portfolio Website Fullstack Developer (Next.js)

**Project owner:** Athallah Muhammad Syaffa
**Dibuat untuk:** AI coding agent (build dari nol jadi project Next.js production-ready)
**Dokumen referensi yang dilampirkan:** `portfolio-prototype.html` (prototype visual yang SUDAH JADI dan berfungsi penuh di browser — buka file ini dulu sebelum mulai coding, karena ini adalah **source of truth** untuk layout, copy, warna, font, timing animasi, dan perilaku 3D. Tugas utama project ini adalah **port / migrasi 1:1** prototype tersebut ke Next.js, lalu menambahkan fitur baru di Section 7).

---

## 1. Ringkasan Project

Website portofolio pribadi untuk mahasiswa IT yang sedang mencari kerja/internship sebagai Fullstack Developer. Gaya visual: **minimalis terang, elegan, premium** — bukan template generik. Dipenuhi animasi scroll (GSAP) dan elemen 3D (Three.js) sebagai pembeda dari portofolio developer kebanyakan.

**Definisi/istilah yang dipakai di dokumen ini:**
- **GSAP** — library animasi JavaScript, dipakai untuk animasi scroll dan entrance.
- **ScrollTrigger** — modul GSAP yang memicu animasi berdasarkan posisi scroll.
- **Three.js** — library untuk render grafis 3D di browser (pakai WebGL).
- **R3F (React Three Fiber)** — cara menulis scene Three.js sebagai komponen React.
- **Lenis** — library smooth scroll (bikin scroll halaman jadi halus, bukan patah-patah).
- **Rapier** — physics engine (mesin simulasi fisika: gravitasi, tabrakan, tali berayun).

---

## 2. Tech Stack (Wajib)

| Layer | Pilihan |
|---|---|
| Framework | **Next.js 14+ App Router** |
| Bahasa | TypeScript (disarankan; JS juga boleh kalau lebih cepat) |
| Styling | CSS Modules atau Tailwind CSS — bebas pilih, **tapi token desain di Section 4 harus persis sama** |
| Animasi scroll | **GSAP 3** + `ScrollTrigger` + `ScrollToPlugin` |
| Smooth scroll | **Lenis**, diintegrasikan dengan GSAP ticker (ikuti panduan resmi Lenis + GSAP, bukan default Lenis biasa) |
| 3D umum (hero/about/contact accent) | **Three.js** — boleh vanilla (lewat `useRef` + `useEffect`) atau di-migrasi ke **React Three Fiber** supaya konsisten dengan Lanyard (lihat Section 7) |
| 3D Lanyard | `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`, `three` |
| Font | `Fraunces` (display/serif) + `Plus Jakarta Sans` (body) — load lewat `next/font/google` |
| Deployment | Vercel |

---

## 3. Konten & Copy (Source of Truth)

> Semua teks di bawah ini WAJIB dipakai persis — jangan diparafrase ulang oleh AI.

**Nama:** Athallah Muhammad Syaffa
**Role:** Fullstack Developer (Laravel & React), in progress
**Status badge:** "Open to Work" (dot hijau berkedip)

**Bio singkat (hero):**
> Building end-to-end web applications — from backend logic with Laravel to modern, responsive interfaces with React. On a mission to master the full stack.

**About — quote:**
> "Code with passion, debug with patience."

**About — body (4 paragraf, urutan tetap):**
1. Fullstack Developer in progress, kuliah IT, membangun skill lewat project nyata.
2. Suka tantangan dari database schema sampai UI yang polished.
3. Sedang memperdalam Node.js, TypeScript, Next.js.
4. Hobi: strategy games, baca tech blog, kopi wajib ☕.

**Skills (3 grup):**
- **Frontend:** HTML5, CSS3, JavaScript, React, TailwindCSS, Bootstrap
- **Backend & Database:** PHP, Laravel, MySQL, REST API, MVC, Eloquent ORM
- **Tools & Currently Learning:** Git, GitHub, VSCode, Postman | *(learning, style beda — dashed border)*: Node.js, TypeScript, Next.js

**Projects (3, urutan tetap):**
1. **Finote** — Personal finance management app. Laravel 11 + MySQL + Bootstrap. Fitur: transaction tracking, category management, monthly reports, budget planning. Link: `https://github.com/athallahsy/finote`
2. **Inkwell** — Full-stack blog CMS. Laravel 11 + MySQL + TailwindCSS. Fitur: role-based access control, article & category management, file manager, view counter. Link: `https://github.com/athallahsy/inkwell`
3. **Portfolio** — React.js + TailwindCSS, live di `athallahsy.vercel.app`. Link: `https://github.com/athallahsy/portfolio`

**Kontak:**
- Email: `athallahmsyaffa@gmail.com`
- GitHub: `https://github.com/athallahsy`
- LinkedIn: `https://linkedin.com/in/athallahsy`

**Aset gambar:** foto profil dilampirkan terpisah (`profile.jpg`) — taruh di `/public/images/profile.jpg`.

---

## 4. Design Tokens

```css
--bg:           #F3F2EE;  /* background utama, warm off-white */
--bg-card:      #FFFFFF;
--text:         #131311;
--text-muted:   #8C8B87;
--accent:       #1E4A34;  /* deep forest green — warna utama brand */
--accent-mid:   #2E7A55;
--accent-light: #BED8C8;
--gold:         #B8924E;  /* aksen sekunder */
--border:       #E0DED9;
```

**Font:**
- Display/judul: `Fraunces` (variable font, italic untuk aksen) — opsz 144 untuk judul besar, opsz 72 untuk judul section
- Body: `Plus Jakarta Sans`, weight 300–600

**Breakpoint responsive:** 900px (di bawah ini, layout jadi 1 kolom / stack)

---

## 5. Struktur Halaman (Section by Section)

1. **Nav** — sticky, transparan di top, jadi frosted-glass (`backdrop-filter: blur`) setelah scroll >60px. Link: About, Skills, Projects, Contact. Smooth scroll ke section pakai GSAP `ScrollToPlugin`.
2. **Hero** — full viewport height. Nama dengan animasi clip-reveal (teks slide naik dari bawah saat load), bio, 2 CTA button, foto profil dengan frame dekoratif + badge "Open to Work", background 3D crystal cluster (lihat Section 6), scroll-hint indicator di pojok bawah kiri.
3. **About** — background gelap (`--text`), quote besar di kiri, 4 paragraf bio di kanan, accent 3D kecil melayang di background (Section 6).
4. **Skills** — grid 3 kolom, masing-masing grup skill punya title + chip-chip skill yang muncul stagger (satu-satu dengan jeda) saat di-scroll.
5. **Projects** — list vertikal, tiap row: nomor urut, judul besar (font Fraunces), deskripsi, tag teknologi, panah ke link. Hover → background invert jadi gelap (kontras dramatis).
6. **Contact** — background hijau (`--accent`), judul besar "Let's Build Something.", tombol email, social links, accent 3D dodecahedron di background (Section 6).
7. **Footer** — nama + motto kecil, background hijau sangat gelap.

**Animasi entrance & scroll** (pola konsisten di semua section, ikuti prototype persis):
- Tiap section punya "eyebrow" (label kecil uppercase + garis pendek) yang slide-in saat section masuk viewport (`start: 'top 83%'`)
- Judul section pakai clip-reveal per baris (stagger ~0.07s)
- Konten section fade + slide dari samping/bawah

---

## 6. Spesifikasi 3D — Accent Shapes (Hero / About / Contact)

> Detail lengkap & kode referensi: lihat `<script type="module">` di prototype HTML yang dilampirkan. Berikut ringkasannya:

**Hero** (paling kompleks):
- Torus Knot (simpul 3D) sebagai centerpiece, wireframe hijau, rotasi multi-sumbu kontinu
- Orb kecil di pusat dengan animasi "berdenyut" (scale pulsing pakai sin wave) + halo glow (additive blending)
- 3 ring orbital dengan radius & kecepatan rotasi berbeda
- Outer icosahedron shell, opacity sangat rendah, counter-rotation
- Particle cloud (~280 titik) tersebar bentuk bola, dengan garis penghubung antar partikel terdekat (efek "neural network")
- Mouse parallax (objek mengikuti pergerakan mouse dengan smoothing/lerp)
- Scroll-driven: saat hero discroll keluar, grup 3D mundur ke belakang (position.z) dan canvas memudar (opacity → 0)

**About:**
- 2 shape kecil (icosahedron + octahedron) pakai teknik **edge-line** (`EdgesGeometry` + `LineSegments`, BUKAN `wireframe: true` biasa — supaya hasilnya garis tepi bersih, bukan garis silang yang rame)
- Posisi pojok kiri-atas, melayang naik-turun pelan (sin wave di posisi Y)
- Entrance: scale dari 0 → 1 dipicu `ScrollTrigger` saat section masuk viewport

**Contact:**
- Dodecahedron putih (edge-line) + shell icosahedron tipis + 1 ring tipis
- Posisi kanan-bawah, di belakang kolom social links
- Entrance sama seperti About (scale 0→1 saat masuk viewport)

**Catatan performa:** semua shape pakai `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`, particle pakai `depthWrite: false`, dan render loop pakai `requestAnimationFrame` murni (bukan setInterval).

---

## 7. FITUR BARU — Lanyard ID Card (3D Interaktif)

Ini fitur tambahan yang BELUM ada di prototype HTML. Tujuannya: kartu ID 3D yang tergantung dan bisa di-drag, fisikanya nyata (tali ikut gravitasi & ayunan), menampilkan foto + identitas Athallah — elemen "wow" tambahan yang menunjukkan kemampuan teknis di bidang 3D web development.

### 7.1 Sumber Komponen
Pakai komponen **Lanyard** dari React Bits: `https://reactbits.dev/components/lanyard`
Repo asli: `https://github.com/DavidHDev/react-bits` (folder `src/assets/lanyard` & `src/content/Components/Lanyard`)

Install via CLI resmi (pilih salah satu sesuai yang didukung project):
```bash
npx jsrepo add https://reactbits.dev/default/Components/Lanyard
# atau
npx shadcn@latest add "https://reactbits.dev/r/Lanyard"
```
⚠️ **Known issue:** instalasi via `jsrepo` pernah menghasilkan file `.glb`/`.png` korup (lihat GitHub issue #130 di repo tersebut). **Aset asli yang sudah diverifikasi tidak korup dilampirkan terpisah** di paket ini (`card.glb`, `lanyard.png`) — pakai file lampiran ini, jangan andalkan hasil auto-install kalau filenya rusak.

### 7.2 Dependency Tambahan
```bash
npm install @react-three/fiber @react-three/drei @react-three/rapier meshline three
```

### 7.3 Penempatan Aset (PENTING — beda dari instruksi default!)
Instruksi resmi komponen ini ditulis untuk project **Vite** (pakai `import cardGLB from '...card.glb'` + config `assetsInclude: ['**/*.glb']` di `vite.config.js`). **Project kita pakai Next.js, BUKAN Vite — jangan ikuti instruksi `vite.config.js`.**

Sebagai gantinya:
1. Taruh `card.glb` di `/public/models/card.glb`
2. Taruh `lanyard.png` (default band texture) di `/public/textures/lanyard.png`
3. Load via path string (bukan `import`), contoh: `useGLTF('/models/card.glb')` dari `@react-three/drei`
4. Sesuaikan baris import di source komponen Lanyard yang awalnya `import cardGLB from '../assets/lanyard/card.glb'` menjadi langsung string path `/models/card.glb`

### 7.4 Komponen Wajib `"use client"`
Next.js App Router default-nya Server Component. Karena Lanyard pakai `<Canvas>`, browser API, dan WebGL, file komponennya **wajib** diberi directive:
```tsx
"use client";
```
di baris paling atas file.

### 7.5 Props yang Dipakai

| Prop | Nilai |
|---|---|
| `frontImage` | `/images/profile.jpg` (foto Athallah yang sudah ada) |
| `backImage` | opsional — bisa desain "kartu nama digital" sederhana (nama + role + QR/ikon kontak), atau biarkan default kalau belum ada asetnya |
| `imageFit` | `"cover"` |
| `lanyardImage` | opsional — kalau mau custom warna band sesuai brand (`--accent` hijau atau `--gold`), bikin texture band baru. Kalau tidak, pakai default dari `lanyard.png` yang dilampirkan |
| `lanyardWidth` | default, naikkan hanya kalau pakai `lanyardImage` custom yang butuh ruang lebih lebar |
| `position` | sesuaikan dengan section penempatan (lihat 7.6), contoh awal `[0, 0, 20]` |
| `gravity` | `[0, -40, 0]` (default, realistis) |

### 7.6 Penempatan di Layout
Rekomendasi: section baru kecil **setelah Hero, sebelum About** — area "fun interactive" dengan judul kecil seperti "Drag me around" supaya user paham itu interaktif. Boleh juga diletakkan sebagai elemen mengambang di pojok Hero kalau tidak mengganggu keterbacaan teks utama. **Yang tidak boleh:** menutupi/menabrak teks nama atau CTA button di hero.

### 7.7 Performa (Wajib Diperhatikan)
`@react-three/rapier` memuat physics engine berbasis **WASM** (WebAssembly) yang ukurannya cukup besar (ratusan KB). Supaya tidak memperlambat load awal halaman:
- Load komponen Lanyard pakai `next/dynamic` dengan `{ ssr: false }`
- Tampilkan loading placeholder sederhana selagi komponen dimuat
- Di layar mobile (<768px), pertimbangkan untuk **menonaktifkan physics drag** (cukup tampilkan kartu statis/auto-swing ringan) supaya tidak membebani device low-end

---

## 8. Non-Functional Requirements

- **Performance:** Lighthouse Performance score desktop ≥ 80. LCP (Largest Contentful Paint — waktu render konten utama) < 2.5 detik.
- **Images:** pakai `next/image` untuk semua gambar (auto-optimize).
- **SEO:** meta title, description, dan Open Graph tags terisi sesuai identitas (nama, role, deskripsi singkat).
- **Aksesibilitas:** semua `<img>` punya `alt` text, heading pakai urutan semantik (`h1` → `h2` → `h3`), elemen interaktif (button/link) punya focus state yang terlihat.
- **Responsive:** wajib dites di lebar < 768px (mobile) dan 768–900px (tablet) — semua section harus tetap rapi, tidak ada elemen kepotong/overflow.
- **Cross-browser:** dites minimal di Chrome dan Safari (banyak HR/recruiter pakai Mac/Safari).

---

## 9. Struktur Folder yang Disarankan

```
/app
  layout.tsx
  page.tsx
  globals.css
/components
  Nav.tsx
  Hero.tsx
  HeroScene.tsx        ← Three.js canvas hero
  About.tsx
  AboutScene.tsx
  Skills.tsx
  Projects.tsx
  Contact.tsx
  ContactScene.tsx
  Lanyard.tsx           ← "use client", dynamic import
  Footer.tsx
/public
  /images/profile.jpg
  /models/card.glb
  /textures/lanyard.png
/lib
  lenis.ts              ← setup Lenis + GSAP ticker
```

---

## 10. Aset yang Dilampirkan ke Paket Ini

1. `portfolio-prototype.html` — prototype lengkap yang sudah jalan, jadi acuan visual & animasi
2. `profile.jpg` — foto profil Athallah
3. `card.glb` — model 3D kartu untuk Lanyard (diverifikasi tidak korup)
4. `lanyard.png` — texture default band lanyard (diverifikasi tidak korup)

---

## 11. Acceptance Criteria

- [ ] Semua section (Nav, Hero, About, Skills, Projects, Contact, Footer) ter-port sesuai prototype — layout, copy, warna, font sama persis
- [ ] Animasi scroll (GSAP ScrollTrigger) jalan sama seperti prototype: eyebrow reveal, title clip-reveal, stagger pada chips/cards
- [ ] Smooth scroll (Lenis) aktif di seluruh halaman, terintegrasi dengan GSAP ticker (bukan scroll native browser)
- [ ] 3D accent di Hero/About/Contact tampil dan beranimasi sesuai Section 6
- [ ] Lanyard card baru: tampil, foto Athallah muncul di kartu, bisa di-drag dengan mouse, tali berayun dengan fisika realistis
- [ ] Lanyard tidak memperlambat First Contentful Paint halaman (dimuat secara lazy/dynamic)
- [ ] Responsive penuh di mobile (<768px) tanpa elemen rusak
- [ ] Tidak ada console error di browser
- [ ] Berhasil di-deploy ke Vercel dengan URL yang bisa diakses publik

---

## 12. Hal yang TIDAK Perlu Dikerjakan (Out of Scope)

- Tidak perlu CMS atau backend dinamis — semua konten statis (hardcoded di komponen)
- Tidak perlu sistem auth/login
- Tidak perlu dark mode toggle (desain sudah fix minimalis terang)
- Tidak perlu multi-bahasa (cukup Bahasa Inggris, sesuai copy di Section 3)
