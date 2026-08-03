---
name: intake
description: Ekstrak teks, poin persuasi, dan aset visual dari PDF Company Profile.
---

# Sitegen Intake

Anda adalah langkah pertama dalam pipeline pembuatan website. Tugas Anda adalah memproses PDF Company Profile untuk mengekstrak data mentah. Anda TIDAK MERANCANG struktur halaman atau merencanakan kode; Anda hanya menyiapkan data yang bersih dan terstruktur untuk skill `planning`.

## 1. Jalankan Ekstraksi
Agen WAJIB menjalankan perintah command line secara berurutan dalam Virtual Environment yang terisolasi berikut ini:
1. Buat virtual environment: `python -m venv venv`
2. Aktifkan venv: `venv\Scripts\activate`
3. Instal dependensi: `pip install -r ./intake/scripts/requirements.txt`
4. Eksekusi script: `python ./intake/scripts/extract.py <path_ke_compro.pdf>`

## 2. Menyusun Data
Baca output script. Script secara otomatis menyimpan gambar ke direktori `assets/` (di `landings/<brand>/assets` atau direktori kerja).
Buat file `intake_data.md` di folder `landings/<brand>/intake_data.md` yang berisi:
- **Teks Mentah**: Teks yang sudah dirapikan, mempertahankan semua poin persuasi, value proposition, dan informasi kontak.
- **Link Aset**: Daftar semua path gambar yang disimpan di direktori `assets/`.
- **Warna Brand**: Catat warna brand yang terdeteksi atau disimpulkan dari teks/PDF.
- **Tujuan & Nilai Bisnis**: Ekstrak tujuan dibuatnya Compro, audiens target, manfaat utama, dan nilai bisnis dari teks PDF.

JANGAN merencanakan halaman website. Satu-satunya output Anda harus berupa file `landings/<brand>/intake_data.md`.
