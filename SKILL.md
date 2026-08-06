---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan dan mengaplikasikan kepatuhan absolut pada AGENTS.md.
---

# Sitegen Master Flow

> [!CAUTION]
> **MANDATORY CONSTITUTIONAL BINDING**: Sebelum mengeksekusi alur kerja di bawah, Anda WAJIB MEMBACA DAN MEMATUHI file konstitusi master `AGENTS.md` yang berada se-direktori dengan file skill ini (`AGENTS.md`). Pelanggaran terhadap gerbang persetujuan (*Hard Stop*) atau pasal di file tersebut adalah *Critical Architecture Failure*.
> 
> **ATURAN PEMANGGILAN SUB-SKILL**: Setiap kali instruksi di bawah menyuruh Anda memanggil sub-skill (contoh: `intake`, `research`, `brainstorming`, `generator`, dll), Anda **WAJIB membaca file panduannya** (misal: `intake/SKILL.md`) menggunakan tool `view_file` SEBELUM menjalankan instruksinya. JANGAN MENGASUMSIKAN CARA KERJANYA!

Anda adalah master orkestrator untuk membangun website secara lengkap beralaskan spesifikasi AAA Tier-1. Jalankan langkah-langkah ini sesuai urutan yang tepat dan **PATUHI SETIAP PASAL PADA FILE `AGENTS.md` TANPA KECUALI**.

## Dependency Graph — File yang Harus Exist per Langkah

| Langkah | Input yang Dibaca | Output yang Dihasilkan |
|---------|-------------------|----------------------|
| 0. Onboarding | - | `landings/<brand>/` (folder) |
| 1. Intake | PDF compro dari user | `intake_compro.md`, `assets/`, `intake_raw.json` |
| 2. Research | `intake_compro.md` | `PLAN-USER-NEEDS.md`, `PLAN-COMPETITOR.md` |
| 3. Brainstorming | `intake_compro.md`, `PLAN-USER-NEEDS.md`, `PLAN-COMPETITOR.md` | `user_preferences.md` |
| 4. Rekonsiliasi | `intake_compro.md`, `user_preferences.md` | `final_intake.md` |
| 5. Global Design | `final_intake.md`, research docs | `PLAN-GLOBAL.md`, `PLAN-DESIGN-SYSTEM.md`, `PAGES-LIST.md` |
| 6. PRD Batch | `PAGES-LIST.md`, `PLAN-GLOBAL.md`, `final_intake.md` | `PLAN-<halaman>.md`, `PRD.md`, `ASSET-MAPPING.md` |
| 7. Eksekusi | `PRD.md`, `ASSET-MAPPING.md`, `PLAN-DESIGN-SYSTEM.md` | Next.js project, Playwright tests |
| 8-11. | Hasil eksekusi | SEO report, deploy URL |

0. **User Onboarding [HARD STOP]:**
   a. Tanya user: **nama brand/perusahaan** yang akan dibuatkan website.
   b. Tanya user: **path ke file PDF Company Profile** (compro) yang akan digunakan sebagai sumber data.
   c. Verifikasi file PDF tersebut benar-benar ada di filesystem menggunakan tool yang tersedia.
   d. Buat folder `landings/<brand>/` jika belum ada (gunakan nama brand yang di-slug-kan).
   e. **[HARD STOP]**: BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu user memberikan jawaban kedua pertanyaan di atas. Tunggu konfirmasi persetujuan dari user secara eksplisit sebelum melompat ke tahap berikutnya. Dilarang memanfaatkan momentum untuk meneruskan eksekusi secara mandiri.

1. **Intake**: Anda WAJIB membaca file panduan `intake/SKILL.md` terlebih dahulu menggunakan `view_file`. Setelah itu, patuhi instruksi di dalamnya secara ketat untuk menjalankan script Python ekstraksi data dari dokumen PDF ke `landings/<brand>/intake_compro.md`. Wajib verifikasi dan catat ketersediaan aset media/video dari compro: jika video nihil, beri label status *[No-Video Default]* agar perancangan selanjutnya menyiapkan fallback antarmuka interaktif atau mengkonfirmasi input video langsung ke user.

