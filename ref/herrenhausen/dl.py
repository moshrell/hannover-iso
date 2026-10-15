# Lädt Referenzfotos von Wikimedia Commons: python3 dl.py "Suchbegriff" name [anzahl]
import sys, json, urllib.request, urllib.parse, time
def get(u):
    for i in range(5):
        try:
            return urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'hannover-iso-ref/1.0'}), timeout=40).read()
        except Exception as e:
            time.sleep(3 + i * 3)
    raise SystemExit('fail ' + u)
q, name = sys.argv[1], sys.argv[2]; n = int(sys.argv[3]) if len(sys.argv) > 3 else 2
r = json.loads(get('https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch=' + urllib.parse.quote(q) + '&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1000'))
pages = sorted(r.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 0))
k = 0
for p in pages:
    ii = p['imageinfo'][0]
    if ii['mime'] != 'image/jpeg' or ii['width'] < 1200: continue
    k += 1; fn = f'{name}_{k}.jpg'
    open(fn, 'wb').write(get(ii['thumburl'])); print(fn, p['title'], ii['width'], ii['height'])
    open('quellen.txt', 'a').write(f"{fn}  https://commons.wikimedia.org/wiki/{p['title'].replace(' ', '_')}\n")
    time.sleep(2)
    if k >= n: break
