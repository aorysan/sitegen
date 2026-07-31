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

4. **Fase Persiapan Batch (PRD & Visual):**
   a. **Buat PRD Semua Halaman:** Baca `landings/<brand>/planning/PAGES-LIST.md`. Panggil sub-skill `planner` mode=page untuk men-generate PRD (`PLAN-<halaman>.md`) untuk **semua** halaman yang terdaftar sekaligus.
   b. **Review QA PRD:** Panggil `qa-reviewer` untuk menilai kelayakan semua `PLAN-<halaman>.md` secara internal.
   c. **Persiapan Visual & Aset:** Periksa folder `public/assets/` untuk logo. Panggil `ui-ux-pro-max` dan `impeccable` untuk mendapatkan pedoman layout dan animasi yang memukau.
   d. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan semua PRD yang telah dibuat dan konsep visual kepada user. **HARD STOP**: Anda WAJIB berhenti bekerja dan menunggu persetujuan user sebelum lanjut.

5. **Fase Eksekusi Halaman (Hybrid SDD Iteration):**
   Lakukan loop berurutan untuk *setiap halaman* dari `PAGES-LIST.md`:
   a. **AI-to-AI SDD Loop:**
      - Panggil subagent `generator` khusus untuk membangun halaman tersebut ke dalam project Next.js berdasarkan PRD-nya. Generator WAJIB membaca pedoman visual dan `PLAN-DESIGN-SYSTEM.md`.
      - Setelah selesai, panggil subagent `qa-reviewer` untuk mengecek hasil kode terhadap PRD dan best practices.
      - Jika ada bug, UI kurang memukau, atau tidak sesuai PRD, biarkan subagent saling berkoordinasi: panggil ulang `generator` (atau `systematic-debugging` / `impeccable`) untuk memperbaikinya secara otomatis. Batasi maksimal 5 iterasi (fix loop) tanpa interupsi user.
   b. **Playwright Spec:** Setelah AI menganggap halaman sempurna, generate test `tests/<halaman>.spec.ts` berdasarkan PRD dan jalankan.
   c. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Tampilkan hasil akhir halaman tersebut kepada user. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL. Tunggu user mengecek dev server (misal `localhost:3000`) dan memberikan persetujuan atau revisi. JANGAN lanjut ke halaman berikutnya sebelum disetujui.
   d. Ulangi loop untuk halaman berikutnya dari langkah 5a.

6. **Penggabungan (Integration):** Setelah semua halaman selesai dan disetujui, gabungkan navigasi antar halaman agar berfungsi sempurna.

7. **SEO Validation & Debug Lokal Final**:
   a. Panggil skill SEO eksternal (dari github.com/affaan-m/everything-claude-code) untuk validasi struktur SEO terhadap `final_intake.md` dan PRD.
   b. Jalankan dev server di background (`cd landings/<brand> && npm run dev`), lalu panggil `debug` untuk visual debugging, Lighthouse, dan SEO fixing akhir.

8. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan keseluruhan website ke user untuk persetujuan akhir. **HARD STOP**: BERHENTI TOTAL.

9. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.

10. **Post-Deploy Debug**: Panggil `debug` untuk **Post-Deploy Debug**. Jika ada bug/error, perbaiki lokal dan re-deploy (Maksimal 2 iterasi).

11. **Cleanup**: Setelah selesai, matikan (kill) proses dev server Node.js.
