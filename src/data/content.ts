/**
 * FONTE UNICA de todo o texto do site (os 14 artigos ficam em content/artigos/).
 *
 * Alinhamento final (2026): a copy aprovada pela clinica e LITERAL — nao
 * reescrever, resumir nem "melhorar". Fonte: prompt
 * "alinhamento-final-lien-2026" (PDF "Lien — Alinhamento Final do Site").
 *
 *   [PENDENTE: ...]  material que ainda nao chegou. Nada foi inventado: o
 *                    campo fica vazio (null) ou aparece um placeholder neutro.
 *
 * A lista completa esta em RELATORIO-ALTERACOES.md.
 *
 * Vocabulario: nunca "avaliacao" no sentido de consulta, nem "orcamento",
 * preco, promocao, desconto, "garantido", "indolor" ou superlativo vazio. O
 * verificador (npm run verificar) reprova o build se algum aparecer.
 * "Avaliacoes" do Google e o uso tecnico nos artigos aprovados sao as excecoes.
 */

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
  // [PENDENTE: codigo de verificacao do Google Search Console]
  googleVerification: null as string | null,
} as const;

// Abertura comum a todas as mensagens.
const OLA = 'Olá! Conheci a Lien pelo site e';

/**
 * Mensagens de WhatsApp por origem. A chave viaja no dataLayer como `origem` e
 * no HTML como `data-cta` (com a rota em `data-page`), para medir qual secao e
 * qual pagina convertem. Todo botao principal do site diz "Agende sua
 * consulta" (alinhamento final, 2026); a mensagem pre-preenchida acompanha.
 * Origens `tratamento-<slug>` e `artigo-<slug>` sao montadas por
 * `mensagemWhatsApp` (abaixo).
 */
export const whatsappMensagens = {
  hero: `${OLA} gostaria de agendar uma consulta.`,
  menu: `${OLA} gostaria de agendar uma consulta.`,
  final: `${OLA} gostaria de agendar uma consulta.`,
  flutuante: `${OLA} gostaria de agendar uma consulta.`,
  rodape: `${OLA} gostaria de conversar sobre o atendimento. Podem me ajudar?`,
  comecar: `${OLA} não sei por onde começar. Gostaria de agendar uma consulta.`,
  sedacao: `${OLA} gostaria de agendar uma consulta para conversar sobre a sedação.`,
  duvidas: `${OLA} gostaria de agendar uma consulta.`,
} as const;

export type OrigemWhatsApp =
  | keyof typeof whatsappMensagens
  | `tratamento-${string}`
  | `artigo-${string}`;

/** Ancoras e paginas do menu. Ancoras com `/` na frente: funcionam de qualquer pagina. */
export const navegacao = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Método Lien', href: '/#metodo' },
  { label: 'Tratamentos', href: '/tratamentos/' },
  { label: 'Experiência', href: '/#experiencia' },
  { label: 'Equipe', href: '/#equipe' },
  { label: 'Conteúdos', href: '/conteudos/' },
  { label: 'Dúvidas', href: '/#duvidas' },
] as const;

/** Texto do CTA principal em todo o site (alinhamento final, secao 1). */
export const CTA_PRINCIPAL = 'Agende sua consulta';

export const header = {
  cta: CTA_PRINCIPAL,
} as const;

export const hero = {
  tag: 'Reabilitação oral · Belo Horizonte',
  // Copy sugerida pela Dra. Natalia Simoes (set/2026). O trecho final do H1
  // sai em magenta. Hero aprovada no alinhamento final: nao reabrir.
  h1: 'Reabilitação oral com excelência clínica, tecnologia e cuidado em cada detalhe.',
  h1Partes: ['Reabilitação oral com excelência clínica, tecnologia e ', 'cuidado em cada detalhe.'],
  sub: 'Planejamento personalizado e uma experiência pensada para quem valoriza segurança, conforto e previsibilidade em cada etapa.',
  apoio: 'Se você tem medo de dentista, talvez ainda não tenha conhecido a Lien.',
  cta: CTA_PRINCIPAL,
  microcopy: 'Atendimento particular · Cruzeiro, BH',
  /**
   * Foto da hero. Variantes geradas por `npm run hero` (scripts/optimize-hero.mjs)
   * a partir do original em assets/hero/. O recorte mobile e vertical (3:4).
   */
  imagem: {
    base: '/img/hero-lien',
    larguras: [1024, 1440, 2000],
    mobile: '/img/hero-lien-mobile-900',
    width: 2000,
    height: 1125,
    alt: 'Dra. Natália Simões, fundadora da Lien Reabilitação Oral, sorrindo em ambiente claro e acolhedor',
  },
} as const;

/** Prova social do Google (hero e faixa). */
export const google = {
  nota: '5,0',
  // [PENDENTE: atualizar o numero de avaliacoes antes de publicar e o link do
  // perfil no Google Empresa]
  total: 57,
  url: null as string | null,
} as const;

/**
 * Faixa unica de prova rapida, logo abaixo do hero (alinhamento final, 3.2).
 * Itens reais ja publicados antes; nenhum numero novo.
 */
