# 08 · Segurança e privacidade

## Cabeçalhos (next.config.ts)

HSTS com preload, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restritiva, sem `X-Powered-By`.

**Pendente:** Content-Security-Policy com nonce, quando a plataforma de consentimento e o GTM estiverem escolhidos. Origens previstas: `googletagmanager.com`, `google-analytics.com`, `*.clarity.ms`, `c.bing.com`, `challenges.cloudflare.com`, o calendário e a plataforma de consentimento.

## Rota de leads

- Aceita só pedidos com `Origin` do próprio site.
- Limite por IP (`LEAD_RATE_LIMIT`, 5 por 10 minutos por omissão). É de melhor esforço em serverless: em produção, ativar também a firewall do alojamento (limite por IP em `/api/lead`).
- Corpo máximo de 20 KB, validado por zod.
- Armadilha para bots (`website`) e Cloudflare Turnstile.
- Segredos só no servidor (sem `NEXT_PUBLIC_`). Webhook do ATS assinado com HMAC.
- Respostas sem detalhes internos; logs sem dados pessoais.

## Privacidade (RGPD em Portugal, LGPD no Brasil)

- Banner com "Recusar" e "Aceitar" com o mesmo peso; a escolha pode ser mudada no rodapé ("Cookies").
- Antes do consentimento: nenhum GTM, Clarity, pixel ou cookie de atribuição. Só o cookie da própria escolha (`yw_consent`, 180 dias).
- Consent Mode do Google com tudo `denied` por omissão.
- Formulário: base legal = diligências pré-contratuais a pedido do titular; marketing só com caixa própria, desmarcada por omissão.
- Política de privacidade por mercado (RGPD e LGPD), fornecida pelo jurídico.
- Candidaturas seguem só para o ATS, com o prazo de conservação definido pelo recrutamento.

## Decisão aberta: plataforma de consentimento

O componente atual (`ConsentManager`) é provisório. Antes do lançamento, escolher uma plataforma certificada pela Google (necessária para anúncios no Espaço Económico Europeu) e mantê-la ligada ao mesmo contrato: cookie de escolha, Consent Mode e carregamento do GTM só após aceitar.

## Dependências

Dependabot semanal para npm e mensal para GitHub Actions. `npm audit --audit-level=high` na CI antes de cada lançamento.
