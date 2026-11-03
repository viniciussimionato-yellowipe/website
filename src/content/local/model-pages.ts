import type { z } from 'zod';
import type { Model } from '../schema';

/**
 * Textos das páginas de modelo (mockup docs/design/modelo-v2.dc.html, ilustração V4).
 * pt-PT vem do mockup; pt-BR é adaptado, não copiado (equipe, você, usuários).
 * Pendentes ficam entre [ ] para o content:check os apanhar.
 */
type In = z.input<typeof Model>;
type Extra = Pick<In, 'page' | 'howItWorks' | 'faq'>;

export const contrate: Extra = {
  page: {
    pt: {
      tagline: 'O talento certo, em contratação permanente.',
      hero: {
        h1: 'Os nossos recrutadores encontram',
        h1Highlight: 'o seu próximo profissional.',
        lead: 'Uma equipa de recrutadores especializados em tecnologia procura, avalia e apresenta os candidatos certos. Contrata diretamente: o profissional passa a fazer parte da sua empresa.',
        badges: [
          'Recrutadores especializados em tech',
          'Avaliação técnica antes da shortlist',
          'Portugal, Brasil e EUA',
        ],
        cta: 'Abrir uma vaga',
        vizLabel:
          'Ilustração: recrutadores da Yellowipe avaliam candidatos e a sua empresa contrata diretamente o escolhido.',
      },
      viz: {
        scene: 'contrate',
        actor: 'Recrutadores Yellowipe',
        actorNote: 'Pesquisa ativa em Portugal, Brasil e EUA',
        working: 'A avaliar',
        ready: 'Shortlist pronta ✓',
        job: 'Vaga · Tech lead Java',
        stages: ['Triagem', 'Teste técnico', 'Entrevista'],
        candidates: [
          { initials: 'AS', name: 'Ana S.', meta: 'Java · Spring · 9 anos', stage: 'Recomendada' },
          { initials: 'BT', name: 'Bruno T.', meta: 'Java · Kotlin · 7 anos', stage: 'Entrevista' },
          { initials: 'CL', name: 'Carla L.', meta: 'Java · AWS · 8 anos', stage: 'Teste técnico' },
          { initials: 'DM', name: 'Diogo M.', meta: 'PHP · 4 anos', stage: 'Triagem' },
        ],
        waiting: 'Aguarda a contratação',
        doneTitle: 'Ana S. · Tech lead Java',
        doneNote: 'Contratada diretamente pela sua empresa',
      },
      whoLead:
        'No Contrate, a Yellowipe encontra e avalia. A partir da contratação, o profissional é seu.',
      why: {
        eyebrow: 'Porquê o Contrate',
        title: 'Contrate melhor, sem parar a equipa para recrutar.',
        lead: 'Tratamos do processo inteiro. A sua equipa só entrevista quem já passou na avaliação técnica.',
        items: [
          {
            icon: 'search',
            title: 'Recrutadores de tecnologia',
            text: 'Falam a língua das stacks e distinguem um sénior de um currículo bem escrito.',
          },
          {
            icon: 'check',
            title: 'Avaliação técnica',
            text: 'Cada candidato da shortlist passou por avaliação técnica antes de chegar a si.',
          },
          {
            icon: 'clock',
            title: 'Menos tempo da sua equipa',
            text: 'Fazemos sourcing, triagem e agendamento. A equipa só entra nas entrevistas finais.',
          },
          {
            icon: 'target',
            title: 'Talento passivo',
            text: 'Chegamos a profissionais que não estão a responder a anúncios.',
          },
          {
            icon: 'globe',
            title: 'Três mercados',
            text: 'Recrutamento em Portugal, no Brasil e para equipas nos Estados Unidos.',
          },
          {
            icon: 'loop',
            title: 'Acompanhamento após a contratação',
            text: 'Seguimos a integração nos primeiros meses para confirmar que a escolha foi a certa.',
          },
        ],
      },
      formats: {
        title: 'Do primeiro developer à liderança técnica.',
        lead: 'O mesmo processo, ajustado à senioridade e à confidencialidade de cada vaga.',
        items: [
          {
            tag: 'Vagas',
            title: 'Perfis para a sua equipa',
            text: 'Developers, QA, DevOps e dados para contratação permanente.',
            ticks: [
              'De júnior a arquiteto',
              'Shortlist avaliada tecnicamente',
              'Uma ou várias vagas em paralelo',
            ],
          },
          {
            tag: 'Liderança',
            title: 'Lideranças tecnológicas',
            text: 'Tech leads, engineering managers e CTOs, com pesquisa direta e confidencial.',
            ticks: [
              'Pesquisa direta e discreta',
              'Avaliação técnica e de liderança',
              'Acompanhamento da integração',
            ],
          },
        ],
      },
      steps: {
        title: 'Da vaga aberta à contratação.',
        lead: 'Um processo claro, com pontos de situação em cada fase.',
      },
      stack: {
        title: 'Recrutamos em qualquer stack que a sua equipa use.',
        lead: 'Os nossos recrutadores trabalham com engenheiros que avaliam cada candidato na tecnologia da vaga, das mais usadas aos sistemas legados.',
        cta: 'Recrutar para a minha stack',
      },
      comparison: {
        title: 'Porque não recrutar sozinho?',
        columns: ['Yellowipe · Contrate', 'Recrutar internamente', 'Agência generalista'],
        rows: [
          {
            label: 'Conhecimento técnico',
            cells: [
              { tone: 'good', text: 'Recrutadores tech' },
              { tone: 'mid', text: 'Depende da equipa' },
              { tone: 'bad', text: 'Limitado' },
            ],
          },
          {
            label: 'Avaliação técnica antes da shortlist',
            cells: [
              { tone: 'good', text: 'Sim' },
              { tone: 'mid', text: 'Tempo da sua equipa' },
              { tone: 'bad', text: 'Raramente' },
            ],
          },
          {
            label: 'Acesso a talento passivo',
            cells: [
              { tone: 'good', text: 'Sim' },
              { tone: 'bad', text: 'Limitado' },
              { tone: 'mid', text: 'Parcial' },
            ],
          },
          {
            label: 'Tempo da sua equipa',
            cells: [
              { tone: 'good', text: 'Só entrevistas finais' },
              { tone: 'bad', text: 'Todo o processo' },
              { tone: 'mid', text: 'Muita triagem' },
            ],
          },
          {
            label: 'Mercados',
            cells: [
              { tone: 'good', text: 'Portugal, Brasil e EUA' },
              { tone: 'mid', text: 'Local' },
              { tone: 'mid', text: 'Variável' },
            ],
          },
        ],
      },
      faqTitle: 'O que nos perguntam sobre recrutamento.',
      finalTitle: 'Que perfil precisa de contratar?',
    },
    br: {
      tagline: 'O talento certo, em contratação efetiva.',
      hero: {
        h1: 'Nossos recrutadores encontram',
        h1Highlight: 'o seu próximo profissional.',
        lead: 'Uma equipe de recrutadores especializados em tecnologia busca, avalia e apresenta os candidatos certos. Você contrata diretamente: o profissional passa a fazer parte da sua empresa.',
        badges: [
          'Recrutadores especializados em tech',
          'Avaliação técnica antes da shortlist',
          'Brasil, Portugal e EUA',
        ],
        cta: 'Abrir uma vaga',
        vizLabel:
          'Ilustração: recrutadores da Yellowipe avaliam candidatos e a sua empresa contrata diretamente o escolhido.',
      },
      viz: {
        scene: 'contrate',
        actor: 'Recrutadores Yellowipe',
        actorNote: 'Busca ativa no Brasil, em Portugal e nos EUA',
        working: 'Avaliando',
        ready: 'Shortlist pronta ✓',
        job: 'Vaga · Tech lead Java',
        stages: ['Triagem', 'Teste técnico', 'Entrevista'],
        candidates: [
          { initials: 'AS', name: 'Ana S.', meta: 'Java · Spring · 9 anos', stage: 'Recomendada' },
          { initials: 'BT', name: 'Bruno T.', meta: 'Java · Kotlin · 7 anos', stage: 'Entrevista' },
          { initials: 'CL', name: 'Carla L.', meta: 'Java · AWS · 8 anos', stage: 'Teste técnico' },
          { initials: 'DM', name: 'Diogo M.', meta: 'PHP · 4 anos', stage: 'Triagem' },
        ],
        waiting: 'Aguardando a contratação',
        doneTitle: 'Ana S. · Tech lead Java',
        doneNote: 'Contratada diretamente pela sua empresa',
      },
      whoLead:
        'No Contrate, a Yellowipe encontra e avalia. A partir da contratação, o profissional é seu.',
      why: {
        eyebrow: 'Por que o Contrate',
        title: 'Contrate melhor, sem parar a equipe para recrutar.',
        lead: 'Cuidamos do processo inteiro. Sua equipe só entrevista quem já passou na avaliação técnica.',
        items: [
          {
            icon: 'search',
            title: 'Recrutadores de tecnologia',
            text: 'Falam a língua das stacks e distinguem um sênior de um currículo bem escrito.',
          },
          {
            icon: 'check',
            title: 'Avaliação técnica',
            text: 'Cada candidato da shortlist passou por avaliação técnica antes de chegar até você.',
          },
          {
            icon: 'clock',
            title: 'Menos tempo da sua equipe',
            text: 'Fazemos sourcing, triagem e agendamento. A equipe só entra nas entrevistas finais.',
          },
          {
            icon: 'target',
            title: 'Talento passivo',
            text: 'Chegamos a profissionais que não estão respondendo a anúncios.',
          },
          {
            icon: 'globe',
            title: 'Três mercados',
            text: 'Recrutamento no Brasil, em Portugal e para equipes nos Estados Unidos.',
          },
          {
            icon: 'loop',
            title: 'Acompanhamento após a contratação',
            text: 'Acompanhamos o onboarding nos primeiros meses para confirmar que a escolha foi a certa.',
          },
        ],
      },
      formats: {
        title: 'Do primeiro desenvolvedor à liderança técnica.',
        lead: 'O mesmo processo, ajustado à senioridade e à confidencialidade de cada vaga.',
        items: [
          {
            tag: 'Vagas',
            title: 'Perfis para a sua equipe',
            text: 'Desenvolvedores, QA, DevOps e dados para contratação efetiva.',
            ticks: [
              'De júnior a arquiteto',
              'Shortlist avaliada tecnicamente',
              'Uma ou várias vagas em paralelo',
            ],
          },
          {
            tag: 'Liderança',
            title: 'Lideranças de tecnologia',
            text: 'Tech leads, engineering managers e CTOs, com busca direta e confidencial.',
            ticks: [
              'Busca direta e discreta',
              'Avaliação técnica e de liderança',
              'Acompanhamento do onboarding',
            ],
          },
        ],
      },
      steps: {
        title: 'Da vaga aberta à contratação.',
        lead: 'Um processo claro, com status em cada fase.',
      },
      stack: {
        title: 'Recrutamos em qualquer stack que a sua equipe use.',
        lead: 'Nossos recrutadores trabalham com engenheiros que avaliam cada candidato na tecnologia da vaga, das mais usadas aos sistemas legados.',
        cta: 'Recrutar para a minha stack',
      },
      comparison: {
        title: 'Por que não recrutar sozinho?',
        columns: ['Yellowipe · Contrate', 'Recrutar internamente', 'Agência generalista'],
        rows: [
          {
            label: 'Conhecimento técnico',
            cells: [
              { tone: 'good', text: 'Recrutadores tech' },
              { tone: 'mid', text: 'Depende da equipe' },
              { tone: 'bad', text: 'Limitado' },
            ],
          },
          {
            label: 'Avaliação técnica antes da shortlist',
            cells: [
              { tone: 'good', text: 'Sim' },
              { tone: 'mid', text: 'Tempo da sua equipe' },
              { tone: 'bad', text: 'Raramente' },
            ],
          },
          {
            label: 'Acesso a talento passivo',
            cells: [
              { tone: 'good', text: 'Sim' },
              { tone: 'bad', text: 'Limitado' },
              { tone: 'mid', text: 'Parcial' },
            ],
          },
          {
            label: 'Tempo da sua equipe',
            cells: [
              { tone: 'good', text: 'Só entrevistas finais' },
              { tone: 'bad', text: 'Todo o processo' },
              { tone: 'mid', text: 'Muita triagem' },
            ],
          },
          {
            label: 'Mercados',
            cells: [
              { tone: 'good', text: 'Brasil, Portugal e EUA' },
              { tone: 'mid', text: 'Local' },
              { tone: 'mid', text: 'Variável' },
            ],
          },
        ],
      },
      faqTitle: 'O que nos perguntam sobre recrutamento.',
      finalTitle: 'Que perfil você precisa contratar?',
    },
  },
  howItWorks: {
    pt: [
      { title: 'Briefing', text: 'Definimos perfil, stack, senioridade e condições.' },
      { title: 'Pesquisa', text: 'Sourcing ativo e triagem dos candidatos.' },
      { title: 'Shortlist', text: 'Candidatos avaliados tecnicamente, com notas da avaliação.' },
      { title: 'Contratação', text: 'Apoiamos entrevistas, proposta e integração.' },
    ],
    br: [
      { title: 'Briefing', text: 'Definimos perfil, stack, senioridade e condições.' },
      { title: 'Busca', text: 'Sourcing ativo e triagem dos candidatos.' },
      { title: 'Shortlist', text: 'Candidatos avaliados tecnicamente, com notas da avaliação.' },
      { title: 'Contratação', text: 'Apoiamos entrevistas, proposta e onboarding.' },
    ],
  },
  faq: [
    {
      q: { pt: 'Que perfis recrutam?', br: 'Que perfis vocês recrutam?' },
      a: {
        pt: 'Developers, QA, DevOps, dados e IA, de júnior a arquiteto, e lideranças como tech leads, engineering managers e CTOs.',
        br: 'Desenvolvedores, QA, DevOps, dados e IA, de júnior a arquiteto, e lideranças como tech leads, engineering managers e CTOs.',
      },
    },
    {
      q: {
        pt: 'Como avaliam tecnicamente os candidatos?',
        br: 'Como vocês avaliam tecnicamente os candidatos?',
      },
      a: {
        pt: 'Com entrevistas técnicas conduzidas por engenheiros e, quando faz sentido, exercícios práticos. Recebe as notas da avaliação com a shortlist.',
        br: 'Com entrevistas técnicas conduzidas por engenheiros e, quando faz sentido, exercícios práticos. Você recebe as notas da avaliação junto com a shortlist.',
      },
    },
    {
      q: { pt: 'Quanto tempo demora?', br: 'Quanto tempo leva?' },
      a: {
        pt: '[Prazo médio até à shortlist a confirmar com a equipa de recrutamento.]',
        br: '[Prazo médio até a shortlist a confirmar com a equipe de recrutamento.]',
      },
    },
    {
      q: { pt: 'Como funciona o preço?', br: 'Como funciona o preço?' },
      a: {
        pt: '[Modelo de preço a confirmar: percentagem do salário anual, retainer ou misto.]',
        br: '[Modelo de preço a confirmar: porcentagem do salário anual, retainer ou misto.]',
      },
    },
    {
      q: {
        pt: 'Qual a diferença entre Contrate, Reforce e Construa?',
        br: 'Qual a diferença entre Contrate, Reforce e Construa?',
      },
      a: {
        pt: 'No Contrate, a pessoa fica na sua empresa. No Reforce, especialistas da Yellowipe trabalham na sua equipa. No Construa, uma equipa da Yellowipe entrega a solução.',
        br: 'No Contrate, a pessoa fica na sua empresa. No Reforce, especialistas da Yellowipe trabalham na sua equipe. No Construa, uma equipe da Yellowipe entrega a solução.',
      },
    },
  ],
};

