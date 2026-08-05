---
name: intake
description: Ekstrak teks, poin persuasi, dan aset visual dari PDF Company Profile.
---

# Sitegen Intake

> [!CAUTION]
> **MANDATORY CONSTITUTIONAL BINDING**: Sebelum mengecek dan mengekstrak dokumen, Anda WAJIB MEMBACA DAN MEMATUHI file konstitusi `AGENTS.md` di folder ini (`AGENTS.md`). Penanaman label `[No-Video Default]` bila tidak ditemukan tautan video adalah wajib.

Anda adalah langkah pertama dalam pipeline pembuatan website. Tugas Anda adalah memproses PDF Company Profile untuk mengekstrak data dan aset visual, lalu merekonstruksinya menjadi dokumen komersial terstruktur. Anda TIDAK MERANCANG struktur halaman atau merencanakan kode; Anda hanya menyiapkan data dan aset yang bersih, semantis, dan terstruktur untuk skill `planning`.

Alur kerja ini menerapkan arsitektur hybrid produser-konsumen: script `extract.py` bertindak sebagai **produser data terstruktur** (ekstraksi mentah dan metadata visual), sedangkan agen bertindak sebagai **konsumen, analis semantik, dan perename aset** sebelum menyusun dokumen akhir `intake_compro.md`.

## 1. Jalankan Ekstraksi (Produser Data)
Agen WAJIB menjalankan perintah command line secara berurutan dalam Virtual Environment yang terisolasi berikut ini:
1. Buat virtual environment: `python -m venv venv`
2. Aktifkan venv: `venv\Scripts\activate`
3. Instal dependensi: `pip install -r ./intake/scripts/requirements.txt`
4. Eksekusi script: `python ./intake/scripts/extract.py <path_ke_compro.pdf> [direktori_output]`

Script `extract.py` menghasilkan log teks di terminal DAN file terstruktur `intake_raw.json` di direktori output (misal: di `landings/<brand>/`). File JSON ini memuat:
- **`colors`**: Daftar warna brand terklasifikasi (`primary`, `secondary`, `neutral`) dalam format hex `#RRGGBB`.
- **`images`**: Metadata visual termasuk nomor halaman (`page`), dimensi resolusi (`width`, `height`), dan teks judul/heading terdekat (`nearby_heading`). Gambar berukuran <50px telah difilter secara otomatis oleh script sehingga hanya tersisa gambar bermakna yang disimpan di direktori `assets/` (atau `landings/<brand>/assets/`).

## 2. Analisis & Rekonstruksi Komponen Komersial (Konsumen & Analisis Semantik)
Sebelum menyusun dokumen akhir `intake_compro.md`, agen WAJIB membaca dan memproses data terstruktur dari `intake_raw.json` serta melakukan pengelolaan aset visual dengan prosedur berikut:

### A. Semantic Asset Renaming (Penamaan Ulang Aset Semantik)
1. Agen wajib membaca file `intake_raw.json` dari direktori output.
2. Untuk setiap file gambar di direktori output yang tercantum pada daftar `images` di `intake_raw.json`, analisa konteks `nearby_heading`, nomor halaman (`page`), dimensi resolusi, dan perannya dalam presentasi komersial.
3. Tentukan nama file bertiang slug semantis yang jelas dan mendeskripsikan peran atau isi gambar (contoh: dari nama mentah `img_p1_15.jpg` menjadi `hero-produk-unggulan.jpg`, atau dari `img_p2_30.png` menjadi `logo-klien-mandiri.png`).
4. Gunakan tool `run_command` dengan perintah shell (seperti `Move-Item` / `Rename-Item` di PowerShell atau `mv` jika di bash) untuk merename file fisik tersebut secara nyata di dalam direktori `assets/`.

### B. Penyusunan Dokumen `intake_compro.md`
Buat dokumen `intake_compro.md` di folder `landings/<brand>/intake_compro.md` yang memuat rekonstruksi komponen komersial secara terstruktur:
- **Teks Mentah & Komponen Komersial**: Teks yang sudah dirapikan, mempertahankan semua poin persuasi, value proposition, dan informasi kontak.
- **Palet Warna Desain (Color Palette & Design Tokens)**: Rangkuman hasil ekstraksi warna (`#RRGGBB` untuk warna utama, sekunder, dan netral) dari `intake_raw.json` yang akan menjadi dasar token desain UI.
- **Link Aset & Metadata Visual**: Daftar semua path gambar di direktori `assets/` beserta keterangan konteks atau peranan visualnya dalam presentasi.
- **Tujuan & Nilai Bisnis**: Ekstrak tujuan dibuatnya Compro, audiens target, manfaat utama, dan nilai bisnis dari teks PDF.
- **Ketersediaan Aset Media/Video**: Catat status ketersediaan video dari compro; jika video nihil, beri label status *[No-Video Default]* agar perancangan selanjutnya menyiapkan fallback antarmuka interaktif atau mengkonfirmasi input video langsung ke user.

### Aturan Wajib (Mandatory Rules)
- **Mandate Nama Semantik**: Seluruh referensi tautan gambar di dalam dokumen `intake_compro.md` HARUS menggunakan **nama file semantik baru** yang telah direname (bukan lagi nama mentah berawalan `img_pX_Y` atau `extracted_img_`).
- **Batasan Skala Kerja**: JANGAN merencanakan struktur, layout, atau kode halaman website. Satu-satunya output akhir Anda pada tahap ini adalah aset fisik yang telah ter-rename di direktori `assets/` dan file dokumen `landings/<brand>/intake_compro.md`.
