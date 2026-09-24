/**
 * FONTE UNICA de todo o texto do site.
 *
 * Copy reescrita a partir do briefing oficial preenchido pela clinica
 * (Wolfness Company, set/2026). Marcacoes usadas neste arquivo:
 *
 *   [PENDENTE: ...]  informacao que o briefing nao traz. Nada foi inventado:
 *                    o campo fica vazio (null) ou o texto contorna a lacuna.
 *   [SUGESTAO: ...]  o PDF do briefing cortou a resposta; o texto publicado e
 *                    uma proposta de complemento. Validar com a Dra. Natalia.
 *
 * A lista completa das duas esta em RELATORIO-ALTERACOES.md.
 *
 * Vocabulario do briefing (secao 2): nunca "avaliacao" no sentido de consulta,
 * nem "orcamento", preco, promocao, desconto, "garantido", "indolor" ou
 * superlativo vazio. O verificador (npm run verificar) reprova o build se algum
 * aparecer no HTML publicado. "Avaliacoes" do Google e o unico uso permitido.
 */

/**
 * Mostra a secao de antes e depois. So ligar quando os arquivos existirem E o
 * enquadramento na Resolucao CFO 196/2019 estiver confirmado.
 * [PENDENTE: receber os casos autorizados]
 */
export const SHOW_RESULTS: boolean = false;

export const site = {
  nome: 'Lien Reabilitação Oral',
  razaoSocial: 'Lien Reabilitação Oral Ltda.',
  cnpj: '60.080.536/0001-96',
  // Dominio de producao. E o unico lugar a trocar quando o dominio proprio
  // (lienreabilitacao.com.br, registrado segundo o briefing) for apontado.
  url: 'https://clinica-lien.vercel.app',
  tagline: 'Odontologia que acolhe. Cuidado que inspira confiança.',
  // [PENDENTE: confirmar se este e o numero unico de atendimento]
  telefoneExibicao: '(31) 98507-0448',
  telefoneE164: '+5531985070448',
  whatsappNumero: '5531985070448',
  email: 'lienreabilitacao@gmail.com',
  endereco: {
    edificio: 'Edifício Asteca',
    rua: 'Av. do Contorno, 5351',
    bairro: 'Cruzeiro',
    cidade: 'Belo Horizonte',
    uf: 'MG',
    cep: '30110-923',
    // [PENDENTE: numero da sala e ponto de referencia]
  },
  enderecoCompleto: 'Edifício Asteca · Av. do Contorno, 5351 — Cruzeiro, Belo Horizonte/MG · CEP 30110-923',
  // Grafia usada no Google Maps (busca, rota, embed e hasMap do schema). Manter
  // identica a do perfil no Google Empresa, por consistencia de SEO local.
  enderecoMaps: 'Av. do Contorno, 5351 - Cruzeiro, Belo Horizonte - MG, 30110-923',
  enderecoCurto: 'Edifício Asteca · Av. do Contorno, 5351 — Cruzeiro, BH',
  horarios: [
    { dias: 'Segunda, terça, quinta e sexta', horas: '8h às 18h' },
    { dias: 'Quarta', horas: '9h às 20h' },
  ],
  instagram: { url: 'https://www.instagram.com/dra.nataliasimoes', arroba: '@dra.nataliasimoes' },
  // [PENDENTE: confirmar se TikTok e Facebook aparecem — o briefing listou so o
  // Instagram no rodape]. Desligados ate la; o Facebook nao tem URL no briefing.
  tiktok: { url: 'https://www.tiktok.com/@clinicalien', arroba: '@clinicalien', exibir: false },
  // Obrigatorio por norma do CFO.
  responsavelTecnica: 'Dra. Natália Ferreira Simões',
  cro: 'CRO-MG 49.821',
  credito: 'Site por Wolfness Company',
} as const;

export const seo = {
  title: 'Implantes Dentários e Reabilitação Oral em BH | Lien — Cruzeiro',
  description:
    'Implantodontia digital, reabilitação oral e próteses com planejamento individual e atendimento acolhedor, inclusive para quem tem medo de dentista. Cruzeiro, Belo Horizonte.',
  canonical: `${site.url}/`,
  // [PENDENTE: og-image.jpg 1200x630 com foto real da clinica — o arquivo ainda
  // nao existe, entao o compartilhamento em redes sai sem imagem]
  ogImage: `${site.url}/og-image.jpg`,
  ogImageAlt: 'Lien Reabilitação Oral — implantes e reabilitação oral no Cruzeiro, Belo Horizonte',
  themeColor: '#9C1781',
} as const;

// Abertura comum a todas as mensagens.
const OLA = 'Olá! Conheci a Lien pelo site e';

/**
 * Mensagens de WhatsApp por origem. A chave viaja no dataLayer como `origem` e
 * no HTML como `data-cta`, para medir qual secao converte.
 * [SUGESTAO: as mensagens especificas completam os trechos do briefing, que
 * so trazia o final de cada uma]
 */
