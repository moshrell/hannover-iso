/* Marktkirche St. Georgii et Jacobi (Hannover, Backsteingotik, 14. Jh.) – Modul v3 nach Kadern Google Earth (ref/marktkirche/foto/v_01…v_09); v3: Westportal + Westfenster, Westgiebel des Langhauses, Nordseite (Dach, Strebepfeiler), Turmdächer in Kupfer, Sortierung für gedrehte Karte (card_phi 270)
   Lokales System = Mindestrechteck des OSM-Umrisses (w5121355), 66,3 × 31,1 m: lokal +x nach Osten (Chor), Westturm bei kleinem x, +y nach Süden.
   Grundriss (OSM): Westturm x 1,8…15,7 / y 8,1…23,5 (13,9 × 15,4 m, mittig zur Kirchenachse y = 15,65), dreischiffige Halle x 15,7…58,2 / y 2,3…29,0
   mit fünf Strebepfeilern je Langseite (Abstand ≈ 7,3 m, 6 Joche), Chor als 5-seitiger Polygonschluss der Mittelschiffbreite (bis x ≈ 64,3), die Seitenschiffe enden
   mit geraden Wänden bei x = 58,2.
   Nach den Kadern: ein riesiges, sehr steiles Satteldach (rote Ziegel) über allen drei Schiffen; im Osten läuft es als vielflächiger Walm um den Chorschluss.
   Langseiten: hohe Spitzbogenfenster zwischen Strebepfeilern mit grünen Kupferabdeckungen. Turm: dunkler Backstein, drei schmale Schallöffnungen je Seite,
   vier Giebel mit Kreuzdach, darüber ein schlanker, kupfergedeckter Spitzhelm (grün patiniert, Spitze ≈ 97,7 m). Nicht auf den Kadern erkennbar und deshalb weggelassen: Dachreiter. */
