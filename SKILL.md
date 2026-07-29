---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat.

1. **Intake**: Panggil `intake` untuk mengekstrak data PDF/User ke `landings/<brand>/intake_data.md`.
2. **Brainstorming & Global Design**:
   a. Panggil sub-skill `brainstorming` untuk diskusi dengan user dan menentukan rencana global berdasarkan intake.
   b. Panggil `ui-ux-pro-max` untuk menentukan warna, font, dan komponen global. Hasilkan `PLAN-GLOBAL.md`.
3. **Planning per Halaman**: Untuk setiap halaman (WAJIB 7 HALAMAN: Beranda, Layanan, About, Portofolio, Kontak, Blog, Karir), panggil `planner` mode=page untuk membuat `PLAN-<halaman>.md` berdasar global plan.
4. **Review Plan**: Panggil `qa-reviewer` dan tampilkan hasil plan per halaman kepada user. **[CRITICAL STOP]**: Anda WAJIB MENGHENTIKAN EKSEKUSI di titik ini dan MENUNGGU konfirmasi/persetujuan balasan dari user secara eksplisit. Jangan panggil tools atau lanjut ke langkah berikutnya tanpa izin user. Jika user meminta revisi, ulangi ke planning.
5. **Generate & Polish per Halaman**:
   Untuk setiap halaman:
   - **Check Assets**: Periksa folder `public/assets/` untuk mengidentifikasi logo resmi (`extracted_img_*`, `logo.*`, dll).
   - **Header & Footer**: Pasang logo resmi hasil ekstraksi menggunakan `next/image` alih-alih teks placeholder.
   a. Panggil `generator` untuk membuat struktur/kode satu halaman.
   b. Panggil `impeccable` untuk memoles UI jika secara visual kurang bagus.
   c. Panggil `systematic-debugging` jika ada error saat generate.
   d. Tampilkan halaman tersebut kepada user. **[CRITICAL STOP]**: Anda WAJIB MENGHENTIKAN EKSEKUSI dan TUNGGU balasan persetujuan user di sini. Jangan panggil tools apa pun dan jangan memproses halaman berikutnya sebelum user memberikan izin (misal: "Lanjut").
6. **SEO**: Panggil `seo` untuk validasi SEO sebelum deploy.
7. **Debug Lokal**: Jalankan dev server di background dengan perintah `cd landings/<brand> && npm run dev -- -p 3000`. Setelah server berjalan, panggil `debug` untuk menjalankan visual debugging, analisis Lighthouse, perbaikan SEO, dan **Debugging Mandiri**. Pastikan tidak ada bug tersisa.
8. **Deploy**: Panggil `deploy` untuk deploy web (misal ke Vercel) dan pastikan live.
9. **Post-Deploy Debug**: Panggil `debug` untuk **Post-Deploy Debug**. Jika bug/error muncul, perbaiki lokal lalu re-deploy (Maksimal 2 iterasi). Jika masih error, laporkan ke user.
10. **Cleanup**: Setelah semua proses selesai, cari dan matikan (kill) proses Node.js yang berjalan di port 3000 (contoh: `npx kill-port 3000`).
