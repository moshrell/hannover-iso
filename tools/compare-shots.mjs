// Zwei gleich gerahmte Bilder eines Wahrzeichens für den Nacht/Abendlicht-Vergleich im Abschnitt „Über das Projekt“:
// img/vergleich-nacht.webp, img/vergleich-licht.webp. Aufruf: node tools/compare-shots.mjs [name=neuesRathaus]; danach python3 tools/compare-webp.py
import { chromium } from 'playwright';
const n = process.argv[2] || 'neuesRathaus';
const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const p = await (await b.newContext({ viewport: { width: 1100, height: 1000 }, deviceScaleFactor: 1, bypassCSP: true })).newPage();
await p.goto(`http://127.0.0.1:8770/studio.html?lm=${n}&embed&sofort`);
await p.addStyleTag({ content: '.side-col{display:none!important} html.embed .wrap{padding:0!important;min-height:0!important} html.embed .stage{width:min(100%, calc(1000px * var(--ar)))!important} .stage svg{transition:none!important}' });
await p.waitForTimeout(1200);
await p.locator('#stage').screenshot({ path: '/tmp/vergleich-licht.png' });
await p.evaluate(() => document.getElementById('b-light').click()); await p.waitForTimeout(600);
await p.locator('#stage').screenshot({ path: '/tmp/vergleich-nacht.png' });
await b.close(); console.log('ok');
