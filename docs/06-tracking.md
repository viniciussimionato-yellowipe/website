# 06 · Tracking

## Regras

- Os eventos estão tipados em `src/lib/analytics/events.ts`; um evento novo entra lá primeiro.
- **Nenhum dado pessoal** no dataLayer (nome, email, telefone, empresa, mensagem).
- O GTM e o Clarity só carregam depois de o visitante aceitar análise (modo básico do Consent Mode, ADR 0008).
- Eventos-chave no GA4: `generate_lead` e `meeting_booked`.

## Eventos

| Evento              | Quando dispara                         | Propriedades                                                            | Implementado                |
| ------------------- | -------------------------------------- | ----------------------------------------------------------------------- | --------------------------- |
| `page_context`      | Carga inicial e cada navegação         | `tipo_pagina`, `pagina_id`, `idioma`                                    | sim                         |
| `web_vitals`        | LCP, INP, CLS, FCP e TTFB reais        | `metrica`, `valor`, `classificacao`, `tipo_pagina`                      | sim                         |
| `cta_click`         | Clique em qualquer CTA (`TrackedLink`) | `cta_id`, `cta_text`, `posicao`, `tipo_pagina`, `modelo`                | sim                         |
| `form_start`        | Primeiro foco no formulário            | `form_id`, `pagina_conversao`                                           | sim                         |
| `form_step`         | Passo concluído                        | `form_id`, `passo`, `intencao`                                          | sim                         |
| `generate_lead`     | Envio aceite                           | `form_id`, `intencao`, `mercado`, `idioma`, `faixa_pontuacao`, `cta_id` | sim                         |
| `form_error`        | Validação falhou (browser ou servidor) | `form_id`, `passo`, `campos` (nomes, nunca valores)                     | sim                         |
| `contact_click`     | Clique em email ou telefone            | `canal`, `tipo_pagina`                                                  | sim                         |
| `faq_open`          | Pergunta frequente aberta              | `pergunta`, `tipo_pagina`                                               | sim                         |
| `candidate_submit`  | Envio com "Procuro emprego"            | `idioma`                                                                | sim                         |
| `meeting_booked`    | Reunião marcada                        | `origem_cta`, `mercado`                                                 | integração com o calendário |
| `calculator_result` | Estimativa mostrada                    | `perfis`, `mercado`, `modelo`                                           | sprint 5                    |
| `calculator_email`  | Pedido do detalhe                      | `perfis`, `mercado`                                                     | sprint 5                    |
| `resource_download` | Relatório ou guia                      | `recurso_id`                                                            | fase de conteúdo            |
| `case_view`         | Caso aberto                            | `caso_id`, `setor`                                                      | sim                         |
| `whatsapp_click`    | Clique num link wa.me (`/br/`)         | `pagina`                                                                | sim (falta o link no site)  |
| `language_switch`   | Mudança de idioma                      | `de`, `para`                                                            | sim                         |

## Atribuição

- Com consentimento: cookie próprio `yw_ft` (90 dias) com página de entrada, referrer, UTMs, `gclid` e `li_fat_id` da primeira visita (`src/lib/analytics/attribution.ts`).
- Sem consentimento: o formulário envia só a página atual e o referrer.
- Tudo segue em campos escondidos para o CRM (`yw_landing_page`, `utm_*`…). O CRM guarda a primeira e a última origem e passa-as para a oportunidade.
- Sinais para a pontuação (`yw_pricing_viewed`, `yw_cases_viewed`) vivem no `sessionStorage` e só são escritos nas páginas de preços e de casos.

## Configuração do GTM

1. Variáveis de camada de dados para cada propriedade da tabela.
2. Etiqueta de configuração do GA4 **sem** page_view automático. O `page_view` do GA4 dispara no evento `page_context`, com `tipo_pagina`, `pagina_id` e `idioma`. Nas definições do fluxo de dados, desligar "Alterações de página com base em eventos do histórico do browser" para não contar a mesma vista duas vezes (o site navega no cliente).
3. Etiquetas de evento para os restantes eventos da tabela.
4. Eventos-chave (conversões): `generate_lead`, `meeting_booked`, `contact_click` e `whatsapp_click`. `contact_click` e `whatsapp_click` são contactos diretos que não passam pelo formulário; sem eles, as páginas que geram chamadas parecem não converter.
5. Dimensões personalizadas (âmbito de evento): `tipo_pagina`, `pagina_id`, `idioma`, `cta_id`, `posicao`, `modelo`, `intencao`, `mercado`, `faixa_pontuacao`, `canal`, `pergunta`, `campos`, `metrica`, `classificacao`. Métrica personalizada: `valor`.
6. Valor do lead para o Google Ads (decisão comercial pendente): no GTM, mapear `faixa_pontuacao` para um valor (ex.: 50+ → valor de uma oportunidade média) e enviá-lo com `generate_lead`. Permite licitar por valor em vez de por número de leads.
7. Ligar o Search Console ao GA4 (consultas → página de entrada).
8. Verificar cada evento no modo de pré-visualização antes de dar a tarefa como feita.

