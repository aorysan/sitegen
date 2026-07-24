---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat. Untuk setiap langkah, panggil sub-skill yang sesuai dan tunggu hingga selesai sebelum melanjutkan ke langkah berikutnya.

1. Panggil `intake` untuk mengekstrak data PDF (teks, gambar, warna).
2. (Langkah Eksternal) Pengguna atau rekan akan memberikan rencana website (site plan). Tunggu jika belum tersedia.
3. Panggil `generator` untuk membuat struktur Next.js dan menghasilkan kode.
4. Panggil `seo` untuk memeriksa situs yang dihasilkan terhadap aturan SEO.
5. Panggil `debug` untuk menjalankan QA, debugging visual dengan Puppeteer, dan perbaikan SEO.
6. Panggil `deploy` untuk menyebarkan (deploy) situs ke Vercel.
