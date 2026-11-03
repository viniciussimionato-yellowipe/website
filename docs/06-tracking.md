# 06 · Tracking

## Regras

- Os eventos estão tipados em `src/lib/analytics/events.ts`; um evento novo entra lá primeiro.
- **Nenhum dado pessoal** no dataLayer (nome, email, telefone, empresa, mensagem).
- O GTM só carrega depois de o visitante aceitar análise (modo básico do Consent Mode).
- Eventos-chave no GA4: `generate_lead` e `meeting_booked`.

## Eventos

| Evento              | Quando dispara                         | Propriedades                                                  | Implementado                |
| ------------------- | -------------------------------------- | ------------------------------------------------------------- | --------------------------- |
| `cta_click`         | Clique em qualquer CTA (`TrackedLink`) | `cta_id`, `cta_text`, `posicao`, `tipo_pagina`, `modelo`      | sim                         |
| `form_start`        | Primeiro foco no formulário            | `form_id`, `pagina_conversao`                                 | sim                         |
| `form_step`         | Passo concluído                        | `form_id`, `passo`, `intencao`                                | sim                         |
| `generate_lead`     | Envio aceite                           | `form_id`, `intencao`, `mercado`, `idioma`, `faixa_pontuacao` | sim                         |
| `candidate_submit`  | Envio com "Procuro emprego"            | `idioma`                                                      | sim                         |
| `meeting_booked`    | Reunião marcada                        | `origem_cta`, `mercado`                                       | integração com o calendário |
| `calculator_result` | Estimativa mostrada                    | `perfis`, `mercado`, `modelo`                                 | sprint 5                    |
| `calculator_email`  | Pedido do detalhe                      | `perfis`, `mercado`                                           | sprint 5                    |
| `resource_download` | Relatório ou guia                      | `recurso_id`                                                  | fase de conteúdo            |
| `case_view`         | Caso aberto                            | `caso_id`, `setor`                                            | sim                         |
| `whatsapp_click`    | WhatsApp (`/br/`)                      | `pagina`                                                      | sprint 4                    |
| `language_switch`   | Mudança de idioma                      | `de`, `para`                                                  | sim                         |

## Atribuição

- Com consentimento: cookie próprio `yw_ft` (90 dias) com página de entrada, referrer, UTMs, `gclid` e `li_fat_id` da primeira visita (`src/lib/analytics/attribution.ts`).
- Sem consentimento: o formulário envia só a página atual e o referrer.
- Tudo segue em campos escondidos para o CRM (`yw_landing_page`, `utm_*`…). O CRM guarda a primeira e a última origem e passa-as para a oportunidade.
- Sinais para a pontuação (`yw_pricing_viewed`, `yw_cases_viewed`) vivem no `sessionStorage` e só são escritos nas páginas de preços e de casos.

## Configuração do GTM

1. Variáveis de camada de dados para cada propriedade da tabela.
2. Etiqueta de configuração do GA4 e etiquetas de evento para os 12 eventos.
3. Marcar `generate_lead` e `meeting_booked` como eventos-chave.
4. Verificar cada evento no modo de pré-visualização antes de dar a tarefa como feita.

## Relatório semanal

Visitas orgânicas → leads → leads qualificados → oportunidades → ganhos, por mercado, por tipo de página de entrada e por CTA.
