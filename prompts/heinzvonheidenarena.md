# Задание: Heinz von Heiden Arena (Stadion Hannover 96, früher HDI-Arena) (ветка `lm/heinzvonheidenarena`)

Ты — агент здания проекта hannover-iso (изометрическая ночная карта Ганновера, репозиторий `moshrell/hannover-iso`, ветка `main`). Общайся со Степаном по-русски, кратко, немецкие слова сразу переводи в скобках.

**Сначала прочитай в репозитории:** `CLAUDE.md`, `ARBEIT.md` и **`prompts/VIDEO-ARBEIT.md`** (там весь порядок: доступ к видео, нарезка на кадры, разбор, рисование, сверка, сдача). Ниже только данные по этому зданию.

## Здание
- id в проекте и имя папки: `heinzvonheidenarena`; название: Heinz von Heiden Arena (Stadion Hannover 96, früher HDI-Arena)
- OSM: контур стадиона найди по координатам ≈ 52.3600, 9.7314 (Arthur-Menge-Ufer, рядом с Maschsee, Stadionbad): `python3 tools/osm-find.py "Stadion"` может не найти (контур без имени), ищи в `data/osm.json.gz` по `leisure=stadium`/`building` рядом с этой точкой; высоту проверь по двум источникам
- Состояние в коде: новое здание
- Материал Степана: `D:\Webdesign\hannover-iso\_fotos\heinzvonheidenarena\` — heinzvonheidenarena.mp4

## Особенности
Это футбольный стадион (чаша трибун, кровля над трибунами, мачты/прожекторы, фасадные элементы). Внутри зоны детальных плиток (`core`). Крыша — главный силуэт: рисуй её по кадрам, а не «коробкой».