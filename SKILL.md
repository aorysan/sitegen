---
name: sitegen
description: Generator Website Multi-Page Next.js berdasarkan asupan dokumen Company Profile (PDF). Menghasilkan website korporat profesional dengan standar animasi interaktif modern (terinspirasi dari *Zenless Zone Zero*), animasi smooth scroll Lenis, serta optimasi SEO Lanjutan. Output berupa project Next.js TypeScript lengkap (App Router, Vanilla CSS) di folder `landings/<brand>/`.
---

# Full Website Generator (Sitegen V3.1)

Menghasilkan **Website Multi-Page berbasis Next.js (TypeScript)** dengan *feel* premium, animasi *smooth scroll* via Lenis, transisi mulus, dan *micro-interactions* tingkat tinggi. Input utama adalah dokumen **Company Profile (PDF)**. Output adalah struktur proyek Next.js lengkap (komponen, halaman, routing, aset, SEO files).

## Prinsip (JANGAN DILANGGAR)

1. **Estetika Profesional, Rasa Dinamis.** Desain WAJIB 100% profesional dan elegan (Corporate/Business style). Namun, animasi dan fluiditasnya harus mengambil standar kualitas tinggi (*smooth scrolling* via Lenis, efek paralaks, transisi mulus, *hover* taktil) seperti referensi website interaktif (contoh: *Zenless Zone Zero*), *TANPA meniru gaya gaming/kartunnya*.
2. **Framework & Styling Wajib.** Hanya gunakan **Next.js (App Router)** dengan **TypeScript (`.tsx`)** dan **Vanilla CSS Modules** (`.module.css`). **DILARANG KERAS menggunakan Tailwind CSS**.
3. **Anti-AI Slop & Dilarang Emoji.** DILARANG KERAS menggunakan EMOJI (seperti 🚀, 💡, 🛡️) di elemen UI mana pun karena merusak tingkat profesionalisme korporat. Anda WAJIB hanya menggunakan *iconography* modern berbasis SVG murni atau *library* ikon profesional seperti `lucide-react`.
4. **Gambar Unik & Terverifikasi.** DILARANG KERAS menggunakan gambar berulang. Setiap gambar di setiap halaman harus unik. Anda WAJIB memverifikasi bahwa URL gambar yang digunakan valid dan dapat diakses (bukan link 404). Utamakan mengambil/mengadaptasi gambar dari dokumen PDF Company Profile jika ada.
5. **Preservasi Pesan & Persuasi PDF.** Teks persuasi, poin *value proposition*, dan kalimat berdaya pikat yang ada di PDF Company Profile DILARANG dihapus/dibuang. Teks tersebut harus diadaptasi secara alami dan diperkaya dengan kata kunci SEO.
6. **Animasi Lenis Mandatory.** Setiap proyek WAJIB menginstal `@studio-freight/lenis` (atau paket Lenis React) dan mengintegrasikannya secara global di `app/layout.tsx` untuk memastikan kelancaran *scrolling*.
7. **SEO & Keywords Strict Compliance.** 
   - Riset kata kunci (Google Trends / Keyword Planner logic) dilakukan di Gate 1.
   - 1 halaman = 1 grup kata kunci utama (mencegah *keyword cannibalization*).
   - Gunakan *Buying Keywords* dan *LSI Keywords*.
   - Title Tag ≤ 55 karakter (CTR-oriented). Meta Description ≤ 155 karakter.
   - Setiap halaman memuat 1 *section* untuk *embed* video SMO (Social Media Optimization) yang relevan.
   - Wajib buat file `app/sitemap.ts`, `app/robots.ts`, dan `public/llms.txt`.
8. **Aksesibilitas & Attributes.** Semua tag `<a>` (link) dan `<img>` / `<Image />` WAJIB memiliki atribut `title` dan `alt`.
9. **LOKASI OUTPUT.** Hasil akhir (proyek Next.js) DILARANG ditaruh di dalam folder skill `.agents/skills/sitegen/`. Harus selalu di-*scaffold* di root `landings/<brand>/`.

## Workflow Eksekusi

### GATE 0 — INTAKE (PDF Wajib)
Sebelum melakukan *scaffolding*, kamu harus menagih **Company Profile (PDF)** dari pengguna. Gunakan pedoman `reference/company_profile_intake.md` untuk mengekstrak data dari PDF tersebut.

