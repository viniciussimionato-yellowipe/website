#!/usr/bin/env sh
# Coloca no sítio os ficheiros de configuração que vêm em setup/ e inicia o Git.
# Correr uma vez, na raiz do projeto: sh scripts/bootstrap.sh
set -e
cd "$(dirname "$0")/.."

[ -d .github ] || cp -R setup/github .github
[ -d .husky ] || cp -R setup/husky .husky
[ -f .npmrc ] || cp setup/npmrc .npmrc
[ -d .vscode ] || cp -R setup/vscode .vscode
chmod +x .husky/pre-commit .husky/commit-msg 2>/dev/null || true
[ -d .git ] || git init -b main

echo "Configuração copiada (.github, .husky, .npmrc, .vscode)."
echo "Confirme com 'git status' e apague a pasta setup/ quando quiser."
