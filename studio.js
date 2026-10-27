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
  // Drehung nur in der Karte-Detailansicht: meta `card_phi` (Grad) stellt die schönste Seite nach vorn; auf der Karte bleibt die echte Lage (phi aus OSM / `face`)
  const phi = (+((window.LMETA || {})[name] || {}).card_phi || 0) * Math.PI / 180;
  const K = ISO.kernel({ lcx: def.lc[0], lcy: def.lc[1], phi });
  const fps = def.mods.map(m => m.fp), x0 = Math.min(...fps.map(f => f[0])) - 10, y0 = Math.min(...fps.map(f => f[1])) - 10, x1 = Math.max(...fps.map(f => f[2])) + 10, y1 = Math.max(...fps.map(f => f[3])) + 10;
  const r = ISO.drawLandmark(name, { lcx: def.lc[0], lcy: def.lc[1], phi });
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
  /* Der Ablauf wird von JS getaktet statt von tausend CSS-Verzögerungen: Jedes Element wird erst zu seinem Zeitpunkt umgeschaltet
     (dann übernimmt die CSS-Transition den weichen Übergang). So warten nie tausende Übergänge gleichzeitig, und nur ein paar
     Dutzend Elemente pro Bild ändern sich. Der Zielzustand wird einmal aus dem Stylesheet gelesen (kein zweiter Farbsatz). */
  const T = { win0: 1.2, floor: 1.1, winJit: 2.4, flood0: 6.2, sweep: 4.6, crown: 11.6 };
  // Ausschalten: Fenster gehen mit der Fassade aus (gleiche Welle oben → unten), nicht erst danach
  const OFF = { crown: 0, sweep: 4.2, flood0: .3, winJit: .4 };
  const SPEED = .55, STATE = ['lamps', 'win', 'lit', 'crown'], PROPS = ['fill', 'stroke', 'opacity'];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let prep = null, raf = 0;
  function prepare() {
    const inClk = el => !!el.closest('.clk');
    const walls = [...svg.querySelectorAll('.bld .wsh, .bld .wsl, .bld .st, .bld .tl, .bld .cu, .bld .bk, .bld .sl, .bld .gz, .bld .lv, .bld .dt, .bld .mul, .bld .gb, .bld .rs, .bld .brz, .bld .gl, .bld .pl, .bld .kc, .bld .kz, .bld .kr, .bld .iron, .bld .glb')].filter(el => !inClk(el));
    const wins = [...svg.querySelectorAll('.wn')].filter(el => !inClk(el));
    const wr = walls.map(el => el.getBoundingClientRect()), ww = wins.map(el => el.getBoundingClientRect());
    const top = Math.min(...wr.map(q => q.top)), base = Math.max(...wr.map(q => q.bottom)), span = Math.max(1, base - top);
    const rel = r => Math.min(1, Math.max(0, (base - r.bottom) / span));
    let s2 = 11; const r2 = () => (s2 = (s2 * 16807) % 2147483647) / 2147483647;
    const when = new Map();   // Element → Zeitpunkt (Einheiten des Ablaufs) für Ein- und Ausschalten
    walls.forEach((el, i) => { const h = rel(wr[i]); when.set(el, { on: T.flood0 + h * T.sweep, off: OFF.flood0 + (1 - h) * OFF.sweep }); });
    wins.forEach((el, i) => { const h = rel(ww[i]), f = +el.dataset.f || 0, q = r2(), q3 = r2(); when.set(el, { on: T.win0 + f * T.floor + q * T.winJit, off: OFF.flood0 + (1 - h) * OFF.sweep + q * OFF.winJit, flick: q3 < .3 }); });
    svg.querySelectorAll('.flood').forEach(el => when.set(el, { on: T.flood0 + .4, off: OFF.flood0 }));
    svg.querySelectorAll('.clk *').forEach(el => when.set(el, { on: T.flood0 + .8 * T.sweep, off: OFF.flood0 + .2 * OFF.sweep }));
    svg.querySelectorAll('.lant, .lant-h').forEach(el => when.set(el, { on: T.crown, off: OFF.crown }));
    return { when, items: [], stars: [...svg.querySelectorAll('.star')], crown: [...svg.querySelectorAll('.lant-h')] };
  }
  /* Beide Zustände einmal aus dem Stylesheet lesen (Übergänge dabei aus). Als Element des Ablaufs zählt jedes, dessen Farbe/Deckkraft sich
     zwischen Nacht und Licht wirklich ändert; was nicht in der Zeitliste steht, geht gleich zu Beginn um. */
  function probe() {
    const was = STATE.filter(c => svg.classList.contains(c)), inst = svg.classList.contains('instant');
    svg.classList.add('instant'); STATE.forEach(c => svg.classList.remove(c));
    const els = [...svg.querySelectorAll('*')].filter(el => !el.closest('defs') && !el.classList.contains('star'));
    const read = () => els.map(el => { const cs = getComputedStyle(el); return PROPS.map(k => cs.getPropertyValue(k)); });
    const dark = read(); STATE.forEach(c => svg.classList.add(c)); const bright = read();
    STATE.forEach(c => { if (!was.includes(c)) svg.classList.remove(c); });
    svg.getBoundingClientRect(); if (!inst) svg.classList.remove('instant');
    els.forEach((el, i) => {
      const diff = PROPS.map((_, k) => k).filter(k => dark[i][k] !== bright[i][k]);
      if (diff.length) prep.items.push({ ...(prep.when.get(el) || { on: T.flood0, off: OFF.flood0 }), el, offV: dark[i], onV: bright[i], diff, lit: false });
    });
  }
  const put = (it, v) => it.diff.forEach(k => it.el.style.setProperty(PROPS[k], v[k]));       // Wert festhalten bzw. umschalten (Transition läuft)
  const free = it => it.diff.forEach(k => it.el.style.removeProperty(PROPS[k]));            // Wert dem Stylesheet überlassen
  svg.addEventListener('animationend', e => { if (e.animationName === 'wflick') e.target.style.animation = ''; });
  const state = { lit: false }, bLight = document.getElementById('b-light'), read = document.getElementById('read');
  /* Vorbereiten (einmal, vor dem ersten Einschalten): Elemente sammeln, Zielwerte lesen und den Nacht-Zustand festhalten.
     Das ändert nichts am Bild; danach färbt der Klassenwechsel am svg nichts mehr um, jedes Element wird einzeln freigegeben. */
  function warm() {
    if (prep) return;
    prep = prepare(); probe();
    if (!svg.classList.contains('instant') && !calm) { prep.items.forEach(it => put(it, it.offV)); svg.style.setProperty('--ts', Math.max(.45, Math.min(1, 1500 / prep.items.length)).toFixed(2)); }
  }
  function applyLight() {
    warm();
    const on = state.lit, quick = svg.classList.contains('instant') || calm;
    cancelAnimationFrame(raf); raf = 0;
    if (quick) { prep.items.forEach(it => { free(it); it.lit = on; }); STATE.forEach(c => svg.classList.toggle(c, on)); life(on, true); finish(on); return; }
    // Die Klassen (lit, win, …) gehen beim ersten Einschalten an und bleiben; Aussehen und Zeitpunkt bestimmt je Element der festgehaltene Wert:
    // Einschalten = Wert freigeben (das Stylesheet gilt), Ausschalten = Wert auf den Nachtwert setzen; die CSS-Transition macht den weichen Übergang.
    if (on) STATE.forEach(c => svg.classList.add(c));
    life(on, false);
    const q = prep.items.filter(it => it.lit !== on).map(it => [(on ? it.on : it.off) * SPEED * 1000, it]).sort((a, b) => a[0] - b[0]), t0 = performance.now();
    let n = 0;
    const tick = now => {
      const t = now - t0;
      while (n < q.length && q[n][0] <= t) {
        const it = q[n++][1];
        if (on) { free(it); if (it.flick) it.el.style.animation = 'wflick .8s linear'; } else put(it, it.offV);
        it.lit = on;
      }
      if (n < q.length) raf = requestAnimationFrame(tick);
      else { raf = 0; life(on, true); }
    };
    raf = requestAnimationFrame(tick);
    finish(on);
  }
  const finish = on => { read.textContent = on ? 'Abendlicht · Fenster, Fassade' : 'Nacht'; };
  /* Ruhezustand: Laternenkrone und Sterne atmen; ein paar Prozent der Fenster gehen immer wieder weich aus und wieder an. */
  const NS = 'http://www.w3.org/2000/svg', rr = (a, b) => a + Math.random() * (b - a);
  let pool = null, ovs = [], gen = 0;
  function life(on, settled) {
    const set = (els, f) => els.forEach((el, i) => { el.style.animation = on && settled && !calm ? f(i) : ''; });
    set(prep.crown, () => 'breathe 5s ease-in-out infinite alternate');
    set(prep.stars, i => `star ${3 + (i % 5)}s ease-in-out ${(i * .7) % 4}s infinite alternate`);
    if (on && settled && !calm) startChurn(); else if (!on) stopChurn();
  }
  /* Fenster-Quelle: alle Teilpfade (Fenster) der .wn-Elemente. In zusammengefassten Pfaden (ein <path> je Klasse) lässt sich ein Fenster nicht
     einzeln dimmen; deshalb liegt über dem ausgewählten Fenster ein kleines dunkles Deckfenster (Pfad aus denselben Koordinaten), das ein-/ausblendet. */
  function buildPool() {
    const src = []; let n = 0;
    svg.querySelectorAll('.wn:not(.off):not(.ov)').forEach(el => {
      if (el.closest('.clk')) return;
      let d = el.getAttribute('d');
      if (!d) { if (el.tagName !== 'rect') return; const [x, y, w, h] = ['x', 'y', 'width', 'height'].map(k => +el.getAttribute(k)); d = `M${x} ${y}h${w}v${h}h${-w}z`; }
      const subs = d.split(/(?=M)/).filter(Boolean); src.push({ el, subs, i0: n }); n += subs.length;
    });
    return { src, n };
  }
  function startChurn() {
    if (ovs.length) return;
    pool = pool || buildPool();
    const W = pool.n; if (W < 8) return;
    const CAP = 96, want = W * .07, m = Math.max(1, Math.min(6, Math.ceil(want / CAP))), K = Math.max(3, Math.min(CAP, Math.round(want / m))), my = ++gen;
    const pick = () => { let i = Math.floor(Math.random() * W), lo = 0, hi = pool.src.length - 1; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (pool.src[mid].i0 <= i) lo = mid; else hi = mid - 1; } const s = pool.src[lo], a = Math.min(i - s.i0, Math.max(0, s.subs.length - m)); return [s, a]; };
    for (let k = 0; k < K; k++) {
      const el = document.createElementNS(NS, 'path'); el.setAttribute('class', 'wn off ov'); el.style.opacity = '0';
      const o = { el, t: 0 }; ovs.push(o);
      const wait = () => { o.t = setTimeout(dark, rr(1, 10) * 1000); };
      const dark = () => {
        if (my !== gen) return;
        const [s, a] = pick(); el.setAttribute('d', s.subs.slice(a, a + m).join('')); s.el.after(el);
        o.t = setTimeout(() => { if (my !== gen) return; el.style.opacity = '1'; o.t = setTimeout(() => { if (my !== gen) return; el.style.opacity = '0'; o.t = setTimeout(wait, 1800); }, rr(2.5, 9) * 1000); }, 80);
      };
      o.t = setTimeout(dark, rr(.3, 10) * 1000);
    }
  }
  function stopChurn() {
    gen++; const old = ovs; ovs = [];
    old.forEach(o => { clearTimeout(o.t); o.el.style.opacity = '0'; });
    setTimeout(() => old.forEach(o => o.el.remove()), 2000);
  }
  let demo = [];
  const setLit = v => { state.lit = v; bLight.setAttribute('aria-pressed', v); applyLight(); };
  bLight.addEventListener('click', () => { demo.forEach(clearTimeout); demo = []; setLit(!state.lit); });
  read.textContent = 'Nacht';
  setTimeout(warm, 120);   // vorab lesen, damit das Einschalten ohne Ruckler startet
  if (q.has('sofort')) { svg.classList.add('instant'); setLit(true); }
  else demo = [setTimeout(() => setLit(true), 700)];   // bleibt an; der Knopf schaltet zurück auf Nacht
})();
