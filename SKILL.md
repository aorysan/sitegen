---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan dan mengaplikasikan kepatuhan absolut pada AGENTS.md.
---

# Sitegen Master Flow

> [!CAUTION]
> **MANDATORY CONSTITUTIONAL BINDING**: Sebelum mengeksekusi alur kerja di bawah, Anda WAJIB MEMBACA DAN MEMATUHI file konstitusi master `AGENTS.md` yang berada se-direktori dengan file skill ini (`D:\AryokPunya\Magang\sitegen\.agents\skills\sitegen\AGENTS.md`). Pelanggaran terhadap gerbang persetujuan (*Hard Stop*) atau pasal di file tersebut adalah *Critical Architecture Failure*.

Anda adalah master orkestrator untuk membangun website secara lengkap beralaskan spesifikasi AAA Tier-1. Jalankan langkah-langkah ini sesuai urutan yang tepat dan **PATUHI SETIAP PASAL PADA FILE `AGENTS.md` TANPA KECUALI**.

1. **Intake**: Panggil `intake` untuk mengekstrak data dari dokumen PDF ke `landings/<brand>/intake_compro.md`. Wajib verifikasi dan catat ketersediaan aset media/video dari compro: jika video nihil, beri label status *[No-Video Default]* agar perancangan selanjutnya menyiapkan fallback antarmuka interaktif atau mengkonfirmasi input video langsung ke user.

2. **Research**: Panggil sub-skill `research` untuk menghasilkan 2 dokumen riset:
   - `landings/<brand>/planning/PLAN-USER-NEEDS.md`: analisis pain points, jobs-to-be-done, objection & counter-messaging, FAQ pra-pembelian, user journey, dan trigger pembelian target user
   - `landings/<brand>/planning/PLAN-COMPETITOR.md`: analisis min. 3 kompetitor meliputi positioning, fitur & section website, tone of voice, keyword SEO, dan gap analysis
   
   Sumber data: inferensi dari `intake_compro.md` **+** web search otomatis berdasarkan industri yang terdeteksi.

3. **Brainstorming, Rekonsiliasi & Global Design**:
   a. Berdasarkan data riset, panggil sub-skill `brainstorming` (Visi, Misi, Tema Font, UI/UX). Pastikan `PLAN-USER-NEEDS.md` dan `PLAN-COMPETITOR.md` tersedia sebagai konteks agar diskusi berbasis data riset. Simpan masukan user sebagai `landings/<brand>/user_preferences.md`.
   b. Lakukan rekonsiliasi dengan menggabungkan `intake_compro.md` dan `user_preferences.md` menjadi `landings/<brand>/final_intake.md`.
   c. **ATURAN WAJIB MUTLAK (HARD STOP - ZERO BYPASS)**: Anda WAJIB memperlihatkan isi `final_intake.md` ke user. BERHENTI BEKERJA (END TURN) dan JANGAN MEMANGGIL TOOL APA PUN LAGI. Tunggu konfirmasi teks eksplisit dari user sebelum lanjut ke langkah berikutnya. Dilarang memanfaatkan momentum untuk langsung meneruskan sesi.
   d. Setelah disetujui, inisialisasi project Next.js di dalam direktori `landings/<brand>` (misal: `npx create-next-app@latest ./` dengan aturan web framework) jika belum ada. Lalu panggil `ui-ux-pro-max` dan `impeccable` untuk menentukan warna, font, dan komponen global, menghasilkan `PLAN-GLOBAL.md` yang WAJIB menetapkan parameter antarmuka AAA Tier-1 sesuai `AGENTS.md`:
      - **Sticky Top Navbar dengan Logo Resmi Brand**: Komponen header/navbar wajib bernilaikan `sticky top-0` atau `fixed top-0` dengan z-index minimum `z-50` serta wajib menampilkan logo resmi brand (file SVG/PNG terverifikasi), BUKAN sekadar teks atau ikon biasa.
      - **Trilogi Dynamic Motion AAA & Anti-Sekali Jalan**: Wajib menginstal dan memadukan 3 library: (1) **Lenis** untuk *inertial smooth scrolling* global di Root Layout, (2) **Anime.js** untuk animasi mikro prosedural & partikel kosmik, serta (3) **Framer Motion** untuk *scroll-reveal* dua arah (`once: false`) & hover fluiditas kartu beranimasi mikro berkelanjutan (*infinite ambient looping*). DILARANG MEMASANG ANIMASI YANG HANYA BERJALAN SEKALI!
      - **Touch-Safe Mobile Video**: Rancangan pemutar video wajib bersahabat dengan sentuhan resolusi selular (*touch-friendly* >44x44px), menyediakan tombol play/pause/stop eksplisit dan menolak lock fullscreen/autoplay berpotensi macet.
      - **Active Visual Sourcing & Relevance (Anti-Slop):** Website wajib menampilkan gambar produk, logo, dan karya seni yang 100% RELEVAN dengan identitas brand, diperoleh melalui pencarian mandiri ke repositori resmi atau Wikipedia/Wikimedia. DILARANG KERAS MENGGUNAKAN FOTO STOK KOSONG ATAUPUN FOTO UNSPLASH YANG TIDAK RELEVAN!
      Pastikan juga untuk menginisialisasi Playwright (misal: `npm init playwright@latest --yes` dan `npx playwright install --with-deps`).
   e. Segera setelah `PLAN-GLOBAL.md` selesai, panggil `planner` mode=design-system untuk menghasilkan `PLAN-DESIGN-SYSTEM.md`. Berdasarkan `final_intake.md` dan kesepakatan user, buat juga dokumen sitemap di `landings/<brand>/planning/PAGES-LIST.md` yang berisi daftar halaman yang akan dieksekusi.

