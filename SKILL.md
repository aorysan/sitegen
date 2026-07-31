---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat.

1. **Intake**: Panggil `intake` untuk mengekstrak data PDF ke `landings/<brand>/intake_compro.md`.

2. **Research**: Panggil sub-skill `research` untuk menghasilkan 2 dokumen riset:
   - `landings/<brand>/planning/PLAN-USER-NEEDS.md`: analisis pain points, jobs-to-be-done, objection & counter-messaging, FAQ pra-pembelian, user journey, dan trigger pembelian target user
   - `landings/<brand>/planning/PLAN-COMPETITOR.md`: analisis min. 3 kompetitor meliputi positioning, fitur & section website, tone of voice, keyword SEO, dan gap analysis
   
   Sumber data: inferensi dari `intake_compro.md` **+** web search otomatis berdasarkan industri yang terdeteksi.

3. **Brainstorming, Rekonsiliasi & Global Design**:
   a. Berdasarkan data riset, panggil sub-skill `brainstorming` (Visi, Misi, Tema Font, UI/UX). Pastikan `PLAN-USER-NEEDS.md` dan `PLAN-COMPETITOR.md` tersedia sebagai konteks agar diskusi berbasis data riset. Simpan masukan user sebagai `landings/<brand>/user_preferences.md`.
   b. Lakukan rekonsiliasi dengan menggabungkan `intake_compro.md` dan `user_preferences.md` menjadi `landings/<brand>/final_intake.md`.
   c. **ATURAN WAJIB (HARD STOP)**: Anda WAJIB memperlihatkan isi `final_intake.md` ke user. Berhenti bekerja dan JANGAN memanggil tool apa pun. Tunggu user setuju sebelum lanjut ke langkah berikutnya.
   d. Setelah disetujui, panggil `ui-ux-pro-max` untuk menentukan warna, font, dan komponen global. Hasilkan `PLAN-GLOBAL.md`. Pastikan juga untuk menginisialisasi Playwright di dalam project Next.js (misal: `npm init playwright@latest --yes` dan `npx playwright install --with-deps`).
   e. Segera setelah `PLAN-GLOBAL.md` selesai, panggil `planner` mode=design-system untuk menghasilkan `PLAN-DESIGN-SYSTEM.md`.

4. **SDD Plan Generation**: Buat rencana implementasi utama (`landings/<brand>/planning/SDD-PAGES-PLAN.md`) yang mendetailkan pembuatan semua halaman (dari `PAGES-LIST.md`) sebagai task terpisah.

5. **Execute SDD (Subagent-Driven Development)**: Panggil sub-skill `subagent-driven-development` lokal (dari folder `subagent-driven-development` di dalam sitegen) menggunakan `SDD-PAGES-PLAN.md`.
    - SDD akan memanggil subagent `generator` untuk setiap task halaman.
    - SDD akan memanggil subagent `qa-reviewer` untuk memverifikasi halaman terhadap PRD.
    - SDD akan menangani fix loop secara otomatis (maksimal 5 iterasi) menggunakan `impeccable` atau `systematic-debugging`.

6. **Playwright E2E & Final QA**: Generate file test `tests/<halaman>.spec.ts` untuk memvalidasi secara End-to-End berdasarkan PRD setiap halaman, dan jalankan secara bersamaan.

7. **SEO Validation**: Panggil skill SEO eksternal (dari github.com/affaan-m/everything-claude-code) untuk validasi struktur SEO terhadap `final_intake.md` dan PRD sebelum deploy.

8. **Debug Lokal Final**: Jalankan dev server di background dengan perintah `cd landings/<brand> && npm run dev` (biarkan Next.js memilih port secara otomatis). Baca output terminal untuk menentukan port yang aktif (misal: 3000, 3001, dst.) yang digunakan untuk Playwright testing dan visual debugging. Setelah server berjalan, panggil `debug` untuk menjalankan visual debugging, analisis Lighthouse, perbaikan SEO, dan **Debugging Mandiri**. Pastikan tidak ada bug tersisa.

9. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan keseluruhan website ke user untuk persetujuan akhir. **HARD STOP**: BERHENTI TOTAL. Jangan panggil tool deploy sebelum user bilang "Ya/Deploy".

10. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.

11. **Post-Deploy Debug**: Panggil `debug` untuk **Post-Deploy Debug**. Jika bug/error muncul, perbaiki lokal lalu re-deploy (Maksimal 2 iterasi). Jika masih error, laporkan ke user.

12. **Cleanup**: Setelah semua proses selesai, matikan (kill) proses dev server Node.js yang berjalan pada port aktif yang digunakan sebelumnya.
