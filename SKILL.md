---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat.

1. **Intake**: Panggil `intake` untuk mengekstrak data PDF/User ke `landings/<brand>/intake_data.md`.
2. **Brainstorming [CRITICAL STOP - TUNGGU REVIEW USER]**:
   a. Berdasarkan data hasil intake, berikan saran kepada user apa saja yang bagus untuk dimasukkan ke PRD nantinya. Lakukan brainstorming secara natural dengan user.
   b. **TUNGGU BALASAN USER**. Jangan buat PRD global sebelum user setuju dengan arah desain dan konten.
3. **Global Design**: Panggil sub-skill `planner` mode=global (dan `ui-ux-pro-max` jika perlu) untuk menghasilkan `PLAN-GLOBAL.md`.
4. **Iterasi Per Halaman (Lakukan berurutan untuk setiap halaman dari Beranda hingga akhir):**
   Untuk setiap halaman:
   a. **Detail Halaman (PRD):** Panggil `planner` mode=page untuk halaman target.
   b. **Review QA:** Panggil `qa-reviewer` untuk menilai `PLAN-<halaman>.md`.
   c. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan detail halaman (PRD) kepada user. Tampilkan dalam format rapi atau link ke dokumen agar mudah dibaca. **TUNGGU BALASAN USER.** Jika ada revisi, perbaiki detail halamannya. JANGAN LANJUT ke generate sebelum user setuju.
   d. **Generate Halaman:** Setelah detail disetujui, panggil `generator` khusus untuk membangun halaman tersebut ke dalam project Next.js.
   e. **Debugging Mandiri:** Lakukan debugging mandiri (cek error console, UI/UX consistency, compliance to PRD). Jika ada bug atau tidak sesuai PRD, perbaiki secara mandiri maksimal 3 iterasi.
   f. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Tampilkan hasil halaman yang sudah di-generate ke user (berikan link screenshot atau instruksi cek localhost). **TUNGGU BALASAN USER.** Jika tidak sesuai kemauan user, perbaiki (generate ulang/edit kode), debugging mandiri lagi, dan tampilkan ulang.
   g. Lanjut ke halaman berikutnya, ulangi dari langkah 4a.
5. **Penggabungan (Integration):** Setelah semua halaman di-generate dan disetujui satu per satu, gabungkan (merge PRD jika perlu) dan pastikan navigasi antar halaman berfungsi sempurna.
6. **SEO Validation:** Panggil `seo` untuk validasi SEO sebelum deploy.
7. **Debug Lokal Final:** Jalankan dev server di background: `cd landings/<brand> && npm run dev -- -p 3000`. Panggil `debug` untuk QA menyeluruh (Lighthouse & final Puppeteer).
8. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan keseluruhan website ke user untuk persetujuan akhir deploy.
9. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.
10. **Post-Deploy Debug**: Panggil `debug` untuk Post-Deploy Debug. Jika ada error produksi, perbaiki lokal dan re-deploy.
11. **Cleanup**: Setelah selesai, matikan proses Node.js di port 3000 HANYA jika itu milik project ini.