2. **Research [PARALEL — 2 SUBAGENT]**: Panggil sub-skill `research` untuk menghasilkan 2 dokumen riset. **Kedua dokumen ini BOLEH di-generate secara PARALEL** menggunakan 2 subagent terpisah karena keduanya membaca input yang sama (`intake_compro.md`) tetapi menulis ke file output yang berbeda:
   - **Subagent A** → `landings/<brand>/planning/PLAN-USER-NEEDS.md`: analisis pain points, jobs-to-be-done, objection & counter-messaging, FAQ pra-pembelian, user journey, dan trigger pembelian target user
   - **Subagent B** → `landings/<brand>/planning/PLAN-COMPETITOR.md`: analisis min. 3 kompetitor meliputi positioning, fitur & section website, tone of voice, keyword SEO, dan gap analysis
   
   Sumber data: inferensi dari `intake_compro.md` **+** web search otomatis berdasarkan industri yang terdeteksi.
   **Constraint Paralelisme**: Kedua subagent harus SELESAI sebelum melanjutkan ke Step 3 (Brainstorming).

3. **Brainstorming — Sesi Desain Interaktif [SESI MULTI-TURN]:**
   Panggil sub-skill `brainstorming`. Sub-skill ini adalah **SESI INTERAKTIF MULTI-TURN** (BUKAN tool call sekali jalan) yang memiliki alur internal sendiri:
   - Baca `intake_compro.md`, `PLAN-USER-NEEDS.md`, `PLAN-COMPETITOR.md` sebagai konteks
   - Tanya user **minimum 5 pertanyaan** (1 pertanyaan per pesan): visi, audience, tone, visual, fitur
   - Propose 2-3 pendekatan style direction, user pilih
   - Simpan keputusan ke `landings/<brand>/user_preferences.md`
   - **[HARD STOP internal]**: User approve `user_preferences.md` sebelum brainstorming selesai. BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu konfirmasi persetujuan dari user secara eksplisit sebelum melompat ke tahap berikutnya. Dilarang memanfaatkan momentum untuk meneruskan eksekusi secara mandiri.

   **ATURAN KRITIS**: SEMUA langkah checklist internal brainstorming WAJIB SELESAI sebelum melanjutkan ke langkah 4. Dilarang merangkum brainstorming menjadi single action.

4. **Rekonsiliasi & Review:**
   a. Gabungkan `intake_compro.md` dan `user_preferences.md` menjadi `landings/<brand>/final_intake.md`.
   b. **[CRITICAL STOP — TUNGGU REVIEW USER — ZERO BYPASS]**: Perlihatkan isi `final_intake.md` ke user. BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu konfirmasi persetujuan dari user secara eksplisit sebelum melompat ke tahap berikutnya. Dilarang memanfaatkan momentum untuk meneruskan eksekusi secara mandiri.

5. **Global Design & Planning**:
   a. Setelah disetujui, panggil `ui-ux-pro-max` dan `impeccable` untuk menentukan warna, font, dan komponen global, menghasilkan `PLAN-GLOBAL.md` yang WAJIB menetapkan parameter antarmuka AAA Tier-1 sesuai `AGENTS.md`:
      - **Sticky Top Navbar dengan Logo Resmi Brand**: Komponen header/navbar wajib bernilaikan `sticky top-0` atau `fixed top-0` dengan z-index minimum `z-50` serta wajib menampilkan logo resmi brand (file SVG/PNG terverifikasi), BUKAN sekadar teks atau ikon biasa.
      - **Trilogi Dynamic Motion AAA & Anti-Sekali Jalan**: Wajib menginstal dan memadukan 3 library: (1) **Lenis** untuk *inertial smooth scrolling* global di Root Layout, (2) **Anime.js** untuk animasi mikro prosedural & partikel kosmik, serta (3) **Framer Motion** untuk *scroll-reveal* satu arah atas-ke-bawah (DILARANG `once: true`, DILARANG bidirectional — harus unidirectional dengan deteksi arah scroll) & hover fluiditas kartu beranimasi mikro berkelanjutan (*infinite ambient looping*). DILARANG MEMASANG ANIMASI YANG HANYA BERJALAN SEKALI!
      - **Touch-Safe Mobile Video**: Rancangan pemutar video wajib bersahabat dengan sentuhan resolusi selular (*touch-friendly* >44x44px), menyediakan tombol play/pause/stop eksplisit dan menolak lock fullscreen/autoplay berpotensi macet.
      - **Active Visual Sourcing & Relevance (Anti-Slop):** Website wajib menampilkan gambar produk, logo, dan karya seni yang 100% RELEVAN dengan identitas brand, diperoleh melalui pencarian mandiri ke repositori resmi atau Wikipedia/Wikimedia. DILARANG KERAS MENGGUNAKAN FOTO STOK KOSONG ATAUPUN FOTO UNSPLASH YANG TIDAK RELEVAN!
   b. Segera setelah `PLAN-GLOBAL.md` selesai, panggil `planner` mode=design-system untuk menghasilkan `PLAN-DESIGN-SYSTEM.md`. Berdasarkan `final_intake.md` dan kesepakatan user, buat juga dokumen sitemap di `landings/<brand>/planning/PAGES-LIST.md` yang berisi daftar halaman yang akan dieksekusi.
   c. Panggil `qa-reviewer` mode=`global-extended` untuk cross-check konsistensi antar dokumen `PLAN-GLOBAL.md`, `PLAN-USER-NEEDS.md`, `PLAN-COMPETITOR.md`, dan `PLAN-DESIGN-SYSTEM.md`. Jika skor < threshold, lakukan revisi sebelum lanjut ke fase PRD per halaman.

