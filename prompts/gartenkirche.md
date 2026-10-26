# Задание: Gartenkirche St. Marien (ветка `lm/gartenkirche`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `gartenkirche`; название: Gartenkirche St. Marien
- OSM: w138392040; высота ориентировочно ~45 м (проверь по двум источникам)
- Состояние в коде: новое здание (старого модуля нет)
- Материал: кадры из видео уже в репозитории `ref/gartenkirche/foto/v_*.jpg`; исходник на компьютере Степана `D:\Webdesign\hannover-iso\_fotos\gartenkirche\` — gartenkirche.mp4 + gartenkirche-foto.png

## Особенности
Стиль, год и высоту определи по кадрам и источникам (минимум два): форма башни, кровля, фасад.

## Итог
Нарисованное здание в `landmarks/gartenkirche.js` + `landmarks/meta/gartenkirche.json`, кадры и таблицы в `ref/gartenkirche/`, отчёт `ref/gartenkirche/README.md`, всё запушено в `lm/gartenkirche`.