4. **Fase Persiapan Batch (PRD & Visual):**
   a. **Buat PRD Semua Halaman:** Baca `landings/<brand>/planning/PAGES-LIST.md`. Panggil sub-skill `planner` mode=page untuk men-generate PRD (`PLAN-<halaman>.md`) untuk **semua** halaman yang terdaftar sekaligus dengan ketentuan kedalaman konten penuh (tanpa ringkasan MVP dangkal).
   b. **Review QA PRD & Konsolidasi Master PRD:** Panggil `qa-reviewer` untuk menilai kelayakan semua `PLAN-<halaman>.md` secara internal. Segera pasca lulus QA, panggil sub-skill `planner` mode=`merge` untuk mengkonsolidasikan seluruh `PLAN-<halaman>.md`, `PLAN-GLOBAL.md`, dan `PLAN-DESIGN-SYSTEM.md` menjadi dokumen tunggal Master PRD di `landings/<brand>/PRD.md` sebagai patokan utama generator.
   c. **Persiapan Visual & Asset Mapping (Strict Brand Logo & Relevance Enforcer):** Periksa folder `public/assets/` dan lakukan pencarian web aktif untuk menghasilkan dokumen pemetaan **`landings/<brand>/planning/ASSET-MAPPING.md`** yang memetakan eksplisit URL logo resmi brand, logo produk/game asli beresolusi tinggi (dari Wikimedia Commons atau sumber sah), foto konvensi aktual, maupun video YouTube ke target section spesifik di UI. **DILARANG KERAS** menyisipkan link gambar fiktif, foto stok acak yang tidak nyambung, atau placeholder abu-abu!
   d. **[CRITICAL STOP - TUNGGU REVIEW USER - ZERO BYPASS]:** Perlihatkan dokumen Master PRD (`PRD.md`), dokumen `ASSET-MAPPING.md`, dan konsep visual kepada user. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu persetujuan eksplisit user sebelum meneruskan ke tahap eksekusi.

