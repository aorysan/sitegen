import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// Usage: node render.js <baseUrl> <route1> <route2> ...
// Example: node render.js http://localhost:3000 / /about /services

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: node render.js <baseUrl> <route1> [route2...]");
    process.exit(1);
  }

  const baseUrl = args[0].replace(/\/$/, "");
  const routes = args.slice(1);
  const outDir = path.join(process.cwd(), ".preview");

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log(`Starting Self-Healing QC render for ${routes.length} routes on ${baseUrl}`);
  console.log(`Saving screenshots to ${outDir}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Listen to browser console error events for self-healing debugging
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.error(`  [Browser Error]: ${msg.text()}`);
    }
  });

  page.on("pageerror", (err) => {
    console.error(`  [Page Error]: ${err.message}`);
  });

  for (const route of routes) {
    const url = `${baseUrl}${route.startsWith("/") ? route : "/" + route}`;
    let routeName = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");

    console.log(`Rendering ${url} ...`);

    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      // --- Desktop View ---
      await page.setViewport({ width: 1440, height: 900 });
      await new Promise((r) => setTimeout(r, 2000));
      const desktopPath = path.join(outDir, `desktop-${routeName}.png`);
      await page.screenshot({ path: desktopPath, fullPage: true });
      console.log(`  [OK] Saved ${desktopPath}`);

      // --- Mobile View ---
      await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
      await new Promise((r) => setTimeout(r, 1000));
      const mobilePath = path.join(outDir, `mobile-${routeName}.png`);
      await page.screenshot({ path: mobilePath, fullPage: true });
      console.log(`  [OK] Saved ${mobilePath}`);
    } catch (err) {
      console.error(`  [ERROR] Failed to render ${url}:`, err.message);
    }
  }

  await browser.close();
  console.log("\nQC Rendering Complete.");
}

main().catch(console.error);
