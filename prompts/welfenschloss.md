# Задание: Welfenschloss (Leibniz Universität) (ветка `lm/welfenschloss`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `welfenschloss`; название: Welfenschloss (Leibniz Universität)
- OSM: см. `landmarks/meta/welfenschloss.json`; высота ориентировочно ~40 м (проверь по двум источникам)
- Состояние в коде: v2 в `landmarks/welfenschloss.js` — перерисовать по кадрам, не потеряв то, что уже верно
- Материал: готовая нарезка кадров в репозитории `ref/welfenschloss/foto/v_*.jpg`

## Особенности
Проверь пропорции башен и Ostbau, портал с львами, пологие крыши.

Состояние предыдущей версии: Уже есть: `ref/welfenschloss/` (отчёт и старые фото предыдущего агента: что сделано и что не хватало); прочитай, но проверяй всё по кадрам. Старая ветка `lm/welfenschloss` уже влита в `main`, команда `claim` создаст её заново от свежего `main`.

## Итог
Нарисованное здание в `landmarks/welfenschloss.js` + `landmarks/meta/welfenschloss.json`, кадры и таблицы в `ref/welfenschloss/`, отчёт `ref/welfenschloss/README.md`, всё запушено в `lm/welfenschloss`.
