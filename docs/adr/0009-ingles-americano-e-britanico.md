# ADR 0009 — Inglês americano (/en/) e britânico (/en-gb/)

- Estado: aceite
- Data: 2026-11-05

## Contexto

O site tinha um só inglês, com ortografia mista. Os compradores nos EUA e no Reino Unido
pesquisam com ortografias diferentes (optimize/optimise, color/colour) e o Google escolhe a
versão pelo `hreflang`.

## Decisão

- `/en/` é inglês americano (`en-US`) e a fonte de todo o inglês.
- `/en-gb/` (`en-GB`) deriva do americano por regras de ortografia e um glossário
  (`src/i18n/en-gb/glossary.json`, `src/lib/i18n/british.ts`); só se escrevem exceções
  (ex.: CV em vez de resume) em `src/i18n/en-gb/`.
- Os slugs são os mesmos nas duas versões; muda só o prefixo.
- Deteção: browser `en-GB` (ou país do Reino Unido/Commonwealth com browser em `en`) → `/en-gb/`.
- Sem mercado comercial próprio no Reino Unido: contactos e formulário usam Portugal.

## Consequências

- Um texto inglês novo chega às duas versões sem trabalho a dobrar.
- Os testes garantem que não fica ortografia britânica no en-US nem americana no en-GB.
