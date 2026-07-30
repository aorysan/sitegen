---
name: sitegen
description: Master orkestrator untuk pembuatan seluruh website. Menggunakan daftar periksa untuk memanggil sub-skill secara berurutan.
---

# Sitegen Master Flow

Anda adalah master orkestrator untuk membangun website secara lengkap. Jalankan langkah-langkah ini sesuai urutan yang tepat.

1. **Intake**: Panggil `intake` untuk mengekstrak data PDF/User ke `landings/<brand>/intake_data.md`.

2. **Research**: Panggil sub-skill `research` untuk menghasilkan 2 dokumen riset:
   - `landings/<brand>/planning/PLAN-USER-NEEDS.md`: analisis pain points, jobs-to-be-done, objection & counter-messaging, FAQ pra-pembelian, user journey, dan trigger pembelian target user
   - `landings/<brand>/planning/PLAN-COMPETITOR.md`: analisis min. 3 kompetitor meliputi positioning, fitur & section website, tone of voice, keyword SEO, dan gap analysis
   
   Sumber data: inferensi dari `intake_data.md` **+** web search otomatis berdasarkan industri yang terdeteksi.

3. **Brainstorming & Global Design**:
   a. Panggil sub-skill `brainstorming` untuk diskusi dengan user. Pastikan `PLAN-USER-NEEDS.md` dan `PLAN-COMPETITOR.md` tersedia sebagai konteks agar diskusi berbasis data riset.
   b. Panggil `ui-ux-pro-max` untuk menentukan warna, font, dan komponen global. Hasilkan `PLAN-GLOBAL.md`.
   c. Segera setelah `PLAN-GLOBAL.md` selesai, panggil `planner` mode=design-system untuk menghasilkan `PLAN-DESIGN-SYSTEM.md`.

4. **Planning per Halaman**: Untuk setiap halaman (WAJIB 7 HALAMAN: Beranda, Layanan, About, Portofolio, Kontak, Blog, Karir), panggil `planner` mode=page untuk membuat `PLAN-<halaman>.md`. Saat membuat konten per halaman, cross-reference dengan:
   - `PLAN-USER-NEEDS.md` — pastikan pain points & objections user ter-address di section yang relevan (problem, faq, cta)
   - `PLAN-COMPETITOR.md` — pastikan gap yang ditemukan dieksploitasi dalam copywriting dan pilihan section

5. **Review Plan**: Panggil `qa-reviewer` mode=global-extended yang akan me-review **SEMUA** planning sekaligus:
   - `PLAN-USER-NEEDS.md`
   - `PLAN-COMPETITOR.md`
   - `PLAN-GLOBAL.md`
   - `PLAN-DESIGN-SYSTEM.md`
   - Semua `PLAN-<halaman>.md` (7 halaman)
   
   Tampilkan hasil review QA lengkap kepada user. **[CRITICAL STOP]**: Anda WAJIB MENGHENTIKAN EKSEKUSI di titik ini dan MENUNGGU konfirmasi/persetujuan balasan dari user secara eksplisit. Tunjukkan ringkasan semua plan dan skor QA. Jangan panggil tools atau lanjut ke langkah berikutnya tanpa izin user. Jika user meminta revisi, ulangi hanya langkah yang relevan saja — tidak perlu mengulang seluruh pipeline.

6. **Generate & Polish per Halaman**:
   Untuk setiap halaman:
   - **Check Assets**: Periksa folder `public/assets/` untuk mengidentifikasi logo resmi (`extracted_img_*`, `logo.*`, dll).
   - **Header & Footer**: Pasang logo resmi hasil ekstraksi menggunakan `next/image` alih-alih teks placeholder.
   a. Panggil `generator` untuk membuat struktur/kode satu halaman. Generator WAJIB membaca `PLAN-DESIGN-SYSTEM.md` untuk konsistensi token warna, font, dan spacing.
   b. Panggil `impeccable` untuk memoles UI jika secara visual kurang bagus.
   c. Panggil `systematic-debugging` jika ada error saat generate.
   d. Tampilkan halaman tersebut kepada user. **[CRITICAL STOP]**: Anda WAJIB MENGHENTIKAN EKSEKUSI dan TUNGGU balasan persetujuan user di sini. Jangan panggil tools apa pun dan jangan memproses halaman berikutnya sebelum user memberikan izin (misal: "Lanjut").

7. **SEO**: Panggil `seo` untuk validasi SEO sebelum deploy.
8. **Debug Lokal**: Jalankan dev server di background dengan perintah `cd landings/<brand> && npm run dev -- -p 3000`. Setelah server berjalan, panggil `debug` untuk menjalankan visual debugging, analisis Lighthouse, perbaikan SEO, dan **Debugging Mandiri**. Pastikan tidak ada bug tersisa.
9. **Deploy**: Panggil `deploy` untuk deploy web (misal ke Vercel) dan pastikan live.
10. **Post-Deploy Debug**: Panggil `debug` untuk **Post-Deploy Debug**. Jika bug/error muncul, perbaiki lokal lalu re-deploy (Maksimal 2 iterasi). Jika masih error, laporkan ke user.
11. **Cleanup**: Setelah semua proses selesai, cari dan matikan (kill) proses Node.js yang berjalan di port 3000 (contoh: `npx kill-port 3000`).

