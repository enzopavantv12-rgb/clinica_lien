/**
 * FONTE UNICA DE VERDADE DO CONTEUDO.
 * Todo texto da landing page vive aqui. Nada de string hardcoded em JSX.
 *
 * Itens marcados com CONFIRMAR precisam de validacao da Dra. Natalia antes do
 * deploy de producao. Ver lista consolidada no README.md.
 */

export const CONFIRMAR = '[[CONFIRMAR]]';

export const site = {
  nome: 'Lien Reabilitação Oral',
  tagline: 'Reabilitação oral de alta complexidade em Belo Horizonte',
  url: 'https://lienreabilitacaooral.com.br',
  telefoneExibicao: '(31) 98507-0448',
  telefoneE164: '+5531985070448',
  whatsappNumero: '5531985070448',
  endereco: 'Edifício Asteca, Av. do Contorno, 5351 — Cruzeiro, Belo Horizonte - MG',
  enderecoCurto: 'Edifício Asteca, Av. do Contorno, 5351 — Cruzeiro, Belo Horizonte',
  horario: 'Segunda a Sexta, das 08h às 19h',
  horarioCurto: 'Atendimento de segunda a sexta, das 8h às 19h',
  instagram: 'https://www.instagram.com/clinicalien',
  tiktok: 'https://www.tiktok.com/@clinicalien',
  arroba: '@clinicalien',
  // Obrigatorio por norma do CFO.
  responsavelTecnico: `Dra. Natália Simões — CRO-MG ${CONFIRMAR}`,
  copyright: '© 2026 Lien Reabilitação Oral. Excelência em sorrisos.',
} as const;

export const seo = {
  title: 'Lien Reabilitação Oral | Implantes e Reabilitação em Belo Horizonte',
  description:
    'Especialistas em implantodontia, reabilitação oral e prótese em BH. Atendimento humanizado no Cruzeiro. Agende sua avaliação.',
  canonical: 'https://lienreabilitacaooral.com.br/',
  ogImage: 'https://lienreabilitacaooral.com.br/og-image.jpg',
  themeColor: '#9C1781',
} as const;

/** Mensagens de WhatsApp por origem. A chave viaja no dataLayer como `origem`. */
export const whatsappMensagens = {
  hero: 'Olá! Gostaria de agendar uma avaliação na Lien.',
  menu: 'Olá! Gostaria de agendar uma avaliação na Lien.',
  ctaFinal: 'Olá! Gostaria de agendar uma avaliação na Lien.',
  flutuante: 'Olá! Gostaria de agendar uma avaliação na Lien.',
  implantodontia: 'Olá! Gostaria de saber mais sobre Implantodontia Digital na Lien.',
  reabilitacao: 'Olá! Gostaria de saber mais sobre Reabilitação Oral Completa na Lien.',
  protese: 'Olá! Gostaria de saber mais sobre Prótese Dentária na Lien.',
  periodontia: 'Olá! Gostaria de saber mais sobre Periodontia na Lien.',
  lentes: 'Olá! Gostaria de saber mais sobre Lentes de Contato Dental na Lien.',
  atm: 'Olá! Gostaria de saber mais sobre tratamento de Disfunção de ATM na Lien.',
} as const;

export type OrigemWhatsApp = keyof typeof whatsappMensagens;

export const navegacao = [
  { label: 'Início', href: '#inicio' },
  { label: 'Tratamentos', href: '#especialidades' },
  { label: 'Nossa Equipe', href: '#equipe' },
  { label: 'Depoimentos', href: '#depoimentos' },
] as const;

export const hero = {
  tag: 'Reabilitação Oral · Implantes · Belo Horizonte',
  h1: 'Devolvemos sua mastigação, seu sorriso e sua confiança.',
  sub: 'Especialistas em reabilitação oral completa, com planejamento individualizado e uma experiência pensada para quem tem medo de dentista.',
  ctaPrimario: 'Agendar Avaliação pelo WhatsApp',
  ctaSecundario: 'Conhecer a Lien',
  ctaSecundarioHref: '#metodo-lien',
  imagem: {
    src: '/img/hero-dra-natalia.webp',
    alt: 'Dra. Natália Simões, especialista em implantodontia em Belo Horizonte, na clínica Lien',
    pendente: true,
  },
} as const;

