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
3. **Planning per Halaman**: Untuk setiap halaman (Beranda, Layanan, dll), panggil `planner` mode=page untuk membuat `PLAN-<halaman>.md` berdasar global plan.
4. **Review Plan**: Panggil `qa-reviewer` dan minta user mereview plan tiap halaman. Jika dianggap kurang oleh user, ulangi ke planning.
5. **Generate & Polish per Halaman**:
   Untuk setiap halaman:
   a. Panggil `generator` untuk membuat struktur/kode satu halaman.
   b. Panggil `impeccable` untuk memoles UI jika secara visual kurang bagus.
   c. Panggil `systematic-debugging` jika ada error saat generate.
   d. Minta review user untuk halaman tersebut, lalu lanjut ke halaman berikutnya.
6. **Global Debug & SEO**:
   a. Panggil `systematic-debugging` secara menyeluruh mandiri jika ada fitur/navigasi antar-halaman yang rusak (tidak sesuai plan).
   b. Panggil `seo` untuk validasi SEO sebelum deploy.
7. **Deploy**: Deploy web (misal ke Vercel) dan pastikan live.
