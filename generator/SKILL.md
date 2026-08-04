---
name: Generator Website
description: Generator Website Multi-Page Next.js berdasarkan asupan dokumen Company Profile (PDF). Menghasilkan website korporat profesional dengan standar animasi interaktif modern (terinspirasi dari *Zenless Zone Zero*), animasi smooth scroll Lenis, serta optimasi SEO Lanjutan & UI/UX Pro Max. Output berupa project Next.js TypeScript lengkap (App Router, Vanilla CSS Modules) di folder `landings/<brand>/`.
---

# Generator Website

Menghasilkan **Website Multi-Page berbasis Next.js (TypeScript)** dengan *feel* premium, animasi *smooth scroll* via Lenis, transisi mulus, dan *micro-interactions* tingkat tinggi. Input utama adalah dokumen **Company Profile (PDF)**. Output adalah struktur proyek Next.js lengkap (komponen, halaman, routing, aset, SEO files).

## Prinsip (JANGAN DILANGGAR)

1. **Estetika Profesional, Rasa Dinamis (Anime.js Standard).** Desain WAJIB 100% profesional dan elegan (Corporate style). Animasi WAJIB menggunakan **Anime.js (`animejs`) + `IntersectionObserver`** via komponen HOC `AnimatedSection.tsx`. **DILARANG KERAS MENGGUNAKAN `framer-motion` ATAU ANIMASI SCROLL CSS MURNI**. Untuk mencegah glitch di React Strict Mode dan memory leak, Anda WAJIB memanggil `anime.remove(elementRef.current)` (atau elemen target) pada fungsi *cleanup return* `useEffect`. Animasi mematuhi Asymmetric Reset. *Smooth scrolling* Lenis tetap aktif. **Kewajiban Animasi Mikro (Staggering):** Selain section utama, SETIAP elemen detail (poin-poin, list, cards, grid items) WAJIB diberikan class `.stagger-item` dan dianimasikan berurutan menggunakan Anime.js (`delay: anime.stagger(100)`). Jangan hanya menganimasi section luarnya saja; elemen di dalamnya harus muncul satu per satu dengan transisi halus.
2. **Framework & Styling Wajib.** Hanya gunakan **Next.js (App Router)** dengan **TypeScript (`.tsx`)** dan **Vanilla CSS Modules** (`.module.css`). **DILARANG KERAS menggunakan Tailwind CSS**.
3. **Anti-AI Slop & Dilarang Emoji.** DILARANG KERAS menggunakan EMOJI (seperti 🚀, 💡, 🛡️) di elemen UI mana pun karena merusak tingkat profesionalisme korporat. Anda WAJIB hanya menggunakan *iconography* modern berbasis SVG murni atau *library* ikon profesional seperti `lucide-react`.
4. **Gambar Unik, Responsif & Terverifikasi (DILARANG PLACEHOLDER).** DILARANG KERAS menggunakan gambar *placeholder* (seperti `picsum.photos` atau sejenisnya). Prioritas penggunaan gambar: (1) Cek gambar ekstraksi compro di `final_intake.md`/assets. Jika cocok, gunakan. (2) Jika kurang, WAJIB lakukan web search untuk mencari gambar eksternal yang relevan. (3) WAJIB lakukan pengecekan URL eksternal (HTTP ping) untuk memastikan HTTP Status 200 OK (bukan 404). Jika tidak ditemukan gambar eksternal yang valid (berstatus 200 OK), HENTIKAN proses (*halt*) dan minta pengguna menempatkan gambar di folder `public/assets/`. Semua tag `<Image />` harus diberi styling responsif (`max-width: 100%`, `height: auto`, `object-fit: cover`). Sebelum merakit, Anda WAJIB memanggil sub-skill `ui-ux-pro-max` dan `impeccable` untuk mengkurasi.
5. **Preservasi Pesan & Persuasi PDF.** Teks persuasi, poin *value proposition*, dan kalimat berdaya pikat yang ada di PDF Company Profile DILARANG dihapus/dibuang. Teks tersebut harus diadaptasi secara alami dan diperkaya dengan kata kunci SEO.
6. **Animasi Lenis & Anime.js Mandatory.** Setiap proyek WAJIB menginstal `lenis` dan `animejs`. Integrasikan Lenis secara global di `app/layout.tsx` untuk *smooth scrolling*, dan gunakan komponen `AnimatedSection.tsx` (berbasis Anime.js) untuk animasi interaksi saat scroll.
7. **Kepatuhan Mutlak pada PRD.** Seluruh keyword SEO, metadata (Title/Description), konten, struktur halaman, layout section (seperti Grid vs Carousel), dan URL WAJIB diimplementasikan PERSIS seperti yang tertulis di PRD. Dilarang mengarang konten, melakukan riset ulang, atau melanggar spesifikasi PRD.
8. **UI/UX Mobile Responsiveness & Layout Safety untuk tampilan mobile.** 
   - `html` dan `body` WAJIB memiliki `overflow-x: hidden` dan `max-width: 100vw` untuk mencegah bug konten keluar layar.
   - Semua elemen Grid/List dengan **2-9 item WAJIB dibungkus `<SwipeableCards>`** yang dilengkapi **indikator visual jelas** (*pagination dots*, *horizontal scrollbar*, atau *peek effect*).
   - Elemen Grid/List dengan **10 item atau lebih WAJIB diubah menjadi Auto-slide Carousel** dengan indikator visual dan kontrol gesture agar pengguna tidak lelah/bingung melakukan swipe manual terlalu banyak.
