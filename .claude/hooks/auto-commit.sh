#!/usr/bin/env bash
# Hook Stop: commit + push automatico ao fim de cada tarefa.
# Sai silenciosamente (exit 0) em qualquer falha para nunca travar a sessao.
set -uo pipefail

# Raiz do repo, portavel entre maquinas: CLAUDE_PROJECT_DIR quando disponivel,
# senao a pasta do proprio script (.claude/hooks -> raiz).
REPO="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." 2>/dev/null && pwd)}"
cd "$REPO" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0
cd "$(git rev-parse --show-toplevel)" 2>/dev/null || exit 0

git add -A 2>/dev/null || exit 0

# Nada staged = nada a fazer. Silencio total.
if git diff --cached --quiet 2>/dev/null; then
  exit 0
fi

STAMP="$(date '+%Y-%m-%d %H:%M:%S')"
COUNT="$(git diff --cached --name-only | wc -l | tr -d ' ')"
MSG="auto: ${STAMP} (${COUNT} arquivo(s))"

git -c commit.gpgsign=false commit -q -m "$MSG" 2>/dev/null || exit 0
SHA="$(git rev-parse --short HEAD)"
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"

if git push -q origin "$BRANCH" 2>/dev/null; then
  printf '{"systemMessage": "Auto-commit + push OK: %s [%s]"}\n' "$MSG" "$SHA"
else
  printf '{"systemMessage": "Auto-commit OK (%s), push FALHOU: sem autenticacao no GitHub."}\n' "$SHA"
fi
exit 0
