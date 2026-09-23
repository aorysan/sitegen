# Sitegen Master Flow

Sitegen adalah master orkestrator berbasis agen AI (AI Agent) untuk membangun website secara komprehensif dari awal (ekstraksi data) hingga akhir (deployment). Sistem ini dirancang menggunakan arsitektur modular (plugin-based) di mana setiap fungsi utama ditangani oleh sub-skill terpisah yang dipanggil secara berurutan.

## 📦 Install via Marketplace (Claude Code)

Sitegen tersedia sebagai **plugin Claude Code** dan dapat dipasang dari marketplace `sitegen-marketplace`:

```shell
/plugin marketplace add aorysan/sitegen
/plugin install sitegen@sitegen-marketplace
```

Setelah terpasang, jalankan `/sitegen` untuk memulai alur master. Sub-skill tersedia dengan namespace: `/sitegen:intake`, `/sitegen:planner`, `/sitegen:generator`, `/sitegen:qa-reviewer`, dan lainnya.

> Instalasi manual: tanpa marketplace, kamu bisa memuat plugin ini langsung dengan `claude --plugin-dir <path-ke-repo>`.

## 📋 Prerequisites

Pastikan sudah terinstall sebelum menjalankan sitegen:

- **Python 3.x** — untuk script extraction (`skills/intake/scripts/extract.py`) dan UI search (`skills/ui-ux-pro-max/scripts/search.py`)
- **Node.js 18+** — untuk Next.js scaffolding dan Playwright
- **Git** — untuk version control

**Aktivasi virtualenv per OS:**

- **Linux (bash):** `source venv/bin/activate`
- **Windows (PowerShell):** `venv\Scripts\Activate.ps1`

> ⚠️ **Catatan dependensi berat:** `puppeteer` (±120–170MB) dan `sharp` (native binary) hanya dibutuhkan untuk sesi QC/debug lokal — instal terpisah lewat `install:qc` (dengan `--include=optional`), bukan untuk alur normal.

## 🚀 Alur Kerja (Master Workflow)

0. **User Onboarding (`[HARD STOP]`)**
   Tanya nama brand dan path ke file PDF Company Profile. Verifikasi file exists.
1. **Intake (`/intake`)**
   Mengekstrak data dari PDF company profile dan menyimpannya ke `landings/<brand>/intake/intake_compro.md` beserta aset gambar.
2. **Research (`/research`)**
   Riset mendalam berbasis `intake_compro.md` dan web search otomatis. Menghasilkan `landings/<brand>/planning/PLAN-USER-NEEDS.md` dan `PLAN-COMPETITOR.md`.
3. **Brainstorming (`/brainstorming`) — Sesi Interaktif**
   Sesi dialog multi-turn dengan user untuk menggali preferensi desain. Menghasilkan `landings/<brand>/intake/user_preferences.md`.
4. **Rekonsiliasi & Review (`[HARD STOP]`)**
   Menggabungkan `intake_compro.md` dan `user_preferences.md` menjadi `landings/<brand>/intake/final_intake.md`. User review dan approve.
5. **Global Design & Planning (`/planner`, `/ui-ux-pro-max`, `/impeccable`)**
   Membuat `PLAN-GLOBAL.md`, `PLAN-DESIGN-SYSTEM.md`, dan `PAGES-LIST.md`.
6. **PRD Batch & Asset Mapping (`/planner`, `/qa-reviewer`)**
   Generate PRD per halaman, QA review, merge menjadi `PRD.md`, dan buat `ASSET-MAPPING.md`.
7. **Eksekusi Halaman (`/generator`, `/qa-reviewer`) — Loop per Halaman**
   Scaffold Next.js (hanya 1x), lalu build setiap halaman dengan generator, QA review, Playwright test.
8. **Integration**
   Gabungkan navigasi antar halaman.
9. **SEO & Debug Final (`/seo`, `/debug`)**
   Validasi SEO dan debug lokal final.
10. **User Review Final (`[HARD STOP]`)**
11. **Deploy (`/deploy`)**
12. **Post-Deploy Debug (`/debug`)**
13. **Cleanup**

## 📁 Struktur Direktori Repositori

### 4-Pilar `landings/<brand>/` (Zero Root Pollution)

Seluruh aktivitas per brand WAJIB terpisah ke dalam empat pilar mandiri — root `landings/<brand>/` hanya boleh berisi sub-folder ini:

- `intake/` — dokumen mentah hasil ekstraksi (`intake_raw.json`, `intake_compro.md`), catatan preferensi user, aset, dan file kompresi.
- `planning/` — dokumen perencanaan arsitektur web dan blueprint (`PRD.md`, `ASSET-MAPPING.md`, `PLAN-*.md`).
- `web/` — instalasi kode aplikasi Next.js (termasuk `public/`, `node_modules`, `package.json`).
- `reports/` — hasil keluaran verifikasi paska produksi (`SEO-AUDIT.md`, `DEBUG_LOG.md`, `.preview/`).

### 13 Skill

- `sitegen` — master orkestrator (SKILL.md di root plugin)
- `brainstorming` — sesi interaktif preferensi user
- `debug` — QA otomatis, visual debugging, analisis performa/SEO
- `deploy` — deployment ke Vercel
- `generator` — generator website multi-page Next.js
- `impeccable` — review & perbaikan frontend/UI/UX
- `intake` — ekstraksi PDF company profile
- `planner` — perumus PRD & blueprint halaman
- `qa-reviewer` — quality control dokumen & halaman
- `research` — riset kebutuhan user & kompetitor
- `seo` — audit & implementasi SEO
- `systematic-debugging` — disiplin debug berbasis bukti
- `ui-ux-pro-max` — basis data gayu, palet, font, motion, chart

Semua 12 subfolder skill dilengkapi `AGENTS.md` konstitusi lokal.

### Skrip Resmi

- `skills/scripts/render.mjs` — harness render resmi (ESM): `node render.mjs <brand> <baseUrl> <route...>`
- `skills/intake/scripts/extract.py` — ekstraksi PDF company profile
- `skills/seo/scripts/check-technical.js` — cek SEO teknis
- `skills/ui-ux-pro-max/scripts/search.py` — pencarian basis data UI/UX

## 🏛 Keputusan Arsitektur

- **Trilogi Animasi unidirectional** — Lenis (smooth scroll) + Anime.js v4 (mikro animasi/partikel) + Framer Motion (scroll-reveal **satu arah** ke bawah + reset; DILARANG `once: true` dan bidirectional).
- **Laporan tunggal `SEO-AUDIT.md`** — standar `landings/<brand>/reports/SEO-AUDIT.md` di semua skill; nama `SEO-REPORT` tidak dipakai lagi.
- **Harness resmi `render.mjs`** — satu skrip ESM di `skills/scripts/render.mjs` (argumen eksplisit `<brand> <baseUrl> <route...>`); `render.js` (CJS, default `pawitra`) dihapus.
- **Stack `nextjs` + Vanilla CSS Modules** — `ui-ux-pro-max` WAJIB dipakai dengan stack `nextjs`; DILARANG `html-tailwind` dan `shadcn`.
- **Spesifikasi `2026-08-05` §2.2 (bidirectional) kedaluwarsa** — digantikan keputusan unidirectional di atas, sesuai supreme `AGENTS.md` repo.

## 📝 Changelog Batch 1

| SPEC | Judul | File yang diubah |
|------|-------|------------------|
| SPEC-01 | Dedup `sitegen/SKILL.md` Step 7 (satu QA call per halaman) | `SKILL.md` |
| SPEC-02 | Path master `plugin.json` | `plugin.json` |
| SPEC-03 | Cross-ref template `research` | `skills/research/SKILL.md` |
| SPEC-04 | Nama laporan SEO tunggal `SEO-AUDIT.md` | `skills/seo/AGENTS.md`, `skills/debug/SKILL.md` |
| SPEC-05 | Satu harness resmi `render.mjs` | `skills/scripts/render.mjs`, `skills/debug/SKILL.md` |
| SPEC-06 | Intake Linux-compat + path absolut | `skills/intake/SKILL.md` |
| SPEC-07 | Constraint stack `ui-ux-pro-max` (nextjs vanilla) | `SKILL.md` |
| SPEC-08 | Rubrik C/D/E `qa-reviewer` extended | `skills/qa-reviewer/reference/review-checklist.md`, `skills/qa-reviewer/SKILL.md` |
| SPEC-09 | `AGENTS.md` 3 skill + redaksi HARD STOP seragam | `skills/impeccable/AGENTS.md`, `skills/ui-ux-pro-max/AGENTS.md`, `skills/systematic-debugging/AGENTS.md` |
| SPEC-10 | README penuh (4-pilar + 13 skill) | `README.md` |

## 🛠 Cara Penggunaan

Cukup berikan agen (AI) instruksi untuk memulai pembuatan website melalui kerangka kerja Sitegen.
Contoh instruksi:
> *"Tolong buatkan website untuk brand [Nama Brand], aset company profile ada di direktori X. Gunakan alur master Sitegen."*

Agen akan secara otomatis memuat `SKILL.md` utama, membaca daftar periksa, dan melimpahkan (delegate) pekerjaan ke masing-masing sub-skill step-by-step.
