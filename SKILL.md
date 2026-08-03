---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat.

1. **Intake**: Panggil `intake` untuk mengekstrak data dari dokumen PDF ke `landings/<brand>/intake_compro.md`. Wajib verifikasi dan catat ketersediaan aset media/video dari compro: jika video nihil, beri label status *[No-Video Default]* agar perancangan selanjutnya menyiapkan fallback antarmuka interaktif atau mengkonfirmasi input video langsung ke user.

2. **Research**: Panggil sub-skill `research` untuk menghasilkan 2 dokumen riset:
   - `landings/<brand>/planning/PLAN-USER-NEEDS.md`: analisis pain points, jobs-to-be-done, objection & counter-messaging, FAQ pra-pembelian, user journey, dan trigger pembelian target user
   - `landings/<brand>/planning/PLAN-COMPETITOR.md`: analisis min. 3 kompetitor meliputi positioning, fitur & section website, tone of voice, keyword SEO, dan gap analysis
   
   Sumber data: inferensi dari `intake_compro.md` **+** web search otomatis berdasarkan industri yang terdeteksi.

3. **Brainstorming, Rekonsiliasi & Global Design**:
   a. Berdasarkan data riset, panggil sub-skill `brainstorming` (Visi, Misi, Tema Font, UI/UX). Pastikan `PLAN-USER-NEEDS.md` dan `PLAN-COMPETITOR.md` tersedia sebagai konteks agar diskusi berbasis data riset. Simpan masukan user sebagai `landings/<brand>/user_preferences.md`.
   b. Lakukan rekonsiliasi dengan menggabungkan `intake_compro.md` dan `user_preferences.md` menjadi `landings/<brand>/final_intake.md`.
   c. **ATURAN WAJIB (HARD STOP)**: Anda WAJIB memperlihatkan isi `final_intake.md` ke user. Berhenti bekerja dan JANGAN memanggil tool apa pun. Tunggu user setuju sebelum lanjut ke langkah berikutnya.
   d. Setelah disetujui, inisialisasi project Next.js di dalam direktori `landings/<brand>` (misal: `npx create-next-app@latest ./` dengan aturan web framework) jika belum ada. Lalu panggil `ui-ux-pro-max` dan `impeccable` untuk menentukan warna, font, dan komponen global, menghasilkan `PLAN-GLOBAL.md` yang WAJIB menetapkan 3 parameter antarmuka Tier-1:
      - **Sticky Top Navbar**: Komponen header/navbar wajib bernilaikan `sticky top-0` atau `fixed top-0` dengan z-index minimum `z-50` serta transisi latar belakang visual (misal efek glassmorphic saat gulir).
      - **Tier-1 Dynamic Motion**: Spesifikasi animasi elemen modern dan mulus (Framer Motion / GSAP / micro-interactions CSS) berstandar tinggi (scroll-reveal & smooth hover transformations).
      - **Touch-Safe Mobile Video**: Rancangan pemutar video (bila ada) wajib bersahabat dengan sentuhan resolusi selular (*touch-friendly*), menyediakan tombol play/pause/stop eksplisit dan menolak lock fullscreen/autoplay berpotensi bug/macet.
      Pastikan juga untuk menginisialisasi Playwright (misal: `npm init playwright@latest --yes` dan `npx playwright install --with-deps`).
   e. Segera setelah `PLAN-GLOBAL.md` selesai, panggil `planner` mode=design-system untuk menghasilkan `PLAN-DESIGN-SYSTEM.md`. Berdasarkan `final_intake.md` dan kesepakatan user, buat juga dokumen sitemap di `landings/<brand>/planning/PAGES-LIST.md` yang berisi daftar halaman yang akan dieksekusi.

4. **Fase Persiapan Batch (PRD & Visual):**
   a. **Buat PRD Semua Halaman:** Baca `landings/<brand>/planning/PAGES-LIST.md`. Panggil sub-skill `planner` mode=page untuk men-generate PRD (`PLAN-<halaman>.md`) untuk **semua** halaman yang terdaftar sekaligus.
   b. **Review QA PRD & Konsolidasi Master PRD:** Panggil `qa-reviewer` untuk menilai kelayakan semua `PLAN-<halaman>.md` secara internal. Segera pasca lulus QA, panggil sub-skill `planner` mode=`merge` untuk mengkonsolidasikan seluruh `PLAN-<halaman>.md`, `PLAN-GLOBAL.md`, dan `PLAN-DESIGN-SYSTEM.md` menjadi dokumen tunggal Master PRD di `landings/<brand>/PRD.md` sebagai patokan utama generator.
   c. **Persiapan Visual & Asset Mapping (Anti-Placeholder Enforcer):** Periksa folder `public/assets/` dan hasilkan dokumen pemetaan **`landings/<brand>/planning/ASSET-MAPPING.md`** yang memprioritaskan pemetaan eksplisit gambar statis (logo, ilustrasi) maupun video lokal ke target section spesifik di UI. Panggilan sub-skill `ui-ux-pro-max` dan `impeccable` dilanjutkan untuk merasionalkan layout dan animasi yang memukau. **DILARANG KERAS** menyulap link gambar eksternal ataupun menyetel placeholder kotak kosong fiktif.
   d. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan dokumen Master PRD (`PRD.md`), dokumen `ASSET-MAPPING.md`, dan konsep visual kepada user. **HARD STOP**: Anda WAJIB berhenti bekerja dan menunggu persetujuan user sebelum lanjut.

5. **Fase Eksekusi Halaman (Hybrid SDD Iteration):**
   Jalankan dev server di background (misal: `cd landings/<brand> && npm run dev`) sebelum memulai iterasi agar Playwright dan user bisa memvalidasi halaman.
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
   b. Pastikan dev server masih berjalan, lalu panggil `debug` untuk visual debugging, Lighthouse, dan SEO fixing akhir.

8. **[CRITICAL STOP - TUNGGU REVIEW USER]:** Perlihatkan keseluruhan website ke user untuk persetujuan akhir. **HARD STOP**: BERHENTI TOTAL.

9. **Deploy**: Jika user setuju, panggil `deploy` ke Vercel.

10. **Post-Deploy Debug**: Panggil `debug` untuk **Post-Deploy Debug**. Jika ada bug/error, perbaiki lokal dan re-deploy (Maksimal 2 iterasi).

11. **Cleanup**: Setelah selesai, matikan (kill) proses dev server Node.js.
