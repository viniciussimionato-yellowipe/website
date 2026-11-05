import type { z } from 'zod';
import type { ModelPageCopy } from '../schema';

/**
 * Páginas de modelo em inglês americano (en). Tradução das versões pt-PT de
 * ./model-pages.ts, escrita para compradores nos EUA (nearshore a partir de Portugal e
 * do Brasil). O en-GB deriva daqui com ortografia britânica (src/lib/i18n/british.ts).
 * As FAQs seguem a ordem das FAQs em pt; pendentes ficam entre [ ].
 */
type Page = z.input<typeof ModelPageCopy>;
type Faq = { q: string; a: string };
type Steps = { title: string; text: string }[];
export type ModelEn = { page: Page; howItWorks: Steps; faq: Faq[] };

export const contrateEn: ModelEn = {
  page: {
    tagline: 'The right talent, hired permanently.',
    hero: {
      h1: 'Our recruiters find',
      h1Highlight: 'your next hire.',
      lead: 'A team of recruiters who specialize in technology searches for, assesses and presents the right candidates. You hire directly: the professional joins your company.',
      badges: [
        'Recruiters who specialize in tech',
        'Technical assessment before the shortlist',
        'Portugal, Brazil and the US',
      ],
      cta: 'Open a role',
      vizLabel:
        'Illustration: Yellowipe recruiters assess candidates and your company hires the chosen one directly.',
    },
    viz: {
      scene: 'contrate',
      actor: 'Yellowipe recruiters',
      actorNote: 'Active search in Portugal, Brazil and the US',
      working: 'Assessing',
      ready: 'Shortlist ready ✓',
      job: 'Role · Java tech lead',
      stages: ['Screening', 'Technical test', 'Interview'],
      candidates: [
        { initials: 'AS', name: 'Ana S.', meta: 'Java · Spring · 9 years', stage: 'Recommended' },
        { initials: 'BT', name: 'Bruno T.', meta: 'Java · Kotlin · 7 years', stage: 'Interview' },
        { initials: 'CL', name: 'Carla L.', meta: 'Java · AWS · 8 years', stage: 'Technical test' },
        { initials: 'DM', name: 'Diogo M.', meta: 'PHP · 4 years', stage: 'Screening' },
      ],
      waiting: 'Waiting for the hire',
      doneTitle: 'Ana S. · Java tech lead',
      doneNote: 'Hired directly by your company',
    },
    whoLead:
      'With Hire, Yellowipe finds and assesses. Once hired, the professional is part of your team.',
    why: {
      eyebrow: 'Why Hire',
      title: 'Hire better, without pausing your team to recruit.',
      lead: 'We run the whole process. Your team only interviews people who have already passed the technical assessment.',
      items: [
        {
          icon: 'search',
          title: 'Tech recruiters',
          text: 'They speak the language of each stack and can tell a senior engineer from a well-written resume.',
        },
        {
          icon: 'check',
          title: 'Technical assessment',
          text: 'Every candidate on the shortlist has been technically assessed before reaching you.',
        },
        {
          icon: 'clock',
          title: 'Less of your team’s time',
          text: 'We handle sourcing, screening and scheduling. Your team only joins the final interviews.',
        },
        {
          icon: 'target',
          title: 'Passive talent',
          text: 'We reach professionals who are not answering job ads.',
        },
        {
          icon: 'globe',
          title: 'Three markets',
          text: 'Recruitment in Portugal, in Brazil and for teams in the United States.',
        },
        {
          icon: 'loop',
          title: 'Follow-up after the hire',
          text: 'We follow onboarding during the first months to confirm it was the right choice.',
        },
      ],
    },
    formats: {
      title: 'From your first developer to technical leadership.',
      lead: 'The same process, adjusted to the seniority and confidentiality of each role.',
      items: [
        {
          tag: 'Roles',
          title: 'Profiles for your team',
          text: 'Developers, QA, DevOps and data professionals for permanent hiring.',
          ticks: [
            'From junior to architect',
            'Technically assessed shortlist',
            'One or several roles in parallel',
          ],
        },
        {
          tag: 'Leadership',
          title: 'Technology leaders',
          text: 'Tech leads, engineering managers and CTOs, through direct and confidential search.',
          ticks: [
            'Direct, discreet search',
            'Technical and leadership assessment',
            'Onboarding follow-up',
          ],
        },
      ],
    },
    steps: {
      title: 'From open role to hire.',
      lead: 'A clear process, with status updates at every stage.',
    },
    stack: {
      title: 'We recruit for any stack your team uses.',
      lead: 'Our recruiters work with engineers who assess each candidate in the role’s technology, from the most common to legacy systems.',
      cta: 'Recruit for my stack',
    },
    comparison: {
      title: 'Why not recruit on your own?',
      columns: ['Yellowipe · Hire', 'In-house recruiting', 'Generalist agency'],
      rows: [
        {
          label: 'Technical knowledge',
          cells: [
            { tone: 'good', text: 'Tech recruiters' },
            { tone: 'mid', text: 'Depends on the team' },
            { tone: 'bad', text: 'Limited' },
          ],
        },
        {
          label: 'Technical assessment before the shortlist',
          cells: [
            { tone: 'good', text: 'Yes' },
            { tone: 'mid', text: 'Your team’s time' },
            { tone: 'bad', text: 'Rarely' },
          ],
        },
        {
          label: 'Access to passive talent',
          cells: [
            { tone: 'good', text: 'Yes' },
            { tone: 'bad', text: 'Limited' },
            { tone: 'mid', text: 'Partial' },
          ],
        },
        {
          label: 'Your team’s time',
          cells: [
            { tone: 'good', text: 'Final interviews only' },
            { tone: 'bad', text: 'The whole process' },
            { tone: 'mid', text: 'Lots of screening' },
          ],
        },
        {
          label: 'Markets',
          cells: [
            { tone: 'good', text: 'Portugal, Brazil and the US' },
            { tone: 'mid', text: 'Local' },
            { tone: 'mid', text: 'Varies' },
          ],
        },
      ],
    },
    faqTitle: 'What people ask us about recruitment.',
    finalTitle: 'Which profile do you need to hire?',
  },
  howItWorks: [
    { title: 'Briefing', text: 'We define the profile, stack, seniority and terms.' },
    { title: 'Search', text: 'Active sourcing and candidate screening.' },
    { title: 'Shortlist', text: 'Technically assessed candidates, with assessment notes.' },
    { title: 'Hiring', text: 'We support interviews, the offer and onboarding.' },
  ],
  faq: [
    {
      q: 'Which profiles do you recruit?',
      a: 'Developers, QA, DevOps, data and AI, from junior to architect, and leaders such as tech leads, engineering managers and CTOs.',
    },
    {
      q: 'How do you assess candidates technically?',
      a: 'With technical interviews run by engineers and, when it makes sense, hands-on exercises. You receive the assessment notes with the shortlist.',
    },
    {
      q: 'How long does it take?',
      a: '[Average time to shortlist to be confirmed with the recruitment team.]',
    },
    {
      q: 'How does pricing work?',
      a: '[Pricing model to be confirmed: percentage of annual salary, retainer or a mix.]',
    },
    {
      q: 'What is the difference between Hire, Augment and Build?',
      a: 'With Hire, the person joins your company. With Augment, Yellowipe specialists work in your team. With Build, a Yellowipe team delivers the solution.',
    },
  ],
};