export const whatsappMensagens = {
  // [SUGESTAO: o original foi cortado depois de "Podem me"]
  hero: `${OLA} gostaria de conversar sobre o atendimento. Podem me ajudar?`,
  menu: `${OLA} gostaria de conversar sobre o atendimento. Podem me ajudar?`,
  final: `${OLA} gostaria de conversar sobre o atendimento. Podem me ajudar?`,
  flutuante: `${OLA} gostaria de conversar sobre o atendimento. Podem me ajudar?`,

  'cardapio-comer': `${OLA} gostaria de conversar sobre implantes e prótese.`,
  'cardapio-dentes': `${OLA} gostaria de conversar sobre implantes e prótese.`,
  'cardapio-protese': `${OLA} minha prótese está desconfortável. Podem me ajudar?`,
  'cardapio-sorriso': `${OLA} gostaria de melhorar meu sorriso.`,
  'cardapio-completo': `${OLA} gostaria de um planejamento completo.`,
  'cardapio-mandibula': `${OLA} sinto dor na mandíbula. Podem me ajudar?`,
  'cardapio-gengiva': `${OLA} minha gengiva sangra. Podem me ajudar?`,
  'cardapio-medo': `${OLA} tenho medo de dentista. Gostaria de entender como funciona o atendimento.`,

  'tratamento-implante': `${OLA} gostaria de conversar sobre implantodontia digital.`,
  'tratamento-reabilitacao': `${OLA} gostaria de conversar sobre reabilitação oral.`,
  'tratamento-protese': `${OLA} gostaria de conversar sobre prótese dentária.`,
  'tratamento-periodontia': `${OLA} gostaria de conversar sobre periodontia.`,
  'tratamento-harmonizacao': `${OLA} gostaria de conversar sobre harmonização orofacial.`,
  'tratamento-lentes': `${OLA} gostaria de conversar sobre lentes de contato dental e facetas.`,
  'tratamento-dtm': `${OLA} gostaria de conversar sobre DTM e dor orofacial.`,
  'tratamento-endodontia': `${OLA} gostaria de conversar sobre tratamento de canal.`,
  'tratamento-ortodontia': `${OLA} gostaria de conversar sobre ortodontia.`,
  'tratamento-clareamento': `${OLA} gostaria de conversar sobre clareamento dental.`,

  sedacao: `${OLA} gostaria de entender como funciona a sedação para implantes e cirurgias.`,

  sobre: `${OLA} gostaria de conversar sobre o atendimento. Podem me ajudar?`,
  rodape: `${OLA} gostaria de conversar sobre o atendimento. Podem me ajudar?`,
} as const;

export type OrigemWhatsApp = keyof typeof whatsappMensagens;

/** Ancoras do menu. Com `/` na frente: funcionam tambem a partir de /privacidade/. */
export const navegacao = [
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Método Lien', href: '/#metodo' },
  { label: 'Tratamentos', href: '/#tratamentos' },
  { label: 'Experiência', href: '/#experiencia' },
  { label: 'Equipe', href: '/#equipe' },
  { label: 'Dúvidas', href: '/#duvidas' },
] as const;

export const header = {
  cta: 'Agende sua consulta',
} as const;

export const hero = {
  tag: 'Reabilitação oral · Belo Horizonte',
  h1: 'Recuperar o sorriso, a mastigação e a confiança começa com um cuidado de verdade.',
  // Alternativa B do briefing:
  // h1: 'Seu sorriso, sua mastigação e sua qualidade de vida, recuperados com planejamento e cuidado.',
  sub: 'A Lien oferece odontologia de excelência, com planejamento individual, tecnologia digital e uma experiência pensada para quem quer se sentir seguro — inclusive quem tem medo de dentista.',
  cta: 'Agende sua consulta',
  microcopy: 'Atendimento particular · Cruzeiro, Belo Horizonte · Resposta em horário comercial',
  /**
   * Video da experiencia Lien. Quando existir, preencha `video` e o hero passa
   * a tocar (muted, autoplay, loop, playsinline), com o poster como fallback e
   * como unica imagem para quem pede movimento reduzido. Limite: 3 MB.
   * [PENDENTE: decidir junto com a clinica entre video e imagem estatica]
   */
  video: null as null | { src: string; tipo: string },
  imagem: {
    src: '/img/hero-dra-natalia.webp',
    alt: 'Dra. Natália Simões, especialista em implantodontia em Belo Horizonte, na clínica Lien',
    pendente: true,
  },
} as const;

/** Barra de confianca: quatro itens reais, sem numero inflado. */
export const confianca = {
  itens: [
    // `numero` sai no tamanho de impacto (44 -> 64px, peso 900); `complemento`,
    // menor, ao lado. Juntos no tamanho grande, "6 especialistas" nao cabe na
    // coluna.
    // [PENDENTE: atualizar o numero de avaliacoes antes de publicar]
    { numero: '5,0', complemento: '★', texto: 'Nota no Google · 57 avaliações' },
    { numero: '6', complemento: 'especialistas', texto: 'Cada tratamento conduzido pelo profissional da área' },
    { numero: null, complemento: 'Planejamento digital', texto: 'Escâner intraoral e visualização em 3D' },
    { numero: null, complemento: 'Cruzeiro, BH', texto: 'Edifício Asteca, Av. do Contorno' },
  ],
  /**
   * Opcionais do briefing, desligados. NUNCA publicar "3 reabilitacoes
   * realizadas": o numero baixo enfraquece a autoridade.
   * [PENDENTE: decidir se "+200 pacientes" entra]
   */
  opcionais: [
    { numero: '+200', complemento: null, texto: 'Pacientes atendidos' },
    { numero: '5', complemento: 'anos', texto: 'De atuação da Dra. Natália na especialidade' },
  ],
  mostrarOpcionais: false,
} as const;

