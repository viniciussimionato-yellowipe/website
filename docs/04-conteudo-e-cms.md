# 04 · Conteúdo e CMS

## Onde vive o conteúdo

| O quê                                                       | Ficheiro hoje                    | Depois do CMS              |
| ----------------------------------------------------------- | -------------------------------- | -------------------------- |
| Factos da empresa (anos, empresas, produtos, contactos)     | `src/config/site.ts`             | Configuração global no CMS |
| Textos de interface (botões, títulos de secção, formulário) | `src/dictionaries/{pt,br,en}.ts` | Ficam no código            |
| Modelos, áreas, serviços, casos, mercados, tecnologias      | `src/content/local/*.ts`         | CMS                        |
| Esquemas (contrato)                                         | `src/content/schema.ts`          | Ficam no código            |

Os componentes só usam `src/content/index.ts`. Trocar ficheiros locais pelo CMS = escrever um adaptador que devolve o mesmo `Content` validado pelos mesmos esquemas ([ADR 0003](adr/0003-camada-de-conteudo.md)).

## Tipos de conteúdo

| Tipo       | Campos principais                                                                                                   | Gera página quando                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Modelo     | nome, slug, palavra-chave, promessa, ideal para, como funciona, casos, FAQ, SEO                                     | `status: published` e slug no idioma                   |
| Área       | nome, descrição, linha "Com IA", serviços, modelos, prova                                                           | nunca (só home e pilar)                                |
| Serviço    | nome, slug, resumo, modelos, `page` (intro, problemas, entregáveis, IA, tecnologias, casos, FAQ, relacionados), SEO | `status: published`, `page` preenchido, slug no idioma |
| Caso       | cliente, setor, mercado, título, resumo, métricas, serviços, imagem, logo, `clientApproved`, SEO                    | `status: published` e slug no idioma                   |
| Mercado    | nome, descrição, bandeira                                                                                           | nunca (só home)                                        |
| Tecnologia | nome, faísca de IA, destaque                                                                                        | nunca (faixa de stack)                                 |

Previstos para as fases seguintes: Perfil (Contratar perfil), Dados de custo, Comparação, Artigo, Pessoa, Recurso.

## Regras de escrita

- Primeira frase de cada página = a resposta: o que é, para quem, com que prova.
- Frases curtas (menos de 25 palavras), palavras simples, voz ativa.
- Números só com fonte. Pendentes ficam entre `[ ]`: o `content:check` lista-os e bloqueia o build de produção (`CONTENT_STRICT=1`).
- **Não usar "1.000+ profissionais"** até haver confirmação.
- pt-PT e pt-BR: adaptar, não traduzir à letra.

| pt-PT             | pt-BR                           |
| ----------------- | ------------------------------- |
| equipa            | equipe                          |
| utilizador        | usuário                         |
| caso de sucesso   | case de sucesso                 |
| outsourcing de TI | alocação de profissionais de TI |
| contacto          | contato                         |
| software à medida | software sob medida             |

## Casos

Um caso só vai para produção com **autorização escrita do cliente** (`clientApproved: true`). Logótipos de clientes na home: confirmar a autorização de cada marca.

## Validação

```bash
npm run content:check                 # erros de esquema, SEO e referências
CONTENT_STRICT=1 npm run content:check # o que ainda bloqueia o lançamento
```