export const faixa = {
  rotulo: 'A Lien em números',
  texto:
    '5,0 no Google  ✦  57 avaliações  ✦  6 especialistas  ✦  Planejamento digital  ✦  Escâner intraoral  ✦  Atendimento particular  ✦  Cruzeiro · Belo Horizonte  ✦',
  leitura: [
    'Nota 5,0 no Google, com 57 avaliações',
    '6 especialistas',
    'Planejamento digital com escâner intraoral',
    'Atendimento particular no Cruzeiro, Belo Horizonte',
  ],
} as const;

/**
 * Antes e depois — Resolucao CFO 196/2019. Pares de assets/Depoimentos/,
 * indicados pela clinica, com autorizacao escrita dos pacientes e fotos sem
 * edicao do resultado. O alinhamento final pede 4 a 6 casos com o mesmo
 * enquadramento: entraram os 6 de recorte mais consistente (rosto sorrindo,
 * close do sorriso e intraorais). Os pares 6 e 9 (harmonizacao) e 7 (antes com
 * afastador, depois sem) ficaram de fora. [PENDENTE: validar a selecao e a
 * revisao etica/CRO antes de publicar]
 */
export const resultados = {
  tag: 'Resultados',
  h2: 'Resultados que contam histórias.',
  apoio: 'Cada tratamento parte de uma necessidade diferente e de um planejamento individual.',
  autorizacao: 'Imagem publicada com autorização do paciente.',
  variacao: 'Os resultados variam de pessoa para pessoa e dependem de diagnóstico individual.',
  rotulos: ['Antes', 'Depois'] as [string, string],
  rotuloComparar: 'Comparar antes e depois',
  instrucao: 'Arraste para comparar',
  casos: [
    {
      id: '2',
      antes: { src: '/img/antes-depois-2-antes.webp', alt: 'Paciente sorrindo antes do tratamento na Lien' },
      depois: { src: '/img/antes-depois-2-depois.webp', alt: 'O mesmo paciente sorrindo depois do tratamento na Lien' },
    },
    {
      id: '1',
      antes: { src: '/img/antes-depois-1-antes.webp', alt: 'Paciente sorrindo antes do tratamento na Lien' },
      depois: { src: '/img/antes-depois-1-depois.webp', alt: 'A mesma paciente sorrindo depois do tratamento na Lien' },
    },
    {
      id: '8',
      antes: { src: '/img/antes-depois-8-antes.webp', alt: 'Paciente sorrindo, com falhas nos dentes, antes do tratamento' },
      depois: { src: '/img/antes-depois-8-depois.webp', alt: 'O mesmo paciente sorrindo depois do tratamento na Lien' },
    },
    {
      id: '3',
      antes: { src: '/img/antes-depois-3-antes.webp', alt: 'Sorriso com dentes ausentes e desgastados antes da reabilitação oral' },
      depois: { src: '/img/antes-depois-3-depois.webp', alt: 'O mesmo sorriso depois da reabilitação oral na Lien' },
    },
    {
      id: '5',
      antes: { src: '/img/antes-depois-5-antes.webp', alt: 'Vista frontal dos dentes com espaços antes do tratamento' },
      depois: { src: '/img/antes-depois-5-depois.webp', alt: 'A mesma vista frontal depois do tratamento na Lien' },
    },
    {
      id: '4',
      antes: { src: '/img/antes-depois-4-antes.webp', alt: 'Vista lateral dos dentes desalinhados antes do tratamento' },
      depois: { src: '/img/antes-depois-4-depois.webp', alt: 'A mesma vista lateral, com os dentes alinhados depois do tratamento' },
    },
  ],
} as const;

/**
 * "Quem vive a Lien, conta." — videos curtos de pacientes, separados dos casos
 * clinicos (prova emocional x prova clinica). Sem autoplay com som.
 * [PENDENTE: 2 a 3 videos de pacientes + autorizacao assinada. Cada video:
 * MP4 (H.264) e WebM, poster WebP no mesmo recorte vertical 9:16, legenda
 * .vtt se houver fala, e a legenda curta "Nome autorizado · contexto".]
 * Enquanto `videos` estiver vazio, o carrossel mostra `vagas` cartoes neutros.
 */
export const depoimentos = {
  tag: 'Depoimentos',
  h2: 'Quem vive a Lien, conta.',
  videos: [] as readonly {
    legenda: string;
    poster: string;
    mp4: string;
    webm?: string;
    vtt?: string;
  }[],
  vagas: 3,
  pendente: '[Vídeo pendente]',
  anterior: 'Vídeo anterior',
  proximo: 'Próximo vídeo',
  regiao: 'Vídeos de pacientes',
} as const;

