# Sitegen Batch 1 (Zero-Risk Docs & Paths) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Terapkan 10 SPEC Batch 1 (dedup, path, penamaan, harness, rubrik, AGENTS.md, README) tanpa mengubah perilaku generator/kode.

**Architecture:** Edit markdown/JSON langsung per SPEC, satu SPEC satu verifikasi `rg`/dry-run. Tidak ada perubahan `.tsx`, tidak ada template kode baru, tidak ada perubahan dependensi.

**Tech Stack:** Markdown, JSON, Node.js 18+ (dry-run `render.mjs`), `rg` (ripgrep) untuk verifikasi hitungan.

**Spec:** `.claude/plugins/sitegen/docs/superpowers/specs/2026-09-23-sitegen-batch1-zero-risk-design.md`

## Global Constraints

- Workdir perintah: `/home/aorysan/aorysan/AryokPunya/Magang/sitegen` (repo root).
- Jangan ubah perilaku animasi: Trilogi + unidirectional tetap (keputusan user 2026-09-23).
- Nama laporan tunggal: `SEO-AUDIT.md` — string `SEO-REPORT` tidak boleh tersisa di plugin kecuali histori/changelog.
- Jangan commit file `venv/`, `node_modules/`, `landings/*/web/node_modules`.
- Setiap task diakhiri verifikasi + commit terpisah.

---

### Task 1: Dedup Step 7 master (SPEC-01)

**Files:**
- Modify: `.claude/plugins/sitegen/SKILL.md` (rentang L88-117, susut ±15 baris)
- Test: verifikasi via `rg -c` (tidak ada file test baru)

**Interfaces:**
- Consumes: SPEC-01 dari spec Batch 1.
- Produces: Step 7 dengan tiap blok tepat 1x — Task 2-8 mengacu ke nomor langkah yang sudah bersih ini.

- [ ] **Step 1: Baca rentang yang akan diedit**

Run: `sed -n '85,120p' .claude/plugins/sitegen/SKILL.md`
Expected: terlihat blok ganda (Constraint 2x, Fallback 2x, eksekusi PAGES-LIST 2x, QA code-review 2x, Visual QA 2x).

- [ ] **Step 2: Hapus salinan kedua tiap blok**

Hapus duplikat persis ini (pertahankan sal pertama pertama):
a. Blok `    - **Constraint Keamanan Paralelisme:**` kedua beserta 3 sub-poinnya (yang di L93-95).
b. Blok `    - **Fallback**: Jika paralelisme menyebabkan...` kedua (L97).
c. Baris `Lakukan eksekusi berdasarkan ... dilarang meloop satu-satu):` kedua (L100).
d. Bullet `Setelah pembangunan halaman selesai, panggil subagent sitegen-qa-reviewer mode=code-review...` kedua (L110-111).
e. Blok `c. **Visual QA Review...` + `d. Lanjutkan mengeksekusi sisa halaman...` kedua (L116-117).
Hasil akhir urutan: strategi paralel → constraint (1x) → fallback (1x) → eksekusi PAGES-LIST (1x) → 7a SDD loop (1x QA call) → 7b Playwright → 7c Visual QA + STOP (1x) → 7d sisa halaman (1x).

- [ ] **Step 3: Verifikasi hitungan tepat 1x**

