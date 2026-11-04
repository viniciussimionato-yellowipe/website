# 05 · Leads e CRM

## Caminho de um lead

1. O formulário está na própria página: home, modelos, serviços, tecnologias e casos terminam com a secção `ContactBlock` (`src/components/forms/ContactBlock.tsx`) e os CTAs da página apontam para `#contacto`. O cabeçalho continua a levar a `/contacto/`.
2. CTA (`TrackedLink`, evento `cta_click`) leva ao formulário e guarda na sessão o CTA, a página e o modelo (`src/lib/analytics/cta-context.ts`). O formulário envia-os ao CRM (`yw_cta_id`, `yw_cta_page`) e, numa página de modelo (ou vindo de uma), já abre com a intenção escolhida.
3. Formulário em três passos (`src/components/forms/LeadForm.tsx`): intenção → contacto → pedido.
   É um formulário para empresas. "Procuro emprego" não avança: mostra um painel com ligação às vagas abertas e ao envio de CV (Carreiras), sem botão de envio. Uma mensagem com expressões de candidato (`candidateKeywords` nos dicionários) mostra um aviso com o mesmo caminho, sem bloquear o envio.
4. `POST /api/lead` (`src/app/api/lead/route.ts`):
   origem do próprio site → limite por IP → tamanho → armadilha para bots → validação (zod) → Turnstile → `handleLead`.
5. `handleLead` (`src/lib/leads/handle.ts`): pontua (`scoring.ts`), decide o destino (`assign.ts`) e entrega (`destinations.ts`).
6. Resposta ao browser: só o próximo passo (`calendar`, `email` ou `jobs`). Nunca a pontuação.

## Pontuação

| Sinal                                                                  | Pontos |
| ---------------------------------------------------------------------- | ------ |
| Email de empresa                                                       | +15    |
| Cargo com decisão (CTO, diretor, head, gerente, responsável, founder…) | +15    |
| Começar em menos de 3 meses                                            | +15    |
| Mercado servido (PT, BR, US)                                           | +10    |
| Empresa com 50 ou mais pessoas                                         | +10    |
| Dois ou mais perfis, ou um projeto (Construa)                          | +10    |
| Viu preços ou usou a calculadora                                       | +10    |
| Viu dois ou mais casos                                                 | +5     |
| Email pessoal (Gmail, Hotmail, UOL…)                                   | −10    |

Faixas: **50+ vendas**, **25–49 SDR**, **< 25 nurturing**. Rever pesos e limites ao fim de 90 dias com dados reais; qualquer mudança atualiza `scoring.ts` e `tests/unit/scoring.test.ts`.

## Encaminhamento e tempos de resposta

| Condição          | Destino           | Resposta      |
| ----------------- | ----------------- | ------------- |
| Procuro emprego   | ATS               | automática    |
| 50+, Portugal     | fila `sales-pt`   | 4 horas úteis |
| 50+, Brasil       | fila `sales-br`   | 4 horas úteis |
| 50+, EUA ou outro | fila `sales-intl` | 1 dia útil    |
| 25–49             | fila `sdr`        | 1 dia útil    |
| < 25              | `nurture`         | automática    |

Leads com 50+ veem o calendário logo após o envio (`NEXT_PUBLIC_MEETING_URL_PT|BR|US`).

## HubSpot (fornecedor por omissão)

Configurar `CRM_PROVIDER=hubspot`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_ID_CLIENT` e, de preferência, `HUBSPOT_PRIVATE_APP_TOKEN` (envio autenticado).

Propriedades de contacto a criar no portal antes do lançamento:

| Propriedade                                                                                                 | Tipo                                             |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `yw_intent`                                                                                                 | seleção: contrate, reforce, construa, indefinido |
| `yw_areas`, `yw_landing_page`, `yw_conversion_page`, `yw_cta_id`, `yw_cta_page`, `yw_gclid`, `yw_li_fat_id` | texto                                            |
| `yw_headcount`, `yw_lead_score`                                                                             | número                                           |
| `yw_company_size`, `yw_start`, `yw_locale`, `yw_lead_band`, `yw_queue`                                      | seleção                                          |

Workflows no HubSpot: atribuição por `yw_queue`, tarefa com prazo pelo SLA, sequência de nurturing por `yw_intent` (4 emails em 3 semanas), reencaminhamento quando a pontuação sobe.

Se o CRM atual não for o HubSpot: escrever um novo fornecedor em `destinations.ts` com a mesma assinatura e um ADR.

## ATS

`ATS_PROVIDER=webhook` envia JSON assinado com HMAC-SHA256 (`X-Yellowipe-Signature: sha256=<hex>`, segredo `ATS_WEBHOOK_SECRET`). O recetor deve validar a assinatura antes de aceitar.

## Em desenvolvimento

`CRM_PROVIDER=log` e `ATS_PROVIDER=log` registam o encaminhamento sem dados pessoais. Sem `TURNSTILE_SECRET_KEY`, o anti-spam só é dispensado fora de produção.
