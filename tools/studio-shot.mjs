// Screenshot einer Detailkarte (Studio) im Handy-Format: node tools/studio-shot.mjs <name>[,<name2>] [Breite=390] [Höhe=760]
// Erwartet laufenden Testserver (python3 tools/serve.py . 8770). Ausgabe: /tmp/studio_<name>.png
import { chromium } from 'playwright';
const names = (process.argv[2] || '').split(','), W = +(process.argv[3] || 390), Hh = +(process.argv[4] || 760);
const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await b.newPage({ viewport: { width: W, height: Hh }, deviceScaleFactor: 2 });
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/favicon|404/.test(m.text())) errs.push(m.text()); });
for (const n of names) {
  await p.goto(`http://127.0.0.1:8770/studio.html?lm=${n}&embed&sofort`); await p.waitForTimeout(1800);
  await p.screenshot({ path: `/tmp/studio_${n}.png` });
  console.log(n, await p.evaluate(() => { const r = document.querySelector('svg').getBoundingClientRect(); return { svgBreite: Math.round(r.width), fensterBreite: innerWidth }; }));
}
console.log('Fehler', errs); await b.close();
