# 10 · Ambientes e deploy

## Ambientes

| Ambiente         | Onde                             | `NEXT_PUBLIC_APP_ENV` | Indexável | CRM/ATS        | Outros                       |
| ---------------- | -------------------------------- | --------------------- | --------- | -------------- | ---------------------------- |
| Local            | `npm run dev`                    | `development`         | não       | `log`          |                              |
| Pré-visualização | um URL por pull request          | `preview`             | não       | `log`          |                              |
| Staging          | `staging.<domínio>` com password | `staging`             | não       | sandbox do CRM | testar redirecionamentos 301 |
| Produção         | `www.yellowipe.io`               | `production`          | sim       | real           | `CONTENT_STRICT=1`           |

Fora de produção, `robots.txt` bloqueia tudo e todas as páginas levam `noindex`.

## Alojamento recomendado

Vercel com funções na região da UE (Frankfurt ou Paris), domínio com HTTPS, firewall com limite por IP em `/api/lead`. Alternativas: Netlify ou Cloudflare ([ADR 0001](adr/0001-nextjs-app-router.md)).

## Variáveis de ambiente

Ver `.env.example`. Segredos só nas definições do alojamento, nunca no repositório. Variáveis `NEXT_PUBLIC_*` são públicas.

## Lançamento (semana 13)

1. `CONTENT_STRICT=1 npm run content:check` sem erros (casos autorizados, pendentes resolvidos).
2. Redirecionamentos 301 do site atual aplicados e testados em staging.
3. Formulário testado de ponta a ponta em staging com o CRM e o ATS reais (sandbox).
4. DNS para o novo alojamento; HTTPS ativo.
5. Search Console: uma propriedade por subpasta (`/pt/`, `/br/`, `/en/`); submeter os sitemaps.
6. GA4 e GTM publicados; eventos verificados.
7. Vigiar 404, cobertura e leads diariamente durante 2 semanas.

## Reverter

Cada deploy de produção fica disponível para reverter num clique no alojamento. Uma reversão abre logo uma tarefa com a causa.
