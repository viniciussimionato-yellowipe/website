# 15 · Máquina de conteúdo de serviços

## Benchmark: BairesDev, página de serviço (`/technologies/ai/`)

A BairesDev usa nas páginas de serviço a mesma estrutura das páginas de tecnologia: hero com palavra-chave, logótipos de clientes, ofertas do serviço, equipa, casos, ferramentas, perfis, modelos de contratação, FAQ e CTA. Seguimos o mesmo princípio: **as páginas de serviço usam o mecanismo e o desenho das páginas de tecnologia** (`docs/14-tecnologias.md`), com o conteúdo moldado ao serviço.

Cada item de serviço do mega-menu, da home ("Sete áreas") e do hub de serviços abre a página desse serviço.

## Arquitetura

```
src/content/services/
  pages.ts      factos por serviço (o que muda de página para página)
  templates.ts  textos por área: camadas, perfis, FAQ, processo, modelos, glossário pt-BR
  build.ts      buildServicePage(service, locale) → ServicePageView; auditServicePage()
src/components/templates/service.tsx   apresentação (mesmas classes da página de tecnologia)
```

- **Serviço** (`content/local/services.ts`): nome, slug, palavra-chave, resumo e modelos. Ganha página quando tem factos em `services/pages.ts`.
- **Factos por serviço**:
  - pitch e nota do cartão do topo;
  - cinco camadas, pela ordem das etiquetas da área;
  - **seis ofertas**, cada uma com problema do cliente → o que fazemos → etiquetas;
  - `stackIds`: ligações às páginas de tecnologia;
  - ferramentas por grupo, competências dos perfis, FAQ próprio, casos e serviços relacionados.
- **Por área** (7): etiquetas das camadas, quem trabalha (`{role}`), quatro perfis ilustrativos e duas perguntas.
  - O recrutamento tem o seu próprio processo (briefing → shortlist → contratação).
- **Modelos**: só os modelos em que o serviço existe (`service.models`). O recrutamento mostra só o Contrate.
- **FAQ final** = FAQ do serviço + FAQ da área + FAQ comum (inclui a pergunta sobre IA). Gera `FAQPage` em JSON-LD.
- **SEO**:
  - título = palavra-chave + " | Yellowipe";
  - descrição = pitch + "Especialistas avaliados em Portugal e no Brasil." (70–160 caracteres);
  - a auditoria valida os comprimentos no `content:check` e nos testes unitários.
- **pt-BR**: gerado a partir do pt-PT.
  - Primeiro aplica o glossário dos serviços (`BR_SERVICES`) e depois o partilhado (`ptToBr`).
  - Nas perguntas, acrescenta o sujeito ("Vocês usam…?").
  - Evitar construções com pronome ("dizemos-lhe", "repetem-se") no texto pt-PT, que o glossário não converte.
  - **Rever por amostragem.**
- **Idiomas**: só pt e br, porque não há hub de serviços em inglês.
- **URLs**: `/pt/servicos/{slug}/`, `/br/servicos/{slug}/`. Entram no sitemap, no hreflang e no llms.txt automaticamente.

## Regras de conteúdo

- Sem números, prazos nem clientes inventados. Pendentes ficam entre `[ ]`.
- Casos só os que existem em `content/local/cases.ts`.
- Perfis são ilustrativos e a página di-lo.
- A IA aparece de forma discreta (bloco de ferramentas e uma pergunta), como nas tecnologias.

## Acrescentar um serviço

1. Entrada em `content/local/services.ts`. Para um serviço simples, chega o `draft(...)`.
2. Entrada em `content/services/pages.ts`.
3. Juntar o id à área em `content/local/areas.ts`.
4. `npm run check`.
