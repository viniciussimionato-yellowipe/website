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

## Navegação fluida

- Links internos sempre com `next/link`: as páginas são estáticas e o Next pré-carrega as que estão visíveis, por isso a navegação não espera pelo servidor. Exceção: o seletor de idioma não pré-carrega (`prefetch={false}`), porque mudar de idioma é raro.
- Transição entre páginas com `<ViewTransition>` do React (`src/components/layout/PageTransition.tsx`): a página que sai desvanece em 120 ms, a nova sobe 8 px em 260 ms, o cabeçalho fica parado (`view-transition-name: site-header`). CSS no fim de `globals.css`. Sem suporte no browser, a troca é direta; com movimento reduzido, não há animação.
- Toda a página nova passa pelo `PageTransition` (é também ele que marca `data-page-type` para o tracking).
- `scroll-behavior: smooth` só para âncoras: o `<html>` tem `data-scroll-behavior="smooth"` para o Next voltar ao topo sem animar ao mudar de página.
- O proxy (`src/proxy.ts`) só corre em caminhos sem idioma; `/pt/`, `/br/` e `/en/` vão direto à cache.
- Imagens de `public/images/` com cache de um dia e `stale-while-revalidate` de uma semana (`next.config.ts`).

## Medir em produção

- `web_vitals` (`src/components/analytics/RouteAnalytics.tsx`) envia LCP, INP, CLS, FCP e TTFB reais para o dataLayer, com o tipo da página de entrada. Ver o percentil 75 por `tipo_pagina` no GA4 todos os meses (docs/06-tracking.md).
- Peso de referência (2026-11-03, build de produção, gzip): HTML da home 76 KB (metade é o payload RSC embutido, próprio do App Router); JavaScript ~155 KB num browser moderno, dos quais ~117 KB são React e o router do Next e ~38 KB as ilhas do site (os 39 KB de polyfills só descarregam em browsers antigos); um CSS de 20 KB partilhado por todas as páginas. O que mais pesa é o framework: o JavaScript novo deve ficar nas ilhas e sair do caminho da primeira pintura.

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