/** Sobre — texto final do alinhamento (3.4). Literal. */
export const sobre = {
  tag: 'Clínica Lien Reabilitação Oral',
  h2: 'Lien quer dizer vínculo.',
  // "vinculo" em destaque, como no esqueleto. O ponto final sai em teal.
  tituloLinhas: ['Lien quer dizer', 'vínculo'],
  paragrafos: [
    'Lien, em francês, significa laço, ligação, vínculo. Foi esse o nome escolhido porque acreditamos que a odontologia não deve ser apenas uma sequência de procedimentos: deve ser uma relação construída com confiança, escuta e cuidado.',
    'Depois de cerca de oito anos atendendo em diferentes clínicas, a Dra. Natália Simões percebeu que algumas queixas se repetiam: medo de dentista, atendimentos apressados, pouca clareza sobre o tratamento e a sensação de não ser realmente ouvido.',
    'Em 2024, ela decidiu criar uma clínica com identidade própria e uma forma diferente de cuidar: tempo para escutar, profundidade para diagnosticar, liberdade para planejar cada caso e atenção à experiência do paciente em todas as etapas.',
    'Assim nasceu a Lien - unindo excelência clínica, tecnologia e um cuidado que começa antes do procedimento. Aqui, cada tratamento é pensado para a necessidade real de quem confia a própria saúde aos nossos cuidados.',
  ],
  quote: 'Mais do que tratar dentes, queremos construir relações de confiança que façam sentido ao longo do tempo.',
  // [PENDENTE: fotografia real grande da clinica. Ate la, a recepcao
  // (assets/fotos/consultorio/consultorio lien 3.png -> sobre-recepcao).]
  imagem: {
    src: '/img/sobre-recepcao.webp',
    alt: 'Recepção da Lien Reabilitação Oral, com poltronas, plantas e o logo da clínica na parede',
  },
} as const;

/** Metodo Lien — o "verdadeiro Metodo" em quatro etapas (3.5). Literal. */
export const metodo = {
  tag: 'Método Lien',
  h2: 'Cuidado que começa antes do tratamento.',
  intro:
    'Na Lien, cada caso é conduzido com escuta, diagnóstico, planejamento e acompanhamento. O tratamento não começa pelo procedimento - começa por entender você.',
  etapas: [
    { numero: '01', titulo: 'Escuta', texto: 'Entendemos sua história, necessidades, receios e objetivos.' },
    {
      numero: '02',
      titulo: 'Diagnóstico',
      texto: 'Exame clínico e recursos digitais quando indicados para compreender o caso por completo.',
    },
    {
      numero: '03',
      titulo: 'Planejamento',
      texto: 'Definimos caminhos, etapas e prioridades com clareza e previsibilidade.',
    },
    {
      numero: '04',
      titulo: 'Acompanhamento',
      texto: 'O cuidado continua durante e depois do tratamento, com foco em adaptação, conforto e manutenção.',
    },
  ],
  fechamento: 'Sem pressa. Sem excesso. Com clareza em cada etapa.',
} as const;

type Tratamento = {
  slug: string;
  numero: string;
  nome: string;
  icone: string;
  /** Frase do card curto. Nos 3 da home, a frase aprovada para a home (3.7). */
  resumo: string;
  oQueE: string;
  beneficio: string;
  indicado: string;
  servicos: readonly string[];
  nota: string;
  /** Aparece na rolagem principal da home. */
  home?: boolean;
};

/**
 * Tratamentos — Anexo I do alinhamento final, literal. 3 na home, 10 na
 * pagina /tratamentos/. O `slug` e a ancora (/tratamentos/#<slug>).
 */
