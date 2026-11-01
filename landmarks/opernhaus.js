/* Opernhaus Hannover (Laves, 1845–1852). Lokal: x Ost, y Süd, z Höhe, Gelände z = 1; Front (Portikus) zeigt nach +y.
   Grundriss nach OSM-Way 4816458 (Kreuzform): Flügelblock 81,8 × 55,6 m, Portikus-Arm 29,6 × 17 m vorn, Bühnenarm 29,6 × 11 m hinten (gesamt 83,6 m tief).
   Aufbau nach ref/oper-hbf-aegi/01–04 (Wikimedia Commons, Quellen in quellen.txt):
   · Flügel (Sandstein): Rustika-Erdgeschoss mit Rundbogenfenstern (Lünette über Rechteckfenster), Gurtgesims, Obergeschoss mit Bogenfenstern zwischen Lisenen, Fries mit Feldern, flaches Kupferdach
   · Mittelbau (heller Putz): Bogenfenster in Rahmenfeldern, Inschriftfries „ERNESTUS AUGUSTUS REX CONDIDIT ARTI ET MUSIS MDCCCXXXXV“, Zahnschnitt, Giebel mit Greifen und Figurengruppe, Dachlaterne
   · Mittelrisalit (≈ 8 m vor den Flügeln): unten fünf verglaste Bögen, oben fünf hohe Bogenfenster zwischen Halbsäulen, Triglyphenfries, Balustrade mit Vasen;
     der Mittelbau steht knapp dahinter (die Balustrade verdeckt den Fuß seiner Fenster)
   · Säulenhalle davor (≈ 9 m tief, Rest des OSM-Arms): Säulen vorn und an den Seiten, Stufen, zwei Kandelaber; auf der Terrasse Statuen vor den Pfeilern
   · Ostseite: eingeschossige Säulenhalle am Seiteneingang (Kader 01) */
