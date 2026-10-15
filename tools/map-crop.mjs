// Zeigt ein Gebäude in der Karte (echte Szene, ohne die Kacheln neu zu rendern): node tools/map-crop.mjs <name> [Maßstab=1.5] [Ausgabe=/tmp/map_<name>.png]
// Vorher: python3 tools/build-landmarks.py && (cd data && python3 prep.py osm.json.gz mitte.js)   (tools/preview.sh macht beides)
import { chromium } from 'playwright';
const [, , name, s = '1.5', out = `/tmp/map_${process.argv[2]}.png`] = process.argv, S = +s;
const b = await chromium.launch({ executablePath: process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport: { width: 1024, height: 768 }, deviceScaleFactor: 1 });
p.on('pageerror', e => console.error('pageerror', e.message));
await p.goto('file://' + process.cwd() + '/tools/render.html');
await p.waitForFunction(() => window.SCENE && window.SCENE.ready, null, { timeout: 150000 });
const lab = await p.evaluate(n => SCENE.labels.find(l => l.name === n), name);
if (!lab) { console.error('Gebäude nicht in der Szene – meta/<name>.json (osm oder point) prüfen'); process.exit(1); }
await p.evaluate(([x, y, s]) => SCENE.view(x, y, s), [lab.x - 512 / S, lab.y + 80 - 384 / S, S]);
await p.waitForTimeout(400); await p.screenshot({ path: out }); await b.close(); console.log(out, lab);
