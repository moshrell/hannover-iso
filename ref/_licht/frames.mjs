// Kontrollbilder des Ablaufs: node ref/_licht/frames.mjs <name> → /tmp/licht_<name>_NN.png (Einschalten: 1,5 3 4,5 6 9 s; Ausschalten: 0,6 1,2 1,8 2,6 4 s)
import { chromium } from 'playwright';
const n = process.argv[2], W = +(process.argv[3] || 390), Hh = +(process.argv[4] || 760);
const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await b.newPage({ viewport: { width: W, height: Hh }, deviceScaleFactor: 1 });
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(`http://127.0.0.1:8770/studio.html?lm=${n}&embed`, { waitUntil: 'load' });
let i = 0, last = 0; const shot = async t => { await p.waitForTimeout(Math.max(0, t - last)); last = t; await p.screenshot({ path: `/tmp/licht_${n}_${String(++i).padStart(2, '0')}.png` }); };
await p.waitForTimeout(700); last = 0;
for (const t of [1500, 3000, 4500, 6000, 9000]) await shot(t);
await p.click('#b-light'); last = 0;
for (const t of [600, 1200, 1800, 2600, 4000]) await shot(t);
console.log(n, 'Fehler', errs); await b.close();