export const tratamentos = {
  tag: 'Tratamentos',
  h2: 'Cada tratamento começa pelo seu planejamento.',
  sub: 'Conheça as especialidades da Lien. O melhor caminho para você é definido na consulta.',
  saibaMais: 'Saiba mais',
  fechar: 'Fechar',
  verTodos: 'Ver todos os tratamentos',
  cta: CTA_PRINCIPAL,
  pagina: {
    h1: 'Tratamentos e especialidades',
    title: 'Tratamentos e especialidades em Belo Horizonte | Lien',
    description:
      'Implantodontia digital, reabilitação oral, facetas e próteses, periodontia, harmonização orofacial, DTM, cirurgia, ortodontia, endodontia e clínica geral na Lien, no Cruzeiro, em Belo Horizonte.',
  },
  rotulos: {
    oQueE: 'O que é',
    beneficio: 'Benefício',
    indicado: 'Indicado para',
    servicos: 'Principais tratamentos e serviços',
    relacionados: 'Conteúdos relacionados',
  },
  lista: [
    {
      slug: 'implantodontia-digital',
      numero: '01',
      nome: 'Implantodontia digital',
      icone: 'MonitorSmartphone',
      home: true,
      resumo: 'Reposição de dentes perdidos com planejamento digital para mais precisão e previsibilidade.',
      oQueE:
        'A implantodontia digital combina exames e planejamento 3D para definir, antes da cirurgia, a posição dos implantes e a melhor estratégia para substituir um ou mais dentes perdidos.',
      beneficio:
        'Mais precisão no planejamento, maior previsibilidade do tratamento e uma cirurgia pensada de forma individualizada para buscar função, segurança e naturalidade.',
      indicado:
        'Para quem perdeu um ou mais dentes, utiliza próteses removíveis ou precisa reconstruir áreas com ausência dentária.',
      servicos: [
        'Implantes dentários',
        'Planejamento digital 3D',
        'Cirurgia guiada com abordagem minimamente invasiva e, quando indicada, sem abertura extensa da gengiva',
        'Prótese protocolo',
        'Levantamento de seio maxilar',
        'Sedação consciente com medicação oral',
        'Sedação intravenosa acompanhada por anestesista',
      ],
      nota: 'Cirurgia guiada, enxertos e sedação são definidos após a consulta, conforme anatomia, histórico de saúde e necessidade de cada caso.',
    },
    {
      slug: 'reabilitacao-oral-completa',
      numero: '02',
      nome: 'Reabilitação oral completa',
      icone: 'Layers',
      home: true,
      resumo:
        'Planejamento integrado para recuperar função, conforto e estética quando vários problemas precisam ser tratados juntos.',
      oQueE:
        'É o planejamento integrado de diferentes tratamentos quando dentes, gengiva, mordida, próteses ou estética precisam ser considerados em conjunto.',
      beneficio:
        'Organiza prioridades e etapas para que cada procedimento faça parte de um mesmo plano, evitando decisões isoladas e buscando equilíbrio entre saúde, função e estética.',
      indicado:
        'Para quem sente que há muitas coisas para resolver, possui vários dentes comprometidos, próteses antigas, perdas dentárias, desgastes ou necessidades em mais de uma especialidade.',
      servicos: [
        'Diagnóstico e planejamento integrado',
        'Integração entre especialidades quando necessário',
        'Escaneamento e documentação digital quando indicados',
        'Planejamento por etapas e acompanhamento ao longo do tratamento',
      ],
      nota: 'O plano é individual. Nem todo caso precisa de muitos procedimentos; a proposta é tratar apenas o que realmente faz sentido para a necessidade do paciente.',
    },
    {
      slug: 'facetas-e-proteses',
      numero: '03',
      nome: 'Facetas e próteses dentárias',
      icone: 'Gem',
      home: true,
      resumo:
        'Soluções para transformar a estética do sorriso e reconstruir dentes comprometidos, unindo naturalidade, função e planejamento individualizado.',
      oQueE:
        'Esta área reúne tratamentos estéticos e reabilitadores para modificar forma, cor e proporção dos dentes ou reconstruir e substituir estruturas comprometidas. O planejamento define se o caso pede facetas, laminados cerâmicos, coroas, próteses ou uma combinação de recursos.',
      beneficio:
        'Permite melhorar a estética do sorriso e recuperar função e segurança ao mastigar, sempre buscando naturalidade e preservação da estrutura dentária quando possível.',
      indicado:
        'Para quem deseja melhorar forma, proporção ou cor dos dentes, corrigir pequenas fraturas e desgastes, ou precisa reconstruir/substituir dentes comprometidos ou ausentes.',
      servicos: [
        'Facetas em resina composta',
        'Laminados cerâmicos / lentes de contato dental',
        'Planejamento estético do sorriso',
        'Coroas',
        'Prótese protocolo',
        'Pinos intrarradiculares',
        'Integração com clareamento ou ortodontia quando indicado',
      ],
      nota: 'A escolha do material e da técnica depende da estrutura dentária, gengiva, mordida e objetivos do paciente. Em facetas, "sem desgaste" não é uma regra para todos os casos.',
    },
    {
      slug: 'periodontia',
      numero: '04',
      nome: 'Periodontia',
      icone: 'ShieldCheck',
      resumo: 'É a área responsável pela saúde da gengiva e dos tecidos que sustentam os dentes e os implantes.',
      oQueE: 'É a área responsável pela saúde da gengiva e dos tecidos que sustentam os dentes e os implantes.',
      beneficio:
        'Ajuda a controlar inflamações, sangramento e perda de suporte, criando uma base saudável para manter dentes, implantes e reabilitações.',
      indicado:
        'Para quem apresenta sangramento gengival, retração, mau hálito persistente, mobilidade, perda óssea ou alterações ao redor de implantes.',
      servicos: ['Gengivite', 'Periodontite', 'Perda óssea', 'Doenças peri-implantares', 'Gengivoplastia', 'Enxertos gengivais'],
      nota: 'Sangramento recorrente não deve ser considerado normal. O tratamento depende do diagnóstico periodontal e do risco individual.',
    },
    {
      slug: 'harmonizacao-orofacial',
      numero: '05',
      nome: 'Harmonização orofacial',
      icone: 'Sparkles',
      resumo:
        'Conjunto de procedimentos que atuam nos tecidos da face para suavizar sinais do envelhecimento, melhorar proporções e valorizar características individuais.',
      oQueE:
        'Conjunto de procedimentos que atuam nos tecidos da face para suavizar sinais do envelhecimento, melhorar proporções e valorizar características individuais.',
      beneficio:
        'Promove resultados graduais e personalizados, com foco em equilíbrio, naturalidade e preservação da identidade facial.',
      indicado:
        'Para quem deseja cuidar do envelhecimento facial, tratar linhas de expressão, perda de volume, flacidez ou melhorar contornos de forma planejada.',
      servicos: [
        'Toxina botulínica (Botox)',
        'Preenchimento com ácido hialurônico',
        'Bioestimuladores de colágeno',
        'HIPRO - ultrassom micro e macrofocado',
        'Gerenciamento do envelhecimento',
      ],
      nota: 'A indicação e a combinação dos procedimentos são individualizadas, com foco em naturalidade.',
    },
    {
      slug: 'dtm-e-dor-orofacial',
      numero: '06',
      nome: 'DTM e dor orofacial',
      icone: 'Activity',
      resumo:
        'É o cuidado de sintomas que podem envolver a mandíbula, os músculos da mastigação e as articulações, como dor, estalos, tensão ou limitação de movimento.',
      oQueE:
        'É o cuidado de sintomas que podem envolver a mandíbula, os músculos da mastigação e as articulações, como dor, estalos, tensão ou limitação de movimento.',
      beneficio:
        'Ajuda a aliviar dor e desconforto e a recuperar mais conforto para mastigar, falar e movimentar a mandíbula.',
      indicado:
        'Para quem sente dor na mandíbula ou no rosto, estalos, travamentos, tensão muscular, dificuldade para abrir a boca ou sintomas relacionados à função mandibular.',
      servicos: [
        'Viscossuplementação da ATM, quando indicada',
        'Placa oclusal (placa de bruxismo)',
        'Tratamento de dor, estalos e limitações de movimento da mandíbula',
        'Sono e apneia - manejo odontológico quando indicado, com integração médica quando necessária',
      ],
      nota: 'DTM pode ter diferentes causas. O tratamento é definido após diagnóstico individual.',
    },
    {
      slug: 'cirurgia-bucomaxilofacial',
      numero: '07',
      nome: 'Cirurgia e Traumatologia Bucomaxilofacial',
      icone: 'Bone',
      resumo:
        'Especialidade cirúrgica que diagnostica e trata alterações dos dentes, ossos e estruturas da face e da boca.',
      oQueE:
        'Especialidade cirúrgica que diagnostica e trata alterações dos dentes, ossos e estruturas da face e da boca.',
      beneficio:
        'Permite conduzir casos cirúrgicos complexos com planejamento especializado, segurança e integração com outras áreas quando necessário.',
      indicado:
        'Para quem precisa remover sisos ou dentes inclusos, investigar lesões bucais ou tratar alterações ósseas e deformidades dos maxilares.',
      servicos: [
        'Cirurgia ortognática',
        'Exodontia de sisos e dentes inclusos',
        'Biópsia de lesões bucais',
        'Remoção de cistos, tumores e lesões benignas da cavidade oral',
      ],
      nota: 'A indicação cirúrgica depende do diagnóstico, exames e complexidade do caso.',
    },
    {
      slug: 'ortodontia',
      numero: '08',
      nome: 'Ortodontia',
      icone: 'Ruler',
      resumo: 'Área responsável pelo posicionamento dos dentes e pelo desenvolvimento e equilíbrio da mordida.',
      oQueE: 'Área responsável pelo posicionamento dos dentes e pelo desenvolvimento e equilíbrio da mordida.',
      beneficio:
        'Busca melhorar função, organização dos dentes e estética do sorriso, com planejamento adequado à idade e à necessidade de cada paciente.',
      indicado:
        'Para crianças, adolescentes e adultos com dentes desalinhados, espaços, apinhamento ou alterações de mordida.',
      servicos: ['Aparelhos ortopédicos', 'Alinhadores transparentes', 'Aparelho fixo', 'Contenções ortodônticas'],
      nota: 'O tipo de aparelho é escolhido após diagnóstico ortodôntico e planejamento individual.',
    },
    {
      slug: 'endodontia',
      numero: '09',
      nome: 'Endodontia',
      icone: 'Stethoscope',
      resumo: 'A endodontia trata a parte interna do dente quando a polpa sofre inflamação, infecção ou lesão.',
      oQueE: 'A endodontia trata a parte interna do dente quando a polpa sofre inflamação, infecção ou lesão.',
      beneficio:
        'Ajuda a controlar dor e infecção e pode permitir a preservação do dente, evitando sua remoção quando há indicação para mantê-lo.',
      indicado:
        'Para quem apresenta dor intensa ou persistente, sensibilidade prolongada, infecção, abscesso ou dentes com comprometimento interno identificado em consulta.',
      servicos: [
        'Tratamento de canal',
        'Retratamento endodôntico quando indicado',
        'Controle de infecções de origem endodôntica',
        'Planejamento restaurador após o tratamento de canal',
      ],
      nota: 'A necessidade de tratamento de canal é definida após exame clínico e, quando necessário, exames de imagem.',
    },
    {
      slug: 'clinica-geral',
      numero: '10',
      nome: 'Clínica geral',
      icone: 'Smile',
      resumo:
        'Reúne cuidados preventivos e restauradores que ajudam a acompanhar a saúde bucal e tratar alterações em fases iniciais.',
      oQueE:
        'Reúne cuidados preventivos e restauradores que ajudam a acompanhar a saúde bucal e tratar alterações em fases iniciais.',
      beneficio:
        'Favorece prevenção, diagnóstico precoce e manutenção da saúde dos dentes e gengiva ao longo do tempo.',
      indicado:
        'Para consultas de rotina, prevenção, limpeza, pequenas restaurações, clareamento ou acompanhamento periódico.',
      servicos: [
        'Prevenção em saúde bucal',
        'Profilaxia (limpeza)',
        'Restaurações',
        'Clareamento',
        'Check-up odontológico digital',
      ],
      nota: 'A frequência das consultas e dos cuidados preventivos é definida conforme o risco e as necessidades de cada paciente.',
    },
  ],
} as const satisfies { lista: readonly Tratamento[]; [k: string]: unknown };

