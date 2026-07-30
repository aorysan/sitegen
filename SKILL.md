---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat.

1. **Intake**: Panggil `intake` untuk mengekstrak data PDF ke `landings/<brand>/intake_compro.md`.
2. **Brainstorming & Rekonsiliasi Intake [CRITICAL STOP - TUNGGU REVIEW USER]**:
   a. Berdasarkan data hasil intake, lakukan brainstorming (Visi, Misi, Tema Font, UI/UX). Simpan masukan user sebagai `landings/<brand>/user_preferences.md`.
   b. Lakukan rekonsiliasi dengan menggabungkan `intake_compro.md` dan `user_preferences.md` menjadi `landings/<brand>/final_intake.md`.
   c. **ATURAN WAJIB (HARD STOP)**: Anda WAJIB memperlihatkan isi `final_intake.md` ke user. Berhenti bekerja dan JANGAN memanggil tool apa pun. Tunggu user setuju sebelum lanjut ke Langkah 3.
3. **Global Design**: Panggil sub-skill `planner` mode=global (dan `ui-ux-pro-max` jika perlu) untuk menghasilkan `PLAN-GLOBAL.md`. Pastikan juga untuk menginisialisasi Playwright di dalam project Next.js (misal: `npm init playwright@latest --yes` dan `npx playwright install --with-deps`).
4. **Iterasi Per Halaman (Lakukan berurutan untuk setiap halaman dari Beranda hingga akhir):**
   Untuk setiap halaman:
   a. **Detail Halaman (PRD):** Panggil `planner` mode=page untuk halaman target.
   b. **Review QA:** Panggil `qa-reviewer` untuk menilai `PLAN-<halaman>.md`.
   c. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan detail halaman (PRD) kepada user. **HARD STOP**: Anda WAJIB berhenti bekerja dan menunggu balasan user. JANGAN LANJUT ke generate sebelum user setuju.
   d. **Persiapan Visual:** WAJIB panggil `ui-ux-pro-max` dan `impeccable` untuk mendapatkan pedoman layout dan animasi yang memukau.
   e. **Generate Halaman:** Setelah persiapan visual selesai, panggil `generator` khusus untuk membangun halaman tersebut ke dalam project Next.js.
   f. **Generate Playwright Spec:** Buat file test `tests/<halaman>.spec.ts` yang berisi validasi End-to-End berdasarkan PRD.
   g. **Debugging Mandiri (Test):** Jalankan test Playwright (`npx playwright test tests/<halaman>.spec.ts`). Jika gagal karena browser/Chrome tidak ada, berikan peringatan dan minta user cek manual. Jika ada bug UI/UX, perbaiki kode.
   h. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Tampilkan hasil halaman. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL. Tunggu user mengecek localhost:3000 dan memberikan persetujuan. JANGAN lanjut ke halaman berikutnya.
   i. Lanjut ke halaman berikutnya, ulangi dari langkah 4a.
5. **Penggabungan (Integration):** Setelah semua halaman di-generate dan disetujui satu per satu, gabungkan (merge PRD jika perlu) dan pastikan navigasi antar halaman berfungsi sempurna.
6. **SEO Validation:** Panggil sub-skill `seo` untuk melakukan audit SEO (Crawlability, Indexability, Performance, Structured Data) dan memvalidasi struktur SEO terhadap `final_intake.md` dan PRD sebelum deploy. Tulis hasilnya ke `landings/<brand>/SEO-REPORT.md`.
7. **Debug Lokal Final:** Jalankan dev server di background: `cd landings/<brand> && npm run dev -- -p 3000`. Panggil `debug` untuk QA menyeluruh (Lighthouse & final Puppeteer).
8. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan keseluruhan website ke user untuk persetujuan akhir. **HARD STOP**: BERHENTI TOTAL. Jangan panggil tool deploy sebelum user bilang "Ya/Deploy".
9. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.
10. **Post-Deploy Debug**: Panggil `debug` untuk Post-Deploy Debug. Jika ada error produksi, perbaiki lokal dan re-deploy.
11. **Cleanup**: Setelah selesai, matikan proses Node.js di port 3000 HANYA jika itu milik project ini.
