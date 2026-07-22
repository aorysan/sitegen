// QC helper — render landing page HTML → screenshot (desktop + mobile) untuk verifikasi.
// BUKAN deliverable: output PNG hanya untuk cek visual, boleh dihapus.
// Usage: node scripts/render.js <output>/index.html [outDir]
// Butuh puppeteer (npm install di root skill bila belum ada).
const path = require("path");
const puppeteer = require("puppeteer");

const html = process.argv[2];
if (!html) { 
  console.error("Usage: node scripts/render.js <landing.html>"); 
  process.exit(1); 
}
const outDir = path.join(path.dirname(path.resolve(html)), ".preview");
const fs = require("fs");
fs.mkdirSync(outDir, { recursive: true });
const base = path.basename(html, ".html");
const url = "file://" + path.resolve(html);

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  
  async function shot(name, w, h, full = false) {
    const p = await b.newPage();
    await p.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await p.goto(url, { waitUntil: "networkidle0" });
    await p.evaluate(async () => {
      if (document.fonts) await document.fonts.ready;
      
      // Disable content-visibility temporarily so offscreen elements render in the fullpage screenshot
      const style = document.createElement('style');
      style.innerHTML = '.section { content-visibility: visible !important; }';
      document.head.appendChild(style);
      
      // Force all animated elements to be visible for the screenshot
      const sel = '.anim-fade-up, .anim-fade-down, .anim-fade-left, .anim-fade-right, .anim-scale-up, .anim-zoom-in, .anim-flip-up, .anim-slide-up, .anim-reveal-up, .anim-skew-in';
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add('visible');
      });
    });
    await new Promise((r) => setTimeout(r, 1000));
    const out = path.join(outDir, `${base}.${name}.png`);
    await p.screenshot({ path: out, fullPage: full });
    console.log("QC:", path.relative(process.cwd(), out));
  }
  
  await shot("desktop", 1280, 900, true);
  await shot("mobile", 390, 844, true);
  await b.close();
})();