### GATE 1 — SEO RESEARCH & SITEMAP PLANNING
Analisis PDF tersebut dan lakukan riset tren (Google Trends / Keyword Planner logic):
1. Tentukan *Buying Keywords* utama dan *LSI Keywords* dengan *impression* tinggi & potensi *CTR* besar.
2. Petakan konten ke **7 Halaman Inti**, pastikan URL halaman memuat kata kunci utama (misal: `/layanan-utama-kami`):
   - Beranda (`/`)
   - Tentang Kami (`/about`)
   - Layanan/Produk (`/services` atau `/layanan-<keyword>`)
   - Portofolio/Studi Kasus (`/portfolio`)
   - Blog/Edukasi (`/blog`) — Sertakan minimal 3 artikel *backlink* bernuansa publikasi (persiapan untuk `wajibaca.com`).
   - Karir (`/careers`)
   - Kontak Kami (`/contact`)
3. Susun rancangan *JSON Site Structure* sesuai `reference/schema.json`.

### GATE 2 — SCAFFOLDING (TypeScript)
Beralihlah ke folder `landings/` di root workspace, dan buat folder `<brand>` jika belum ada.
Lalu jalankan perintah ini (sesuaikan `<brand>`) untuk menginisialisasi Next.js TypeScript secara non-interaktif:
```bash
npx create-next-app@latest ./landings/<brand> --use-npm --eslint --tailwind=false --src-dir=false --app --ts --import-alias="@/*"
```
**Perhatian**: 
- Jika muncul *warning Turbopack/Workspace lockfile*, hapus `package-lock.json` lokal atau tambahkan `experimental: { turbopack: { root: "..." } }` di `next.config.ts` atau `next.config.mjs`.
- Instal dependensi animasi Lenis & Ikon: `cd landings/<brand> && npm install lenis lucide-react`.

### GATE 3 — DEVELOPMENT, MOBILE UX & SEO INTEGRATION
Setelah Next.js siap:
1. Bersihkan kode bawaan (hapus `app/globals.css` bawaan, buat variabel CSS warna dari PDF).
2. Konfigurasi Lenis Provider / Smooth Scroll di `app/layout.tsx` bersama dengan *Schema.org JSON-LD*.
3. Buat file `app/sitemap.ts`, `app/robots.ts`, dan `public/llms.txt`.
4. Buat `components/Header.tsx` (dengan burger menu 3 garis utuh, safe-area padding kanan, dan animasi React state) & `components/Footer.tsx`. (Pastikan semua rute dan tombol memiliki `title="..."`).
5. Buat folder dan file `page.tsx` untuk ke-7 halaman standar.
6. Pada tiap `page.tsx`:
   - Sertakan metadata SEO (`title` ≤ 55 char, `description` ≤ 155 char).
   - Masukkan *section embed video* SMO (YouTube/Sosmed).
   - **HUKUM MUTLAK SwipeableCards**: Setiap kali Anda membuat elemen Grid/List (seperti daftar fitur, values, harga, artikel, portofolio) dengan 2 kolom atau lebih, WAJIB DIBUNGKUS komponen `<SwipeableCards>` di seluruh halaman. Jangan lupa impor `import SwipeableCards from "@/components/SwipeableCards";`.
   - Pastikan semua `<Image />` punya `title` & `alt` serta gambarnya unik/tidak duplikat.
   - Di halaman Blog, masukkan 3 artikel *backlink* ber-gambar yang mengarah kembali ke situs utama.

### GATE 4 — QC & SCREENSHOT (Puppeteer Self-Healing)
Setelah proyek selesai dikode:
1. Pastikan dev server menyala: `cd landings/<brand> && npm run dev` (biarkan di background).
2. Jalankan skrip *screenshot crawler* yang sudah dilengkapi pendeteksi *error*:
   ```bash
   node .agents/skills/sitegen/scripts/render.js http://localhost:3000 / /about /services /portfolio /blog /careers /contact
   ```
3. Jika terminal menampilkan `[Browser Error]` atau `[Page Error]`, perbaiki kode React/CSS-nya. Jika semua hijau dan gambar tersimpan di `landings/<brand>/.preview/`, eksekusi selesai!