/** CONFIRMAR numeros reais com a Dra. Natalia antes do deploy. */
export const numeros = [
  { valor: 150, prefixo: '+', sufixo: '', label: 'Pacientes reabilitados' },
  { valor: 5, prefixo: '', sufixo: ',0 ★', label: 'Avaliação no Google' },
  { valor: 3, prefixo: '', sufixo: '', label: 'Especialidades integradas' },
  { valor: 8, prefixo: '+', sufixo: ' anos', label: 'de excelência clínica' },
] as const;

export const metodoLien = {
  tag: 'MÉTODO LIEN',
  h2: 'Cada sorriso começa com um diagnóstico profundo.',
  sub: 'Desenvolvemos um protocolo próprio de 4 etapas que garante previsibilidade, segurança e resultados duradouros.',
  pilares: [
    {
      numero: '01',
      icone: 'Stethoscope',
      titulo: 'Diagnóstico Profundo',
      descricao:
        'Avaliamos sua saúde bucal de forma integrada, com tecnologia digital e escuta ativa.',
    },
    {
      numero: '02',
      icone: 'MonitorSmartphone',
      titulo: 'Planejamento Digital',
      descricao:
        'Simulamos o resultado antes de começar. Você aprova o sorriso antes de qualquer procedimento.',
    },
    {
      numero: '03',
      icone: 'ShieldCheck',
      titulo: 'Execução Especializada',
      descricao: 'Cada etapa é conduzida pelo especialista certo, com precisão e cuidado.',
    },
    {
      numero: '04',
      icone: 'HeartHandshake',
      titulo: 'Acompanhamento Contínuo',
      descricao: 'Seu resultado é monitorado. A Lien não entrega um sorriso e some.',
    },
  ],
} as const;

export const especialidades = {
  tag: 'ESPECIALIDADES',
  h2: 'Tratamentos pensados para quem quer resultado de verdade.',
  ctaLabel: 'Ver detalhes',
  itens: [
    {
      id: 'implantodontia',
      destaque: true,
      icone: 'Sparkles',
      titulo: 'Implantodontia Digital',
      descricao:
        'Substituição de dentes perdidos com precisão milimétrica e tecnologia avançada. Recupere a função e a estética com segurança e previsibilidade.',
      origem: 'implantodontia' as OrigemWhatsApp,
    },
    {
      id: 'reabilitacao',
      destaque: false,
      icone: 'Smile',
      titulo: 'Reabilitação Oral Completa',
      descricao:
        'Recuperação integrada da função mastigatória, estética e saúde bucal — para casos simples ou de alta complexidade.',
      origem: 'reabilitacao' as OrigemWhatsApp,
    },
    {
      id: 'protese',
      destaque: false,
      icone: 'Layers',
      titulo: 'Prótese Dentária',
      descricao:
        'Soluções fixas e removíveis que devolvem a função e a beleza do sorriso com naturalidade.',
      origem: 'protese' as OrigemWhatsApp,
    },
    {
      id: 'periodontia',
      destaque: false,
      icone: 'Leaf',
      titulo: 'Periodontia',
      descricao:
        'Tratamento e prevenção de doenças das gengivas. Base saudável para qualquer reabilitação.',
      origem: 'periodontia' as OrigemWhatsApp,
    },
    {
      id: 'lentes',
      destaque: false,
      icone: 'Gem',
      titulo: 'Lentes de Contato Dental',
      descricao:
        'Lâminas ultrafinas de cerâmica para um sorriso esteticamente perfeito, preservando o dente natural.',
      origem: 'lentes' as OrigemWhatsApp,
    },
    {
      id: 'atm',
      destaque: false,
      icone: 'Activity',
      titulo: 'Disfunção de ATM',
      descricao:
        'Alívio de dores na mandíbula, travamentos e equilíbrio funcional — com foco no seu bem-estar.',
      origem: 'atm' as OrigemWhatsApp,
    },
  ],
} as const;

