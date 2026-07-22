import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(__dirname, '..');
const SECTIONS_DIR = resolve(SKILL_DIR, 'sections');

function read(path) {
  return readFileSync(path, 'utf-8');
}

function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function sectionStyles() {
  const files = [
    'hero.css', 'problem.css', 'solution.css', 'about.css',
    'management.css', 'techstack.css', 'testimonial.css', 'pricing.css',
    'faq.css', 'cta.css', 'video.css'
  ];
  return files.map(f => {
    const p = resolve(SECTIONS_DIR, f);
    return existsSync(p) ? read(p) : '';
  }).join('\n');
}

function bgClass(index, type) {
  if (type === 'hero' || type === 'cta') return '';
  return index % 2 === 0 ? 'bg-light' : 'bg-white';
}

function genHero(d, idx) {
  const bg = bgClass(idx, 'hero');
  const logoImg = d.logo ? `<div class="hero-brand anim-fade-down"><img src="${d.logo}" alt="${esc(d.brand)}" title="${esc(d.brand)}" loading="lazy"></div>` : '';
  const cta = d.cta ? `<a href="${d.cta.target || '#'}" class="btn-cta" title="${d.cta.text}">${d.cta.text}</a>` : '';
  const cta2 = d.ctaSecondary ? `<a href="${d.ctaSecondary.target || '#'}" class="btn-cta-outline" title="${d.ctaSecondary.text}">${d.ctaSecondary.text}</a>` : '';
  const stats = d.stats?.map(s => `<div class="hero-stat"><span class="hero-stat-number">${s.number}</span><span class="hero-stat-label">${s.label}</span></div>`).join('') || '';
  const clients = d.clients?.map(c => `<span class="client-logo">${c}</span>`).join('') || '';
  const heroImg = d.heroImage ? `<div class="hero-img-wrap anim-fade-right"><img src="${d.heroImage}" alt="${esc(d.brand)}" title="${esc(d.brand)}" fetchpriority="high" loading="eager" decoding="async"></div>` : '';
  return `<section class="section section-hero ${bg}" id="hero">
  <div class="hero-inner">
    <div class="hero-text">
      ${logoImg}
      <h1 class="anim-fade-up">${d.headline}</h1>
      ${d.subheadline ? `<p class="hero-sub anim-fade-up stagger-1">${d.subheadline}</p>` : ''}
      <div class="hero-actions anim-fade-up stagger-2">${cta}${cta2}</div>
      ${stats ? `<div class="hero-stats anim-fade-up stagger-3">${stats}</div>` : ''}
      ${clients ? `<div class="client-logos anim-fade-up stagger-4"><span class="client-label">Digunakan oleh</span><div class="client-list">${clients}</div></div>` : ''}
    </div>
    ${heroImg}
  </div>
</section>`;
}

function genProblem(d, idx) {
  const bg = bgClass(idx, 'problem');
  const items = d.items.map((item, i) => `<li class="problem-item anim-flip-up stagger-${Math.min(i+1,5)}">
  <div class="problem-icon"><span class="problem-num">${String(i+1).padStart(2, '0')}</span></div>
  <div class="problem-text"><h3>${item.title}</h3><p>${item.desc}</p></div>
</li>`).join('');
  const img = d.image ? `<div class="section-visual anim-fade-right"><img src="${d.image}" alt="${esc(d.title || d.brand || '')}" title="${esc(d.title || d.brand || '')}" loading="lazy" decoding="async"></div>` : '';
  return `<section class="section section-problem ${bg}" id="problem">
  <div class="container">
    <div class="section-layout">
      <div>
        ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
        ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
        <ul class="problem-list" data-carousel>${items}</ul>
        ${genDots(d.items)}
        ${d.closing ? `<div class="problem-closing anim-fade-up stagger-5">${d.closing}</div>` : ''}
      </div>
      ${img}
    </div>
  </div>
</section>`;
}