(() => {
  const Z0 = 1;
  ISO.landmark('marktkirche', H => {
    const { f2, hl, vl, winG, wins, garch, louvre, groupM, clockSVG, star, lathe, roofPlane } = H, M = [], add = m => (M.push(m), m);
    const bk = q => groupM('bk', q);
    // ---------- Maße (absolute Höhe: Gelände z = 1) ----------
    const HW = 17, EA = Z0 + HW;                       // Traufe der Schiffe
    const RG = Z0 + 43;                                // First (steiles Dach, ≈ 60°)
    const YM = 15.65;                                  // Kirchenachse
    const NX0 = 15.7, NX1 = 58.2, NY0 = 2.3, NY1 = 29.0;   // Halle
    const TX0 = 1.8, TX1 = 15.7, TY0 = 8.1, TY1 = 23.5;    // Turm
    const TZ = 57, GH = 14, CX = (TX0 + TX1) / 2, CY = (TY0 + TY1) / 2;   // Turmschaft (Oberkante), Giebelhöhe, Turmmitte
    const XR = 60.5;                                   // Ostende des Firstes
    const AP = [[58.2, 8.6], [61.6, 10.3], [64.3, 13.9], [64.3, 17.4], [61.6, 21.0], [58.2, 22.7]];   // Chorpolygon (A…F)

    // ---------- Turm ----------
    // Spitzbogen (gleichseitig): Fußlinie yb, Kämpfer ys, Breite w, links x
    const pointed = (x, yb, w, ys) => `M${f2(x)} ${f2(yb)}V${f2(ys)}A${f2(w)} ${f2(w)} 0 0 1 ${f2(x + w / 2)} ${f2(ys - w * .866)}A${f2(w)} ${f2(w)} 0 0 1 ${f2(x + w)} ${f2(ys)}V${f2(yb)}Z`;
    // Westportal: dreifach gestufter Spitzbogen aus Backstein, dunkle Laibung, zweiflügelige Bronzetür (Gerhard Marcks), Stufen davor (eigener Baukörper)
    const portal = (cx, h) => {
      let q = '';
      [[5.8, 4.5], [4.8, 4.0], [3.8, 3.5]].forEach(([w, ys], i) => { q += `<path class="${i === 2 ? 'lv' : 'dt'}" d="${pointed(cx - w / 2, h, w, h - ys)}"/>`; });
      q += `<path class="dt" d="${pointed(cx - 3.55, h, 7.1, h - 4.9)}"/>`;                                       // Wimperg-/Schlussring über dem Portal
      const door = `<path class="brz" d="${pointed(cx - 1.55, h, 3.1, h - 3.3)}"/><path class="dt" d="M${f2(cx)} ${f2(h)}V${f2(h - 3.3 - 1.1)}M${f2(cx - 1.55)} ${f2(h - 1.1)}H${f2(cx + 1.55)}M${f2(cx - 1.55)} ${f2(h - 2.2)}H${f2(cx + 1.55)}M${f2(cx - 1.55)} ${f2(h - 3.3)}H${f2(cx + 1.55)}"/>`;
      return { q, door };
    };
    const shaft = (sh, side) => (len, h) => {
      let q = '';
      for (let v = 0, i = 0; v < h - .5; v += 1.6, i++) { const w = i % 2 ? .7 : 1.3; q += `<rect class="st ${sh}" x="0" y="${f2(v)}" width="${w}" height="1.6"/><rect class="st ${sh}" x="${f2(len - w)}" y="${f2(v)}" width="${w}" height="1.6"/>`; }
      q += hl(0, len, h - 1.4) + hl(0, len, h - 3.2) + hl(0, len, h - 24.5) + hl(0, len, h - 38.5) + hl(0, len, h - 41.5) + hl(0, len, h - 55);   // Sockel + Gurte
      let w = '', door = '';
      // Schallgeschoss: drei schmale Öffnungen mit Jalousie, Mittelgeschoss: ein Fenster, unten ein schmaler Schlitz
      [.3, .5, .7].forEach((t, i) => { q += louvre(len * t - .85, h - 52 + (i === 1 ? 0 : .8), 1.7, 8 - (i === 1 ? 0 : .8)); });
      w += winG(len / 2 - .7, h - 34, 1.4, 6, 1, ' dim');
      if (side === 'W') {                                                                                         // Westseite: Portal, darüber hohes Spitzbogenfenster (Mittelachse)
        const p = portal(len / 2, h); q += p.q; door = p.door;
        q += `<path class="dt" d="${garch(len / 2 - 2.0, h - 25.4, 4.0, 12.6)}"/>`;
        w += winG(len / 2 - 1.5, h - 25, 3.0, 11.2, 1, ' dim');
      } else w += winG(len / 2 - .7, h - 20, 1.4, 5, 0, ' dim');
      return bk(q) + wins(w) + door;
    };
    add({ id: 'mkTower', fp: [TX0, TY0, TX1, TY1], parent: 'mkNave', side: 'W', draw: K => {
      let s = K.box(TX0, TY0, Z0, TX1 - TX0, TY1 - TY0, TZ - Z0, 'bk', { S: shaft('fr', 'S'), E: shaft('sd', 'E'), N: shaft('fr', 'N'), W: shaft('sd', 'W') }, false);
      // Strebepfeiler an Nord- und Südseite des Turms (OSM: zwei je Seite)
      [6.1, 13.1].map(x => ({ x, d: K.depth(x, TY1 + .85) })).sort((a, b) => a.d - b.d).forEach(({ x }) => {
        s += K.box(x - .8, TY1, Z0, 1.6, 1.7, 33, 'bk', { S: l => bk(hl(0, l, 9) + hl(0, l, 18)) });
        s += K.face([[x - .8, TY1, Z0 + 34.6], [x + .8, TY1, Z0 + 34.6], [x + .8, TY1 + 1.7, Z0 + 33], [x - .8, TY1 + 1.7, Z0 + 33]], 'cu');
        s += K.face([[x + .8, TY1, Z0 + 34.6], [x + .8, TY1, Z0 + 33], [x + .8, TY1 + 1.7, Z0 + 33]], 'cu');
        s += K.face([[x - .8, TY1, Z0 + 34.6], [x - .8, TY1, Z0 + 33], [x - .8, TY1 + 1.7, Z0 + 33]], 'cu');
      });
      // Giebel (Kadern v_04 Ost, v_06/v_08 Nord, v_05 West): Pentagramm im Ring, darüber ein kleines Kreuz, zwei Schlitze (Ost); Uhren sind auf keinem Kader zu sehen
      const gab = (len, sh, slits) => () => groupM('bk', `<path class="bk ${sh}" d="M0 0L${f2(len / 2)} ${-GH}L${f2(len)} 0Z"/>${hl(.6, len - .6, -.5)}<path class="dt cu-d" d="M0 0L${f2(len / 2)} ${-GH}L${f2(len)} 0"/>`
        + vl(len / 2, -GH, -GH - 1.3) + hl(len / 2 - .45, len / 2 + .45, -GH - .8) + star(len / 2, -5.4, 2.1, 5)
        + (slits ? `<path class="lv" d="${garch(len / 2 - 1.5, -10.6, .6, 1.6)}"/><path class="lv" d="${garch(len / 2 + .9, -10.6, .6, 1.6)}"/>` : ''));
      const sLen = TX1 - TX0, eLen = TY1 - TY0;
      s += K.wall([TX0, TY1], [TX1, TY1], TZ, TZ + .01, 'bk', gab(sLen, 'fr', false));    // Süd (nicht auf den Kadern erkennbar, nach Analogie)
      s += K.wall([TX1, TY1], [TX1, TY0], TZ, TZ + .01, 'bk', gab(eLen, 'sd', true));     // Ost
      s += K.wall([TX1, TY0], [TX0, TY0], TZ, TZ + .01, 'bk', gab(sLen, 'fr', false));    // Nord
      s += K.wall([TX0, TY0], [TX0, TY1], TZ, TZ + .01, 'bk', gab(eLen, 'sd', false));    // West (auf v_05 schwach erkennbar)
      // Kreuzdach zwischen den vier Giebeln
      const c = [[TX0, TY0], [TX1, TY0], [TX1, TY1], [TX0, TY1]], m = [[CX, TY0], [TX1, CY], [CX, TY1], [TX0, CY]], O = [CX, CY, TZ + GH], faces = [];
      for (let i = 0; i < 4; i++) { const ci = [...c[i], TZ], mA = [...m[(i + 3) % 4], TZ + GH], mB = [...m[i], TZ + GH]; faces.push([ci, mA, O], [ci, O, mB]); }
      faces.map(f => ({ f, d: f.reduce((a, p) => a + K.depth(p[0], p[1]), 0) })).sort((a, b) => a.d - b.d).forEach(({ f }) => { s += K.face(f, 'cu'); });
      // schlanker Kupfer-Spitzhelm (achteckig durch Rippen), Spitze ≈ 97,7 m über dem Gelände
      s += lathe(K, CX, CY, [[TZ + GH - 1.5, 3.4], [TZ + GH + 4, 2.8], [TZ + GH + 12, 1.7], [TZ + GH + 21, .8], [98.6, .12]], 'cu', 4, [0]);
      return s + `<path class="dt cu-d" d="${K.path([[CX, CY, 98.4], [CX, CY, 100.4]])}"/><path class="dt cu-d" d="${K.path([[CX - .5, CY, 99.6], [CX + .5, CY, 99.6]])}"/>`;
    } });

    // ---------- Halle: Langseiten mit hohen Spitzbogenfenstern, Strebepfeiler, steiles Dach ----------
    const BAYS = [3.7, 11.0, 18.4, 25.8, 33.2, 39.8];          // Fenstermitten (u ab x = 15,7)
    const side = (len, h) => {
      let q = hl(0, len, h - 1.0) + hl(0, len, h - 2.6) + hl(0, len, 1.2) + hl(0, len, 2.2), w = '';
      BAYS.forEach((u, i) => { const ww = i === 5 ? 3.0 : 3.8; w += winG(u - ww / 2, h - 15.0, ww, 11.6, 1, ' dim'); q += `<path class="dt" d="${garch(u - ww / 2 - .5, h - 15.4, ww + 1, 12.2)}"/>`; });
      return bk(q) + wins(w);
    };
    const endW = (len, h) => {                                    // Ostwand (Seitenschiffenden): je ein Fenster
      let q = hl(0, len, h - 1.0) + hl(0, len, 1.2), w = '';
      [3.0, len - 3.0].forEach(u => { w += winG(u - 1.3, h - 14.4, 2.6, 11, 1, ' dim'); });
      return bk(q) + wins(w);
    };
    const roofHip = K => {
      const R = [XR, YM, RG], P = (x, y) => [x, y, EA];
      let s = roofPlane(K, [[NX1, NY1, EA], [NX0, NY1, EA], [NX0, YM, RG], [XR, YM, RG]], 'tl', 2.8);   // Südfläche (Trapez)
      s += roofPlane(K, [[NX1, NY0, EA], [NX0, NY0, EA], [NX0, YM, RG], [XR, YM, RG]], 'tl', 2.8);      // Nordfläche (nur bei gedrehter Karte sichtbar)
      // Walmflächen um das Chorpolygon (A…F) zum Firstende R; die Randflächen an der Linie x = 58,2 liegen im Dachinneren und entfallen
      const tri = AP.slice(0, -1).map((p, i) => [P(...p), P(...AP[i + 1]), R]);
      // Eckfüllungen zwischen Walmlinie und Chorpolygon (sonst klafft von Südosten ein Loch im Dach); liegen von der Gegenseite unter der Dachfläche und werden zuerst gezeichnet
      const fill = pts => `<path class="tl sd" d="${K.path(pts)}Z"/>`;
      let hs = fill([[NX1, NY1, EA], P(...AP[5]), R]) + fill([[NX1, NY0, EA], P(...AP[0]), R]);
      tri.map(f => ({ f, d: f.reduce((a, p) => a + K.depth(p[0], p[1]), 0) })).sort((a, b) => a.d - b.d).forEach(({ f }) => { hs += K.face(f, 'tl'); });
      return hs + s;
    };
    // Strebepfeiler: Seite = 'S' (y = NY1, nach Süden) oder 'N'; von hinten nach vorn sortiert (Drehung der Karte)
    const buttress = (K, x, y0, dir, sd) => {
      const yo = y0 + dir * 1.7, ya = Math.min(y0, yo), top = Z0 + HW - 2.5;
      let s = K.box(x - .8, ya, Z0, 1.6, 1.7, HW - 2.5, 'bk', { [sd]: (l, h) => bk(hl(0, l, 4.5) + hl(0, l, 9.5)) });
      s += K.face([[x - .8, y0, Z0 + HW - .8], [x + .8, y0, Z0 + HW - .8], [x + .8, yo, top], [x - .8, yo, top]], 'cu');
      s += K.face([[x + .8, y0, Z0 + HW - .8], [x + .8, y0, top], [x + .8, yo, top]], 'cu');
      s += K.face([[x - .8, y0, Z0 + HW - .8], [x - .8, y0, top], [x - .8, yo, top]], 'cu');
      return s;
    };
    add({ id: 'mkNave', fp: [NX0, NY0, NX1, NY1], draw: K => {
      let s = K.box(NX0, NY0, Z0, NX1 - NX0, NY1 - NY0, HW, 'bk', { S: side, N: side, E: endW, W: endW }, false);
      // Westgiebel des Langhauses (links und rechts neben dem Turm sichtbar): Backsteinfläche mit Gurten
      let gl = '';
      [6, 12, 18].forEach(dz => { const t = dz / (RG - EA), a = YM - (YM - NY0) * (1 - t), b = YM + (NY1 - YM) * (1 - t); gl += `<path class="dt" d="${K.path([[NX0, a, EA + dz], [NX0, b, EA + dz]])}"/>`; });
      s += K.face([[NX0, NY1, EA], [NX0, NY0, EA], [NX0, YM, RG]], 'bk', groupM('bk', gl));
      // Strebepfeiler (OSM) mit grüner Kupferabdeckung, beide Langseiten
      const bx = [15.3, 23.15, 30.35, 37.9, 45.1, 52.7, 57.8];
      [...bx.map(x => ({ x, y: NY1, dir: 1, sd: 'S' })), ...bx.map(x => ({ x, y: NY0, dir: -1, sd: 'N' }))]
        .map(b => ({ b, d: K.depth(b.x, b.y + b.dir * .85) })).sort((a, c) => a.d - c.d).forEach(({ b }) => { s += buttress(K, b.x, b.y, b.dir, b.sd); });
      return s + roofHip(K);                                       // Dach zuletzt: verdeckt die abgewandte Seite (Nordstrebepfeiler)
    } });
    // Stufen vor dem Westportal (eigener Baukörper, damit die Sortierung bei gedrehter Karte stimmt)
    add({ id: 'mkSteps', fp: [TX0 - 2.8, CY - 5.4, TX0, CY + 5.4], parent: 'mkTower', side: 'W', draw: K => K.box(TX0 - 2.8, CY - 5.4, Z0, 1.4, 10.8, .18, 'st') + K.box(TX0 - 1.4, CY - 4.6, Z0, 1.4, 9.2, .4, 'st') });
    // ---------- Chor: fünf Seiten, hohe Fenster, Strebepfeiler an den Ecken, Walm des steilen Daches ----------
    add({ id: 'mkChoir', fp: [NX1, 8.6, 64.4, 22.7], parent: 'mkNave', side: 'E', draw: K => {
      let s = '';
      const segs = AP.slice(0, -1).map((p, i) => ({ L: AP[i + 1], R: p })).map(w => ({ ...w, d: K.depth(...w.L) + K.depth(...w.R) })).sort((a, b) => a.d - b.d);
      segs.forEach(w => { s += K.wall(w.L, w.R, Z0, EA, 'bk', (len, h) => bk(hl(0, len, h - 1.0) + hl(0, len, 1.2) + `<path class="dt" d="${garch(len / 2 - 1.55, h - 15.0, 3.1, 12.4)}"/>`) + wins(winG(len / 2 - 1.2, h - 14.6, 2.4, 11.4, 1, ' hi'))); });
      AP.slice(1, -1).map(p => ({ p, d: K.depth(p[0], p[1]) })).sort((a, b) => a.d - b.d).forEach(({ p }) => {
        const bd = (l, h) => bk(hl(0, l, 4.5) + hl(0, l, 9.5));
        s += K.box(p[0] - .65, p[1] - .65, Z0, 1.3, 1.3, HW - 2.5, 'bk', { S: bd, E: bd, N: bd, W: bd });
        s += K.face([[p[0] - .65, p[1] - .65, Z0 + HW - 2.5], [p[0] + .65, p[1] - .65, Z0 + HW - 2.5], [p[0] + .65, p[1] + .65, Z0 + HW - 2.5], [p[0] - .65, p[1] + .65, Z0 + HW - 2.5]], 'cu');
      });
      return s;
    } });
    // Punkt mittig über dem Baukörper (Mitte von Turm + Halle + Chor), knapp über dem First – nicht über der Turmspitze am Westrand
    return { mods: M, lc: [33, 15.6], z0: 0, top: [CX, CY, 99], pin: [33, 15.65, 47], label: 'Marktkirche', h: 99, len: 66.3 };
  });
})();
