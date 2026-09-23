# Sitegen Batch 2 (Templates Hybrid C) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bangun `generator/templates/` (boilerplate + 11 section snippets + Playwright spec) dan report/planning templates agar generate tidak lagi menulis ratusan baris dari nol.

**Architecture:** Salin verbatim yang sudah ada di `reference/sop.md` untuk 2 file animasi; tulis baru mengikuti aturan `generator/SKILL.md` GATE 3 untuk sisanya. Token `{{...}}` wajib diganti generator dari PLAN-GLOBAL/ASSET-MAPPING; visual tidak di-hardcode.

**Tech Stack:** Next.js App Router + TypeScript + Vanilla CSS Modules, Lenis, Anime.js, Framer Motion (`as const` ease), lucide-react, Playwright.

**Spec:** `.claude/plugins/sitegen/docs/superpowers/specs/2026-09-23-sitegen-batch2-templates-design.md` (SPEC-11..16; penghapusan Puppeteer resmi pindah Batch 3)

## Global Constraints

- Workdir: `/home/aorysan/aorysan/AryokPunya/Magang/sitegen` (repo root); base plugin: `.claude/plugins/sitegen/`.
- Token valid: `{{BRAND}} {{BRAND_SLUG}} {{PRIMARY}} {{SECONDARY}} {{DARK}} {{FONT_HEADING}} {{FONT_BODY}} {{LOGO_PATH}} {{BASE_URL}} {{YEAR}} {{META_TITLE}} {{META_DESCRIPTION}} {{TAGLINE}}`. Token lain dilarang.
- DILARANG teks brand/nama perusahaan hardcoded di template kode; DILARANG emoji; ikon hanya `lucide-react`/SVG.
- Template `.tsx` bertoken TIDAK dikompilasi (token bukan TS valid) — verifikasi struktural via `rg`/`wc`, bukan `tsc`.
- Setiap task diakhiri verifikasi + commit terpisah. Mengasumsikan Batch 1 sudah GO (nama `SEO-AUDIT.md`, harness `skills/scripts/render.mjs`).

---

### Task 1: Template animasi (SPEC-11a)

**Files:**
- Create: `.claude/plugins/sitegen/skills/generator/templates/AnimatedSection.tsx`
- Create: `.claude/plugins/sitegen/skills/generator/templates/SmoothScroll.tsx`
- Test: diff vs `reference/sop.md` + `rg` perilaku kunci.

**Interfaces:**
- Consumes: `reference/sop.md:70-173` (verbatim).
- Produces: 2 file animasi — dipakai Task 4 (layout) dan semua snippet Task 5-7.

- [ ] **Step 1: Tulis AnimatedSection.tsx (verbatim sop.md:70-150)**

```tsx
"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "zoom";
  className?: string;
}

export default function AnimatedSection({ children, delay = 0, direction = "up", className = "" }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getInitialTransform = () => {
      switch (direction) {
        case "left": return { translateX: 30 };
        case "right": return { translateX: -30 };
        case "zoom": return { scale: 0.9 };
        case "up": default: return { translateY: 30 };
      }
    };

    const getFinalTransform = () => {
      switch (direction) {
        case "left": return { translateX: [30, 0] };
        case "right": return { translateX: [-30, 0] };
        case "zoom": return { scale: [0.9, 1] };
        case "up": default: return { translateY: [30, 0] };
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: el,
              opacity: [0, 1],
              ...getFinalTransform(),
              duration: 800,
              delay: delay,
              easing: "easeOutCubic",
            });
          } else if (entry.boundingClientRect.top > 0) {
            // Asymmetric Reset
            anime.set(el, { opacity: 0, ...getInitialTransform() });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (el) anime.remove(el);
    };
  }, [delay, direction]);

  const getInitialStyle = (): React.CSSProperties => {
    switch (direction) {
      case "left": return { opacity: 0, transform: "translateX(30px)" };
      case "right": return { opacity: 0, transform: "translateX(-30px)" };
      case "zoom": return { opacity: 0, transform: "scale(0.9)" };
      case "up": default: return { opacity: 0, transform: "translateY(30px)" };
    }
  };

  return (
    <div ref={ref} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Tulis SmoothScroll.tsx (verbatim sop.md:155-173)**

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Verifikasi**

Run: `rg -c "anime.remove\(el\)|boundingClientRect.top > 0|lenis.destroy" .claude/plugins/sitegen/skills/generator/templates/AnimatedSection.tsx .claude/plugins/sitegen/skills/generator/templates/SmoothScroll.tsx`
Expected: `3` (satu per pola: cleanup, asymmetric reset, destroy). Lalu: `rg -c "framer-motion|motion\." .claude/plugins/sitegen/skills/generator/templates/AnimatedSection.tsx`
Expected: `0` (Framer hanya untuk kartu interaktif, bukan section).

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/generator/templates/AnimatedSection.tsx .claude/plugins/sitegen/skills/generator/templates/SmoothScroll.tsx
git commit -m "feat(sitegen): template AnimatedSection + SmoothScroll verbatim SOP"
```

