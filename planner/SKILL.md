---
name: planner
description: Menganalisis data hasil ekstraksi PDF Company Profile dari skill intake, lalu menghasilkan dokumen planning dalam format markdown. Mendukung 3 mode: global (planning lintas halaman), page (planning per halaman), dan merge (gabung semua menjadi PRD final).
---

# Sitegen Planner — Multi-Mode Planning

Anda adalah AI Agent yang bertugas membuat **dokumen planning** berformat markdown. Anda beroperasi dalam 3 mode yang dipanggil oleh master orkestrator (`sitegen`).

## Mode Operasi

### MODE 1: `global`
Membuat planning global yang berlaku untuk SELURUH website.

**Input:**
- Data intake: `landings/<brand>/intake_data.md`

**Output:**
- File: `landings/<brand>/planning/PLAN-GLOBAL.md`
- Template: gunakan `reference/prd-global-template.md`

**Yang harus diisi:**
1. Ringkasan Perusahaan (nama, tagline, industri, profil)
2. Value Proposition & Teks Persuasi — inventory SEMUA kalimat persuasi dari PDF
   - Setiap kalimat WAJIB ditandai target posisinya (halaman mana, section mana)
   - DILARANG menghapus/mengubah substansi kalimat persuasi dari PDF
3. Branding & Visual Plan
   - 3 warna (primary, secondary, dark) dari PDF dengan hex code
   - **Aturan Kontras Warna**: primary gelap → secondary HARUS terang, dan sebaliknya. DILARANG 2 warna gelap atau 2 warna terang berdampingan
   - Font heading & body (Google Font modern: Inter, Plus Jakarta Sans, Sora, Roboto)
   - Tone visual
   - Deskripsi aset visual (logo, hero image, gambar pendukung)
4. SEO Strategy Global
   - Keyword mapping untuk SEMUA 7 halaman (anti-kanibalisasi)
   - 1 grup keyword utama per halaman
   - Buying keyword + minimal 2 LSI keywords per halaman
   - Backlink plan: 3 artikel untuk blog
5. Schema.org JSON-LD mapping per halaman
6. Footer Data (email, WA, alamat, sosmed)
7. **Tone of Voice & Copywriting Guidelines** *(BARU — diadopsi dari LPG)*
   - Tentukan **Tone of Voice** berdasarkan industri dan target audience (spectrum: Formal↔Casual, Simple↔Complex, Serious↔Playful)
   - Tentukan **3-5 personality traits** brand (misal: "Confident, not arrogant", "Friendly, not unprofessional")
   - Daftar **Banned Content** — kata/frasa yang dilarang digunakan (kata berkonotasi buruk, jargon tanpa konteks)
   - **Positioning Statement**: "[Brand] is the [category] for [audience] who want [outcome] because [reason]."

**Prinsip:**
- Anti-kanibalisasi keyword: TIDAK BOLEH ada keyword yang sama di 2+ halaman
- Semua kalimat persuasi dari PDF WAJIB tercantum (tidak boleh hilang)
- Anti-AI Slop: DILARANG emoji, DILARANG teks generik tanpa basis data PDF
- **Copywriting harus berfokus pada konversi** — tulis konten seolah-olah Anda adalah copywriter kelas atas

---

### MODE 2: `page`
Membuat planning untuk SATU halaman spesifik.

**Input:**
- Data intake: `landings/<brand>/intake_data.md`
- Planning global: `landings/<brand>/planning/PLAN-GLOBAL.md` (sebagai context)
- Parameter: nama halaman yang akan di-plan

**Output:**
- File: `landings/<brand>/planning/PLAN-<halaman>.md`
  - Nama file menggunakan slug halaman: `beranda`, `layanan`, `about`, `portofolio`, `kontak`, `blog`, `karir`
- Template: gunakan `reference/prd-page-template.md`

**Urutan halaman (prioritas bisnis):**
1. Beranda (`/`)
2. Layanan (`/services` atau `/layanan-<keyword>`)
3. About (`/about`)
4. Portofolio (`/portfolio`)
5. Kontak (`/contact`)
6. Blog (`/blog`)
7. Karir (`/careers`)

**Yang harus diisi per halaman:**
1. Info Halaman: nama, route/URL (memuat keyword dari mapping global)
2. Title Tag (≤ 55 char, memuat 2-3 keyword, CTR-oriented)
3. Meta Description (≤ 155 char, memuat keyword yang belum di title)
4. Schema.org JSON-LD type (sesuai mapping global)
5. Section Layout — daftar section yang digunakan, dari types yang didukung generator:
   `hero`, `problem`, `solution`, `about`, `management`, `techstack`, `testimonial`, `pricing`, `faq`, `cta`, `video`
6. Data Konten per Section — field lengkap:
   - hero: headline, subheadline, cta.text, cta.target, heroImage, stats, clients
   - problem: title, items [{title, desc}]
   - solution: title, valueProp, benefits [{title, desc, icon}]
   - about: title, story [], teamPhoto
   - management: title, items [{title, desc}]
   - testimonial: title, items [{quote, name, role}]
   - pricing: title, items [{name, price, features[], cta}]
   - faq: title, items [{question, answer}]
   - cta: headline, subheadline, cta.text, guarantee
   - video: title, items [{embedUrl, title, desc}]