export const reforce: Extra = {
  page: {
    pt: {
      tagline: 'Especialistas integrados na sua equipa.',
      hero: {
        h1: 'Os nossos consultores,',
        h1Highlight: 'a trabalhar dentro da sua equipa.',
        lead: 'Consultores de tecnologia da Yellowipe juntam-se à sua equipa e trabalham com as suas ferramentas e prioridades. Gere o trabalho; nós tratamos do contrato, do acompanhamento e da substituição.',
        badges: [
          'Seleção técnica por seniores',
          'Horas em comum com Europa e EUA',
          'Desenvolvimento assistido por IA',
        ],
        cta: 'Pedir perfis',
        vizLabel:
          'Ilustração: consultores da Yellowipe dentro da equipa do cliente, acompanhados por um gestor de conta Yellowipe.',
      },
      viz: {
        scene: 'reforce',
        actor: 'Consultores Yellowipe',
        actorNote: 'Seleção técnica e gestor de conta',
        consultants: ['MF', 'RD'],
        team: 'A sua equipa · Pagamentos',
        sprint: 'Sprint 14',
        members: ['JP', 'SM', 'LC'],
        capacity: 'Capacidade da equipa',
        deliveries: 'Entregas por sprint',
        waiting: 'Equipa com capacidade em falta',
        doneTitle: 'Equipa reforçada com 2 consultores',
        doneNote: 'Gere o trabalho; a Yellowipe garante as pessoas',
      },
      whoLead:
        'No Reforce, os consultores são da Yellowipe e trabalham sob a sua direção. Gere o dia a dia; nós garantimos as pessoas.',
      why: {
        eyebrow: 'Porquê o Reforce',
        title: 'Mais capacidade. Sem mudar a forma como trabalha.',
        lead: 'Os especialistas juntam-se à sua equipa e trabalham com as suas ferramentas e processos. Mantém o controlo das prioridades.',
        items: [
          {
            icon: 'team',
            title: 'Integração real',
            text: 'Usam o seu Jira, o seu Git e as suas cerimónias. Para a equipa, são mais colegas.',
          },
          {
            icon: 'puzzle',
            title: 'Competências que faltam',
            text: 'Cubra lacunas em cloud, dados, QA ou IA sem abrir um processo de recrutamento de meses.',
          },
          {
            icon: 'scale',
            title: 'Escala para cima e para baixo',
            text: 'Aumente a equipa para um lançamento e reduza depois, sem custos de contratação.',
          },
          {
            icon: 'clock',
            title: 'Fuso e língua compatíveis',
            text: 'Equipas em Portugal e no Brasil, em português e inglês, com horas em comum com a Europa e os EUA.',
          },
          {
            icon: 'swap',
            title: 'Substituição sem recomeçar',
            text: 'Se um perfil não encaixar, propomos alternativa sem voltar ao início do processo.',
          },
          {
            icon: 'chart',
            title: 'Acompanhamento contínuo',
            text: 'Um gestor de conta acompanha desempenho e satisfação, com pontos de situação regulares.',
          },
        ],
      },
      formats: {
        title: 'Dois formatos. O mesmo nível de exigência.',
        lead: 'Comece com um especialista ou com uma equipa completa, e mude de formato quando a necessidade mudar.',
        items: [
          {
            tag: 'Alocação',
            title: 'Especialistas na sua equipa',
            text: 'Perfis individuais que entram na sua equipa. Define as prioridades e gere o dia a dia.',
            ticks: [
              'De um a vários perfis',
              'Gestão técnica do seu lado',
              'Ideal para lacunas e picos de trabalho',
            ],
          },
          {
            tag: 'Equipa',
            title: 'Equipa dedicada',
            text: 'Uma equipa completa com tech lead da Yellowipe. Define o quê; nós organizamos o como.',
            ticks: [
              'Tech lead e QA incluídos',
              'Menos gestão do seu lado',
              'Ideal para frentes de produto contínuas',
            ],
          },
        ],
      },
      steps: {
        title: 'Da conversa à primeira sprint.',
        lead: 'Só avança com quem escolher, e acompanhamos cada profissional depois da entrada.',
      },
      stack: {
        title: 'A sua stack é a nossa stack.',
        lead: 'Consultores que já trabalham nas tecnologias que usa, das mais comuns às de nicho e aos sistemas legados, e com as ferramentas de IA que aceleram a entrega.',
        cta: 'Pedir especialistas na minha stack',
      },
      comparison: {
        title: 'Reforçar, contratar ou ir para longe?',
        columns: ['Yellowipe · Reforce', 'Contratar internamente', 'Offshore distante'],
        rows: [
          {
            label: 'Tempo até começar',
            cells: [
              { tone: 'good', text: 'Semanas' },
              { tone: 'bad', text: 'Meses' },
              { tone: 'good', text: 'Semanas' },
            ],
          },
          {
            label: 'Horas em comum',
            cells: [
              { tone: 'good', text: 'Europa e EUA' },
              { tone: 'good', text: 'Total' },
              { tone: 'bad', text: 'Poucas' },
            ],
          },
          {
            label: 'Seleção técnica',
            cells: [
              { tone: 'good', text: 'Por engenheiros seniores' },
              { tone: 'mid', text: 'Depende da equipa' },
              { tone: 'mid', text: 'Variável' },
            ],
          },
          {
            label: 'Língua e cultura',
            cells: [
              { tone: 'good', text: 'Português e inglês' },
              { tone: 'good', text: 'Total' },
              { tone: 'mid', text: 'Variável' },
            ],
          },
          {
            label: 'Custos fixos e encargos',
            cells: [
              { tone: 'good', text: 'Nenhuns' },
              { tone: 'bad', text: 'Salário, encargos e recrutamento' },
              { tone: 'good', text: 'Nenhuns' },
            ],
          },
          {
            label: 'Escalar ou reduzir',
            cells: [
              { tone: 'good', text: 'Flexível' },
              { tone: 'bad', text: 'Lento' },
              { tone: 'mid', text: 'Contratos rígidos' },
            ],
          },
        ],
      },
      faqTitle: 'O que nos perguntam sobre o Reforce.',
      finalTitle: 'Diga-nos que perfis faltam na sua equipa.',
    },
    br: {
      tagline: 'Especialistas integrados à sua equipe.',
      hero: {
        h1: 'Nossos consultores,',
        h1Highlight: 'trabalhando dentro da sua equipe.',
        lead: 'Consultores de tecnologia da Yellowipe entram na sua equipe e trabalham com as suas ferramentas e prioridades. Você gerencia o trabalho; nós cuidamos do contrato, do acompanhamento e da substituição.',
        badges: [
          'Seleção técnica por seniores',
          'Horário em comum com EUA e Europa',
          'Desenvolvimento assistido por IA',
        ],
        cta: 'Pedir perfis',
        vizLabel:
          'Ilustração: consultores da Yellowipe dentro da equipe do cliente, acompanhados por um gerente de conta Yellowipe.',
      },
      viz: {
        scene: 'reforce',
        actor: 'Consultores Yellowipe',
        actorNote: 'Seleção técnica e gerente de conta',
        consultants: ['MF', 'RD'],
        team: 'Sua equipe · Pagamentos',
        sprint: 'Sprint 14',
        members: ['JP', 'SM', 'LC'],
        capacity: 'Capacidade da equipe',
        deliveries: 'Entregas por sprint',
        waiting: 'Equipe com capacidade faltando',
        doneTitle: 'Equipe reforçada com 2 consultores',
        doneNote: 'Você gerencia; a Yellowipe garante as pessoas',
      },
      whoLead:
        'No Reforce, os consultores são da Yellowipe e trabalham sob a sua direção. Você gerencia o dia a dia; nós garantimos as pessoas.',
      why: {
        eyebrow: 'Por que o Reforce',
        title: 'Mais capacidade. Sem mudar a forma como você trabalha.',
        lead: 'Os especialistas entram na sua equipe e trabalham com as suas ferramentas e processos. Você mantém o controle das prioridades.',
        items: [
          {
            icon: 'team',
            title: 'Integração real',
            text: 'Usam o seu Jira, o seu Git e as suas cerimônias. Para a equipe, são mais colegas.',
          },
          {
            icon: 'puzzle',
            title: 'Competências que faltam',
            text: 'Cubra lacunas em cloud, dados, QA ou IA sem abrir um processo de recrutamento de meses.',
          },
          {
            icon: 'scale',
            title: 'Escala para cima e para baixo',
            text: 'Aumente a equipe para um lançamento e reduza depois, sem custos de contratação.',
          },
          {
            icon: 'clock',
            title: 'Fuso e idioma compatíveis',
            text: 'Equipes no Brasil e em Portugal, em português e inglês, com horário em comum com os EUA e a Europa.',
          },
          {
            icon: 'swap',
            title: 'Substituição sem recomeçar',
            text: 'Se um perfil não se encaixar, propomos uma alternativa sem voltar ao início do processo.',
          },
          {
            icon: 'chart',
            title: 'Acompanhamento contínuo',
            text: 'Um gerente de conta acompanha desempenho e satisfação, com reuniões de status regulares.',
          },
        ],
      },
      formats: {
        title: 'Dois formatos. O mesmo nível de exigência.',
        lead: 'Comece com um especialista ou com uma equipe completa, e mude de formato quando a necessidade mudar.',
        items: [
          {
            tag: 'Alocação',
            title: 'Especialistas na sua equipe',
            text: 'Perfis individuais que entram na sua equipe. Você define as prioridades e gerencia o dia a dia.',
            ticks: [
              'De um a vários perfis',
              'Gestão técnica do seu lado',
              'Ideal para lacunas e picos de trabalho',
            ],
          },
          {
            tag: 'Squad',
            title: 'Equipe dedicada',
            text: 'Uma equipe completa com tech lead da Yellowipe. Você define o quê; nós organizamos o como.',
            ticks: [
              'Tech lead e QA incluídos',
              'Menos gestão do seu lado',
              'Ideal para frentes de produto contínuas',
            ],
          },
        ],
      },
      steps: {
        title: 'Da conversa à primeira sprint.',
        lead: 'Você só avança com quem escolher, e acompanhamos cada profissional depois da entrada.',
      },
      stack: {
        title: 'A sua stack é a nossa stack.',
        lead: 'Consultores que já trabalham nas tecnologias que você usa, das mais comuns às de nicho e aos sistemas legados, e com as ferramentas de IA que aceleram a entrega.',
        cta: 'Pedir especialistas na minha stack',
      },
      comparison: {
        title: 'Alocar, contratar ou terceirizar para longe?',
        columns: ['Yellowipe · Reforce', 'Contratar internamente', 'Offshore distante'],
        rows: [
          {
            label: 'Tempo até começar',
            cells: [
              { tone: 'good', text: 'Semanas' },
              { tone: 'bad', text: 'Meses' },
              { tone: 'good', text: 'Semanas' },
            ],
          },
          {
            label: 'Horário em comum',
            cells: [
              { tone: 'good', text: 'EUA e Europa' },
              { tone: 'good', text: 'Total' },
              { tone: 'bad', text: 'Pouco' },
            ],
          },
          {
            label: 'Seleção técnica',
            cells: [
              { tone: 'good', text: 'Por engenheiros seniores' },
              { tone: 'mid', text: 'Depende da equipe' },
              { tone: 'mid', text: 'Variável' },
            ],
          },
          {
            label: 'Idioma e cultura',
            cells: [
              { tone: 'good', text: 'Português e inglês' },
              { tone: 'good', text: 'Total' },
              { tone: 'mid', text: 'Variável' },
            ],
          },
          {
            label: 'Custos fixos e encargos',
            cells: [
              { tone: 'good', text: 'Nenhum' },
              { tone: 'bad', text: 'Salário, encargos e recrutamento' },
              { tone: 'good', text: 'Nenhum' },
            ],
          },
          {
            label: 'Escalar ou reduzir',
            cells: [
              { tone: 'good', text: 'Flexível' },
              { tone: 'bad', text: 'Lento' },
              { tone: 'mid', text: 'Contratos rígidos' },
            ],
          },
        ],
      },
      faqTitle: 'O que nos perguntam sobre o Reforce.',
      finalTitle: 'Conte para a gente que perfis faltam na sua equipe.',
    },
  },
  howItWorks: {
    pt: [
      { title: 'Conversa', text: 'Percebemos a equipa, a stack e o que tem de ser entregue.' },
      { title: 'Perfis', text: 'Apresentamos candidatos já avaliados tecnicamente, em [x] dias.' },
      { title: 'Entrevistas', text: 'Entrevista quem quiser. Só avança com quem escolher.' },
      {
        title: 'Integração',
        text: 'Onboarding nas suas ferramentas e acompanhamento contínuo.',
      },
    ],
    br: [
      { title: 'Conversa', text: 'Entendemos a equipe, a stack e o que precisa ser entregue.' },
      { title: 'Perfis', text: 'Apresentamos candidatos já avaliados tecnicamente, em [x] dias.' },
      {
        title: 'Entrevistas',
        text: 'Você entrevista quem quiser. Só avança com quem escolher.',
      },
      {
        title: 'Onboarding',
        text: 'Integração nas suas ferramentas e acompanhamento contínuo.',
      },
    ],
  },
  faq: [
    {
      q: {
        pt: 'O que é o outsourcing de TI no modelo Reforce?',
        br: 'O que é a alocação de profissionais de TI no modelo Reforce?',
      },
      a: {
        pt: 'São profissionais da Yellowipe que trabalham dentro da sua equipa, com as suas ferramentas e prioridades. A relação contratual é connosco; o dia a dia é consigo.',
        br: 'São profissionais da Yellowipe que trabalham dentro da sua equipe, com as suas ferramentas e prioridades. O contrato é com a gente; o dia a dia é com você.',
      },
    },
    {
      q: {
        pt: 'Qual a diferença entre alocação e equipa dedicada?',
        br: 'Qual a diferença entre alocação e squad dedicado?',
      },
      a: {
        pt: 'Na alocação, gere os especialistas como parte da sua equipa. Na equipa dedicada, um tech lead da Yellowipe organiza o trabalho a partir das prioridades que define.',
        br: 'Na alocação, você gerencia os especialistas como parte da sua equipe. No squad dedicado, um tech lead da Yellowipe organiza o trabalho a partir das prioridades que você define.',
      },
    },
    {
      q: {
        pt: 'Quanto tempo demora a ter alguém na equipa?',
        br: 'Quanto tempo leva para ter alguém na equipe?',
      },
      a: {
        pt: '[Prazo médio até aos primeiros perfis e até ao arranque a confirmar.]',
        br: '[Prazo médio até os primeiros perfis e até o início a confirmar.]',
      },
    },
    {
      q: {
        pt: 'Os profissionais usam ferramentas de IA?',
        br: 'Os profissionais usam ferramentas de IA?',
      },
      a: {
        pt: 'Sim. Trabalham com assistentes como Claude Code, Cursor e GitHub Copilot, sempre dentro das regras de segurança da sua empresa.',
        br: 'Sim. Trabalham com assistentes como Claude Code, Cursor e GitHub Copilot, sempre dentro das regras de segurança da sua empresa.',
      },
    },
    {
      q: { pt: 'Quanto custa?', br: 'Quanto custa?' },
      a: {
        pt: 'Depende dos perfis, da senioridade e da duração. Enviamos uma proposta depois da primeira conversa.',
        br: 'Depende dos perfis, da senioridade e da duração. Enviamos uma proposta depois da primeira conversa.',
      },
    },
  ],
};

