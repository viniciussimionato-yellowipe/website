# 0001 · Next.js 16 (App Router) na Vercel

**Estado:** aceite · 2026-10-30

## Contexto

O site precisa de HTML completo para o Google, páginas geradas a partir de conteúdo estruturado, três idiomas e algumas partes interativas (formulário, calculadora). A equipa já usou Next.js no site atual.

## Decisão

Next.js 16 com App Router, React 19 e TypeScript estrito. Páginas geradas no build (`generateStaticParams`), uma rota de servidor para leads. Alojamento na Vercel com funções na UE.

## Alternativas

- Astro: excelente para sites de conteúdo, mas o formulário, a calculadora e a futura área de recursos ficariam em ilhas de outra biblioteca.
- Netlify ou Cloudflare para alojamento: válidos; a escolha da Vercel é pela integração nativa (revalidação, pré-visualizações).

## Consequências

- Next.js 16 usa `proxy.ts` em vez de `middleware.ts` e `params` assíncronos.
- Node.js 20.9+ obrigatório.
