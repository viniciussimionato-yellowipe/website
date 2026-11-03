# Yellowipe · Website V3

Site institucional da Yellowipe e máquina de SEO e leads, em pt-PT (`/pt/`), pt-BR (`/br/`) e inglês (`/en/`).

Base de decisão: o documento **Yellowipe — Planeamento da estrutura do novo website** (abas _Requisitos revistos_ e _Desenvolvimento_) e o design **v7** da home (`docs/design/home-v7.dc.html`).

## Arranque rápido

Requisitos: Node.js 20.9 ou superior (recomendado 22, ver `.nvmrc`) e npm.

```bash
sh scripts/bootstrap.sh   # 1.ª vez: coloca .github, .husky, .npmrc e .vscode a partir de setup/ e inicia o Git
nvm use                   # ou instale o Node 22
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000 → redireciona para /pt/, /br/ ou /en/
```

Antes de abrir um pull request:

```bash
npm run check      # tipos + lint + formatação + testes unitários + conteúdo
npm run build && npm run test:e2e   # testes de ponta a ponta (instale antes: npx playwright install chromium)
```

## Scripts

| Script                            | O que faz                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`                     | Servidor de desenvolvimento                                                     |
| `npm run build` / `npm start`     | Build de produção e servidor                                                    |
| `npm run typecheck`               | TypeScript em modo estrito                                                      |
| `npm run lint` / `lint:fix`       | ESLint (regras Next.js, Core Web Vitals, TypeScript)                            |
| `npm run format` / `format:check` | Prettier                                                                        |
| `npm run test:unit`               | Testes unitários (`node:test` + `tsx`): pontuação de leads, rotas, conteúdo     |
| `npm run test:e2e`                | Playwright em desktop e mobile: SEO técnico, formulário, acessibilidade         |
| `npm run content:check`           | Qualidade do conteúdo: esquemas, limites de SEO, textos pendentes, autorizações |
| `npm run lhci`                    | Lighthouse CI (performance ≥ 90, acessibilidade e SEO ≥ 95)                     |
| `npm run check`                   | Tudo o que corre na CI antes do build                                           |

## Estrutura

```
src/
  app/
    [locale]/layout.tsx        layout raiz por idioma (lang, fontes, header, footer, consentimento)
    [locale]/page.tsx          home (v7)
    [locale]/[...slug]/        todas as outras páginas, com slugs traduzidos
    api/lead/route.ts          receção do formulário → pontuação → CRM ou ATS
    sitemap.ts robots.ts       SEO técnico
    llms.txt/route.ts          resumo para motores de IA
  proxy.ts                     deteção de idioma na raiz (Next.js 16)
  config/site.ts               factos da empresa (fonte única)
  content/                     esquemas (zod) + conteúdo local; trocar pelo CMS sem mexer nos componentes
  dictionaries/                textos de interface pt, br, en
  lib/
    i18n/ routing.ts           idiomas e URLs traduzidos
    seo/                       metadados, hreflang, JSON-LD, llms.txt
    leads/                     esquema do formulário, pontuação, encaminhamento, CRM/ATS, anti-spam
    analytics/                 eventos tipados, consentimento, atribuição
  components/                  layout, home, templates, formulário, analytics, ui
tests/unit  tests/e2e          testes
docs/                          diretrizes e decisões (ADR)
```

## Diretrizes

Leia por esta ordem antes de contribuir:

1. [Visão geral e princípios](docs/00-visao-geral.md)
2. [Arquitetura](docs/01-arquitetura.md)
3. [Padrões de código](docs/02-padroes-de-codigo.md)
4. [SEO técnico](docs/03-seo-tecnico.md)
5. [Conteúdo e CMS](docs/04-conteudo-e-cms.md)
6. [Leads e CRM](docs/05-leads-e-crm.md)
7. [Tracking](docs/06-tracking.md)
8. [Performance e acessibilidade](docs/07-performance-e-acessibilidade.md)
9. [Segurança e privacidade](docs/08-seguranca-e-privacidade.md)
10. [Testes e qualidade](docs/09-testes-e-qualidade.md)
11. [Ambientes e deploy](docs/10-ambientes-e-deploy.md)
12. [Definição de pronto](docs/11-definicao-de-pronto.md)
13. [Backlog](docs/12-backlog.md) e [requisitos](docs/13-requisitos.md)
14. [Decisões (ADR)](docs/adr/)

Contribuição: [CONTRIBUTING.md](CONTRIBUTING.md). Assistentes de IA: [AGENTS.md](AGENTS.md).

## Estado

Sprint 0 preparado: estrutura, home v7 em componentes, templates de modelo, serviço e caso, rota de leads com pontuação, SEO técnico, consentimento e CI.

Decisões em aberto (bloqueiam partes do sprint 1 a 3):

- [ ] CMS: Sanity ou Storyblok ([ADR 0003](docs/adr/0003-camada-de-conteudo.md))
- [ ] CRM e ATS atuais e acesso à API ([ADR 0004](docs/adr/0004-formulario-e-crm.md))
- [ ] Plataforma de consentimento certificada pela Google ([docs/08](docs/08-seguranca-e-privacidade.md))
- [ ] Publicar ou não faixas de preço (calculadora, sprint 5)
- [ ] Nome da prática de IA

Pendentes de conteúdo: `npm run content:check` lista-os (textos entre `[ ]` e casos sem autorização do cliente). No deploy de produção (`CONTENT_STRICT=1`) bloqueiam o build.
