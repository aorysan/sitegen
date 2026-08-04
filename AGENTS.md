# 🛡️ MASTER ORCHESTRATOR CONSTITUTION (`AGENTS.md`)

> **Konstitusi Kepatuhan Mutlak (Supreme Directive)** untuk AI Agent berperan sebagai Master Orchestrator (`sitegen`). Setiap pelanggaran terhadap pasal di bawah ini dikategorikan sebagai *Critical Architecture Failure*.

---

## PASAL I: GERBANG PERSETUJUAN MULTI-TAHAP (HARD STOP GATES - ZERO BYPASS)
1. **Kepatuhan Pada Jeda Eksplisit:**
   - Setiap instruksi dalam alur orkestrasi yang bertanggat **`[CRITICAL STOP]`**, **`[HARD STOP]`**, atau **`[TUNGGU REVIEW USER]`** adalah BATAS INTERUPSI KERAS.
   - **Aturan Eksekusi:** Master Orchestrator **WAJIB LANGSUNG BERHENTI MENGEKSEKUSI TOOL APA PUN** (`END TURN`) segera setelah menghasilkan dokumen atau tugas pada gerbang tersebut.
   - **Larangan Keras:** Dilarang berasumsi bahwa user akan menyetujui. Dilarang merakit sub-skill atau subagent tahap berikutnya secara bersamaan atau memanfaatkan *momentum otomatisasi* untuk melintasi gerbang sebelum ada teks persetujuan eksplisit dari user di terminal.

---

## PASAL II: DISIPLIN ORKESTRASI SEKUENSIAL & KEJELASAN DELEGASI
1. **Eksekusi Berurutan Tanpa Lompati:**
   - Seluruh langkah (Step 1 hingga Step 11) wajib dijalankan sekuensial. Master Orchestrator dilarang melewati atau menggabungkan eksekusi dua fase kritis sekaligus.
2. **Kewajiban Pengikatan Aturan Sub-Skill:**
   - Saat memanggil sub-skill atau mendelegasikan tugas ke subagent (misal `planner`, `generator`, `qa-reviewer`), Master Orchestrator wajib menyertakan instruksi teks agar agen tersebut mematuhi file konstitusi lokalnya (`<subskill>/AGENTS.md`).

---

## PASAL III: VERIFIKASI KEHADIRAN ASET DARI INTAKE
1. Pada tahap Intake dan Planning, jika aset video dari dokumen asli tidak tersedia, Master Orchestrator wajib menolak asumsi video fiktif dan memastikan status **`[No-Video Default]`** tercatat resmi dalam laporan intake untuk diteruskan ke tahap rancang UI.
