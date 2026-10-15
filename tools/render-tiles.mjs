// Rendert die Karte (tools/render.html) in WebP-Kacheln: tiles/<Stufe>/<x>_<y>.webp + tiles/meta.json + tiles/poster.webp
// Aufruf: node tools/render-tiles.mjs   (Playwright + Chromium; Zerschneiden mit Python/Pillow: tools/cut-tiles.py)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
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

// Blöcke ganz außerhalb des Datengebiets (gedrehtes Rechteck aus data/q.txt) werden nicht gerendert
const bb = readFileSync(path.join(root, 'data/q.txt'), 'utf8').match(/\((\d+\.\d+),(\d+\.\d+),(\d+\.\d+),(\d+\.\d+)\)/).slice(1).map(Number);
const LAT0 = 52.3710, LON0 = 9.7375, KX = Math.cos(LAT0 * Math.PI / 180) * 111320, KY = 110540, AL = -0.2757948, CC = Math.cos(Math.PI / 6);
const wp = (la, lo) => { const x = (lo - LON0) * KX, y = -(la - LAT0) * KY; return [x * Math.cos(AL) - y * Math.sin(AL), x * Math.sin(AL) + y * Math.cos(AL)]; };
const ext = JSON.parse(readFileSync(path.join(root, 'data/mitte.js'), 'utf8').split('window.MITTE=')[1].replace(/;\s*$/, '')).ext;
const ec = [[ext[0], ext[2]], [ext[1], ext[2]], [ext[0], ext[3]], [ext[1], ext[3]]].map(([x, y]) => [(x - y) * CC, (x + y) / 2]);
const BX0 = Math.min(...ec.map(p => p[0])), BY0 = Math.min(...ec.map(p => p[1])) - 120;
const quad = [[bb[0], bb[1]], [bb[0], bb[3]], [bb[2], bb[3]], [bb[2], bb[1]]].map(([la, lo]) => { const [x, y] = wp(la, lo); return [(x - y) * CC - BX0, (x + y) / 2 - BY0]; });
function hits(x0, y0, x1, y1) {            // Rechteck gegen konvexes Viereck (Trennachsen)
  const R = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  for (const P of [R, quad]) for (let i = 0; i < 4; i++) {
    const a = P[i], b = P[(i + 1) % 4], n = [b[1] - a[1], a[0] - b[0]];
    const pa = R.map(p => n[0] * p[0] + n[1] * p[1]), pb = quad.map(p => n[0] * p[0] + n[1] * p[1]);
    if (Math.max(...pa) < Math.min(...pb) || Math.max(...pb) < Math.min(...pa)) return false;
  }
  return true;
}
const jobs = [];
for (const [li, s] of LEVELS.entries()) {
  const W = VW * s, H = VH * s, bx = Math.ceil(W / BLOCK), by = Math.ceil(H / BLOCK);
  for (let y = 0; y < by; y++) for (let x = 0; x < bx; x++) {
    if (li > 0 && !hits(x * BLOCK / s - 40, y * BLOCK / s - 40, (x + 1) * BLOCK / s + 40, (y + 1) * BLOCK / s + 40)) continue;
    await page.evaluate(([x0, y0, s]) => SCENE.view(x0, y0, s), [x * BLOCK / s, y * BLOCK / s, s]);
    await page.waitForTimeout(150);
    const f = `${tmp}/L${li}_${x}_${y}.png`;
    await page.screenshot({ path: f });
    jobs.push({ li, x, y, f });
  }
  console.log('Stufe', li, 'Maßstab', s, 'Blöcke', bx * by);
}
await browser.close();
const qx = quad.map(p => p[0]), qy = quad.map(p => p[1]);
const box = [Math.max(0, Math.min(...qx) - 40), Math.max(0, Math.min(...qy) - 80), Math.min(VW, Math.max(...qx) + 40), Math.min(VH, Math.max(...qy) + 40)].map(v => +v.toFixed(1));   // Datengebiet im Weltbild (für Start-/Gesamtansicht)
const meta = { box, VW: +VW.toFixed(2), VH: +VH.toFixed(2), tile: 256, block: BLOCK, dpr: DPR, levels: LEVELS.map(s => ({ s, w: Math.ceil(VW * s), h: Math.ceil(VH * s) })), labels };
writeFileSync(`${tmp}/meta.json`, JSON.stringify(meta));
execFileSync('python3', ['-I', path.join(root, 'tools/cut-tiles.py'), tmp, path.join(root, 'tiles')], { stdio: 'inherit' });
