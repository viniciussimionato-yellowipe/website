# 02 · Padrões de código

## TypeScript

- Modo estrito com `noUncheckedIndexedAccess`. Sem `any`; quando inevitável, `unknown` e validação.
- Tipos de dados externos (formulário, CMS, APIs) vêm de esquemas zod: `z.infer<typeof Esquema>`.
- `import type` para tipos (regra de lint).
- Alias `@/` para `src/`.

## React e Next.js

- Componentes de servidor por omissão. `'use client'` só onde há estado ou eventos do browser.
- Props de componentes de cliente são serializáveis (texto, números, arrays, objetos simples).
- `params` são `Promise` (Next.js 15+): `const { locale } = await params`.
- Imagens com `next/image`, sempre com `width` e `height`; `priority` só na imagem do hero.
- Links internos com `next/link` e `href` vindo de `pathFor()`.
- Nada de `useEffect` para dados que o servidor já tem.
- Estado derivado calcula-se no render; não se guarda em estado.

## Estilos

- Tailwind CSS 4 com tokens da marca em `src/app/globals.css` (`@theme`). Usar `bg-navy`, `text-body`, `border-line`, `text-gold`; nunca cores soltas, exceto as já previstas no design.
- Contraste: amarelo `#F4BE14` só sobre navy; sobre branco usar dourado `#8A6600`.
- Classes utilitárias no JSX; componentes repetidos em `@layer components` (`btn-primary`, `btn-navy`, `eyebrow`, `container-site`).
- Tipografia: IBM Plex Sans para títulos (`font-display`), Montserrat para texto (`font-sans`), IBM Plex Mono para rótulos (`font-mono`).
- Mobile primeiro; pontos de quebra `sm` 640, `md` 768, `lg` 1024.

## Nomes

| Coisa                      | Convenção              | Exemplo                          |
| -------------------------- | ---------------------- | -------------------------------- |
| Componentes                | PascalCase             | `LeadForm.tsx`                   |
| Funções e variáveis        | camelCase              | `pathFor`, `scoreLead`           |
| Ficheiros de lib           | camelCase ou kebab     | `scoring.ts`, `check-content.ts` |
| IDs de conteúdo e slugs    | kebab-case sem acentos | `automacao-de-testes`            |
| Eventos                    | snake_case             | `generate_lead`                  |
| Comentários e documentação | português (pt-PT)      |                                  |

## Formatação e lint

Prettier (aspas simples, ponto e vírgula, 100 colunas) e ESLint (`eslint-config-next` com Core Web Vitals e TypeScript). Correm no commit (`lint-staged`) e na CI.

## Tratamento de erros

- Rotas do servidor devolvem `{ ok: false, error: '<código>' }` com o estado HTTP certo; nunca mensagens internas.
- Logs em JSON, uma linha, sem dados pessoais: `{"evt":"lead.delivery_failed","system":"crm","error":"hubspot_500"}`.
- O formulário mostra uma mensagem humana e aponta os campos com erro.
