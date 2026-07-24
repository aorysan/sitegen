# Sitegen — Landing Page Generator

Skill untuk generate **single-page landing page HTML** dari JSON config. Output berupa file HTML mandiri (all-inline CSS + JS).

## Struktur Folder

```
.agents/skills/Sitegen/
├── SKILL.md                 # Definisi skill & prinsip (dibaca oleh agent)
├── README.md                # Dokumentasi ini
├── package.json             # Dependencies (puppeteer) + scripts
├── template.html            # Kerangka HTML dengan placeholders
├── sections/                # CSS layout per section (10 jenis)
│   ├── hero.css
│   ├── problem.css
│   ├── solution.css
│   ├── testimonial.css
│   ├── pricing.css
│   ├── about.css
│   ├── faq.css
│   ├── cta.css
│   ├── management.css
│   └── techstack.css
├── scripts/
│   ├── generate.js          # Generator: config.json → index.html
│   └── render.js            # QC screenshot (puppeteer)
├── reference/
│   ├── intake.md            # Daftar pertanyaan wajib sebelum generate
│   ├── sop.md               # SOP konten per section
│   └── schema.json          # JSON Schema untuk config.json
└── assets/                  # Contoh aset (logo, hero image, dll)
```

## Cara Pakai

### 1. Intake
Tanyakan semua poin di `reference/intake.md` ke user sebelum mulai generate.

### 2. Setup
```bash
mkdir -p landings/<brand>/assets
# Letakkan aset spesifik milik brand (seperti logo asli) di dalam landings/<brand>/assets/
```

