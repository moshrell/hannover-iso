// Zeigt ein Gebäude in der Karte (echte Szene, ohne die Kacheln neu zu rendern): node tools/map-crop.mjs <name> [Maßstab=1.5] [Ausgabe=/tmp/map_<name>.png]
// Vorher: python3 tools/build-landmarks.py && (cd data && python3 prep.py osm.json.gz mitte.js)   (tools/preview.sh macht beides)
import { chromium } from 'playwright';
const [, , name, s = '1.5', out = `/tmp/map_${process.argv[2]}.png`] = process.argv, S = +s;
const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await b.newPage({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
p.on('pageerror', e => console.error('pageerror', e.message));
await p.goto('file://' + process.cwd() + '/tools/render.html');
await p.waitForFunction(() => window.SCENE && window.SCENE.ready, null, { timeout: 150000 });
const lab = await p.evaluate(n => SCENE.labels.find(l => l.name === n), name);
if (!lab) { console.error('Gebäude nicht in der Szene – meta/<name>.json (osm oder point) prüfen'); process.exit(1); }
const vx = lab.x - 512 / S, vy = lab.y + 80 - 384 / S;
await p.evaluate(r => SCENE.region(r), [vx - 40, vy - 40, vx + 1024 / S + 40, vy + 768 / S + 40]);   // ohne region() bleibt das Bild leer
await p.evaluate(([x, y, s]) => SCENE.view(x, y, s), [vx, vy, S]);
// Punkt der Karte (wie in karte.js: 12 px über der Position) als Kontrolle einzeichnen
await p.evaluate(([x, y]) => { const d = document.createElement('div'); d.style.cssText = `position:fixed;left:${x - 6}px;top:${y - 18}px;width:12px;height:12px;border-radius:50%;background:#FFE7A3;box-shadow:0 0 0 3px rgba(10,14,12,.65),0 0 14px 3px rgba(255,231,163,.7);z-index:9`; document.body.appendChild(d); }, [(lab.x - vx) * S, (lab.y - vy) * S]);
await p.waitForTimeout(400); await p.screenshot({ path: out }); await b.close(); console.log(out, lab);
