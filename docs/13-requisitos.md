# 13 · Requisitos

Fonte: documento de planeamento, aba _Requisitos revistos_ (30 de outubro de 2026). Onde isto e o documento divergirem, vale o documento.

| ID   | Requisito                                      | Prioridade | Quando     | Critério de aceitação                                                        | Onde no código                           |
| ---- | ---------------------------------------------- | ---------- | ---------- | ---------------------------------------------------------------------------- | ---------------------------------------- |
| R-01 | Mensagem-mãe e variações por público e mercado | Essencial  | Lançamento | Mensagens aprovadas; usadas em todas as páginas                              | `src/dictionaries/`                      |
| R-02 | Três idiomas com URLs próprios e hreflang      | Essencial  | Lançamento | `/pt/`, `/br/`, `/en/` com hreflang recíproco e x-default                    | `src/lib/routing.ts`, `src/lib/seo/`     |
| R-03 | Template único de serviço                      | Essencial  | Lançamento | 8 Top Services do mesmo template                                             | `ServicePage`                            |
| R-04 | Páginas de modelo                              | Essencial  | Lançamento | Casos, FAQ e CTA "Pedir perfis"                                              | `ModelPage`                              |
| R-05 | Template "Contratar perfil"                    | Essencial  | Lançamento | 10 perfis por idioma                                                         | por fazer                                |
| R-06 | Formulário em três passos                      | Essencial  | Lançamento | Candidatos no ATS; campos escondidos em 100% dos envios                      | `LeadForm`, `/api/lead`                  |
| R-07 | Pontuação e encaminhamento no CRM              | Essencial  | Lançamento | 50+ atribuído ao comercial do mercado em menos de 1 minuto                   | `src/lib/leads/`                         |
| R-08 | Medição até à oportunidade                     | Essencial  | Lançamento | Oportunidade com página de entrada, origem e CTA                             | `src/lib/analytics/`                     |
| R-09 | Prova em todas as páginas comerciais           | Essencial  | Lançamento | 6 casos com métricas; logos e um caso por página                             | `CaseCards`, `clientApproved`            |
| R-10 | SEO técnico e performance                      | Essencial  | Lançamento | [03](03-seo-tecnico.md) e [07](07-performance-e-acessibilidade.md) cumpridos |                                          |
| R-11 | Governação de páginas programáticas            | Essencial  | Lançamento | Página sem dados não é indexada                                              | `status`, `seo.noindex`, `content:check` |
| R-12 | Preços com calculadora                         | Importante | Meses 1–3  | Resultado no ecrã e por email; lead no CRM                                   | por fazer                                |
| R-13 | Páginas de comparação                          | Importante | Meses 1–3  | 4 por idioma                                                                 | por fazer                                |
| R-14 | Páginas de mercado em inglês                   | Importante | Meses 1–3  | Portugal e Brasil para empresas dos EUA                                      | por fazer                                |
| R-15 | Tempos medidos publicados                      | Importante | Meses 1–3  | Calculados a partir do ATS                                                   | por fazer                                |
| R-16 | Página da prática de IA                        | Importante | Meses 1–3  | Nome, ferramentas, regras                                                    | por fazer                                |
| R-17 | Calendário após o formulário                   | Importante | Meses 1–3  | Só 50+; reunião no CRM                                                       | `NEXT_PUBLIC_MEETING_URL_*`              |
| R-18 | Nurturing por modelo                           | Importante | Meses 3–6  | 3 sequências de 4 emails                                                     | HubSpot                                  |
| R-19 | Programa de avaliações                         | Importante | Meses 1–12 | 15 avaliações no Clutch                                                      | fora do código                           |
| R-20 | `llms.txt` e "resumir com IA"                  | Importante | Meses 1–3  | Atualizado a cada publicação                                                 | `src/lib/seo/llms.ts`, `Footer`          |
| R-21 | Páginas de custo por perfil                    | Desejável  | Meses 6–12 | Só perfis com 10+ colocações                                                 | por fazer                                |
| R-22 | Descrições de função e perguntas de entrevista | Desejável  | Meses 6–12 | 15 perfis                                                                    | por fazer                                |
| R-23 | Diagnóstico interativo                         | Desejável  | Meses 6–12 | Relatório por email; lead pontuado                                           | por fazer                                |
| R-24 | Relatório anual de talento tech                | Desejável  | Meses 9–12 | Landing com formulário                                                       | por fazer                                |
| R-25 | WhatsApp para o Brasil                         | Desejável  | Meses 1–3  | Só em `/br/`; conversa no CRM                                                | por fazer                                |
