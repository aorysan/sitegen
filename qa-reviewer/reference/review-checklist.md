# Review Checklist — QA Reviewer

Checklist ini digunakan untuk menilai PRD yang dihasilkan skill `planner`. Setiap item dinilai LULUS atau GAGAL. Skor dihitung berdasarkan jumlah item yang LULUS.

---

## Kategori 1: Kelengkapan Halaman (15 poin)

### 1.1 Halaman Inti (7 poin)
Cek apakah PRD memuat section untuk semua 7 halaman berikut:
- [ ] Beranda (`/`) — 1 poin
- [ ] Tentang Kami (`/about`) — 1 poin
- [ ] Layanan/Produk (`/services` atau `/layanan-<keyword>`) — 1 poin
- [ ] Portofolio (`/portfolio`) — 1 poin
- [ ] Blog (`/blog`) — 1 poin
- [ ] Karir (`/careers`) — 1 poin
- [ ] Kontak (`/contact`) — 1 poin

### 1.2 URL Ber-Keyword (4 poin)
- [ ] Setiap URL memuat keyword utama halaman — 2 poin
- [ ] URL tidak ada yang duplikat — 1 poin
- [ ] URL menggunakan format kebab-case — 1 poin

### 1.3 Routing (4 poin)
- [ ] Route sesuai format Next.js App Router — 2 poin
- [ ] Tidak ada route yang conflict — 2 poin

---

## Kategori 2: SEO Strategy (20 poin)

### 2.1 Keyword Mapping (5 poin)
- [ ] Setiap halaman punya 1 grup keyword utama — 2 poin
- [ ] Tidak ada keyword cannibalization (keyword sama di 2+ halaman) — 3 poin

### 2.2 Buying Keywords (3 poin)
- [ ] Setiap halaman punya minimal 1 buying keyword — 3 poin

### 2.3 LSI Keywords (3 poin)
- [ ] Setiap halaman punya minimal 2 LSI keywords — 3 poin

### 2.4 Title Tag (3 poin)
- [ ] Setiap halaman punya title tag — 1 poin
- [ ] Semua title tag <= 55 karakter — 1 poin
- [ ] Title tag memuat 2-3 keyword dan CTR-oriented — 1 poin

### 2.5 Meta Description (3 poin)
- [ ] Setiap halaman punya meta description — 1 poin
- [ ] Semua meta desc <= 155 karakter — 1 poin
- [ ] Meta desc memuat keyword yang belum di title — 1 poin

### 2.6 Backlink Plan (3 poin)
- [ ] Ada minimal 3 artikel backlink — 1 poin
- [ ] Setiap judul artikel memuat 1 buying keyword — 1 poin
- [ ] Setiap artikel punya deskripsi gambar clickable — 1 poin

---

## Kategori 3: Value Proposition Preservation (15 poin)

### 3.1 Kalimat Persuasi (8 poin)
- [ ] Semua kalimat persuasi dari data intake ditemukan di PRD — 4 poin
- [ ] Kalimat tidak diubah secara substansial — 2 poin
- [ ] Minimal 3 kalimat persuasi tercantum — 2 poin

### 3.2 Posisi Ditandai (4 poin)
- [ ] Setiap kalimat persuasi ditandai posisinya (section mana) — 4 poin

### 3.3 Kelengkapan (3 poin)
- [ ] Tidak ada kalimat persuasi dari data intake yang hilang — 3 poin

---

## Kategori 4: Section Layout Completeness (20 poin)

### 4.1 Section Types Valid (5 poin)
- [ ] Semua section types yang dipakai ada dalam daftar: hero, problem, solution, about, management, techstack, testimonial, pricing, faq, cta, video — 5 poin

### 4.2 Data Konten Lengkap (8 poin)
- [ ] Setiap section hero punya: headline, cta — 2 poin
- [ ] Setiap section problem/solution punya: title, items/benefits — 2 poin
- [ ] Setiap section cta punya: headline — 1 poin
- [ ] Semua field wajib per section type terisi — 3 poin

### 4.3 Video SMO (4 poin)
- [ ] Setiap halaman punya minimal 1 section video atau embed SMO — 4 poin

### 4.4 Schema.org (3 poin)
- [ ] Schema.org type tercantum untuk setiap halaman — 3 poin

---

## Kategori 5: Branding & Visual Plan (10 poin)

### 5.1 Warna (4 poin)
- [ ] Primary color tercantum (hex code) — 1 poin
- [ ] Secondary color tercantum (hex code) — 1 poin
- [ ] Dark color tercantum (hex code) — 1 poin
- [ ] Warna diambil dari PDF (bukan asal) — 1 poin

### 5.2 Font (3 poin)
- [ ] Font heading dideklarasikan (Google Font valid) — 1.5 poin
- [ ] Font body dideklarasikan (Google Font valid) — 1.5 poin

### 5.3 Aset Visual (3 poin)
- [ ] Ada deskripsi hero image — 1 poin
- [ ] Ada daftar gambar pendukung — 1 poin
- [ ] Ada informasi logo — 1 poin

---

## Kategori 6: Content Quality & Data Mapping (15 poin)

### 6.1 Konten Berdasar PDF (8 poin)
- [ ] Informasi perusahaan akurat sesuai PDF — 3 poin
- [ ] Layanan/produk sesuai dengan data PDF — 3 poin
- [ ] Konten tidak mengandung informasi yang dibuat-buat — 2 poin

### 6.2 Footer Data (3 poin)
- [ ] Email tercantum — 1 poin
- [ ] Nomor WA/telepon tercantum — 1 poin
- [ ] Alamat dan sosial media tercantum — 1 poin

### 6.3 Tidak Ada Placeholder (4 poin)
- [ ] Tidak ada field yang masih berisi "[...]" — 2 poin
- [ ] Tidak ada field yang kosong tanpa penjelasan — 2 poin

---

## Kategori 7: Anti-AI Slop Compliance (5 poin)

### 7.1 Tidak Ada Emoji (2 poin)
- [ ] Tidak ada emoji di seluruh PRD — 2 poin

### 7.2 Tidak Ada Teks Generik (3 poin)
- [ ] Tidak ada kalimat generik tanpa basis data PDF — 1.5 poin
- [ ] Tidak ada "Enterprise Solution", "Leading Provider" atau sejenisnya tanpa konteks — 1.5 poin

---

## Ringkasan

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

**Skor minimum lolos: 90/100**
**Jika gagal: kirim feedback ke skill `planner` untuk revisi, lalu review ulang.**
