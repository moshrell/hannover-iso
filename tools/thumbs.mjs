// Vorschaubilder der Wahrzeichen für die Auswahl unter der Karte: landmarks/thumbs/<name>.webp (Abendlicht an, ohne Bedienung).
// Aufruf: node tools/thumbs.mjs [name,name…]   (ohne Namen: alle aus landmarks/meta.js). Erwartet den Testserver (sh tools/setup-cloud.sh).
// Danach: python3 tools/thumbs-webp.py (PNG → WebP, längste Seite 560 px).
import { chromium } from 'playwright';
import fs from 'fs';
const meta = JSON.parse(fs.readFileSync('landmarks/meta.js', 'utf8').replace(/^[\s\S]*?window\.LMETA=/, '').replace(/;\s*$/, ''));
const names = process.argv[2] ? process.argv[2].split(',') : Object.keys(meta);
fs.mkdirSync('/tmp/thumbs', { recursive: true });
const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await (await b.newContext({ viewport: { width: 700, height: 700 }, deviceScaleFactor: 1, bypassCSP: true })).newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/favicon|404/.test(m.text())) errs.push(m.text()); });
for (const n of names) {
  await p.goto(`http://127.0.0.1:8770/studio.html?lm=${n}&embed&sofort`);
  await p.addStyleTag({ content: '.side-col{display:none!important} html.embed .wrap{padding:0!important;min-height:0!important} html.embed .stage{width:min(100%, calc(700px * var(--ar)))!important}' });
  await p.waitForTimeout(900);
  await p.locator('#stage').screenshot({ path: `/tmp/thumbs/${n}.png` });
  console.log(n);
}
console.log('Fehler', errs); await b.close();