/** "Cardapio de necessidades": o paciente escolhe pela dor, nas palavras dele. */
export const cardapio = {
  tag: 'Para você',
  h2: 'Por onde você quer começar?',
  sub: 'Conte o que está sentindo. A gente mostra o caminho — e o planejamento começa na consulta.',
  cta: 'Conversar pelo WhatsApp',
  verTratamento: 'Conhecer o tratamento',
  itens: [
    { texto: 'Quero comer com segurança', leva: 'Implantodontia digital e prótese', ancora: '#tratamento-implante', origem: 'cardapio-comer' },
    { texto: 'Perdi um ou mais dentes', leva: 'Implantodontia digital', ancora: '#tratamento-implante', origem: 'cardapio-dentes' },
    { texto: 'Minha prótese incomoda', leva: 'Prótese e reabilitação oral', ancora: '#tratamento-protese', origem: 'cardapio-protese' },
    { texto: 'Quero melhorar meu sorriso', leva: 'Lentes de contato dental, facetas e clareamento', ancora: '#tratamento-lentes', origem: 'cardapio-sorriso' },
    { texto: 'Tenho vários problemas ao mesmo tempo', leva: 'Reabilitação oral completa', ancora: '#tratamento-reabilitacao', origem: 'cardapio-completo' },
    { texto: 'Sinto dor ou estalos na mandíbula', leva: 'DTM e dor orofacial', ancora: '#tratamento-dtm', origem: 'cardapio-mandibula' },
    { texto: 'Minha gengiva sangra', leva: 'Periodontia', ancora: '#tratamento-periodontia', origem: 'cardapio-gengiva' },
    { texto: 'Tenho medo de dentista', leva: 'Experiência Lien e sedação', ancora: '#sedacao', origem: 'cardapio-medo' },
  ],
} as const satisfies {
  itens: readonly { origem: OrigemWhatsApp; ancora: string; texto: string; leva: string }[];
  [k: string]: unknown;
};

export const sobre = {
  tag: 'Clínica Lien Reabilitação Oral',
  h2: 'Lien quer dizer vínculo.',
  paragrafos: [
    'Em francês, lien significa laço, ligação, confiança. Foi esse o nome que escolhemos porque é isso que acreditamos que a odontologia deve ser: uma relação.',
    // [SUGESTAO: o original foi cortado em "em ter um espaço que eu possa…";
    // completar com a Dra. Natalia]
    'A Lien nasceu em 2024 do sonho da Dra. Natália Simões de ter um espaço onde cada paciente fosse atendido com tempo, escuta e cuidado de verdade.',
    'Aqui, consulta não tem pressa. Cada tratamento é planejado para a sua necessidade real — nem mais, nem menos.',
  ],
  cta: 'Agende sua consulta',
  // Missao, filosofia e fechamento sairam da secao no layout editorial
  // (set/2026). Continuam aqui porque o llms.txt ainda os publica.
  missao: {
    titulo: 'Missão',
    // [SUGESTAO: complemento "tecnica, tecnologia e acolhimento em cada etapa"]
    texto: 'Oferecer uma odontologia de excelência, humanizada e individualizada, unindo técnica, tecnologia e acolhimento em cada etapa do tratamento.',
  },
  filosofia: {
    titulo: 'Filosofia',
    // [SUGESTAO: complemento "afeto"]
    texto: 'Cuidar de cada paciente de forma individualizada, com escuta, planejamento, excelência técnica e afeto.',
  },
  fechamento:
    'Na Lien, você não recebe apenas um tratamento. Você vive uma experiência de cuidado — e ganha uma equipe que caminha com você.',
  // [PENDENTE: foto ampla da recepcao ou de um consultorio]
  imagem: {
    src: '/img/sobre-recepcao.webp',
    alt: 'Recepção da Lien Reabilitação Oral, no Cruzeiro, em Belo Horizonte',
    pendente: true,
  },
  // [PENDENTE: video de 8 a 15 s em loop, sem audio, 1080x1080, WebM (VP9) e
  // MP4 (H.264) ate 3MB cada, em /public/videos/. Poster em /public/videos/.
  // Enquanto for null, a forma de gota mostra um placeholder.]
  video: null as null | { webm: string; mp4: string; poster: string },
  rotuloPausar: 'Pausar vídeo',
  rotuloReproduzir: 'Reproduzir vídeo',
};

export const metodo = {
  tag: 'Método Lien',
  h2: 'Um caminho claro, do primeiro encontro ao cuidado contínuo.',
  sub: 'Você sabe o que vai acontecer antes de acontecer.',
  etapas: [
    {
      numero: '01',
      titulo: 'Consulta e diagnóstico profundo',
      // [SUGESTAO: o briefing contrasta com "avaliacao rapida" e "orcamento",
      // mas os dois termos sao proibidos na copy publica (secao 2 e checklist
      // da secao 9). Reescrito mantendo o contraste sem as palavras.]
      // [PENDENTE: duracao media da consulta]
      texto:
        'Começamos com uma consulta completa — muito diferente de um atendimento corrido. É um momento de escuta: conversamos sobre sua história, seus incômodos e seus objetivos, e investigamos sua saúde bucal com calma.',
    },
    {
      numero: '02',
      titulo: 'Planejamento digital',
      texto:
        'Com o escâner intraoral, você vê a sua boca em 3D: dentes mal posicionados, desgastes e o que precisa de atenção. Assim, você entende o plano e o aprova antes de qualquer procedimento começar.',
    },
    {
      numero: '03',
      titulo: 'Execução especializada',
      // [SUGESTAO: o original foi cortado em "todas as consultas iniciais sao…"; confirmar]
      texto:
        'Cada etapa é conduzida pelo especialista da área: implante com quem é de implante, canal com quem é de canal, dor na mandíbula com quem é de DTM. A consulta inicial é conduzida pela Dra. Natália, que coordena todo o seu caso.',
    },
    {
      numero: '04',
      titulo: 'Acompanhamento contínuo',
      // [PENDENTE: periodicidade — a clinica ainda vai desenvolver esta etapa]
      texto:
        'O cuidado não termina na entrega do sorriso. Você recebe mensagens de acompanhamento depois das consultas e dos procedimentos, e retornos programados para manter sua saúde em dia.',
    },
  ],
} as const;