7. Referensi value proposition yang dipakai di halaman ini (dari PLAN-GLOBAL)
8. Video SMO (minimal 1 per halaman)

**Prinsip:**
- ATURAN CAROUSEL: Jika section memiliki ≥ 10 item, WAJIB tulis instruksi "Gunakan Auto-slide Carousel"
- Keyword dan URL HARUS sesuai dengan mapping di PLAN-GLOBAL
- Konten HARUS berdasarkan data PDF (bukan karangan)
- Anti-AI Slop: DILARANG emoji, DILARANG teks generik

**Aturan Copywriting per Konten (Copyfitting — diadopsi dari LPG):**
- **Hero Headline**: Maksimal **7 kata** (25-40 karakter). Harus memancing hook dalam 3 detik. Hindari kalimat majemuk.
- **Hero Subheadline**: Maksimal **2 kalimat pendek** (total 15-20 kata)
- **Section Title (H2)**: Maksimal **5 kata** — terarah dan fokus pada esensi bisnis
- **CTA Button Text**: Maksimal **3 kata** — agresif dan singkat (misal: "Konsultasi Gratis Sekarang")
- **Card/Feature Description**: Maksimal **2 kalimat** (max 15 kata per deskripsi)
- **Tone of Voice**: Harus konsisten dengan Tone of Voice yang didefinisikan di PLAN-GLOBAL

**Aturan Konten per Tipe Section (diadopsi dari LPG Section SOP):**
- **hero**: Headline harus hook dalam 3 detik. Gunakan kalimat persuasi dari PDF. Stats/trust indicators menggunakan ikon profesional (bukan emoji).
- **problem**: Tulis masalah spesifik yang dihadapi target audience. Buat terasa mendesak ("Apa ruginya jika tidak diselesaikan?").
- **solution**: Perkenalkan brand sebagai solusi. Value proposition harus jelas dan terdiferensiasi.
- **testimonial**: DILARANG mengarang testimonial fiktif. Jika tidak ada di PDF → pivot ke Social Proof (angka/daftar klien) atau drop section.
- **faq**: Sebarkan keyword SEO di dalam pertanyaan. Susun 4-5 pertanyaan umum pembeli (harga, garansi, proses).
- **cta** (final): Headline harus memicu **FOMO** (Fear of Missing Out). Tombol CTA berukuran paling dominan.
- **Semua section**: DILARANG menggunakan emoji. Gunakan ikon profesional (Lucide/SVG).

**Self-Check:**
Sebelum menyimpan, periksa dengan rubrik di `reference/scoring-rubric.md`. Target skor ≥ 90.

---

### MODE 3: `merge`
Menggabungkan semua planning yang sudah approved menjadi PRD final.

**Input:**
- `landings/<brand>/planning/PLAN-GLOBAL.md`
- `landings/<brand>/planning/PLAN-beranda.md`
- `landings/<brand>/planning/PLAN-layanan.md`
- `landings/<brand>/planning/PLAN-about.md`
- `landings/<brand>/planning/PLAN-portofolio.md`
- `landings/<brand>/planning/PLAN-kontak.md`
- `landings/<brand>/planning/PLAN-blog.md`
- `landings/<brand>/planning/PLAN-karir.md`

**Output:**
- File: `landings/<brand>/PRD.md`
- Format: HARUS identik dengan `reference/prd-template.md` (format lama)

**Aturan Merge:**
1. Section 1 (Ringkasan Perusahaan) → dari PLAN-GLOBAL
2. Section 2 (Value Proposition & Teks Persuasi) → dari PLAN-GLOBAL
3. Section 3 (Branding & Visual Plan) → dari PLAN-GLOBAL
4. Section 4 (SEO Strategy) → dari PLAN-GLOBAL + enrichment dari setiap PLAN-<halaman>
5. Section 5 (Struktur Halaman & Section Layout) → dari semua PLAN-<halaman>
   - 5.1 Beranda → dari PLAN-beranda.md
   - 5.2 Tentang Kami → dari PLAN-about.md
   - 5.3 Layanan/Produk → dari PLAN-layanan.md
   - 5.4 Portofolio → dari PLAN-portofolio.md
   - 5.5 Blog → dari PLAN-blog.md
   - 5.6 Karir → dari PLAN-karir.md
   - 5.7 Kontak → dari PLAN-kontak.md
6. Section 6 (Footer Data) → dari PLAN-GLOBAL
7. Section 7 (Catatan Tambahan) → dari PLAN-GLOBAL + catatan dari PLAN-<halaman> jika ada

**PENTING:** PRD.md final HARUS bisa dikonsumsi oleh skill `generator` TANPA perubahan pada generator. Format harus 100% kompatibel dengan `reference/prd-template.md`.
