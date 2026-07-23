---
name: sitegen
description: Generator Website Multi-Page Next.js berdasarkan asupan dokumen Company Profile (PDF). Menghasilkan website korporat profesional dengan standar animasi interaktif modern (terinspirasi dari *Zenless Zone Zero*), animasi smooth scroll Lenis, serta optimasi SEO Lanjutan & UI/UX Pro Max. Output berupa project Next.js TypeScript lengkap (App Router, Vanilla CSS Modules) di folder `landings/<brand>/`.
---

# Full Website Generator (Sitegen V3.2)

Menghasilkan **Website Multi-Page berbasis Next.js (TypeScript)** dengan *feel* premium, animasi *smooth scroll* via Lenis, transisi mulus, dan *micro-interactions* tingkat tinggi. Input utama adalah dokumen **Company Profile (PDF)**. Output adalah struktur proyek Next.js lengkap (komponen, halaman, routing, aset, SEO files).

## Prinsip (JANGAN DILANGGAR)

1. **Estetika Profesional, Rasa Dinamis.** Desain WAJIB 100% profesional dan elegan (Corporate/Business style). Namun, animasi dan fluiditasnya harus mengambil standar kualitas tinggi (*smooth scrolling* via Lenis, efek paralaks, transisi mulus, *hover* taktil) seperti referensi website interaktif (contoh: *Zenless Zone Zero*), *TANPA meniru gaya gaming/kartunnya*.
2. **Framework & Styling Wajib.** Hanya gunakan **Next.js (App Router)** dengan **TypeScript (`.tsx`)** dan **Vanilla CSS Modules** (`.module.css`). **DILARANG KERAS menggunakan Tailwind CSS**.
3. **Anti-AI Slop & Dilarang Emoji.** DILARANG KERAS menggunakan EMOJI (seperti 🚀, 💡, 🛡️) di elemen UI mana pun karena merusak tingkat profesionalisme korporat. Anda WAJIB hanya menggunakan *iconography* modern berbasis SVG murni atau *library* ikon profesional seperti `lucide-react`.
4. **Gambar Unik, Responsif & Terverifikasi.** DILARANG KERAS menggunakan gambar berulang. Setiap gambar di setiap halaman harus unik, valid, dan dapat diakses (bukan 404). Utamakan mengambil/mengadaptasi gambar dari PDF Company Profile. Semua tag `<Image />` harus diberi styling responsif (`max-width: 100%`, `height: auto`) untuk mencegah gambar tidak muncul atau merusak layout mobile.
5. **Preservasi Pesan & Persuasi PDF.** Teks persuasi, poin *value proposition*, dan kalimat berdaya pikat yang ada di PDF Company Profile DILARANG dihapus/dibuang. Teks tersebut harus diadaptasi secara alami dan diperkaya dengan kata kunci SEO.
6. **Animasi Lenis Mandatory.** Setiap proyek WAJIB menginstal `lenis` (paket Lenis React/core terbaru) dan mengintegrasikannya secara global di `app/layout.tsx` untuk memastikan kelancaran *scrolling*.
7. **SEO & Keywords Strict Compliance (SOP Checklist).** Setiap website yang digenerate WAJIB memenuhi seluruh kriteria SEO Analyze Checklist (lihat bagian khusus di bawah).
8. **UI/UX Mobile Responsiveness & Layout Safety.** 
   - `html` dan `body` WAJIB memiliki `overflow-x: hidden` dan `max-width: 100vw` untuk mencegah bug konten keluar layar di tampilan mobile.
   - Semua elemen Grid/List dengan 2-9 item WAJIB dibungkus `<SwipeableCards>` yang dilengkapi **indikator visual jelas** (*pagination dots*, *horizontal scrollbar*, atau *peek effect*).
   - Elemen Grid/List dengan **10 item atau lebih WAJIB diubah menjadi Auto-slide Carousel** dengan indikator visual dan kontrol gesture agar pengguna tidak lelah/bingung melakukan swipe manual terlalu banyak.