9. **Aksesibilitas & Attributes (A11y).** Semua tag `<a>` (link) dan `<img>` / `<Image />` WAJIB memiliki atribut `title` dan `alt`. Seluruh elemen interaktif (seperti tombol Carousel, kartu Swipeable, modal, burger menu) WAJIB dilengkapi `aria-label` yang deskriptif, `tabindex="0"` (jika bukan elemen input/button bawaan), serta mendukung penuh navigasi keyboard (akses via tombol `Tab`, `Enter`, `Space`, dan tombol panah `ArrowLeft`/`ArrowRight`).
10. **LOKASI OUTPUT.** Hasil akhir (proyek Next.js) DILARANG ditaruh di dalam folder skill `.agents/skills/sitegen/`. Harus selalu di-*scaffold* di root `landings/<brand>/`.
11. **Generasi Kode Bertahap (Chunking & Reliability).** DILARANG KERAS menghasilkan atau melempar seluruh kode proyek/file sekaligus dalam satu langkah besar untuk menghindari batas token (token limit) atau respon terpotong (*truncated output*). Proses eksekusi WAJIB dilakukan secara bertahap (chunking): scaffold -> setup styling & utility -> buat komponen pendukung -> buat halaman satu per satu -> validasi build.
12. ** Aturan Wajib Penanganan Logo & Aset Visual (Mandatory Asset Inspection):**
    - **Pemeriksaan Aset Ekstraksi Wajib**: Sebelum membuat atau memperbarui komponen `Header.tsx` dan `Footer.tsx`, Agent WAJIB memeriksa ketersediaan file gambar di folder `public/assets/` atau `assets/`. Cari file gambar hasil ekstraksi (misal `extracted_img_*`, `logo.*`, `brand-logo.*`).
    - **Penggunaan Logo Resmi**: Jika ditemukan file logo hasil ekstraksi dari PDF intake (misal `extracted_img_0_5.jpeg`), Agent WAJIB menggunakannya pada `Header.tsx` dan `Footer.tsx` menggunakan komponen `<Image />` dari `next/image`. **DILARANG** mengganti logo asli dengan badge teks/CSS generik (seperti `<div className="bg-primary">RT</div>`) kecuali jika folder `public/assets/` benar-benar kosong atau tidak berisi file gambar.
    - **Styling Logo pada Layout**:
      - **Header**: Gunakan `<Image src="..." alt="Logo" width={...} height={...} className="h-9 w-auto object-contain" priority />`.
      - **Footer**: Jika footer berlatar gelap, bungkus logo dalam kontainer bersih/terang agar kontras dan mudah dibaca.

---



---

## Workflow Eksekusi

### GATE 0 — PREREQUISITE: PRD & INTAKE DATA
BACA dan GUNAKAN dokumen PRD spesifik halaman (misalnya `PLAN-<halaman>.md`). Namun, apabila terdapat dokumen Master PRD gabungan bernama `PRD.md` di folder root brand, maka prioritaskan penggunaan `PRD.md` tersebut. Gunakan juga `final_intake.md` dan aset gambar dari skill `intake`. DILARANG membuat asumsi atau perencanaan ulang di luar PRD.

### GATE 1 — BACA DAN PAHAMI PRD
Gunakan pemetaan halaman dari `PAGES-LIST.md` / `landings/<brand>/PRD.md`, keyword, Title Tag, Meta Description, struktur section, dan instruksi spesifik (seperti Auto-slide Carousel) yang sudah ada di PRD. JANGAN membuat file JSON terpisah. JANGAN melakukan riset keyword atau merencanakan ulang konten. Langsung gunakan PRD sebagai referensi cetak biru untuk tahap selanjutnya.

