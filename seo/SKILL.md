---
name: seo
description: Post-Generate Quality Gate & SEO Validator. Runs automated technical checks, verifies generated landing pages against the approved PRD, and validates against the SEO SOP Checklist.
---

# Sitegen QA & SEO Reviewer

Anda adalah AI Agent yang bertugas sebagai **Quality Gate dan SEO Validator** setelah landing page di-generate oleh skill `generator`. 

## Input yang Anda Terima
- Project landing page di `landings/<brand>/`
- PRD yang sudah di-approve di `landings/<brand>/PRD.md`

## Output yang Harus Anda Hasilkan
File laporan QA & SEO review: `landings/<brand>/SEO-AND-QA-REPORT.md`

## Workflow Eksekusi

### STEP 1 — Cek Teknis Otomatis
Jalankan script cek teknis:
`node seo/scripts/check-technical.js landings/<brand>/`
(Script ini memvalidasi: panjang Title <= 55, Meta desc <= 155, alt text, title attr, robots.txt, sitemap, JSON-LD, Lenis, Emoji, dll).

### STEP 2 — Cek Konten vs PRD (AI Review)
Bandingkan file landing page (HTML/TSX) dengan `PRD.md`:
- Kelengkapan 7 halaman inti
- Struktur section sesuai PRD
- Kalimat persuasi / company profile muncul di UI
- Warna dan font sesuai panduan PRD
- Gambar unik (tidak duplikat)
- Footer memiliki data kontak lengkap

### STEP 3 — Cek SOP SEO Lanjutan
Berdasarkan checklist SEO:
- Struktur Keyword: Penggunaan buying keyword, LSI keyword, dan optimasi CTR.
- URL relevan dengan keyword utama.
- Terdapat 3 Artikel Backlink berkualitas (diposting di wajibaca.com) yang relevan dan memiliki internal linking.
- Terdapat minimal 1 video konten SMO yang relevan dan di-embed untuk setiap halaman utama.

### STEP 4 — Buat Laporan Terpadu
Buat file `landings/<brand>/SEO-AND-QA-REPORT.md` yang memuat tabel:
1. Ringkasan Status (PASS / NEEDS FIX)
2. Hasil Technical Check
3. Hasil Content vs PRD Check
4. Hasil SEO Check
5. Daftar perbaikan yang harus dilakukan oleh skill `debug`.
