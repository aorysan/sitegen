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
3. Periksa apakah ada Swipeable Cards yang gagal menampilkan data, tidak sesuai dengan SOP atau rusak saat mode mobile/tablet view.
4. Periksa semua gambar screenshot di folder `landings/<brand>/.preview/`.
5. Jika ada layout rusak (overflow, gambar terpotong, tipografi error, atau SwipeableCards rusak), perbaiki komponen lalu **ulangi skrip screenshot** sampai 100% sempurna.

## Tahap 2: Performance & SEO (Lighthouse)
1. Setelah Tahap 1 hijau sempurna, jalankan Lighthouse CLI terpisah:
   `npx -y lighthouse http://localhost:3000 --output html --output-path ./landings/<brand>/.preview/lighthouse-report.html --view`
2. Analisis skor *Performance*, *Accessibility*, *Best Practices*, dan *SEO*.
3. Lakukan penyesuaian kode (optimasi gambar, aria-labels, dll) untuk meningkatkan skor, lalu jalankan ulang Lighthouse jika perlu.
4. Baca file `landings/<brand>/SEO-REPORT.md` dari skill `seo`, perbaiki seluruh masalah meta tag, SOP keyword, dan checklist SEO hingga 100% patuh.

## Tahap 3: Debugging Mandiri
1. Lakukan pengecekan terhadap kepatuhan aturan `generator`, seperti: apakah ada list dengan 10+ item yang gagal menjadi Auto-slide Carousel? Apakah ada gambar yang gagal muat (hanya menampilkan `alt`)?
2. Buka website di browser atau baca source code-nya secara menyeluruh.
3. Jika ditemukan bug atau ketidaksesuaian, gunakan prinsip `systematic-debugging` secara internal (DILARANG menggunakan *slash command* seperti `/systematic-debugging`).
4. Lakukan iterasi perbaikan secara mandiri **maksimal 3 kali putaran**. Jika setelah 3 kali iterasi masih terdapat bug sisa yang membandel atau skor Lighthouse mentok di angka tinggi (misal 90+), HENTIKAN proses debugging, buat laporan, dan beri tahu pengguna untuk dilanjutkan secara manual.
