# Задание: Neustädter Hof- und Stadtkirche (ветка `lm/neustaedter`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `neustaedter`; название: Neustädter Hof- und Stadtkirche
- OSM: w29173386; высота ориентировочно ~45 м (проверь по двум источникам)
- Состояние в коде: v1 в `landmarks/mitte2.js` — вырезать и перерисовать
- Материал: кадры из видео уже в репозитории `ref/neustaedter/foto/v_*.jpg`; исходник на компьютере Степана `D:\Webdesign\hannover-iso\_fotos\neustaedter\` — neustaedter.mp4

## Особенности
Барочная церковь с башней; сверь материалы, форму шпиля и крышу нефа.

## Итог
Нарисованное здание в `landmarks/neustaedter.js` + `landmarks/meta/neustaedter.json`, кадры и таблицы в `ref/neustaedter/`, отчёт `ref/neustaedter/README.md`, всё запушено в `lm/neustaedter`.
