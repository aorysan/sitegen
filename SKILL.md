---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat. Untuk setiap langkah, panggil sub-skill yang sesuai dan tunggu hingga selesai sebelum melanjutkan ke langkah berikutnya.

1. Panggil `intake` untuk mengekstrak data PDF (teks, gambar, warna) ke `landings/<brand>/intake_data.md`.
2. Panggil `planner` untuk membuat PRD (Product Requirements Document) berdasarkan hasil intake.
3. Panggil `qa-reviewer` untuk me-review PRD. Jika skor < 90, minta `planner` melakukan revisi hingga PASS (skor >= 90).
4. **[TUNGGU REVIEW USER]** Tampilkan PRD ke pengguna dan minta persetujuan. JANGAN lanjut sebelum pengguna menyetujui. Jika pengguna meminta revisi, ulangi langkah 2.
5. Panggil `generator` untuk membuat struktur Next.js dan menghasilkan kode berdasarkan PRD yang disetujui.
6. Panggil `seo` untuk memvalidasi situs terhadap SOP Checklist SEO dan menghasilkan laporan.
7. Panggil `debug` untuk menjalankan visual debugging, analisis Lighthouse, perbaikan SEO, dan **Debugging Mandiri**. Pastikan tidak ada bug tersisa.
8. Panggil `deploy` untuk menyebarkan situs ke Vercel. Tunggu hingga proses build selesai.
9. Panggil `debug` untuk **Post-Deploy Debug**: Kunjungi URL Vercel live. Verifikasi bebas error (Console/UI). Jika bug/error muncul, perbaiki lokal lalu re-deploy. Jika aman, baru tampilkan URL final ke pengguna.
