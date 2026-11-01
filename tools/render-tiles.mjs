// Rendert die Karte (tools/render.html) in WebP-Kacheln: tiles/<Stufe>/<x>_<y>.webp + tiles/meta.json + tiles/poster.webp
// Aufruf: node tools/render-tiles.mjs [--at lat,lon,radius_m]…   (ohne --at: ganze Karte; mit --at nur die Blöcke um diese Orte, Ergebnis wird in tiles/ eingemischt)  (Playwright + Chromium; Zerschneiden mit Python/Pillow: tools/cut-tiles.py)
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEVELS = [0.09375, 0.375, 0.75, 1.5, 3], BLOCK = 1024, DPR = 2;
const OUTER_MAX = 2;   // außerhalb der Innenstadt (data/bbox.json → core) nur Stufen bis 0,75 px/m: ganze Stadt bei kleinem Speicherbedarf
const tmp = '/tmp/iso-render'; rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
// frische Seite je Bereich: bei vielen Regionswechseln in einer Seite wächst der Renderer-Speicher und Screenshots hängen
let page = null;
async function freshPage() {
  if (page) await page.close();
  page = await browser.newPage({ viewport: { width: BLOCK, height: BLOCK }, deviceScaleFactor: DPR });
  page.on('pageerror', e => console.error('pageerror', e.message));
  await page.goto('file://' + path.join(root, 'tools/render.html'));
  await page.waitForFunction(() => window.SCENE && window.SCENE.ready, null, { timeout: 60000 });
}
await freshPage();
const { VW, VH, labels } = await page.evaluate(() => ({ VW: SCENE.VW, VH: SCENE.VH, labels: SCENE.labels }));

// Blöcke ganz außerhalb des Datengebiets werden nicht gerendert; feine Stufen nur in der Innenstadt (data/bbox.json: all / core, je S,W,N,E)
const BB = JSON.parse(readFileSync(path.join(root, 'data/bbox.json'), 'utf8'));
const LAT0 = 52.3710, LON0 = 9.7375, KX = Math.cos(LAT0 * Math.PI / 180) * 111320, KY = 110540, AL = -0.2757948, CC = Math.cos(Math.PI / 6);
const wp = (la, lo) => { const x = (lo - LON0) * KX, y = -(la - LAT0) * KY; return [x * Math.cos(AL) - y * Math.sin(AL), x * Math.sin(AL) + y * Math.cos(AL)]; };
const ext = JSON.parse(readFileSync(path.join(root, 'data/mitte.js'), 'utf8').split('window.MITTE=')[1].replace(/;\s*$/, '')).ext;
const ec = [[ext[0], ext[2]], [ext[1], ext[2]], [ext[0], ext[3]], [ext[1], ext[3]]].map(([x, y]) => [(x - y) * CC, (x + y) / 2]);
const BX0 = Math.min(...ec.map(p => p[0])), BY0 = Math.min(...ec.map(p => p[1])) - 120;
const quadOf = bb => [[bb[0], bb[1]], [bb[0], bb[3]], [bb[2], bb[3]], [bb[2], bb[1]]].map(([la, lo]) => { const [x, y] = wp(la, lo); return [(x - y) * CC - BX0, (x + y) / 2 - BY0]; });
const quadAll = quadOf(BB.all), quadCore = quadOf(BB.core);
let quadCur = quadAll;
const quadsExtra = (BB.extra || []).map(quadOf);   // Zusatzzonen mit allen Stufen (z. B. Telemax)
// Teilrender: --at lat,lon,radius_m (mehrfach). Rechteck im Weltbild = Grundpunkt ± Radius, nach oben um Radius·1,3 (Gebäudehöhe)
const AT = process.argv.flatMap((a, i, A) => a === '--at' ? [A[i + 1].split(',').map(Number)] : []);
// Teilrender nach Namen: --lm name[,name…]  (Rechteck um die Gebäudezeichnung: Fußabdruck + Höhe, gleiche Umrechnung wie bei --at)
const LMN = process.argv.flatMap((a, i, A) => a === '--lm' ? A[i + 1].split(',') : []);
const LMR = LMN.length ? await page.evaluate(names => names.map(n => { const L = MITTE.lm[n], d = ISO.LM[n](ISO.H); return L ? { cx: L.cx, cy: L.cy, r: Math.max(L.w, L.d) * .75 + 25, h: d.h } : null; }), LMN) : [];
LMR.forEach((o, i) => { if (!o) { console.error('--lm: Gebäude nicht gefunden', LMN[i]); process.exit(1); } });
const RECTS = (AT.length || LMR.length) ? [...AT.map(([la, lo, r]) => { const [x, y] = wp(la, lo), px = (x - y) * CC - BX0, py = (x + y) / 2 - BY0; return [px - r, py - r * 1.3, px + r, py + r * .6]; }),
  ...LMR.map(o => { const px = (o.cx - o.cy) * CC - BX0, py = (o.cx + o.cy) / 2 - BY0; return [px - o.r, py - Math.max(o.r * 1.3, o.h * 1.15), px + o.r, py + o.r * .6]; })] : null;
