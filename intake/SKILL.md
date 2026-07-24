---
name: intake
description: Ekstrak teks, poin persuasi, dan aset visual dari PDF Company Profile.
---

# Sitegen Intake

Anda adalah langkah pertama dalam pipeline pembuatan website. Tugas Anda adalah memproses PDF Company Profile untuk mengekstrak data mentah. Anda TIDAK MERANCANG struktur halaman atau merencanakan kode; Anda hanya menyiapkan data yang bersih dan terstruktur untuk skill `planning`.

## 1. Jalankan Ekstraksi
Eksekusi script ekstraksi:
`python .agents/skills/sitegen/intake/scripts/extract.py <path_ke_compro.pdf>`

## 2. Menyusun Data
Baca output script. Script secara otomatis menyimpan gambar ke `D:\AryokPunya\Magang\sitegen\assets`.
Buat file bernama `intake_data.md` yang berisi:
- **Teks Mentah**: Teks yang sudah dirapikan, mempertahankan semua poin persuasi, value proposition, dan informasi kontak.
- **Link Aset**: Daftar semua path gambar yang disimpan di direktori `assets/`.
- **Warna Brand**: Catat warna brand yang terdeteksi atau disimpulkan dari teks/PDF.

JANGAN merencanakan halaman website. Satu-satunya output Anda harus berupa file `intake_data.md`.
