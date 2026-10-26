# Задания для чатов-зданий

Один файл = одно здание. Новый чат получает короткую строку запуска (см. ниже); всё остальное читает в репозитории.
Порядок работы по видео Google Earth: **`VIDEO-ARBEIT.md`** (общий для всех). Правила кода и файлов: `ARBEIT.md`.

| Файл | Здание | Ветка | Материал |
|---|---|---|---|
| `aegidienkirche.md` | Aegidienkirche (Kirchenruine, Mahnmal) | `lm/aegidienkirche` | aegidienkirche.mp4 |
| `altesRathaus.md` | Altes Rathaus | `lm/altesRathaus` | altesRathaus.mp4 |
| `marktkirche.md` | Marktkirche St. Georgii et Jacobi | `lm/marktkirche` | marktkirche.mp4 |
| `gartenkirche.md` | Gartenkirche St. Marien | `lm/gartenkirche` | gartenkirche.mp4 |
| `georgenpalais.md` | Georgenpalais (Wilhelm-Busch-Museum) | `lm/georgenpalais` | нет видео |
| `landesmuseum.md` | Niedersächsisches Landesmuseum | `lm/landesmuseum` | landesmuseum.mp4 |
| `welfenschloss.md` | Welfenschloss (Leibniz Universität) | `lm/welfenschloss` | welfenschloss.mp4 |
| `nordlb.md` | NORD/LB (Norddeutsche Landesbank) | `lm/nordlb` | nordlb.mp4 |
| `wangenheim.md` | Wangenheimpalais | `lm/wangenheim` | wangenheim.mp4 |
| `neustaedter.md` | Neustädter Hof- und Stadtkirche | `lm/neustaedter` | neustaedter.mp4 |
| `beginenturm.md` | Beginenturm | `lm/beginenturm` | beginenturm.mp4 |
| `leineschloss.md` | Leineschloss (Landtag Niedersachsen) | `lm/leineschloss` | leineschloss.mp4 |
| `telemax.md` | Telemax (Fernmeldeturm) | `lm/telemax` | telemax.mp4 |
| `heizkraftwerklinden.md` | Heizkraftwerk Linden | `lm/heizkraftwerklinden` | heizkraftwerklinden.mp4 |
| `heinzvonheidenarena.md` | Heinz von Heiden Arena (ZAG Arena) | `lm/heinzvonheidenarena` | heinzvonheidenarena.mp4 |
| `alterfernsehturm.md` | Старая телебашня (Fernsehturm с логотипом VW), в данных нет имени | `lm/alterfernsehturm` | alterfernsehturm.mp4 |
| `clemens.md`, `christuskirche.md` | Basilika St. Clemens, Christuskirche | `lm/clemens`, `lm/christuskirche` | сделаны по Wikimedia (старый формат) |

## Строка запуска (подставь id)
```
Прочитай prompts/<id>.md в репозитории moshrell/hannover-iso (ветка main) и выполни; общий порядок в prompts/VIDEO-ARBEIT.md.
```
Чат должен быть открыт в приложении на компьютере Степана (нужен доступ к `D:\Webdesign\hannover-iso\_fotos\<id>\`).

## Материал
Степан кладёт видео/фото в `D:\Webdesign\hannover-iso\_fotos\<id>\` (имя папки = id здания, `<id>.mp4`, фото `<id>-tag.png`, `<id>-nacht.png`). Агент сам режет видео (`tools/frames.sh`) и кладёт отобранные кадры в `ref/<id>/foto/`.
