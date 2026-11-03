# 03 · SEO técnico

Esta lista é o critério de aceitação do requisito R-10. O que já está implementado está marcado.

## Indexação e idiomas

- [x] Subpastas `/pt/`, `/br/`, `/en/` com slugs traduzidos (`src/lib/routing.ts`)
- [x] hreflang `pt-PT`, `pt-BR`, `en` e `x-default` recíprocos no HTML (`buildMetadata`) e no sitemap
- [x] Canónico próprio em cada página
- [x] Sitemap com todas as páginas indexáveis e alternativas (`src/app/sitemap.ts`)
- [ ] `lastmod` real vindo do CMS (quando houver CMS)
- [x] `robots.txt`: fora de produção bloqueia tudo; em produção bloqueia `/api/`
- [x] Rastreadores de IA permitidos (`site.allowAiCrawlers`); mudar exige decisão escrita
- [x] `noindex` fora de produção, na página de obrigado e em entradas com `seo.noindex`
- [ ] Mapa de redirecionamentos 301 do site atual (`docs/redirects.csv` → `next.config.ts`), testado em staging
- [x] 404 para rotas que não existem (`dynamicParams = false`)

## Conteúdo e dados estruturados

- [x] Conteúdo completo no HTML inicial (abas, acordeões e rotação renderizados no servidor)
- [x] Um H1 por página; secções em H2
- [x] Título ≤ 60 e descrição 70–160 caracteres em **todas** as rotas indexáveis dos três idiomas, validados pelo `content:check` (mesma função do `generateMetadata`: `src/lib/seo/page-seo.ts`); títulos com menos de 30 caracteres dão aviso
- [x] Páginas de serviço e de tecnologia com o mercado no título ("… em Portugal", "… no Brasil"), se couber em 60 caracteres (`src/lib/seo/titles.ts`)
- [x] JSON-LD: Organization (com `contactPoint` comercial por mercado, só os contactos confirmados) e WebSite (todas), BreadcrumbList (páginas internas), Service (modelos e serviços), FAQPage onde há FAQ
- [ ] Article com autor (blog, fase de conteúdo)
- [x] Open Graph por idioma e imagem de partilha
- [x] `/llms.txt` gerado do conteúdo

## Regras para escalar sem penalizações

Em setembro de 2026, John Mueller (Google) avisou que páginas programáticas fracas fazem o site inteiro perder confiança, e que recuperar demora. Por isso:

1. Página programática (perfil, custo, mercado) só com dados próprios suficientes: pelo menos 10 colocações para aquele perfil e mercado. Até lá, `status: 'draft'` ou `seo.noindex: true`.
2. Cada página tem pelo menos três elementos únicos: um dado próprio, um caso, a opinião de um especialista com nome.
3. Publicar em lotes de 10 e ver o Search Console durante 4 semanas antes do lote seguinte.
4. Nada de páginas "<serviço> em <cidade>" sem presença real nessa cidade.
5. pt-PT e pt-BR são páginas diferentes, com termos e casos de cada mercado.

## Ligações internas

- Cada "Contratar perfil" liga ao serviço, ao modelo, à página de custo e a dois casos.
- Cada artigo liga a um serviço e a um modelo, com o mesmo texto de âncora em todo o site.
- Cada caso liga aos serviços e ao setor.
- Breadcrumbs em todas as páginas internas; máximo de três cliques desde a home.

## Antes de publicar

```bash
npm run content:check
npm run build && npm run test:e2e   # tests/e2e/seo.spec.ts verifica lang, H1, canónico, hreflang, sitemap
```

Depois do lançamento: submeter os sitemaps no Search Console (uma propriedade por subpasta) e vigiar a cobertura durante 4 semanas.