function genSolution(d, idx) {
  const bg = bgClass(idx, 'solution');
  const benefits = d.benefits.map((b, i) => `<div class="benefit-card anim-flip-up stagger-${Math.min(i+1,5)}">
  <div class="benefit-icon">${b.icon || `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`}</div>
  <h3>${b.title}</h3>
  <p>${b.desc}</p>
</div>`).join('');
  const img = d.image ? `<div class="section-visual anim-fade-left"><img src="${d.image}" alt="${esc(d.title || d.brand || '')}" title="${esc(d.title || d.brand || '')}" loading="lazy" decoding="async"></div>` : '';
  return `<section class="section section-solution ${bg}" id="solution">
  <div class="container">
    <div class="section-layout">
      ${img}
      <div>
        ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
        ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
        ${d.valueProp ? `<div class="value-prop anim-fade-up stagger-2">${d.valueProp}</div>` : ''}
        <div class="benefits" data-carousel>${benefits}</div>
        ${genDots(d.benefits)}
      </div>
    </div>
  </div>
</section>`;
}

function genAbout(d, idx) {
  const bg = bgClass(idx, 'about');
  const paragraphs = d.story.map(p => `<p>${p}</p>`).join('');
  const teamPhoto = d.teamPhoto ? `<div class="team-photo anim-zoom-in"><img src="${d.teamPhoto}" alt="Tim ${esc(d.brand || '')}" title="Tim ${esc(d.brand || '')}" loading="lazy" decoding="async"></div>` : '';
  return `<section class="section section-about ${bg}" id="about">
  <div class="container">
    ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
    ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
    <div class="about-content">
      <div class="story anim-fade-up stagger-2">${paragraphs}</div>
      ${teamPhoto}
    </div>
  </div>
</section>`;
}

function genManagement(d, idx) {
  const bg = bgClass(idx, 'management');
  const items = d.items.map((item, i) => `<div class="mgmt-card anim-slide-up stagger-${Math.min(i+1,5)}">
  <div class="mgmt-icon"><div class="mgmt-num">${i+1}</div></div>
  <h3>${item.title}</h3>
  <p>${item.desc}</p>
</div>`).join('');
  return `<section class="section section-management ${bg}" id="management">
  <div class="container">
    ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
    ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
    ${d.subheadline ? `<p class="mgmt-subheadline anim-fade-up stagger-2">${d.subheadline}</p>` : ''}
    <div class="mgmt-grid" data-carousel>${items}</div>
    ${genDots(d.items)}
  </div>
</section>`;
}

function genTechstack(d, idx) {
  const bg = bgClass(idx, 'techstack');
  const cats = d.categories.map((cat, i) => `<div class="tech-category anim-scale-up stagger-${Math.min(i+1,5)}">
  <h3>${cat.name}</h3>
  <div class="tech-list">${cat.items.map(t => `<span class="tech-item">${t}</span>`).join('')}</div>
</div>`).join('');
  return `<section class="section section-techstack ${bg}" id="techstack">
  <div class="container">
    ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
    ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
    <div class="tech-grid" data-carousel>${cats}</div>
    ${genDots(d.categories)}
  </div>
</section>`;
}

function genTestimonial(d, idx) {
  const bg = bgClass(idx, 'testimonial');
  const items = d.items.map((t, i) => {
    const avatar = t.photo
      ? `<img src="${t.photo}" alt="${esc(t.name)}" title="${esc(t.name)}" class="author-avatar" loading="lazy" decoding="async">`
      : `<div class="author-avatar">${t.name.charAt(0)}</div>`;
    return `<div class="testimonial-card anim-zoom-in stagger-${Math.min(i+1,5)}">
  <p class="quote">${t.quote}</p>
  <div class="author">${avatar}<div><div class="name">${t.name}</div>${t.role ? `<div class="role">${t.role}</div>` : ''}</div></div>
</div>`;
  }).join('');
  return `<section class="section section-testimonial ${bg}" id="testimonial">
  <div class="container">
    ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
    ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
    <div class="testimonials" data-carousel>${items}</div>
    ${genDots(d.items)}
  </div>
</section>`;
}

function genPricing(d, idx) {
  const bg = bgClass(idx, 'pricing');
  const items = d.items.map((p, i) => {
    const features = (p.features || []).map(f => `<li><span class="check">></span> ${f}</li>`).join('');
    const featured = p.featured ? ' featured' : '';
    const badge = p.featuredBadge ? `<div class="featured-badge">${p.featuredBadge}</div>` : '';
    return `<div class="pricing-card${featured} anim-flip-up stagger-${Math.min(i+1,5)}">
  ${badge}
  <h3>${p.name}</h3>
  <div class="price">${p.price}${p.period ? `<span> / ${p.period}</span>` : ''}</div>
  <ul class="features-list">${features}</ul>
  ${p.cta ? `<a href="${p.cta.target || '#'}" class="btn-pricing" title="${p.cta.text}">${p.cta.text}</a>` : ''}
</div>`;
  }).join('');
  return `<section class="section section-pricing ${bg}" id="pricing">
  <div class="container">
    ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
    ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
    ${d.promo ? `<div class="pricing-promo anim-fade-up stagger-2">${d.promo}</div>` : ''}
    <div class="pricing-grid" data-carousel>${items}</div>
    ${genDots(d.items)}
  </div>
</section>`;
}