if (RECTS) console.log('Teilrender, Rechtecke:', JSON.stringify(RECTS.map(r => r.map(Math.round))));
function hits(x0, y0, x1, y1, quad = quadCur) {            // Rechteck gegen konvexes Viereck (Trennachsen)
  const R = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  for (const P of [R, quad]) for (let i = 0; i < 4; i++) {
    const a = P[i], b = P[(i + 1) % 4], n = [b[1] - a[1], a[0] - b[0]];
    const pa = R.map(p => n[0] * p[0] + n[1] * p[1]), pb = quad.map(p => n[0] * p[0] + n[1] * p[1]);
    if (Math.max(...pa) < Math.min(...pb) || Math.max(...pb) < Math.min(...pa)) return false;
  }
  return true;
}
const jobs = [];
let shots = 0; const t0 = Date.now();
for (const [li, s] of LEVELS.entries()) {
  const W = VW * s, H = VH * s, bx = Math.ceil(W / BLOCK), by = Math.ceil(H / BLOCK), U = BLOCK / s;
  quadCur = li > OUTER_MAX ? quadCore : quadAll;
  const blocks = [];
  for (let y = 0; y < by; y++) for (let x = 0; x < bx; x++) {
    if (RECTS && !RECTS.some(r => x * U < r[2] && (x + 1) * U > r[0] && y * U < r[3] && (y + 1) * U > r[1])) continue;
    if (li > 0 && !(hits(x * U - 40, y * U - 40, (x + 1) * U + 40, (y + 1) * U + 40) || (li > OUTER_MAX && quadsExtra.some(q => hits(x * U - 40, y * U - 40, (x + 1) * U + 40, (y + 1) * U + 40, q))))) continue;
    blocks.push([x, y]);
  }
  // Bereiche: Szene nur mit den Teilen aufbauen, die in die Blöcke dieses Bereichs ragen (sonst ist das SVG der ganzen Stadt zu schwer)
  const RS = U, groups = new Map();
  blocks.forEach(([x, y]) => { const k = Math.floor((x + .5) * U / RS) + '_' + Math.floor((y + .5) * U / RS); if (!groups.has(k)) groups.set(k, []); groups.get(k).push([x, y]); });
  for (const g of groups.values()) {
    const r = [Math.min(...g.map(b => b[0])) * U - 4, Math.min(...g.map(b => b[1])) * U - 4, (Math.max(...g.map(b => b[0])) + 1) * U + 4, (Math.max(...g.map(b => b[1])) + 1) * U + 4];
    await freshPage();
    await page.evaluate(r => SCENE.region(r), r);
    for (const [x, y] of g) {
      await page.evaluate(([x0, y0, s]) => SCENE.view(x0, y0, s), [x * U, y * U, s]);
      await page.waitForTimeout(80);
      const f = `${tmp}/L${li}_${x}_${y}.png`;
      await page.screenshot({ path: f, timeout: 300000 });
      jobs.push({ li, x, y, f }); shots++;
    }
  }
  console.log('Stufe', li, 'Maßstab', s, 'Blöcke', blocks.length, 'Bereiche', groups.size, 'Minuten', ((Date.now() - t0) / 60000).toFixed(1));
}
await browser.close();
const qx = quadAll.map(p => p[0]), qy = quadAll.map(p => p[1]), cx = quadCore.map(p => p[0]), cy = quadCore.map(p => p[1]);
const box = [Math.max(0, Math.min(...qx) - 40), Math.max(0, Math.min(...qy) - 80), Math.min(VW, Math.max(...qx) + 40), Math.min(VH, Math.max(...qy) + 40)].map(v => +v.toFixed(1));   // Datengebiet im Weltbild (für Start-/Gesamtansicht)
const core = [Math.min(...cx), Math.min(...cy), Math.max(...cx), Math.max(...cy)].map(v => +v.toFixed(1));   // Innenstadt: hier gibt es alle Stufen
const meta = { box, core, outerMax: OUTER_MAX, VW: +VW.toFixed(2), VH: +VH.toFixed(2), tile: 256, block: BLOCK, dpr: DPR, levels: LEVELS.map(s => ({ s, w: Math.ceil(VW * s), h: Math.ceil(VH * s) })), labels };
writeFileSync(`${tmp}/meta.json`, JSON.stringify(meta));
execFileSync('python3', ['-I', path.join(root, 'tools/cut-tiles.py'), tmp, path.join(root, 'tiles'), ...(RECTS ? ['--merge'] : [])], { stdio: 'inherit' });
