# Очередь зданий

Таблицу читает `tools/queue.py`. Статус здесь ставит сборщик (главный чат), агенты его не правят:
- `ready` — материал есть, можно брать;
- `wartet` — ждёт материал от Степана;
- `fertig` — сделано и влито в `main`;
- `manuell` — Степан уже ведёт это здание вручную в своём чате (ветки ещё может не быть), `claim` его не берёт.

«Занято» определяется не этой таблицей, а наличием ветки `lm/<id>` в репозитории: её создаёт команда `python3 tools/queue.py claim` (создание ветки атомарно, два агента не возьмут одно здание). Порядок строк = приоритет.

| id | статус | что это |
|---|---|---|
| nordlb | fertig | NORD/LB (стеклянная башня и квартал), v1 в mitte2.js |
| marktkirche | fertig | Marktkirche, v1 в altstadt.js |
| altesRathaus | fertig | Altes Rathaus, v1 в altstadt.js |
| leineschloss | fertig | Leineschloss / Landtag (файл Степана назывался votum) |
| heinzvonheidenarena | fertig | стадион Hannover 96 (бывш. HDI-Arena) |
| aegidienkirche | fertig | Aegidienkirche (руина-мемориал), v1 в mitte.js |
| neustaedter | fertig | Neustädter Hof- und Stadtkirche, v1 в mitte2.js |
| gartenkirche | fertig | Gartenkirche St. Marien, новое |
| vwtower | fertig | VW-Tower (старая радиобашня), новое |
| heizkraftwerklinden | fertig | Heizkraftwerk Linden, новое |
| telemax | fertig | Telemax (282 м, вне зоны плиток), новое |
| landesmuseum | fertig | Landesmuseum, v2 → доработка по кадрам |
| welfenschloss | fertig | Welfenschloss, v2 → доработка по кадрам |
| wangenheim | fertig | Wangenheimpalais, v1 в mitte2.js |
| beginenturm | fertig | Beginenturm, малая точка, v1 в mitte2.js |
| georgenpalais | fertig | Georgenpalais (Wilhelm-Busch-Museum), новое |
| anzeiger | fertig | Anzeiger-Hochhaus (Höger 1928, клинкер, зелёный купол), v1 в mitte2.js |
| ihmezentrum | fertig | Ihme-Zentrum (бруталистский комплекс, Linden), новое, большое |
| hcc | fertig | HCC / Stadthalle с Kuppelsaal, новое, вне зоны плиток |
| markuskirche | fertig | Markuskirche (Hannover-List), новое |
