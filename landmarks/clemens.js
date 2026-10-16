/* Basilika St. Clemens (Hannover) – Modul v1, Fotos: ref/clemens/ (Wikimedia Commons, siehe quellen.txt).
   Lokal: x = Ost, y = Süd, z = Höhe, Gelände z = 0. Maße aus dem OSM-Umriss (way 357786647) verschoben: x = x_Ost + 20, y = 18 − y_Nord; Kirchenachse y = 18,4.
   Hauptfront (Portal) = Ostseite (+x, Platz an der Basilika); die beiden Glockentürme stehen an den Westecken, der Chor (Apsis) schließt im Westen.
   Aufbau (Giusti 1712–1718, Kuppel und Türme 1947–1957 von Otto Fiederling): Kreuzblock aus Sandstein mit Orange-Putzfeldern (Portalvorbau mit Dreiecksgiebel,
   abgeschrägte Ecken, Nischen, Rautenfries, vier Eckfiguren) · niedrigere Seitenarme mit Lisenen und Gurtbändern · Tambour mit 8 Fensterpaaren, Kupferkuppel mit Rippen,
   offene Laterne mit Glockenhaube, Kugel und Kreuz · zwei quadratische Glockentürme mit je zwei Schallarkaden pro Seite und flachem Kupferdach mit Mini-Laterne.
   Materialien (nach der Lichtpalette der Karte): pl = heller Sandstein/Putz (Front, Pfeiler, Tambour, Schilder), gb = Orange-Putz (Wandfelder, Seitenarme, Türme), cu = patiniertes Kupfer. */