---

### Task 2: SwipeableCards (SPEC-11b)

**Files:**
- Create: `.claude/plugins/sitegen/skills/generator/templates/SwipeableCards.tsx`
- Create: `.claude/plugins/sitegen/skills/generator/templates/SwipeableCards.module.css`
- Test: `rg` aturan CSS wajib.

**Interfaces:**
- Consumes: `generator/SKILL.md:70-80` (struktur CSS wajib + A11y).
- Produces: komponen swipe — dipakai snippet dengan 2-9 item (Task 5-7) dan aturan ≥10 item (Carousel, Batch 2 dışı — generator merujuk template ini).

- [ ] **Step 1: Tulis SwipeableCards.tsx**

```tsx
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SwipeableCards.module.css";

interface SwipeableCardsProps {
  children: React.ReactNode;
  /** Kelas grid desktop dari halaman pemanggil — agar layout desktop tidak hancur. */
  className?: string;
  label: string;
}

export default function SwipeableCards({ children, className = "", label }: SwipeableCardsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const count = React.Children.count(children);
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;
    let best = 0;
    let bestDist = Infinity;
    const center = track.scrollLeft + track.clientWidth / 2;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft + card.clientWidth / 2 - center);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    updateActive();
  }, [updateActive]);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const target = cards[Math.max(0, Math.min(index, cards.length - 1))];
    if (target) track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollTo(active + 1);
    if (e.key === "ArrowLeft") scrollTo(active - 1);
  };

  return (
    <div className={styles.wrapper}>
      <div
        ref={trackRef}
        className={`${styles.track} ${className}`}
        tabIndex={0}
        role="region"
        aria-label={label}
        aria-roledescription="carousel"
        onScroll={updateActive}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
      <div className={styles.dots} aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className={i === active ? `${styles.dot} ${styles.dotActive}` : styles.dot} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Tulis SwipeableCards.module.css**

```css
.wrapper { width: 100%; }
.track { width: 100%; }
/* Aturan swipe aktif HANYA di mobile agar dots tidak berantakan di desktop. */
@media (max-width: 768px) {
  .track {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding-block: 20px;
    margin-block: -20px;
  }
  .track::-webkit-scrollbar { display: none; }
  .track > * {
    flex: 0 0 85vw !important;
    flex-shrink: 0;
    scroll-snap-align: center;
  }
  .dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
  }
}
@media (min-width: 769px) {
  .dots { display: none; }
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: var(--color-neutral-300, #d4d4d4);
}
.dotActive { background: var(--color-primary, #111111); }
```

- [ ] **Step 3: Verifikasi**

Run: `rg -c "flex-direction: row !important|overflow-x: auto|scroll-snap-type|flex-shrink: 0|769px" .claude/plugins/sitegen/skills/generator/templates/SwipeableCards.module.css; rg -c "ArrowRight|ArrowLeft|tabIndex|aria-label" .claude/plugins/sitegen/skills/generator/templates/SwipeableCards.tsx`
Expected: `5` lalu `4`.

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/generator/templates/SwipeableCards.tsx .claude/plugins/sitegen/skills/generator/templates/SwipeableCards.module.css
git commit -m "feat(sitegen): template SwipeableCards mobile-only + A11y"
```

---

### Task 3: Header + Footer (SPEC-11c)

**Files:**
- Create: `.claude/plugins/sitegen/skills/generator/templates/Header.tsx`
- Create: `.claude/plugins/sitegen/skills/generator/templates/Footer.tsx`
- Test: `rg` token + aturan logo.

**Interfaces:**
- Consumes: `generator/SKILL.md:32-34,68` (logo Image, burger 3 garis, safe-area).
- Produces: header/footer — dipakai tiap halaman (Task 4 layout merujuk keduanya).

- [ ] **Step 1: Tulis Header.tsx**

```tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export interface NavItem { label: string; href: string; title: string; }
interface HeaderProps { navItems: NavItem[]; }

export default function Header({ navItems }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " site-header-scrolled" : ""}`}>
      <nav className="site-nav" aria-label="Navigasi utama">
        <Link href="/" title="{{BRAND}} — Beranda" aria-label="{{BRAND}} — Beranda" className="site-logo">
          <Image src="{{LOGO_PATH}}" alt="Logo {{BRAND}}" width={160} height={36} className="h-9 w-auto object-contain" priority />
        </Link>
        <ul className="site-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} title={item.title}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="site-burger"
          aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
        </button>
      </nav>
      {open && (
        <ul className="site-mobile-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} title={item.title} onClick={() => setOpen(false)}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Tulis Footer.tsx**

```tsx
import Image from "next/image";
import Link from "next/link";

export interface SocialLink { label: string; href: string; }
interface FooterProps {
  email: string;
  phone: string;
  address: string;
  socials: SocialLink[];
  dark?: boolean;
}

export default function Footer({ email, phone, address, socials, dark = true }: FooterProps) {
  return (
    <footer className={dark ? "site-footer site-footer-dark" : "site-footer"}>
      <div className="site-footer-inner">
        <Link href="/" title="{{BRAND}} — Beranda" aria-label="{{BRAND}} — Beranda" className={dark ? "site-logo site-logo-lightbox" : "site-logo"}>
          <Image src="{{LOGO_PATH}}" alt="Logo {{BRAND}}" width={160} height={36} className="h-9 w-auto object-contain" />
        </Link>
        <address className="site-contact">
          <a href={`mailto:${email}`} title="Email {{BRAND}}">{email}</a>
          <a href={`https://wa.me/${phone}`} title="WhatsApp {{BRAND}}">{phone}</a>
          <span>{address}</span>
        </address>
        <ul className="site-socials">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} title={`${s.label} — {{BRAND}}`} rel="noopener noreferrer">{s.label}</a>
            </li>
          ))}
        </ul>
        <p className="site-copy">© {{YEAR}} {"{{BRAND}}"}. Hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verifikasi**

