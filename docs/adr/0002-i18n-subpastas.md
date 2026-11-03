# 0002 · Idiomas em subpastas com slugs traduzidos

**Estado:** aceite · 2026-10-30

## Contexto

Três mercados com vocabulário diferente: "outsourcing de TI" em Portugal, "alocação de profissionais de TI" no Brasil, "staff augmentation" nos EUA. O SEO depende de URLs com as palavras de cada mercado.

## Decisão

Subpastas `/pt/`, `/br/`, `/en/` num só domínio. Slugs traduzidos por entrada de conteúdo. Um único resolvedor de rotas (`src/lib/routing.ts`) gera URLs, hreflang, sitemap e seletor de idioma. Sem biblioteca de i18n: dicionários tipados em `src/dictionaries/`.

## Consequências

- Uma página só existe num idioma se tiver slug e título SEO nesse idioma.
- O segmento `br` não é um código BCP 47: `localeConfig` faz a correspondência para `pt-BR`.
- Search Console com uma propriedade por subpasta.
