#!/bin/sh
# Einmal pro Cloud-Sitzung: Playwright (Chromium ist vorinstalliert) + node_modules-Link, Testserver starten.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p /tmp/pw && cd /tmp/pw && [ -d node_modules/playwright ] || (npm init -y >/dev/null && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i playwright >/dev/null)
cd "$ROOT" && [ -e node_modules ] || ln -s /tmp/pw/node_modules node_modules
ls /opt/pw-browsers | head -3
(setsid nohup python3 tools/serve.py . 8770 >/tmp/serve.log 2>&1 &)
echo "bereit: http://127.0.0.1:8770/studio.html?lm=<name>&embed&sofort"