Run: `for p in "Constraint Keamanan Paralelisme" "Fallback.*paralelisme menyebabkan" "Lakukan eksekusi berdasarkan" "Setelah pembangunan halaman selesai" "Visual QA Review"; do printf "%s: " "$p"; rg -c "$p" .claude/plugins/sitegen/SKILL.md; done`
Expected: tiap pola tercetak `1`.

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/SKILL.md
git commit -m "docs(sitegen): dedup Step 7 master, satu QA call per halaman"
```

---

### Task 2: Perbaikan path & penamaan (SPEC-02, SPEC-03, SPEC-04)

**Files:**
- Modify: `.claude/plugins/sitegen/plugin.json:8`
- Modify: `.claude/plugins/sitegen/skills/research/SKILL.md:27,75` (+ 1 baris catatan base-dir)
- Modify: `.claude/plugins/sitegen/skills/seo/AGENTS.md:10`
- Modify: `.claude/plugins/sitegen/skills/debug/SKILL.md:39`
- Test: verifikasi via `rg` + `node -e` resolve JSON.

**Interfaces:**
- Consumes: SPEC-02, SPEC-03, SPEC-04.
- Produces: path plugin valid; ref research resolve; nama `SEO-AUDIT.md` tunggal — Task 5 (harness) mengacu ke nama laporan ini.

- [ ] **Step 1: Fix plugin.json path master**

Ganti di `.claude/plugins/sitegen/plugin.json`:
```json
"name": "sitegen",
"path": "skills/SKILL.md",
```
menjadi:
```json
"name": "sitegen",
"path": "SKILL.md",
```

- [ ] **Step 2: Fix ref research + catatan base-dir**

Ganti di `skills/research/SKILL.md:27`: `planner/reference/prd-user-needs-template.md` → `../planner/reference/prd-user-needs-template.md`.
Ganti di `skills/research/SKILL.md:75`: `planner/reference/prd-competitor-template.md` → `../planner/reference/prd-competitor-template.md`.
Tambahkan tepat di atas STEP 2: `> Path template di bawah relatif ke folder skill ini (skills/research/).`

- [ ] **Step 3: Standarkan nama laporan SEO**

Ganti di `skills/seo/AGENTS.md:10`: `SEO-REPORT.md` → `SEO-AUDIT.md` (path lengkap `landings/<brand>/reports/SEO-AUDIT.md`).
Ganti di `skills/debug/SKILL.md:39`: `landings/<brand>/reports/SEO-AUDIT.md` (atau `reports/SEO-REPORT.md`)` → `landings/<brand>/reports/SEO-AUDIT.md`.

- [ ] **Step 4: Verifikasi**

Run: `node -e "const p=require('./.claude/plugins/sitegen/plugin.json'); const fs=require('fs'); const bad=p.skills.filter(s=>!fs.existsSync('.claude/plugins/sitegen/'+s.path)); console.log('broken:', JSON.stringify(bad));"`
Expected: `broken: []`.
Run: `rg -i "SEO-REPORT" .claude/plugins/sitegen/skills .claude/plugins/sitegen/SKILL.md .claude/plugins/sitegen/plugin.json; echo "rg-exit=$?"`
Expected: `rg-exit=1` (tidak ada hasil).
Run: `ls .claude/plugins/sitegen/skills/planner/reference/prd-user-needs-template.md .claude/plugins/sitegen/skills/planner/reference/prd-competitor-template.md`
Expected: kedua file terdaftar.

- [ ] **Step 5: Commit**

```bash
git add .claude/plugins/sitegen/plugin.json .claude/plugins/sitegen/skills/research/SKILL.md .claude/plugins/sitegen/skills/seo/AGENTS.md .claude/plugins/sitegen/skills/debug/SKILL.md
git commit -m "docs(sitegen): fix plugin path, research refs, standar SEO-AUDIT.md"
```

---

### Task 3: Satu harness resmi render.mjs (SPEC-05)

**Files:**
- Create (pindahan): `.claude/plugins/sitegen/skills/scripts/render.mjs` (isi = salinan persis `../generator/scripts/render.mjs` 54 baris)
- Delete: `.claude/plugins/sitegen/skills/generator/scripts/render.mjs`, `.claude/plugins/sitegen/skills/scripts/render.js` (atau tandai deprecated — pilih hapus, karena CJS + default `pawitra` hardcoded)
- Modify: `.claude/plugins/sitegen/skills/debug/SKILL.md:20-21` (perintah + contoh baru)
- Test: dry-run `node .../render.mjs` tanpa argumen.

**Interfaces:**
- Consumes: SPEC-05; nama `SEO-AUDIT.md` dari Task 2 (tidak dipakai langsung di sini).
- Produces: `skills/scripts/render.mjs` resmi dengan signature `<brand> <baseUrl> <route...>` — dipakai debug Step 7b/7c dan Batch 2 Playwright.

- [ ] **Step 1: Pindahkan harness ESM ke lokasi resmi**

Run: `cp .claude/plugins/sitegen/skills/generator/scripts/render.mjs .claude/plugins/sitegen/skills/scripts/render.mjs && rm .claude/plugins/sitegen/skills/generator/scripts/render.mjs .claude/plugins/sitegen/skills/scripts/render.js && ls .claude/plugins/sitegen/skills/scripts/ .claude/plugins/sitegen/skills/generator/scripts/`
Expected: `skills/scripts/` berisi `render.mjs`; `skills/scripts/render.js` dan `generator/scripts/render.mjs` hilang; `generator/scripts/` tersisa `extract-colors.js`, `extract-pdf.mjs`.