6. **Fase Persiapan Batch (PRD & Visual):**
   a. **Buat PRD Semua Halaman [PARALEL — N SUBAGENT] (Shift-Left SEO Injection):** Baca `landings/<brand>/planning/PAGES-LIST.md`. Panggil sub-skill `planner` mode=page untuk men-generate PRD (`PLAN-<halaman>.md`). **Strategi Paralelisme:** Dispatch **satu subagent `planner` per halaman** secara paralel — setiap subagent membaca `PLAN-GLOBAL.md` dan `final_intake.md` yang sama tetapi menulis ke file `PLAN-<halaman>.md` yang berbeda. Semua subagent harus SELESAI sebelum lanjut ke Step 6b. Ketentuan kedalaman konten penuh (tanpa ringkasan MVP dangkal). **Kewajiban Injeksi SEO Internal:** Sub-skill planner WAJIB mencantumkan spesifikasi SEO per halaman secara eksplisit: (1) Grup keyword utama jenis *buying keyword* dan keyword pendukung LSI, (2) Title Tag (<= 55 karakter) memuat 2-3 keyword impression tinggi berjiwa CTR-oriented, (3) Meta Description (<= 155 karakter) memuat value proposition kuat dan LSI yang belum tercakup di Title Tag, serta (4) Spesifikasi Schema.org JSON-LD akurat. Khusus halaman Blog (`/blog`), wajib mencantumkan perancangan 3 artikel backlink berkualitas berserta gambar representatif *clickable* mengarah ke situs utama.
   b. **Review QA PRD & Konsolidasi Master PRD:** Panggil `qa-reviewer` untuk menilai kelayakan semua `PLAN-<halaman>.md` secara internal. Segera pasca lulus QA, panggil sub-skill `planner` mode=`merge` untuk mengkonsolidasikan seluruh `PLAN-<halaman>.md`, `PLAN-GLOBAL.md`, dan `PLAN-DESIGN-SYSTEM.md` menjadi dokumen tunggal Master PRD di `landings/<brand>/PRD.md` sebagai patokan utama generator.
   c. **Persiapan Visual & Asset Mapping (Strict Brand Logo & Relevance Enforcer):** Periksa folder `public/assets/` dan lakukan pencarian web aktif untuk menghasilkan dokumen pemetaan **`landings/<brand>/planning/ASSET-MAPPING.md`** yang memetakan eksplisit URL logo resmi brand, logo produk/game asli beresolusi tinggi (dari Wikimedia Commons atau sumber sah), foto konvensi aktual, maupun video YouTube ke target section spesifik di UI. **DILARANG KERAS** menyisipkan link gambar fiktif, foto stok acak yang tidak nyambung, atau placeholder abu-abu!
   d. **[CRITICAL STOP - TUNGGU REVIEW USER - ZERO BYPASS]:** Perlihatkan dokumen Master PRD (`PRD.md`), dokumen `ASSET-MAPPING.md`, dan konsep visual kepada user. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu konfirmasi persetujuan dari user secara eksplisit sebelum melompat ke tahap berikutnya. Dilarang memanfaatkan momentum untuk meneruskan eksekusi secara mandiri.