Run: `rg -c "\{\{LOGO_PATH\}\}|\{\{BRAND\}\}|aria-label|title=" .claude/plugins/sitegen/skills/generator/templates/Header.tsx .claude/plugins/sitegen/skills/generator/templates/Footer.tsx | head; rg -c "lucide-react" .claude/plugins/sitegen/skills/generator/templates/Header.tsx`
Expected: token + A11y ditemukan; `1` untuk lucide.

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/generator/templates/Header.tsx .claude/plugins/sitegen/skills/generator/templates/Footer.tsx
git commit -m "feat(sitegen): template Header/Footer logo resmi + A11y"
```

---

### Task 4: Tokens, layout, SEO files (SPEC-11d)

**Files:**
- Create: `.../templates/globals-tokens.css`, `layout.tsx`, `sitemap.ts`, `robots.ts`, `llms.txt`, `next.config.ts.snippet`
- Test: `rg` token + aturan anti-overflow.

**Interfaces:**
- Consumes: `sop.md:43-53` (anti-bleed), `SKILL.md:63,65,67` (aset, Lenis, SEO files), Task 1 (SmoothScroll).
- Produces: fondasi `web/` — generator scaffold + timpa token dari PLAN-GLOBAL.

- [ ] **Step 1: Tulis globals-tokens.css**

```css
:root {
  --color-primary: {{PRIMARY}};
  --color-secondary: {{SECONDARY}};
  --color-dark: {{DARK}};
  --font-heading: {{FONT_HEADING}}, system-ui, sans-serif;
  --font-body: {{FONT_BODY}}, system-ui, sans-serif;
}
html, body {
  overflow-x: hidden;
  width: 100vw;
  max-width: 100%;
}
body {
  font-family: var(--font-body);
  color: var(--color-dark);
  background: #ffffff;
}
h1, h2, h3, h4 { font-family: var(--font-heading); }
main { padding-top: 80px; }
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  padding-top: env(safe-area-inset-top);
}
img { max-width: 100%; height: auto; object-fit: cover; }
```

- [ ] **Step 2: Tulis layout.tsx, sitemap.ts, robots.ts, llms.txt, next.config.ts.snippet**

`layout.tsx`:
```tsx
import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "{{META_TITLE}}",
  description: "{{META_DESCRIPTION}}",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <SmoothScroll>
          <Header navItems={[]} />
          <main>{children}</main>
          <Footer email="" phone="" address="" socials={[]} />
        </SmoothScroll>
      </body>
    </html>
  );
}
```

`sitemap.ts`:
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "{{BASE_URL}}";
  //[ix] Tambahkan slug dari PAGES-LIST.md sebagai entri { url, lastModified }.
  return [{ url: `${base}/`, lastModified: new Date() }];
}
```

`robots.ts`:
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "{{BASE_URL}}/sitemap.xml",
  };
}
```

`llms.txt`:
```markdown
# {{BRAND}}

> {{TAGLINE}}