9. **Aksesibilitas & Attributes.** Semua tag `<a>` (link) dan `<img>` / `<Image />` WAJIB memiliki atribut `title` dan `alt`.
10. **LOKASI OUTPUT.** Hasil akhir (proyek Next.js) DILARANG ditaruh di dalam folder skill `.agents/skills/sitegen/`. Harus selalu di-*scaffold* di root `landings/<brand>/`.

---

## SEO Analyze - SOP Checklist (MANDATORY)

Setiap proses perencanaan dan pembuatan halaman WAJIB memverifikasi poin-poin berikut:

### 1. Based Content from Company Profile
- Informasi utama diambil murni dari Company Profile.
- Kalimat persuasi, daya pikat, dan *value proposition* yang sudah dibahas di Company Profile WAJIB tetap muncul dan dipertahankan di lokasi strategis website.

### 2. Struktur Keyword & Halaman
- Data keyword dianalisis berdasarkan logis data Google Search Console (GSC) 3 bulan terakhir.
- 1 Halaman = 1 Grup Keyword Utama (mencegah *keyword cannibalization*).
- Memuat *Buying Keywords* utama dan *LSI (Latent Semantic Indexing) Keywords* pendukung.
- Keyword diprioritaskan berdasarkan **Impression Tinggi** dan **CTR Masih Rendah** (*opportunity keyword*).
- URL halaman memuat keyword utama (contoh: `/layanan-<keyword>`).

### 3. Title Tag & Meta Description
- **Title Tag (≤ 55 Karakter):** Memuat 2-3 keyword dengan impression paling tinggi, memakai copywriting berorientasi CTR (memuat *value proposition*, *urgency*, atau *benefit*), menarik dibaca, dan tidak terpotong di SERP.
- **Meta Description (≤ 155 Karakter):** Memuat keyword relevan yang belum tercakup di Title Tag, copywriting berorientasi CTR (*benefit/urgency*), dan tidak terpotong di hasil pencarian.

### 4. Untuk Halaman Baru
- Topik utama divalidasi melalui riset keyword (Google Ads Keyword Planner / logic setara) berdasarkan layanan inti bisnis.
- Memiliki *buying keyword* yang valid.

### 5. Backlink (External Link)
- Halaman Blog/Edukasi memuat minimal 3 Artikel Backlink berkualitas (persiapan diposting di `wajibaca.com`).
- Judul artikel memuat 1 *buying keyword* sebagai ide utama, sesuai dengan *search intent* pengguna (solutif & relevan).
- Artikel memuat gambar foto produk/layanan yang representatif dan *clickable* (mengarah kembali ke website utama / landing page layanan).

### 6. Social Media Optimization (SMO)
- Tersedia minimal 1 video konten yang relevan untuk setiap keyword utama.
- Setiap halaman memuat 1 *section embed video* SMO (YouTube/Video Sosmed) terkait.

---

## Workflow Eksekusi

### GATE 0 — INTAKE & AUTOMATED EXTRACTION
Sebelum *scaffolding*, gunakan dokumen **Company Profile (PDF)** dari pengguna. Gunakan pustaka `pdf-parse` (atau script pendukung) dan pedoman `reference/company_profile_intake.md` untuk mengekstrak teks persuasi, layanan, dan data perusahaan secara lengkap.

### GATE 1 — SEO RESEARCH & SITEMAP PLANNING
Analisis data PDF dan lakukan riset keyword sesuai **SEO SOP Checklist**:
1. Tentukan *Buying Keywords* & *LSI Keywords* (fokus pada high impression, low CTR opportunity).
2. Petakan konten ke **7 Halaman Inti** dengan URL ber-keyword:
   - Beranda (`/`)
   - Tentang Kami (`/about`)
   - Layanan/Produk (`/services` atau `/layanan-<keyword>`)
   - Portofolio/Studi Kasus (`/portfolio`)
   - Blog/Edukasi (`/blog`) — minimal 3 artikel backlink untuk `wajibaca.com` dengan gambar clickable.
   - Karir (`/careers`)
   - Kontak Kami (`/contact`)
