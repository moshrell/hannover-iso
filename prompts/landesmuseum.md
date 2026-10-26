# Задание: Niedersächsisches Landesmuseum (ветка `lm/landesmuseum`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `landesmuseum`; название: Niedersächsisches Landesmuseum
- OSM: r364529; высота ориентировочно ~25 м (проверь по двум источникам)
- Состояние в коде: v2 в `landmarks/landesmuseum.js` — перерисовать по кадрам, старое взять как заготовку контура
- Материал: готовая нарезка кадров в репозитории `ref/landesmuseum/foto/v_*.jpg`

## Особенности
В v2 не хватало: тыловые/боковые фасады, ротонда, детали двора. Теперь они есть на кадрах (`ref/landesmuseum/foto/v_*.jpg`).

Состояние предыдущей версии: Уже есть: `ref/landesmuseum/README.md` (отчёт предыдущего агента: что сделано и что не хватало) и старые фото `ref/landesmuseum/ansicht_*.jpg`; прочитай их, но проверяй всё по кадрам. Старая ветка `lm/landesmuseum` уже влита в `main`, команда `claim` создаст её заново от свежего `main`.

## Итог
Нарисованное здание в `landmarks/landesmuseum.js` + `landmarks/meta/landesmuseum.json`, кадры и таблицы в `ref/landesmuseum/`, отчёт `ref/landesmuseum/README.md`, всё запушено в `lm/landesmuseum`.
