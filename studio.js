/* studio.js — ein Wahrzeichen einzeln, groß, mit Abendlicht-Ablauf (Laternen → Fenster etagenweise → Fassade von unten → Laterne).
   Aufruf: studio.html?lm=opernhaus  (…&embed in der Karte, …&sofort = Licht sofort an) */
(() => {
  'use strict';
  const { f2 } = ISO;
  const q = new URLSearchParams(location.search), name = q.get('lm') || 'opernhaus';
  const FACTS = {
    opernhaus: 'Staatsoper Hannover, erbaut 1845–1852 von Georg Ludwig Friedrich Laves; Vorhalle mit Terrasse, Giebel mit Figurengruppe.',
    hauptbahnhof: 'Empfangsgebäude von 1879 in gelbem Backstein mit roten Bändern; davor das Ernst-August-Denkmal, Treffpunkt „unterm Schwanz“.',
    anzeiger: 'Expressionistisches Hochhaus von Fritz Höger (1928) aus dunklem Klinker; unter der grünen Kuppel war einst ein Planetarium, heute ein Kino.',
    nordlb: 'Bankgebäude von Behnisch, Behnisch & Partner (2002): gläserne Randbebauung um einen Hof, darüber gestapelte, versetzte Glaskörper.',
    landesmuseum: 'Niedersächsisches Landesmuseum (1897–1902) am Maschpark: Natur, Kunst und Kulturen unter einem Dach.',
    kestner: 'Museum August Kestner: Antike, Münzen und Design; die Wabenfassade aus Glasbausteinen prägt den Platz der Menschenrechte.',
    wangenheim: 'Klassizistisches Palais von Laves (1829–1833), zeitweise Rathaus, heute Sitz des Wirtschaftsministeriums.',
    kreuzkirche: 'Älteste Kirche der Altstadt (geweiht 1333), Backsteingotik mit hohem, grünem Turmhelm.',
    neustaedter: 'Barocke Hof- und Stadtkirche St. Johannis (1666–1670); hier ist Gottfried Wilhelm Leibniz begraben.',
    beginenturm: 'Rest der mittelalterlichen Stadtbefestigung (um 1357), heute Teil des Historischen Museums.',
    leibnizhaus: 'Renaissance-Bürgerhaus, in dem Leibniz bis zu seinem Tod 1716 lebte; die Fassade wurde 1983 am Holzmarkt wiederaufgebaut.',
    waterloo: 'Waterloosäule von Laves (1832), 46 m hoch, zur Erinnerung an die Schlacht bei Waterloo; oben die Siegesgöttin Viktoria.',
    kroepcke: 'Die Kröpcke-Uhr – Hannovers Treffpunkt Nummer eins: „Wir treffen uns unter der Uhr.“',
    aegidienkirche: 'Gotische Kirche, 1943 zerstört und seit 1952 Mahnmal für die Opfer von Krieg und Gewalt; im Turm die Friedensglocke aus Hiroshima.',
  };
  if (!ISO.LM[name]) { console.error('studio: unbekanntes Wahrzeichen', name); return; }
  const def = ISO.LM[name](ISO.H);
  document.getElementById('title').textContent = def.label;
  document.getElementById('fact').textContent = FACTS[name] || '';
  document.title = def.label + ' · Hannover';

  /* ---------- Zeichnen ---------- */
  const K = ISO.kernel({ lcx: def.lc[0], lcy: def.lc[1] });
  const fps = def.mods.map(m => m.fp), x0 = Math.min(...fps.map(f => f[0])) - 10, y0 = Math.min(...fps.map(f => f[1])) - 10, x1 = Math.max(...fps.map(f => f[2])) + 10, y1 = Math.max(...fps.map(f => f[3])) + 10;
  const r = ISO.drawLandmark(name, { lcx: def.lc[0], lcy: def.lc[1] });
  let s = `<defs>
    <filter id="wglow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.1" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    <radialGradient id="gfade" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#161B18"/><stop offset=".55" stop-color="#101412"/><stop offset="1" stop-color="#0A0E0C" stop-opacity="0"/></radialGradient>
    <radialGradient id="aura" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFE7A3" stop-opacity=".14"/><stop offset="1" stop-color="#FFE7A3" stop-opacity="0"/></radialGradient>
  </defs><g id="all">`;
  const g = [[x0 - 30, y0 - 30, 0], [x1 + 30, y0 - 30, 0], [x1 + 30, y1 + 30, 0], [x0 - 30, y1 + 30, 0]];
  s += `<path fill="url(#gfade)" d="${K.path(g)}Z"/><path class="pave" d="${K.path([[x0, y0, 0], [x1, y0, 0], [x1, y1, 0], [x0, y1, 0]])}Z"/>`;
  const ac = K.P((x0 + x1) / 2, (y0 + y1) / 2, def.h * .45);
  s += `<g class="flood"><ellipse cx="${f2(ac[0])}" cy="${f2(ac[1])}" rx="${f2((x1 - x0 + y1 - y0) * .55)}" ry="${f2(def.h * .9 + 20)}" fill="url(#aura)"/></g>`;
  s += `<g class="bld" data-b="${name}" data-o="0">${r.svg}</g></g>`;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'rh'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Isometrische Zeichnung: ' + def.label);
  svg.innerHTML = s;
  const stage = document.getElementById('stage');
  stage.appendChild(svg);
  // Rahmen eng um die Zeichnung (Gebäude + etwas Boden), Seitenverhältnis vor dem ersten Bild
  const bb = svg.querySelector('.bld').getBBox(), pad = Math.max(2.5, Math.max(bb.width, bb.height) * .07);
  const vb = [bb.x - pad, bb.y - pad * 2.2, bb.width + pad * 2, bb.height + pad * 3.2];
  svg.setAttribute('viewBox', vb.map(f2).join(' '));
  stage.style.setProperty('--ar', (vb[2] / vb[3]).toFixed(4));
  // Sterne
  let sd = 5; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  let st = ''; for (let i = 0; i < 40; i++) st += `<circle class="star" cx="${f2(vb[0] + rnd() * vb[2])}" cy="${f2(vb[1] + rnd() * vb[3] * .3)}" r="${f2(.15 + rnd() * .35)}" opacity="${f2(.15 + rnd() * .5)}"/>`;
  svg.querySelector('#all').insertAdjacentHTML('afterbegin', st);
  ISO.clock(svg); setInterval(() => ISO.clock(svg), 20000);

  /* ---------- Licht ---------- */
  const T = { win0: 1.0, floor: .8, winJit: 1.0, flood0: 5.0, sweep: 3.0, crown: 9.2 };
  const OFF = { crown: 0, sweep: 2.6, flood0: .3, win0: 2.4, floor: .7, winJit: .9 };
  const SPEED = .38;
  const setD = (el, d) => el.style.setProperty('--d', `${(d * SPEED).toFixed(2)}s`);
  let prep = null;
  function prepare() {
    const inClk = el => !!el.closest('.clk');
    const walls = [...svg.querySelectorAll('.bld .st, .bld .tl, .bld .cu, .bld .bk, .bld .sl, .bld .gz, .bld .lv, .bld .dt, .bld .mul, .bld .gb, .bld .rs, .bld .brz, .bld .gl')].filter(el => !inClk(el));
    const rects = walls.map(el => el.getBoundingClientRect());
    const top = Math.min(...rects.map(q => q.top)), base = Math.max(...rects.map(q => q.bottom)), span = Math.max(1, base - top);
    let s2 = 11; const r2 = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647;
    return {
      walls: walls.map((el, i) => [el, Math.min(1, Math.max(0, (base - rects[i].bottom) / span))]),
      clocks: [...svg.querySelectorAll('.clk *')],
      wins: [...svg.querySelectorAll('.wn')].filter(el => !inClk(el)).map(el => [el, +el.dataset.f || 0, r2()]),
      crown: [...svg.querySelectorAll('.lant, .lant-h')], flood: [...svg.querySelectorAll('.flood')],
    };
  }
  const state = { lit: false }, bLight = document.getElementById('b-light'), read = document.getElementById('read');
  function applyLight() {
    prep = prep || prepare();
    const on = state.lit;
    prep.wins.forEach(([el, f, q2]) => setD(el, on ? T.win0 + f * T.floor + q2 * T.winJit : OFF.win0 + (4 - f) * OFF.floor + q2 * OFF.winJit));
    prep.walls.forEach(([el, h]) => setD(el, on ? T.flood0 + h * T.sweep : OFF.flood0 + (1 - h) * OFF.sweep));
    prep.flood.forEach(el => setD(el, on ? T.flood0 + .4 : OFF.flood0));
    prep.clocks.forEach(el => setD(el, on ? T.flood0 + .8 * T.sweep : OFF.flood0 + .2 * OFF.sweep));
    prep.crown.forEach(el => setD(el, on ? T.crown : OFF.crown));
    svg.getBoundingClientRect();
    ['lamps', 'win', 'lit', 'crown'].forEach(c => svg.classList.toggle(c, on));
    read.textContent = on ? 'Abendlicht · Fenster, Fassade' : 'Nacht';
  }
  let demo = [];
  const setLit = v => { state.lit = v; bLight.setAttribute('aria-pressed', v); applyLight(); };
  bLight.addEventListener('click', () => { demo.forEach(clearTimeout); demo = []; setLit(!state.lit); });
  read.textContent = 'Nacht';
  if (q.has('sofort')) { svg.classList.add('instant'); setLit(true); }
  else demo = [setTimeout(() => setLit(true), 700), setTimeout(() => setLit(false), 700 + 5600)];
})();
