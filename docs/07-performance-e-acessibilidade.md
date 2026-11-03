# 07 · Performance e acessibilidade

## Metas (mobile, percentil 75)

| Métrica                         | Meta     |
| ------------------------------- | -------- |
| LCP                             | < 2,5 s  |
| INP                             | < 200 ms |
| CLS                             | < 0,1    |
| Lighthouse performance          | ≥ 90     |
| Lighthouse acessibilidade e SEO | ≥ 95     |

A CI corre o Lighthouse em `/pt/`, `/br/` e `/en/` (`lighthouserc.json`) e falha abaixo destas metas.

## Práticas obrigatórias

- Páginas estáticas; JavaScript só nas ilhas interativas (rotação, abas, menu, formulário, consentimento).
- `next/image` com `width` e `height`; AVIF e WebP automáticos; `priority` só na imagem do hero.
- Fontes com `next/font` (alojadas no próprio site, `display: swap`); IBM Plex Mono sem preload.
- Scripts de terceiros só depois do consentimento e nunca a bloquear a renderização.
- Animações só com `transform` e `opacity`; tudo para com `prefers-reduced-motion`.
- Banner de consentimento mostrado depois da primeira pintura, para não afetar o LCP.

## Acessibilidade (WCAG 2.2 AA)

- Link "Saltar para o conteúdo" como primeiro foco.
- Foco visível em amarelo em todos os elementos interativos.
- Contraste AA: amarelo só sobre navy; texto dourado `#8A6600` sobre branco.
- Áreas tocáveis com pelo menos 44 × 44 px.
- Abas com `role="tablist"`, setas, Home e End; acordeões com `<details>` nativo.
- Rotação do hero: pausa com o rato, parada com movimento reduzido, áreas ocultas com `aria-hidden`.
- Formulário: `label` em todos os campos, erros com `role="alert"`, `autocomplete` correto.
- Um H1 por página e hierarquia de títulos sem saltos.

## Como testar

- `npm run test:e2e` (inclui movimento reduzido e foco inicial).
- Navegar a home só com teclado antes de cada lançamento.
- Leitor de ecrã (VoiceOver) nas páginas de modelo e no formulário.
