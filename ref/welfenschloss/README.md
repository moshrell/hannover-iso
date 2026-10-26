# Welfenschloss v3 — Bericht

## Was gezeichnet ist
`landmarks/welfenschloss.js`, komplett neu nach OSM-Grundriss (r2743600) und den Kadern: Hauptbau 73–222 × 23–91 m in drei Teile gegliedert — niedrige Flügel (11 m) mit drei Innenhöfen (OSM-Löcher), hoher Mittelbau (20 m) mit Ringdach um den Lichthof (Backsteinschacht + Glasdach), vier Ecktürme am Mittelbau (nur der rechts in der Mitte mit Spitzhelm), Mittelturm vor der Südfront (Zinnenkranz, vier Ecktürmchen), Portalvorbau mit drei Bögen und zwei Löwen, Westflügel und Westende, Nordost-Anbau mit Hof, drei Bäume. Höhe Mittelturm ≈ 44 m über Gelände. Karte und Studio zeigen dieselbe Ansicht; Platzierung auf der Karte stimmt mit dem OSM-Umriss (len 240).

## Seite → Kader
Süd: v_21, v_16 · Dach/Lichthof/Türme: v_21, v_28 · Ost/West/Nord: nur grob (siehe INDEX.md).

## Vergleiche
`vergleich-1.png` (Studio ↔ v_21), `vergleich-2.png` (Studio ↔ v_28), `vergleich-3.png` (Karte ↔ v_16).

## Nach Analogie / vereinfacht
- Ringdach als flache Schrägen (echt: steile Walmdächer mit Gauben), Flügeldächer flach.
- Turmhelm als Kegel (echt: achteckig); die Stellung der Ecktürme (Mitte/hinten) nach v_21, Position des Spitzhelmturms (rechts Mitte) aus nur einem Kader.
- Fassaden von Ost, West und Nord verallgemeinert; Innenhöfe unbeleuchtet.
- Lage des Lichthofs (126–169 × 36–64) geschätzt; er ist in OSM kein eigenes Loch.

## Nicht geprüft
- Gesamthöhe ≈ 40 m (Auftrag): in zwei Quellen (en.wikipedia, hannover.de) keine Höhenangabe; Wert bleibt Schätzung.
- Architekt: beide Quellen nennen **Christian Heinrich Tramm** (Bau 1857–1866, Georg V.; nach Tramms Tod Eduard Heidelberg) — die alten Texte mit Conrad Wilhelm Hase sind ersetzt (meta/welfenschloss.json).

## Für Builder/Core
Nichts Neues nötig; `face` nicht gesetzt (Mindestrotation passt). Meta-Felder `fact`, `studio`, `h` aktualisiert.

Quellen: [Wikipedia](https://en.wikipedia.org/wiki/Welfenschloss), [hannover.de](https://www.hannover.de/Kultur-Freizeit/Geschichte-Geschichten/Historische-Bauten/Welfenschloss), OSM-Mitwirkende (ODbL).