- [ ] **Step 2: Tulis ulang instruksi debug Tahap 1**

Ganti `skills/debug/SKILL.md:20-21` menjadi:
```markdown
1. Jalankan harness screenshot resmi dengan rute dari PAGES-LIST.md:
   `node <sitegen-skill-dir>/skills/scripts/render.mjs <brand> <baseUrl> <route1> [route2...]`
   Contoh: `node .claude/plugins/sitegen/skills/scripts/render.mjs timebase http://localhost:3000 / /about`
   di mana `<sitegen-skill-dir>` adalah path absolut folder `.claude/plugins/sitegen/` di workspace aktif.
```

- [ ] **Step 3: Verifikasi dry-run + tidak ada sisa usang**

Run: `node .claude/plugins/sitegen/skills/scripts/render.mjs; echo "exit=$?"`
Expected: `Usage: node render.mjs <brandName> <baseUrl> <route1> [route2...]` dan `exit=1`.
Run: `rg -n "render\.js|pawitra" .claude/plugins/sitegen/skills .claude/plugins/sitegen/SKILL.md; echo "rg-exit=$?"`
Expected: `rg-exit=1` (tidak ada hasil).

- [ ] **Step 4: Commit**

```bash
git add -A .claude/plugins/sitegen/skills/scripts .claude/plugins/sitegen/skills/generator/scripts .claude/plugins/sitegen/skills/debug/SKILL.md
git commit -m "fix(sitegen): satu harness render.mjs resmi, hapus render.js pawitra"
```

---

### Task 4: Intake Linux-compat (SPEC-06)

**Files:**
- Modify: `.claude/plugins/sitegen/skills/intake/SKILL.md:42`
- Test: `bash -n` tidak relevan (markdown); verifikasi via `rg` varian ada.

**Interfaces:**
- Consumes: SPEC-06.
- Produces: perintah ekstraksi 2-OS — dipakai ulang saat intake PDF di Batch 2.

- [ ] **Step 1: Ganti perintah ekstraksi satu-rantai**

Ganti isi langkah ekstraksi di `skills/intake/SKILL.md` menjadi:
````markdown
Jalankan ekstraksi dari repo root. Pilih varian OS:
Linux/macOS (bash):
`python3 -m venv venv && source venv/bin/activate && pip install -r .claude/plugins/sitegen/skills/intake/scripts/requirements.txt && python .claude/plugins/sitegen/skills/intake/scripts/extract.py <path_ke_compro.pdf> <direktori_output>`
Windows (PowerShell):
`python -m venv venv; venv\Scripts\Activate.ps1; pip install -r .claude/plugins/sitegen/skills/intake/scripts/requirements.txt; python .claude/plugins/sitegen/skills/intake/scripts/extract.py <path_ke_compro.pdf> <direktori_output>`
Catatan: folder `venv/` dibuat di repo root (di luar 4-pilar, jangan di-commit).
````

- [ ] **Step 2: Verifikasi file acuan ada**

Run: `ls .claude/plugins/sitegen/skills/intake/scripts/extract.py .claude/plugins/sitegen/skills/intake/scripts/requirements.txt && rg -c "venv/bin/activate|Activate.ps1" .claude/plugins/sitegen/skills/intake/SKILL.md`
Expected: kedua file terdaftar dan hitungan `2`.

- [ ] **Step 3: Commit**

```bash
git add .claude/plugins/sitegen/skills/intake/SKILL.md
git commit -m "docs(sitegen): intake extraction Linux-compat + path absolut"
```

---

### Task 5: Constraint stack ui-ux-pro-max (SPEC-07)

**Files:**
- Modify: `.claude/plugins/sitegen/SKILL.md:67` (Step 5a, tambah 1 kalimat)
- Test: verifikasi via `rg`.

**Interfaces:**
- Consumes: SPEC-07.
- Produces: Step 5a terkunci `nextjs` + Vanilla — mencegah output `html-tailwind` yang di-AUTO-FAIL debug.

- [ ] **Step 1: Tambahkan constraint**

Sisipkan setelah kalimat pemanggilan `sitegen-ui-ux-pro-max` di Step 5a:
`Panggil dengan constraint stack `nextjs`, styling Vanilla CSS Modules, DILARANG `html-tailwind`/`shadcn` (output Tailwind akan di-AUTO-FAIL debug).`

- [ ] **Step 2: Verifikasi**

Run: `rg -n "html-tailwind" .claude/plugins/sitegen/SKILL.md`
Expected: tepat 1 baris (constraint baru).

- [ ] **Step 3: Commit**

```bash
git add .claude/plugins/sitegen/SKILL.md
git commit -m "docs(sitegen): kunci stack nextjs-vanilla untuk ui-ux-pro-max"
```

---

### Task 6: Rubrik C/D/E qa-reviewer (SPEC-08)

**Files:**
- Modify: `.claude/plugins/sitegen/skills/qa-reviewer/reference/review-checklist.md` (tambah Bagian C, D, E + mode extended di header L4-6)
- Modify: `.claude/plugins/sitegen/skills/qa-reviewer/SKILL.md:183-186` (STEP 2 petakan extended → C/D/E)
- Test: hitung bobot via `rg`/inspeksi.

**Interfaces:**
- Consumes: tabel C/D/E di `qa-reviewer/SKILL.md:92-119` sebagai sumber angka (C: 10+10+5; D: 10+10+5; E: 8+7+10).
- Produces: checklist 215+ baris mencakup A-E — dipakai QA extended Batch 2.

- [ ] **Step 1: Tambah Bagian C/D/E ke checklist**

Salin definisi persis dari `SKILL.md:92-119` menjadi tiga bagian baru:
`## BAGIAN C — Review User Needs (25 poin)`: C1 Kelengkapan Struktur 10, C2 Kedalaman Insight 10, C3 Anti-Generik 5.
`## BAGIAN D — Review Competitor (25 poin)`: D1 Kelengkapan Kompetitor 10, D2 Kedalaman Analisis 10, D3 Akurasi Data 5.
`## BAGIAN E — Review Design System (25 poin)`: E1 Color System 8, E2 Typography & Spacing 7, E3 Layout & Component 10.
Tiap item: tabel `| Item | Poin | Kriteria |` dengan kriteria 1 baris yang sudah ada di SKILL.md. Update header L4-6: tambah `- Mode global-extended → gunakan Bagian A + C + D + E` dan `Skor minimum: A ≥ 90/100, subtotal C+D+E ≥ 60/75`.

