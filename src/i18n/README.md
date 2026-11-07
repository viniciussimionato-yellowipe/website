# Traduções

Todos os textos do site que mudam de idioma estão aqui, em JSON, um ficheiro por idioma e
por tipo de texto. O pt-PT é a língua de origem.

| Idioma            | Pasta    | Como é feito                                                                                                                  |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| pt-PT (`/pt/`)    | `pt/`    | Origem. Interface em `pt/ui.json`; o conteúdo pt-PT fica em `src/content/local`, junto da estrutura (ids, relações).          |
| pt-BR (`/br/`)    | `br/`    | Traduzido à mão (`ui.json`, `content.json`). As páginas geradas (tecnologias e serviços) usam o glossário `br/glossary.json`. |
| en-US (`/en/`)    | `en/`    | Traduzido à mão. Fonte de todo o inglês.                                                                                      |
| en-GB (`/en-gb/`) | `en-gb/` | Gerado a partir do en-US (ortografia e vocabulário em `en-gb/glossary.json`). `ui.json` e `content.json` só levam exceções.   |

## Ficheiros

| Ficheiro                | O que tem                                                                       | Chaves                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `<idioma>/ui.json`      | Interface: botões, títulos, formulários, vagas, cookies…                        | As mesmas de `pt/ui.json`. O TypeScript falha se faltar uma chave.                                                                     |
| `<idioma>/content.json` | Conteúdo: modelos, áreas, serviços, casos, mercados, tecnologias (pitch, FAQs). | A forma do conteúdo: `services.<id>.summary`, `models.<id>.page.hero.h1`… Listas com `id` usam o id; as outras, a posição (`faq.0.q`). |
| `en/technologies.json`  | Páginas de tecnologia geradas (`src/content/technologies/templates.ts`).        | O texto pt-PT. Nomes de tecnologias e siglas não entram (passam iguais).                                                               |
| `en/services.json`      | Páginas de serviço geradas (`src/content/services/`).                           | O texto pt-PT.                                                                                                                         |
| `br/glossary.json`      | pt-PT → pt-BR automático nas páginas geradas.                                   | Pares `[pt-PT, pt-BR]`, frases antes de palavras.                                                                                      |
| `en-gb/glossary.json`   | Inglês americano → britânico.                                                   | `words`, `phrases`, `keep` (nomes de produtos), `izeKeep`.                                                                             |

## Tarefas comuns

**Texto novo de interface**

1. Acrescente a chave em `pt/ui.json`.
2. Acrescente a mesma chave em `br/ui.json` e `en/ui.json`. O `npm run typecheck` diz o que falta.
3. Só se o Reino Unido precisar de outra frase (não de outra ortografia): `en-gb/ui.json`.

**Mudar um texto em pt-PT do conteúdo** (`src/content/local/*.ts`)

- Mude também a tradução em `br/content.json` e `en/content.json`, no mesmo caminho.
- `npm run i18n:missing -- en` lista o que está por traduzir, já com a forma do JSON.

**Página nova (modelo, serviço, caso…)**

- Escreva o pt-PT em `src/content/local`, depois `npm run i18n:missing -- br` e `-- en`,
  traduza e cole em `br/content.json` e `en/content.json`.

**Páginas geradas (tecnologias e serviços)**

- Texto pt-PT novo em `templates.ts` ou `pages.ts` → acrescente `"texto pt-PT": "English"` no
  catálogo (`en/technologies.json` ou `en/services.json`). Se mudar o pt-PT, mude a chave.
- O pt-BR sai do glossário; se uma frase sair mal, acrescente um par em `br/glossary.json`.

**Diferença de vocabulário no Reino Unido**

- Palavra a palavra (ex.: "business day" → "working day"): `en-gb/glossary.json`, `phrases`.
- Frase inteira: `en-gb/ui.json` ou `en-gb/content.json` (ex.: CV em vez de resume).

## Verificação

`npm run i18n:check` (também corre em `npm run check` e nos testes) falha quando:

- falta uma chave ou existe uma chave que não está em pt (tradução órfã);
- os marcadores `{name}`, `{n}`… não são os mesmos do pt;
- aparece um termo de pt-PT em pt-BR (equipa, ecrã, utilizador…), português numa página em
  inglês, ortografia britânica em en-US ou americana em en-GB.

Avisos (não falham): textos pendentes `[…]` e conteúdo sem tradução.

## Regras de escrita

- **pt-BR**: você, equipe, tela, usuário, celular, arquivo, contato, cases; gerúndio
  ("está chegando"); currículo em vez de CV.
- **en-US**: ortografia americana (optimize, color, modeling); "resume" para candidatos;
  aspas e apóstrofos tipográficos (’ “ ”); prazos "within one business day".
- **en-GB**: não se escreve; só exceções (CV, working day).
- Nomes de produtos, marcas e tecnologias nunca se traduzem.
