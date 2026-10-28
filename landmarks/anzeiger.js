/* Anzeiger-Hochhaus Hannover (Fritz Höger, 1927–28) – Modul. Lokal: x ≈ Süd (lange Achse), y ≈ West, z Höhe, Gelände z = 1.
   Grundriss aus dem OSM-Umriss (way 304133007): Ostriegel x 0–32,3 × y 0–14,2 (lange Fassade zur Goseriede) und Westvorbau x 4,9–26,9 × y 14,2–23,6 (Westfassade mit der Schrift ANZEIGER).
   Dunkler Klinker mit Pfeilern, schmale Fenster dazwischen, Arkadengeschoss, oben Schlitzfenster unter dem Gesims; darüber die grüne Kupferkuppel (ehem. Planetarium).
   Im Abendlicht leuchten Schrift, Schlitzfenster und Pfeilerbänder (Vorbild: Nachtfoto in ref/anzeiger/foto/). Im festen Blickwinkel (aus Südosten) sind Ost- und Südfassade sichtbar,
   die Westfassade mit der Schrift nur in der Detailkarte (Studio). Höhen aus den Kadern geschätzt, siehe ref/anzeiger/README.md. */
(() => {
  const Z0 = 1;
  ISO.landmark('anzeiger', H => {
    const { f2, hl, winR, winG, wins, lathe, groupM } = H, M = [], add = m => (M.push(m), m);
    const PITCH = 2.3;                                    // Pfeilerabstand
    const HT = 39;                                        // Traufe (Oberkante Gesims) über Gelände: Gesamthöhe 51 m (structurae, archiweb, Aurubis) – Kuppel 12 m = 39 m bis Gesims
    const MX1 = 32.3, MY1 = 14.2, WX0 = 4.9, WX1 = 26.9, WY1 = 23.6;   // Ostriegel (y 0–MY1) / Westvorbau (y MY1–WY1)
    const DCX = MX1 / 2, DCY = WY1 / 2, DR = 9.0, DH = 12;   // Kuppelmitte, -radius (Ø ≈ 18 m ≈ 0,8 × Breite der Schriftfassade, Nachtfoto) und -höhe (12 m)

    /* ---------- Fassade (Wandkoordinaten: u entlang, y von der Oberkante nach unten) ---------- */
    const bays = len => { const a = [], n = Math.max(1, Math.round(len / PITCH)), p = len / n; for (let i = 0; i < n; i++) a.push([i * p, p]); return a; };
    const facade = (len, h, letters) => {
      let q = hl(0, len, .5) + hl(0, len, 8.4) + hl(0, len, h - 5.4), w = '', led = '';
      const rows = Math.floor((h - 8.4 - 6.4) / 3.3);
      bays(len).forEach(([u, p], i) => {
        if (i) q += `<path class="dt" d="M${f2(u - .42)} 1V${f2(h - .6)}M${f2(u + .42)} 1V${f2(h - .6)}"/>`;                       // Pfeiler (zwei Kanten)
        w += `<rect class="wn hi" data-f="4" x="${f2(u + p / 2 - .17)}" y="3.9" width=".34" height="3.6"/>`;                      // Schlitzfenster unter dem Gesims
        for (let r = 0; r < rows; r++) w += winR(u + .6, 9.3 + r * 3.3, p - 1.2, 2.2, Math.min(4, 1 + Math.floor(r / 3)));       // Fensterreihen
        w += winG(u + .55, h - 5, p - 1.1, 4.5, 0, ' off');                                                                      // Arkadengeschoss unten
        if (i) led += `<rect class="wn hi" data-f="4" x="${f2(u - .05)}" y="1" width=".1" height="${f2(h - 6)}"/>`;               // Leuchtbänder an den Pfeilern (Nachtfoto)
      });
      let s = groupM('bk', q) + wins(w + led);
      if (letters) s += `<g class="wins"><text class="wn hi" data-f="4" x="${f2(len * .12)}" y="3.2" font-size="2.6" font-weight="700" font-family="Arial,Helvetica,sans-serif" textLength="${f2(len * .76)}" lengthAdjust="spacing">ANZEIGER</text></g>`;
      return s;
    };
    // spitze Pfeilerköpfe auf dem Gesims
    const crown = len => { let s = ''; bays(len).forEach(([u], i) => { if (i) s += `<path class="bk fr" d="M${f2(u - .38)} 0V-1L${f2(u)} -1.9L${f2(u + .38)} -1V0Z"/>`; }); return s; };

    /* ---------- Westvorbau (hinten) und Ostriegel (vorn), beide bis zur Traufe ---------- */
    add({ id: 'azBody', fp: [0, 0, MX1, WY1], draw: K => {
      const f = l => facade(l, HT, false);
      const west = () => K.box(WX0, MY1, Z0, WX1 - WX0, WY1 - MY1, HT, 'bk', { N: f, E: f, W: f, S: l => facade(l, HT, true) }, true);   // S = Westfassade: Schrift
      const east = () => K.box(0, 0, Z0, MX1, MY1, HT, 'bk', { N: f, E: f, S: f, W: f }, true);
      let s = K.view[1] > 0 ? east() + west() : west() + east();                                                                             // je nach Blickrichtung: was weiter hinten liegt, zuerst
      s += K.wall([MX1, 0], [MX1, MY1], Z0 + HT, Z0 + HT + .01, 'bk', crown) + K.wall([MX1, MY1], [0, MY1], Z0 + HT, Z0 + HT + .01, 'bk', crown);
      return s;
    } });

    /* ---------- Kuppel: überhöhte Halbkugel (12 m hoch, Ø ≈ 18 m) mit Rippen, Fugenringen und kleiner Laterne ---------- */
    add({ id: 'azDome', fp: [0, 0, MX1, WY1], above: 'azBody', draw: K => {
      const zk = Z0 + HT, prof = []; for (let i = 0; i <= 14; i++) { const t = i / 14; prof.push([zk + DH * Math.sin(t * Math.PI / 2), DR * Math.cos(t * Math.PI / 2) + .1]); }
      let s = lathe(K, DCX, DCY, prof, 'cu', 12, []);
      // Fugenringe: sichtbare Hälfte, an Lücken unterbrochen (keine Sehne quer über die Kuppel)
      [3, 6, 9].forEach(i => {
        const [z, r] = prof[i]; let seg = [], d = '';
        for (let j = 0; j <= 72; j++) { const a = Math.PI * 2 * j / 72; if (K.facing(Math.cos(a), Math.sin(a)) > .02) seg.push([DCX + r * Math.cos(a), DCY + r * Math.sin(a), z]); else { if (seg.length > 1) d += K.path(seg); seg = []; } }
        if (seg.length > 1) d += K.path(seg);
        s += `<path class="dt cu-d" d="${d}"/>`;
      });
      s += lathe(K, DCX, DCY, [[zk + DH - .2, 1.5], [zk + DH + .9, 1.3]], 'cu', 0, []);   // Laterne auf dem Scheitel
      return s;
    } });

    return { mods: M, lc: [MX1 / 2, WY1 / 2], z0: 0, top: [DCX, DCY, Z0 + HT + DH + 1], label: 'Anzeiger-Hochhaus', h: 51, len: 32.3, pin: [DCX, DCY, Z0 + HT + DH + 5] };
  });
})();