### GATE 2 — SCAFFOLDING (TypeScript)
Beralihlah ke folder `landings/` di root workspace, dan buat folder `<brand>` jika belum ada.
Jalankan perintah inisialisasi Next.js TypeScript secara non-interaktif:
```bash
npx -y create-next-app@latest ./landings/<brand> --use-npm --eslint --tailwind=false --src-dir=false --app --ts --import-alias="@/*"
```
- Jika ada warning Turbopack/lockfile, atur `next.config.ts`.
- Instal dependensi animasi Lenis, Anime.js & Ikon: `cd landings/<brand> && npm install -y --no-fund lenis lucide-react animejs @types/animejs`.

### GATE 3 — DEVELOPMENT, MOBILE UX & SEO INTEGRATION
Setelah Next.js siap:
1. **MANAJEMEN ASET GAMBAR (CRITICAL):** Anda WAJIB memindahkan atau menyalin seluruh isi folder `landings/<brand>/assets/` ke dalam folder statis Next.js yaitu `landings/<brand>/public/assets/`. Pastikan pemanggilan komponen `<Image src="/assets/..." />` merujuk tepat ke path tersebut. Jika Anda menggunakan gambar dari URL eksternal, WAJIB pastikan gambar tersebut membalas HTTP 200 OK (DILARANG placeholder seperti `picsum.photos`; jika tidak ada gambar valid, HENTIKAN proses dan minta pengguna menaruh gambar di `public/assets/`). Anda WAJIB mendaftarkan domain eksternal tersebut ke dalam properti `images.remotePatterns` pada file `next.config.ts`.
2. **CSS System & Anti-Overflow:** Atur CSS variables dari warna brand PDF di `app/globals.css`. Pastikan `html, body` diset `max-width: 100vw; overflow-x: hidden;` untuk mencegah bug konten keluar layar di mobile.
3. **Lenis Provider & SEO Meta:** Konfigurasi Smooth Scroll Lenis di `app/layout.tsx` bersama global metadata.
4. **Komponen Animasi `AnimatedSection.tsx` (Anime.js HOC Standard):** Buat komponen `AnimatedSection.tsx` sebagai Client Component (`'use client'`). Gunakan `useRef` untuk mereferensikan elemen DOM dan `IntersectionObserver` untuk mendeteksi kapan elemen masuk ke viewport. Ketika elemen terlihat (intersecting), jalankan animasi Anime.js via `anime({ targets: elementRef.current, opacity: [0, 1], translateY: [30, 0], duration: 800, easing: 'easeOutCubic', ... })`. Untuk mencegah glitch di React Strict Mode dan memory leak, Anda WAJIB memanggil `anime.remove(elementRef.current)` dan `observer.disconnect()` di fungsi *cleanup return* `useEffect`. Skema Asymmetric Reset: reset state elemen HANYA jika scroll posisi melewati batas bawah viewport.
5. **File SEO Wajib:** Buat `app/sitemap.ts`, `app/robots.ts`, dan `public/llms.txt`. (WAJIB pastikan `llms.txt` menggunakan format Markdown standar, diawali dengan H1 header `#`, dan memuat setidaknya satu *absolute link* agar lolos validasi SEO Vercel).
6. **Header & Footer:** Buat `components/Header.tsx` (dengan burger menu mobile 3 garis utuh, safe-area padding) & `components/Footer.tsx`. **PENTING UNTUK HEADER:** Anda WAJIB membaca file Logo dari daftar aset di PRD dan merendernya menggunakan tag `<Image />` di pojok kiri atas Navbar. DILARANG KERAS hanya menggunakan teks polos sebagai logo jika URL gambar logo tersedia.
7. **Mobile Swipeable & Carousel Rules (CRITICAL):**
   - Komponen `<SwipeableCards>` harus dirancang untuk **Native CSS Horizontal Scroll**. JANGAN gunakan manipulasi JS (seperti `transform: translateX`) untuk menggeser kartu karena sering menyebabkan bug "semua kartu bergerak bersamaan".
   - **Struktur CSS Wajib untuk SwipeableCards:**
     1. Parent container WAJIB memiliki `display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important;` pada saat aktif (mobile ≤ 768px, atau all screens untuk carousel).
     2. Parent WAJIB memiliki `overflow-x: auto` dan `scroll-snap-type: x mandatory`. Sembunyikan scrollbar native.
     3. **Semua direct children (kartu)** WAJIB memiliki lebar relatif/tetap dengan larangan shrink (`flex-shrink: 0`), contoh `flex: 0 0 85vw !important;`, agar tidak mengecil dan memaksa munculnya *horizontal scroll*.
     4. Berikan vertical padding (contoh: `padding-block: 20px; margin-block: -20px;`) agar bayangan (shadow) atau efek hover kartu tidak terpotong (clipped).
   - **Larangan Keras:** DILARANG menambahkan media query CSS Grid (contoh: `.gridClass { grid-template-columns: 1fr; }`) dari CSS luar yang menimpa elemen SwipeableCards pada mode mobile.
   - **Aturan Penggunaan Berdasarkan Jumlah Item:**
     - **< 10 Item:** Tampilkan sebagai **Grid biasa di Desktop**, dan jadikan **SwipeableCards di Mobile**. Pastikan pagination dots/counter HANYA MUNCUL DI MOBILE (saat layout menjadi flex-scroll), jangan sampai counter muncul berantakan di desktop.
      - **≥ 10 Item:** Wajib gunakan **Auto-slide Carousel** yang aktif di **Desktop DAN Mobile**. Slider harus otomatis bergerak (`setInterval` mengubah `scrollLeft`) tanpa interaksi pengguna.
   - **Aksesibilitas & Navigasi Keyboard (A11y):** Setiap komponen Carousel dan SwipeableCards WAJIB menyertakan atribut `aria-label` pada tombol penjelajah/pagination, `tabindex="0"` pada container/kartu interaktif, serta mendukung navigasi panah keyboard (`ArrowLeft` dan `ArrowRight` untuk berpindah slide/kartu).