type Tratamento = {
  id: string;
  origem: OrigemWhatsApp;
  nome: string;
  apelido?: string;
  icone: string;
  oQueE: string;
  beneficio?: string;
  indicado?: string;
  nota?: string;
  profissional?: string;
  selos?: readonly { texto: string; href?: string }[];
};

/**
 * Ordem = prioridade comercial do briefing. O implante e o card de destaque
 * (largura total); reabilitacao e protese, os medios; o resto, a grade.
 */
export const tratamentos = {
  tag: 'Tratamentos',
  h2: 'Cada tratamento começa pelo seu planejamento.',
  sub: 'Conheça as especialidades da Lien. O melhor caminho para você é definido na consulta.',
  cta: 'Quero conversar sobre isso',
  saibaMais: 'Saiba mais',
  rotulos: { oQueE: 'O que é', beneficio: 'Benefício', indicado: 'Para quem é indicado' },
  destaque: {
    id: 'tratamento-implante',
    origem: 'tratamento-implante',
    nome: 'Implantodontia digital',
    apelido: 'Implantes dentários',
    icone: 'MonitorSmartphone',
    // [SUGESTAO: complemento do texto truncado]
    oQueE:
      'A implantodontia digital permite substituir um ou mais dentes perdidos por meio de implantes dentários, com um planejamento feito em ambiente digital antes do procedimento.',
    beneficio:
      'Recuperar a segurança para sorrir, falar e mastigar, com um tratamento planejado para o seu caso.',
    // [SUGESTAO: complemento "naturalidade"]
    indicado:
      'Quem perdeu um ou mais dentes, usa prótese móvel ou dentadura e deseja mais estabilidade, conforto e naturalidade.',
    selos: [
      { texto: 'Escâner intraoral' },
      { texto: 'Agregados plaquetários' },
      { texto: 'Opção com sedação', href: '#sedacao' },
    ],
  },
  medios: [
    {
      id: 'tratamento-reabilitacao',
      origem: 'tratamento-reabilitacao',
      nome: 'Reabilitação oral completa',
      icone: 'Layers',
      oQueE:
        'Um tratamento planejado para recuperar a saúde, a função e a estética do sorriso quando existem diferentes problemas ao mesmo tempo.',
      beneficio:
        'Recuperar a capacidade de mastigar e sorrir com segurança, por meio de um planejamento integrado.',
      // [SUGESTAO: complemento "ou dificuldade para mastigar"]
      indicado:
        'Quem tem dentes ausentes, desgastados, quebrados ou comprometidos, próteses antigas ou desconfortáveis, ou dificuldade para mastigar.',
    },
    {
      id: 'tratamento-protese',
      origem: 'tratamento-protese',
      nome: 'Prótese dentária',
      apelido: 'Fixa e removível',
      icone: 'Smile',
      // [SUGESTAO: complemento do texto truncado]
      oQueE:
        'Próteses devolvem forma, aparência e função a dentes danificados ou substituem dentes perdidos. Conforme a necessidade, podem ser fixas, removíveis ou sobre implantes.',
      // [SUGESTAO: complemento "bem adaptada"]
      beneficio:
        'Recuperar o conforto e a segurança para mastigar, falar e sorrir, com uma prótese personalizada e bem adaptada.',
      // [SUGESTAO: complemento "desgastados"]
      indicado:
        'Quem perdeu um ou mais dentes, tem dentes quebrados ou muito desgastados, ou usa uma prótese que incomoda.',
    },
  ],
  grade: [
    {
      id: 'tratamento-periodontia',
      origem: 'tratamento-periodontia',
      nome: 'Periodontia',
      apelido: 'Saúde da gengiva e prevenção',
      icone: 'ShieldCheck',
      oQueE:
        'Área da odontologia responsável pela prevenção e pelo tratamento de problemas que afetam a gengiva e os tecidos que sustentam os dentes.',
      // [SUGESTAO: complemento "saude e seguranca a longo prazo"]
      beneficio:
        'Controlar inflamações e preservar a sustentação dos dentes, proporcionando mais saúde e segurança a longo prazo.',
      // [SUGESTAO: complemento "ou dentes com mobilidade"]
      indicado:
        'Quem tem sangramento gengival, gengiva inchada ou retraída, mau hálito persistente, sensibilidade ou dentes com mobilidade.',
    },
    {
      id: 'tratamento-harmonizacao',
      origem: 'tratamento-harmonizacao',
      nome: 'Harmonização orofacial',
      icone: 'Sparkles',
      // [SUGESTAO: complemento do texto truncado]
      oQueE:
        'Procedimentos que buscam equilibrar os traços do rosto e valorizar sua relação com o sorriso. Conforme as necessidades de cada paciente, o planejamento define a abordagem mais adequada.',
      // [SUGESTAO: o briefing nao traz beneficio; derivado do tom pedido para a
      // area — "natural e equilibrado", Dra. Isabela Guieiro]
      // [PENDENTE: indicacoes da harmonizacao]
      beneficio:
        'Uma abordagem que busca naturalidade e equilíbrio, respeitando a individualidade do seu rosto.',
    },
    {
      id: 'tratamento-lentes',
      origem: 'tratamento-lentes',
      nome: 'Lentes de contato dental e facetas',
      icone: 'Gem',
      // [SUGESTAO: complemento "tamanho e o alinhamento aparente dos dentes"]
      oQueE:
        'Facetas em resina e laminados cerâmicos são tratamentos personalizados para melhorar a forma, a cor, o tamanho e o alinhamento aparente dos dentes.',
      // [SUGESTAO: complemento "incomodam voce"]
      beneficio:
        'Harmonizar o sorriso de maneira personalizada e natural, corrigindo características que incomodam você.',
      // [PENDENTE: texto truncado no briefing — confirmar complemento]
      indicado:
        'Dentes manchados, desgastados, fraturados, pequenos, com formatos desarmônicos ou com espaços entre eles.',
      // A clinica nao quer parecer que indica tratamento so por estetica.
      nota: 'A indicação é sempre definida no planejamento, a partir da saúde dos seus dentes.',
    },
    {
      id: 'tratamento-dtm',
      origem: 'tratamento-dtm',
      nome: 'DTM e dor orofacial',
      apelido: 'Disfunção da ATM',
      icone: 'Activity',
      // [SUGESTAO: complemento "as articulacoes que ligam a mandibula ao cranio"]
      oQueE:
        'A disfunção temporomandibular (DTM) envolve alterações nos músculos da mastigação e nas articulações temporomandibulares — as articulações que ligam a mandíbula ao crânio.',
      beneficio:
        'Reduzir a dor e recuperar o conforto para mastigar, falar, bocejar e movimentar a mandíbula.',
      // [SUGESTAO: complemento "ou travamentos"]
      indicado:
        'Quem sente dor ou cansaço na mandíbula, estalos acompanhados de desconforto ou limitação, dificuldade para abrir a boca ou travamentos.',
      profissional: 'Dra. Gabriela Ribeiro',
    },
  ],
  compactos: [
    {
      id: 'tratamento-endodontia',
      origem: 'tratamento-endodontia',
      nome: 'Endodontia',
      apelido: 'Tratamento de canal',
      icone: 'Stethoscope',
      oQueE:
        'Trata a parte interna do dente para eliminar a dor, tratar infecções e preservar o dente natural.',
    },
    {
      id: 'tratamento-ortodontia',
      origem: 'tratamento-ortodontia',
      nome: 'Ortodontia',
      icone: 'Ruler',
      oQueE: 'Alinhamento dos dentes e da mordida, planejado para a sua fase de vida.',
    },
    {
      id: 'tratamento-clareamento',
      origem: 'tratamento-clareamento',
      nome: 'Clareamento dental',
      icone: 'Sun',
      oQueE: 'Clareamento conduzido e acompanhado por profissional, com segurança para seus dentes.',
    },
  ],
} as const satisfies {
  destaque: Tratamento;
  medios: readonly Tratamento[];
  grade: readonly Tratamento[];
  compactos: readonly Tratamento[];
  [k: string]: unknown;
};

