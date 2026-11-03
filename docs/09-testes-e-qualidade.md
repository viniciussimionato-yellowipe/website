# 09 · Testes e qualidade

## Pirâmide

| Nível         | Ferramenta                    | Onde                    | O que cobre                                                        |
| ------------- | ----------------------------- | ----------------------- | ------------------------------------------------------------------ |
| Tipos         | TypeScript estrito            | `npm run typecheck`     | Contratos entre conteúdo, rotas e componentes                      |
| Unitários     | `node:test` + `tsx`           | `tests/unit/`           | Pontuação, encaminhamento, rota de leads, URLs, hreflang, conteúdo |
| Conteúdo      | `scripts/check-content.ts`    | `npm run content:check` | Esquemas, limites de SEO, pendentes, autorizações                  |
| Ponta a ponta | Playwright (desktop e mobile) | `tests/e2e/`            | SEO técnico, formulário, API, movimento reduzido, foco             |
| Performance   | Lighthouse CI                 | `lighthouserc.json`     | Core Web Vitals, acessibilidade, SEO                               |

## Regras

- Lógica de negócio (pontuação, encaminhamento, rotas) tem testes unitários. Mudar a regra = mudar o teste.
- Cada template novo ganha um teste E2E que confirma: 200, um H1, canónico e hreflang.
- Testes E2E usam rótulos visíveis (`getByLabel`, `getByRole`), não classes CSS.
- A CI bloqueia o merge se algum passo falhar.

## CI (`.github/workflows/ci.yml`)

1. `qualidade`: typecheck, lint, formatação, testes unitários, `content:check`.
2. `build-e2e-lighthouse`: build de produção, Playwright e Lighthouse. Usa as chaves de teste públicas do Turnstile.

## Testes manuais antes de cada lançamento

- Safari iOS, Chrome Android, Chrome, Firefox e Edge no desktop.
- Formulário de ponta a ponta até ao CRM e ao ATS (com dados de teste identificados).
- Eventos no modo de pré-visualização do GTM.
- Navegação só com teclado e com VoiceOver.
