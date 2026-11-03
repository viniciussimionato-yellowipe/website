# 14 · Máquina de conteúdo de tecnologias

## Benchmark: BairesDev, separador Technologies

- **Menu**: tecnologias agrupadas por categoria; cada item abre uma página própria com URL curto (`/technologies/net/`).
- **Mesma estrutura em todas as páginas**: hero com palavra-chave, logótipos de clientes, serviços, modelos de contratação, processo, perfis, ferramentas, casos, FAQ, tecnologias relacionadas e CTA.
- **Conteúdo moldado por stack**: a estrutura é igual, mas serviços, ferramentas e perguntas mudam com a tecnologia.
- **IA não é um item do menu**: em cada página há só uma linha discreta, "AI coding tools we use".
- **Sem submenu na página**: o cabeçalho tem um único CTA; a página lê-se de cima para baixo.

## Que stacks entram (e porquê)

A lista cruza três fontes. Uma stack entra quando tem procura no nosso portefólio **e** no mercado.

1. **Vagas Yellowipe (Pipefy, 1.216 posições)**, campo "Technologies". Mais pedidas: Java 149, Python 131, SQL 129, AWS 102, JavaScript 95, React 83, Azure 83, Kubernetes 72, .NET 66, Node.js 56, Docker 54, Terraform 47, PostgreSQL 46, TypeScript 41, Kafka 38, Oracle 37, Angular 37, PHP 35, MongoDB 33, Salesforce 29, Go 28, MySQL 28, GCP 27, Vue 27, Power BI 26, SQL Server 26, SAP 25, OutSystems 24.
   - **QA** (vagas de QA): Selenium 12, Cypress 10, Postman 7, Appium 6, Cucumber 6, JMeter 5, Robot Framework 4, Playwright 3 (+ k6 e LoadRunner).
   - **Dados** (vagas de dados): Python 51, SQL 32, Power BI 20, Airflow 19, Spark 20, Machine Learning 16, ETL 15, Redshift 11, Kafka 9, dbt 7, Databricks 5, BigQuery 9.
   - Cargos mais frequentes em dados: data engineer (o mais pedido), data scientist, DataOps, analytics/BI.
2. **Stack Overflow Developer Survey 2025**:
   - Bases de dados: PostgreSQL 55,6%, MySQL 40,5%, SQL Server 30,1%, MongoDB 24%, Oracle 10,6%.
   - Cloud: AWS 43,3%, Azure 26,3%, Google Cloud 24,6%.
   - Web: Node.js 48,7%, React 44,7%, Next.js 20,8%, ASP.NET Core 19,7%, Angular 18,2%, Vue 17,6%.
   - Dados: BigQuery 6,5%, Snowflake 4,1%, Databricks SQL 3,4%, Microsoft Fabric 2,4%.
3. **Mercado**:
   - Michael Page, tendências 2026 em Portugal: Cloud, cibersegurança, ERP/CRM, IoT, Machine Learning, IA e Big Data.
   - LinkedIn, profissões em crescimento no Brasil 2026: Engenheiro de IA (n.º 1) e Especialista em Dados (n.º 11).
   - Automação de testes: Playwright cresce mais depressa (downloads npm cerca de +240% ao ano), Cypress cerca de +130%, e Selenium mantém uma base enterprise estável.

## Stacks (39)

Critério: só entra uma stack com procura forte nas nossas vagas **e** no mercado, e com conteúdo que justifique uma página própria. Ficaram de fora JavaScript (coberto por React, Angular, Vue e TypeScript), Cucumber e Robot Framework (pouca procura; BDD cabe nas páginas de Selenium e Playwright), dbt e Snowflake (sem procura relevante nas nossas vagas) e MySQL (PostgreSQL cobre o relacional open source).

- **Front-end**: React, Angular, Next.js, Vue.js, TypeScript
- **Mobile**: React Native, Flutter, iOS, Android
- **Back-end**: Java, Python, .NET, Node.js, PHP, Go
- **Cloud e DevOps**: AWS, Azure, Google Cloud, Kubernetes, Docker, Terraform
- **Dados**: Power BI, Databricks, Apache Spark, Apache Airflow, Apache Kafka · bases de dados PostgreSQL, SQL Server, Oracle, MongoDB (o menu mostra as 6 primeiras)
- **ERP, CRM e low-code**: Salesforce, SAP, OutSystems
- **Qualidade e testes**: Playwright, Selenium, Cypress, Appium, JMeter (com k6), Postman (com REST Assured)

## Arquitetura

```
src/content/technologies/
  stacks.ts     factos por stack (o que muda de página para página)
  templates.ts  textos por categoria em pt-PT e inglês, com {name}
  build.ts      buildTechPage(stack, locale) → TechPageView; auditTechPage()
```

- **Categorias**: front-end, mobile, back-end, cloud, devops, data, database, enterprise, qa. Cada uma tem 6 serviços (problema → o que fazemos), 4 perfis, 5 camadas do cartão, 2 perguntas próprias e serviços relacionados.
- **QA**: os serviços são genéricos: automação, framework, pipeline, fábrica de testes (manual + automático, como nas nossas propostas), QA na equipa e estratégia. O que é próprio da ferramenta vai em `serviceTags`, `faq` e `serviceOverrides`.
- **Por stack**:
  - nome, slug, palavra-chave e `role` opcionais, pitch, versão;
  - camadas, ferramentas e etiquetas por serviço;
  - `serviceOverrides` opcional (ex.: JMeter troca "Automação" por "Testes de carga e stress");
  - FAQ próprio, relacionadas e casos.
- **FAQ final** = FAQ da stack + FAQ da categoria + FAQ comum (inclui a pergunta sobre IA). Gera `FAQPage` em JSON-LD.
- **pt-BR**: gerado a partir do pt-PT com o glossário `ptToBr`. Respeita palavras inteiras e acentos, e trata primeiro as frases inteiras para corrigir o género (ecrã → tela, base de dados → banco de dados). **Rever por amostragem.**
- **URLs**: `/pt/tecnologias/{slug}/`, `/br/tecnologias/{slug}/`, `/en/technologies/{slug}/`. Entram no sitemap, no hreflang e no llms.txt automaticamente.
- **Logótipos**: `public/images/tech` (fontes no README). Sem ficheiro, o componente `TechLogo` mostra as iniciais num quadrado neutro. Nunca se desenha uma versão própria do logótipo de outra marca.

## Acrescentar uma tecnologia

1. Logótipo em `public/images/tech` (fonte e licença no README).
2. Entrada em `stacks.ts` com pitch próprio, camadas, ferramentas e etiquetas para os 6 serviços da categoria.
3. Id no grupo certo de `technologyGroups` (e em `menu`, se for das mais procuradas).
4. `npm run check`. O `content:check` e `tests/unit/technologies.test.ts` falham se houver:
   - `{texto}` por resolver;
   - título SEO acima de 60 caracteres ou descrição fora de 70–160;
   - "squad";
   - placeholders;
   - serviços sem etiquetas.

## Pendentes

- Prazo médio para apresentar perfis: a pergunta saiu do FAQ até haver número confirmado.
- Casos por stack: `caseIds` vazio até haver casos publicados com essa tecnologia.
- Revisão humana do pt-BR e do inglês.
