# Georgenpalais — Bericht (Branch `lm/georgenpalais`)

**Gemacht:** neues Gebäude `landmarks/georgenpalais.js` + `landmarks/meta/georgenpalais.json` (OSM w5121415). Ein Modul: zwei Flügel + Mitteltrakt, Mittelrisalit (Süd 2,5 m / Nord 1,5 m) mit Quer-Walmdächern, höheres Mitteldach, Gauben (nur Südhänge gezeichnet), Schornsteine, Freitreppe an der Nordseite, kleiner Anbau am Ostende.

## Seite → Kadr
| Seite | Kadr |
|---|---|
| Süd (Gartenseite, in der Kartenansicht vorn) | v_06, v_07 |
| Ost | v_07 |
| Nord (Hofseite) | v_01, v_02, v_08 |
| West | v_03, v_04, v_05 |

## Nach Analogie / nicht belegt
- Fensterzahl je Achse und Gewände nur grob (ein Rhythmus für alle Seiten); Türen der Flügel nicht gezeichnet.
- Nordseite aus SO nicht sichtbar → Nordgauben bewusst weggelassen (würden über dem First schweben, weil das Skript nicht verdeckt).
- Ostanbau und Westende nach Luftbild geschätzt; Festzelt östlich nicht gezeichnet.
- Höhen aus Kadern geschätzt (OSM height=10 passt nicht zum Dach).
- Lage der Hofseite (Nord): aus v_01 (Blick 180°) abgeleitet; Meta `face` = Norden.

## Fakten (zwei Quellen)
1780–82 für Graf von Wallmoden-Gimborn gebaut, 1817 von Georg III. gekauft; heute Wilhelm-Busch-Museum (visit-hannover, Wikipedia «Georgengarten»). Die niedrigeren Flügel von 1826 (Laves) laut Wikipedia. Bauzeit der Gliederung (welcher Teil 1826) nicht anhand der Kader geprüft.

## Sichtprüfung
`vergleich-1…3.png` (links Studio, Mitte v_07, rechts v_06): Gliederung, Dachmassen, Risalit stimmen; Rest sind Gewände/Gaubenformen. `telefon-390.png`: Gebäude passt (≈ 366 px) ins Bild. `preview.sh` (Karte) nicht gemacht: Karte ist in dieser Umgebung nicht rendbar (SCENE.region fehlt im Skript, siehe lm/telemax-Bericht).

## Für Sammler
- Kein neues Material in `core/` nötig. Gebäude liegt im Kernbereich (52.3842, 9.7078).
- Hinweis wie bei Telemax: `tools/*` suchen Chromium 1194 (jetzt 1243), `map-crop.mjs` ohne `SCENE.region`.