7. **Fase Eksekusi Halaman (Hybrid SDD Iteration & Deep Storytelling):**
   Inisialisasi Playwright di project: `cd landings/<brand> && npm init playwright@latest --yes && npx playwright install --with-deps`.
   Jalankan dev server di background (misal: `cd landings/<brand> && npm run dev`) sebelum memulai iterasi agar Playwright dan user bisa memvalidasi halaman.

   **Strategi Eksekusi Multi-Subagent:**
   - **Halaman Beranda (`/`) WAJIB dieksekusi PERTAMA dan SENDIRI** (1 subagent generator) karena membangun fondasi project: scaffolding Next.js, shared components (`Header.tsx`, `Footer.tsx`, `AnimatedSection.tsx`, `SwipeableCards.tsx`), `globals.css`, dan `layout.tsx`.
   - **Setelah Beranda selesai dan lulus QA + user review**, halaman-halaman berikutnya BOLEH dieksekusi secara **PARALEL maksimal 2-3 subagent generator** sekaligus, karena setiap halaman menulis ke file yang berbeda (`app/<slug>/page.tsx` + komponen section di `components/`).
   - **Constraint Keamanan Paralelisme:**
     1. Setiap subagent generator DILARANG mengedit file shared (`Header.tsx`, `Footer.tsx`, `globals.css`, `layout.tsx`) — jika perlu modifikasi shared file, tunggu semua subagent selesai lalu lakukan di main thread.
     2. Setiap subagent generator WAJIB membuat komponen section dengan nama unik yang mengandung slug halaman (misal: `HeroAbout.tsx`, `HeroLayanan.tsx`) untuk menghindari collision file.
     3. Semua subagent paralel harus SELESAI sebelum langkah 7b-7c (Playwright + Visual QA + User Review) dijalankan per halaman.
   - **Fallback**: Jika paralelisme menyebabkan konflik file atau error yang sulit di-debug, BOLEH fallback ke eksekusi sekuensial (1 halaman per waktu).

   Lakukan loop untuk *setiap halaman* dari `PAGES-LIST.md` (Beranda dulu, lalu sisanya paralel):
   a. **AI-to-AI SDD Loop & Fallback Protocol:**
      - Panggil subagent `generator` khusus untuk membangun halaman tersebut ke dalam project Next.js berdasarkan Master PRD (`PRD.md`), pedoman visual, dan `ASSET-MAPPING.md`.
      - **Kepatuhan Arsitektur & Aturan Eksekusi Wajib Generator (`AGENTS.md` Compliance):**
        1. **Framework Compliance**: WAJIB memuat dan mematuhi aturan panduan modern di file `AGENTS.md` serta dokumentasi resmi Next.js App Router.
        2. **Strict Slug Enforcement**: Generator DILARANG mengubah, mentranslasikan, atau memodifikasi nama slug string dari `PAGES-LIST.md`. Rute folder, nama penanganan struktur komponen, hingga referensi tautan WAJIB 100% kongruen.
        3. **Mandatory Brand Logo & Relevant Artwork Attributes**: Generator WAJIB menyisipkan elemen logo brand asli dan gambar produk tulen bersumber dari `ASSET-MAPPING.md` pada kartu dan banner, dengan pasangan atribut ganda `alt="..."` DAN `title="..."` berisikan kata kunci (keyword) SEO yang akurat.
        4. **Continuous Unidirectional & Looped Animations (Anti Sekali Jalan)**: Gunakan **Anime.js v4** dan Framer Motion dengan animasi gulir SATU ARAH (atas ke bawah saja — implementasikan deteksi arah scroll, DILARANG `once: true`, DILARANG bidirectional) serta animasi mikro melayang tak henti (*repeat: Infinity*) pada elemen kartu, ikon, dan background kosmik agar UI hidup 24/7.
      - Setelah pembangunan halaman selesai, panggil subagent `qa-reviewer` untuk mengecek hasil kode terhadap PRD, *Strict Slug*, keberadaan logo & gambar nyata yang relevan, serta verifikasi bahwa animasi scroll HANYA terpicu saat scroll ke bawah (bukan bidirectional, bukan `once: true`).
      - Jika ada bug, UI kurang memukau, atau pelanggaran spesifikasi di atas, biarkan subagent saling berkoordinasi (maksimal 5 iterasi fix loop).
      - **Protokol Batas Iterasi (Fallback Limit Protocol):** Apabila iterasi perbaikan mencapai batas maksimal (5 kali) namun halaman belum sepenuhnya lulus spesifikasi QA atau masih terdapat error, subagent DILARANG melompati halaman atau terus bergelung tanpa henti. Agen WAJIB merangkai laporan kegagalan krisis (*Error Digest*) yang mencerminkan detail masalah tak terselesaikan, memicu gerbang interupsi keras (`[HARD STOP]`), dan mengakhiri giliran dengan menyuguhkan laporan tersebut kepada user untuk meminta petunjuk lanjutan atau persetujuan override. BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu konfirmasi persetujuan dari user secara eksplisit sebelum melompat ke tahap berikutnya. Dilarang memanfaatkan momentum untuk meneruskan eksekusi secara mandiri.
   b. **Playwright Spec & Authentic Visual Screenshot Capture:** Setelah AI menganggap halaman sempurna, generate file pengujian Playwright berdasarkan PRD dan jalankan pengujian dengan nama `tests/<slug_tepat>.spec.ts`. **Kewajiban Rekam Bukti Visual:** Dalam skrip pengujian Playwright tersebut, Anda WAJIB menginstruksikan penangkapan gambar aktual layar peramban (*screenshot capture*) untuk penampil versi Desktop (1280x720) dan Mobile (375x667), lalu mengawetkan berkas bukti `.png` tersebut ke dalam direktori pengujian/aset.
   c. **Visual QA Review & [CRITICAL STOP - TUNGGU REVIEW USER - ZERO BYPASS]:** Sebelum menyerahkan hasil ke user, panggil subagent `qa-reviewer` untuk melakukan evaluasi visual secara langsung terhadap berkas tangkapan layar otentik dari Playwright guna memastikan kenyataan render logo asli, tata letak responsif berseri AAA, dan ketidakhadiran placeholder palsu. Tampilkan kesimpulan review dan hasil akhir halaman beserta bukti screenshot tersebut kepada user. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu user mengecek dev server dan memberikan revisi jika ada. Tunggu konfirmasi persetujuan dari user secara eksplisit sebelum melompat ke tahap berikutnya. Dilarang memanfaatkan momentum untuk meneruskan eksekusi secara mandiri.
   d. Ulangi loop untuk halaman berikutnya dari langkah 7a.