export const reforceEn: ModelEn = {
  page: {
    tagline: 'Specialists embedded in your team.',
    hero: {
      h1: 'Our consultants,',
      h1Highlight: 'working inside your team.',
      lead: 'Yellowipe technology consultants join your team and work with your tools and priorities. You manage the work; we handle the contract, follow-up and replacements.',
      badges: [
        'Technical selection by senior engineers',
        'Overlapping hours with Europe and the US',
        'AI-assisted development',
      ],
      cta: 'Request profiles',
      vizLabel:
        'Illustration: Yellowipe consultants inside the client’s team, supported by a Yellowipe account manager.',
    },
    viz: {
      scene: 'reforce',
      actor: 'Yellowipe consultants',
      actorNote: 'Technical selection and account manager',
      consultants: ['MF', 'RD'],
      team: 'Your team · Payments',
      sprint: 'Sprint 14',
      members: ['JP', 'SM', 'LC'],
      capacity: 'Team capacity',
      deliveries: 'Deliveries per sprint',
      waiting: 'Team short on capacity',
      doneTitle: 'Team augmented with 2 consultants',
      doneNote: 'You manage the work; Yellowipe stands behind the people',
    },
    whoLead:
      'With Augment, the consultants are Yellowipe’s and work under your direction. You run the day-to-day; we stand behind the people.',
    why: {
      eyebrow: 'Why Augment',
      title: 'More capacity. No change to how you work.',
      lead: 'Specialists join your team and work with your tools and processes. You stay in control of priorities.',
      items: [
        {
          icon: 'team',
          title: 'Real integration',
          text: 'They use your Jira, your Git and your ceremonies. To your team, they are just more colleagues.',
        },
        {
          icon: 'puzzle',
          title: 'Missing skills',
          text: 'Fill gaps in cloud, data, QA or AI without a months-long hiring process.',
        },
        {
          icon: 'scale',
          title: 'Scale up and down',
          text: 'Grow the team for a launch and scale back afterward, with no hiring costs.',
        },
        {
          icon: 'clock',
          title: 'Matching time zones and language',
          text: 'Teams in Portugal and Brazil, working in English and Portuguese, with overlapping hours with Europe and the US.',
        },
        {
          icon: 'swap',
          title: 'Replacements without starting over',
          text: 'If a profile is not the right fit, we propose an alternative without going back to the start.',
        },
        {
          icon: 'chart',
          title: 'Ongoing follow-up',
          text: 'An account manager tracks performance and satisfaction, with regular check-ins.',
        },
      ],
    },
    formats: {
      title: 'Two formats. The same high bar.',
      lead: 'Start with one specialist or a full team, and switch formats when your needs change.',
      items: [
        {
          tag: 'Staffing',
          title: 'Specialists in your team',
          text: 'Individual profiles who join your team. You set the priorities and manage the day-to-day.',
          ticks: [
            'From one to several profiles',
            'Technical management on your side',
            'Ideal for skill gaps and workload peaks',
          ],
        },
        {
          tag: 'Team',
          title: 'Dedicated team',
          text: 'A full team with a Yellowipe tech lead. You decide the what; we organize the how.',
          ticks: [
            'Tech lead and QA included',
            'Less management on your side',
            'Ideal for ongoing product work',
          ],
        },
      ],
    },
    steps: {
      title: 'From first call to first sprint.',
      lead: 'You only move forward with the people you choose, and we follow each professional after they start.',
    },
    stack: {
      title: 'Your stack is our stack.',
      lead: 'Consultants who already work with the technologies you use, from the most common to niche platforms and legacy systems, and with the AI tools that speed up delivery.',
      cta: 'Request specialists in my stack',
    },
    comparison: {
      title: 'Augment, hire or go far away?',
      columns: ['Yellowipe · Augment', 'Hire in-house', 'Distant offshore'],
      rows: [
        {
          label: 'Time to start',
          cells: [
            { tone: 'good', text: 'Weeks' },
            { tone: 'bad', text: 'Months' },
            { tone: 'good', text: 'Weeks' },
          ],
        },
        {
          label: 'Overlapping hours',
          cells: [
            { tone: 'good', text: 'Europe and the US' },
            { tone: 'good', text: 'Full' },
            { tone: 'bad', text: 'Few' },
          ],
        },
        {
          label: 'Technical selection',
          cells: [
            { tone: 'good', text: 'By senior engineers' },
            { tone: 'mid', text: 'Depends on the team' },
            { tone: 'mid', text: 'Varies' },
          ],
        },
        {
          label: 'Language and culture',
          cells: [
            { tone: 'good', text: 'English and Portuguese' },
            { tone: 'good', text: 'Full' },
            { tone: 'mid', text: 'Varies' },
          ],
        },
        {
          label: 'Fixed costs and overhead',
          cells: [
            { tone: 'good', text: 'None' },
            { tone: 'bad', text: 'Salary, benefits and hiring' },
            { tone: 'good', text: 'None' },
          ],
        },
        {
          label: 'Scaling up or down',
          cells: [
            { tone: 'good', text: 'Flexible' },
            { tone: 'bad', text: 'Slow' },
            { tone: 'mid', text: 'Rigid contracts' },
          ],
        },
      ],
    },
    faqTitle: 'What people ask us about Augment.',
    finalTitle: 'Tell us which profiles your team is missing.',
  },
  howItWorks: [
    { title: 'First call', text: 'We get to know the team, the stack and what needs to ship.' },
    { title: 'Profiles', text: 'We present technically assessed candidates within [x] days.' },
    { title: 'Interviews', text: 'Interview anyone you like. Only move forward with your picks.' },
    { title: 'Onboarding', text: 'Onboarding into your tools and ongoing follow-up.' },
  ],
  faq: [
    {
      q: 'What is staff augmentation in the Augment model?',
      a: 'Yellowipe professionals who work inside your team, with your tools and priorities. The contract is with us; the day-to-day is with you.',
    },
    {
      q: 'What is the difference between staffing and a dedicated team?',
      a: 'With staffing, you manage the specialists as part of your team. With a dedicated team, a Yellowipe tech lead organizes the work around the priorities you set.',
    },
    {
      q: 'How long does it take to have someone on the team?',
      a: '[Average time to first profiles and to start date to be confirmed.]',
    },
    {
      q: 'Do your professionals use AI tools?',
      a: 'Yes. They work with assistants such as Claude Code, Cursor and GitHub Copilot, always within your company’s security rules.',
    },
    {
      q: 'How much does it cost?',
      a: 'It depends on the profiles, seniority and duration. We send a proposal after the first call.',
    },
  ],
};

