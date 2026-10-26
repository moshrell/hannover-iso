# Задание: Leineschloss (Landtag Niedersachsen) (ветка `lm/leineschloss`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `leineschloss`; название: Leineschloss (Landtag Niedersachsen)
- OSM: r1170793 (в `landmarks/meta/leineschloss.json`); высота ориентировочно 26 м (проверь по двум источникам)
- Состояние в коде: в `landmarks/altstadt.js` есть заглушка — вырезать и перерисовать
- Материал Степана: `D:\Webdesign\hannover-iso\_fotos\leineschloss\` — leineschloss.mp4 (файл Степана назывался votum.mp4; кадры показывают здание с колонным портиком и стеклянной крышей внутри — скорее всего Landtag/Leineschloss; ПОДТВЕРДИ по контуру OSM и улицам)

## Особенности
Если окажется другое здание, скажи Степану, переименуй id и папку и отметь это в отчёте. `pin`/`group` в meta сейчас выключены: реши с сборщиком, нужна ли точка на карте.

## Итог
Нарисованное здание в `landmarks/leineschloss.js` + `landmarks/meta/leineschloss.json`, кадры и таблицы в `ref/leineschloss/`, отчёт `ref/leineschloss/README.md`, всё запушено в `lm/leineschloss`.