8. **Penggabungan (Integration):** Setelah semua halaman selesai dan disetujui, gabungkan navigasi antar halaman agar berfungsi sempurna di bawah pengawasan *Lenis smooth scrolling* dan animasi berlanjut.

9. **Fase SEO Validation & Debug Lokal Final**:
   a. **SEO Validation & Remediation Loop**: Panggil sub-skill `seo` (bukan `seo-validator`) untuk memverifikasi seluruh tag `<img />` dan `next/image` terbekali atribut ganda `alt` dan `title` yang kaya makna SEO spesifik brand, memeriksa kesesuaian checklist SEO internal, serta menyingkirkan gambar fiktif/rusak atau tidak relevan. Hasil analisis dicatat pada berkas `landings/<brand>/SEO-REPORT.md`. **Rute Remediasi Wajib:** Apabila `SEO-REPORT.md` mencatat adanya error, pelanggaran, atau kegagalan spesifikasi SEO, Master Orchestrator WAJIB memanggil sub-skill `debug` untuk mengeksekusi perbaikan kode secara sistematis berdasarkan catatan laporan tersebut (maksimal 3 iterasi fix loop) hingga audit `seo` menyatakan bersih (*clean PASS*) sebelum melanjutkan ke tahap debug lokal final.
   b. **Debug Lokal Final & Sanity QA**: Sebelum menyerahkan hasil akhir, wajib melakukan debug lokal dengan menjalankan build produksi secara mandiri di latar belakang:
      - Jalankan terminal: `cd landings/<brand> && npm run build` (dan verifikasi TypeScript bebas error dengan `npx tsc --noEmit`).
      - Panggil kembali `qa-reviewer` untuk melakukan uji kewarasan (*sanity test*): verifikasi logo resmi, relevansi gambar, video *Touch-Safe*, pengguliran *Lenis*, animasi partikel *Anime.js*, dan animasi gulir satu arah (unidirectional, atas ke bawah saja).

10. **[CRITICAL STOP - TUNGGU REVIEW USER - ZERO BYPASS]**: Tampilkan laporan hasil validasi SEO dan bukti keberhasilan build lokal akhir kepada user. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu konfirmasi persetujuan dari user secara eksplisit sebelum melompat ke tahap berikutnya (ke tahap deploy). Dilarang memanfaatkan momentum untuk meneruskan eksekusi secara mandiri.

11. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.

12. **Post-Deploy Debug**: Panggil `debug` untuk **Post-Deploy Debug** jika diperlukan (Maksimal 2 iterasi).

13. **Cleanup**: Setelah selesai, matikan (kill) proses dev server Node.js.