## Microsoft Clarity

Mapas de calor e gravações para perceber _porquê_ as visitas orgânicas convertem ou não (ADR 0008). Código em `src/lib/analytics/clarity.ts`.

### Configuração do projeto

- Um projeto só para produção; `NEXT_PUBLIC_CLARITY_ID` vazio nos outros ambientes.
- Definições → **Cookie consent required: ligado** (o site envia o `consentv2`).
- Máscara **Balanced**. Os formulários (contacto, candidatura, CV, alertas de vagas) já têm `data-clarity-mask`; não mudar para "Relaxed".
- Excluir os IPs da Yellowipe e ligar a integração com o GA4.
- Nunca chamar `clarity('identify')`: o Clarity não recebe identidade de ninguém.

### O que o site envia

| Tipo              | O quê                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------- |
| Etiquetas (`set`) | `tipo_pagina`, `pagina_id`, `idioma`, `modelo`, `intencao`, `mercado`, `faixa_pontuacao`  |
| Eventos (`event`) | Todos os eventos da tabela acima, exceto `page_context` (vira etiqueta) e `web_vitals`    |
| Prioridade        | Sessões com `generate_lead`, `meeting_booked` ou `calculator_result` são sempre guardadas |

### Atribuição ao CTA de origem

`TrackedLink` guarda o último CTA da sessão (`sessionStorage`, `yw_last_cta`: id do CTA, página e modelo). O formulário envia-o ao CRM (`yw_cta_id`, `yw_cta_page`) e ao GA4 (`cta_id` no `generate_lead`), e pré-escolhe a intenção quando o CTA vem de uma página de modelo. O `form_id` diz em que página estava o formulário (`home-contacto`, `servico-<id>`, `modelo-<id>`, `tecnologia-<id>`, `caso-<id>`); quando o visitante chega ao formulário sem clicar num CTA, o CTA atribuído é `<tipo>-<id>-formulario`. Um lead feito em `/contacto/` (cabeçalho) fica atribuído à página onde foi clicado o CTA.

### Segmentos a guardar no Clarity

1. **Orgânico por tipo de página**: canal = pesquisa orgânica × `tipo_pagina` (`model`, `service`, `technology`, `case`, `home`).
2. **Abandono do formulário**: evento `form_start` sem `generate_lead`.
3. **Converteu**: evento `generate_lead` (comparar o percurso com o segmento anterior).
4. **Frustração**: rage clicks ou dead clicks, por página.
5. **Telemóvel orgânico**: dispositivo móvel + pesquisa orgânica (a maioria das primeiras visitas).

Funil no Clarity: entrada orgânica → `cta_click` → `form_start` → `form_step` → `generate_lead`.

## Plano de aprendizagem

O site existe para transformar pesquisa orgânica em oportunidades. Cada pergunta tem a sua fonte e uma ação esperada.

| Pergunta                                                         | Fonte                                                                     | Ação quando a resposta aparece                                            |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Que tipos de página orgânica geram leads qualificados?           | GA4: `page_context` de entrada × `generate_lead` × `faixa_pontuacao`; CRM | Investir conteúdo nos tipos que convertem; rever os que só trazem tráfego |
| Que consultas trazem visitas que convertem?                      | Search Console ligado ao GA4                                              | Novas páginas e secções para as consultas com intenção comercial          |
| As páginas programáticas (serviços, tecnologias) trazem procura? | GA4 por `tipo_pagina` e `pagina_id`                                       | Acrescentar dados próprios ou passar a `noindex` (docs/03)                |
| Até onde se lê uma página de modelo antes de sair?               | Clarity: mapa de scroll                                                   | Subir provas e CTA para antes do ponto de abandono                        |
| Que CTAs funcionam e em que posição?                             | GA4: `cta_click` por `cta_id` e `posicao`                                 | Retirar CTAs sem cliques; repetir o padrão dos que funcionam              |
| Onde se perde o formulário?                                      | GA4: `form_start` → `form_step`; Clarity: segmento de abandono            | Simplificar o passo com mais perdas                                       |
| Há cliques em coisas que não são links?                          | Clarity: dead clicks e rage clicks                                        | Tornar clicável ou mudar o desenho                                        |
| A performance real está dentro das metas (docs/07)?              | GA4: `web_vitals`, percentil 75 por `tipo_pagina`                         | Corrigir o tipo de página que falha antes de produzir mais conteúdo       |

### Ritual

- **Semanal (30 min):** relatório abaixo + 10 gravações do segmento "Abandono do formulário" + mapas de calor das 5 páginas de entrada orgânica com mais visitas. Cada observação vira uma hipótese no backlog (o que mudar, que métrica deve mexer).
- **Mensal:** rever as hipóteses testadas, a performance real por tipo de página e as consultas novas do Search Console.

## Relatório semanal

Visitas orgânicas → leads → leads qualificados → oportunidades → ganhos, por mercado, por tipo de página de entrada e por CTA.