export type SlugTratamento = (typeof tratamentos.lista)[number]['slug'];

export const tratamentoPorSlug = (slug: string) => tratamentos.lista.find((t) => t.slug === slug);

/** Mensagem de WhatsApp de uma origem, incluindo `tratamento-<slug>`. */
export function mensagemWhatsApp(origem: OrigemWhatsApp): string {
  if (origem in whatsappMensagens) return whatsappMensagens[origem as keyof typeof whatsappMensagens];
  if (origem.startsWith('tratamento-')) {
    const t = tratamentoPorSlug(origem.slice('tratamento-'.length));
    if (t) return `${OLA} gostaria de agendar uma consulta sobre ${t.nome.toLowerCase()}.`;
  }
  return whatsappMensagens.hero;
}

/** Mensagem do CTA final de um artigo (montada no servidor, com o titulo). */
export const mensagemArtigo = (titulo: string) =>
  `${OLA} li o conteúdo "${titulo}" e gostaria de agendar uma consulta.`;

/**
 * "Por onde voce quer comecar?" — navegacao por queixa, separada do Metodo.
 * Card inteiro e link para o tratamento mais proximo; nenhum WhatsApp nos
 * cards; um unico CTA abaixo (3.6). Textos dos cards mantidos.
 */
export const cardapio = {
  tag: 'Para você',
  h2: 'Por onde você quer começar?',
  sub: 'Conte o que está sentindo. A gente mostra o caminho — e o planejamento começa na consulta.',
  link: 'Entenda esse cuidado',
  pergunta: 'Não sabe por onde começar?',
  cta: CTA_PRINCIPAL,
  // `icone`: arquivo em /public/icones/<nome>.svg (originais em assets/icones/).
  itens: [
    { texto: 'Quero comer com segurança', leva: 'Implantodontia digital', href: '/tratamentos/#implantodontia-digital', icone: 'mao-dente' },
    { texto: 'Perdi um ou mais dentes', leva: 'Implantodontia digital', href: '/tratamentos/#implantodontia-digital', icone: 'implante' },
    { texto: 'Minha prótese incomoda', leva: 'Facetas e próteses dentárias', href: '/tratamentos/#facetas-e-proteses', icone: 'instrumentos' },
    { texto: 'Quero melhorar meu sorriso', leva: 'Facetas e próteses dentárias', href: '/tratamentos/#facetas-e-proteses', icone: 'dente-brilho' },
    { texto: 'Tenho vários problemas ao mesmo tempo', leva: 'Reabilitação oral completa', href: '/tratamentos/#reabilitacao-oral-completa', icone: 'caries-dentarias' },
    { texto: 'Sinto dor ou estalos na mandíbula', leva: 'DTM e dor orofacial', href: '/tratamentos/#dtm-e-dor-orofacial', icone: 'dente-localizacao' },
    { texto: 'Minha gengiva sangra', leva: 'Periodontia', href: '/tratamentos/#periodontia', icone: 'cuidado-dental' },
    { texto: 'Tenho medo de dentista', leva: 'Sedação', href: '/#sedacao', icone: 'cadeira-de-dentista' },
  ],
} as const;