- [ ] **Step 2: Petakan mode di SKILL STEP 2**

Ganti `SKILL.md:183-186` tambah baris: `- Mode global-extended → Bagian A + C + D + E (lihat reference/review-checklist.md).`

- [ ] **Step 3: Verifikasi bobot**

Run: `rg -n "^## BAGIAN [CDE] " .claude/plugins/sitegen/skills/qa-reviewer/reference/review-checklist.md && rg -n "global-extended" .claude/plugins/sitegen/skills/qa-reviewer/reference/review-checklist.md .claude/plugins/sitegen/skills/qa-reviewer/SKILL.md`
Expected: 3 header bagian + minimal 2 baris `global-extended`.

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/qa-reviewer/reference/review-checklist.md .claude/plugins/sitegen/skills/qa-reviewer/SKILL.md
git commit -m "docs(sitegen): lengkapi rubrik QA C/D/E extended"
```

---

### Task 7: AGENTS.md hilang + redaksi HARD STOP (SPEC-09)

**Files:**
- Create: `.claude/plugins/sitegen/skills/impeccable/AGENTS.md`
- Create: `.claude/plugins/sitegen/skills/ui-ux-pro-max/AGENTS.md`
- Create: `.claude/plugins/sitegen/skills/systematic-debugging/AGENTS.md`
- Modify: titik gerbang di `sitegen/SKILL.md` + sub-SKILL (samakan frasa, tanpa ubah makna)
- Test: `ls` + `rg -c "AKHIRI GILIRAN"`.

**Interfaces:**
- Consumes: redaksi acuan `skills/brainstorming/AGENTS.md:22-24`; BAB VI master (dual-constituencies).
- Produces: 12/12 folder skill berkonstitusi — prasyarat kepatuhan Batch 2.

- [ ] **Step 1: Buat AGENTS.md impeccable**

Isi `.claude/plugins/sitegen/skills/impeccable/AGENTS.md`:
```markdown
# Impeccable Sub-Skill Constitution (`AGENTS.md`)

> Konstitusi Kepatuhan Mutlak untuk AI Agent berperan sebagai Direktur Desain (`impeccable`).

