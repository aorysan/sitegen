---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat.

1. Panggil `intake` untuk mengekstrak data PDF ke `landings/<brand>/intake_data.md`.

2. **STEP 0 — Global Planning Loop:**
   a. Panggil `planner` mode=global untuk membuat `landings/<brand>/planning/PLAN-GLOBAL.md`.
   b. Panggil `qa-reviewer` mode=global untuk me-review PLAN-GLOBAL. 
      Jika skor < 90, minta `planner` revisi (max 2 putaran). 
      Jika setelah 2 putaran masih < 90, eskalasi ke user.
   c. **[TUNGGU REVIEW USER]** Tampilkan PLAN-GLOBAL.md + QA-REVIEW-GLOBAL.md sebagai artifact yang bisa di-download.
      Minta user review di Notion. Tunggu user ketik 'approved' atau 'revisi: [catatan]'.
      Jika revisi, ulangi dari langkah 2a dengan catatan user.

3. **STEP 1-7 — Page-by-Page Planning Loop:**
   Untuk setiap halaman dalam urutan: Beranda, Layanan, About, Portofolio, Kontak, Blog, Karir:
   a. Panggil `planner` mode=page, halaman=<nama> untuk membuat `PLAN-<halaman>.md`.
      Context: intake_data.md + PLAN-GLOBAL.md.
   b. Panggil `qa-reviewer` mode=page untuk me-review PLAN-<halaman>.
      Jika skor < 90, minta `planner` revisi (max 2 putaran).
      Jika setelah 2 putaran masih < 90, eskalasi ke user.
   c. **[TUNGGU REVIEW USER]** Tampilkan PLAN-<halaman>.md + QA-REVIEW-<halaman>.md.
      Tunggu user ketik 'approved' atau 'revisi: [catatan]'.
      Jika revisi, ulangi dari langkah 3a untuk halaman tersebut.
   d. Lanjut ke halaman berikutnya.

4. **MERGE — Gabung PRD Final:**
   Panggil `planner` mode=merge untuk menggabungkan PLAN-GLOBAL.md + semua PLAN-<halaman>.md
   menjadi `landings/<brand>/PRD.md` dengan format yang kompatibel dengan generator.

5. Panggil `generator` untuk membuat struktur Next.js berdasarkan PRD.md.
6. Panggil `seo` untuk validasi SEO.
7. Panggil `debug` untuk visual debugging & Lighthouse.
8. Panggil `deploy` untuk deploy ke Vercel.
9. Panggil `debug` untuk post-deploy verification.
