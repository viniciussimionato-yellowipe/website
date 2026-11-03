# 0007 · Poucas dependências

**Estado:** aceite · 2026-10-30

## Decisão

Dependências de produção: `next`, `react`, `react-dom`, `zod`, `server-only`. Testes unitários com `node:test` (sem framework extra). Qualquer biblioteca nova (UI, animação, i18n, formulários) precisa de um ADR com o problema que resolve e o custo em JavaScript enviado ao browser.

## Consequências

- Menos atualizações, menos risco de segurança, melhor performance.
- Algumas coisas são escritas à mão (abas, acordeões nativos, rotação).