- Situs utama: {{BASE_URL}}/
- Kontak: {{BASE_URL}}/kontak
```

`next.config.ts.snippet`:
```ts
// Salin blok images ke next.config.ts proyek dan daftarkan tiap domain eksternal dari ASSET-MAPPING.md.
images: {
  remotePatterns: [
    // { protocol: "https", hostname: "CONTOH-DOMAIN-DARI-ASSET-MAPPING" },
  ],
},
```

- [ ] **Step 3: Verifikasi**

Run: `ls .claude/plugins/sitegen/skills/generator/templates/ && rg -c "overflow-x: hidden|padding-top: 80px|z-index: 50" .claude/plugins/sitegen/skills/generator/templates/globals-tokens.css; rg -lc "^# " .claude/plugins/sitegen/skills/generator/templates/llms.txt`
Expected: 10+2 file (Task 1-2) terdaftar; `3`; `1` (H1 Markdown + link absolut di llms).

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/generator/templates/globals-tokens.css .claude/plugins/sitegen/skills/generator/templates/layout.tsx .claude/plugins/sitegen/skills/generator/templates/sitemap.ts .claude/plugins/sitegen/skills/generator/templates/robots.ts .claude/plugins/sitegen/skills/generator/templates/llms.txt .claude/plugins/sitegen/skills/generator/templates/next.config.ts.snippet
git commit -m "feat(sitegen): template tokens, layout Lenis, SEO files"
```

---

### Task 5: Section snippets A — hero, problem, solution, about (SPEC-12)

**Files:** Create `.../templates/sections/{hero,problem,solution,about}.tsx` (<120 baris/file).
**Interfaces:** Consumes Task 1 (AnimatedSection), `planner/SKILL.md:89-99` (field + copyfitting). Produces: 4 snippet — Task 8 QA merujuk props ini.

- [ ] **Step 1: Tulis hero.tsx** (headline ≤7 kata, subheadline ≤2 kalimat, CTA ≤3 kata, stats, heroImage opsional → 1 kolom center bila tanpa gambar per `SKILL.md:93`)

```tsx
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "../AnimatedSection";

export interface HeroStat { value: string; label: string; }
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaTarget: string;
  heroImage?: { src: string; alt: string; title: string };
  stats?: HeroStat[];
}

export default function Hero({ headline, subheadline, ctaText, ctaTarget, heroImage, stats = [] }: HeroProps) {
  return (
    <section className={heroImage ? "hero hero-split" : "hero hero-center"} aria-label="Hero">
      <AnimatedSection>
        <h1>{headline}</h1>
        <p>{subheadline}</p>
        <Link href={ctaTarget} title={ctaText} className="cta-primary">{ctaText}</Link>
      </AnimatedSection>
      {heroImage ? (
        <AnimatedSection delay={120}>
          <Image src={heroImage.src} alt={heroImage.alt} title={heroImage.title} width={960} height={640} className="hero-image" priority />
        </AnimatedSection>
      ) : null}
      {stats.length > 0 && (
        <dl className="hero-stats">
          {stats.map((s) => (
            <div key={s.label} className="stagger-item">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Tulis problem.tsx, solution.tsx, about.tsx**

`problem.tsx`:
```tsx
import { AlertTriangle } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

export interface ProblemItem { title: string; desc: string; }
interface ProblemProps { title: string; items: ProblemItem[]; }