export const construaEn: ModelEn = {
  page: {
    tagline: 'A team that delivers the solution.',
    hero: {
      h1: 'Our team and our manager,',
      h1Highlight: 'building your product.',
      lead: 'A complete Yellowipe team, led by a project manager, builds the solution end to end. You set the goal and approve each delivery; we are accountable for the result.',
      badges: [
        'A complete, managed team',
        'Demos at the end of every sprint',
        'Automated tests from day one',
      ],
      cta: 'Talk about your project',
      vizLabel:
        'Illustration: a Yellowipe team with a project manager building the client’s product, sprint by sprint.',
    },
    viz: {
      scene: 'construa',
      actor: 'Yellowipe team',
      actorNote: 'Project manager and 4 specialists',
      lead: 'PM',
      product: 'Customer portal',
      disciplines: [
        { initials: 'UX', label: 'Design' },
        { initials: 'FE', label: 'Front-end' },
        { initials: 'BE', label: 'Back-end' },
        { initials: 'QA', label: 'Quality' },
      ],
      live: 'Live',
      waiting: 'Waiting for delivery',
      doneTitle: 'Customer portal in production',
      doneNote: 'Delivered and evolved by the same team',
    },
    whoLead:
      'With Build, Yellowipe is accountable for delivery: team, management and quality. You set the goal and approve every demo.',
    why: {
      eyebrow: 'Why Build',
      title: 'Critical software delivered, without overloading your team.',
      lead: 'You set the goals and priorities. We handle execution, with a team that is accountable for the result.',
      items: [
        {
          icon: 'target',
          title: 'Focus on the business',
          text: 'You set goals and priorities; day-to-day execution stays with us.',
        },
        {
          icon: 'layers',
          title: 'A complete team',
          text: 'Product, design, engineering, QA and DevOps in one team, already used to working together.',
        },
        {
          icon: 'eye',
          title: 'Full visibility',
          text: 'Demos at the end of every sprint and quality metrics shared with you.',
        },
        {
          icon: 'check',
          title: 'Quality from day one',
          text: 'Automated tests and CI/CD on every change, as in the Linde case study.',
        },
        {
          icon: 'spark',
          title: 'AI in the process',
          text: 'Development accelerated with coding assistants, always reviewed by senior engineers.',
        },
        {
          icon: 'loop',
          title: 'Continuity',
          text: 'The same team maintains and evolves the product after launch.',
        },
      ],
    },
    formats: {
      title: 'A fixed-scope project or a product team.',
      lead: 'Choose based on how certain you already are about what you want to build.',
      items: [
        {
          tag: 'Project',
          title: 'Fixed scope',
          text: 'Scope, timeline and budget agreed up front, with phased deliveries.',
          ticks: [
            'Ideal for MVPs and modules',
            'Agreed delivery plan',
            'Handover with documentation',
          ],
        },
        {
          tag: 'Product',
          title: 'Ongoing product team',
          text: 'A stable team that evolves the product from a shared roadmap.',
          ticks: [
            'Roadmap reviewed with you',
            'Ideal for growing products',
            'The same team over time',
          ],
        },
      ],
    },
    steps: {
      title: 'From problem to software in production.',
      lead: 'Short sprints, frequent demos and quality measured in every delivery.',
    },
    stack: {
      title: 'We build on the stack that makes sense for you.',
      lead: 'We choose the technology with your team: the one you already use, or the one that best serves the product, always with AI in the development process.',
      cta: 'Talk about your project',
    },
    comparison: {
      title: 'Build with us, assemble a team or hire freelancers?',
      columns: ['Yellowipe · Build', 'Assemble an in-house team', 'Freelancers'],
      rows: [
        {
          label: 'Time to kick off',
          cells: [
            { tone: 'good', text: 'Weeks' },
            { tone: 'bad', text: 'Months' },
            { tone: 'mid', text: 'Fast, but scattered' },
          ],
        },
        {
          label: 'A complete team, from product to QA',
          cells: [
            { tone: 'good', text: 'Yes' },
            { tone: 'mid', text: 'You have to build it' },
            { tone: 'bad', text: 'Rarely' },
          ],
        },
        {
          label: 'Accountability for delivery',
          cells: [
            { tone: 'good', text: 'Yellowipe’s' },
            { tone: 'mid', text: 'Yours' },
            { tone: 'bad', text: 'Split' },
          ],
        },
        {
          label: 'Quality and testing',
          cells: [
            { tone: 'good', text: 'Automated from the start' },
            { tone: 'mid', text: 'It depends' },
            { tone: 'mid', text: 'Varies' },
          ],
        },
        {
          label: 'Continuity after launch',
          cells: [
            { tone: 'good', text: 'The same team' },
            { tone: 'good', text: 'Yes' },
            { tone: 'bad', text: 'Uncertain' },
          ],
        },
      ],
    },
    faqTitle: 'What people ask us about Build.',
    finalTitle: 'Tell us what you want to build.',
  },
  howItWorks: [
    { title: 'Discovery', text: 'Goals, users and technical constraints.' },
    { title: 'Design', text: 'Architecture, prototypes and a delivery plan.' },
    { title: 'Build', text: 'Sprints with demos and automated tests.' },
    { title: 'Go-live and evolution', text: 'Supported launch and continuous improvement.' },
  ],
  faq: [
    {
      q: 'What kind of projects do you take on?',
      a: 'Web and mobile applications, enterprise platforms, AI and cloud solutions, from MVPs to critical systems serving millions of users.',
    },
    {
      q: 'Do you work on fixed-scope projects?',
      a: 'Yes, for projects with clear requirements. When the product is still being discovered, we recommend an ongoing product team.',
    },
    {
      q: 'Who owns the code?',
      a: 'The code and intellectual property are yours. [Confirm wording with legal.]',
    },
    {
      q: 'Do you use AI in development?',
      a: 'Yes, with coding assistants and AI-generated tests, always reviewed by senior engineers.',
    },
    {
      q: 'How much does it cost?',
      a: 'It depends on the scope and the team. After discovery, we send a proposal with a delivery plan.',
    },
  ],
};