function genFaq(d, idx) {
  const bg = bgClass(idx, 'faq');
  const items = d.items.map((faq, i) => `<div class="faq-item anim-fade-up stagger-${Math.min(i+1,5)}">
  <button class="faq-question" aria-expanded="false">
    ${faq.q}
    <span class="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
  </button>
  <div class="faq-answer"><p>${faq.a}</p></div>
</div>`).join('');
  return `<section class="section section-faq ${bg}" id="faq">
  <div class="container">
    ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
    ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
    <div class="faq-list">${items}</div>
  </div>
</section>`;
}

function genCta(d, idx) {
  const contacts = (d.contactItems || []).map(c => `<a href="${c.url}" class="cta-contact-item" title="${c.label}">${c.label}</a>`).join('');
  const socials = (d.socialItems || []).map(s => `<a href="${s.url}" class="cta-social-item" target="_blank" rel="noopener" title="${s.label}">${s.label}</a>`).join('');
  return `<section class="section section-cta" id="cta">
  <div class="container">
    <h2 class="anim-reveal-up">${d.headline}</h2>
    ${d.subheadline ? `<p class="anim-reveal-up stagger-1">${d.subheadline}</p>` : ''}
    ${d.cta ? `<a href="${d.cta.target || '#'}" class="btn-cta-final anim-reveal-up stagger-2" title="${d.cta.text}">${d.cta.text}</a>` : ''}
    ${contacts ? `<div class="cta-contact-row anim-fade-up stagger-3">${contacts}</div>` : ''}
    ${socials ? `<div class="cta-social-row anim-fade-up stagger-4">${socials}</div>` : ''}
    ${d.guarantee ? `<div class="cta-guarantee anim-fade-up stagger-5">// ${d.guarantee}</div>` : ''}
  </div>
</section>`;
}

function genVideo(d, idx) {
  const bg = bgClass(idx, 'video');
  const items = (d.items || []).map((v, i) => `<div class="video-item anim-fade-up stagger-${Math.min(i+1,5)}">
  <div class="video-wrapper">
    <iframe src="${v.embedUrl}" title="${esc(v.title || '')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
  </div>
  ${v.title || v.desc ? `<div class="video-caption">
    ${v.title ? `<h3>${v.title}</h3>` : ''}
    ${v.desc ? `<p>${v.desc}</p>` : ''}
  </div>` : ''}
</div>`).join('');
  return `<section class="section section-video ${bg}" id="video">
  <div class="container">
    ${d.label ? `<div class="section-label anim-fade-up">${d.label}</div>` : ''}
    ${d.title ? `<h2 class="section-title anim-fade-up stagger-1">${d.title}</h2>` : ''}
    <div class="video-grid">${items}</div>
  </div>
</section>`;
}

function genNav(config) {
  const items = (config.navigation || []).map(n => {
    const target = n.target.startsWith('#') ? n.target : `#${n.target}`;
    return `<li><a href="${target}" title="${n.label}">${n.label}</a></li>`;
  }).join('');
  const logo = config.logo ? `<img src="${config.logo}" alt="${esc(config.brand)}" title="${esc(config.brand)}">` : config.brand;
  return `<nav class="navbar" role="navigation" aria-label="Navigasi utama">
  <div class="nav-container">
    <a href="#hero" class="nav-logo" title="${esc(config.brand)}">${logo}</a>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-menu">${items}</ul>
  </div>
</nav>`;
}

