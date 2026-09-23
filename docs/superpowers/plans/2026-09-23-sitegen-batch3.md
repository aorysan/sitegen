# Sitegen Batch 3 (Konsolidasi & Kebersihan) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hapus Puppeteer + helper ganda + dep tak terpakai, migrasi 3 brand ke 4-pilar, dan pasang guard template Tailwind/Astro.

**Architecture:** Hapus file mati via `git rm`, pindahkan file brand via `git mv` (riwayat terjaga), verifikasi tiap brand dengan `npm run build` dari `web/`. Migrasi per brand independen (T2-T4 paralelisable); T1 (Puppeteer) dan T5-T6 independen terhadap migrasi.

**Tech Stack:** Next.js App Router, Playwright (`page.screenshot` gantikan Puppeteer), `git mv`, `diff`, `npm`.

**Spec:** `.claude/plugins/sitegen/docs/superpowers/specs/2026-09-23-sitegen-batch3-consolidation-design.md` (SPEC-17..20)

## Global Constraints

- Workdir: `/home/aorysan/aorysan/AryokPunya/Magang/sitegen` (repo root).
- Backup dulu: 1 commit per brand SEBELUM `git mv` (`git add -A landings/<brand> && git commit -m "chore: backup <brand> pre-4pilar"`).
- Aset selalu `git mv` (bukan copy). JANGAN pindahkan `node_modules/` + `.next/` (fresh install di `web/`).
- JANGAN sentuh `sharp` milik Next.js di `landings/*` (hanya `sharp` di `skills/generator/package.json` yang dihapus).
- `.vercel/` tetap di root brand + langkah MANUAL update Vercel Root Directory (tidak bisa otomatis — catat di commit message).
- Setiap task diakhiri verifikasi + commit terpisah. Mengasumsikan Batch 1 + 2 GO.

---

### Task 1: Hapus Puppeteer, debug pindah Playwright (SPEC-17)

**Files:**
- Delete: `.claude/plugins/sitegen/skills/scripts/render.js`, `.claude/plugins/sitegen/skills/scripts/render.mjs`, `.claude/plugins/sitegen/skills/generator/scripts/render.mjs` (hapus yang ada; abaikan yang sudah hilang di Batch 1/2)
- Modify: `package.json` (root, hapus `puppeteer`), `.claude/plugins/sitegen/skills/generator/package.json` (hapus `puppeteer` + script `qc`)
- Modify: `.claude/plugins/sitegen/skills/debug/SKILL.md` Tahap 1 langkah 1-2 (perintah baru)
- Test: `rg` sisa + 1x Playwright run.

**Interfaces:**
- Consumes: Batch 2 SPEC-13 (spec template Playwright + output `.preview/`).
- Produces: debug tanpa Puppeteer — T2-T4 memakai `npx playwright test` untuk verifikasi visual pasca migrasi.

- [ ] **Step 1: Hapus file render + dep puppeteer**

```bash
git rm -f .claude/plugins/sitegen/skills/scripts/render.js .claude/plugins/sitegen/skills/scripts/render.mjs .claude/plugins/sitegen/skills/generator/scripts/render.mjs
npm pkg delete dependencies.puppeteer
npm pkg delete dependencies.puppeteer --prefix .claude/plugins/sitegen/skills/generator
```

- [ ] **Step 2: Tulis ulang debug Tahap 1 langkah 1-2**

Ganti perintah render di `skills/debug/SKILL.md` menjadi:
```markdown
1. Jalankan E2E + screenshot Playwright dari folder web brand (rute dari PAGES-LIST.md):
   `cd landings/<brand>/web && npx playwright test --project=chromium`
   Spec `tests/<slug_tepat>.spec.ts` (template Batch 2) menangkap Desktop 1280x720 + Mobile 375x667 ke `landings/<brand>/reports/.preview/`.
2. **STRICT AUTO-FAIL**: nyatakan hard-fail bila ditemukan (via assertion spec + `node <skill-dir>/seo/scripts/check-technical.js landings/<brand>/web`):
   - Emoji di DOM; class TailwindCSS; `html`/`body` tanpa `overflow-x: hidden` + `max-width: 100vw`;
   - `<SwipeableCards>` tanpa `flex-shrink: 0` pada children / gagal `flex-direction: row` di mobile;
   - `<img>`/`<Image>` tanpa `alt`, `title`, atau tidak responsif; gambar 404 / `picsum.photos`;
   - Elemen gagal render / overflow-x.
```

