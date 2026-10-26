# Задание: Altes Rathaus (ветка `lm/altesRathaus`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `altesRathaus`; название: Altes Rathaus
- OSM: w5121356; высота ориентировочно ~38 м (проверь по двум источникам)
- Состояние в коде: v1 в `landmarks/altstadt.js` — вырезать и перерисовать
- Материал Степана: `D:\Webdesign\hannover-iso\_fotos\altesRathaus\` — altesRathaus.mp4 + altesRathaus-foto.png

## Особенности
Бранденбургская готика, красный кирпич, ступенчатые щипцы, декоративные ленты и майолика. Рядом Marktkirche — не рисуй её здесь.

## Итог
Нарисованное здание в `landmarks/altesRathaus.js` + `landmarks/meta/altesRathaus.json`, кадры и таблицы в `ref/altesRathaus/`, отчёт `ref/altesRathaus/README.md`, всё запушено в `lm/altesRathaus`.
