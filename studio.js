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
  ISO.clock(svg); setInterval(() => { ISO.clock(svg); if (typeof lit !== 'undefined') ISO.clock(lit); }, 20000);

  /* ---------- Licht ---------- */
  /* Zwei fertige Ebenen übereinander: Nacht (unten, unverändert) und Licht (oben, komplett beleuchtet). Beim Einschalten wird die Lichtebene
     von unten nach oben eingeblendet (weiche Kante, CSS-Maske); es ändert sich also nie ein Fenster oder eine Wand einzeln. Das war die Ursache fürs
     Flackern auf Telefonen: Tausende gleichzeitig überblendete Elemente überfordern den Kachelspeicher der GPU (Flächen blitzen auf oder verschwinden). */
  const STATE = ['lamps', 'win', 'lit', 'crown'];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lit = svg.cloneNode(true);
  lit.removeAttribute('role'); lit.setAttribute('aria-hidden', 'true'); lit.setAttribute('class', 'rh lit-layer static ' + STATE.join(' '));
  lit.style.visibility = 'hidden'; stage.appendChild(lit);
  svg.classList.add('static');                                  // keine Einzel-Übergänge: Zustand je Ebene fest
  svg.setAttribute('class', svg.getAttribute('class') + ' night-layer');
  const MASK = 'linear-gradient(to top, #000 0, #000 33.3%, transparent 66.6%)';
  const setMask = on => { ['webkitMaskImage', 'maskImage'].forEach(k => { lit.style[k] = on ? MASK : ''; }); ['webkitMaskSize', 'maskSize'].forEach(k => { lit.style[k] = on ? '100% 300%' : ''; }); };
  const setPos = p => { lit.style.webkitMaskPosition = lit.style.maskPosition = `0% ${p}%`; };
  const DUR = 5200 * (calm ? .4 : 1);
  const state = { lit: false }, bLight = document.getElementById('b-light'), read = document.getElementById('read');
  let doneT = 0;
  function applyLight() {
    const on = state.lit, quick = svg.classList.contains('instant');
    clearTimeout(doneT);
    const EZ = `${DUR}ms cubic-bezier(.45,.05,.35,1)`, trans = quick ? 'none' : `-webkit-mask-position ${EZ}, mask-position ${EZ}`;
    lit.style.transition = 'none'; svg.style.visibility = '';
    if (quick) { setMask(false); lit.style.visibility = on ? 'visible' : 'hidden'; svg.style.visibility = on ? 'hidden' : ''; life(on, true); finish(on); return; }
    lit.style.visibility = 'visible'; setMask(true); setPos(on ? 0 : 100); lit.getBoundingClientRect();   // Startwert festhalten
    lit.style.transition = trans;
    life(on, false);
    requestAnimationFrame(() => setPos(on ? 100 : 0));
    // Am Ende: Maske weg (Lichtebene voll sichtbar, Nachtebene verdeckt) bzw. Lichtebene weg; beides spart der GPU die Maske
    doneT = setTimeout(() => {
      lit.style.transition = 'none'; setMask(false);
      if (on) { svg.style.visibility = 'hidden'; } else { lit.style.visibility = 'hidden'; }
      life(on, true);
    }, DUR + 120);
    finish(on);
  }
  const finish = on => { read.textContent = on ? 'Abendlicht · Fenster, Fassade' : 'Nacht'; };
  /* Ruhezustand: Laternenkrone und Sterne atmen; ein paar Prozent der Fenster gehen immer wieder weich aus und wieder an. */
  const NS = 'http://www.w3.org/2000/svg', rr = (a, b) => a + Math.random() * (b - a);
  let pool = null, ovs = [], gen = 0;
  function life(on, settled) {
    const set = (els, f) => els.forEach((el, i) => { el.style.animation = on && settled && !calm ? f(i) : ''; });
    set([...lit.querySelectorAll('.lant-h')], () => 'breathe 5s ease-in-out infinite alternate');
    set([...svg.querySelectorAll('.star'), ...lit.querySelectorAll('.star')], i => `star ${3 + (i % 5)}s ease-in-out ${(i * .7) % 4}s infinite alternate`);
    if (on && settled && !calm) startChurn(); else if (!on) stopChurn();
  }
  /* Fenster-Quelle: alle Teilpfade (Fenster) der .wn-Elemente. In zusammengefassten Pfaden (ein <path> je Klasse) lässt sich ein Fenster nicht
     einzeln dimmen; deshalb liegt über dem ausgewählten Fenster ein kleines dunkles Deckfenster (Pfad aus denselben Koordinaten), das ein-/ausblendet. */
  function buildPool() {
    const src = []; let n = 0;
    lit.querySelectorAll('.wn:not(.off):not(.ov)').forEach(el => {
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
    if (q.has('sofort')) { svg.classList.add('instant'); setLit(true); }
  else demo = [setTimeout(() => setLit(true), 700)];   // bleibt an; der Knopf schaltet zurück auf Nacht
})();