export const experiencia = {
  tag: 'EXPERIÊNCIA LIEN',
  h2: 'Odontologia sem medo. Exatamente como você sempre quis.',
  sub: 'Cada detalhe da Lien foi pensado para quem evitou o dentista por anos. Aqui, o cuidado começa antes de sentar na cadeira.',
  imagem: {
    src: '/img/experiencia-recepcao.webp',
    alt: 'Recepção da clínica Lien Reabilitação Oral em Belo Horizonte, com ambiente acolhedor para pacientes com ansiedade odontológica',
    pendente: true,
  },
  diferenciais: [
    {
      icone: 'Coffee',
      texto:
        'Recepção com café, chá e acolhimento — porque você não deveria esperar com ansiedade.',
    },
    {
      icone: 'Leaf',
      texto: 'Aromaterapia e ambiente sensorial — projetado para relaxar, não para intimidar.',
    },
    {
      icone: 'Headphones',
      texto:
        'Música, conforto e comunicação constante — você sabe o que vai acontecer antes de acontecer.',
    },
    {
      icone: 'Gift',
      texto: 'Kit pós-operatório — porque o cuidado não termina quando você sai da cadeira.',
    },
  ],
} as const;

export const equipe = {
  tag: 'CORPO CLÍNICO',
  h2: 'Cada caso, um especialista dedicado.',
  sub: 'Uma equipe multidisciplinar que trabalha de forma integrada — para que você não precise ir a outro lugar.',
  membros: [
    {
      nome: 'Dra. Natália Simões',
      titulo: 'Fundadora · Implantodontia · Prótese · Periodontia',
      bio: 'Fundadora da Lien e referência em reabilitação oral completa. Conduz cada caso do planejamento digital à entrega do sorriso final, com atenção especial a pacientes com ansiedade odontológica.',
      foto: {
        src: '/img/equipe-natalia-simoes.webp',
        alt: 'Dra. Natália Simões, fundadora da Lien e especialista em implantodontia e reabilitação oral em Belo Horizonte',
        pendente: true,
      },
    },
    {
      nome: 'Dra. Maria Emília',
      titulo: 'Endodontia',
      bio: 'Tratamento de canal com precisão e conforto — preservando dentes que outros indicariam extrair.',
      foto: {
        src: '/img/equipe-maria-emilia.webp',
        alt: 'Dra. Maria Emília, especialista em endodontia na clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
    {
      nome: 'Dra. Isabela Guieiro',
      titulo: 'Harmonização Orofacial e Ortodontia',
      bio: 'Estética integrada entre função e beleza.',
      foto: {
        src: '/img/equipe-isabela-guieiro.webp',
        alt: 'Dra. Isabela Guieiro, especialista em harmonização orofacial e ortodontia na clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
    {
      nome: 'Dr. Alexander Pedrosa',
      titulo: 'Cirurgia Bucomaxilofacial (Mestre e Doutor)',
      bio: 'Cirurgia e reconstrução facial de alta complexidade.',
      foto: {
        src: '/img/equipe-alexander-pedrosa.webp',
        alt: 'Dr. Alexander Pedrosa, cirurgião bucomaxilofacial da clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
  ],
} as const;

export const ambientes = {
  tag: 'AMBIENTES',
  // COPY NOVA — nao vem do prompt mestre (a secao Ambientes veio do prompt
  // diretor, que nao trouxe copy). Derivada do vocabulario ja aprovado no hero
  // e na Experiencia Lien para nao introduzir voz nova. Sujeita a aprovacao.
  h2: 'Um espaço pensado para quem tem medo de dentista.',
  sub: 'Cada ambiente da clínica foi escolhido para reduzir a tensão antes de a consulta começar.',
  // CONFIRMAR a lista real de ambientes com a Dra. Natalia — nao presumimos
  // salas que talvez nao existam.
  espacos: [
    {
      titulo: 'Recepção',
      foto: {
        src: '/img/ambiente-recepcao.webp',
        alt: 'Recepção da clínica Lien Reabilitação Oral no Cruzeiro, Belo Horizonte, com ambiente acolhedor',
        pendente: true,
      },
    },
    {
      titulo: 'Sala de atendimento',
      foto: {
        src: '/img/ambiente-atendimento.webp',
        alt: 'Sala de atendimento odontológico da clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
    {
      titulo: 'Kit de boas-vindas',
      foto: {
        src: '/img/ambiente-kit-boas-vindas.webp',
        alt: 'Kit de boas-vindas entregue aos pacientes da clínica Lien Reabilitação Oral em Belo Horizonte',
        pendente: true,
      },
    },
  ],
} as const;

export const depoimentos = {
  h2: 'O que dizem quem transformou o sorriso com a Lien.',
  sub: 'Histórias reais. Resultados reais.',
  itens: [
    {
      nome: 'Maria C.',
      tratamento: 'Implantes + Prótese',
      texto:
        'Fiz minha reabilitação completa com a Dra. Natália após anos evitando dentista. O resultado superou tudo que eu imaginava — e a experiência não teve nada que me desse medo.',
    },
  ],
  // CONFIRMAR: coletar mais depoimentos reais que mencionem implante,
  // reabilitacao, protese ou mastigacao — nao apenas "atendimento otimo".
} as const;

export const faq = {
  tag: 'PERGUNTAS FREQUENTES',
  h2: 'O que os pacientes mais perguntam.',
  itens: [
    {
      pergunta: 'Quanto tempo dura um implante dentário?',
      resposta:
        'Um implante bem planejado e mantido pode durar décadas. A longevidade depende da qualidade óssea, da higiene diária e das consultas de acompanhamento. Na Lien, cada implante entra em um protocolo de monitoramento contínuo para preservar o resultado ao longo do tempo.',
    },
    {
      pergunta: 'O procedimento de implante dói?',
      resposta:
        'A cirurgia é feita sob anestesia local e o paciente não sente dor durante o procedimento. O desconforto no pós-operatório é controlado com medicação e costuma ser menor do que a maioria espera. Todo o processo é comunicado antes, passo a passo.',
    },
    {
      pergunta: 'Quem tem diabetes ou osteoporose pode fazer implante?',
      resposta:
        'Em muitos casos, sim. Diabetes controlada e osteoporose não são impedimentos automáticos, mas exigem avaliação criteriosa e integração com seu médico. O diagnóstico profundo da Lien existe justamente para definir a conduta segura em cada situação.',
    },
    {
      pergunta: 'Qual a diferença entre prótese e implante?',
      resposta:
        'O implante é um pino de titânio fixado no osso que substitui a raiz do dente. A prótese é a parte visível, que devolve forma e função. Uma prótese pode ser sustentada por implantes, por dentes naturais ou ser removível — a escolha depende do seu caso.',
    },
    {
      pergunta: 'Em quanto tempo fico com o dente definitivo?',
      resposta:
        'Depende do caso. Há situações de carga imediata, com dente provisório no mesmo dia da cirurgia. Em outras, aguarda-se a integração do implante ao osso antes da peça definitiva. O prazo real é definido no planejamento digital, antes de começar.',
    },
    {
      pergunta: 'A Lien atende pacientes com medo de dentista?',
      resposta:
        'Sim — é o foco central da clínica. Boa parte dos nossos pacientes evitou o dentista por anos. A recepção, a aromaterapia, a música e a comunicação constante durante o procedimento existem para que você saiba o que vai acontecer antes de acontecer.',
    },
    {
      pergunta: 'A Lien atende convênio?',
      resposta: `Consulte as condições de atendimento diretamente pelo WhatsApp. ${CONFIRMAR}`,
    },
    {
      pergunta: 'Onde fica a clínica e como chegar?',
      resposta:
        'A Lien fica no Edifício Asteca, na Av. do Contorno, 5351 — bairro Cruzeiro, Belo Horizonte (MG). O atendimento é de segunda a sexta, das 8h às 19h. Pelo WhatsApp orientamos sobre acesso e estacionamento.',
    },
  ],
} as const;

export const ctaFinal = {
  h2: 'Seu próximo passo começa aqui.',
  sub: 'Agende sua avaliação diagnóstica. Primeira consulta com planejamento individualizado — sem compromisso.',
  cta: 'Agendar pelo WhatsApp',
  suporte: `${site.horarioCurto} · ${site.enderecoCurto}`,
} as const;

export const rodape = {
  agendarLabel: 'Agendar',
} as const;