3. Susun rancangan *JSON Site Structure* sesuai `reference/schema.json`.

### GATE 2 — SCAFFOLDING (TypeScript)
Beralihlah ke folder `landings/` di root workspace, dan buat folder `<brand>` jika belum ada.
Jalankan perintah inisialisasi Next.js TypeScript secara non-interaktif:
```bash
npx create-next-app@latest ./landings/<brand> --use-npm --eslint --tailwind=false --src-dir=false --app --ts --import-alias="@/*"
```
- Jika ada warning Turbopack/lockfile, atur `next.config.ts`.
- Instal dependensi animasi Lenis & Ikon: `cd landings/<brand> && npm install lenis lucide-react`.

### GATE 3 — DEVELOPMENT, MOBILE UX & SEO INTEGRATION
Setelah Next.js siap:
1. **CSS System & Anti-Overflow:** Atur CSS variables dari warna brand PDF di `app/globals.css`. Pastikan `html, body` diset `max-width: 100vw; overflow-x: hidden;` untuk mencegah bug konten keluar layar di mobile.
2. **Lenis Provider & SEO Meta:** Konfigurasi Smooth Scroll Lenis di `app/layout.tsx` bersama *Schema.org JSON-LD*.
3. **File SEO Wajib:** Buat `app/sitemap.ts`, `app/robots.ts`, dan `public/llms.txt`.
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
     - **2-9 Item:** Tampilkan sebagai **Grid biasa di Desktop**, dan jadikan **SwipeableCards di Mobile**. Pastikan pagination dots/counter HANYA MUNCUL DI MOBILE (saat layout menjadi flex-scroll), jangan sampai counter muncul berantakan di desktop.
     - **≥ 10 Item:** Wajib gunakan **Auto-slide Carousel** yang aktif di **Desktop DAN Mobile**. Slider harus otomatis bergerak (`setInterval` mengubah `scrollLeft`) tanpa interaksi pengguna, dan memiliki indikator visual (dots/counter) yang tampil rapi di semua layar.
6. **Page Implementation:**
   - Semua Halaman wajib menyertakan metadata SEO (Title ≤ 55 char, Meta Description ≤ 155 char).
   - Setiap Halaman memuat 1 *section embed video* SMO.
   - Semua `<Image />` memuat atribut `title` & `alt`, gambar unik/tidak duplikat, dan responsive style.
   - Di Halaman Blog: 3 artikel backlink dengan gambar clickable mengarah ke situs utama.

### GATE 4 — QC, AUTO-DEBUGGING & SCREENSHOT (Puppeteer Self-Healing)
1. Jalankan dev server: `cd landings/<brand> && npm run dev`.
2. Jalankan skrip screenshot crawler:
   ```bash
   node .agents/skills/sitegen/scripts/render.js http://localhost:3000 / /about /services /portfolio /blog /careers /contact
   ```
3. Jangan pernah simpan hasil screenshot di `.agents/skills/sitegen/`.
4. **Auto-Debugging Wajib:** 
   - Periksa log di console. Jika ada error React/Next.js (termasuk *hydration error*), segera perbaiki kodenya.
   - Periksa semua gambar screenshot yang dihasilkan di folder `landings/<brand>/.preview/`. Jika terdapat layout yang rusak (misalnya: konten *SwipeableCard* menjadi vertikal padahal seharusnya horizontal, gambar terpotong, teks tumpah keluar dari tombol, atau counter dot/badge muncul pada layout desktop grid), **Anda WAJIB memperbaiki CSS/komponennya** lalu menjalankan skrip screenshot lagi.
   - Ulangi proses iterasi dan debugging ini sampai seluruh halaman terlihat 100% sempurna tanpa cacat (bug-free).
5. Jika semua hijau dan sempurna, eksekusi selesai!
