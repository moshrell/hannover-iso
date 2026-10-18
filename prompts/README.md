# Задания для чатов-зданий

Один файл = одно здание. Новый чат получает только короткую строку (имя файла); всё остальное читает здесь, из GitHub.

| Файл | Здание | Ветка |
|---|---|---|
| `sprengel.md` | Sprengel Museum | `lm/sprengel` |
| `clemens.md` | Basilika St. Clemens | `lm/clemens` |
| `christuskirche.md` | Christuskirche | `lm/christuskirche` |
| `marktkirche.md` | Marktkirche (из группы Altstadt) | `lm/marktkirche` |
| `altesRathaus.md` | Altes Rathaus (из группы Altstadt) | `lm/altesRathaus` |
| `gartenkirche.md` | Gartenkirche St. Marien | `lm/gartenkirche` |
| `georgenpalais.md` | Georgenpalais (Wilhelm-Busch-Museum) | `lm/georgenpalais` |

Общие правила: `ARBEIT.md`. Шаблон для новых зданий: скопировать любой файл и заменить имя, заголовок, OSM-id, запросы фото.

## Фото
Фото подбирает Степан: кладёт в `D:\Webdesign\hannover-iso\_fotos\<имя>\`, сборщик заливает их в `ref/<имя>/foto/` (ветка `main`), чат-здание создаёт ветку от свежего `main` и использует только их (плюс догрузка недостающих сторон через `tools/ref-dl.py`).
