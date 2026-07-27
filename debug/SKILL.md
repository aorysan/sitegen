---
name: debug
description: QA Otomatis, Visual Debugging (Puppeteer), dan Analisis Performa/SEO (Lighthouse).
---

# Sitegen Debug

Skill ini dipanggil setelah server berjalan. Jalankan QA otomatis dalam 2 tahap wajib:

## Tahap 1: Visual Debugging (Puppeteer)
1. Jalankan skrip screenshot crawler:
   `node .agents/skills/sitegen/scripts/render.js http://localhost:3000 / /about /services /portfolio /blog /careers /contact`
2. **STRICT AUTO-FAIL**: Skrip Puppeteer di atas WAJIB menangkap dan memunculkan error hard-fail jika mendeteksi:
   - Penggunaan Emoji di dalam DOM.
   - Adanya class TailwindCSS.
   - Tag `html` atau `body` tidak memiliki `overflow-x: hidden` dan `max-width: 100vw`.
   - Elemen `<SwipeableCards>` (container flex) yang tidak memiliki `flex-shrink: 0` pada *children*-nya atau gagal menjadi `flex-direction: row` di mobile.
   - Tag `<img>` atau `<Image>` yang tidak memiliki `alt`, `title`, atau tidak responsif (`max-width: 100%`).
   - 404 network error pada pemuatan gambar.
3. Periksa log console untuk error React/Next.js (hydration, dll) dan segera perbaiki kode.
4. Periksa semua gambar screenshot di folder `landings/<brand>/.preview/`.
5. Jika ada layout rusak (overflow, gambar terpotong, tipografi error, atau SwipeableCards rusak), perbaiki komponen lalu **ulangi skrip screenshot** sampai 100% sempurna.

## Tahap 2: Performance & SEO (Lighthouse)
1. Setelah Tahap 1 hijau sempurna, jalankan Lighthouse CLI terpisah:
   `npx lighthouse http://localhost:3000 --output html --output-path ./landings/<brand>/.preview/lighthouse-report.html --view`
2. Analisis skor *Performance*, *Accessibility*, *Best Practices*, dan *SEO*.
3. Lakukan penyesuaian kode (optimasi gambar, aria-labels, dll) untuk meningkatkan skor, lalu jalankan ulang Lighthouse jika perlu.
4. Baca file `landings/<brand>/SEO-REPORT.md` dari skill `seo`, perbaiki seluruh masalah meta tag, SOP keyword, dan checklist SEO hingga 100% patuh.

## Tahap 3: Debugging Mandiri
1. Lakukan pengecekan terhadap kepatuhan aturan `generator`. Agen **WAJIB memverifikasi secara manual**:
   - **Lenis Smooth Scroll**: Pastikan scroll berjalan mulus dan tidak ada error Lenis di console.
   - **Auto-slide Carousel**: Pastikan list dengan 10+ item otomatis bergeser tanpa interaksi.
   - **Schema.org JSON-LD**: Pastikan metadata JSON-LD valid dan sesuai tipe halaman (Beranda, Layanan, Blog, dll).
   - **Fidelitas Konten PRD**: Pastikan teks persuasi dari PRD tidak hilang atau diganti dengan *lorem ipsum*.
   - **Blog Backlink**: Pastikan halaman `/blog` memuat tepat 3 artikel backlink dengan gambar clickable.
   - **Header Mobile**: Pastikan burger menu berupa 3 garis utuh dan memiliki *safe-area padding*.
2. Buka website di browser atau baca source code-nya secara menyeluruh.
3. Jika ditemukan bug atau ketidaksesuaian, gunakan prinsip `systematic-debugging` (panggil skill `/systematic-debugging` bila perlu) untuk mencari akar masalah.
4. Lakukan iterasi perbaikan secara mandiri hingga **0 bug** tersisa sebelum mengakhiri proses.
