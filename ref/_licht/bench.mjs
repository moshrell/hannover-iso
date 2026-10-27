// Messung der Lichtanimation in der Karte: node ref/_licht/bench.mjs <name,name2> [cpu=4] [Breite=390] [Höhe=760]
// Erwartet laufenden Testserver (sh tools/setup-cloud.sh). Phasen: AN (Einschalten), RUHE (Dauerzustand), AUS (Ausschalten).
import { chromium } from 'playwright';
const names = (process.argv[2] || '').split(','), cpu = +(process.argv[3] || 4), W = +(process.argv[4] || 390), Hh = +(process.argv[5] || 760);
const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const rec = () => new Promise(res => { const t = []; let last = performance.now(); const t0 = last; (function f(n) { t.push(n - last); last = n; if (n - t0 < window.__ms) requestAnimationFrame(f); else res(t); })(performance.now()); });
for (const n of names) {
  const ctx = await b.newContext({ viewport: { width: W, height: Hh }, deviceScaleFactor: 2, bypassCSP: !!process.env.EXTRA_CSS });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  await p.addInitScript(`window.__rec = ${rec.toString()};`);
  await p.goto(`http://127.0.0.1:${process.env.PORT || 8770}/studio.html?lm=${n}&embed`, { waitUntil: 'load' });
  if (process.env.EXTRA_CSS) await p.addStyleTag({ content: process.env.EXTRA_CSS });
  const info = await p.evaluate(() => ({ ts: getComputedStyle(document.querySelector("svg")).getPropertyValue("--ts"), nodes: document.querySelectorAll('svg *').length, wn: document.querySelectorAll('.wn').length, wnPaths: [...document.querySelectorAll('.wn')].filter(e => e.tagName === 'path' && (e.getAttribute('d').match(/M/g) || []).length > 3).length }));
  const phase = async (ms, action) => { await p.evaluate(m => { window.__ms = m; }, ms); const pr = p.evaluate(() => window.__rec()); if (action) await action(); const t = await pr; return t; };
  const stat = t => { t = t.slice(2); const sorted = [...t].sort((a, c) => a - c), tot = t.reduce((a, c) => a + c, 0); return { fps: +(t.length / tot * 1000).toFixed(1), p95ms: +sorted[Math.floor(sorted.length * .95)].toFixed(0), maxms: +sorted[sorted.length - 1].toFixed(0), langsam: t.filter(x => x > 50).length }; };
  const an = await phase(9000);                       // Demo schaltet nach 700 ms ein
  const ruhe = await phase(5000);
  const aus = await phase(7000, () => p.click('#b-light'));
  console.log(n, `cpu×${cpu}`, JSON.stringify(info), '\n  AN  ', JSON.stringify(stat(an)), '\n  RUHE', JSON.stringify(stat(ruhe)), '\n  AUS ', JSON.stringify(stat(aus)), errs.length ? errs : '');
  await ctx.close();
}
await b.close();