/**
 * Sedacao — so sedacao (3.8). Sem promessa de sono completo.
 * [PENDENTE: foto real para substituir a generica — o arquivo "Implante
 * dentario com precisao" saiu por ser imagem generica. Original em
 * assets/fotos-originais/sedacao-atendimento.jpg -> `npm run images`, e
 * trocar `pendente` para false.]
 */
export const sedacao = {
  tag: 'Sedação',
  h2: 'Mais conforto e segurança para quem sente medo ou ansiedade durante o tratamento.',
  modalidades: ['Sedação consciente com medicação oral', 'Sedação intravenosa acompanhada por anestesista'],
  texto:
    'Para pacientes com medo intenso, ansiedade ou dificuldade de enfrentar determinados procedimentos, a Lien oferece duas possibilidades de sedação, definidas em conjunto após a consulta e a análise de segurança. A modalidade adequada depende do procedimento, do histórico de saúde e das preferências do paciente.',
  cta: CTA_PRINCIPAL,
  foto: {
    src: '/img/sedacao-atendimento.webp',
    alt: 'Atendimento com sedação na Lien Reabilitação Oral',
    pendente: true,
  },
} as const;

/**
 * Experiencia Lien — jornada do paciente em 3 videos (3.9). Sob cada video,
 * so o titulo. [PENDENTE: os 3 videos — escaneamento com a Dra. Natalia;
 * detalhes (fones, massagem, aromaterapia, cafeteria, ambiente); conversa a
 * mesa, kit e abraco. MP4 + WebM + poster WebP em public/videos/.]
 * O capitulo 2 usa, por ora, o video institucional da recepcao (vertical,
 * sem audio) que antes ficava no Sobre (conflito C3).
 */
export const experiencia = {
  tag: 'Experiência Lien',
  h2: 'A experiência começa antes do tratamento.',
  texto:
    'Na Lien, tecnologia, conforto e acompanhamento fazem parte da mesma experiência de cuidado - da primeira conversa ao pós-tratamento.',
  capitulos: [
    {
      numero: '01',
      titulo: 'Tecnologia que aproxima',
      video: null,
    },
    {
      numero: '02',
      titulo: 'Cuidado em cada detalhe',
      video: {
        webm: '/videos/sobre-lien.webm',
        mp4: '/videos/sobre-lien.mp4',
        poster: '/videos/sobre-lien-poster.webp',
        vertical: true,
        descricao: 'Recepção da Lien, com o logo da clínica na parede',
      },
    },
    {
      numero: '03',
      titulo: 'Cuidado que continua',
      video: null,
    },
  ] as readonly {
    numero: string;
    titulo: string;
    video: null | { webm: string; mp4: string; poster: string; vertical: boolean; descricao: string };
  }[],
  pendente: '[Vídeo pendente]',
  regiao: 'Vídeos da experiência Lien',
  anterior: 'Vídeo anterior',
  proximo: 'Próximo vídeo',
  diferenciais:
    'Scanner intraoral · Fones com isolamento de ruído · Massagem · Aromaterapia · Cafeteria · Kit personalizado · Acompanhamento pós-procedimento.',
} as const;

