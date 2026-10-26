/* studio.js — ein Wahrzeichen einzeln, groß, mit Abendlicht-Ablauf (Laternen → Fenster etagenweise → Fassade von unten → Laterne).
   Aufruf: studio.html?lm=opernhaus  (…&embed in der Karte, …&sofort = Licht sofort an) */
(() => {
  'use strict';
  const { f2 } = ISO;
  const q = new URLSearchParams(location.search), name = q.get('lm') || 'opernhaus';
  const FACTS = {};
  Object.entries(window.LMETA || {}).forEach(([n, m]) => { FACTS[n] = m.studio || m.fact || ''; });
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
    <filter id="wglow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation=".9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    <radialGradient id="gfade" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#161B18"/><stop offset=".55" stop-color="#101412"/><stop offset="1" stop-color="#0A0E0C" stop-opacity="0"/></radialGradient>
    <linearGradient id="hallglow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7A3" stop-opacity="0"/><stop offset=".5" stop-color="#FFE7A3" stop-opacity=".35"/><stop offset="1" stop-color="#FFE7A3" stop-opacity="0"/></linearGradient>
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
  // Rahmen um die Gebäudeteile (ohne die große Bodenplatte), damit das Gebäude den Bildschirm füllt; die Platte läuft weich aus
  const pb = [...svg.querySelectorAll('.bld > .part')].map(el => el.getBBox());
  const bx0 = Math.min(...pb.map(b => b.x)), by0 = Math.min(...pb.map(b => b.y)), bx1 = Math.max(...pb.map(b => b.x + b.width)), by1 = Math.max(...pb.map(b => b.y + b.height));
  const bb = { x: bx0, y: by0, width: bx1 - bx0, height: by1 - by0 }, pad = Math.max(3, Math.max(bb.width, bb.height) * .09);
  const vb = [bb.x - pad, bb.y - pad * 2.2, bb.width + pad * 2, bb.height + pad * 3.2];
  svg.setAttribute('viewBox', vb.map(f2).join(' '));
  stage.style.setProperty('--ar', (vb[2] / vb[3]).toFixed(4));
  // Sterne
  let sd = 5; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  let st = ''; for (let i = 0; i < 40; i++) st += `<circle class="star" cx="${f2(vb[0] + rnd() * vb[2])}" cy="${f2(vb[1] + rnd() * vb[3] * .3)}" r="${f2(.15 + rnd() * .35)}" opacity="${f2(.15 + rnd() * .5)}"/>`;
  svg.querySelector('#all').insertAdjacentHTML('afterbegin', st);
  ISO.clock(svg); setInterval(() => ISO.clock(svg), 20000);

  /* ---------- Licht ---------- */
  const T = { win0: 1.2, floor: 1.1, winJit: 2.4, flood0: 6.2, sweep: 4.6, crown: 11.6 };
  const OFF = { crown: 0, sweep: 2.6, flood0: .3, win0: 2.4, floor: .7, winJit: .9 };
  const SPEED = .55;
  const setD = (el, d) => el.style.setProperty('--d', `${(d * SPEED).toFixed(2)}s`);
  let prep = null;
  function prepare() {
    const inClk = el => !!el.closest('.clk');
    const walls = [...svg.querySelectorAll('.bld .wsh, .bld .wsl, .bld .st, .bld .tl, .bld .cu, .bld .bk, .bld .sl, .bld .gz, .bld .lv, .bld .dt, .bld .mul, .bld .gb, .bld .rs, .bld .brz, .bld .gl, .bld .pl, .bld .kc, .bld .kz, .bld .kr, .bld .iron, .bld .glb')].filter(el => !inClk(el));
    const rects = walls.map(el => el.getBoundingClientRect());
    const top = Math.min(...rects.map(q => q.top)), base = Math.max(...rects.map(q => q.bottom)), span = Math.max(1, base - top);
    let s2 = 11; const r2 = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647;
    return {
      walls: walls.map((el, i) => [el, Math.min(1, Math.max(0, (base - rects[i].bottom) / span))]),
      clocks: [...svg.querySelectorAll('.clk *')],
      wins: [...svg.querySelectorAll('.wn')].filter(el => !inClk(el)).map(el => [el, +el.dataset.f || 0, r2()]),
      // ein Dutzend heller Fenster flackert im Ruhezustand gelegentlich (kein Dauer-Blinken: nur kurze Dips alle paar Sekunden)
      twinkle: [...svg.querySelectorAll('.wn:not(.off)')].filter(el => !inClk(el)).filter((_, i) => i % 29 === 7).slice(0, 14),
      stars: [...svg.querySelectorAll('.star')],
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
    life(on);
    read.textContent = on ? 'Abendlicht · Fenster, Fassade' : 'Nacht';
  }
  /* Ruhezustand: nach dem Einschalten atmen Laternenkrone und Sterne, einzelne Fenster flackern kurz (element.style, keine Inline-Stile im Markup) */
  let lifeT = 0;
  function life(on) {
    clearTimeout(lifeT);
    const set = (els, f) => els.forEach((el, i) => { el.style.animation = on ? f(i) : ''; });
    if (!on) { set(prep.twinkle, () => ''); set(prep.crown, () => ''); set(prep.stars, () => ''); return; }
    const wait = svg.classList.contains('instant') ? 0 : (T.crown + 2) * SPEED * 1000;
    lifeT = setTimeout(() => {
      set(prep.twinkle, i => `wtw ${9 + (i * 3) % 7}s linear ${(i * 1.7) % 6}s infinite`);
      set(prep.crown.filter(el => el.classList.contains('lant-h')), () => 'breathe 5s ease-in-out infinite alternate');
      set(prep.stars, i => `star ${3 + (i % 5)}s ease-in-out ${(i * .7) % 4}s infinite alternate`);
    }, wait);
  }
  let demo = [];
  const setLit = v => { state.lit = v; bLight.setAttribute('aria-pressed', v); applyLight(); };
  bLight.addEventListener('click', () => { demo.forEach(clearTimeout); demo = []; setLit(!state.lit); });
  read.textContent = 'Nacht';
  if (q.has('sofort')) { svg.classList.add('instant'); setLit(true); }
  else demo = [setTimeout(() => setLit(true), 700)];   // bleibt an; der Knopf schaltet zurück auf Nacht
})();