export const construa: Extra = {
  page: {
    pt: {
      tagline: 'Uma equipa que entrega a solução.',
      hero: {
        h1: 'A nossa equipa e o nosso gestor',
        h1Highlight: 'a construir o seu produto.',
        lead: 'Uma equipa completa da Yellowipe, liderada por um gestor de projeto, constrói a solução de ponta a ponta. Define o objetivo e aprova as entregas; nós respondemos pelo resultado.',
        badges: [
          'Equipa completa e gerida',
          'Demos no fim de cada sprint',
          'Testes automáticos desde o início',
        ],
        cta: 'Falar do projeto',
        vizLabel:
          'Ilustração: equipa Yellowipe com gestor de projeto a construir o produto do cliente, sprint a sprint.',
      },
      viz: {
        scene: 'construa',
        actor: 'Equipa Yellowipe',
        actorNote: 'Gestor de projeto e 4 especialistas',
        lead: 'GP',
        product: 'Portal de clientes',
        disciplines: [
          { initials: 'UX', label: 'Design' },
          { initials: 'FE', label: 'Front-end' },
          { initials: 'BE', label: 'Back-end' },
          { initials: 'QA', label: 'Qualidade' },
        ],
        live: 'Em produção',
        waiting: 'Aguarda a entrega',
        doneTitle: 'Portal de clientes em produção',
        doneNote: 'Entregue e evoluído pela mesma equipa',
      },
      whoLead:
        'No Construa, a Yellowipe responde pela entrega: equipa, gestão e qualidade. Define o objetivo e aprova cada demo.',
      why: {
        eyebrow: 'Porquê o Construa',
        title: 'Software crítico entregue, sem sobrecarregar a sua equipa.',
        lead: 'Define os objetivos e as prioridades. Nós tratamos da execução, com uma equipa que se responsabiliza pelo resultado.',
        items: [
          {
            icon: 'target',
            title: 'Foco no negócio',
            text: 'Define objetivos e prioridades; a execução diária fica connosco.',
          },
          {
            icon: 'layers',
            title: 'Equipa completa',
            text: 'Produto, design, engenharia, QA e DevOps numa só equipa, já habituada a trabalhar junta.',
          },
          {
            icon: 'eye',
            title: 'Visibilidade total',
            text: 'Demos no fim de cada sprint e métricas de qualidade partilhadas consigo.',
          },
          {
            icon: 'check',
            title: 'Qualidade desde o primeiro dia',
            text: 'Testes automáticos e CI/CD em cada alteração, como no caso Linde.',
          },
          {
            icon: 'spark',
            title: 'IA no processo',
            text: 'Desenvolvimento acelerado com assistentes de código, sempre revisto por engenheiros seniores.',
          },
          {
            icon: 'loop',
            title: 'Continuidade',
            text: 'A mesma equipa mantém e evolui o produto depois do lançamento.',
          },
        ],
      },
      formats: {
        title: 'Um projeto fechado ou uma equipa de produto.',
        lead: 'Escolha pelo grau de certeza que já tem sobre o que quer construir.',
        items: [
          {
            tag: 'Projeto',
            title: 'Âmbito fechado',
            text: 'Âmbito, prazo e orçamento definidos à partida, com entregas por fases.',
            ticks: [
              'Ideal para MVPs e módulos',
              'Plano de entregas acordado',
              'Passagem com documentação',
            ],
          },
          {
            tag: 'Produto',
            title: 'Equipa de produto contínua',
            text: 'Uma equipa estável que evolui o produto a partir de um roadmap partilhado.',
            ticks: [
              'Roadmap revisto consigo',
              'Ideal para produtos em crescimento',
              'Mesma equipa ao longo do tempo',
            ],
          },
        ],
      },
      steps: {
        title: 'Do problema ao software em produção.',
        lead: 'Sprints curtas, demos frequentes e qualidade medida em cada entrega.',
      },
      stack: {
        title: 'Construímos na stack que faz sentido para si.',
        lead: 'Escolhemos a tecnologia com a sua equipa: a que já usa, ou a que melhor serve o produto, sempre com IA no processo de desenvolvimento.',
        cta: 'Falar do projeto',
      },
      comparison: {
        title: 'Construir connosco, montar equipa ou juntar freelancers?',
        columns: ['Yellowipe · Construa', 'Montar equipa interna', 'Freelancers'],
        rows: [
          {
            label: 'Tempo até arrancar',
            cells: [
              { tone: 'good', text: 'Semanas' },
              { tone: 'bad', text: 'Meses' },
              { tone: 'mid', text: 'Rápido, mas disperso' },
            ],
          },
          {
            label: 'Equipa completa, do produto ao QA',
            cells: [
              { tone: 'good', text: 'Sim' },
              { tone: 'mid', text: 'Tem de a montar' },
              { tone: 'bad', text: 'Raramente' },
            ],
          },
          {
            label: 'Responsabilidade pela entrega',
            cells: [
              { tone: 'good', text: 'Da Yellowipe' },
              { tone: 'mid', text: 'Sua' },
              { tone: 'bad', text: 'Repartida' },
            ],
          },
          {
            label: 'Qualidade e testes',
            cells: [
              { tone: 'good', text: 'Automáticos desde o início' },
              { tone: 'mid', text: 'Depende' },
              { tone: 'mid', text: 'Variável' },
            ],
          },
          {
            label: 'Continuidade após o lançamento',
            cells: [
              { tone: 'good', text: 'A mesma equipa' },
              { tone: 'good', text: 'Sim' },
              { tone: 'bad', text: 'Incerta' },
            ],
          },
        ],
      },
      faqTitle: 'O que nos perguntam sobre o Construa.',
      finalTitle: 'Conte-nos o que quer construir.',
    },
    br: {
      tagline: 'Uma equipe que entrega a solução.',
      hero: {
        h1: 'Nossa equipe e nosso gerente',
        h1Highlight: 'construindo o seu produto.',
        lead: 'Uma equipe completa da Yellowipe, liderada por um gerente de projeto, constrói a solução de ponta a ponta. Você define o objetivo e aprova as entregas; nós respondemos pelo resultado.',
        badges: [
          'Equipe completa e gerenciada',
          'Demos no fim de cada sprint',
          'Testes automatizados desde o início',
        ],
        cta: 'Falar sobre o projeto',
        vizLabel:
          'Ilustração: equipe Yellowipe com gerente de projeto construindo o produto do cliente, sprint a sprint.',
      },
      viz: {
        scene: 'construa',
        actor: 'Equipe Yellowipe',
        actorNote: 'Gerente de projeto e 4 especialistas',
        lead: 'GP',
        product: 'Portal de clientes',
        disciplines: [
          { initials: 'UX', label: 'Design' },
          { initials: 'FE', label: 'Front-end' },
          { initials: 'BE', label: 'Back-end' },
          { initials: 'QA', label: 'Qualidade' },
        ],
        live: 'Em produção',
        waiting: 'Aguardando a entrega',
        doneTitle: 'Portal de clientes em produção',
        doneNote: 'Entregue e evoluído pela mesma equipe',
      },
      whoLead:
        'No Construa, a Yellowipe responde pela entrega: equipe, gestão e qualidade. Você define o objetivo e aprova cada demo.',
      why: {
        eyebrow: 'Por que o Construa',
        title: 'Software crítico entregue, sem sobrecarregar a sua equipe.',
        lead: 'Você define os objetivos e as prioridades. Nós cuidamos da execução, com uma equipe que se responsabiliza pelo resultado.',
        items: [
          {
            icon: 'target',
            title: 'Foco no negócio',
            text: 'Você define objetivos e prioridades; a execução diária fica com a gente.',
          },
          {
            icon: 'layers',
            title: 'Equipe completa',
            text: 'Produto, design, engenharia, QA e DevOps em uma só equipe, já acostumada a trabalhar junta.',
          },
          {
            icon: 'eye',
            title: 'Visibilidade total',
            text: 'Demos no fim de cada sprint e métricas de qualidade compartilhadas com você.',
          },
          {
            icon: 'check',
            title: 'Qualidade desde o primeiro dia',
            text: 'Testes automatizados e CI/CD em cada alteração, como no case Linde.',
          },
          {
            icon: 'spark',
            title: 'IA no processo',
            text: 'Desenvolvimento acelerado com assistentes de código, sempre revisado por engenheiros seniores.',
          },
          {
            icon: 'loop',
            title: 'Continuidade',
            text: 'A mesma equipe mantém e evolui o produto depois do lançamento.',
          },
        ],
      },
      formats: {
        title: 'Um projeto fechado ou uma equipe de produto.',
        lead: 'Escolha pelo grau de certeza que você já tem sobre o que quer construir.',
        items: [
          {
            tag: 'Projeto',
            title: 'Escopo fechado',
            text: 'Escopo, prazo e orçamento definidos no início, com entregas por fases.',
            ticks: [
              'Ideal para MVPs e módulos',
              'Plano de entregas combinado',
              'Handover com documentação',
            ],
          },
          {
            tag: 'Produto',
            title: 'Equipe de produto contínua',
            text: 'Uma equipe estável que evolui o produto a partir de um roadmap compartilhado.',
            ticks: [
              'Roadmap revisado com você',
              'Ideal para produtos em crescimento',
              'Mesma equipe ao longo do tempo',
            ],
          },
        ],
      },
      steps: {
        title: 'Do problema ao software em produção.',
        lead: 'Sprints curtas, demos frequentes e qualidade medida em cada entrega.',
      },
      stack: {
        title: 'Construímos na stack que faz sentido para você.',
        lead: 'Escolhemos a tecnologia com a sua equipe: a que você já usa, ou a que melhor atende o produto, sempre com IA no processo de desenvolvimento.',
        cta: 'Falar sobre o projeto',
      },
      comparison: {
        title: 'Construir com a gente, montar equipe ou juntar freelancers?',
        columns: ['Yellowipe · Construa', 'Montar equipe interna', 'Freelancers'],
        rows: [
          {
            label: 'Tempo até começar',
            cells: [
              { tone: 'good', text: 'Semanas' },
              { tone: 'bad', text: 'Meses' },
              { tone: 'mid', text: 'Rápido, mas disperso' },
            ],
          },
          {
            label: 'Equipe completa, do produto ao QA',
            cells: [
              { tone: 'good', text: 'Sim' },
              { tone: 'mid', text: 'Você precisa montar' },
              { tone: 'bad', text: 'Raramente' },
            ],
          },
          {
            label: 'Responsabilidade pela entrega',
            cells: [
              { tone: 'good', text: 'Da Yellowipe' },
              { tone: 'mid', text: 'Sua' },
              { tone: 'bad', text: 'Dividida' },
            ],
          },
          {
            label: 'Qualidade e testes',
            cells: [
              { tone: 'good', text: 'Automatizados desde o início' },
              { tone: 'mid', text: 'Depende' },
              { tone: 'mid', text: 'Variável' },
            ],
          },
          {
            label: 'Continuidade após o lançamento',
            cells: [
              { tone: 'good', text: 'A mesma equipe' },
              { tone: 'good', text: 'Sim' },
              { tone: 'bad', text: 'Incerta' },
            ],
          },
        ],
      },
      faqTitle: 'O que nos perguntam sobre o Construa.',
      finalTitle: 'Conte para a gente o que você quer construir.',
    },
  },
  howItWorks: {
    pt: [
      { title: 'Descoberta', text: 'Objetivos, utilizadores e restrições técnicas.' },
      { title: 'Desenho', text: 'Arquitetura, protótipos e plano de entregas.' },
      { title: 'Construção', text: 'Sprints com demos e testes automáticos.' },
      { title: 'Go-live e evolução', text: 'Lançamento acompanhado e melhoria contínua.' },
    ],
    br: [
      { title: 'Descoberta', text: 'Objetivos, usuários e restrições técnicas.' },
      { title: 'Desenho', text: 'Arquitetura, protótipos e plano de entregas.' },
      { title: 'Construção', text: 'Sprints com demos e testes automatizados.' },
      { title: 'Go-live e evolução', text: 'Lançamento acompanhado e melhoria contínua.' },
    ],
  },
  faq: [
    {
      q: { pt: 'Que tipo de projetos fazem?', br: 'Que tipo de projeto vocês fazem?' },
      a: {
        pt: 'Aplicações web e mobile, plataformas enterprise, soluções de IA e cloud, de MVPs a sistemas críticos para milhões de utilizadores.',
        br: 'Aplicações web e mobile, plataformas enterprise, soluções de IA e cloud, de MVPs a sistemas críticos para milhões de usuários.',
      },
    },
    {
      q: { pt: 'Trabalham com âmbito fechado?', br: 'Vocês trabalham com escopo fechado?' },
      a: {
        pt: 'Sim, para projetos com requisitos claros. Quando o produto ainda está a ser descoberto, recomendamos uma equipa de produto contínua.',
        br: 'Sim, para projetos com requisitos claros. Quando o produto ainda está sendo descoberto, recomendamos uma equipe de produto contínua.',
      },
    },
    {
      q: { pt: 'De quem é o código?', br: 'De quem é o código?' },
      a: {
        pt: 'O código e a propriedade intelectual são seus. [Confirmar a redação com o jurídico.]',
        br: 'O código e a propriedade intelectual são seus. [Confirmar a redação com o jurídico.]',
      },
    },
    {
      q: { pt: 'Usam IA no desenvolvimento?', br: 'Vocês usam IA no desenvolvimento?' },
      a: {
        pt: 'Sim, com assistentes de código e testes gerados com IA, sempre revistos por engenheiros seniores.',
        br: 'Sim, com assistentes de código e testes gerados com IA, sempre revisados por engenheiros seniores.',
      },
    },
    {
      q: { pt: 'Quanto custa?', br: 'Quanto custa?' },
      a: {
        pt: 'Depende do âmbito e da equipa. Depois da descoberta, enviamos uma proposta com plano de entregas.',
        br: 'Depende do escopo e da equipe. Depois da descoberta, enviamos uma proposta com plano de entregas.',
      },
    },
  ],
};