type Membro = {
  nome: string;
  especialidade: string;
  frase: string;
  cro: string | null;
  foto: { src: string; alt: string; pendente?: boolean };
};

/**
 * Equipe — headline, texto e os 6 profissionais do alinhamento final (3.10),
 * literais, nesta ordem. Foto grande + nome + especialidade + 1 frase.
 * [PENDENTE: ensaio fotografico padronizado da equipe. As fotos atuais sao
 * reais, recortadas no mesmo quadrado por scripts/recortar-equipe.mjs.]
 * [PENDENTE: revisao etica/CRO da linha de especialidade da Dra. Natalia
 * ("Periodontia" — a credencial oficial e Aperfeicoamento) e do termo
 * "Especialista" nos demais cards (conflito C8).]
 */
export const equipe = {
  tag: 'Equipe',
  h2: 'Diferentes especialidades. Um só planejamento.',
  sub: 'Uma equipe multidisciplinar que trabalha de forma integrada para que cada etapa do tratamento seja conduzida com conhecimento, segurança e continuidade.',
  membros: [
    {
      nome: 'Dra. Natália Simões',
      especialidade: 'Reabilitação Oral | Implantodontia, Prótese e Periodontia',
      frase:
        'Fundadora e diretora clínica da Lien. Atua em reabilitações orais, implantes, próteses e cuidados periodontais, conduzindo o planejamento de forma integrada do início ao fim.',
      cro: 'CRO-MG 49.821',
      foto: {
        src: '/img/equipe-natalia-simoes.webp',
        alt: 'Dra. Natália Simões, fundadora e diretora clínica da Lien Reabilitação Oral em Belo Horizonte',
      },
    },
    {
      nome: 'Dra. Maria Emília Murta',
      especialidade: 'Endodontia',
      frase:
        'Especialista em tratamento de canal, com atuação voltada ao controle da dor, tratamento de infecções e preservação de dentes naturais.',
      cro: 'CRO-MG 36.401',
      foto: {
        src: '/img/equipe-maria-emilia.webp',
        alt: 'Dra. Maria Emília Murta, endodontista da Lien em Belo Horizonte',
      },
    },
    {
      nome: 'Dra. Isabela Guieiro',
      especialidade: 'Harmonização Orofacial',
      frase:
        'Especialista em Harmonização Orofacial e Ortodontia, com foco em resultados naturais, equilíbrio facial e integração entre estética e função.',
      cro: 'CRO-MG 42.820',
      foto: {
        src: '/img/equipe-isabela-guieiro.webp',
        alt: 'Dra. Isabela Guieiro, de harmonização orofacial e ortodontia, da Lien em Belo Horizonte',
      },
    },
    {
      nome: 'Dr. Alexander Pedrosa',
      especialidade: 'Cirurgia e Traumatologia Bucomaxilofacial',
      frase:
        'Cirurgião bucomaxilofacial, mestre e doutor, com experiência em cirurgias complexas, reconstrução facial e procedimentos de maior complexidade.',
      cro: 'CRO-MG 26.562',
      foto: {
        src: '/img/equipe-alexander-pedrosa.webp',
        alt: 'Dr. Alexander Pedrosa, cirurgião bucomaxilofacial da Lien em Belo Horizonte',
      },
    },
    {
      nome: 'Dra. Luiza Henriques',
      especialidade: 'Prótese Dentária | Dentística e Estética',
      frase:
        'Especialista em Prótese Dentária pela USP, com atuação em reabilitação oral e odontologia estética e restauradora, integrando função, naturalidade e planejamento digital.',
      // [PENDENTE: CRO da Dra. Luiza]
      cro: null,
      foto: {
        src: '/img/equipe-luiza-henriques.webp',
        alt: 'Dra. Luiza Henriques, de prótese dentária e dentística, da Lien em Belo Horizonte',
      },
    },
    {
      nome: 'Dra. Gabriela Ribeiro',
      especialidade: 'DTM e Dor Orofacial | Sono',
      frase:
        'Especialista em DTM e Dor Orofacial com ênfase em sono, com atuação baseada em evidências para investigar a origem da dor, recuperar função e melhorar a qualidade de vida.',
      cro: 'CRO-MG 65.103',
      foto: {
        src: '/img/equipe-gabriela-ribeiro.webp',
        alt: 'Dra. Gabriela Ribeiro, de DTM e dor orofacial, da Lien em Belo Horizonte',
      },
    },
  ],
} as const satisfies { membros: readonly Membro[]; [k: string]: unknown };

/**
 * Conteudos em Saude Bucal. Na home, so os 3 destaques (3.11), com o texto
 * literal do alinhamento; a biblioteca completa e /conteudos/, lida de
 * content/artigos/*.md (src/lib/artigos.ts).
 */