- [ ] **Step 3: Verifikasi**

Run: `rg -in "puppeteer" .claude/plugins/sitegen/skills/debug/ .claude/plugins/sitegen/skills/generator/ .claude/plugins/sitegen/SKILL.md package.json; echo "rg-exit=$? (0 = masih ada sisa selain detect-url)"`
Expected: hanya `impeccable/.../detect-url.mjs` (di luar path di atas → `rg-exit=1`, bersih).
Run: `rg -n "render\.(js|mjs)|pawitra" .claude/plugins/sitegen/skills/debug/SKILL.md; echo "rg-exit=$? (1 = bersih)"`
Expected: `1`.
Run (pilih 1 brand, timeout 10 menit): `npx playwright test --project=chromium`
workdir: `landings/timebase/web`
Expected: PASS (atau hanya gagal karena konten, bukan infra).

- [ ] **Step 4: Commit**

```bash
git add -A .claude/plugins/sitegen/skills/debug .claude/plugins/sitegen/skills/generator .claude/plugins/sitegen/skills/scripts package.json
git commit -m "refactor(sitegen): hapus Puppeteer, debug pindah Playwright"
```

---

### Task 2: Migrasi hoyoverse ke 4-pilar (SPEC-18)

**Files:** `git mv` ±20 path di `landings/hoyoverse/` (daftar di bawah).
**Test:** `ls` root + `npm run build` dari `web/`.

**Interfaces:**
- Consumes: tidak ada (independen).
- Produces: `landings/hoyoverse/{intake,planning,web,reports}` — pola acuan T3-T4.

- [ ] **Step 1: Backup commit**

```bash
git add -A landings/hoyoverse && git commit -m "chore: backup hoyoverse pre-4pilar"
```

- [ ] **Step 2: Buat pilar + pindahkan dokumen**

```bash
mkdir -p landings/hoyoverse/intake landings/hoyoverse/reports landings/hoyoverse/web
git mv landings/hoyoverse/final_intake.md landings/hoyoverse/intake_compro.md landings/hoyoverse/user_preferences.md landings/hoyoverse/intake_raw.json landings/hoyoverse/intake/
git mv landings/hoyoverse/PRD.md landings/hoyoverse/planning/PRD.md
git mv landings/hoyoverse/assets landings/hoyoverse/web/public/assets
git mv landings/hoyoverse/test-results landings/hoyoverse/playwright-report landings/hoyoverse/reports/
```
Catatan: `planning/MASTER-PLAN.md` DIBIARKAN (anomali follow-up, jangan hapus). Bila `web/public/assets` sudah ada, gabungkan isi tanpa overwrite (`git mv -k` lalu selesaikan konflik manual).

