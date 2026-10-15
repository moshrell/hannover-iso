// Rendert die Karte (tools/render.html) in WebP-Kacheln: tiles/<Stufe>/<x>_<y>.webp + tiles/meta.json + tiles/poster.webp
// Aufruf: node tools/render-tiles.mjs   (Playwright + Chromium; Zerschneiden mit Python/Pillow: tools/cut-tiles.py)
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEVELS = [0.375, 0.75, 1.5, 3], BLOCK = 1024, DPR = 2;
const tmp = '/tmp/iso-render'; rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: BLOCK, height: BLOCK }, deviceScaleFactor: DPR });
page.on('pageerror', e => console.error('pageerror', e.message));
await page.goto('file://' + path.join(root, 'tools/render.html'));
await page.waitForFunction(() => window.SCENE && window.SCENE.ready, null, { timeout: 60000 });
const { VW, VH, labels } = await page.evaluate(() => ({ VW: SCENE.VW, VH: SCENE.VH, labels: SCENE.labels }));
const jobs = [];
for (const [li, s] of LEVELS.entries()) {
  const W = VW * s, H = VH * s, bx = Math.ceil(W / BLOCK), by = Math.ceil(H / BLOCK);
  for (let y = 0; y < by; y++) for (let x = 0; x < bx; x++) {
    await page.evaluate(([x0, y0, s]) => SCENE.view(x0, y0, s), [x * BLOCK / s, y * BLOCK / s, s]);
    await page.waitForTimeout(150);
    const f = `${tmp}/L${li}_${x}_${y}.png`;
    await page.screenshot({ path: f });
    jobs.push({ li, x, y, f });
  }
  console.log('Stufe', li, 'Maßstab', s, 'Blöcke', bx * by);
}
await browser.close();
const meta = { VW: +VW.toFixed(2), VH: +VH.toFixed(2), tile: 256, block: BLOCK, dpr: DPR, levels: LEVELS.map(s => ({ s, w: Math.ceil(VW * s), h: Math.ceil(VH * s) })), labels };
writeFileSync(`${tmp}/meta.json`, JSON.stringify(meta));
execFileSync('python3', ['-I', path.join(root, 'tools/cut-tiles.py'), tmp, path.join(root, 'tiles')], { stdio: 'inherit' });
