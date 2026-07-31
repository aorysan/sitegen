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

4. **Iterasi Per Halaman (Lakukan berurutan untuk setiap halaman dari Beranda hingga akhir):**
   Untuk setiap halaman (WAJIB 7 HALAMAN: Beranda, Layanan, About, Portofolio, Kontak, Blog, Karir):
   a. **Detail Halaman (PRD):** Panggil `planner` mode=page untuk halaman target. Cross-reference dengan `PLAN-USER-NEEDS.md` dan `PLAN-COMPETITOR.md` untuk memastikan pain points dan gap kompetitor ter-address.
   b. **Review QA:** Panggil `qa-reviewer` untuk menilai `PLAN-<halaman>.md`.
   c. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan detail halaman (PRD) kepada user. **HARD STOP**: Anda WAJIB berhenti bekerja dan menunggu balasan user. JANGAN LANJUT ke generate sebelum user setuju.
   d. **Persiapan Visual & Aset:** 
      - Periksa folder `public/assets/` untuk mengidentifikasi logo resmi. Pasang logo hasil ekstraksi menggunakan `next/image` di header/footer.
      - WAJIB panggil `ui-ux-pro-max` dan `impeccable` untuk mendapatkan pedoman layout dan animasi yang memukau.
   e. **Generate Halaman:** Setelah persiapan visual selesai, panggil `generator` khusus untuk membangun halaman tersebut ke dalam project Next.js. Generator WAJIB membaca pedoman visual dan `PLAN-DESIGN-SYSTEM.md`.
   f. **Polish & Debug:** Panggil `impeccable` untuk memoles UI jika kurang memukau, lalu panggil `systematic-debugging` jika ada error saat generate.
   g. **Generate Playwright Spec:** Buat file test `tests/<halaman>.spec.ts` yang berisi validasi End-to-End berdasarkan PRD.
   h. **Debugging Mandiri (Test):** Jalankan test Playwright (`npx playwright test tests/<halaman>.spec.ts`). Jika gagal karena browser/Chrome tidak ada, berikan peringatan dan minta user cek manual. Jika ada bug UI/UX, perbaiki kode.
   i. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Tampilkan hasil halaman. **HARD STOP**: BERHENTI MENGEKSEKUSI TOOL. Tunggu user mengecek localhost:3000 dan memberikan persetujuan. JANGAN lanjut ke halaman berikutnya.
   j. Lanjut ke halaman berikutnya, ulangi dari langkah 4a.

5. **Penggabungan (Integration):** Setelah semua halaman di-generate dan disetujui satu per satu, gabungkan (merge PRD jika perlu) dan pastikan navigasi antar halaman berfungsi sempurna.

6. **SEO Validation**: Panggil skill SEO eksternal (dari github.com/affaan-m/everything-claude-code) untuk validasi struktur SEO terhadap `final_intake.md` dan PRD sebelum deploy.
7. **Debug Lokal Final**: Jalankan dev server di background dengan perintah `cd landings/<brand> && npm run dev -- -p 3000`. Setelah server berjalan, panggil `debug` untuk menjalankan visual debugging, analisis Lighthouse, perbaikan SEO, dan **Debugging Mandiri**. Pastikan tidak ada bug tersisa.
8. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan keseluruhan website ke user untuk persetujuan akhir. **HARD STOP**: BERHENTI TOTAL. Jangan panggil tool deploy sebelum user bilang "Ya/Deploy".
9. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.
10. **Post-Deploy Debug**: Panggil `debug` untuk **Post-Deploy Debug**. Jika bug/error muncul, perbaiki lokal lalu re-deploy (Maksimal 2 iterasi). Jika masih error, laporkan ke user.
11. **Cleanup**: Setelah semua proses selesai, cari dan matikan (kill) proses Node.js yang berjalan di port 3000 (contoh: `npx kill-port 3000`).
