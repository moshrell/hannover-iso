# Задание: Aegidienkirche (Kirchenruine, Mahnmal) (ветка `lm/aegidienkirche`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `aegidienkirche`; название: Aegidienkirche (Kirchenruine, Mahnmal)
- OSM: r7359339; высота ориентировочно 57 м (проверь по двум источникам)
- Состояние в коде: v1 в `landmarks/mitte.js` — вырезать и перерисовать
- Материал: готовая нарезка кадров в репозитории `ref/aegidienkirche/foto/v_*.jpg`

## Особенности
Это руина (Mahnmal, мемориал): рисуй ровно то, что стоит сейчас по видео, без «достройки» утраченных частей.

## Итог
Нарисованное здание в `landmarks/aegidienkirche.js` + `landmarks/meta/aegidienkirche.json`, кадры и таблицы в `ref/aegidienkirche/`, отчёт `ref/aegidienkirche/README.md`, всё запушено в `lm/aegidienkirche`.
