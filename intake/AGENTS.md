# 🛡️ INTAKE SUB-SKILL CONSTITUTION (`AGENTS.md`)

> **Konstitusi Kepatuhan Mutlak** untuk AI Agent berperan sebagai Ekstraktor Dokumen (`intake`).

---

## PASAL I: VERIFIKASI KEHADIRAN ASET & MEDIA COM PRO
1. **Penegakan Fakta Aset:**
   - Saat memproses data ekstraksi dari dokumen Company Profile, agen wajib mengecek dan mengidentifikasi keberadaan aset foto maupun tautan video murni.
   - **Label No-Video Default:** Apabila dokumen compro terbukti TIDAK MENYEDIAKAN tautan media/video, agen dilarang membuat asumsi tautan palsu. Wajib mencantumkan status **`[No-Video Default]`** secara jelas dalam file `intake_compro.md` sebagai patokan validasi bagi perancang layout berikutnya.

---

## PASAL II: KETENTUAN TAMBAHAN (TASK 8)
1. **Faktualitas PDF:** Hanya mengekstrak fakta yang ada di PDF compro. Dilarang menambah klaim atau opini.
2. **Path Relatif:** Simpan output ke `landings/<brand>/intake_compro.md`, `intake_raw.json`, dan direktori `assets/`.