export const conteudos = {
  tag: 'Conteúdos',
  h2: 'Conteúdos em Saúde Bucal',
  lerConteudo: 'Ler conteúdo',
  verTodos: 'Ver todos os conteúdos',
  destaques: [
    {
      rotulo: 'Implante dentário',
      titulo: 'Quando é indicado - e quando pode exigir preparo antes',
      descricao:
        'Entenda em quais situações o implante pode ser uma opção e por que alguns casos precisam de etapas prévias de planejamento.',
      href: '/implante-dentario-belo-horizonte/',
    },
    {
      rotulo: 'Reabilitação oral completa',
      titulo: 'Quando ela pode ser necessária?',
      descricao:
        'Veja quando diferentes problemas precisam ser tratados de forma integrada para recuperar função, saúde e estética.',
      href: '/reabilitacao-oral-belo-horizonte/',
    },
    {
      rotulo: 'Gengiva que sangra',
      titulo: 'Quando é sinal de alerta?',
      descricao:
        'Saiba por que o sangramento recorrente não deve ser considerado normal e quando é importante investigar a saúde da gengiva.',
      href: '/sangramento-gengiva-belo-horizonte/',
    },
  ],
  pagina: {
    h1: 'Conteúdos em Saúde Bucal',
    title: 'Conteúdos em Saúde Bucal | Lien Reabilitação Oral',
    description:
      'Conteúdos sobre implantes, reabilitação oral, gengiva, estética do sorriso, DTM e prevenção, escritos pela equipe da Lien, em Belo Horizonte.',
    todas: 'Todas',
    filtro: 'Filtrar por categoria',
  },
  // Categorias do PDF. A distribuicao dos 14 artigos e sugestao (5.2).
  // [PENDENTE: validar a distribuicao com a clinica]
  categorias: [
    'Implantes e Reabilitação',
    'Gengiva e Periodontia',
    'Estética do sorriso',
    'DTM e dor',
    'Prevenção e saúde bucal',
  ],
  artigo: {
    inicio: 'Início',
    publicado: 'Publicado em',
    proximoPasso: 'Próximo passo',
    tratamentoRelacionado: 'Tratamento relacionado',
    relacionados: 'Leia também',
  },
} as const;

/**
 * FAQ — exatamente as 6 perguntas e respostas aprovadas (3.12). O schema
 * FAQPage e gerado deste mesmo objeto (src/data/schema.ts). Accordion simples,
 * tudo fechado, sem CTA nas respostas e um unico CTA no fim da secao.
 */
export const faq = {
  tag: 'Dúvidas',
  h2: 'Dúvidas frequentes',
  cta: CTA_PRINCIPAL,
  itens: [
    {
      pergunta: 'Como funciona a primeira consulta na Lien?',
      resposta:
        'Na Lien, a consulta começa à mesa, com tempo para ouvir você de verdade. Depois, unimos exame clínico, escaneamento, fotografias e exames quando indicados para enxergar sua saúde como um todo. Você não sai apenas com um diagnóstico, sai entendendo o que está acontecendo, o que precisa ser cuidado e qual caminho faz sentido para você.',
    },
    {
      pergunta: 'Tenho medo de dentista. Como funciona o atendimento?',
      resposta:
        'Se você tem medo de dentista, a experiência na Lien é pensada de outro jeito. Antes de qualquer procedimento, entendemos o que te deixa inseguro e adaptamos o atendimento a você. Fones com isolamento de ruído, massagem, aromaterapia, pausas e, quando indicado, sedação oral ou intravenosa com anestesista fazem parte desse cuidado. Aqui, conforto não é detalhe: faz parte do tratamento.',
    },
    {
      pergunta: 'Preciso saber qual tratamento preciso antes de agendar?',
      resposta:
        'Não. Você não precisa chegar à Lien com uma solução pronta, esse é justamente o papel da consulta. A partir da sua queixa, do exame e dos recursos de diagnóstico, organizamos o que realmente precisa de atenção e mostramos os caminhos possíveis. Aqui, o tratamento começa pelo entendimento, não pela pressa em indicar um procedimento.',
    },
    {
      pergunta: 'Vocês atendem convênio?',
      resposta:
        'A Lien trabalha exclusivamente com atendimento particular porque isso nos permite conduzir cada consulta com tempo, profundidade e liberdade de planejamento. Sem protocolos padronizados ou limitações de cobertura, conseguimos indicar o que realmente faz sentido para cada paciente e acompanhar o tratamento com o cuidado que faz parte da nossa proposta.',
    },
    {
      pergunta: 'Vocês atendem casos mais complexos ou que precisam de várias especialidades?',
      resposta:
        'Sim, e essa integração é uma das bases da Lien. Quando um caso envolve diferentes áreas, os profissionais trabalham a partir de um mesmo planejamento, em vez de cada especialidade cuidar de uma parte isoladamente. Para você, isso significa mais continuidade, clareza e um tratamento pensado como um todo.',
    },
    {
      pergunta: 'Onde fica a clínica?',
      resposta:
        'A Lien fica no bairro Cruzeiro, na região Centro-Sul de Belo Horizonte, em uma localização de fácil acesso. O endereço completo, mapa e orientações para chegada ficam disponíveis no rodapé do site e na confirmação do agendamento.',
    },
  ],
} as const;

export const ctaFinal = {
  h2: 'Seu tratamento começa com uma consulta cuidadosa.',
  texto:
    'Na primeira consulta, entendemos sua história, suas necessidades e construímos juntos o caminho do tratamento.',
  cta: CTA_PRINCIPAL,
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