(() => {
  const AY = 18.4;                       // Kirchenachse (y)
  const ZW = 14.5, ZC = 18, ZF = 13.6;   // Traufe der Seitenarme, Oberkante Kreuzblock, Hauptgesims der Front
  const DC = [22, AY];                   // Mittelpunkt von Tambour und Kuppel
  ISO.landmark('clemens', H => {
    const { f2, hl, vl, arch, garch, winA, wins, lathe, hip, roofPlane } = H, M = [], add = m => (M.push(m), m);

    /* ---------- Hilfen ---------- */
    const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
    const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const seg = (a, b, u0, u1) => { const L = dist(a, b); return [lerp(a, b, u0 / L), lerp(a, b, u1 / L)]; };
    const sw = (K, a, b, u0, u1, z0, z1, mat, deco) => { const [p, q] = seg(a, b, u0, u1); return K.wall(p, q, z0, z1, mat, deco); };
    // Dekor frei auf eine Wand legen (u entlang, y nach unten ab ztop); nur sichtbar, wenn die Wand sichtbar ist
    const onWall = (K, a, b, ztop, inner) => {
      if (!K.wallVisible(a, b)) return '';
      const L = dist(a, b);
      return K.g(K.plane([a[0], a[1], ztop], [(b[0] - a[0]) / L, (b[1] - a[1]) / L, 0], [0, 0, -1]), inner);
    };
    const line = d => `<path class="dt" d="${d}"/>`;
    // Quaderlagen (Sandstein), optional mit versetzten Stoßfugen
    const ashlar = (len, h, step = 1, joints = true) => {
      let d = '', i = 0;
      for (let y = step; y < h - .05; y += step, i++) {
        d += `M0 ${f2(y)}H${f2(len)}`;
        if (joints) for (let u = (i % 2 ? .9 : 1.7); u < len - .3; u += 1.6) d += `M${f2(u)} ${f2(y - step)}V${f2(y)}`;
      }
      return line(d);
    };
    // Eckquader im Wechsel lang/kurz (Lisene, Eckpfeiler)
    const quoin = (len, h, step = .9) => {
      let d = '', i = 0;
      for (let y = step; y < h - .05; y += step, i++) { d += `M0 ${f2(y)}H${f2(len)}`; d += `M${f2(i % 2 ? len * .34 : len * .68)} ${f2(y - step)}V${f2(y)}`; }
      return line(d);
    };
    // Rautenfries (Metopen mit Rauten) zwischen zwei Gesimslinien
    const rhombi = (len, y0, y1, step = 1.9) => {
      const yc = (y0 + y1) / 2, hh = (y1 - y0) * .36, ww = hh * 1.15, n = Math.max(1, Math.round(len / step)), st = len / n;
      let d = `M0 ${f2(y0)}H${f2(len)}M0 ${f2(y1)}H${f2(len)}`;
      for (let i = 0; i < n; i++) { const u = (i + .5) * st; d += `M${f2(u - ww)} ${f2(yc)}L${f2(u)} ${f2(yc - hh)}L${f2(u + ww)} ${f2(yc)}L${f2(u)} ${f2(yc + hh)}Z`; }
      return line(d);
    };
    const plaque = (u, y, w, h) => `<rect class="pl tp" x="${f2(u)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/>${line(`M${f2(u - .22)} ${f2(y - .22)}h${f2(w + .44)}v${f2(h + .44)}h${f2(-w - .44)}Z`)}`;
    const gold = (u, y, w, h) => `<rect class="gb" x="${f2(u)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}"/>${line(`M${f2(u - .2)} ${f2(y - .2)}h${f2(w + .4)}v${f2(h + .4)}h${f2(-w - .4)}Z`)}`;
    // Muschelnische im Rahmen
    const nicheShell = (u, y, w, h) => {
      const cx = u + w / 2, r = w / 2, yc = y + r;
      let d = `M${f2(u - .45)} ${f2(y + h + .35)}V${f2(yc)}A${f2(r + .45)} ${f2(r + .45)} 0 0 1 ${f2(u + w + .45)} ${f2(yc)}V${f2(y + h + .35)}Z`;
      d += `M${f2(u - .75)} ${f2(y + h + .35)}h${f2(w + 1.5)}`;
      for (let k = 1; k <= 4; k++) { const a = Math.PI * k / 5; d += `M${f2(cx)} ${f2(yc + .1)}L${f2(cx - r * Math.cos(a))} ${f2(yc - r * Math.sin(a))}`; }
      return line(d) + `<path class="dt" d="${garch(u, y, w, h)}"/>`;
    };
    // Fenster/Blenden im Wandsystem (data-f: Stockwerk fürs Abendlicht)
    const wA = (x, y, w, h, f, cls = '') => `<path class="dt" d="${arch(x - .35, y - .35, w + .7, h + .35)}"/>` + winA(x, y, w, h, f, cls);

    /* ---------- Kreuzblock (Kern und Portalvorbau), Sandstein + Putzfelder ---------- */
    const A_ = { sw: [13.2, AY + 9.1], se: [39.5, AY + 9.1], fs: [42.4, AY + 6.4], fn: [42.4, AY - 6.4], ne: [39.5, AY - 9.1], nw: [13.2, AY - 9.1] };
    // Feldwand mit Pfeilern: Orange-Feld mit Nische, zwei Schildern, Rautenfries und Attika. len = Wandlänge, pw = Pfeilerbreite
    const bayWall = (K, a, b, pw) => {
      const L = dist(a, b), pb = L - 2 * pw, nw = Math.min(2.1, pb - 1.1);
      const stone = (len, h) => ashlar(len, h, 1.1, false) + hl(0, len, .3) + hl(0, len, .65) + hl(0, len, ZC - ZF + .3) + rhombi(len, ZC - 12.0, ZC - 13.3 + .3, 1.9) + hl(0, len, ZC - 1.3) + hl(0, len, ZC - 1.55);
      let s = K.wall(a, b, 0, ZC, 'pl', stone);
      // Orange-Feld unten (Nische) und oben (Attika-Schild)
      s += sw(K, a, b, pw, L - pw, 1.3, 11.6, 'gb', (len, h) => plaque(len / 2 - 1.2, h - 1.1 - .2, 2.4, 1.0) + nicheShell(len / 2 - nw / 2, 2.0, nw, h - 4.6) + plaque(len / 2 - 1.2, 0.5, 2.4, .9));
      s += sw(K, a, b, pw, L - pw, ZF + .8, ZC - .5, 'gb', (len, h) => plaque(len / 2 - 1.2, h / 2 - .55, 2.4, 1.1));
      // senkrechte Quaderstreifen der Pfeiler
      s += sw(K, a, b, 0, pw, 0, ZC, 'pl', (len, h) => quoin(len, h, .85));
      s += sw(K, a, b, L - pw, L, 0, ZC, 'pl', (len, h) => quoin(len, h, .85));
      return s;
    };
    // Hauptfront (Ost): Portal mit Rundbogen, Pilasterpaare, Inschrift, Rautenfries, Gesims
    const front = K => {
      const a = A_.fs, b = A_.fn, L = 12.8, c = L / 2;
      const deco = (len, h) => {
        let q = ashlar(len, h, 1.05, true) + hl(0, len, .3) + hl(0, len, .62) + rhombi(len, 1.0 + 0, 2.35, 1.9).replace('M0 1.00H', 'M0 .9H');
        // Pilaster (vier Streifen) mit Kapitell- und Sockelmarken
        [[.0, 1.25], [1.45, 2.95], [L - 2.95, L - 1.45], [L - 1.25, L]].forEach(([u0, u1]) => { q += vl(u0, 2.4, h - 1.3) + vl(u1, 2.4, h - 1.3) + hl(u0, u1, 2.65) + hl(u0, u1, h - 1.55); });
        q += hl(0, len, h - 1.3) + hl(0, len, h - 1.05);
        // Portal: Gewändebogen mit Keilsteinen, Tür dunkel, Mittelfuge
        const ox = c - 1.8, ow = 3.6, ot = ZF - 7.6, oh = 7.6 - .8, cy = ot + ow / 2;
        q += `<path class="dt" d="${arch(c - 2.7, ot - .9, 5.4, oh + .9 + .1)}"/><path class="dt" d="${arch(c - 2.25, ot - .45, 4.5, oh + .5)}"/>`;
        let d = ''; for (let k = 0; k <= 8; k++) { const t = Math.PI * k / 8, r1 = ow / 2, r2 = ow / 2 + .9; d += `M${f2(c + r1 * Math.cos(t))} ${f2(cy - r1 * Math.sin(t))}L${f2(c + r2 * Math.cos(t))} ${f2(cy - r2 * Math.sin(t))}`; }
        q += line(d) + `<path class="lv" d="${arch(ox, ot, ow, oh)}"/>` + line(`M${f2(c)} ${f2(cy + .3)}V${f2(ot + oh)}M${f2(ox + .3)} ${f2(ot + 3.1)}H${f2(c - .15)}M${f2(c + .15)} ${f2(ot + 3.1)}H${f2(ox + ow - .3)}M${f2(ox + .3)} ${f2(ot + 5.2)}H${f2(c - .15)}M${f2(c + .15)} ${f2(ot + 5.2)}H${f2(ox + ow - .3)}`);
        q += `<circle class="gb" cx="${f2(c)}" cy="${f2(ot - .55)}" r=".28"/>`;
        // Inschriftentafel über dem Portal
        q += gold(c - 1.9, ZF - 11.3, 3.8, 1.2);
        return q;
      };
      let s = K.wall(a, b, 0, ZF, 'pl', deco);
      // Dreiecksgiebel mit Fenster, Kupferdach dahinter
      const pz = ZF, pa = ZC + .3, e0 = AY + 7.1, e1 = AY - 7.1, X = 42.4;
      const rs = [[X, e0, pz], [X, AY, pa], [X - 6.2, AY, pa], [X - 6.2, e0 - .4, pz]], rn = [[X, AY, pa], [X, e1, pz], [X - 6.2, e1 + .4, pz], [X - 6.2, AY, pa]];
      s += K.face(rs, 'cu') + K.face(rn, 'cu');
      s += K.face([[X, e1, pz], [X, e0, pz], [X, AY, pa]], 'pl', `<path class="dt" d="${K.path([[X, e0, pz], [X, AY, pa], [X, e1, pz]])}"/><path class="dt" d="${K.path([[X, e0 - .7, pz + .35], [X, AY, pa - .6], [X, e1 + .7, pz + .35]])}"/>`);
      s += onWall(K, [X, AY + 1.3], [X, AY - 1.3], ZF + 3.7, wins(winA(0, 0, 2.6, 3.2, 3, ' dim')) + line(`M-.35 3.3h3.3`));
      // Freitreppe
      for (let k = 0; k < 4; k++) s += K.box(X, AY - 5.7, 0, (4 - k) * .95, 11.4, (k + 1) * .42, 'pl', {}, true);
      return s;
    };
    add({ id: 'cross', fp: [13.2, AY - 9.1, 42.4, AY + 9.1], draw: K => {
      const q = A_;
      let s = '';
      // Seitenwände
      s += bayWall(K, [31.4, AY + 9.1], q.se, 1.3);                                  // Südflanke des Vorbaus
      s += bayWall(K, q.ne, [31.4, AY - 9.1], 1.3);                                   // Nordflanke (verdeckt)
      s += bayWall(K, q.se, q.fs, .8);                                                // abgeschrägte Ecke SO
      s += bayWall(K, q.fn, q.ne, .8);                                                // abgeschrägte Ecke NO
      // Kernblock: obere Zone der Südwand über dem Seitenarm (Gesims, Orange-Feld, Eckpfeiler)
      const kernS = (len, h) => ashlar(len, h, 1.1, false) + hl(0, len, .3) + hl(0, len, .6) + hl(0, len, h - .5);
      s += K.wall(q.sw, [31.4, AY + 9.1], ZW - .5, ZC, 'pl', kernS);
      s += sw(K, q.sw, [31.4, AY + 9.1], 1.4, 16.8, ZW + .9, ZC - .5, 'gb', (len, h) => plaque(len / 2 - 1.8, h / 2 - .45, 3.6, .9));
      s += K.wall([13.2, AY - 9.1], [13.2, AY + 9.1], 0, ZC, 'pl', (l, h) => ashlar(l, h, 1.1, false));
      s += front(K);
      // Oberseite: flaches Kupferdach rund um den Tambour (Nähte quer)
      const ring = [[13.2, AY + 9.1, ZC], [39.5, AY + 9.1, ZC], [42.4, AY + 6.4, ZC], [42.4, AY - 6.4, ZC], [39.5, AY - 9.1, ZC], [13.2, AY - 9.1, ZC]];
      let seams = '';
      for (let dy = -8.5; dy <= 8.6; dy += 2.1) { const ax = Math.abs(dy), xm = ax <= 6.4 ? 42.4 : 42.4 - (ax - 6.4) * (2.9 / 2.7); seams += K.path([[13.2, AY + dy, ZC], [xm, AY + dy, ZC]]); }
      s += K.poly(ring, 'cu') + `<path class="dt cu-d" d="${seams}"/>`;
      // hintere Eckfiguren (stehen hinter dem Tambour)
      s += statue(K, 14.4, AY + 8.2) + statue(K, 14.4, AY - 8.2);
      return s;
    } });

    // Eckfigur: Sockel, Körper, Kopf (Sandstein)
    function statue(K, x, y, z = ZC) {
      const hd = K.P(x, y, z + 2.55);
      return K.box(x - .55, y - .55, z, 1.1, 1.1, .9, 'pl', {}, true)
        + lathe(K, x, y, [[z + .9, .55], [z + 1.6, .5], [z + 2.4, .32]], 'pl fr', 0)
        + `<circle class="pl fr" cx="${f2(hd[0])}" cy="${f2(hd[1])}" r=".3"/>`;
    }

    /* ---------- Seitenarme (Süd und Nord): Orange-Putz mit Lisenen, Gurtbändern und Fenstergruppe ---------- */
    const armWall = (west, group) => (len, h) => {
      let q = hl(0, len, h - .5) + hl(0, len, h - .95) + hl(0, len, h - 1.6) + hl(0, len, h - 2.0);       // Traufgesims
      q += hl(0, len, 1.45) + hl(0, len, 1.2) + hl(0, len, h - 7.0) + hl(0, len, h - 8.2) + hl(0, len, 6.3);  // Gurtbänder, Sockel
      let w = '';
      if (group) {                                                                                           // große Bogenblende mit zwei Fenstern, nahe dem Turm
        const x0 = west + 1.2, bw = 3.5; w += `<path class="dt" d="${arch(x0 - .35, 3.0, bw + .7, 6.2)}"/>` + winA(x0 + .15, 3.5, 1.35, 5.2, 1) + winA(x0 + bw - 1.5, 3.5, 1.35, 5.2, 1);
        w += winA(x0 + 1.0 + bw + 1.2, h - 5.4, 1.1, 3.0, 0, ' dim');
      }
      return q + wins(w);
    };
    const lisene = (K, a, b, u, w) => sw(K, a, b, u, u + w, 0, ZW, 'pl', (len, h) => quoin(len, h, .85));
    add({ id: 'armS', fp: [13.2, AY + 9.1, 29.1, AY + 13.2], draw: K => {
      const a = [13.2, AY + 13.2], b = [29.1, AY + 13.2];
      let s = K.wall(a, b, 0, ZW, 'gb', armWall(0, true));
      [0, 5.25, 10.5].forEach(u => { s += lisene(K, a, b, u, 1.3); });
      s += sw(K, a, b, 15.9 - 1.3, 15.9, 0, ZW, 'pl', (len, h) => quoin(len, h, .85));
      s += K.wall(b, [29.1, AY + 11.4], 0, ZW, 'gb', (l, h) => hl(0, l, h - .5) + hl(0, l, h - .95));
      s += K.wall([29.1, AY + 11.4], [31.4, AY + 9.1], 0, ZW, 'gb', (l, h) => hl(0, l, h - .5) + hl(0, l, h - .95) + quoin(.9, h, .85));
      // Traufgesims und flaches Kupferdach, an den Kernblock anlehnend
      s += K.box(13.0, AY + 13.2, ZW - .45, 16.3, .55, .45, 'pl', {}, true);
      s += roofPlane(K, [[13.2, AY + 13.2, ZW], [29.1, AY + 13.2, ZW], [29.1, AY + 9.1, ZW + .7], [13.2, AY + 9.1, ZW + .7]], 'cu', 2.6);
      s += K.face([[29.1, AY + 11.4, ZW], [31.4, AY + 9.1, ZW], [31.4, AY + 9.1, ZW + .7], [29.1, AY + 9.1, ZW + .7]], 'cu');
      return s;
    } });
    add({ id: 'armN', fp: [13.2, AY - 13.2, 29.1, AY - 9.1], draw: K => {
      const a = [29.1, AY - 13.2], b = [13.2, AY - 13.2];
      let s = K.wall(a, b, 0, ZW, 'gb', armWall(0, true));
      s += K.wall([29.1, AY - 9.1], [29.1, AY - 13.2], 0, ZW, 'gb', (l, h) => hl(0, l, h - .5));
      s += roofPlane(K, [[13.2, AY - 13.2, ZW], [29.1, AY - 13.2, ZW], [29.1, AY - 9.1, ZW + .7], [13.2, AY - 9.1, ZW + .7]], 'cu', 2.6);
      return s;
    } });

    /* ---------- Chor (Apsis) im Westen: nur Rückseite, aus Fotos als Putzwand mit Bogenfenstern ---------- */
    add({ id: 'apse', fp: [1.4, AY - 5.6, 13.2, AY + 5.6], draw: K => {
      const w = [[13.2, AY - 5.6], [5.0, AY - 5.6], [1.4, AY - 3.4], [1.4, AY + 3.4], [5.0, AY + 5.6], [13.2, AY + 5.6]];
      let s = '';
      for (let i = 0; i < w.length - 1; i++) {
        const a = w[i + 1], b = w[i];
        s += K.wall(a, b, 0, ZW, 'gb', (len, h) => hl(0, len, h - .5) + hl(0, len, h - .95) + hl(0, len, 1.2) + wins(len > 3 ? winA(len / 2 - .7, 3.4, 1.4, 6.5, 1) : ''));
      }
      s += roofPlane(K, [[1.4, AY - 3.4, ZW], [13.2, AY - 5.6, ZW], [13.2, AY + 5.6, ZW], [1.4, AY + 3.4, ZW]], 'cu', 2.6);
      return s;
    } });

    /* ---------- Glockentürme (Südwest und Nordwest) ---------- */
    const tower = (id, y0) => add({ id, fp: [5.0, y0, 13.2, y0 + 8.8], draw: K => {
      const TZ = 21.4, x0 = 5.0, w = 8.2, d = 8.8, cx = x0 + w / 2, cy = y0 + d / 2;
      const face = len => {
        let q = '';
        for (let y = .85, i = 0; y < TZ; y += .85, i++) { q += `M0 ${f2(y)}h1.05M${f2(len - 1.05)} ${f2(y)}h1.05M${f2(i % 2 ? .5 : .9)} ${f2(y - .85)}V${f2(y)}M${f2(len - (i % 2 ? .5 : .9))} ${f2(y - .85)}V${f2(y)}`; }
        q = line(q) + hl(0, len, .45) + hl(0, len, .75);
        const yb = TZ - 15.2;                                            // Gurtgesims unter der Glockenstube
        q += hl(0, len, yb) + hl(0, len, yb - .35);
        let wn = winA(len / 2 - .55, TZ - 12.4 + 0, 1.1, 3.2, 1, ' dim');
        wn += winA(len / 2 - .55, TZ - 6.3 + 0, 1.1, 2.6, 2, ' dim');
        const lv = (u) => `<path class="dt" d="${arch(u - 1.3, 2.4, 2.6, 5.0)}"/><path class="lv" d="${arch(u - 1.0, 2.7, 2.0, 4.7)}"/>` + [0, 1, 2, 3, 4].map(k => `<path class="dt" d="M${f2(u - .9)} ${f2(3.9 + k * .75)}H${f2(u + .9)}"/>`).join('');
        return q + lv(len * .29) + lv(len * .71) + wins(wn);
      };
      let s = K.box(x0, y0, 0, w, d, TZ, 'gb', { S: (l, h) => face(l), E: (l, h) => face(l), N: (l, h) => face(l), W: (l, h) => face(l) }, false);
      // Gesims, Kupferdach mit Mini-Laterne, Kugel und Kreuz
      s += K.box(x0 - .45, y0 - .45, TZ, w + .9, d + .9, .5, 'pl', {}, true);
      s += hip(K, x0 - .4, y0 - .4, x0 + w + .4, y0 + d + .4, TZ + .5, TZ + 1.7, 'cu');
      s += lathe(K, cx, cy, [[TZ + 1.9, 1.1], [TZ + 3.1, 1.0], [TZ + 3.4, 1.15], [TZ + 4.1, .9], [TZ + 4.9, .3]], 'cu', 3, [1]);
      const bp = K.P(cx, cy, TZ + 5.15);
      s += `<circle class="cu" cx="${f2(bp[0])}" cy="${f2(bp[1])}" r=".3"/>` + line(K.path([[cx, cy, TZ + 5.3], [cx, cy, TZ + 6.6]]) + K.path([[cx - .45, cy, TZ + 6.0], [cx + .45, cy, TZ + 6.0]]));
      return s;
    } });
    tower('towerS', AY + 6.0);
    tower('towerN', AY - 14.8);
    // Mini-Häuschen am Fuß des Südturms (Foto a_2/a_3), mit Satteldach
    add({ id: 'hut', fp: [13.2, AY + 13.2, 15.2, AY + 15.0], draw: K => K.box(13.4, AY + 13.2, 0, 1.8, 1.8, 2.6, 'pl', { S: (l, h) => hl(0, l, .4) }, false)
      + K.face([[13.4, AY + 13.2, 2.6], [13.4, AY + 15.0, 2.6], [14.3, AY + 15.0, 3.5], [14.3, AY + 13.2, 3.5]], 'sl') + K.face([[15.2, AY + 13.2, 2.6], [14.3, AY + 13.2, 3.5], [14.3, AY + 15.0, 3.5], [15.2, AY + 15.0, 2.6]], 'sl')
      + K.wall([13.4, AY + 15.0], [15.2, AY + 15.0], 2.6, 2.61, 'pl', () => `<path class="pl fr" d="M0 0L.9 -.9L1.8 0Z"/>`) });

    /* ---------- Tambour, Kuppel, Laterne ---------- */
    add({ id: 'dome', above: 'cross', fp: [13.3, AY - 9.0, 31.4, AY + 9.0], draw: K => {
      const [cx, cy] = DC, R = 7.4, Z1 = ZC, Z2 = 26.0, z3 = 26.9;
      let s = lathe(K, cx, cy, [[Z1, R + .35], [Z1 + .7, R + .35], [Z1 + .9, R]], 'pl', 0) + lathe(K, cx, cy, [[Z1 + .9, R], [Z2, R]], 'pl', 0);
      // acht Fensterpaare in Bogenblenden, jeweils auf den Achsen (Foto n01: Paar mittig zur Hauptachse)
      for (let k = 0; k < 8; k++) {
        const a0 = k * Math.PI / 4, ca = Math.cos(a0), sa = Math.sin(a0);
        if (K.facing(ca, sa) <= .05) continue;
        const o = [cx + R * ca + 1.95 * sa, cy + R * sa - 1.95 * ca];       // Anfang der Blende (tangential −1,95 m)
        s += K.g(K.plane([o[0], o[1], Z2 - 1.1], [-sa, ca, 0], [0, 0, -1]),
          `<path class="dt" d="${arch(0, 0, 3.9, 5.9)}"/>` + wins(winA(.45, .55, 1.2, 4.7, 3, ' hi') + winA(2.25, .55, 1.2, 4.7, 3, ' hi')) + line('M1.95 .6V5.9'));
      }
      // Kranzgesims unter der Kuppel
      s += lathe(K, cx, cy, [[Z2, R + .5], [Z2 + .45, R + .8], [z3, R + .45]], 'pl', 0);
      // Kupferkuppel (leicht überhöht) mit dichten Rippen
      const prof = [[z3, R + .05], [z3 + .5, R - .1], [z3 + 1.5, R - .55], [z3 + 2.8, R - 1.4], [z3 + 4.2, R - 2.6], [z3 + 5.5, R - 4.2], [z3 + 6.6, R - 5.8], [z3 + 7.4, R - 7.0]];
      s += lathe(K, cx, cy, prof, 'cu', 20);
      // Laterne: Sockel, offene Arkadenlaterne (leuchtet), Gesims, geschweifte Haube, Kugel, Kreuz
      const zl = z3 + 7.3;
      s += lathe(K, cx, cy, [[zl - .1, 2.9], [zl + .3, 3.0], [zl + .8, 2.5]], 'cu', 0);
      s += `<g class="lant-h" filter="url(#bloom)">${lathe(K, cx, cy, [[zl + .8, 2.7], [zl + 4.4, 2.7]], '')}</g>`;
      s += lathe(K, cx, cy, [[zl + .8, 2.2], [zl + 4.4, 2.2]], 'lant', 8);
      s += lathe(K, cx, cy, [[zl + 4.4, 2.85], [zl + 4.75, 2.7], [zl + 5.2, 2.2], [zl + 5.9, 1.55], [zl + 6.8, 1.05], [zl + 7.9, .7], [zl + 9.1, .45], [zl + 10.3, .25]], 'cu', 4);
      const bz = zl + 10.7, bp = K.P(cx, cy, bz);
      s += `<circle class="cu" cx="${f2(bp[0])}" cy="${f2(bp[1])}" r=".55"/>` + line(K.path([[cx, cy, bz + .5], [cx, cy, bz + 3.0]]) + K.path([[cx - .6, cy, bz + 2.2], [cx + .6, cy, bz + 2.2]]));
      // vordere Eckfiguren (stehen vor dem Tambour)
      s += statue(K, 30.0, AY + 8.2) + statue(K, 30.0, AY - 8.2) + statue(K, 40.4, AY + 7.3) + statue(K, 40.4, AY - 7.3);
      return s;
    } });

    return { mods: M, lc: [21.9, AY], z0: 0, top: [22, AY, 50], label: 'Basilika St. Clemens', h: 47, len: 41 };
  });
})();
