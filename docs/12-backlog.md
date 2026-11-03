# 12 · Backlog por sprint

Sprints de duas semanas. Lançamento pt-PT e pt-BR na semana 13; inglês no sprint 4. O estado vivo de cada item está no documento de planeamento (aba Desenvolvimento) ou no quadro de tarefas da equipa; aqui fica o âmbito.

Legenda: ✅ feito nesta base · 🔶 parcialmente feito · ⬜ por fazer

| Sprint         | Item                                                                            | Requisito  | Estado                                                                                |
| -------------- | ------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------- |
| 0 · sem. 5–6   | Repositório, CI e três ambientes                                                | R-10       | 🔶 CI e configuração prontas; falta criar o repositório e o alojamento                |
| 0 · sem. 5–6   | Projeto no CMS com idiomas e configuração global                                | R-02       | ⬜ depende da decisão do CMS; esquemas prontos em `src/content/schema.ts`             |
| 0 · sem. 5–6   | Tokens de design da v7 em código                                                | R-01       | ✅ `src/app/globals.css`                                                              |
| 0 · sem. 5–6   | Inventário de URLs atuais e mapa de redirecionamentos                           | R-10       | ⬜ preencher `docs/redirects.csv`                                                     |
| 0 · sem. 5–6   | Acessos: GA4, GTM, Search Console, CRM de testes, API do ATS                    | R-08       | ⬜                                                                                    |
| 1 · sem. 7–8   | Componentes base: header com mega-menu, rodapé, botões, rotação, faixa de stack | R-03       | ✅                                                                                    |
| 1 · sem. 7–8   | Homepage a partir da v7 (desktop e mobile)                                      | R-01       | 🔶 em componentes; falta revisão visual lado a lado com o design                      |
| 1 · sem. 7–8   | Tipos de conteúdo no CMS, com validações                                        | R-03       | 🔶 6 tipos em zod; faltam Perfil, Dados de custo, Comparação, Artigo, Pessoa, Recurso |
| 1 · sem. 7–8   | Rotas por idioma, hreflang e canónicos                                          | R-02       | ✅                                                                                    |
| 2 · sem. 9–10  | Template de serviço e página-pilar                                              | R-03       | ✅ template; 🔶 2 de 8 Top Services com conteúdo                                      |
| 2 · sem. 9–10  | Páginas de modelo (3)                                                           | R-04       | ✅ template; conteúdo a rever                                                         |
| 2 · sem. 9–10  | Template "Contratar perfil"                                                     | R-05       | ⬜                                                                                    |
| 2 · sem. 9–10  | Casos de sucesso e setores                                                      | R-09       | 🔶 casos prontos; setores por fazer                                                   |
| 2 · sem. 9–10  | JSON-LD, sitemaps e robots.txt                                                  | R-10       | ✅                                                                                    |
| 3 · sem. 11–12 | Formulário em três passos, rota do servidor e anti-spam                         | R-06       | ✅                                                                                    |
| 3 · sem. 11–12 | Ligação ao CRM (pontuação e encaminhamento) e ao ATS                            | R-07       | 🔶 lógica e adaptador HubSpot prontos; falta configurar o portal                      |
| 3 · sem. 11–12 | Consentimento, GTM e os 12 eventos                                              | R-08       | 🔶 7 eventos ligados; plataforma de consentimento por escolher                        |
| 3 · sem. 11–12 | Redirecionamentos 301 aplicados em staging                                      | R-10       | ⬜                                                                                    |
| 3 · sem. 11–12 | Conteúdos pt-PT e pt-BR carregados                                              | R-01       | 🔶                                                                                    |
| Sem. 13        | Testes: browsers, acessibilidade, Lighthouse, formulário até ao CRM e ATS       | R-10       | 🔶 automáticos prontos                                                                |
| Sem. 13        | Lançamento pt-PT e pt-BR; sitemaps submetidos                                   | R-02       | ⬜                                                                                    |
| 4 · mês 1      | Versão em inglês e páginas de mercado                                           | R-14       | ⬜                                                                                    |
| 4 · mês 1      | Calendário direto e WhatsApp no Brasil                                          | R-17, R-25 | 🔶 calendário pronto (variáveis de ambiente)                                          |
| 4 · mês 1      | `llms.txt`                                                                      | R-20       | ✅                                                                                    |
| 5 · mês 2      | Página de preços e calculadora                                                  | R-12       | ⬜                                                                                    |
| 5 · mês 2      | Páginas de comparação (template e 4 páginas)                                    | R-13       | ⬜                                                                                    |
| 6 · mês 3      | Página da prática de IA e tempos medidos nas páginas de modelo                  | R-15, R-16 | ⬜                                                                                    |

## Próximos passos técnicos

1. Criar o repositório na organização GitHub da Yellowipe e ligar ao alojamento (pré-visualização por pull request).
2. Escolher o CMS e escrever o adaptador (`src/content/<cms>.ts`) que devolve `Content`.
3. Configurar o HubSpot (propriedades `yw_*`, filas, workflows) e o webhook do ATS.
4. Revisão visual da home contra `docs/design/home-v7.dc.html` em 390, 768, 1280 e 1440 px.