/**
 * Sedacao — pedido explicito da clinica.
 * [PENDENTE: validar com a Dra. Natalia e com o Dr. Alexander Pedrosa o tipo de
 * sedacao (consciente/venosa), quem aplica e se e correto dizer "voce dorme".
 * Ate la, NAO usar "voce dorme durante todo o procedimento" nem "sem dor".]
 */
export const sedacao = {
  tag: 'Para quem tem medo',
  h2: 'Implantes e cirurgias com sedação.',
  texto:
    'Para quem sente medo ou ansiedade, existe a opção de realizar implantes e cirurgias com sedação, conduzida por profissional habilitado e com monitoramento durante todo o procedimento. Você vive essa etapa com muito mais tranquilidade.',
  itens: [
    'Indicação definida na consulta',
    'Equipe habilitada e monitoramento contínuo',
    'Acompanhamento no pós-operatório',
  ],
  cta: 'Quero entender como funciona a sedação',
} as const;

export const experiencia = {
  tag: 'Experiência Lien',
  h2: 'Um consultório pensado para você relaxar, não para intimidar.',
  sub: 'Cada detalhe foi escolhido para que ir ao dentista deixe de ser um peso.',
  diferenciais: [
    { icone: 'Coffee', titulo: 'Recepção acolhedora', texto: 'Café, chá e acolhimento — porque ninguém deveria esperar com ansiedade.' },
    { icone: 'ClipboardList', titulo: 'Cardápio de experiência', texto: 'Ao confirmar sua consulta, você recebe um cardápio para escolher como quer ser recebido.' },
    { icone: 'Leaf', titulo: 'Aromaterapia', texto: 'Aromas escolhidos para criar um ambiente calmo desde a entrada.' },
    { icone: 'Armchair', titulo: 'Cadeira de massagem e massagem facial', texto: 'Para o corpo relaxar antes e durante o atendimento.' },
    { icone: 'Headphones', titulo: 'Fones com isolamento de ruído', texto: 'Para bloquear o barulho dos equipamentos e você se desligar.' },
    { icone: 'MessageCircle', titulo: 'Comunicação constante', texto: 'Você sabe o que vai acontecer antes de acontecer.' },
    { icone: 'Gift', titulo: 'Kit pós-operatório', texto: 'O cuidado não termina quando você sai da cadeira.' },
    { icone: 'Hourglass', titulo: 'Consulta sem pressa', texto: 'Tempo dedicado a você, com atenção exclusiva.' },
  ],
  imagem: {
    src: '/img/experiencia-recepcao.webp',
    alt: 'Recepção da clínica Lien Reabilitação Oral em Belo Horizonte, com ambiente acolhedor para pacientes com ansiedade odontológica',
    pendente: true,
  },
} as const;

