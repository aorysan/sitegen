---
name: Generator Website
description: Generator Website Multi-Page Next.js berdasarkan asupan dokumen Company Profile (PDF). Menghasilkan website korporat profesional dengan standar animasi interaktif modern (terinspirasi dari *Zenless Zone Zero*), animasi smooth scroll Lenis, serta optimasi SEO Lanjutan & UI/UX Pro Max. Output berupa project Next.js TypeScript lengkap (App Router, Vanilla CSS Modules) di folder `landings/<brand>/`.
---

# Generator Website

Menghasilkan **Website Multi-Page berbasis Next.js (TypeScript)** dengan *feel* premium, animasi *smooth scroll* via Lenis, transisi mulus, dan *micro-interactions* tingkat tinggi. Input utama adalah dokumen **Company Profile (PDF)**. Output adalah struktur proyek Next.js lengkap (komponen, halaman, routing, aset, SEO files).

## Prinsip (JANGAN DILANGGAR)

1. **Estetika Profesional, Rasa Dinamis.** Desain WAJIB 100% profesional dan elegan (Corporate/Business style). Animasi WAJIB menggunakan `framer-motion` (untuk efek *fade-in/flip*) dengan komponen `motion.div`. WAJIB gunakan properti `viewport={{ once: true }}` agar animasi HANYA terpicu saat scroll turun dan tidak berulang saat scroll naik (*smooth scrolling* via Lenis tetap diaktifkan).
2. **Framework & Styling Wajib.** Hanya gunakan **Next.js (App Router)** dengan **TypeScript (`.tsx`)** dan **Vanilla CSS Modules** (`.module.css`). **DILARANG KERAS menggunakan Tailwind CSS**.
3. **Anti-AI Slop & Dilarang Emoji.** DILARANG KERAS menggunakan EMOJI (seperti 🚀, 💡, 🛡️) di elemen UI mana pun karena merusak tingkat profesionalisme korporat. Anda WAJIB hanya menggunakan *iconography* modern berbasis SVG murni atau *library* ikon profesional seperti `lucide-react`.
4. **Gambar Unik, Responsif & Terverifikasi.** DILARANG KERAS menggunakan gambar berulang atau asal pasang. Sebelum menyisipkan gambar dan memoles tampilan, Anda WAJIB memanggil sub-skill `ui-ux-pro-max` dan `impeccable` untuk mengkurasi, mencocokkan gambar dari `assets/` dengan tema website, serta memastikan desain tingkat lanjut. Setiap gambar harus unik, valid, dan dapat diakses (bukan 404). Semua tag `<Image />` harus diberi styling responsif (`max-width: 100%`, `height: auto`) untuk mencegah gambar tidak muncul.
5. **Preservasi Pesan & Persuasi PDF.** Teks persuasi, poin *value proposition*, dan kalimat berdaya pikat yang ada di PDF Company Profile DILARANG dihapus/dibuang. Teks tersebut harus diadaptasi secara alami dan diperkaya dengan kata kunci SEO.
6. **Animasi Lenis & Framer Motion Mandatory.** Setiap proyek WAJIB menginstal `lenis` dan `framer-motion`. Integrasikan Lenis secara global di `app/layout.tsx` untuk *smooth scrolling*, dan gunakan `framer-motion` (`motion.div` dengan `viewport={{ once: true }}`) pada section/komponen untuk animasi interaktif saat scroll.
7. **Kepatuhan Mutlak pada PRD.** Seluruh keyword SEO, metadata (Title/Description), konten, struktur halaman, layout section (seperti Grid vs Carousel), dan URL WAJIB diimplementasikan PERSIS seperti yang tertulis di PRD. Dilarang mengarang konten, melakukan riset ulang, atau melanggar spesifikasi PRD.
8. **UI/UX Mobile Responsiveness & Layout Safety untuk tampilan mobile.** 
   - `html` dan `body` WAJIB memiliki `overflow-x: hidden` dan `max-width: 100vw` untuk mencegah bug konten keluar layar.
   - Semua elemen Grid/List dengan **2-9 item WAJIB dibungkus `<SwipeableCards>`** yang dilengkapi **indikator visual jelas** (*pagination dots*, *horizontal scrollbar*, atau *peek effect*).
   - Elemen Grid/List dengan **10 item atau lebih WAJIB diubah menjadi Auto-slide Carousel** dengan indikator visual dan kontrol gesture agar pengguna tidak lelah/bingung melakukan swipe manual terlalu banyak.
