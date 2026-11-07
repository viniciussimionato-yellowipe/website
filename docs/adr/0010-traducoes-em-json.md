# ADR 0010 — Traduções em JSON por idioma

- Estado: aceite
- Data: 2026-11-07

## Contexto

Os textos traduzidos estavam espalhados: dicionários em TypeScript (`src/dictionaries/*.ts`),
campos `{ pt, br, en }` dentro dos ficheiros de conteúdo, um ficheiro inglês à parte para as
páginas de modelo, catálogos inglês dentro de `templates.ts` (pares `{ pt, en }`, `CHIP_EN`)
e em `services/en.ts`, e glossários pt-BR e en-GB no código. Acrescentar ou rever um idioma
obrigava a abrir muitos ficheiros com estrutura e código misturados.

## Decisão

1. Todas as traduções vivem em `src/i18n/<idioma>/*.json` (ver `src/i18n/README.md`).
2. O pt-PT é a origem: a interface em `pt/ui.json`; o conteúdo em `src/content/local`,
   porque aí vive a estrutura (ids, relações, estados).
3. `content.json` tem a forma do conteúdo; a camada de conteúdo junta-o ao pt-PT ao carregar
   (`applyTranslations`), antes de derivar o en-GB.
4. Páginas geradas usam catálogos com chave = texto pt-PT (estilo gettext), para que as
   máquinas de conteúdo continuem escritas numa só língua.
5. en-GB deriva do en-US por regras e glossário; só exceções são escritas.
6. `npm run i18n:check` (e um teste) audita chaves, marcadores e termos de cada idioma.

## Consequências

- Rever um idioma = ler os JSON desse idioma.
- Mudar um texto pt-PT de conteúdo obriga a mudar a tradução no mesmo caminho; o check avisa.
- Sem bibliotecas de i18n novas (ADR 0007).
- Passar para uma plataforma de tradução ou um CMS no futuro é exportar/importar estes JSON.
