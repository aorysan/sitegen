# Konstitusi SEO Optimizer (`AGENTS.md`)

> **File Kepatuhan Wajib** untuk sub-skill `seo-optimizer`. Sub-skill ini mengkhususkan diri pada audit dan optimasi SEO teknis, meta tags, heading hierarchy, dan struktur semantik HTML.

---

## PASAL I: PROTOKOL AUDIT DUA TAHAP
1. **Perbedaan Fase Eksekusi vs Fase Final:**
   - **Fase Eksekusi Halaman (Langkah 7):** Saat dipanggil per halaman, agen melakukan pengecekan cepat (title tags, meta decription, heading hierarchy, alt attributes). Hasil per halaman disematkan dalam laporan batch `landings/<brand>/SEO-REPORT.md`.
   - **Fase SEO & Debug Final (Langkah 9):** Saat dipanggil secara menyeluruh setelah semua halaman dirangkum dan di-debug, agen melakukan audit komprehensif seluruh project (termasuk sitemap, robots.txt, canonical URLs, dan efisiensi performa). Hasil akhir disimpan ke `landings/<brand>/SEO-REPORT-FINAL.md`.

---

## PASAL II: ATURAN SEO GAMBAR GANDA (ANTI-SLOP & ACCESSIBILITY)
1. **Kepatuhan Atribut Ganda Wajib:**
   - Sesuai undang-undang master AGENTS.md, setiap elemen gambar (`<img />` atau `next/image`) WAJIB dibekali pasangan atribut ganda:
     - `alt="..."`: Deskripsi teks ramah SEO dan tuna-netra yang akurat menjelaskan subjek foto/logo/artwork.
     - `title="..."`: Judul *tooltip* konseptual yang memperkuat relevansi kata kunci industri.
   - Agen WAJIB melaporkan sebagai defect jika menemukan gambar dengan `alt` kosong atau placeholder seperti `alt="image"`, `alt="icon"`, atau tanpa `title`.

---

## PASAL III: HEADING HIERARCHY & SEMANTIC STRUCTURE
1. **Strict H1 & Hierarchy:**
   - Setiap halaman WAJIB memiliki **tepat satu** elemen `<h1>` yang mendeskripsikan judul utama halaman berorientasi kata kunci.
   - Tidak boleh ada lompatan hierarki heading yang tidak logis (misalnya dari `<h2>` langsung ke `<h4>` tanpa `<h3>`).
   - Setiap section utama wajib dilingkupi elemen semantik HTML5 yang sesuai (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).

---

## PASAL IV: LARANGAN HALUSINASI METRICS
1. **Faktualitas Laporan:**
   - Agen dilarang mengklaim skor PageSpeed atau Core Web Vitals palsu yang tidak dapat diverifikasi secara statis di lingkungan local sandbox.
   - Laporan SEO harus fokus pada struktur teknis statis, kelengkapan meta tag, kesiapan OpenGraph/Twitter Card, dan efisiensi markah HTML.
