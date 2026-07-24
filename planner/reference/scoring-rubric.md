# Rubrik Penilaian PRD — Sitegen Planner

Rubrik ini digunakan untuk menilai kualitas PRD yang dihasilkan. Skor minimum untuk lolos review: **90/100**.

## Kategori Penilaian

### 1. Kelengkapan Halaman (Bobot: 15 poin)

| Item | Poin | Kriteria |
|---|---|---|
| 7 halaman inti lengkap | 7 | Semua 7 halaman (/, /about, /services, /portfolio, /blog, /careers, /contact) tercantum |
| URL ber-keyword | 4 | Semua URL memuat keyword utama halaman |
| Routing benar | 4 | Route sesuai format Next.js App Router |

### 2. SEO Strategy (Bobot: 20 poin)

| Item | Poin | Kriteria |
|---|---|---|
| Keyword mapping per halaman | 5 | Setiap halaman punya 1 grup keyword utama (anti-kanibalisasi) |
| Buying keywords valid | 3 | Setiap halaman memiliki buying keyword yang relevan |
| LSI keywords ada | 3 | Setiap halaman memiliki minimal 2 LSI keywords pendukung |
| Title Tag benar | 3 | Setiap halaman punya title tag <= 55 char, memuat 2-3 keyword, CTR-oriented |
| Meta Description benar | 3 | Setiap halaman punya meta desc <= 155 char, memuat keyword, CTR-oriented |
| Backlink plan (blog) | 3 | Minimal 3 artikel backlink dengan buying keyword dan gambar clickable |

### 3. Value Proposition Preservation (Bobot: 15 poin)

| Item | Poin | Kriteria |
|---|---|---|
| Kalimat persuasi tercantum | 8 | Semua kalimat persuasi dari PDF ditemukan di PRD |
| Posisi ditandai | 4 | Setiap kalimat persuasi ditandai posisinya (section mana) |
| Tidak ada penghapusan | 3 | Tidak ada teks persuasi yang hilang dibanding data intake |

### 4. Section Layout Completeness (Bobot: 20 poin)

| Item | Poin | Kriteria |
|---|---|---|
| Section types valid | 5 | Semua section menggunakan types yang didukung generator (hero, problem, solution, about, management, techstack, testimonial, pricing, faq, cta, video) |
| Data konten per section lengkap | 8 | Setiap section memiliki data konten yang lengkap (headline, items, cta, dll) |
| Video SMO per halaman | 4 | Setiap halaman memiliki minimal 1 section video/embed SMO |
| Schema.org JSON-LD | 3 | Schema.org type tercantum untuk setiap halaman |

### 5. Branding & Visual Plan (Bobot: 10 poin)

| Item | Poin | Kriteria |
|---|---|---|
| Warna lengkap (3 warna) | 4 | Primary, secondary, dark color tercantum dengan hex code |
| Font dideklarasikan | 3 | Font heading dan body dideklarasikan (Google Font) |
| Aset visual | 3 | Deskripsi hero image dan gambar pendukung tercantum |

### 6. Content Quality & Data Mapping (Bobot: 15 poin)

| Item | Poin | Kriteria |
|---|---|---|
| Konten berdasar PDF | 8 | Semua konten diambil/diadaptasi dari data PDF, bukan dibuat-buat |
| Footer data lengkap | 3 | Email, WA, alamat, sosial media tercantum |
| Tidak ada placeholder kosong | 4 | Tidak ada field yang masih berisi "[...]" atau placeholder |

### 7. Anti-AI Slop Compliance (Bobot: 5 poin)

| Item | Poin | Kriteria |
|---|---|---|
| Tidak ada emoji | 2 | Tidak ada emoji di seluruh PRD |
| Tidak ada teks generik | 3 | Tidak ada teks generik yang tidak berdasar pada PDF |

---

## Tabel Ringkasan Skor

| # | Kategori | Bobot |
|---|---|---|
| 1 | Kelengkapan Halaman | 15 |
| 2 | SEO Strategy | 20 |
| 3 | Value Proposition Preservation | 15 |
| 4 | Section Layout Completeness | 20 |
| 5 | Branding & Visual Plan | 10 |
| 6 | Content Quality & Data Mapping | 15 |
| 7 | Anti-AI Slop Compliance | 5 |
| | **TOTAL** | **100** |

**Minimum skor lolos: 90/100**