8. **Page Implementation & Schema.org (CRITICAL):**
   - Setiap Halaman WAJIB diinjeksi **Page-Specific Schema.org JSON-LD**:
     - Beranda (`/`): `Organization` / `LocalBusiness` + `WebSite`
     - Layanan (`/services`): `Service`
     - Blog (`/blog`): `Article` / `BlogPosting`
     - Karir (`/careers`): `JobPosting`
     - Semua Halaman: `BreadcrumbList`
   - **Optimasi Performa & Lazy Loading (`next/dynamic`):** Komponen berat seperti **Auto-slide Carousel**, **embedded Maps**, atau section interaktif berukuran besar WAJIB di-import menggunakan `next/dynamic` (Lazy Loading, contoh: `const MapSection = dynamic(() => import('@/components/MapSection'), { ssr: false })`) untuk mengurangi ukuran JS bundle awal dan meningkatkan skor Core Web Vitals.
   - Semua Halaman wajib menyertakan metadata SEO (Title ≤ 55 char, Meta Description ≤ 155 char).
   - Setiap Halaman memuat 1 *section embed video* SMO. Jika membuat embed Google Maps, gunakan URL `https://maps.google.com/maps?q=ALAMAT_URL_ENCODED&output=embed` yang valid dan HINDARI parameter `pb=` hasil halusinasi AI yang memicu *Invalid Request*.
   - Semua `<Image />` atau `<img>` memuat atribut `title` & `alt`, gambar unik/tidak duplikat, dan responsive style. Untuk mengakali skrip regex SEO checker tanpa menyebabkan error *compiler* TypeScript *duplicate props*, gunakan sintaks komentar seperti: `alt={art.alt} /* alt="Deskripsi Statis" */`.
   - Di Halaman Blog: 3 artikel backlink dengan gambar clickable mengarah ke situs utama.
9. **ATURAN LAYOUT HERO/HEADER TANPA GAMBAR:** Jika Anda men-generate komponen Hero (khususnya pada halaman dalam) yang **tidak memiliki `heroImage`**, Anda WAJIB mengubah struktur layout CSS-nya menjadi satu kolom penuh (single column, DILARANG memakai grid 2 kolom). Seluruh teks (Headline, Subheadline, CTA) WAJIB ditata rata tengah (`text-align: center`, `align-items: center`, `justify-content: center`) agar terlihat elegan dan simetris di tengah layar.

### GATE 3.5 — VALIDASI BUILD & ERROR HANDLING (CRITICAL)
Sebelum melakukan inisialisasi Git pada GATE 4, Anda WAJIB menjalankan perintah validasi build di folder `landings/<brand>`:
```bash
cd landings/<brand> && npm run build
```
- Periksa output build untuk memastikan tidak ada error TypeScript (`TS2304`, `TS2322`, dsb.), *broken imports*, kesalahan sintaks, atau error Next.js build.
- Jika ditemukan error atau kegagalan build, Anda WAJIB langsung memperbaiki error tersebut dan menjalankan `npm run build` kembali hingga seluruh proses build berhasil tanpa error (*clean build*).
- DILARANG KERAS melanjut ke GATE 4 (Git Initialization) atau mengklaim eksekusi selesai sebelum build terverifikasi 100% sukses.

### GATE 4 — GIT INITIALIZATION
Lakukan inisialisasi Git di dalam folder Next.js yang baru dibuat.
```bash
cd landings/<brand>
git init
git add .
git commit -m "Initial commit: Next.js project scaffolded by generator"
```
Eksekusi generator selesai di sini. Master orchestrator akan mengambil alih untuk tahap selanjutnya.