/** Estrutura e tecnologia. Absorve a antiga secao "Ambientes" (as 3 fotos). */
export const estrutura = {
  tag: 'Estrutura',
  h2: 'Tecnologia a serviço do seu planejamento.',
  itens: [
    { icone: 'ScanLine', titulo: 'Escâner intraoral', texto: 'Substitui a moldagem tradicional e permite visualizar sua boca em 3D.' },
    // [PENDENTE: validar a redacao tecnica com a Dra. Natalia]
    { icone: 'Droplets', titulo: 'Agregados plaquetários', texto: 'Recurso utilizado em cirurgias para favorecer a cicatrização.' },
    { icone: 'ShieldCheck', titulo: 'Biossegurança', texto: 'Protocolos rigorosos de esterilização em todas as etapas.' },
    // Sem estacionamento nem acessibilidade: nao marcados no briefing.
    // [PENDENTE: confirmar se ha]
    { icone: 'MapPin', titulo: 'Localização', texto: 'Edifício Asteca, Av. do Contorno, 5351 — Cruzeiro. Fácil acesso para quem mora ou trabalha na região Centro-Sul.' },
  ],
  fotos: [
    {
      titulo: 'Recepção',
      imagem: {
        src: '/img/ambiente-recepcao.webp',
        alt: 'Recepção da clínica Lien Reabilitação Oral no Cruzeiro, Belo Horizonte, com ambiente acolhedor',
        pendente: true,
      },
    },
    {
      titulo: 'Sala de atendimento',
      imagem: {
        src: '/img/ambiente-atendimento.webp',
        alt: 'Sala de atendimento odontológico da clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
    {
      titulo: 'Kit de boas-vindas',
      imagem: {
        src: '/img/ambiente-kit-boas-vindas.webp',
        alt: 'Kit de boas-vindas entregue aos pacientes da clínica Lien Reabilitação Oral em Belo Horizonte',
        pendente: true,
      },
    },
  ],
} as const;

type Membro = {
  nome: string;
  cargo?: string;
  especialidade: string | null;
  cro: string | null;
  bio: string | null;
  foto: { src: string; alt: string; pendente: boolean };
};

/**
 * PROIBIDO avatar com iniciais: sem foto, aparece o bloco neutro de foto
 * pendente. Campos null viram um aviso discreto, nunca texto inventado.
 * [PENDENTE: sobrenomes e grafia completa das Dras. Maria Emilia e demais]
 */
export const equipe = {
  tag: 'Equipe',
  h2: 'Cada especialidade com quem é especialista.',
  sub: 'Uma equipe de especialistas que trabalha de forma integrada, unindo tecnologia, excelência técnica e cuidado humanizado em todas as etapas do tratamento.',
  semBio: 'Mais informações em breve.',
  membros: [
    {
      nome: 'Dra. Natália Simões',
      cargo: 'Fundadora e CEO',
      especialidade: 'Implantodontia · Prótese · Periodontia · Habilitação em agregados plaquetários',
      cro: 'CRO-MG 49.821',
      // [SUGESTAO: complemento "primeiro encontro ate o cuidado continuo"]
      bio: 'Conduz cada caso de forma integrada, acompanhando o paciente desde o primeiro encontro até o cuidado contínuo.',
      foto: {
        src: '/img/equipe-natalia-simoes.webp',
        alt: 'Dra. Natália Simões, fundadora da Lien e especialista em implantodontia e reabilitação oral em Belo Horizonte',
        pendente: true,
      },
    },
    {
      nome: 'Dra. Maria Emília',
      especialidade: 'Endodontia (tratamento de canal)',
      cro: 'CRO-MG 36.401',
      // [SUGESTAO: complemento "precisao e cuidado"]
      bio: 'Seu trabalho é essencial para eliminar dor, tratar infecções e preservar dentes naturais com precisão e cuidado.',
      foto: {
        src: '/img/equipe-maria-emilia.webp',
        alt: 'Dra. Maria Emília, especialista em endodontia na clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
    {
      nome: 'Dra. Isabela Guieiro',
      especialidade: 'Harmonização orofacial e ortodontia',
      cro: 'CRO-MG 42.820',
      bio: 'Especialista em harmonização orofacial, com foco em resultados naturais e equilibrados. Respeita a individualidade de cada paciente, com leveza, precisão e senso estético.',
      foto: {
        src: '/img/equipe-isabela-guieiro.webp',
        alt: 'Dra. Isabela Guieiro, especialista em harmonização orofacial e ortodontia na clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
    {
      nome: 'Dr. Alexander Pedrosa',
      especialidade: 'Cirurgia e traumatologia bucomaxilofacial · Mestre e doutor',
      cro: 'CRO-MG 26.562',
      bio: 'Cirurgião bucomaxilofacial, mestre e doutor na área, com ampla experiência em casos complexos, reconstrução facial e procedimentos cirúrgicos avançados.',
      foto: {
        src: '/img/equipe-alexander-pedrosa.webp',
        alt: 'Dr. Alexander Pedrosa, cirurgião bucomaxilofacial da clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
    {
      nome: 'Dra. Gabriela Ribeiro',
      especialidade: 'Dor orofacial e DTM',
      cro: 'CRO-MG 65.103',
      // [PENDENTE: bio e foto]
      bio: null,
      foto: {
        src: '/img/equipe-gabriela-ribeiro.webp',
        alt: 'Dra. Gabriela Ribeiro, especialista em dor orofacial e DTM na clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
    {
      nome: 'Dra. Luiza Henriques',
      // [PENDENTE: especialidade, CRO, bio e foto]
      especialidade: null,
      cro: null,
      bio: null,
      foto: {
        src: '/img/equipe-luiza-henriques.webp',
        alt: 'Dra. Luiza Henriques, da equipe da clínica Lien em Belo Horizonte',
        pendente: true,
      },
    },
  ],
} as const satisfies { membros: readonly Membro[]; [k: string]: unknown };

/**
 * Antes e depois — Resolucao CFO 196/2019. Cada caso so entra com autorizacao
 * documentada. A secao inteira depende de SHOW_RESULTS.
 * [PENDENTE: receber os arquivos (reabilitacao e facetas) e confirmar o enquadramento]
 */
export const resultados = {
  tag: 'Resultados',
  h2: 'Histórias de sorrisos planejados com cuidado.',
  autorizacao: 'Imagem publicada com autorização do paciente.',
  variacao: 'Os resultados variam de pessoa para pessoa e dependem de diagnóstico individual.',
  rotuloAntes: 'Antes',
  rotuloDepois: 'Depois',
  rotuloComparar: 'Comparar antes e depois',
  casos: [] as readonly {
    tratamento: string;
    antes: { src: string; alt: string };
    depois: { src: string; alt: string };
  }[],
} as const;

/**
 * Nunca inventar depoimento. O unico que existia ("Maria C.") veio do prompt
 * original sem origem registrada e saiu ate ser confirmado.
 * [PENDENTE: textos, nome, tratamento e autorizacao dos depoimentos]
 * Criterio: priorizar os que citam implante, reabilitacao, protese ou mastigacao.
 */
export const depoimentos = {
  tag: 'Depoimentos',
  h2: 'Quem vive a Lien, conta.',
  google: {
    nota: '5,0',
    // [PENDENTE: atualizar antes de publicar; e o link do perfil no Google]
    total: 57,
    url: null as string | null,
  },
  itens: [] as readonly { nome: string; tratamento: string; texto: string }[],
} as const;

/**
 * FAQ. O schema FAQPage e gerado deste mesmo objeto (src/data/schema.ts).
 * Respostas curtas; "investimento" so aqui, e sem numero.
 */
export const faq = {
  tag: 'Dúvidas',
  h2: 'Dúvidas frequentes',
  itens: [
    {
      pergunta: 'Como funciona a primeira consulta na Lien?',
      // [SUGESTAO: complemento a partir de "o que voce espera do tratamento"]
      resposta:
        'É um momento de escuta, investigação e diagnóstico. Conversamos sobre suas necessidades, seu histórico de saúde e o que você espera do tratamento. A partir disso, montamos um planejamento individual e explicamos cada etapa com clareza.',
    },
    {
      pergunta: 'Já sei qual tratamento quero fazer. Ainda preciso passar por uma consulta?',
      // [SUGESTAO: complemento a partir de "para confirmar"]
      resposta:
        'Sim. Mesmo quando você já sabe o que deseja, a consulta é indispensável para confirmar se esse é o melhor caminho para a sua saúde e planejar o tratamento com segurança.',
    },
    {
      pergunta: 'Tenho medo de dentista. A Lien está preparada para me atender?',
      // [SUGESTAO: complemento a partir de "tranquila"]
      resposta:
        'Sim. A Lien foi criada especialmente para proporcionar uma experiência mais tranquila: recepção acolhedora, aromaterapia, fones com isolamento de ruído, comunicação em cada etapa e, quando indicado, opção de sedação.',
    },
    {
      pergunta: 'Com os recursos atuais, o tratamento odontológico ainda dói?',
      // [SUGESTAO: abertura e fecho] Sem prometer ausencia de dor.
      resposta:
        'A odontologia conta hoje com anestesias e tecnologias que tornam os procedimentos muito mais confortáveis. Na Lien, cada etapa é conduzida com cuidado, respeitando o seu tempo e o seu limite.',
    },
    {
      pergunta: 'Qual é a diferença entre facetas em resina e laminados cerâmicos?',
      // [SUGESTAO: abertura e fecho]
      resposta:
        'As facetas em resina são confeccionadas diretamente sobre os dentes pelo cirurgião-dentista. Os laminados cerâmicos são produzidos em laboratório, a partir de um planejamento digital. A indicação depende do seu caso e é definida na consulta.',
    },
    {
      pergunta: 'Sangramento na gengiva é normal?',
      // [SUGESTAO: complemento a partir de "tratado"]
      resposta:
        'Não. O sangramento frequente pode indicar uma inflamação gengival ou uma doença periodontal. Quando não é tratado, pode evoluir e comprometer a sustentação dos dentes. Vale agendar uma consulta.',
    },
    {
      pergunta: 'Consigo saber o valor do meu tratamento pelo WhatsApp?',
      // [SUGESTAO: complemento a partir de "parecidas"] Sem valores, parcelas
      // ou formas de pagamento.
      resposta:
        'Cada tratamento é planejado individualmente, pois pacientes com necessidades aparentemente parecidas podem precisar de soluções bem diferentes. Por isso, o investimento só pode ser apresentado depois da consulta e do planejamento.',
    },
    {
      pergunta: 'Estalos e dores na mandíbula podem ser sinais de DTM?',
      // [SUGESTAO: abertura e fecho]
      resposta:
        'Podem ser. Os sinais mais comuns são dor na mandíbula ou na face, cansaço ao mastigar, travamentos, limitação para abrir a boca e estalos acompanhados de desconforto. A consulta com uma especialista em DTM ajuda a entender a causa.',
    },
    {
      pergunta: 'A Lien atende convênios?',
      resposta: 'A Lien realiza atendimento particular.',
    },
    {
      pergunta: 'Onde fica a Lien e qual é o horário?',
      resposta:
        'No Edifício Asteca, Av. do Contorno, 5351 — Cruzeiro, Belo Horizonte. Atendemos segunda, terça, quinta e sexta, das 8h às 18h, e quarta, das 9h às 20h.',
    },
    {
      pergunta: 'Vocês fazem implante com sedação?',
      // [PENDENTE: validar — ver sedacao]
      resposta: 'Sim, quando indicado no planejamento.',
    },
    {
      pergunta: 'A Lien atende urgências?',
      resposta: 'Atendemos urgências de pacientes em tratamento na Lien.',
    },
  ],
} as const;

export const ctaFinal = {
  h2: 'Seu tratamento começa com uma consulta cuidadosa.',
  // [SUGESTAO: complemento a partir de "para a sua necessidade real"]
  texto:
    'Na Lien, cada tratamento começa com escuta, diagnóstico cuidadoso e um planejamento pensado para a sua necessidade real. Converse com a gente e dê o primeiro passo.',
  cta: 'Conversar com a equipe Lien',
  // Decisao pendente da clinica: quem responde o WhatsApp e a propria Dra.
  // Natalia, mas o paciente imagina uma secretaria. Neutro por padrao.
  // Opcao B: 'Quem responde é a nossa equipe, das 8h às 18h.'
  suporte: 'Atendimento particular · Cruzeiro, Belo Horizonte',
} as const;

export const rodape = {
  titulos: { navegacao: 'Navegação', contato: 'Contato', horarios: 'Horários' },
  comoChegar: 'Como chegar',
  abrirNoMaps: 'Abrir no Google Maps',
  tracarRota: 'Traçar rota',
  conversarWhatsApp: 'Conversar pelo WhatsApp',
  // O mapa so carrega com clique: o iframe do Google grava cookies, e isso
  // exigiria consentimento (LGPD). Os botoes de rota nao dependem dele.
  mostrarMapa: 'Ver mapa interativo',
  avisoMapa: 'Ao carregar o mapa, o Google pode coletar dados de navegação.',
  privacidade: 'Política de privacidade',
} as const;

/**
 * Politica de privacidade — rascunho LGPD. A clinica nao tinha nenhuma.
 * [PENDENTE: revisao juridica antes de considerar este texto definitivo]
 */
export const privacidade = {
  titulo: 'Política de privacidade',
  atualizacao: 'Última atualização: setembro de 2026',
  intro:
    'Esta política explica quais dados pessoais a Lien Reabilitação Oral trata quando você visita este site, para quê, e quais são os seus direitos, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
  secoes: [
    {
      titulo: 'Quem é responsável pelos seus dados',
      paragrafos: [
        'Lien Reabilitação Oral Ltda., CNPJ 60.080.536/0001-96, com sede no Edifício Asteca, Av. do Contorno, 5351 — Cruzeiro, Belo Horizonte/MG.',
      ],
    },
    {
      titulo: 'Quais dados coletamos',
      paragrafos: [
        'O site não tem formulários nem área de login. Os dados que recebemos são os que você decide enviar ao conversar conosco pelo WhatsApp, como nome, telefone e a descrição do que procura.',
        'Como qualquer site, o servidor que o hospeda registra dados técnicos de acesso — por exemplo, endereço IP, navegador e páginas visitadas — para manter a segurança e o funcionamento do serviço.',
        'Hoje o site não usa cookies de análise nem de publicidade.',
      ],
    },
    {
      titulo: 'Para que usamos',
      paragrafos: [
        'Para responder ao seu contato, agendar sua consulta e dar continuidade ao seu atendimento. Não usamos seus dados para outras finalidades sem avisar você.',
      ],
    },
    {
      titulo: 'Com quem compartilhamos',
      paragrafos: [
        'Não vendemos nem cedemos seus dados. A conversa pelo WhatsApp passa pela plataforma da Meta, sujeita à política de privacidade dela. O mapa do rodapé só é carregado se você clicar para vê-lo; nesse momento, o Google pode coletar dados de navegação conforme a política dele.',
      ],
    },
    {
      titulo: 'Seus direitos',
      paragrafos: [
        'Você pode, a qualquer momento, pedir para confirmar se tratamos seus dados, acessá-los, corrigi-los, solicitar a exclusão, a portabilidade ou informações sobre o compartilhamento, e revogar um consentimento dado.',
      ],
    },
    {
      titulo: 'Como falar com a gente',
      paragrafos: [
        'Para exercer qualquer um desses direitos ou tirar dúvidas sobre esta política, escreva para lienreabilitacao@gmail.com.',
      ],
    },
    {
      titulo: 'Alterações nesta política',
      paragrafos: [
        'Esta política pode ser atualizada. A data da versão vigente fica sempre no topo desta página.',
      ],
    },
  ],
} as const;
