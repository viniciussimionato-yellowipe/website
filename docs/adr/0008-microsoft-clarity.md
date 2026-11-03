# 0008 · Microsoft Clarity para análise qualitativa

**Estado:** aceite · 2026-11-03

## Contexto

O GA4 diz _quantos_ visitantes orgânicos chegam e convertem, mas não _porquê_ os outros saem. Para melhorar as páginas que captam procura (modelos, serviços, tecnologias, casos) precisamos de ver o comportamento: até onde se lê, onde se clica sem resposta, onde o formulário é abandonado.

## Decisão

- Microsoft Clarity (gratuito, sem limite de sessões) para mapas de calor e gravações.
- Carregado diretamente pelo `ConsentManager` (`src/lib/analytics/clarity.ts`), não pelo GTM, para receber o sinal de consentimento (`consentv2`) antes do script e parar (`stop`) quando o visitante retira o consentimento.
- Só depois de aceitar análise, com `NEXT_PUBLIC_CLARITY_ID` definido (só em produção).
- Sem dados pessoais: formulários com `data-clarity-mask`, máscara "Balanced" no projeto, sem `identify`. As etiquetas vêm apenas das propriedades dos eventos tipados.
- Os eventos de `track()` são espelhados no Clarity como eventos e etiquetas; sessões com `generate_lead` ou `meeting_booked` são marcadas como prioritárias (`upgrade`).

## Consequências

- Um script de terceiros a mais (~25 KB comprimidos), carregado de forma assíncrona e só com consentimento: não afeta o LCP do primeiro acesso.
- Origens a acrescentar à futura CSP: `https://*.clarity.ms`, `https://c.bing.com`.
- A política de privacidade tem de mencionar o Clarity (Microsoft) como subcontratante de análise.
