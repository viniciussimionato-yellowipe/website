# Como contribuir

## Fluxo

1. Cada trabalho parte de uma tarefa do backlog (`docs/12-backlog.md`) ligada a um requisito (R-01 a R-25).
2. Criar um ramo a partir de `main`: `feat/r05-contratar-perfil`, `fix/formulario-passo-2`, `content/caso-linde`.
3. Commits pequenos, em [Conventional Commits](https://www.conventionalcommits.org/), em português:
   - `feat:` funcionalidade · `fix:` correção · `content:` textos e casos · `seo:` SEO técnico
   - `refactor:` · `perf:` · `test:` · `docs:` · `build:` · `ci:` · `chore:`
4. Abrir pull request com o modelo preenchido. A CI tem de ficar verde.
5. Pelo menos uma revisão aprovada. Mudanças em `lib/leads`, `lib/analytics`, `proxy.ts` ou `next.config.ts` pedem revisão de quem conhece a área.
6. Merge com _squash_. O ramo `main` publica em produção; cada pull request tem pré-visualização.

## Ganchos locais

O `husky` corre `lint-staged` (ESLint + Prettier nos ficheiros alterados) antes de cada commit e o `commitlint` valida a mensagem.

## Revisão: o que olhar

- Cumpre a [definição de pronto](docs/11-definicao-de-pronto.md)?
- URLs por `pathFor`, conteúdo pela camada de conteúdo, factos de `config/site.ts`?
- Texto indexável no HTML inicial? Um só H1? Títulos de secção como H2?
- Novos eventos tipados e sem dados pessoais?
- Funciona com teclado e com movimento reduzido?
- Algum número ou afirmação nova tem fonte?

## Versões

`CHANGELOG.md` regista o que muda para o negócio (páginas novas, mudanças de formulário, tracking). Versões semânticas: `0.x` até ao lançamento, `1.0.0` no lançamento pt-PT e pt-BR.
