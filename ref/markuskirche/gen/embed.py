#!/usr/bin/env python3
"""Schreibt parts.json als Datenzeile in landmarks/markuskirche.js (zwischen /*DATA*/ und /*END*/)."""
import json, os, re
H = os.path.dirname(os.path.abspath(__file__)); js = os.path.join(H, '..', '..', '..', 'landmarks', 'markuskirche.js')
d = json.load(open(os.path.join(H, 'parts.json')))
line = 'const D = %s, T = %s, IDS = %s;' % (json.dumps(d['parts'], separators=(',', ':')), json.dumps(d['tops'], separators=(',', ':')), json.dumps(d['ids']))
s = open(js).read(); s = re.sub(r'/\*DATA\*/.*?/\*END\*/', lambda m: '/*DATA*/' + line + '/*END*/', s, flags=re.S); open(js, 'w').write(s)
print('eingebettet:', len(d['parts']), 'Stücke')