- [ ] **Step 3: Pindahkan kode ke web/**

```bash
git mv landings/hoyoverse/package.json landings/hoyoverse/package-lock.json landings/hoyoverse/next.config.ts landings/hoyoverse/tsconfig.json landings/hoyoverse/tsconfig.tsbuildinfo landings/hoyoverse/next-env.d.ts landings/hoyoverse/eslint.config.mjs landings/hoyoverse/postcss.config.mjs landings/hoyoverse/.gitignore landings/hoyoverse/.env.local landings/hoyoverse/src landings/hoyoverse/public landings/hoyoverse/tests landings/hoyoverse/scripts landings/hoyoverse/playwright.config.ts landings/hoyoverse/web/
```
Tetap di root: `README.md`, `AGENTS.md`, `CLAUDE.md`, `.vercel/`, `planning/`. JANGAN pindahkan `node_modules/`, `.next/`.

- [ ] **Step 4: Install + build verifikasi**

```bash
npm install --no-fund
npm run build
npx tsc --noEmit
```
workdir: `landings/hoyoverse/web`. Timeout: 15 menit. Expected: build + tsc lolos.
Lalu hemat disk: `rm -rf landings/hoyoverse/node_modules landings/hoyoverse/.next` (root lama, sudah tak dipakai).

- [ ] **Step 5: Verifikasi root bersih**

Run: `ls landings/hoyoverse/`
Expected: `AGENTS.md CLAUDE.md README.md intake planning reports web .vercel/ .git/` dan tidak ada `src/ public/ tests/ *.md` berserakan (kecuali 3 keep).

- [ ] **Step 6: Commit**

```bash
git add -A landings/hoyoverse
git commit -m "refactor(hoyoverse): migrasi 4-pilar intake/planning/web/reports

MANUAL: update Vercel Settings > Root Directory ke landings/hoyoverse/web"
```

---

### Task 3: Migrasi jawara ke 4-pilar (SPEC-18)

**Files:** `git mv` ±20 path di `landings/jawara/` (pola sama Task 2; `reports/` sudah ada → merge).
**Test:** `ls` root + `npm run build` dari `web/`.

**Interfaces:**
- Consumes: pola Task 2.
- Produces: `landings/jawara/{intake,planning,web,reports}`.

- [ ] **Step 1: Backup commit**

```bash
git add -A landings/jawara && git commit -m "chore: backup jawara pre-4pilar"
```

- [ ] **Step 2: Buat pilar + pindahkan dokumen**

```bash
mkdir -p landings/jawara/intake landings/jawara/web
git mv landings/jawara/final_intake.md landings/jawara/intake_compro.md landings/jawara/user_preferences.md landings/jawara/intake/
git mv landings/jawara/PRD.md landings/jawara/planning/PRD.md
```
Catatan: `planning/IMAGE-MAPPING.md` DIBIARKAN. Bila ada `assets/` root (cek `ls` dulu), `git mv` ke `web/public/assets/`.

- [ ] **Step 3: Pindahkan kode ke web/**

```bash
git mv landings/jawara/package.json landings/jawara/package-lock.json landings/jawara/next.config.ts landings/jawara/tsconfig.json landings/jawara/tsconfig.tsbuildinfo landings/jawara/next-env.d.ts landings/jawara/eslint.config.mjs landings/jawara/.gitignore landings/jawara/.env.local landings/jawara/src landings/jawara/public landings/jawara/tests landings/jawara/playwright.config.ts landings/jawara/web/
```
Tetap di root: `README.md`, `AGENTS.md`, `CLAUDE.md`, `.vercel/`, `planning/`, `reports/` (merge; `test-results/` bila ada ikut ke `reports/`). JANGAN pindahkan `node_modules/`, `.next/`.

- [ ] **Step 4: Install + build verifikasi**

```bash
npm install --no-fund
npm run build
npx tsc --noEmit
```
workdir: `landings/jawara/web`. Timeout: 15 menit. Expected: lolos.
Lalu: `rm -rf landings/jawara/node_modules landings/jawara/.next`.

- [ ] **Step 5: Verifikasi root bersih**

Run: `ls landings/jawara/`
Expected: `AGENTS.md CLAUDE.md README.md intake planning reports web .vercel/ .git/` tanpa sisa kode/dokumen di root.

- [ ] **Step 6: Commit**

```bash
git add -A landings/jawara
git commit -m "refactor(jawara): migrasi 4-pilar intake/planning/web/reports

MANUAL: update Vercel Settings > Root Directory ke landings/jawara/web"
```

---

### Task 4: Bersihkan timebase (SPEC-18)

**Files:**
- Delete: 5 duplikat root (bila identik), folder `playwright/` root setelah isi dipindah.
- Move: `playwright/*.png` + `*.zip` → `reports/.preview/`.
- Test: `diff` + `ls`.

**Interfaces:**
- Consumes: tidak ada (independen, tanpa build — struktur `web/` tak berubah).
- Produces: root timebase bersih.

- [ ] **Step 1: Backup + diff duplikat**

```bash
git add -A landings/timebase && git commit -m "chore: backup timebase pre-cleanup"
for f in final_intake.md intake_compro.md user_preferences.md PRD.md; do diff -q "landings/timebase/$f" "landings/timebase/intake/$f" >/dev/null 2>&1 || diff -q "landings/timebase/$f" "landings/timebase/planning/$f" >/dev/null 2>&1 && echo "IDENTIK: $f" || echo "BEDA: $f"; done
diff -rq landings/timebase/assets landings/timebase/intake/assets && echo "IDENTIK: assets" || echo "BEDA: assets"
```
Expected: baris IDENTIK/BEDA per file (keputusan Step 2 ikut output ini).

- [ ] **Step 2: Hapus duplikat identik + pindah preview**

Untuk tiap yang IDENTIK: `git rm -f landings/timebase/<file>` (atau `git rm -rf landings/timebase/assets`).
Untuk yang BEDA: simpan versi terbaru (bandingkan `stat -c %y`), catat pilihan di commit message, JANGAN asal hapus.
```bash
mkdir -p landings/timebase/reports/.preview
git mv landings/timebase/playwright/desktop-*.png landings/timebase/playwright/mobile-*.png landings/timebase/playwright/playwright-timelog.zip landings/timebase/reports/.preview/ 2>/dev/null; rmdir landings/timebase/playwright 2>/dev/null || true
```

- [ ] **Step 3: Verifikasi**

Run: `ls landings/timebase/`
Expected: `intake planning web reports` tanpa `assets/ *.md` duplikat dan tanpa folder `playwright/`.

- [ ] **Step 4: Commit**

```bash
git add -A landings/timebase
git commit -m "refactor(timebase): hapus duplikat root, preview ke reports/.preview"
```

---

### Task 5: Guard template brainstorming (SPEC-19)

**Files:**
- Modify: `.claude/plugins/sitegen/skills/brainstorming/SKILL.md` (Q4 opsi + aturan konversi)
- Modify: `.claude/plugins/sitegen/skills/generator/SKILL.md` GATE 2 (1 kalimat penolakan)
- Test: `rg` label stack.

**Interfaces:**
- Consumes: fakta stack terverifikasi 2026-09-23 (spec Batch 3).
- Produces: user tidak lagi bisa memilih template Tailwind/Astro tanpa sadar biaya konversi.

- [ ] **Step 1: Labeli opsi template + aturan konversi**

Ganti blok opsi Q4 di `brainstorming/SKILL.md` menjadi:
```markdown
1. Pakai Template Saja — HANYA untuk template Next.js + Vanilla CSS (terverifikasi: `jawara-woad` ✅ aman).
2. Pakai Template + Modifikasi Konversi — untuk template berbasis Tailwind/Astro (`screwfast.uk` = Astro + Tailwind ⚠️, `launch-pad-roan` = Next.js + Tailwind ⚠️, `show.saasfly.io` = stack CSS belum terverifikasi ⚠️): wajib konversi penuh ke Vanilla CSS Modules, tambah estimasi +30-50% waktu generate.
3. Desain Baru/Custom (Recommended) — tanpa warisan stack asing.
```

- [ ] **Step 2: Kalimat penolakan di generator GATE 2**

Sisipkan di GATE 2 `generator/SKILL.md`: `TOLAK template berbasis Tailwind/Astro: bila PRD merujuknya tanpa rencana konversi Vanilla, HENTIKAN proses dan minta user memilih opsi 2 (konversi) atau 3 (custom).`

- [ ] **Step 3: Verifikasi**

Run: `rg -c "Tailwind|Astro|Vanilla" .claude/plugins/sitegen/skills/brainstorming/SKILL.md; rg -c "TOLAK template berbasis" .claude/plugins/sitegen/skills/generator/SKILL.md`
Expected: `≥4` lalu `1`.

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/brainstorming/SKILL.md .claude/plugins/sitegen/skills/generator/SKILL.md
git commit -m "docs(sitegen): guard template Tailwind/Astro di brainstorming"
```

---

### Task 6: Hapus helper deprecated + dep tak terpakai (SPEC-20)

**Files:**
- Delete: `.../generator/scripts/extract-pdf.mjs`, `.../generator/scripts/extract-colors.js`
- Modify: `.../generator/package.json` (hapus `pdf-parse`, `node-vibrant`, `sharp`, sisa `puppeteer`/`qc` bila Task 1 belum)
- Modify: `package.json` root (hapus `pdf-parse`, `node-vibrant` bila hanya dipakai helper — verifikasi Step 2 dulu)
- Test: `rg` + `npm install --omit=optional` kering.

**Interfaces:**
- Consumes: label DEPRECATED Batch 2 (T9) + kanon `intake/scripts/extract.py`.
- Produces: single-pipeline ekstraksi.

- [ ] **Step 1: Pastikan tidak ada referensi hidup**

Run: `rg -n "extract-pdf|extract-colors|node-vibrant|pdf-parse" .claude/plugins/sitegen/skills/*/*.md .claude/plugins/sitegen/SKILL.md .claude/plugins/sitegen/skills/*/scripts/ | rg -v DEPRECATED`
Expected: kosong (exit 1) — selain baris DEPRECATED Batch 2.

- [ ] **Step 2: Hapus file + dep**

```bash
git rm -f .claude/plugins/sitegen/skills/generator/scripts/extract-pdf.mjs .claude/plugins/sitegen/skills/generator/scripts/extract-colors.js
npm pkg delete dependencies.pdf-parse dependencies.node-vibrant dependencies.sharp --prefix .claude/plugins/sitegen/skills/generator
npm pkg delete dependencies.pdf-parse dependencies.node-vibrant --prefix .
```
Catatan: JANGAN hapus `sharp` milik Next.js di `landings/*` (di luar scope file ini).

- [ ] **Step 3: Verifikasi**

Run: `node -e "const p=require('./.claude/plugins/sitegen/skills/generator/package.json'); console.log('deps:', JSON.stringify(p.dependencies||{})); console.log('qc:', p.scripts && p.scripts.qc ? 'MASIH ADA' : 'hilang-OK')"; ls .claude/plugins/sitegen/skills/generator/scripts/`
Expected: deps tanpa 4 paket berat; `qc` hilang-OK; scripts tersisa tanpa extract-*. 

- [ ] **Step 4: Commit**

```bash
git add -A .claude/plugins/sitegen/skills/generator package.json
git commit -m "chore(sitegen): hapus helper deprecated + dep tak terpakai"
```

---

### Task 7: Sapuan verifikasi akhir Batch 3

**Files:** tidak ada (hanya baca).

**Interfaces:**
- Consumes: Task 1-6.
- Produces: status GO program (semua batch) / NO-GO item.

- [ ] **Step 1: Sapuan serentak**

Run:
```bash
echo "--- sisa mati ---"; rg -in "puppeteer|render\.(js|mjs)|pawitra|pdf-parse|node-vibrant|extract-pdf|extract-colors" .claude/plugins/sitegen/skills .claude/plugins/sitegen/SKILL.md .claude/plugins/sitegen/plugin.json package.json | rg -v "detect-url.mjs|CHANGELOG|Changelog|changelog" ; echo "rg-exit=$? (1 = bersih)"
echo "--- root brands ---"; for b in hoyoverse jawara timebase; do echo "== $b =="; ls landings/$b/; done
echo "--- sharp landings utuh ---"; rg -l '"sharp"' landings/*/package.json landings/*/web/package.json 2>/dev/null
```
Expected: `rg-exit=1`; tiap brand = `intake planning web reports` + keep (`README/AGENTS/CLAUDE/.vercel`); sharp tetap di package.json landings.

- [ ] **Step 2: Lapor GO/NO-GO**

Semua expected → `ALL-BATCH-GO` (program selesai; sisa manual: update Vercel Root Directory 2 brand + follow-up `MASTER-PLAN.md` vs `PRD.md`). Meleset → `BATCH3-NOGO: <item>`, kembalikan ke task terkait.