export default function Problem({ title, items }: ProblemProps) {
  return (
    <section aria-label="Masalah">
      <AnimatedSection>
        <h2>{title}</h2>
      </AnimatedSection>
      <ul>
        {items.map((item) => (
          <li key={item.title} className="stagger-item" tabIndex={0} aria-label={item.title}>
            <AlertTriangle size={24} aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`solution.tsx`:
```tsx
import { CheckCircle2 } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

export interface Benefit { title: string; desc: string; }
interface SolutionProps { title: string; valueProp: string; benefits: Benefit[]; }

export default function Solution({ title, valueProp, benefits }: SolutionProps) {
  return (
    <section aria-label="Solusi">
      <AnimatedSection>
        <h2>{title}</h2>
        <p>{valueProp}</p>
      </AnimatedSection>
      <ul>
        {benefits.map((b) => (
          <li key={b.title} className="stagger-item" tabIndex={0} aria-label={b.title}>
            <CheckCircle2 size={24} aria-hidden="true" />
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`about.tsx`:
```tsx
import Image from "next/image";
import AnimatedSection from "../AnimatedSection";

interface AboutProps {
  title: string;
  story: string[];
  teamPhoto?: { src: string; alt: string; title: string };
}

export default function About({ title, story, teamPhoto }: AboutProps) {
  return (
    <section aria-label="Tentang">
      <AnimatedSection>
        <h2>{title}</h2>
        {story.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </AnimatedSection>
      {teamPhoto ? (
        <AnimatedSection delay={120}>
          <Image src={teamPhoto.src} alt={teamPhoto.alt} title={teamPhoto.title} width={960} height={640} className="about-photo" />
        </AnimatedSection>
      ) : null}
    </section>
  );
}
```

- [ ] **Step 3: Verifikasi**

Run: `wc -l .claude/plugins/sitegen/skills/generator/templates/sections/hero.tsx .claude/plugins/sitegen/skills/generator/templates/sections/problem.tsx .claude/plugins/sitegen/skills/generator/templates/sections/solution.tsx .claude/plugins/sitegen/skills/generator/templates/sections/about.tsx; rg -l "stagger-item|AnimatedSection" .claude/plugins/sitegen/skills/generator/templates/sections/ | wc -l`
Expected: tiap file <120 baris; `4` file memakai AnimatedSection/stagger.

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/generator/templates/sections/hero.tsx .claude/plugins/sitegen/skills/generator/templates/sections/problem.tsx .claude/plugins/sitegen/skills/generator/templates/sections/solution.tsx .claude/plugins/sitegen/skills/generator/templates/sections/about.tsx
git commit -m "feat(sitegen): snippet hero, problem, solution, about"
```

---

### Task 6: Section snippets B — management, techstack, testimonial, pricing (SPEC-12)

**Files:** Create `.../templates/sections/{management,techstack,testimonial,pricing}.tsx` (<120 baris/file).
**Interfaces:** Consumes Task 1-2 (AnimatedSection, aturan SwipeableCards untuk 2-9 item di mobile). Catatan: testimonial DILARANG fiktif — snippet hanya render props; bila PDF kosong, planner pivot ke social proof (planner/SKILL.md).

- [ ] **Step 1: Tulis management.tsx + testimonial.tsx**

`management.tsx`:
```tsx
import { User } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

export interface Manager { title: string; desc: string; }
interface ManagementProps { title: string; items: Manager[]; }

export default function Management({ title, items }: ManagementProps) {
  return (
    <section aria-label="Manajemen">
      <AnimatedSection>
        <h2>{title}</h2>
      </AnimatedSection>
      <ul>
        {items.map((m) => (
          <li key={m.title} className="stagger-item" tabIndex={0} aria-label={m.title}>
            <User size={24} aria-hidden="true" />
            <h3>{m.title}</h3>
            <p>{m.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`testimonial.tsx`:
```tsx
import { Quote } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

export interface Testimony { quote: string; name: string; role: string; }
interface TestimonialProps { title: string; items: Testimony[]; }

export default function Testimonial({ title, items }: TestimonialProps) {
  return (
    <section aria-label="Testimoni">
      <AnimatedSection>
        <h2>{title}</h2>
      </AnimatedSection>
      <ul>
        {items.map((t) => (
          <li key={t.name} className="stagger-item" tabIndex={0} aria-label={`Testimoni ${t.name}`}>
            <Quote size={24} aria-hidden="true" />
            <blockquote>{t.quote}</blockquote>
            <p>{t.name} — {t.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Tulis techstack.tsx + pricing.tsx**

`techstack.tsx` (monospaced, per SKILL.md:94-99):
```tsx
import { Cpu } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

export interface TechItem { name: string; description: string; category?: string; }
interface TechStackProps { title: string; items: TechItem[]; }

export default function TechStack({ title, items }: TechStackProps) {
  return (
    <section aria-label="Teknologi">
      <AnimatedSection>
        <h2>{title}</h2>
      </AnimatedSection>
      <ul className="techstack-grid">
        {items.map((t) => (
          <li key={t.name} className="stagger-item techstack-card" tabIndex={0} aria-label={`Teknologi ${t.name}`}>
            <Cpu size={24} aria-hidden="true" />
            <code>{t.name}</code>
            <p>{t.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`pricing.tsx` (murni teks — `Membutuhkan Gambar: Tidak`):
```tsx
import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "../AnimatedSection";

export interface PriceTier { name: string; price: string; features: string[]; cta: string; }
interface PricingProps { title: string; items: PriceTier[]; }

export default function Pricing({ title, items }: PricingProps) {
  return (
    <section aria-label="Harga">
      <AnimatedSection>
        <h2>{title}</h2>
      </AnimatedSection>
      <ul>
        {items.map((tier) => (
          <li key={tier.name} className="stagger-item" tabIndex={0} aria-label={`Paket ${tier.name}`}>
            <h3>{tier.name}</h3>
            <p>{tier.price}</p>
            <ul>
              {tier.features.map((f) => (
                <li key={f}><BadgeCheck size={18} aria-hidden="true" /> {f}</li>
              ))}
            </ul>
            <Link href="/kontak" title={`${tier.cta} — paket ${tier.name}`}>{tier.cta}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3: Verifikasi**

Run: `wc -l .claude/plugins/sitegen/skills/generator/templates/sections/management.tsx .claude/plugins/sitegen/skills/generator/templates/sections/techstack.tsx .claude/plugins/sitegen/skills/generator/templates/sections/testimonial.tsx .claude/plugins/sitegen/skills/generator/templates/sections/pricing.tsx; rg -c "lucide-react" .claude/plugins/sitegen/skills/generator/templates/sections/management.tsx .claude/plugins/sitegen/skills/generator/templates/sections/techstack.tsx .claude/plugins/sitegen/skills/generator/templates/sections/testimonial.tsx .claude/plugins/sitegen/skills/generator/templates/sections/pricing.tsx`
Expected: tiap file <120; tiap file tepat `1` import lucide.

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/generator/templates/sections/management.tsx .claude/plugins/sitegen/skills/generator/templates/sections/techstack.tsx .claude/plugins/sitegen/skills/generator/templates/sections/testimonial.tsx .claude/plugins/sitegen/skills/generator/templates/sections/pricing.tsx
git commit -m "feat(sitegen): snippet management, techstack, testimonial, pricing"
```

---

### Task 7: Section snippets C + Playwright template (SPEC-12 + SPEC-13)

**Files:**
- Create: `.../templates/sections/{faq,cta,video}.tsx`
- Create: `.../templates/tests/page.spec.ts.template`
- Test: `wc -l` + `rg` viewport.

**Interfaces:**
- Consumes: Task 1 (AnimatedSection); master Step 7b (viewport 1280x720 + 375x667, output `.preview/`, nama `tests/<slug_tepat>.spec.ts`).
- Produces: 11/11 snippet genap + spec E2E — fondasi eksekusi halaman Batch 2.

- [ ] **Step 1: Tulis faq.tsx, cta.tsx, video.tsx**

`faq.tsx` (4-5 item, keyword SEO di pertanyaan):
```tsx
import { HelpCircle } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

export interface FaqItem { question: string; answer: string; }
interface FaqProps { title: string; items: FaqItem[]; }

export default function Faq({ title, items }: FaqProps) {
  return (
    <section aria-label="Pertanyaan umum">
      <AnimatedSection>
        <h2>{title}</h2>
      </AnimatedSection>
      <ul>
        {items.map((f) => (
          <li key={f.question} className="stagger-item">
            <HelpCircle size={24} aria-hidden="true" />
            <h3>{f.question}</h3>
            <p>{f.answer}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

`cta.tsx` (FOMO + tombol dominan):
```tsx
import Link from "next/link";
import AnimatedSection from "../AnimatedSection";

interface CtaProps { headline: string; subheadline: string; ctaText: string; guarantee?: string; }

export default function Cta({ headline, subheadline, ctaText, guarantee }: CtaProps) {
  return (
    <section aria-label="Ajakan bertindak" className="cta-final">
      <AnimatedSection>
        <h2>{headline}</h2>
        <p>{subheadline}</p>
        <Link href="/kontak" title={ctaText} className="cta-primary cta-dominant">{ctaText}</Link>
        {guarantee ? <p>{guarantee}</p> : null}
      </AnimatedSection>
    </section>
  );
}
```

`video.tsx` (touch-safe >44px, tanpa autoplay — AGENTS.md generator Pasal IV):
```tsx
import AnimatedSection from "../AnimatedSection";

export interface VideoItem { embedUrl: string; title: string; desc: string; }
interface VideoProps { title: string; items: VideoItem[]; }

export default function Video({ title, items }: VideoProps) {
  return (
    <section aria-label="Video">
      <AnimatedSection>
        <h2>{title}</h2>
      </AnimatedSection>
      {items.map((v) => (
        <figure key={v.embedUrl} className="stagger-item video-touchsafe">
          <iframe
            src={v.embedUrl}
            title={v.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <figcaption>{v.desc}</figcaption>
        </figure>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Tulis tests/page.spec.ts.template**

```ts
// Salin menjadi tests/<slug_tepat>.spec.ts (slug 100% dari PAGES-LIST.md, tanpa translasi).
// Ganti <slug_tepat> dan {{BRAND_SLUG}} sebelum dijalankan.
import { test, expect } from "@playwright/test";

const SLUG = "<slug_tepat>";
const BASE = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

test.describe(`Halaman ${SLUG}`, () => {
  test("desktop 1280x720 + screenshot", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(`${BASE}${SLUG}`, { waitUntil: "networkidle" });
    await expect(page.locator("main")).toBeVisible();
    await page.screenshot({ path: `../reports/.preview/desktop-${SLUG.replace(/\//g, "-")}.png`, fullPage: true });
  });

  test("mobile 375x667 + screenshot", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE}${SLUG}`, { waitUntil: "networkidle" });
    await expect(page.locator("main")).toBeVisible();
    await page.screenshot({ path: `../reports/.preview/mobile-${SLUG.replace(/\//g, "-")}.png`, fullPage: true });
  });
});
// Brand: {{BRAND_SLUG}}. Jalankan dari landings/{{BRAND_SLUG}}/web.
```

- [ ] **Step 3: Verifikasi**

Run: `ls .claude/plugins/sitegen/skills/generator/templates/sections/ | wc -l; rg -c "1280|375|<slug_tepat>|\.preview" .claude/plugins/sitegen/skills/generator/templates/tests/page.spec.ts.template`
Expected: `11` file section; `4` (1280, 375, slug, preview).

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/generator/templates/sections/faq.tsx .claude/plugins/sitegen/skills/generator/templates/sections/cta.tsx .claude/plugins/sitegen/skills/generator/templates/sections/video.tsx .claude/plugins/sitegen/skills/generator/templates/tests/page.spec.ts.template
git commit -m "feat(sitegen): snippet faq/cta/video + Playwright spec template"
```

---

### Task 8: Report & planning templates (SPEC-14)

**Files:**
- Create: `skills/planner/reference/ASSET-MAPPING.md.template`, `skills/planner/reference/PAGES-LIST.md.template`
- Create: `skills/seo/templates/SEO-AUDIT.md.template`, `skills/debug/templates/DEBUG_LOG.md.template`
- Create: `skills/qa-reviewer/reference/QA-CODE-REPORT.md.template`
- Test: `rg` field kunci.

**Interfaces:**
- Consumes: master Step 6c/7b/7c (asset mapping, centang ✅), `seo/SKILL.md:72-97` + `check-technical.js` 11 cek, `qa-reviewer/SKILL.md:158-162`.
- Produces: kerangka laporan standar — dipakai QA/SEO/debug Batch 2.

- [ ] **Step 1: Tulis ASSET-MAPPING + PAGES-LIST templates**

`ASSET-MAPPING.md.template`:
```markdown
# Asset Mapping — {{BRAND}}

| Aset | URL/Path | Verifikasi 200 OK | Section target |
|---|---|---|---|
| Logo resmi brand |  | belum | Header, Footer |
| Logo produk/game 1 |  | belum |  |
| Foto konvensi/dokumentasi |  | belum |  |
| Video YouTube (embed) |  | belum | section video tiap halaman |

Aturan: DILARANG placeholder/stok tak relevan; tiap URL eksternal wajib 200 OK sebelum dipakai di kode.
```

`PAGES-LIST.md.template`:
```markdown
# Pages List — {{BRAND}}

| Halaman | Slug/route | Disetujui |
|---|---|---|
| Beranda | `/` | ☐ |
| Layanan | `/layanan` | ☐ |

Ganti ☐ menjadi ✅ setelah halaman lulus Visual QA Review + review user (master Step 7c). Slug DILARANG diterjemahkan/diubah.
```

- [ ] **Step 2: Tulis SEO-AUDIT + DEBUG_LOG + QA-CODE templates**

`SEO-AUDIT.md.template`:
```markdown
# SEO Audit — {{BRAND}} — <tanggal>

## 1. Keyword & halaman (anti-kanibalisasi: 1 halaman = 1 grup)
- [ ] buying keyword + ≥2 LSI per halaman
- [ ] URL memuat keyword utama

## 2. Title & Meta (cek otomatis: scripts/check-technical.js)
- [ ] Title ≤55 char, 2-3 keyword, CTR-oriented
- [ ] Description ≤155 char, LSI di luar title

## 3. Struktur & file
- [ ] sitemap.ts, robots.ts, llms.txt (H1 + absolute link), JSON-LD per tipe halaman
- [ ] alt+title di tiap <img>/<Image>; title di tiap <a>

## 4. Backlink & SMO
- [ ] Blog: 3 artikel + gambar clickable ke situs utama
- [ ] 1 section video SMO per halaman

## Temuan (STATUS: LULUS / PERBAIKI)
| # | Lokasi | Masalah | Perbaikan |
|---|---|---|---|
```

`DEBUG_LOG.md.template`:
```markdown
# Debug Log — {{BRAND}} — <tanggal>

| Iterasi (ke-/batas) | Root cause | File diubah | Hasil | Status |
|---|---|---|---|---|
| 1/3 |  |  |  |  |

Batas: debug SEO 3x, post-deploy 2x — lewat batas eskalasi [HARD STOP] ke user.
```

`QA-CODE-REPORT.md.template`:
```markdown
# QA Code Review — <halaman> — {{BRAND}}

1. Strict Slug & struktur: [OK/KURANG]
2. Section PRD hadir semua: [OK/KURANG]
3. Logo & gambar (`public/assets/` + alt & title): [OK/KURANG]
4. Token sisa `{{...}}`: [BERSIH/KOTOR]

## Instruksi revisi (baris-per-baris)
1. ...
```

- [ ] **Step 3: Verifikasi**

Run: `ls .claude/plugins/sitegen/skills/planner/reference/ASSET-MAPPING.md.template .claude/plugins/sitegen/skills/planner/reference/PAGES-LIST.md.template .claude/plugins/sitegen/skills/seo/templates/SEO-AUDIT.md.template .claude/plugins/sitegen/skills/debug/templates/DEBUG_LOG.md.template .claude/plugins/sitegen/skills/qa-reviewer/reference/QA-CODE-REPORT.md.template; rg -l "SEO-AUDIT" .claude/plugins/sitegen/skills/seo/templates/SEO-AUDIT.md.template`
Expected: 5 file terdaftar; nama konsisten (tidak ada `SEO-REPORT`).

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/planner/reference/ASSET-MAPPING.md.template .claude/plugins/sitegen/skills/planner/reference/PAGES-LIST.md.template .claude/plugins/sitegen/skills/seo/templates/SEO-AUDIT.md.template .claude/plugins/sitegen/skills/debug/templates/DEBUG_LOG.md.template .claude/plugins/sitegen/skills/qa-reviewer/reference/QA-CODE-REPORT.md.template
git commit -m "feat(sitegen): report & planning templates standar"
```

---

### Task 9: Deprecated helpers + QC opsional (SPEC-15 + SPEC-16)

**Files:**
- Modify: `.../generator/scripts/extract-pdf.mjs`, `.../generator/scripts/extract-colors.js` (prepend header)
- Modify: `.../generator/package.json` (`puppeteer`+`sharp` → `optionalDependencies`)
- Test: `rg` header + `node -e` JSON valid.

**Interfaces:**
- Consumes: SPEC-15/16; kanon `intake/scripts/extract.py`.
- Produces: single-pipeline terdokumentasi — penghapusan file pindah Batch 3 (bersama Puppeteer).

- [ ] **Step 1: Label deprecated 2 helper**

Sisipkan baris 1 di kedua file:
`extract-pdf.mjs`: `// DEPRECATED (Batch 2): kanal resmi ekstraksi PDF adalah skills/intake/scripts/extract.py. File ini dipertahankan 1 versi untuk kompatibilitas, dihapus di Batch 3.`
`extract-colors.js`: `// DEPRECATED (Batch 2): ekstraksi warna resmi via extract.py (_color_to_hex). File ini dipertahankan 1 versi untuk kompatibilitas, dihapus di Batch 3.`

- [ ] **Step 2: QC-opsional di package.json**

Pindahkan `puppeteer` + `sharp` dari `dependencies` ke `optionalDependencies` (nama + versi sama). Tambah script: `"install:fast": "npm install --omit=optional"` dan `"install:qc": "npm install"`. Cara cepat: `node -e` baca JSON, pindah kunci, tulis kembali dengan 2 spasi.

- [ ] **Step 3: Verifikasi**

Run: `head -1 .claude/plugins/sitegen/skills/generator/scripts/extract-pdf.mjs .claude/plugins/sitegen/skills/generator/scripts/extract-colors.js; node -e "const p=require('./.claude/plugins/sitegen/skills/generator/package.json'); console.log('opt:', Object.keys(p.optionalDependencies||{}).join(',')); console.log('scripts:', p.scripts['install:fast'], '|', p.scripts['install:qc'])"`
Expected: 2 baris DEPRECATED; `opt: puppeteer,sharp`; kedua script tercetak.

- [ ] **Step 4: Commit**

```bash
git add .claude/plugins/sitegen/skills/generator/scripts/extract-pdf.mjs .claude/plugins/sitegen/skills/generator/scripts/extract-colors.js .claude/plugins/sitegen/skills/generator/package.json
git commit -m "chore(sitegen): deprecated helper ganda, QC-deps opsional"
```

---

### Task 10: Sapuan verifikasi akhir Batch 2

**Files:** tidak ada (hanya baca).

**Interfaces:**
- Consumes: Task 1-9.
- Produces: status GO/NO-GO Batch 3.

- [ ] **Step 1: Sapuan serentak**

Run:
```bash
echo "--- jumlah file ---"; ls .claude/plugins/sitegen/skills/generator/templates/ | wc -l; ls .claude/plugins/sitegen/skills/generator/templates/sections/ | wc -l
echo "--- token asing ---"; rg -o "\{\{[A-Z_]+\}\}" -N .claude/plugins/sitegen/skills/generator/templates/ | sort -u
echo "--- larangan ---"; rg -il "picsum|via\.placeholder|example\.jpg|🚀|💡|🛡️|tailwind" .claude/plugins/sitegen/skills/generator/templates/ .claude/plugins/sitegen/skills/seo/templates/ .claude/plugins/sitegen/skills/debug/templates/; echo "rg-exit=$? (1 = bersih)"
echo "--- batas baris snippet ---"; wc -l .claude/plugins/sitegen/skills/generator/templates/sections/*.tsx | awk '$1 > 120 {print "OVER: " $2}'
```
Expected: templates `12` (10 file + `sections/` + `tests/`), sections `11`; token hanya dari daftar Global Constraints; `rg-exit=1`; tidak ada baris `OVER`.

- [ ] **Step 2: Lapor GO/NO-GO**

Terpenuhi semua → `BATCH2-GO` (lanjut Batch 3: hapus Puppeteer, migrasi landings, peringatan template Tailwind). Ada meleset → `BATCH2-NOGO: <item>`, kembalikan ke task terkait.
