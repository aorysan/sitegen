---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat.

1. **Intake**: Panggil `intake` untuk mengekstrak data PDF/User ke `landings/<brand>/intake_data.md`.
2. **Brainstorming [CRITICAL STOP - TUNGGU REVIEW USER]**:
   a. Berdasarkan data hasil intake, berikan saran kepada user apa saja yang bagus untuk dimasukkan ke PRD nantinya. Lakukan brainstorming secara natural dengan user.
   b. **ATURAN WAJIB (HARD STOP)**: Anda WAJIB mengakhiri respons Anda di sini. JANGAN memanggil tool apa pun. JANGAN lanjut ke Langkah 3. Tunggu user setuju.
3. **Global Design**: Panggil sub-skill `planner` mode=global (dan `ui-ux-pro-max` jika perlu) untuk menghasilkan `PLAN-GLOBAL.md`. Pastikan juga untuk menginisialisasi Playwright di dalam project Next.js (misal: `npm init playwright@latest --yes` dan `npx playwright install --with-deps`).
4. **Iterasi Per Halaman (Lakukan berurutan untuk setiap halaman dari Beranda hingga akhir):**
   Untuk setiap halaman:
   a. **Detail Halaman (PRD):** Panggil `planner` mode=page untuk halaman target.
   b. **Review QA:** Panggil `qa-reviewer` untuk menilai `PLAN-<halaman>.md`.
   c. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan detail halaman (PRD) kepada user. **HARD STOP**: Anda WAJIB berhenti bekerja dan menunggu balasan user. JANGAN LANJUT ke generate sebelum user setuju.
   d. **Generate Halaman:** Setelah detail disetujui, panggil `generator` khusus untuk membangun halaman tersebut ke dalam project Next.js.
   e. **Generate Playwright Spec:** Buat file test `tests/<halaman>.spec.ts` yang berisi validasi End-to-End berdasarkan PRD.
   f. **Debugging Mandiri (Test):** Jalankan test Playwright (`npx playwright test tests/<halaman>.spec.ts`). Jika gagal karena browser/Chrome tidak ada, berikan peringatan dan minta user cek manual. Jika ada bug UI/UX, perbaiki kode.
   g. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Tampilkan hasil halaman. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL. Tunggu user mengecek localhost:3000 dan memberikan persetujuan. JANGAN lanjut ke halaman berikutnya.
   h. Lanjut ke halaman berikutnya, ulangi dari langkah 4a.
5. **Penggabungan (Integration):** Setelah semua halaman di-generate dan disetujui satu per satu, gabungkan (merge PRD jika perlu) dan pastikan navigasi antar halaman berfungsi sempurna.
6. **SEO Validation:** Panggil `seo` untuk validasi SEO sebelum deploy.
7. **Debug Lokal Final:** Jalankan dev server di background: `cd landings/<brand> && npm run dev -- -p 3000`. Panggil `debug` untuk QA menyeluruh (Lighthouse & final Puppeteer).
8. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan keseluruhan website ke user untuk persetujuan akhir. **HARD STOP**: BERHENTI TOTAL. Jangan panggil tool deploy sebelum user bilang "Ya/Deploy".
9. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.
10. **Post-Deploy Debug**: Panggil `debug` untuk Post-Deploy Debug. Jika ada error produksi, perbaiki lokal dan re-deploy.
11. **Cleanup**: Setelah selesai, matikan proses Node.js di port 3000 HANYA jika itu milik project ini.
