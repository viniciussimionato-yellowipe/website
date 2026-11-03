# 00 · Visão geral e princípios

## Para que serve o site

Gerar **oportunidades comerciais vindas da pesquisa orgânica**, em três mercados (Portugal, Brasil, EUA), para três modelos (Contrate, Reforce, Construa). Tráfego é meio, não fim.

## Posicionamento

A Yellowipe ocupa o lugar que nenhum concorrente analisado tem: recrutamento permanente, alocação e projeto, com talento e casos em Portugal e no Brasil, vendidos com proximidade nos três mercados.

- Mensagem-mãe: "Transformamos estratégia digital em capacidade real de execução."
- Não competir em escala (4.000 developers, 400 mil na rede). Competir em prova, proximidade e cobertura dos três modelos.
- Cada afirmação de rapidez ou qualidade leva um número ou um caso ao lado.

## Três máquinas

| Máquina        | Onde vive no código                                            | Documento                  |
| -------------- | -------------------------------------------------------------- | -------------------------- |
| Posicionamento | `src/dictionaries/`, `src/config/site.ts`, `src/content/`      | [04](04-conteudo-e-cms.md) |
| SEO            | `src/lib/routing.ts`, `src/lib/seo/`, `src/app/sitemap.ts`     | [03](03-seo-tecnico.md)    |
| Leads          | `src/lib/leads/`, `src/components/forms/`, `src/app/api/lead/` | [05](05-leads-e-crm.md)    |

## Princípios técnicos

1. **HTML primeiro.** Tudo o que se quer indexar está no HTML gerado no servidor.
2. **Estático por omissão.** Páginas geradas no build; só a rota de leads corre no servidor.
3. **Uma fonte para cada coisa.** URLs em `routing.ts`, factos em `site.ts`, conteúdo em `content/`, eventos em `events.ts`.
4. **Conteúdo validado.** Esquemas zod no carregamento e `content:check` antes do build.
5. **Poucas dependências.** Cada biblioteca nova precisa de um ADR.
6. **Privacidade por omissão.** Nada de terceiros antes do consentimento; nenhum dado pessoal na análise.
7. **Medido até à receita.** Cada lead leva a página de entrada e a origem até à oportunidade no CRM.

## Calendário

Lançamento pt-PT e pt-BR na semana 13 do plano; inglês 4 a 6 semanas depois (sprint 4). Detalhe em [12 · Backlog](12-backlog.md).
