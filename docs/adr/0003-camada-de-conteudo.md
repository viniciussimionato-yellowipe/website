# 0003 · Camada de conteúdo com esquemas; CMS por decidir

**Estado:** aceite (escolha do CMS em aberto) · 2026-10-30

## Contexto

O desenvolvimento tem de começar antes de o CMS estar escolhido. Os templates programáticos (serviço, perfil, custo) precisam de campos estruturados e validados.

## Decisão

Esquemas zod em `src/content/schema.ts` são o contrato. Hoje o conteúdo vive em `src/content/local/`. Os componentes só usam `src/content/index.ts`. O CMS entra como adaptador que devolve o mesmo `Content`.

Recomendação para o CMS: **Sanity** (modelo em código, versionado com o site, bom para conteúdo estruturado). Alternativa: **Storyblok**, se o marketing preferir um editor visual de blocos.

## Consequências

- Trocar de fonte não mexe em componentes.
- Conteúdo inválido parte o build em vez de chegar ao site.
- Ao escolher o CMS: espelhar os esquemas no CMS, escrever o adaptador e ligar o webhook de publicação à revalidação.