## PASAL I: BRIEF MENANG ATAS SELERA
1. Hormati PRODUCT.md, DESIGN.md, dan surface brief; jangan arahkan ulang brief yang jelas ke selera sendiri.

## PASAL II: ANTI-SLOP & KONSTITUSI GENERATOR
1. Larangan emoji sebagai ikon, larangan Tailwind (output untuk sitegen wajib Vanilla CSS Modules agar lolos debug AUTO-FAIL), dan pasangan atribut `alt`/`title` pada tiap gambar — sama mengikatnya seperti konstitusi generator.
```

- [ ] **Step 2: Buat AGENTS.md ui-ux-pro-max**

Isi `.claude/plugins/sitegen/skills/ui-ux-pro-max/AGENTS.md`:
```markdown
# UI-UX-Pro-Max Sub-Skill Constitution (`AGENTS.md`)

> Konstitusi Kepatuhan Mutlak untuk AI Agent berperan sebagai Perancang Desain (`ui-ux-pro-max`).

## PASAL I: STACK TERKUNCI UNTUK SITEGEN
1. Saat dipanggil dari master sitegen, stack terkunci `nextjs` + Vanilla CSS Modules; DILARANG merekomendasikan `html-tailwind`/`shadcn` (akan di-AUTO-FAIL debug).

## PASAL II: ANTI-HALUSINASI BASIS DATA
1. Klaim pola/warna/font wajib dari hasil `scripts/search.py`, bukan karangan; bila 0 hasil, nyatakan eksplisit memakai default umum.
```

- [ ] **Step 3: Buat AGENTS.md systematic-debugging**

Isi `.claude/plugins/sitegen/skills/systematic-debugging/AGENTS.md`:
```markdown
# Systematic-Debugging Sub-Skill Constitution (`AGENTS.md`)

> Konstitusi Kepatuhan Mutlak untuk AI Agent berperan sebagai Penyelidik Root Cause (`systematic-debugging`).

## PASAL I: IRON LAW
1. DILARANG mengusulkan fix sebelum investigasi root cause (Phase 1) selesai; patuhi 4 fase di `SKILL.md`.

## PASAL II: INTEGRASI SITEGEN
1. Saat dipanggil dari master sitegen, hormati batas iterasi master (generator 5x, debug 3x, post-deploy 2x); eskalasi `[HARD STOP]` bila batas tercapai.
```

- [ ] **Step 4: Samakan frasa gerbang**

Di tiap baris gerbang (`[HARD STOP]`/`[CRITICAL STOP]`) pada `sitegen/SKILL.md`, `intake/SKILL.md`, `brainstorming/SKILL.md`, pastikan frasa lengkap ini ada tepat 1x per gerbang: `BERHENTI MENGEKSEKUSI TOOL APA PUN DAN AKHIRI GILIRAN (END TURN). Tunggu konfirmasi persetujuan dari user secara eksplisit sebelum melanjutkan ke tahap berikutnya. Dilarang memanfaatkan momentum untuk meneruskan eksekusi secara mandiri.`

- [ ] **Step 5: Verifikasi**

Run: `for d in brainstorming debug deploy generator impeccable intake planner qa-reviewer research seo systematic-debugging ui-ux-pro-max; do test -f .claude/plugins/sitegen/skills/$d/AGENTS.md && echo "$d OK" || echo "$d MISSING"; done`
Expected: 12 baris `OK`.

- [ ] **Step 6: Commit**

```bash
git add .claude/plugins/sitegen/skills/impeccable/AGENTS.md .claude/plugins/sitegen/skills/ui-ux-pro-max/AGENTS.md .claude/plugins/sitegen/skills/systematic-debugging/AGENTS.md .claude/plugins/sitegen/SKILL.md .claude/plugins/sitegen/skills/intake/SKILL.md .claude/plugins/sitegen/skills/brainstorming/SKILL.md
git commit -m "docs(sitegen): lengkapi AGENTS.md 3 skill + samakan frasa HARD STOP"
```

---

### Task 8: README penuh (SPEC-10)

**Files:**
- Modify: `.claude/plugins/sitegen/README.md` (73 baris → ±130 baris)
- Test: `rg` 13 nama skill + `rg -c "Prerequisites"` = 1.

**Interfaces:**
- Consumes: hasil Task 1-7 (path resmi, harness, keputusan arsitektur, changelog).
- Produces: README akurat — pintu masuk dokumentasi Batch 2.

- [ ] **Step 1: Gabung Prerequisites + OS + dependensi berat**

Ganti dua header `## Prerequisites` / `## 📋 Prerequisites` jadi satu `## 📋 Prerequisites` berisi: Python 3.x (extract.py, search.py), Node.js 18+ (Next.js, Playwright), Git, OS (Linux bash `source venv/bin/activate` vs Windows PowerShell `venv\Scripts\Activate.ps1`), catatan instalasi berat (`puppeteer` ±120-170MB, `sharp` native) hanya untuk QC.

