# TASK — Revisi Hero Section & Layout Lanyard

**Konteks:** Lanjutan dari `PRD-portfolio-nextjs.md`. Task ini MENGUBAH spesifikasi di PRD Section 5 (Hero) dan Section 6 (3D Hero), serta Section 7.6 (penempatan Lanyard). Anggap task ini sebagai **override** terhadap bagian-bagian tersebut — bagian PRD lain (About, Skills, Projects, Contact, Footer, design tokens) TETAP BERLAKU tanpa perubahan.

---

## 1. Perubahan Hero Section

### 1.1 Hapus HeroScene 3D
- **Hapus total** komponen `HeroScene.tsx` (torus knot, particle cloud, orbital rings, outer ico shell, mouse parallax — semua yang dijelaskan di PRD Section 6 bagian "Hero") beserta `<canvas id="hero-canvas">` dan logic Three.js terkait di hero.
- Jangan dipindah ke section lain — AboutScene dan ContactScene (2 shape edge-line kecil + dodecahedron) **tetap dipakai seperti PRD asli**, tidak terdampak oleh perubahan ini.

### 1.2 Ganti dengan komponen `TiltedCard`
Pakai komponen `TiltedCard` dari React Bits (source code lengkap — JS + CSS — sudah disiapkan, lihat lampiran di bawah).

**Dependency baru:** `motion` (package `motion/react`)
```bash
npm install motion
```

**Foto yang dipakai:** BUKAN `profile.jpg` yang sudah ada. User akan menyediakan foto baru terpisah — taruh placeholder path `/public/images/hero-tilted.jpg` dulu, dan beri komentar di kode `// TODO: ganti dengan foto final dari user` di baris `imageSrc`.

**Overlay content:** Tampilkan teks overlay singkat di atas foto (gunakan prop `displayOverlayContent={true}` + `overlayContent`). Isi overlay:
- Nama singkat atau role, contoh: `"Athallah M. Syaffa"` atau `"Fullstack Developer"` — styling overlay disesuaikan dengan design token project (font Fraunces, warna `--bg-card` di atas overlay gelap transparan, atau sesuaikan agar kontras & matching dengan estetika minimalis-premium yang sudah ada). **Jangan pakai styling default demo React Bits** (`tilted-card-demo-text`) — restyle agar konsisten dengan tema hijau/krem project.

**Props yang disarankan sebagai starting point:**
```jsx
<TiltedCard
  imageSrc="/images/hero-tilted.jpg"
  altText="Athallah Muhammad Syaffa"
  captionText="Athallah Muhammad Syaffa"
  containerHeight="420px"
  containerWidth="100%"
  imageHeight="420px"
  imageWidth="380px"
  rotateAmplitude={10}
  scaleOnHover={1.05}
  showMobileWarning={false}
  showTooltip={false}
  displayOverlayContent={true}
  overlayContent={<HeroTiltedOverlay />}
/>
```
> Catatan: `showMobileWarning={false}` dan `showTooltip={false}` karena project ini sudah punya badge "Open to Work" sendiri — jangan duplikasi UI. Sesuaikan ukuran container responsif (lihat 1.4).

### 1.3 Layout baru Hero: Foto KIRI, Teks KANAN
Prototype asli `portfolio-prototype.html` punya struktur:
```
.hero-inner { teks (hero-left) lalu foto (hero-right) }
```
**UBAH menjadi:**
```
.hero-inner { foto (TiltedCard, kiri) lalu teks (kanan) }
```
Detail:
- Kolom kiri: `TiltedCard` (gantikan posisi `.hero-photo-wrap` lama)
- Kolom kanan: eyebrow, nama (clip-reveal animation TETAP DIPAKAI — itu animasi GSAP teks, tidak terkait 3D), bio, 2 CTA button
- Badge "Open to Work" tetap ada — sekarang jadi elemen terpisah dekat foto (bisa absolute-positioned di pojok TiltedCard, mirip posisi aslinya di `.photo-frame`), bukan bagian dari komponen TiltedCard itu sendiri.
- `photo-deco` (dekorasi frame lama) boleh dihapus karena TiltedCard sudah punya treatment visual sendiri (border-radius 15px dari CSS aslinya) — sesuaikan border-radius/shadow agar konsisten dengan `--border` dan style card lain di project kalau perlu.

### 1.4 Responsive
- Di breakpoint <900px (sesuai PRD), tetap stack 1 kolom. **Urutan stack: foto dulu (atas), teks di bawah** — konsisten dengan posisi foto-kiri/teks-kanan di desktop (foto tetap "lebih dulu" secara visual/DOM order).
- TiltedCard sudah punya CSS bawaan yang menyembunyikan `mobile-alert` & `caption` di ≤640px — pastikan tidak konflik dengan breakpoint 900px milik project. Set `containerWidth`/`containerHeight` dengan unit relatif atau override CSS agar foto tidak overflow di mobile.

