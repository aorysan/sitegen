---
name: debug
description: QA Otomatis, Visual Debugging (Puppeteer), dan Analisis Performa/SEO (Lighthouse).
---

# Sitegen Debug

Skill ini dipanggil setelah server berjalan. Jalankan QA otomatis dalam 2 tahap wajib:

## Tahap 1: Visual Debugging (Puppeteer)
1. Jalankan skrip screenshot crawler:
   `node .agents/skills/sitegen/scripts/render.js http://localhost:3000 / /about /services /portfolio /blog /careers /contact`
2. Periksa log console untuk error React/Next.js (hydration, dll) dan segera perbaiki kode.
3. Periksa semua gambar screenshot di folder `landings/<brand>/.preview/`.
4. Jika ada layout rusak (overflow, SwipeableCards rusak di mobile, gambar terpotong), perbaiki komponen lalu **ulangi skrip screenshot (loop)** sampai 100% sempurna.

## Tahap 2: Performance & SEO (Lighthouse)
1. Setelah Tahap 1 hijau sempurna, jalankan Lighthouse CLI terpisah:
   `npx lighthouse http://localhost:3000 --output html --output-path ./landings/<brand>/.preview/lighthouse-report.html --view`
2. Analisis skor *Performance*, *Accessibility*, *Best Practices*, dan *SEO*.
3. Lakukan penyesuaian kode (optimasi gambar, aria-labels, dll) untuk meningkatkan skor, lalu jalankan ulang Lighthouse jika perlu.
4. Tinjau kembali masalah dari skill `seo` (meta tag, SOP keyword) untuk kepatuhan 100%.