- [ ] **Step 2: Ganti §Struktur Direktori Repositori**

Ganti daftar lama (intake/, research/, ...) menjadi:
a. 4-pilar `landings/<brand>/{intake,planning,web,reports}` + larangan Zero Root Pollution.
b. Daftar 13 skill aktual (`sitegen`, `brainstorming`, `debug`, `deploy`, `generator`, `impeccable`, `intake`, `planner`, `qa-reviewer`, `research`, `seo`, `systematic-debugging`, `ui-ux-pro-max`).
c. Skrip resmi: `skills/scripts/render.mjs`, `skills/intake/scripts/extract.py`, `skills/seo/scripts/check-technical.js`, `skills/ui-ux-pro-max/scripts/search.py`.

- [ ] **Step 3: Tambah § Keputusan Arsitektur + Changelog**

Tambah `## Keputusan Arsitektur` (Trilogi + unidirectional; laporan `SEO-AUDIT.md`; harness `render.mjs`; stack `nextjs` Vanilla; spec 2026-08-05 §2.2 kedaluwarsa) dan `## Changelog Batch 1` (tabel SPEC-01..09 satu baris per SPEC + file yang diubah).

- [ ] **Step 4: Verifikasi**

Run: `for s in sitegen brainstorming debug deploy generator impeccable intake planner qa-reviewer research seo systematic-debugging ui-ux-pro-max; do rg -qi "$s" .claude/plugins/sitegen/README.md && echo "$s OK" || echo "$s MISSING"; done; rg -c "^## .*Prerequisites" .claude/plugins/sitegen/README.md`
Expected: 13 baris `OK` dan hitungan `1`.

- [ ] **Step 5: Commit**

```bash
git add .claude/plugins/sitegen/README.md
git commit -m "docs(sitegen): README penuh 4-pilar + 13 skill + Batch 1"
```

---

### Task 9: Sapuan verifikasi akhir Batch 1

**Files:** tidak ada (hanya baca).
**Test:** seluruh gerbang di bawah.

**Interfaces:**
- Consumes: Task 1-8.
- Produces: status GO/NO-GO Batch 2.

- [ ] **Step 1: Sapuan serentak**

Run:
```bash
echo "--- duplikasi ---"; for p in "Constraint Keamanan Paralelisme" "Lakukan eksekusi berdasarkan" "Setelah pembangunan halaman selesai" "Visual QA Review"; do printf "%s: " "$p"; rg -c "$p" .claude/plugins/sitegen/SKILL.md; done
echo "--- sisa usang ---"; rg -n "render\.js|pawitra|SEO-REPORT|skills/SKILL\.md" .claude/plugins/sitegen/SKILL.md .claude/plugins/sitegen/plugin.json .claude/plugins/sitegen/skills/*/*.md .claude/plugins/sitegen/skills/*/AGENTS.md; echo "rg-exit=$? (1 = bersih)"
echo "--- AGENTS ---"; for d in brainstorming debug deploy generator impeccable intake planner qa-reviewer research seo systematic-debugging ui-ux-pro-max; do test -f .claude/plugins/sitegen/skills/$d/AGENTS.md || echo "$d MISSING"; done; echo "agents-ok"
echo "--- harness ---"; node .claude/plugins/sitegen/skills/scripts/render.mjs; echo "exit=$?"
```
Expected: duplikasi tiap pola `1`; `rg-exit=1`; tidak ada `MISSING`; harness cetak `Usage:` exit=1.

- [ ] **Step 2: Lapor GO/NO-GO**

Jika semua expected terpenuhi tulis `BATCH1-GO`; jika ada yang meleset, tulis `BATCH1-NOGO: <item>` dan kembalikan ke task terkait (tanpa lanjut Batch 2).
