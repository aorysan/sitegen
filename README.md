# Sitegen Master Flow

Sitegen adalah master orkestrator berbasis agen AI (AI Agent) untuk membangun website secara komprehensif dari awal (ekstraksi data) hingga akhir (deployment). Sistem ini dirancang menggunakan arsitektur modular (plugin-based) di mana setiap fungsi utama ditangani oleh sub-skill terpisah yang dipanggil secara berurutan.

## 🚀 Alur Kerja (Master Workflow)

Alur kerja Sitegen terdiri dari tahapan-tahapan yang terstruktur dan wajib dijalankan secara berurutan:

1. **Intake (`/intake`)**
   Mengekstrak data mentah seperti *company profile* PDF (teks, gambar, warna, brand) dan menyimpannya ke `landings/<brand>/intake_data.md`.
2. **Perencanaan (`/planner`)**
   Membuat PRD (Product Requirements Document) berdasarkan hasil intake yang telah diekstrak, mendefinisikan struktur halaman dan kebutuhan fungsional.
3. **QA & Review PRD (`/qa-reviewer`)**
   Melakukan audit terhadap PRD. Jika skor kelayakan di bawah 90, dokumen akan dikembalikan ke `planner` untuk direvisi hingga mencapai standar lulus (PASS, skor >= 90).
4. **Persetujuan Pengguna (User Approval)**
   *Tahap tunggu (Blocking).* PRD akan ditampilkan kepada pengguna. Proses tidak akan masuk ke tahap pemrograman sebelum mendapat persetujuan eksplisit dari pengguna.
5. **Pembuatan Kode (`/generator`)**
   Membuat struktur aplikasi **Next.js** dan men-generate seluruh kode sumber berdasarkan spesifikasi dalam PRD yang disetujui.
6. **Per-Page Playwright Testing (`/debug`)**
   Membuat test Playwright (`.spec.ts`) otomatis per halaman berdasarkan PRD, menjalankannya secara headless, dan melakukan *auto-fix* hingga lolos sebelum lanjut ke halaman berikutnya.
7. **SEO Validation (`/seo`)**
   Memvalidasi situs yang baru dibuat terhadap checklist SEO teknikal, performa, dan relevansi konten berdasarkan standar eksternal, lalu membuat laporan status optimasinya.
8. **Debugging & QA Final (`/debug`)**
   Menjalankan pengetesan komprehensif: visual debugging, analisis Lighthouse, injeksi perbaikan SEO, serta melakukan iterasi *Debugging Mandiri*. Tujuannya agar tidak ada satupun *bug* layout, hydration, atau responsivitas yang tersisa.
9. **Deployment (`/deploy`)**
   Mendeploy situs secara otomatis ke **Vercel** dan memberikan *repository* GitHub serta URL Vercel yang sudah live kepada pengguna.

## 📁 Struktur Direktori Repositori

- `intake/` — Modul untuk ekstraksi dan konsolidasi data aset (PDF/brand).
- `planner/` — Modul perumus arsitektur aplikasi (pembuat PRD).
- `qa-reviewer/` — Modul quality control dokumen perencanaan.
- `generator/` — Mesin pembuat kode berbasis Next.js.
- `seo/` — Modul audit Search Engine Optimization.
- `debug/` — Sistem iteratif perbaikan masalah kode (UI/UX, hydration, & error).
- `deploy/` — Integrasi continuous deployment ke Vercel.
- `scripts/` — Skrip utilitas pelengkap.
- `SKILL.md` — Inti instruksi untuk orkestrator utama agar memahami cara merantai sub-skill di atas.

## 🛠 Cara Penggunaan

Cukup berikan agen (AI) instruksi untuk memulai pembuatan website melalui kerangka kerja Sitegen. 
Contoh instruksi:
> *"Tolong buatkan website untuk brand [Nama Brand], aset company profile ada di direktori X. Gunakan alur master Sitegen."*

Agen akan secara otomatis memuat `SKILL.md` utama, membaca daftar periksa, dan melimpahkan (delegate) pekerjaan ke masing-masing sub-skill step-by-step.