ISO.landmark('opernhaus', H => {
  const { f2, hl, vl, wins, vari, arch, lathe, hip, saddle } = H;
  const Z0 = 1, M = [], add = m => (M.push(m), m);
  // ---------- Maße (m) ----------
  const W = 81.8, YF = 83.6, YW0 = 11, YW1 = 66.6;    // Gesamtbreite, Vorderkante Portikus, Flügelblock y von … bis …
  const CX0 = 26.2, CX1 = 55.8, CW = CX1 - CX0;       // Mittelbau (Portikus, Zuschauerhaus, Bühne)
  const HW = 17.6, RF = Z0 + HW + .8;                 // Flügelwand, Oberkante Hauptgesims
  const ZE = Z0 + 30, ZC = ZE + .7, ZR = ZC + 4.9;     // Mittelbau: Wand bis, Gesims bis, First
  const YT = YW1 + 8, YG = YT - 1.2;                   // Vorderkante Mittelrisalit (≈ 8 m vor den Flügeln, Kader 01/02), Front des Mittelbaus knapp dahinter
  const X0 = CX0 - .8, X1 = CX1 + .8;                  // Mittelrisalit etwas breiter als der Mittelbau
  const ZP = Z0 + 8.6, ZT = Z0 + 11, HT = 9.4;         // Säulenhalle: Säulen bis, Terrasse; Obergeschoss des Risalits
  const PIER = i => CX0 + i * CW / 5;                  // sechs Pfeiler / Achsen des Mittelrisalits

  // ---------- Fassadenhilfen (Wandkoordinaten: u nach rechts, v nach unten ab Oberkante) ----------
  // Rundbogenfenster mit Lünette (Fächersprossen), Kämpfer, Sprossenkreuz unten
  const fanWin = (x, y, w, h, f, cls = '') => {
    const cx = x + w / 2, sp = y + w / 2, r = w / 2;
    return `<path class="wn${cls || vari()}" data-f="${f}" d="${arch(x, y, w, h)}"/>`
      + `<path class="mul" d="M${f2(x)} ${f2(sp)}H${f2(x + w)}M${f2(cx)} ${f2(y)}V${f2(y + h)}M${f2(cx)} ${f2(sp)}L${f2(cx - r * .71)} ${f2(sp - r * .71)}M${f2(cx)} ${f2(sp)}L${f2(cx + r * .71)} ${f2(sp - r * .71)}`
      + (h - w / 2 > 3 ? `M${f2(x)} ${f2(sp + (h - w / 2) * .5)}H${f2(x + w)}` : '') + `"/>`;
  };
  // Archivolte (Bogenrahmen) und Schlussstein
  const archivolt = (x, y, w, h, o = .35) => `<path class="dt" d="M${f2(x - o)} ${f2(y + h)}V${f2(y + w / 2)}A${f2(w / 2 + o)} ${f2(w / 2 + o)} 0 0 1 ${f2(x + w + o)} ${f2(y + w / 2)}V${f2(y + h)}"/>`
    + `<path class="dt" d="M${f2(x + w / 2 - .3)} ${f2(y - o - .05)}h.6l-.12 .6h-.36Z"/>`;
  // Keilsteine um einen Rustika-Bogen
  const voussoirs = (x, y, w) => { const cx = x + w / 2, cy = y + w / 2, r0 = w / 2, r1 = w / 2 + .7; let d = '';
    for (let k = 0; k <= 6; k++) { const a = Math.PI * (1 + k / 6); d += `M${f2(cx + r0 * Math.cos(a))} ${f2(cy + r0 * Math.sin(a))}L${f2(cx + r1 * Math.cos(a))} ${f2(cy + r1 * Math.sin(a))}`; }
    return `<path class="dt" d="${d}"/><path class="dt" d="M${f2(cx - r1)} ${f2(cy)}A${f2(r1)} ${f2(r1)} 0 0 1 ${f2(cx + r1)} ${f2(cy)}"/>`; };
  const rect = (x, y, w, h) => `<path class="dt" d="M${f2(x)} ${f2(y)}h${f2(w)}v${f2(h)}h${f2(-w)}Z"/>`;
  const pil = (u, y0, y1, w = .7) => vl(u - w / 2, y0, y1) + vl(u + w / 2, y0, y1);
  // Zahnschnitt unter dem Gesims
  const dentils = (len, y, step = .55) => { let d = ''; for (let u = .3; u < len - .2; u += step) d += `M${f2(u)} ${f2(y)}v.32`; return `<path class="dt" d="${d}"/>`; };
  // Triglyphenfries
  const triglyph = (len, y0, y1, step = 1.5) => { let d = ''; for (let u = .6; u < len - .3; u += step) d += `M${f2(u)} ${f2(y0)}V${f2(y1)}M${f2(u + .3)} ${f2(y0)}V${f2(y1)}M${f2(u + .6)} ${f2(y0)}V${f2(y1)}`; return `<path class="dt" d="${d}"/>`; };
  // Balustrade: Handlauf, Docken, Postamente an den Stellen ps (Wandkoordinaten)
  const balustrade = (ps = []) => (len, h) => {
    let s = hl(0, len, .25) + hl(0, len, h - .25), d = '';
    for (let u = .35; u < len - .2; u += .42) if (!ps.some(p => Math.abs(p - u) < .55)) d += `M${f2(u)} .4V${f2(h - .4)}`;
    s += `<path class="dt" d="${d}"/>`;
    ps.forEach(p => { s += rect(p - .45, 0, .9, h); });
    return s;
  };

  // ---------- Flügel ----------
  // Fassade eines Flügels: Fenster nur in den Abschnitten rg (die Mitte verdecken Portikus bzw. Bühnenarm)
  const wingFace = (rg, step) => (len, h) => {
    let q = hl(0, len, .25) + hl(0, len, .5) + hl(0, len, 1.75) + hl(0, len, 2.1);     // Kranzgesims, Fries, Architrav
    q += hl(0, len, 9.0) + hl(0, len, 9.45) + hl(0, len, 9.9);                       // Gurtgesims über dem Erdgeschoss
    for (let v = 10.55; v < h - 1.1; v += .65) q += hl(0, len, v);                    // Rustika
    q += hl(0, len, h - 1.0) + hl(0, len, h - .45);                                    // Sockel
    let w = '';
    rg.forEach(([a, b]) => {
      const n = Math.max(1, Math.floor((b - a - 1.6) / step)), off = a + (b - a - n * step) / 2;
      // Friesfelder
      for (let u = a + .5; u < b - 1.2; u += 1.15) q += rect(u, .72, .8, .82);
      // Eckquader / Lisenen an den Abschnittsrändern
      q += pil(a + .45, 2.1, 9.0, .9) + pil(b - .45, 2.1, 9.0, .9);
      for (let i = 0; i < n; i++) {
        const u = off + step * (i + .5);
        w += fanWin(u - 1.15, 3.0, 2.3, 5.6, 2) + fanWin(u - 1.05, 11.0, 2.1, 5.0, 1);
        q += archivolt(u - 1.15, 3.0, 2.3, 5.6) + rect(u - 1.4, 8.6, 2.8, .3) + voussoirs(u - 1.05, 11.0, 2.1);
        if (i < n - 1) q += pil(off + step * (i + 1), 2.1, 9.0);
      }
    });
    return q + wins(w);
  };
  add({ id: 'opWing', o: .2, fp: [0, YW0, W, YW1], draw: K => {
    const fr = [[0, CX0], [CX1, W]], sd = len => [[0, len]];
    let s = K.box(0, YW0, Z0, W, YW1 - YW0, HW, 'st', { S: wingFace(fr, 4.4), N: wingFace(fr, 4.4), E: (l, h) => wingFace(sd(l), 4.6)(l, h), W: (l, h) => wingFace(sd(l), 4.6)(l, h) }, false);
    s += K.box(-.45, YW0 - .45, Z0 + HW, W + .9, YW1 - YW0 + .9, .8, 'st', { S: l => hl(0, l, .4), E: l => hl(0, l, .4), W: l => hl(0, l, .4), N: l => hl(0, l, .4) });
    s += hip(K, -.2, YW0 - .2, CX0, YW1 + .2, RF, RF + 2.2, 'cu') + hip(K, CX1, YW0 - .2, W + .2, YW1 + .2, RF, RF + 2.2, 'cu');
    return s;
  } });
  // Säulenhalle am Seiteneingang (Ostseite, hinterer Teil; Kader 01)
  add({ id: 'opLoggia', o: .25, fp: [W, 14, W + 3.2, 31], parent: 'opWing', side: 'E', draw: K => {
    const x1 = W + 3.0, z1 = Z0 + 6.8;
    let s = K.box(W, 14, Z0, 3.2, 17, .5, 'st');
    [14.6, 20.4, 26.2, 30.4].forEach(y => { s += lathe(K, x1 - .5, y, [[Z0 + .5, .5], [Z0 + .9, .42], [z1 - .5, .38], [z1, .55]], 'st fr', 2, [1]); });
    s += K.box(W, 14, z1, 3.2, 17, 1.2, 'st', { E: l => hl(0, l, .35) + hl(0, l, .7), S: l => hl(0, l, .35), N: l => hl(0, l, .35) });
    return s;
  } });

  // ---------- Bühnenarm hinten: unten wie die Flügel, oben Putz bis zur Traufe des Mittelbaus ----------
  const plainUp = (step, y0 = 2.6, ww = 2.2, wh = 5.2) => (len, h) => {
    let q = hl(0, len, .3) + hl(0, len, .65) + dentils(len, .7) + hl(0, len, 2.1), w = '';
    const n = Math.max(1, Math.floor((len - 1.4) / step)), off = (len - n * step) / 2;
    for (let i = 0; i < n; i++) { const u = off + step * (i + .5);
      q += rect(u - ww / 2 - .6, y0 - .5, ww + 1.2, wh + 1.1); w += fanWin(u - ww / 2, y0, ww, wh, 4);
      if (i < n - 1) q += pil(off + step * (i + 1), 2.1, h - .3, .8); }
    return q + hl(0, len, h - .3) + wins(w);
  };
  add({ id: 'opRear', o: .5, fp: [CX0, 0, CX1, YW0], draw: K => {
    const lo = (len, h) => wingFace([[0, len]], 4.6)(len, h);
    let s = K.box(CX0, 0, Z0, CW, YW0, HW, 'st', { N: lo, E: lo, W: lo }, false);
    s += K.box(CX0, 0, Z0 + HW, CW, YW0, .8, 'st', { N: l => hl(0, l, .4), E: l => hl(0, l, .4), W: l => hl(0, l, .4) }, false);
    s += K.box(CX0, 0, RF, CW, YW0, ZE - RF, 'pl', { N: plainUp(4.9), E: plainUp(5.2), W: plainUp(5.2) }, false);
    return s;
  } });

  // ---------- Mittelbau (Zuschauerhaus) über dem Flügeldach: heller Putz; Front steht knapp hinter der Balustrade des Risalits ----------
  const ped = len => `<path class="pl fr" d="M0 0L${f2(len / 2)} -4.9L${f2(len)} 0Z"/><path class="dt" d="M1.2 -.45L${f2(len / 2)} -4.15L${f2(len - 1.2)} -.45Z"/><path class="dt" d="M.4 -.25H${f2(len - .4)}"/>`;
  add({ id: 'opCenter', o: .4, fp: [CX0, YW0, CX1, YG], above: 'opWing', draw: K => {
    const hC = ZE - RF;
    // Front: fünf Bogenfenster in Rahmenfeldern, Inschriftfries
    const front = (len, h) => {
      let q = hl(0, len, .3) + hl(0, len, .65) + dentils(len, .7) + hl(0, len, 1.1) + hl(0, len, 2.25), w = '';
      for (let i = 0; i < 5; i++) { const u = (i + .5) * len / 5;
        q += rect(u - 2.0, 2.7, 4.0, 7.4) + archivolt(u - 1.3, 3.3, 2.6, 6.0, .3); w += fanWin(u - 1.3, 3.3, 2.6, 6.0, 5, ' hi');
        if (i > 0) q += pil(i * len / 5, 2.25, h - .3, .9); }
      w += `<text class="wn dim" data-f="5" x="1.2" y="1.92" font-size=".82" font-family="Georgia,'Times New Roman',serif" textLength="${f2(len - 2.4)}" lengthAdjust="spacingAndGlyphs">ERNESTUS·AUGUSTUS·REX·CONDIDIT·ARTI·ET·MUSIS·MDCCCXXXXV</text>`;
      return q + wins(w);
    };
    let s = K.box(CX0, YW0, RF, CW, YG - YW0, hC, 'pl', { S: front, E: plainUp(6.2), W: plainUp(6.2) }, false);
    // Hauptgesims rundum (auch über dem Bühnenarm), Satteldach aus Kupfer, Giebel vorn und hinten
    s += K.box(CX0 - .4, -.4, ZE, CW + .8, YG + .8, .7, 'pl', { S: l => hl(0, l, .35), E: l => hl(0, l, .35), W: l => hl(0, l, .35), N: l => hl(0, l, .35) }, false);
    s += saddle(K, [CX0 - .4, YG + .4], [CX1 + .4, YG + .4], [0, -(YG + .8)], ZC, ZR, 'cu');
    s += K.wall([CX0 - .4, YG + .4], [CX1 + .4, YG + .4], ZC, ZC + .01, 'pl', ped);
    s += K.wall([CX1 + .4, -.4], [CX0 - .4, -.4], ZC, ZC + .01, 'pl', ped);
    // Schornsteine an der Traufe hinten, Dachlaterne vorn links
    const eave = dx => ZC + dx / (CW / 2 + .4) * (ZR - ZC);
    [[CX0 + 1.6, 6], [CX0 + 1.6, 18], [CX1 - 2.5, 6], [CX1 - 2.5, 18]].forEach(([x, y]) => { s += K.box(x, y, eave(1.4) - .3, .9, 1.2, 2.6, 'pl', { S: l => hl(0, l, .3), E: l => hl(0, l, .3), W: l => hl(0, l, .3), N: l => hl(0, l, .3) }); });
    const zl = eave(3.6);
    s += lathe(K, CX0 + 3.6, YG - 6, [[zl, 1.25], [zl + 1.4, 1.25], [zl + 1.6, 1.45], [zl + 2.3, 1.0], [zl + 2.9, .45], [zl + 3.4, .12]], 'cu fr', 4, [1, 2]);
    // Akrotere: Greifen an den Giebelecken, Figurengruppe (zwei Adler mit Lyra) auf Kupfersockel am First
    const at = (x, y, z, d, cls) => { const p = K.P(x, y, z); return `<path class="${cls}" transform="translate(${f2(p[0])} ${f2(p[1])})" d="${d}"/>`; };
    const griffin = 'M-1 0V-.7L-.7 -1.1-.6 -1.6-.2 -1.3 0 -1.9 .3 -1.5 .2 -1.1 .7 -.9 .9 -.4 1 0Z';
    s += at(CX0 + .2, YG + .4, ZC, griffin, 'cu fr') + at(CX1 - .2, YG + .4, ZC, griffin, 'cu fr');
    const cx = (CX0 + CX1) / 2;
    s += K.box(cx - 1.3, YG - 1.2, ZR - .6, 2.6, 1.6, 1.4, 'cu', {});
    s += at(cx, YG + .2, ZR + .8, 'M-2.4 0L-2.2 -1.1-1.7 -1.5-1.9 -2.3-1.3 -2-1 -1.2-.55 -1.3-.45 -2.5 0 -3.1 .45 -2.5 .55 -1.3 1 -1.2 1.3 -2 1.9 -2.3 1.7 -1.5 2.2 -1.1 2.4 0Z', 'cu fr');
    s += at(cx, YG + .2, ZR + 3.6, 'M0 0V-3.4', 'dt cu-d');
    return s;
  } });

  // ---------- Mittelrisalit (springt ~8 m vor die Flügel): unten Bogenhalle (Rückwand der Säulenhalle), oben fünf hohe Bogenfenster zwischen Halbsäulen ----------
  add({ id: 'opTier', o: .3, fp: [X0, YW1, X1, YT], parent: 'opCenter', side: 'S', draw: K => {
    const WT = X1 - X0, D = YT - YW1, ztop = ZT + HT, off = CX0 - X0;
    // Erdgeschoss: fünf verglaste Bögen (Eingänge) vorn, je ein Bogen an den Seiten (Kader 01)
    const arcade = (n, o = 0, ww) => (len, h) => { let q = hl(0, len, .3) + hl(0, len, h - .3), w = ''; const b = (ww || len) / n;
      for (let i = 0; i < n; i++) { const u = o + (i + .5) * b, aw = Math.min(b * .62, 4.0);
        w += fanWin(u - aw / 2, 2.6, aw, h - 2.9, 1, ' dim'); q += archivolt(u - aw / 2, 2.6, aw, h - 2.9, .3) + rect(u - aw / 2 - .5, 2.6 + aw / 2, .5, .35) + rect(u + aw / 2, 2.6 + aw / 2, .5, .35); }
      for (let v = 3.2; v < h - .5; v += .7) { /* Rustika nur auf den Pfeilern: kurze Fugen */ for (let i = 0; i <= n; i++) { const u = o + i * b; q += `<path class="dt" d="M${f2(u - .9)} ${f2(v)}H${f2(u + .9)}"/>`; } }
      return q + wins(w); };
    let s = K.box(X0, YW1, Z0 + 1.2, WT, D, ZT - Z0 - 1.2, 'st', { S: arcade(5, off, CW), E: arcade(1), W: arcade(1) }, false);
    // Obergeschoss
    const ent = l => hl(0, l, .3) + hl(0, l, .6) + dentils(l, .62) + triglyph(l, 1.0, 1.75, 1.2) + hl(0, l, 1.85) + hl(0, l, 2.15);
    const fr = (len, h) => { let q = ent(len) + hl(0, len, h - .35), w = '';
      for (let i = 0; i < 5; i++) { const u = off + (i + .5) * CW / 5;
        w += fanWin(u - 1.45, 2.9, 2.9, 6.1, 3, ' hi'); q += archivolt(u - 1.45, 2.9, 2.9, 6.1, .35) + rect(u - 1.75, 9.0, 3.5, .25); }
      for (let i = 0; i <= 5; i++) q += pil(off + i * CW / 5, 2.15, h - .35, 1.1);
      return q + wins(w); };
    const fs = (len, h) => { let q = ent(len) + hl(0, len, h - .35); const u = len / 2;
      q += archivolt(u - 1.3, 2.9, 2.6, 6.1, .35) + pil(.6, 2.15, h - .35, .9) + pil(len - .6, 2.15, h - .35, .9);
      return q + wins(fanWin(u - 1.3, 2.9, 2.6, 6.1, 3)); };
    s += K.box(X0, YW1, ZT, WT, D, HT, 'st', { S: fr, E: fs, W: fs }, false);
    // Halbsäulen vor den Pfeilern (an den Ecken gekuppelt)
    const hs = [];
    for (let i = 0; i <= 5; i++) hs.push(PIER(i));
    hs.push(PIER(0) - 1.0, PIER(5) + 1.0);
    hs.sort((a, b) => K.depth(a, YT) - K.depth(b, YT)).forEach(x => { s += lathe(K, x, YT + .25, [[ZT + .3, .5], [ZT + .7, .42], [ztop - 2.6, .38], [ztop - 2.25, .52]], 'st fr', 3, [1, 3]); });
    // Gesimsplatte nur dort, wo der Mittelbau sie nicht verdeckt (vorn und an den Seiten), Balustrade mit Postamenten und Vasen
    const lid = (x, y, w, d) => K.box(x, y, ztop, w, d, .45, 'st', { S: l => hl(0, l, .22), E: l => hl(0, l, .22), W: l => hl(0, l, .22) });
    s += lid(X0 - .3, YG, WT + .6, YT - YG + .3) + lid(X0 - .3, YW1, CX0 - X0 + .3, YG - YW1) + lid(CX1, YW1, X1 - CX1 + .3, YG - YW1);
    const zb = ztop + .45, hb = 1.3, yb = YT - .1;
    const ps = Array.from({ length: 6 }, (_, i) => PIER(i) - (X0 - .1));
    s += K.wall([X0 - .1, yb], [X1 + .1, yb], zb, zb + hb, 'st', balustrade(ps))
      + K.wall([X1 + .1, yb], [X1 + .1, YW1 + .3], zb, zb + hb, 'st', balustrade([.45, yb - YW1 - .75]))
      + K.wall([X0 - .1, YW1 + .3], [X0 - .1, yb], zb, zb + hb, 'st', balustrade([.45, yb - YW1 - .75]));
    const URN = 'M-.2 0L-.14 -.18-.42 -.42-.46 -.72-.34 -.9-.4 -1.0H.4L.34 -.9 .46 -.72 .42 -.42 .14 -.18 .2 0Z';
    const urn = (x, y) => { const p = K.P(x, y, zb + hb); return `<path class="st fr" transform="translate(${f2(p[0])} ${f2(p[1])})" d="${URN}"/><path class="dt" transform="translate(${f2(p[0])} ${f2(p[1])})" d="M-.44 -.7H.44"/>`; };
    const urns = [];
    for (let i = 0; i <= 5; i++) urns.push([PIER(i), yb]);
    urns.push([X1 + .1, YW1 + 1.0], [X0 - .1, YW1 + 1.0]);
    urns.sort((a, b) => K.depth(...a) - K.depth(...b)).forEach(([x, y]) => { s += urn(x, y); });
    return s;
  } });

  // ---------- Säulenhalle vor dem Risalit (~9 m tief): Stufen, Säulen vorn und an den Seiten, Gebälk mit Terrasse, Statuen, Kandelaber ----------
  add({ id: 'opPorch', o: .1, fp: [CX0 - 4.2, YT, CX1 + 4.2, YF + 3.2], parent: 'opTier', side: 'S', draw: K => {
    const XS0 = CX0 - 3.2, WS = CW + 6.4, XP0 = CX0 - 1.2, WP = CW + 2.4;
    let s = K.box(XS0, YF + .1, Z0, WS, 2.7, .4, 'st') + K.box(XS0 + .3, YF + .1, Z0 + .4, WS - .6, 1.8, .4, 'st') + K.box(XS0 + .6, YF + .1, Z0 + .8, WS - 1.2, .9, .4, 'st');
    s += K.box(XP0, YT, Z0, WP, YF - YT + .1, 1.2, 'st', { S: l => hl(0, l, .35), E: l => hl(0, l, .35), W: l => hl(0, l, .35) });
    // Säulen: sechs vorn vor den Achsen (Ecken gekuppelt), zwei je Seite; hinten stehen sie vor den Pfeilern der Bogenhalle
    const col = (x, y) => lathe(K, x, y, [[Z0 + 1.2, .62], [Z0 + 1.6, .5], [ZP - .6, .44], [ZP - .25, .6], [ZP, .66]], 'st fr', 3, [1, 3]);
    const cols = [];
    for (let i = 0; i <= 5; i++) cols.push([PIER(i), YF - .7]);
    cols.push([PIER(0) + 1.4, YF - .7], [PIER(5) - 1.4, YF - .7]);
    [YT + 2.6, YT + 5.6].forEach(y => { cols.push([XP0 + .6, y], [XP0 + WP - .6, y]); });
    cols.sort((a, b) => K.depth(...a) - K.depth(...b)).forEach(([x, y]) => { s += col(x, y); });
    // Gebälk: Architrav, Triglyphenfries, Gesims; Oberseite = Terrasse
    const ent = l => hl(0, l, .35) + hl(0, l, .7) + triglyph(l, .85, 1.55, 1.48) + hl(0, l, 1.65) + hl(0, l, 2.05);
    s += K.box(XP0, YT, ZP, WP, YF - YT, ZT - ZP, 'st', { S: ent, E: ent, W: ent });
    // eiserne Brüstung an der Terrassenkante
    const rail = (L, R) => { const dx = R[0] - L[0], dy = R[1] - L[1], len = Math.hypot(dx, dy); let d = `M0 0H${f2(len)}M0 .9H${f2(len)}`;
      for (let u = .3; u < len; u += .6) d += `M${f2(u)} 0V.9`;
      return K.g(K.plane([L[0], L[1], ZT + .9], [dx / len, dy / len, 0], [0, 0, -1]), `<path class="dt" d="${d}"/>`); };
    s += rail([XP0 + .2, YT + .2], [XP0 + .2, YF - .2]) + rail([XP0 + WP - .2, YT + .2], [XP0 + WP - .2, YF - .2]) + rail([XP0 + .2, YF - .2], [XP0 + WP - .2, YF - .2]);
    // Statuen auf der Terrasse vor den Pfeilern des Obergeschosses (Gewandfiguren als Schattenriss auf Sockeln)
    const FIG = 'M-.42 0L-.36 -.9-.3 -1.55-.38 -1.95-.3 -2.2-.12 -2.28-.14 -2.42A.2 .2 0 1 1 .14 -2.42L.12 -2.28 .32 -2.2 .46 -1.85 .5 -1.45 .34 -1.4 .3 -1.6 .32 -.9 .44 0Z';
    const statue = (x, y) => { const p = K.P(x, y, ZT + .7);
      return K.box(x - .5, y - .5, ZT, 1.0, 1.0, .7, 'st', { S: l => hl(0, l, .2), E: l => hl(0, l, .2), W: l => hl(0, l, .2), N: l => hl(0, l, .2) })
        + `<path class="st fr" transform="translate(${f2(p[0])} ${f2(p[1])})" d="${FIG}"/>`; };
    for (let i = 0; i <= 5; i++) s += statue(PIER(i), YT + 1.3);
    // Kandelaber vor den Ecken
    [CX0 - 2.4, CX1 + 2.4].forEach(x => { const y = YF + 2.2;
      s += K.box(x - .55, y - .55, Z0 + .4, 1.1, 1.1, 1.0, 'st') + lathe(K, x, y, [[Z0 + 1.4, .2], [Z0 + 2.2, .14], [Z0 + 5.4, .1]], 'brz', 0);
      [[-.65, 0, 5.5], [.65, 0, 5.5], [0, 0, 6.2]].forEach(([dx, dy, dz]) => { const p = K.P(x + dx, y + dy, Z0 + dz); s += `<g class="wins"><circle class="wn hi" data-f="1" cx="${f2(p[0])}" cy="${f2(p[1])}" r=".42"/></g>`; }); });
    return s;
  } });

  return { mods: M, lc: [W / 2, YF / 2], z0: 0, top: [W / 2, 38, ZR + 3], pin: [W / 2, 40, ZR + 4], label: 'Opernhaus', h: 40, len: 83.6 };
});