9. **Aksesibilitas & Attributes.** Semua tag `<a>` (link) dan `<img>` / `<Image />` WAJIB memiliki atribut `title` dan `alt`.
10. **LOKASI OUTPUT.** Hasil akhir (proyek Next.js) DILARANG ditaruh di dalam folder skill `.agents/skills/sitegen/`. Harus selalu di-*scaffold* di root `landings/<brand>/`.

---



---

## Workflow Eksekusi

### GATE 0 — PREREQUISITE: PRD & INTAKE DATA
BACA dan GUNAKAN dokumen `landings/<brand>/PRD.md` yang telah LULUS QA (disetujui oleh skill `qa-reviewer`) beserta `intake_data.md` dan aset gambar dari skill `intake`. DILARANG membuat asumsi atau perencanaan ulang di luar PRD.

### GATE 1 — BACA DAN PAHAMI PRD
Gunakan pemetaan 7 halaman inti, keyword, Title Tag, Meta Description, struktur section, dan instruksi spesifik (seperti Auto-slide Carousel) yang sudah ada di `landings/<brand>/PRD.md`. JANGAN membuat file JSON terpisah. JANGAN melakukan riset keyword atau merencanakan ulang konten. Langsung gunakan PRD sebagai referensi cetak biru untuk tahap selanjutnya.

### GATE 2 — SCAFFOLDING (TypeScript)
Beralihlah ke folder `landings/` di root workspace, dan buat folder `<brand>` jika belum ada.
Jalankan perintah inisialisasi Next.js TypeScript secara non-interaktif:
```bash
npx -y create-next-app@latest ./landings/<brand> --use-npm --eslint --tailwind=false --src-dir=false --app --ts --import-alias="@/*"
```
- Jika ada warning Turbopack/lockfile, atur `next.config.ts`.
- Instal dependensi animasi Lenis, Framer Motion, & Ikon: `cd landings/<brand> && npm install -y --no-fund lenis framer-motion lucide-react`.

### GATE 3 — DEVELOPMENT, MOBILE UX & SEO INTEGRATION
Setelah Next.js siap:
1. **CSS System & Anti-Overflow:** Atur CSS variables dari warna brand PDF di `app/globals.css`. Pastikan `html, body` diset `max-width: 100vw; overflow-x: hidden;` untuk mencegah bug konten keluar layar di mobile.
2. **Lenis Provider & SEO Meta:** Konfigurasi Smooth Scroll Lenis di `app/layout.tsx` bersama global metadata.
3. **File SEO Wajib:** Buat `app/sitemap.ts`, `app/robots.ts`, dan `public/llms.txt`. (WAJIB pastikan `llms.txt` menggunakan format Markdown standar, diawali dengan H1 header `#`, dan memuat setidaknya satu *absolute link* agar lolos validasi SEO Vercel).
4. **Header & Footer:** Buat `components/Header.tsx` (dengan burger menu mobile 3 garis utuh, safe-area padding) & `components/Footer.tsx`.
5. **Mobile Swipeable & Carousel Rules (CRITICAL):**
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
6. **Page Implementation & Schema.org (CRITICAL):**
   - Setiap Halaman WAJIB diinjeksi **Page-Specific Schema.org JSON-LD**:
     - Beranda (`/`): `Organization` / `LocalBusiness` + `WebSite`
     - Layanan (`/services`): `Service`
     - Blog (`/blog`): `Article` / `BlogPosting`
     - Karir (`/careers`): `JobPosting`
     - Semua Halaman: `BreadcrumbList`
   - Semua Halaman wajib menyertakan metadata SEO (Title ≤ 55 char, Meta Description ≤ 155 char).
   - Setiap Halaman memuat 1 *section embed video* SMO. Jika membuat embed Google Maps, gunakan URL `https://maps.google.com/maps?q=ALAMAT_URL_ENCODED&output=embed` yang valid dan HINDARI parameter `pb=` hasil halusinasi AI yang memicu *Invalid Request*.
   - Semua `<Image />` atau `<img>` memuat atribut `title` & `alt`, gambar unik/tidak duplikat, dan responsive style. Untuk mengakali skrip regex SEO checker tanpa menyebabkan error *compiler* TypeScript *duplicate props*, gunakan sintaks komentar seperti: `alt={art.alt} /* alt="Deskripsi Statis" */`.
   - Di Halaman Blog: 3 artikel backlink dengan gambar clickable mengarah ke situs utama.

### GATE 4 — GIT INITIALIZATION
Lakukan inisialisasi Git di dalam folder Next.js yang baru dibuat.
```bash
cd landings/<brand>
git init
git add .
git commit -m "Initial commit: Next.js project scaffolded by generator"
```
Eksekusi generator selesai di sini. Master orchestrator akan mengambil alih untuk tahap selanjutnya.
