#!/usr/bin/env python3
"""Schreibt ref/ihmezentrum/gen/parts.json als Datenzeile in landmarks/ihmezentrum.js (zwischen /*DATA*/ und /*END*/)."""
import json, os, re
H = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(H, '..', '..', '..')
d = json.load(open(os.path.join(H, 'parts.json')))
js = os.path.join(R, 'landmarks', 'ihmezentrum.js'); s = open(js).read()
data = json.dumps(d['parts'], separators=(',', ':'), ensure_ascii=False); tops = json.dumps(d['tops'], separators=(',', ':'))
s = re.sub(r'/\*DATA\*/.*?/\*END\*/', lambda m: '/*DATA*/const D = ' + data + ', T = ' + tops + ';/*END*/', s, flags=re.S)
open(js, 'w').write(s); print('eingebettet:', len(d['parts']), 'Stücke,', len(data), 'Zeichen')
