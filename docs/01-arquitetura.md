# 01 · Arquitetura

## Peças

```
CMS headless (Sanity ou Storyblok — decisão aberta)
        │  webhook de publicação → revalida só as páginas alteradas
        ▼
Next.js 16 na Vercel (região UE) ──► Visitante (pt-PT, pt-BR, en)
  · páginas geradas por idioma          │ banner de consentimento
  · formulário e calculadora            ├──► GTM + GA4 (só com consentimento, sem dados pessoais)
                                        ▼
                               Rota /api/lead (Node)
                     valida · anti-spam (Turnstile) · pontua · encaminha
                          │                              │
                          ▼                              ▼
              CRM (HubSpot ou o atual)              ATS atual
         pontuação, filas, sequências,           candidaturas; exporta
                reuniões                        tempos até à shortlist
```

## Pedido de uma página

1. `src/proxy.ts`: se o URL não tem idioma, redireciona (307) para `/pt/`, `/br/` ou `/en/` pelo país (cabeçalho do CDN) e pelo `Accept-Language`.
2. `src/app/[locale]/layout.tsx`: `lang`, fontes, header, footer, consentimento e JSON-LD da organização.
3. `src/app/[locale]/page.tsx` (home) ou `src/app/[locale]/[...slug]/page.tsx` (restantes).
4. `[...slug]` chama `resolvePath()`; a rota diz o template: modelo, serviço, caso, pilar, contacto, privacidade, obrigado.
5. `generateStaticParams` gera tudo no build; `dynamicParams = false` devolve 404 ao resto.

## URLs

| Página         | pt-PT                               | pt-BR                               | en                         |
| -------------- | ----------------------------------- | ----------------------------------- | -------------------------- |
| Home           | `/pt/`                              | `/br/`                              | `/en/`                     |
| Modelo Reforce | `/pt/outsourcing-de-ti/`            | `/br/alocacao-de-profissionais-ti/` | sprint 4                   |
| Serviço        | `/pt/servicos/automacao-de-testes/` | `/br/servicos/automacao-de-testes/` | sprint 4                   |
| Caso           | `/pt/casos/<slug>/`                 | `/br/cases/<slug>/`                 | `/en/case-studies/<slug>/` |
| Contacto       | `/pt/contacto/`                     | `/br/contato/`                      | `/en/contact/`             |

Regras: minúsculas, hífenes, sem acentos, barra final (`trailingSlash: true`). Um URL muda → redirecionamento 301 em `next.config.ts`.

## Camadas e dependências

```
app/  →  components/  →  lib/  →  content/ + config/ + dictionaries/
```

- `lib/` não importa de `components/` nem de `app/`.
- `content/local/` só é importado por `content/index.ts`.
- Código que corre no browser (`'use client'`) não importa `lib/leads/destinations.ts` (usa segredos).

## Decisões

Ver [ADR](adr/). Mudar uma decisão = novo ADR que substitui o anterior.
