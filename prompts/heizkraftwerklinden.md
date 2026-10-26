# Задание: Heizkraftwerk Linden (ветка `lm/heizkraftwerklinden`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `heizkraftwerklinden`; название: Heizkraftwerk Linden
- OSM: найди `python3 tools/osm-find.py "Kraftwerk"` / по кадрам; контур может быть без имени, определи по улицам/трубам; высота ориентировочно ~100 (трубы) м (проверь по двум источникам)
- Состояние в коде: новое здание
- Материал: кадры из видео уже в репозитории `ref/heizkraftwerklinden/foto/v_*.jpg`; исходник на компьютере Степана `D:\Webdesign\hannover-iso\_fotos\heizkraftwerklinden\` — heizkraftwerklinden.mp4 + heizkraftwerklinden-tag.png + heizkraftwerklinden-nacht.png

## Особенности
Кирпичные корпуса и высокие трубы: масштаб, число труб, подсветка (ночной снимок!), мазутные баки/конвейер, если видны.

## Итог
Нарисованное здание в `landmarks/heizkraftwerklinden.js` + `landmarks/meta/heizkraftwerklinden.json`, кадры и таблицы в `ref/heizkraftwerklinden/`, отчёт `ref/heizkraftwerklinden/README.md`, всё запушено в `lm/heizkraftwerklinden`.