### 3. Sampling Warna
Ambil 3 warna dominan dari logo: cyan (#0066CC), blue (#004499), navy (#001A33).

Set di `config.json`:
```json
{
  "colors": {
    "primary": "#0066CC",
    "secondary": "#004499",
    "dark": "#001A33"
  }
}
```

### 4. Buat config.json
Format mengikuti `reference/schema.json`. Contoh:
```json
{
  "brand": "Katharsis",
  "tagline": "Empowering Your Digital Transformation",
  "language": "id",
  "colors": {
    "cyan": "#0066CC",
    "blue": "#004499",
    "navy": "#001A33"
  },
  "navigation": [
    { "label": "Beranda", "target": "hero" },
    { "label": "Masalah", "target": "problem" },
    { "label": "Solusi", "target": "solution" },
    { "label": "Tentang", "target": "about" },
    { "label": "Kontak", "target": "cta" }
  ],
  "sections": [
    {
      "type": "hero",
      "data": {
        "headline": "Transformasi Digital <em>Bisnis</em> Anda Dimulai Di Sini",
        "subheadline": "Dari startup hingga enterprise...",
        "cta": { "text": "Mulai Transformasi", "target": "#solution" },
        "heroImage": "assets/hero.jpg"
      }
    }
  ],
  "footer": {
    "contact": {
      "email": "hello@katharsis.id",
      "wa": "+62 812-3456-7890",
      "address": "Jakarta, Indonesia"
    },
    "social": {
      "instagram": "https://instagram.com/katharsis_id",
      "linkedin": "https://linkedin.com/company/katharsis-digital"
    }
  }
}
```

### 5. Generate
```bash
node .agents/skills/Sitegen/scripts/generate.js landings/<brand>/config.json
```

Output: `landings/<brand>/index.html`

### 6. QC
```bash
npm run qc landings/<brand>/index.html
```

### Contoh Config Lengkap (Semua 10 Sections)

<details>
<summary>Klik untuk melihat contoh config.json lengkap</summary>

```json
{
  "brand": "NovaTech",
  "tagline": "Digital Solutions for Modern Business",
  "language": "id",
  "url": "https://novatech.id",
  "colors": { "primary": "#00B4D8", "secondary": "#0077B6", "dark": "#03045E" },
  "logo": "assets/logo.png",
  "font": { "heading": "Sora", "body": "Plus Jakarta Sans" },
  "meta": {
    "description": "NovaTech — solusi digital untuk bisnis modern.",
    "keywords": "software, digital, transformasi",
    "ogImage": "assets/hero.jpg"
  },
  "navigation": [
    { "label": "Beranda", "target": "hero" },
    { "label": "Masalah", "target": "problem" },
    { "label": "Solusi", "target": "solution" },
    { "label": "Proses", "target": "management" },
    { "label": "Teknologi", "target": "techstack" },
    { "label": "Testimoni", "target": "testimonial" },
    { "label": "Harga", "target": "pricing" },
    { "label": "Tentang", "target": "about" },
    { "label": "FAQ", "target": "faq" },
    { "label": "Kontak", "target": "cta" }
  ],
  "sections": [
    { "type": "hero", "data": { "headline": "Bangun <em>Sistem Digital</em> yang Bekerja", "subheadline": "Solusi custom untuk bisnis Anda.", "cta": { "text": "Mulai", "target": "#solution" }, "heroImage": "assets/hero.jpg", "stats": [{ "number": "100+", "label": "Klien" }], "clients": ["Meridian Corp"] } },
    { "type": "problem", "data": { "title": "Tantangan Bisnis", "items": [{ "title": "Sistem Legacy", "desc": "Infrastruktur lama menghambat pertumbuhan." }, { "title": "Data Tersebar", "desc": "Informasi terpisah-pisah." }] } },
    { "type": "solution", "data": { "title": "Solusi Kami", "benefits": [{ "icon": "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M12 2L2 7l10 5 10-5-10-5z'/></svg>", "title": "Scalable", "desc": "Tumbuh bersama bisnis." }] } },
    { "type": "management", "data": { "title": "Proses Kerja", "items": [{ "title": "Discovery", "desc": "Memahami kebutuhan." }, { "title": "Development", "desc": "Sprint 2 mingguan." }] } },
    { "type": "techstack", "data": { "title": "Teknologi", "categories": [{ "name": "Frontend", "items": ["React", "Next.js"] }, { "name": "Backend", "items": ["Node.js", "Go"] }] } },
    { "type": "testimonial", "data": { "title": "Testimoni", "items": [{ "quote": "Sangat profesional.", "name": "Diana H.", "role": "CTO" }] } },
    { "type": "pricing", "data": { "title": "Harga", "items": [{ "name": "Starter", "price": "Rp 25jt", "features": ["Landing page", "SEO"], "cta": { "text": "Pilih", "target": "#cta" } }] } },
    { "type": "about", "data": { "title": "Tentang Kami", "story": ["Didirikan untuk membantu bisnis Indonesia.", "Teknologi yang baik = dampak nyata."] } },
    { "type": "faq", "data": { "title": "FAQ", "items": [{ "q": "Berapa lama?", "a": "2-6 bulan." }, { "q": "Ada garansi?", "a": "Ya." }] } },
    { "type": "cta", "data": { "headline": "Siap Mulai?", "cta": { "text": "Konsultasi Gratis", "target": "#" }, "guarantee": "Tanpa biaya tersembunyi." } }
  ],
  "footer": {
    "contact": { "email": "hello@novatech.id", "wa": "+628123456", "address": "Jakarta" },
    "social": { "instagram": "https://instagram.com/novatech", "linkedin": "https://linkedin.com/company/novatech", "tiktok": "https://tiktok.com/@novatech", "wa": "+628123456" }
  }
}
```

</details>

## Section Types & Data Structure

| Type | Wajib | Opsional |
|------|-------|----------|
| hero | headline, cta | subheadline, heroImage, stats, clients, ctaSecondary |
| problem | items[] (title, desc) | label, title, closing |
| solution | benefits[] (title, desc) | label, valueProp, icon (SVG) |
| testimonial | items[] (quote, name) | label, title, role, photo |
| pricing | items[] (name, price) | label, title, promo, period, featured, features, cta |
| about | story[] (array paragraf) | label, title, brand, teamPhoto |
| faq | items[] (q, a) | label, title |
| cta | headline | subheadline, cta, contactItems, socialItems, guarantee |
| management | items[] (title, desc) | label, title, subheadline |
| techstack | categories[] (name, items[]) | label, title |
| video | items[] (embedUrl) | label, title, desc |

## Prinsip Layout

1. **Zero gap antar-sesi**: `.section-xxx { padding: 0 }` + `.container { padding: <V> }`
2. **Container horizontal**: `max(24px, 4vw)` (desktop), `max(20px, 5vw)` (mobile), `max-width: 1440px` (Full-bleed hybrid grid)
3. **Animation classes bervariasi**: `.anim-fade-up`, `.anim-fade-left/right`, `.anim-flip-up`, `.anim-slide-up`, `.anim-scale-up`, `.anim-zoom-in`
4. **Re-trigger (Reverse)**: Observer remove `visible` hanya saat elemen keluar layar di bagian BAWAH (`entry.boundingClientRect.top > 0`) saat di-scroll ke atas.
5. **Anti-AI Slop**: **Dilarang keras memakai EMOJI** (Gunakan SVG inline), dan dilarang menggunakan teks generik murahan ("Enterprise", "B2B Tech"). Warna CSS vars: `--primary`, `--secondary`, `--dark` (BUKAN `--cyan/--blue/--navy`).
6. **Smooth scroll**: Menggunakan [Lenis](https://lenis.dev/) via CDN. Anchor links otomatis smooth dengan offset 64px untuk navbar.
7. **Social media**: Footer mendukung Instagram, LinkedIn, TikTok, dan WhatsApp.

## Animasi Per Elemen

Setiap section CSS sudah include animation classes pada elemen spesifik (di-generate otomatis oleh `generate.js`):

| Elemen | Class |
|--------|-------|
| Judul section (label, title) | `anim-reveal-up` (sinematik) |
| Poin masalah (Problem) | `anim-fade-right` + stagger |
| Kartu Solusi (Glassmorphism)| `anim-flip-up` + stagger |
| Kartu Management (Zigzag) | `anim-slide-up` + stagger |
| Badge Techstack | `anim-scale-up` + stagger |
| Kartu Testimonial | `anim-zoom-in` + stagger |
| Story about / visual | `anim-skew-in` |
| CTA elements | `anim-reveal-up` + stagger |

Gunakan class `stagger-1` sampai `stagger-5` untuk delay antar elemen.
