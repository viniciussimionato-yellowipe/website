# 0004 · Formulário próprio e CRM por fornecedor

**Estado:** aceite (CRM e ATS a confirmar) · 2026-10-30

## Contexto

O formulário tem três passos, campos escondidos de atribuição e separa candidatos de clientes. Formulários embebidos de CRM limitam o design e a medição.

## Decisão

Formulário próprio em React a enviar para `/api/lead`. A pontuação e o encaminhamento correm no servidor (`src/lib/leads/`), testados. A entrega usa um fornecedor configurável: `log` (desenvolvimento), `hubspot` (Forms API v3, envio autenticado com token de app privada) e `webhook` para o ATS (assinado com HMAC).

## Consequências

- Mudar de CRM = novo fornecedor em `destinations.ts`, sem mexer no formulário.
- As propriedades `yw_*` têm de existir no HubSpot antes do lançamento.
- O cookie `hubspotutk` liga o envio ao histórico de visitas quando o script do HubSpot estiver ativo (só com consentimento).
