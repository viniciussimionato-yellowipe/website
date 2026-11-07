# Instruções para assistentes de IA (Claude Code, Codex, Copilot, Cursor) e para quem programa

Este ficheiro é lido automaticamente por agentes de código. Vale também para pessoas.

## Contexto

Site da Yellowipe em Next.js 16 (App Router), React 19, TypeScript estrito e Tailwind CSS 4. Três idiomas com URLs próprios: `/pt/` (pt-PT), `/br/` (pt-BR), `/en/`. O objetivo do site é gerar oportunidades comerciais vindas da pesquisa orgânica, não tráfego.

## Regras que não se quebram

1. **URLs só por `pathFor()`** (`src/lib/routing.ts`). Nunca escrever caminhos à mão em componentes.
2. **Conteúdo só pela camada de conteúdo** (`src/content/index.ts`). Componentes não importam de `src/content/local/`.
3. **Factos da empresa só de `src/config/site.ts`.** Nada de números escritos noutros sítios. Não usar "1.000+ profissionais".
4. **pt-PT e pt-BR são textos diferentes.** Nunca copiar um para o outro sem adaptar (equipa/equipe, utilizador/usuário, caso/case).
5. **Nenhum dado pessoal no dataLayer, no GA4 ou nos logs.** Nome, email, telefone e empresa só vão para o CRM ou o ATS.
6. **Candidatos nunca entram no CRM.** A intenção `job` vai sempre para o ATS.
7. **Nada de scripts de terceiros antes do consentimento.**
8. **Conteúdo indexável tem de estar no HTML inicial.** Abas, acordeões e rotações renderizam todo o texto no servidor.
9. **Páginas programáticas só com dados próprios suficientes** (ver `docs/03-seo-tecnico.md`). Sem dados, `noindex` ou não existem.
10. **Acessibilidade WCAG 2.2 AA**: foco visível, teclado, contraste, `prefers-reduced-motion`.

## Como trabalhar

- Antes de mudar: ler o doc relevante em `docs/` e o ADR, se existir.
- Depois de mudar: `npm run check`. Se mexeu em páginas, `npm run build && npm run test:e2e`.
- Componentes de servidor por omissão. `'use client'` só para interação (rotação, abas, formulário, menu, consentimento).
- Um evento de tracking novo entra primeiro em `src/lib/analytics/events.ts`.
- Uma regra de pontuação nova muda `src/lib/leads/scoring.ts` **e** `tests/unit/scoring.test.ts`.
- Textos e traduções: `src/i18n/<idioma>/*.json` (ver `src/i18n/README.md`). Texto novo de interface entra em `pt`, `br` e `en` (o TypeScript obriga); en-GB deriva do en. `npm run i18n:check` antes de fazer commit.
- Commits em Conventional Commits (`feat:`, `fix:`, `content:`, `seo:`…), em português.

## Imagens do mockup

- O mockup (`docs/design/home-v7.dc.html`) refere imagens como `/_blob/<id>`. Todas estão exportadas em `public/images/`; a correspondência id → ficheiro está em `docs/design/assets.md`. Consultar essa tabela antes de dizer que uma imagem falta.
- Usar as medidas e o posicionamento do mockup. Exceção aprovada: o mapa dos mercados é vetorial (`MarketsMap.tsx`), não o PNG do mockup.
- Imagens que vão ser ampliadas (zoom, ecrãs grandes) devem ser vetoriais (SVG) ou ter resolução suficiente para o tamanho final; nunca ampliar um PNG por CSS.
- Um `/_blob/` que não esteja na tabela: pedir a exportação ao design (SVG ou PNG transparente), guardar em `public/images/` e acrescentar a linha à tabela no mesmo pull request. Não substituir por um desenho aproximado sem aprovação.

## O que não fazer

- Não instalar bibliotecas de UI, animação ou i18n sem um ADR. O projeto evita dependências de propósito.
- Não usar `localStorage` para estado que importa (leads, consentimento): usar cookies próprios ou o servidor.
- Não desligar regras de lint, nem o modo estrito do TypeScript, para "fazer passar".
- Não inventar números, clientes, prazos ou certificações. Pendentes ficam entre `[ ]` e o `content:check` apanha-os.

- Logótipos e ícone da marca: usar só os ficheiros da pasta de assets no Google Drive (ver docs/design/assets.md). Nunca redesenhar nem deformar.