function genFooter(config) {
  const f = config.footer || {};
  const c = f.contact || {};
  const s = f.social || {};
  const socialLinks = [];
  if (s.instagram) socialLinks.push(`<a href="${s.instagram}" target="_blank" rel="noopener" title="Instagram">Instagram</a>`);
  if (s.tiktok) socialLinks.push(`<a href="${s.tiktok}" target="_blank" rel="noopener" title="TikTok">TikTok</a>`);
  if (s.linkedin) socialLinks.push(`<a href="${s.linkedin}" target="_blank" rel="noopener" title="LinkedIn">LinkedIn</a>`);
  return `<footer class="footer">
  <div class="footer-container">
    <div class="footer-col">
      <h3>${esc(config.brand)}</h3>
      <p>${config.tagline || ''}</p>
    </div>
    ${c.email || c.wa || c.address ? `<div class="footer-col">
      <h3>Kontak</h3>
      ${c.email ? `<p><strong>Email</strong><br>${c.email}</p>` : ''}
      ${c.wa ? `<p><strong>WA</strong><br>${c.wa}</p>` : ''}
      ${c.address ? `<p><strong>Alamat</strong><br>${c.address}</p>` : ''}
    </div>` : ''}
    ${socialLinks.length ? `<div class="footer-col">
      <h3>Sosial Media</h3>
      <div class="footer-social">${socialLinks.join('')}</div>
    </div>` : ''}
    <div class="footer-col">
      <h3>Newsletter</h3>
      <p>Dapatkan update terbaru dari ${esc(config.brand)}.</p>
      <form class="footer-form" onsubmit="event.preventDefault();alert('Terima kasih!')">
        <input type="email" placeholder="Email kamu" required aria-label="Email newsletter">
        <button type="submit">Langganan</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom"><p>&copy; ${f.copyright || `${new Date().getFullYear()} ${config.brand}. All rights reserved.`}</p></div>
</footer>`;
}

function genMeta(config) {
  const m = config.meta || {};
  const desc = m.description || `${config.brand} — ${config.tagline || ''}`;
  const title = `${config.brand} — ${config.tagline || ''}`;
  const url = config.url || '';
  const lang = config.language === 'en' ? 'en_US' : 'id_ID';
  const ogImage = m.ogImage || (config.logo ? config.logo : '');
  
  // SEO validation warnings
  if (title.length > 55) console.warn(`⚠️  SEO: Title tag terlalu panjang (${title.length} chars, max 55): "${title}"`);
  if (desc.length > 155) console.warn(`⚠️  SEO: Meta description terlalu panjang (${desc.length} chars, max 155): "${desc.substring(0, 60)}..."`);
  if (!url) console.warn(`⚠️  SEO: Field "url" kosong — canonical link dan og:url kosong. Isi untuk SEO optimal.`);
  if (!m.keywords) console.warn(`⚠️  SEO: Field "meta.keywords" kosong.`);
  
  const sitemapLink = url
    ? `<link rel="sitemap" type="application/xml" href="${esc(url.replace(/\/$/, ''))}/sitemap.xml">`
    : `<link rel="sitemap" type="application/xml" href="sitemap.xml">`;
  
  return `<meta name="description" content="${esc(desc)}">
<meta name="keywords" content="${esc(m.keywords || '')}">
<meta name="robots" content="index, follow">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="${m.ogType || 'website'}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:site_name" content="${esc(config.brand)}">
<meta property="og:locale" content="${lang}">
${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : ''}
<meta name="twitter:card" content="${m.twitterCard || 'summary_large_image'}">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ''}
<link rel="canonical" href="${esc(url || '')}">
${sitemapLink}`;
}

function genJsonLd(config) {
  const hasFaq = config.sections.some(s => s.type === 'faq');
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.brand,
    "url": config.url || undefined,
    "description": config.tagline || undefined,
    "logo": config.logo || undefined
  };
  const web = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${config.brand} — ${config.tagline || ''}`,
    "url": config.url || undefined,
    "description": config.meta?.description || undefined
  };
  const schemas = [org, web];
  if (hasFaq) {
    const faqSection = config.sections.find(s => s.type === 'faq');
    const questions = (faqSection?.data?.items || []).map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }));
    if (questions.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions
      });
    }
  }
  return `<script type="application/ld+json">${JSON.stringify(schemas, null, 2)}<\/script>`;
}

function genRobotsTxt(config) {
  const url = config.url;
  const sitemapUrl = url
    ? `${url.replace(/\/$/, '')}/sitemap.xml`
    : 'sitemap.xml';
  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
}

function genSitemapXml(config) {
  const url = config.url;
  const sm = config.sitemap || {};
  const loc = url ? url.replace(/\/$/, '') + '/' : '/';
  const lastmod = new Date().toISOString().split('T')[0];
  const changefreq = sm.changefreq || 'monthly';
  const priority = sm.priority != null ? sm.priority : 0.8;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
</urlset>`;
}