5. **Fase Eksekusi Halaman (Hybrid SDD Iteration & Deep Storytelling):**
   Jalankan dev server di background (misal: `cd landings/<brand> && npm run dev`) sebelum memulai iterasi agar Playwright dan user bisa memvalidasi halaman.
   Lakukan loop berurutan untuk *setiap halaman* dari `PAGES-LIST.md`:
    a. **AI-to-AI SDD Loop:**
       - Panggil subagent `generator` khusus untuk membangun halaman tersebut ke dalam project Next.js berdasarkan `PLAN-<halaman>.md`, `PLAN-GLOBAL.md`, pedoman visual, dan `ASSET-MAPPING.md`. `generator` WAJIB merakit halaman dengan memecah *section* menjadi beberapa file komponen mandiri (`components/Hero.tsx`, `components/FAQ.tsx`, dll) terlebih dahulu sebelum menggabungkannya ke halaman utama (`page.tsx`).
       - **Kepatuhan Arsitektur & Aturan Eksekusi Wajib Generator (`AGENTS.md` Compliance):**
         1. **Framework Compliance**: WAJIB memuat dan mematuhi aturan panduan modern di file `AGENTS.md` serta dokumentasi resmi Next.js App Router.
         2. **Strict Slug Enforcement**: Generator DILARANG mengubah, mentranslasikan, atau memodifikasi nama slug string dari `PAGES-LIST.md`. Rute folder, nama penanganan struktur komponen, hingga referensi tautan WAJIB 100% kongruen.
         3. **Mandatory Brand Logo & Relevant Artwork Attributes**: Generator WAJIB menyisipkan elemen logo brand asli dan gambar produk tulen bersumber dari `ASSET-MAPPING.md` pada kartu dan banner, dengan pasangan atribut ganda `alt="..."` DAN `title="..."` berisikan kata kunci (keyword) SEO yang akurat.
         4. **Continuous Bidirectional & Looped Animations (Anti Sekali Jalan)**: Gunakan **Anime.js v4** dan Framer Motion dengan animasi gulir dua arah (`viewport={{ once: false, amount: 0.15 }}`) serta animasi mikro melayang tak henti (*repeat: Infinity*) pada elemen kartu, ikon, dan background kosmik agar UI hidup 24/7.
       - Setelah pembangunan halaman selesai, panggil subagent `qa-reviewer` untuk mengecek hasil kode terhadap PRD, *Strict Slug*, keberadaan logo & gambar nyata yang relevan, serta verifikasi bahwa animasi TIDAK berjalan sekali doang (`once: false`).
       - Jika ada bug, UI kurang memukau, atau pelanggaran spesifikasi di atas, biarkan subagent saling berkoordinasi (maksimal 5 iterasi fix loop). **Aturan Fix Loop Presisi:** Saat melakukan perbaikan, `generator` DILARANG KERAS merender ulang/mengirim seluruh file kode utuh ke obrolan, melainkan HANYA membaca konteks komponen spesifik yang bermasalah dan merevisinya menggunakan *line-level editing* (edit spesifik per baris/patch).
   b. **Playwright Spec:** Setelah AI menganggap halaman sempurna, generate file pengujian Playwright berdasarkan PRD dan jalankan pengujian dengan nama `tests/<slug_tepat>.spec.ts`.
   c. **[CRITICAL STOP - TUNGGU REVIEW USER - ZERO BYPASS]:** Tampilkan hasil akhir halaman tersebut kepada user. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL APA PUN (END TURN). Tunggu user mengecek dev server dan memberikan persetujuan eksplisit atau revisi. JANGAN lanjut ke halaman berikutnya sebelum disetujui.
   d. Ulangi loop untuk halaman berikutnya dari langkah 5a.

6. **Penggabungan (Integration):** Setelah semua halaman selesai dan disetujui, gabungkan navigasi antar halaman agar berfungsi sempurna di bawah pengawasan *Lenis smooth scrolling* dan animasi berlanjut.

7. **Fase SEO Validation & Debug Lokal Final**:
   a. **SEO Validation**: Panggil sub-skill `seo-validator` untuk memverifikasi seluruh tag `<img />` dan `next/image` terbekali atribut ganda `alt` dan `title` yang kaya makna SEO spesifik brand serta menyingkirkan gambar fiktif/rusak atau tidak relevan.
   b. **Debug Lokal Final & Sanity QA**: Sebelum menyerahkan hasil akhir, wajib melakukan debug lokal dengan menjalankan build produksi secara mandiri di latar belakang:
      - Jalankan terminal: `cd landings/<brand> && npm run build` (dan verifikasi TypeScript bebas error dengan `npx tsc --noEmit`).
      - Panggil kembali `qa-reviewer` untuk melakukan uji kewarasan (*sanity test*): verifikasi logo resmi, relevansi gambar, video *Touch-Safe*, pengguliran *Lenis*, animasi partikel *Anime.js*, dan animasi gulir dua arah.

8. **[CRITICAL STOP - TUNGGU REVIEW USER - ZERO BYPASS]**: Tampilkan laporan hasil validasi SEO dan bukti keberhasilan build lokal akhir kepada user. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL APA PUN (END TURN). Tunggu persetujuan eksplisit dari user di terminal sebelum ke tahap deploy.

9. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.

10. **Post-Deploy Debug**: Panggil `debug` untuk **Post-Deploy Debug** jika diperlukan (Maksimal 2 iterasi).

11. **Cleanup**: Setelah selesai, matikan (kill) proses dev server Node.js.