---

## 2. Section Lanyard — Layout Final

Sesuai PRD Section 7.6 (section baru "Drag me around" setelah Hero, sebelum About), tentukan layout pasti:

**Lanyard di KANAN, teks di KIRI.**

Detail:
- Kolom kiri: judul kecil section (misal "Drag me around" / "Just for fun"), 1-2 baris deskripsi singkat (boleh tulis copy baru yang santai, sesuai nada "fun interactive" dari PRD — TIDAK ada copy resmi untuk ini di PRD original, jadi bebas tulis pendek & natural, contoh: *"A little 3D experiment — go ahead, give it a drag."*)
- Kolom kanan: komponen `Lanyard` (React Three Fiber + Rapier), area cukup luas untuk physics drag tidak terpotong.
- Section ini TIDAK menggunakan design token gelap (`--text`) seperti About — pakai background `--bg` standar (terang) supaya beda dari About yang gelap, kecuali user lain bilang.
- Tetap ikuti aturan performa PRD 7.7: `next/dynamic({ ssr: false })`, loading placeholder, disable physics drag di <768px (statis/auto-swing ringan saja di mobile, dan kalau di mobile, layout boleh stack: teks di atas, Lanyard di bawah).

---

## 3. Lampiran — Source Component TiltedCard

Simpan sebagai `/components/TiltedCard.tsx` (convert ke TypeScript minimal — boleh pakai `any`/loose typing kalau cepat) + `/components/TiltedCard.css`.

### TiltedCard.jsx (source asli — convert ke .tsx)
```jsx
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './TiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}) {
  const ref = useRef(null);

  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
```

### TiltedCard.css (source asli)
```css
.tilted-card-figure {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tilted-card-mobile-alert {
  position: absolute;
  top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  display: none;
}

@media (max-width: 640px) {
  .tilted-card-mobile-alert {
    display: block;
  }
  .tilted-card-caption {
    display: none;
  }
}

.tilted-card-inner {
  position: relative;
  transform-style: preserve-3d;
}

.tilted-card-img {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: 15px;
  will-change: transform;
  transform: translateZ(0);
}

.tilted-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  will-change: transform;
  transform: translateZ(30px);
}

.tilted-card-caption {
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 4px;
  background-color: #fff;
  padding: 4px 10px;
  font-size: 10px;
  color: #2d2d2d;
  opacity: 0;
  z-index: 3;
}
```

**Catatan implementasi penting untuk Next.js:**
- File `TiltedCard.tsx` wajib `"use client"` di baris paling atas (pakai `useState`/`useRef`/event mouse — tidak bisa Server Component).
- `motion/img` di-render dengan `<motion.img>` biasa (bukan `next/image`) karena butuh inline style transform dari Framer Motion — ini pengecualian terhadap aturan umum PRD Section 8 ("pakai next/image untuk semua gambar"). Boleh dibiarkan begini, atau kalau ingin tetap pakai `next/image`, perlu d ibungkus dengan `motion.div` + `Image` di dalamnya (opsional, evaluasi saat implementasi — jangan sampai merusak animasi transform-nya).
- Buat juga komponen kecil `HeroTiltedOverlay.tsx` (atau inline) untuk konten overlay teks, styling pakai font Fraunces + warna sesuai design token, BUKAN class `tilted-card-demo-text` dari demo asli.

---

## 4. Checklist Acceptance untuk Task Ini

- [ ] `HeroScene.tsx` dan `<canvas id="hero-canvas">` sudah dihapus total dari Hero
- [ ] Hero layout baru: foto (TiltedCard) di kiri, teks (nama+bio+CTA) di kanan — desktop
- [ ] Mobile (<900px): foto di atas, teks di bawah (stack)
- [ ] TiltedCard berfungsi: tilt mengikuti mouse, scale on hover, overlay teks tampil sesuai styling project
- [ ] `imageSrc` masih placeholder `/images/hero-tilted.jpg` dengan TODO comment (foto final menyusul dari user)
- [ ] Badge "Open to Work" tetap tampil, posisinya disesuaikan dekat TiltedCard
- [ ] Section Lanyard baru: teks kiri, Lanyard kanan (desktop) — stack teks-atas/Lanyard-bawah di mobile
- [ ] AboutScene & ContactScene (3D shape kecil) TIDAK berubah dari PRD asli
- [ ] Tidak ada console error setelah penghapusan HeroScene (cek tidak ada reference issue/import yang nyangkut)
- [ ] `npm install motion` sudah dijalankan dan tercatat di package.json
