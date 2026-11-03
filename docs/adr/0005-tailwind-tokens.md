# 0005 · Tailwind CSS 4 com tokens da marca

**Estado:** aceite · 2026-10-30

## Decisão

Tailwind CSS 4 com os tokens da v7 em `@theme` (`src/app/globals.css`). Componentes repetidos em `@layer components`. Sem biblioteca de componentes de UI.

## Consequências

- Cores e tipografia mudam num sítio.
- Contraste AA garantido pelos tokens (amarelo só sobre navy; dourado sobre branco).
