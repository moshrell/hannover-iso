#!/usr/bin/env python3
# Очередь зданий (prompts/QUEUE.md).
#   python3 tools/queue.py          — показать, что свободно/занято (занято = есть ветка lm/<id> на сервере)
#   python3 tools/queue.py release <id> — освободить здание (сборщик/Степан): ветка перематывается на main
#   python3 tools/queue.py claim    — взять первое свободное здание со статусом ready: создаёт ветку lm/<id> от origin/main,
#                                     кладёт туда ref/<id>/CLAIM.md и пушит. Создание ветки атомарно: если её уже создал другой агент, пуш отклоняется и берётся следующее.
import subprocess, sys, re, os, time, secrets
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); os.chdir(root)
def sh(*a, check=True):
    r = subprocess.run(a, capture_output=True, text=True)
    if check and r.returncode: raise RuntimeError(' '.join(a) + '\n' + r.stderr)
    return r
sh('git', 'fetch', '-q', 'origin')
queue = []
for l in subprocess.run(['git', 'show', 'origin/main:prompts/QUEUE.md'], capture_output=True, text=True, check=True).stdout.splitlines():
    m = re.match(r'\|\s*([A-Za-z0-9_]+)\s*\|\s*(ready|wartet|fertig)\s*\|\s*(.*?)\s*\|', l)
    if m and m.group(1) != 'id': queue.append(m.groups())
heads = {}
for l in sh('git', 'ls-remote', '--heads', 'origin', 'lm/*').stdout.splitlines():
    sha, ref = l.split(); heads[ref.split('refs/heads/')[1]] = sha
def merged(b): return sh('git', 'merge-base', '--is-ancestor', 'origin/' + b, 'origin/main', check=False).returncode == 0
def taken(i): return 'lm/' + i in heads and not merged('lm/' + i)   # старая ветка, уже влитая в main, не считается занятой
def when(i): return sh('git', 'log', '-1', '--format=%cr, %s', 'origin/lm/' + i, check=False).stdout.strip()
if len(sys.argv) < 2:
    for i, st, what in queue:
        s = 'ЗАНЯТО (' + when(i) + ')' if taken(i) and st != 'fertig' else {'ready': 'свободно', 'wartet': 'ждёт материал', 'fertig': 'готово'}[st]
        print(f'{i:22} {s:50} {what}')
    sys.exit()
if sys.argv[1] == 'release':   # освободить здание: ветка lm/<id> перематывается на main (считается влитой/свободной); удалять ветку не нужно
    i = sys.argv[2]; old = heads.get('lm/' + i)
    if not old: print('ветки lm/%s нет' % i); sys.exit(1)
    r = sh('git', 'push', '-q', '--force-with-lease=lm/%s:%s' % (i, old), 'origin', 'origin/main:refs/heads/lm/' + i, check=False)
    print('освобождено: ' + i if r.returncode == 0 else 'не удалось: ' + r.stderr); sys.exit(r.returncode)
if sys.argv[1] == 'claim':
    for i, st, what in queue:
        if st != 'ready' or taken(i): continue
        sh('git', 'checkout', '-q', '-B', 'lm/' + i, 'origin/main')
        os.makedirs(f'ref/{i}', exist_ok=True)
        open(f'ref/{i}/CLAIM.md', 'w').write(f'Взято в работу {time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())} (метка {secrets.token_hex(4)}). Агент здания {i}.\n')
        sh('git', 'add', f'ref/{i}/CLAIM.md')
        sh('git', '-c', 'user.name=lm-agent', '-c', 'user.email=lm-agent@invalid', 'commit', '-q', '-m', f'Взято в работу: {i}')
        old = heads.get('lm/' + i)   # влитая старая ветка перезаписывается только если за это время никто её не менял (force-with-lease)
        r = sh('git', 'push', '-q', *(['--force-with-lease=lm/%s:%s' % (i, old)] if old else []), 'origin', f'lm/{i}', check=False)
        if r.returncode == 0:
            print(f'ВЗЯТО: {i} ({what}). Ветка lm/{i} создана и запушена. Дальше: prompts/{i}.md и prompts/VIDEO-ARBEIT.md'); sys.exit()
        sh('git', 'checkout', '-q', '--detach', 'origin/main'); sh('git', 'branch', '-q', '-D', 'lm/' + i, check=False)   # занято другим: следующее
        heads[('lm/' + i)] = heads.get('lm/' + i, 'x')
    print('СВОБОДНЫХ ЗДАНИЙ НЕТ. Ничего не бери, сообщи Степану.'); sys.exit(1)
