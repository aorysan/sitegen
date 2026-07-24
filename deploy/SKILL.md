---
name: deploy
description: Push kode ke GitHub dan deploy proyek Next.js ke Vercel dengan aman.
---

# Sitegen Deploy

Jalankan langkah-langkah berikut secara berurutan saat diminta melakukan deployment:

1. **Amankan Rahasia (Gitignore)**
   - Buka atau buat file `.gitignore` di root proyek.
   - Pastikan entri berikut ada: `.env`, `.env.local`, `.env.*`, dan `.vercel`.
   - Jika belum ada, tambahkan.

2. **Push ke GitHub**
   - Jalankan `git add .`
   - Jalankan `git commit -m "Deploy to Vercel"`
   - Jalankan `git push origin main` (atau nama branch utama yang sedang aktif).

3. **Inisialisasi & Koneksi Vercel**
   - Pastikan environment variable `VERCEL_TOKEN` tersedia di sistem.
   - Jalankan: `npx vercel link --yes --token %VERCEL_TOKEN%` (di Windows gunakan `%VERCEL_TOKEN%`, di Unix `$VERCEL_TOKEN`)
   - Jalankan: `npx vercel git connect --yes --token %VERCEL_TOKEN%`

4. **Deploy Produksi Awal**
   - Jalankan: `npx vercel --prod --yes --token %VERCEL_TOKEN%`
   - Ambil URL produksi yang dihasilkan dari output, dan berikan ke pengguna.