function genRobotsEmbed(config) {
  return `<!-- robots.txt content (also available at ./robots.txt) -->
<script type="text/plain" id="robots-txt-content">
${genRobotsTxt(config)}<\/script>`;
}

function genSitemapEmbed(config) {
  return `<!-- sitemap.xml content (also available at ./sitemap.xml) -->
<script type="application/xml" id="sitemap-xml-content">
${genSitemapXml(config)}<\/script>`;
}

function genDots(items) {
  const dots = items.map((_, i) =>
    `<button class="carousel-dot" aria-label="Slide ${i+1}"></button>`
  ).join('');
  return `<div class="carousel-dots">${dots}</div>`;
}

// ======== MAIN ========
const configPath = resolve(process.argv[2] || 'config.json');
if (!existsSync(configPath)) {
  console.error(`Config not found: ${configPath}`);
  process.exit(1);
}

const config = JSON.parse(read(configPath));
const templatePath = resolve(SKILL_DIR, 'template.html');
const template = read(templatePath);

const sectionGenerators = {
  hero: genHero,
  problem: genProblem,
  solution: genSolution,
  about: genAbout,
  management: genManagement,
  techstack: genTechstack,
  testimonial: genTestimonial,
  pricing: genPricing,
  faq: genFaq,
  cta: genCta,
  video: genVideo
};

const sectionsHtml = config.sections.map((sec, i) => {
  const gen = sectionGenerators[sec.type];
  if (!gen) { console.warn(`Unknown section type: ${sec.type}`); return ''; }
  // Pass config for hero logo access
  return gen({ ...sec.data, brand: config.brand, logo: config.logo }, i);
}).join('\n\n');

// Backward compatibility: map old color names to new
if (config.colors.cyan && !config.colors.primary) {
  config.colors.primary = config.colors.cyan;
  config.colors.secondary = config.colors.blue;
  config.colors.dark = config.colors.navy;
  console.warn('⚠️  Config menggunakan color naming lama (cyan/blue/navy). Mohon migrasi ke primary/secondary/dark.');
}

const theme = `:root {
  --primary: ${config.colors.primary};
  --secondary: ${config.colors.secondary};
  --dark: ${config.colors.dark};
  --font-heading: '${config.font?.heading || 'Sora'}', sans-serif;
  --font-body: '${config.font?.body || 'Plus Jakarta Sans'}', sans-serif;
}`;

const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${(config.font?.heading || 'Sora').replace(/ /g, '+')}:wght@400;600;700;800&family=${(config.font?.body || 'Plus+Jakarta+Sans').replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;

const html = template
  .replace('{{LANG}}', config.language === 'en' ? 'en' : 'id')
  .replace('{{BRAND}}', config.brand)
  .replace('{{TAGLINE}}', config.tagline || '')
  .replace('{{META}}', genMeta(config))
  .replace('{{JSONLD}}', genJsonLd(config))
  .replace('{{THEME}}', theme)
  .replace('{{GOOGLE_FONTS_URL}}', googleFontsUrl)
  .replace('{{NAV}}', genNav(config))
  .replace('{{SECTIONS}}', sectionsHtml)
  .replace('{{FOOTER}}', genFooter(config))
  .replace('{{ROBOTS_CONTENT}}', genRobotsEmbed(config))
  .replace('{{SITEMAP_CONTENT}}', genSitemapEmbed(config))
  .replace('{{SECTION_STYLES}}', sectionStyles());

const outputDir = resolve(configPath, '..');
const outputPath = resolve(outputDir, 'index.html');
writeFileSync(outputPath, html, 'utf-8');
console.log(`Generated: ${outputPath}`);

// Generate robots.txt
const robotsPath = resolve(outputDir, 'robots.txt');
writeFileSync(robotsPath, genRobotsTxt(config), 'utf-8');
console.log(`Generated: ${robotsPath}`);

// Generate sitemap.xml
const sitemapPath = resolve(outputDir, 'sitemap.xml');
writeFileSync(sitemapPath, genSitemapXml(config), 'utf-8');
console.log(`Generated: ${sitemapPath}`);
