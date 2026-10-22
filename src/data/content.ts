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
  // Instagram da clinica (rodape, schema da clinica e llms.txt). O da Dra.
  // Natalia fica so no schema dela (Person), em instagramDra.
  instagram: { url: 'https://www.instagram.com/clinica_lien/', arroba: '@clinica_lien' },
  instagramDra: { url: 'https://www.instagram.com/dra.nataliasimoes', arroba: '@dra.nataliasimoes' },
  // [PENDENTE: confirmar se TikTok e Facebook aparecem — o briefing listou so o
  // Instagram no rodape]. Desligados ate la; o Facebook nao tem URL no briefing.
  tiktok: { url: 'https://www.tiktok.com/@clinicalien', arroba: '@clinicalien', exibir: false },
  // Obrigatorio por norma do CFO.
  responsavelTecnica: 'Dra. Natália Ferreira Simões',
  cro: 'CRO-MG 49.821',
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
  'cta-final': `${OLA} gostaria de agendar uma consulta.`,
  flutuante: `${OLA} gostaria de agendar uma consulta.`,
  rodape: `${OLA} gostaria de conversar sobre o atendimento. Podem me ajudar?`,
  comecar: `${OLA} não sei por onde começar. Gostaria de agendar uma consulta.`,
  // Mensagem do print aprovado (prompt "sedacao-lien", out/2026).
  sedacao: 'Olá! Gostaria de conversar sobre as opções de sedação da Lien.',
  duvidas: `${OLA} gostaria de agendar uma consulta.`,
} as const;

export type OrigemWhatsApp =
  | keyof typeof whatsappMensagens
  | `tratamento-${string}`
  | `artigo-${string}`;

/** Ancoras e paginas do menu. Ancoras com `/` na frente: funcionam de qualquer pagina. */
export const navegacao = [
  { label: 'Sobre', href: '/#sobre' },
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
  // Copy sugerida pela Dra. Natalia Simoes (set/2026). Quebras de linha e
  // destaque em magenta ("excelência clínica,") do print da clinica (out/2026);
  // as quebras valem a partir do layout lado a lado (no celular, texto corrido).
  h1: 'Reabilitação oral com excelência clínica, tecnologia e cuidado em cada detalhe.',
  h1Linhas: [
    [{ texto: 'Reabilitação oral' }],
    [{ texto: 'com ' }, { texto: 'excelência clínica,', destaque: true }],
    [{ texto: 'tecnologia e cuidado' }],
    [{ texto: 'em cada detalhe.' }],
  ],
  // Paragrafo unico do print: o apoio ("Se você tem medo...") em tinta escura.
  textoLinhas: [
    [{ texto: 'Planejamento personalizado e uma experiência pensada' }],
    [{ texto: 'para quem valoriza segurança, conforto e previsibilidade' }],
    [{ texto: 'em cada etapa. ' }, { texto: 'Se você tem medo de dentista,', destaque: true }],
    [{ texto: 'talvez ainda não tenha conhecido a Lien.', destaque: true }],
  ],
  cta: CTA_PRINCIPAL,
  /**
   * Foto da hero. Variantes geradas por `npm run hero` (scripts/optimize-hero.mjs)
   * a partir do original em assets/hero/. O recorte mobile e vertical (3:4).
   */
  imagem: {
    base: '/img/hero-lien',
    // Foto "Retrato profissional na clínica iluminada" (assets/hero/, 1672x941; out/2026).
    larguras: [1024, 1440, 1672],
    mobile: '/img/hero-lien-mobile-900',
    width: 1672,
    height: 941,
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
  // Textos do print da clinica (out/2026).
  tag: 'Casos reais & transformações',
  h2: 'Resultados que contam histórias',
  apoio: 'Cada sorriso reabilitado devolve autoestima, função mastigatória e liberdade para sorrir sem receios.',
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
 * "Quem vive a Lien, conta." — prova emocional, depois dos Resultados. Por
 * decisao da clinica (prompt "depoimentos-lien", out/2026), 3 avaliacoes
 * reais do Google em cards no lugar do carrossel de videos do alinhamento.
 * Os textos ficam em src/content/testimonials.ts.
 */
export const depoimentos = {
  tag: 'Depoimentos reais',
  h2: 'Quem vive a Lien, conta.',
  sub: 'Veja o que nossos pacientes dizem no Google sobre a experiência de cuidado.',
  // "Nota", e nao "Avaliacao": o verificador bloqueia a palavra no HTML.
  estrelas: 'Nota 5 de 5 estrelas',
  trilho: 'Depoimentos de pacientes',
  fonte: 'Google Reviews',
} as const;

/**
 * Sobre — layout do Print 1 (prompt "sobre-metodo-lien", out/2026) com o
 * texto final do Alinhamento (3.4), literal. Negrito em "Lien" (abertura) e
 * "Dra. Natalia Simoes" (1o paragrafo de apoio): trechos {texto, forte}.
 */
export const sobre = {
  tag: 'Nossa essência',
  h2: 'Lien quer dizer vínculo.',
  tituloPartes: ['Lien quer dizer ', 'vínculo', '.'],
  // Textos do print da clinica (out/2026): abertura + 1 paragrafo, sem quote.
  abertura: [
    { texto: 'Derivado do francês, ' },
    { texto: 'Lien', forte: true },
    {
      texto: ' significa laço, ligação e vínculo. Fundada em 2024 pela ',
    },
    { texto: 'Dra. Natália Simões', forte: true },
    {
      texto:
        ' após anos de sólida experiência clínica, a clínica nasceu com o propósito de transformar a relação das pessoas com a odontologia.',
    },
  ],
  apoio: [
    [
      {
        texto:
          'Aqui, acreditamos que nenhum tratamento de excelência acontece com pressa. Dedicamos tempo genuíno à escuta, ao diagnóstico aprofundado e a um planejamento rigoroso. Cada paciente é único, e cada sorriso construído é o reflexo de uma relação de confiança mútua e duradoura.',
      },
    ],
  ] as readonly (readonly { texto: string; forte?: boolean }[])[],
  /**
   * Mini-destaques do print, mantidos por decisao da clinica, sem caixas.
   * O print traz "100%" no 1o: a palavra e vocabulario proibido no projeto,
   * entao o titulo ficou "Personalizado" (decisao do usuario, out/2026).
   * Icones oficiais da pasta NOSSA ESSENCIA: /icones-lien/essencia-<icone>.webp.
   */
  destaques: [
    { icone: 'personalizado', titulo: 'Personalizado', legenda: 'para cada caso' },
    { icone: 'localizacao', titulo: 'Cruzeiro, BH', legenda: 'Localização privilegiada' },
  ],
  // Carrossel de fotos do consultorio (assets/fotos/consultorio/, out/2026;
  // originais copiados para assets/fotos-originais/consultorio-*.png).
  // `foco`: object-position no recorte (a 1a foto, horizontal, vai inteira).
  fotos: [
    {
      base: 'consultorio-vista',
      width: 1672,
      height: 941,
      foco: '42% 50%',
      alt: 'Consultório da Lien Reabilitação Oral, com cadeira odontológica e vista para Belo Horizonte ao pôr do sol',
    },
    {
      base: 'consultorio-recepcao',
      width: 1024,
      height: 1536,
      foco: '50% 50%',
      alt: 'Recepção da Lien Reabilitação Oral, com poltronas rosadas e o logo da clínica na parede',
    },
    {
      base: 'consultorio-atendimento',
      width: 1024,
      height: 1536,
      foco: '50% 50%',
      alt: 'Sala de atendimento da Lien, com mesa de conversa e cadeira odontológica ao fundo',
    },
  ],
  carrossel: {
    rotulo: 'Fotos do consultório',
    anterior: 'Foto anterior',
    proxima: 'Próxima foto',
    irPara: 'Ir para a foto',
    pausar: 'Pausar passagem automática',
    retomar: 'Retomar passagem automática',
  },
} as const;

/** Metodo Lien — layout do Print 2 com o texto do Alinhamento (3.5). Literal. */
export const metodo = {
  tag: 'Previsibilidade & Segurança',
  // Textos do print da clinica (out/2026). "garantir" (vocabulario proibido)
  // virou "assegurar", por decisao do usuario.
  h2: 'O Método Lien em 4 Etapas',
  intro: 'Um processo estruturado para assegurar que você compreenda cada passo do seu tratamento, sem surpresas.',
  etapas: [
    {
      numero: '1',
      titulo: 'Escuta',
      texto: 'Ouvimos suas queixas, desejos, entendemos sua história, suas necessidades, seus receios e o que você espera do tratamento.',
    },
    {
      numero: '2',
      titulo: 'Diagnóstico',
      texto: 'Utilizamos tecnologia digital avançada e exames precisos para compreender o caso por completo.',
    },
    {
      numero: '3',
      titulo: 'Planejamento',
      // [PENDENTE: o print corta a frase em "previsibilidade do"; completei com "tratamento".]
      texto:
        'Definimos o melhor caminho para a sua necessidade real, explicando possibilidades, etapas, prioridades e previsibilidade do tratamento.',
    },
    {
      numero: '4',
      titulo: 'Acompanhamento',
      texto: 'Suporte contínuo, manutenções preventivas e cuidado de longo prazo para assegurar a longevidade do seu tratamento.',
    },
  ],
} as const;

type Tratamento = {
  slug: string;
  numero: string;
  nome: string;
  icone: string;
  /**
   * Frase do card curto. Nos 3 da home, a frase aprovada (alinhamento 3.7);
   * nos outros 7, o texto curto do print de Tratamentos (out/2026, com
   * "osdentes" corrigido). [PENDENTE: a clinica confirmar os 7.]
   */
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
  // Cabecalho da home: textos do print da clinica (out/2026).
  tag: 'Excelência odontológica',
  h2: 'Tratamentos e Especialidades',
  sub: 'Soluções completas integradas em um só lugar, executadas com rigor científico e tecnologia de ponta.',
  saibaMais: 'Saiba mais',
  fechar: 'Fechar',
  inicio: 'Início',
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
      nome: 'Implantodontia Digital',
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
      nome: 'Reabilitação Oral Completa',
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
      resumo: 'Cuidado com a gengiva e os tecidos que sustentam os dentes, prevenindo e tratando inflamações e perda de suporte.',
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
      nome: 'Harmonização Orofacial',
      icone: 'Sparkles',
      resumo: 'Procedimentos planejados para valorizar os traços do rosto e do sorriso, preservando naturalidade e equilíbrio.',
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
      resumo: 'Tratamento para dores, estalos, bruxismo, travamentos e desconfortos na mandíbula e na região da face.',
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
      resumo: 'Cirurgias e tratamentos especializados para sisos, dentes inclusos, alterações ósseas e casos mais complexos.',
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
      resumo: 'Alinhamento dos dentes e correção da mordida com soluções planejadas para cada fase e necessidade.',
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
      resumo: 'Tratamento de canal para aliviar a dor, controlar infecções e preservar dentes que ainda podem ser mantidos.',
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
      resumo: 'Prevenção, diagnóstico e cuidados essenciais para manter sua saúde bucal em dia.',
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
 * "Por onde voce quer comecar?" — caixa do Print 2, logo abaixo do Metodo
 * (prompt "sobre-metodo-lien", out/2026): 4 cards com os titulos do print, o
 * card inteiro e o link "Entenda esse cuidado ->", nenhum WhatsApp nos cards
 * e um unico CTA abaixo (exigencia do alinhamento).
 */
export const cardapio = {
  tag: 'Orientação personalizada',
  h2: 'Por onde você quer começar?',
  sub: 'Selecione a sua principal necessidade para entendermos como podemos ajudar:',
  link: 'conhecer tratamento',
  pergunta: 'Não sabe por onde começar?',
  cta: CTA_PRINCIPAL,
  // `icone`: /public/icones-lien/comecar-<nome>.webp (originais em assets/ICONES_LIEN_SITE/ORIENTAÇAO-PERSONALIZADA/).
  itens: [
    { texto: 'Minha prótese incomoda ou está antiga', href: '/tratamentos/#facetas-e-proteses', icone: 'protese' },
    { texto: 'Sinto dor ou estalos na mandíbula (DTM)', href: '/tratamentos/#dtm-e-dor-orofacial', icone: 'mandibula' },
    { texto: 'Quero melhorar meu sorriso (Estética)', href: '/tratamentos/#facetas-e-proteses', icone: 'sorriso' },
    { texto: 'Tenho medo ou ansiedade de dentista', href: '/#sedacao', icone: 'medo' },
  ],
} as const;

/**
 * Sedacao — layout e copy LITERAIS do print aprovado (prompt "sedacao-lien",
 * out/2026), por decisao da clinica; substitui o titulo, o texto e o CTA do
 * Alinhamento Final nesta secao. So sedacao, sem foto. As quebras de linha do
 * print (`linhas`) so valem no desktop.
 * [PENDENTE: revisao etica/CRO de "relaxamento absoluto", "total seguranca",
 * "profundo relaxamento", "pre-consulta" e "ideal para..." — tabela no
 * RELATORIO-ALTERACOES.md. O texto NAO foi alterado.]
 */
export const sedacao = {
  tag: 'Acolhimento avançado',
  h2: 'Mais tranquilidade quando você precisa.',
  h2Linhas: ['Mais tranquilidade', 'quando você precisa.'],
  texto:
    'O medo de dentista e a ansiedade não devem ser barreiras para a sua saúde e qualidade de vida. Na Lien, oferecemos protocolos seguros de controle da dor e relaxamento absoluto para que você realize seus tratamentos com serenidade.',
  modalidades: [
    {
      icone: 'pilula', // /icones-lien/sedacao-pilula.webp
      linhas: ['Sedação', 'Consciente Oral'],
      texto:
        'Medicação pré-consulta administrada com total segurança para induzir um estado de profundo relaxamento e bem\u2060-\u2060estar.',
    },
    {
      icone: 'anestesista', // /icones-lien/sedacao-anestesista.webp
      linhas: ['Sedação Intravenosa', 'com Anestesista'],
      texto:
        'Acompanhamento de médico anestesista durante todo o procedimento, ideal para cirurgias complexas e pacientes altamente ansiosos.',
    },
  ],
  conversa: {
    linhas: ['Converse com', 'nossa equipe'],
    textoLinhas: ['Descubra qual protocolo de sedação', 'é ideal para o seu perfil e tranquilidade.'],
    cta: 'Quero conversar sobre isso',
    // Complemento so para leitor de tela: o nome acessivel continua
    // comecando pelo texto visivel (WCAG 2.5.3, "label in name").
    ctaLeitor: ' com a equipe da Lien pelo WhatsApp sobre sedação',
  },
} as const;

/**
 * Experiencia Lien — layout e copy do print aprovado (prompt
 * "experiencia-lien", out/2026), por decisao da clinica; substitui o
 * cabecalho, os capitulos e a faixa de diferenciais do Alinhamento Final.
 * Player grande com texto sobreposto e barra de 3 abas.
 *
 * Videos (MP4 H.264 + WebM 1080p + poster WebP em public/videos/): enquanto
 * `video` for null, o capitulo mostra o poster neutro e o texto, sem play.
 * Capitulo 01: Short do YouTube enviado pela clinica (out/2026).
 * Capitulo 02: "video acolhedor.mp4" e capitulo 03: "Lien experiencia.mp4",
 * enviados pela clinica (out/2026). Os tres capitulos tem video.
 * [PENDENTE: a clinica validar os textos dos capitulos 02 e 03 (SUGESTAO do
 * prompt) e "ultraprecisa" no 01 (revisao CRO).]
 */
type Video =
  /** Arquivo proprio em public/videos/. `vertical` (9:16): centralizado sobre
   *  o `fundo` desfocado, como o Short do capitulo 01. */
  | { tipo: 'arquivo'; mp4: string; webm: string; poster: string; vtt?: string; vertical?: boolean; fundo?: string; descricao: string }
  /**
   * Video do YouTube (Short vertical). So carrega o embed (youtube-nocookie)
   * no clique, como o mapa do rodape: antes disso nenhum pedido vai ao Google
   * (LGPD). O poster e uma copia local da miniatura do YouTube (original em
   * assets/videos-youtube/, convertida a mao para public/img/).
   */
  | { tipo: 'youtube'; id: string; titulo: string; poster: string; posterAvif: string; fundo: string };

export const experiencia = {
  tag: 'Jornada & inovação',
  h2: 'Experiência Lien',
  subLinhas: [
    'Na Lien, tecnologia, conforto e acompanhamento trabalham juntos',
    'para tornar cada etapa mais clara, tranquila e previsível.',
  ],
  capitulos: [
    {
      numero: '01',
      aba: 'Scanner intraoral',
      titulo: 'Scanner intraoral',
      linhas: ['Adeus aos moldes tradicionais desconfortáveis.', 'Captura digital rápida e ultraprecisa da sua arcada.'],
      // "Scanner feito (1).mp4" (assets/videos/, 16,7 s, 1080x1920 60 fps H.264
      // com audio; out/2026, no lugar do Short do YouTube), convertido para
      // 720x1280 30 fps H.264/AAC (3,2 MB) e VP9/Opus (3,4 MB); poster no quadro
      // de 13,5 s (a dentista explica o modelo 3D ao paciente — os quadros com a
      // tela de perto mostram o nome do paciente no software).
      video: {
        tipo: 'arquivo',
        mp4: '/videos/experiencia-scanner.mp4',
        webm: '/videos/experiencia-scanner.webm',
        poster: '/videos/experiencia-scanner-poster.webp',
        fundo: '/videos/experiencia-scanner-fundo.webp',
        vertical: true,
        descricao: 'O scanner intraoral captura a arcada e a dentista da Lien mostra o modelo 3D dos dentes ao paciente',
      } as Video | null,
    },
    {
      numero: '02',
      aba: 'Recursos de conforto',
      titulo: 'Recursos de conforto',
      linhas: ['Fones com isolamento de ruído, massagem e aromaterapia.', 'Cada detalhe pensado para você relaxar.'],
      // "Lien Experiencia (1).mp4" (assets/videos/, 17,1 s, 1080x1920 H.264 com
      // audio; out/2026, no lugar do "video acolhedor"), convertido para 720x1280
      // H.264/AAC (3,6 MB) e VP9/Opus (2,8 MB); poster no quadro de 10,5 s (fones
      // na paciente).
      video: {
        tipo: 'arquivo',
        mp4: '/videos/experiencia-conforto.mp4',
        webm: '/videos/experiencia-conforto.webm',
        poster: '/videos/experiencia-conforto-poster.webp',
        fundo: '/videos/experiencia-conforto-fundo.webp',
        vertical: true,
        descricao: 'Recepção da Lien e a dentista colocando fones com isolamento de ruído na paciente antes do atendimento',
      } as Video | null,
    },
    {
      numero: '03',
      aba: 'Orientação e acompanhamento',
      titulo: 'Orientação e acompanhamento',
      linhas: ['Conversa à mesa, kit personalizado e acompanhamento pós-procedimento.', 'O cuidado continua depois da cadeira.'],
      // "Acompanhamento.mp4" (assets/videos/, 10,6 s, 1080x1920 H.264 com audio;
      // out/2026), convertido para 720x1280 H.264/AAC (2,0 MB) e VP9/Opus
      // (1,6 MB); poster no quadro de 7,5 s (a dentista com o kit da Lien a mesa).
      video: {
        tipo: 'arquivo',
        mp4: '/videos/experiencia-acompanhamento.mp4',
        webm: '/videos/experiencia-acompanhamento.webm',
        poster: '/videos/experiencia-acompanhamento-poster.webp',
        fundo: '/videos/experiencia-acompanhamento-fundo.webp',
        vertical: true,
        descricao: 'Conversa à mesa com a dentista, orientações no tablet e entrega do kit da Lien à paciente',
      } as Video | null,
    },
  ],
  abas: 'Capítulos da Experiência Lien',
  reproduzir: 'Reproduzir vídeo',
} as const;

type Membro = {
  nome: string;
  especialidade: string;
  frase: string;
  cro: string | null;
  /** Selo sobre a foto (print da clinica, out/2026). */
  selo?: string;
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
  // Textos e selos do print da clinica (out/2026) para Natalia, Alexander,
  // Gabriela e Luiza, nesta ordem; Maria Emilia e Isabela mantidas (decisao do
  // usuario) com os textos anteriores.
  tag: 'Corpo clínico',
  h2: 'Diferentes especialidades. Um só planejamento.',
  h2Linhas: ['Diferentes especialidades.', 'Um só planejamento.'],
  sub: 'Especialistas renomados trabalhando em perfeita sinergia para cuidar integralmente do seu sorriso.',
  membros: [
    {
      nome: 'Dra. Natália Simões',
      especialidade: 'Reabilitação Oral & Estética',
      frase:
        'Fundadora da Lien em 2024. Especialista dedicada a transformar sorrisos com planejamento integrado e foco absoluto no acolhimento humano.',
      selo: 'Fundadora',
      cro: 'CRO-MG 49.821',
      foto: {
        src: '/img/equipe-natalia-simoes.webp',
        alt: 'Dra. Natália Simões, fundadora e diretora clínica da Lien Reabilitação Oral em Belo Horizonte',
      },
    },
    {
      nome: 'Dr. Alexander Pedrosa',
      especialidade: 'Cirurgião Bucomaxilofacial',
      frase:
        'Mestre e Doutor em Cirurgia. Especialista em cirurgias avançadas, implantes e casos complexos com total segurança cirúrgica.',
      selo: 'Mestre & Doutor',
      cro: 'CRO-MG 26.562',
      foto: {
        src: '/img/equipe-alexander-pedrosa.webp',
        alt: 'Dr. Alexander Pedrosa, cirurgião bucomaxilofacial da Lien em Belo Horizonte',
      },
    },
    {
      nome: 'Dra. Gabriela Ribeiro',
      especialidade: 'Dor Orofacial & DTM',
      frase:
        'Focada no diagnóstico e alívio de dores na face, bruxismo e disfunções da articulação temporomandibular (DTM).',
      selo: 'Especialista',
      cro: 'CRO-MG 65.103',
      foto: {
        src: '/img/equipe-gabriela-ribeiro.webp',
        alt: 'Dra. Gabriela Ribeiro, de DTM e dor orofacial, da Lien em Belo Horizonte',
      },
    },
    {
      nome: 'Dra. Luiza Henriques',
      especialidade: 'Ortodontia & Alinhadores',
      frase:
        'Especialista em alinhadores estéticos e ortodontia avançada para alinhamento e integração com a reabilitação oral.',
      selo: 'Especialista',
      // [PENDENTE: CRO da Dra. Luiza]
      cro: null,
      foto: {
        src: '/img/equipe-luiza-henriques.webp',
        alt: 'Dra. Luiza Henriques, de ortodontia e alinhadores, da Lien em Belo Horizonte',
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
  ],
} as const satisfies { membros: readonly Membro[]; [k: string]: unknown };

/**
 * Conteudos em Saude Bucal. Na home, so os 3 destaques (3.11), com o texto
 * literal do alinhamento; a biblioteca completa e /conteudos/, lida de
 * content/artigos/*.md (src/lib/artigos.ts).
 */
export const conteudos = {
  // Cabecalho da home: print da clinica (out/2026). Os 3 cards seguem com
  // artigos reais (decisao do usuario: os titulos do print nao existem).
  tag: 'Hub editorial',
  h2: 'Conteúdos em Saúde Bucal',
  sub: 'Artigos e orientações elaboradas por nossos especialistas para esclarecer suas principais dúvidas.',
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
  // Print da clinica (out/2026): 5 perguntas, com as respostas aprovadas.
  // Saiu "Preciso saber qual tratamento preciso antes de agendar?".
  tag: 'Esclarecimentos',
  h2: 'Dúvidas Frequentes',
  sub: 'Respostas claras para as principais barreiras e questionamentos dos nossos pacientes.',
  cta: CTA_PRINCIPAL,
  itens: [
    {
      pergunta: 'Como funciona a primeira consulta na Lien?',
      resposta:
        'Na Lien, a consulta começa à mesa, com tempo para ouvir você de verdade. Depois, unimos exame clínico, escaneamento, fotografias e exames quando indicados para enxergar sua saúde como um todo. Você não sai apenas com um diagnóstico, sai entendendo o que está acontecendo, o que precisa ser cuidado e qual caminho faz sentido para você.',
    },
    {
      pergunta: 'A clínica atende convênios odontológicos?',
      resposta:
        'A Lien trabalha exclusivamente com atendimento particular porque isso nos permite conduzir cada consulta com tempo, profundidade e liberdade de planejamento. Sem protocolos padronizados ou limitações de cobertura, conseguimos indicar o que realmente faz sentido para cada paciente e acompanhar o tratamento com o cuidado que faz parte da nossa proposta.',
    },
    {
      pergunta: 'Tenho muito medo de dentista. Como vocês lidam com isso?',
      resposta:
        'Se você tem medo de dentista, a experiência na Lien é pensada de outro jeito. Antes de qualquer procedimento, entendemos o que te deixa inseguro e adaptamos o atendimento a você. Fones com isolamento de ruído, massagem, aromaterapia, pausas e, quando indicado, sedação oral ou intravenosa com anestesista fazem parte desse cuidado. Aqui, conforto não é detalhe: faz parte do tratamento.',
    },
    {
      pergunta: 'Vocês atendem casos mais complexos?',
      resposta:
        'Sim, e essa integração é uma das bases da Lien. Quando um caso envolve diferentes áreas, os profissionais trabalham a partir de um mesmo planejamento, em vez de cada especialidade cuidar de uma parte isoladamente. Para você, isso significa mais continuidade, clareza e um tratamento pensado como um todo.',
    },
    {
      pergunta: 'Onde a clínica está localizada em Belo Horizonte?',
      resposta:
        'A Lien fica no bairro Cruzeiro, na região Centro-Sul de Belo Horizonte, em uma localização de fácil acesso. O endereço completo, mapa e orientações para chegada ficam disponíveis no rodapé do site e na confirmação do agendamento.',
    },
  ],
} as const;

/**
 * CTA final — copy do print aprovado (prompt "cta-final-lien", out/2026), por
 * decisao da clinica. O texto do Alinhamento era "Na primeira consulta,
 * entendemos sua historia, suas necessidades e construimos juntos o caminho
 * do tratamento." (troca so do paragrafo, se preferirem).
 * [PENDENTE: revisao CRO de "o sorriso que voce merece".]
 */
export const ctaFinal = {
  h2: 'Seu tratamento começa com uma consulta cuidadosa.',
  h2Partes: ['Seu tratamento começa com', 'uma', 'consulta cuidadosa.'],
  textoLinhas: [
    'Dê o primeiro passo rumo ao sorriso que você merece com a excelência e o',
    'acolhimento da equipe Lien em Belo Horizonte.',
  ],
  cta: CTA_PRINCIPAL,
} as const;

export const rodape = {
  // Print da clinica (out/2026). Contato com os dados reais (decisao do usuario).
  texto: 'Odontologia que acolhe. Cuidado que inspira confiança. Atendimento particular de alto padrão em Belo Horizonte.',
  rotuloSecoes: 'Seções do site',
  rotuloTratamentos: 'Tratamentos',
  secoes: [
    { label: 'Sobre a Clínica', href: '/#sobre' },
    { label: 'Método Lien', href: '/#metodo' },
    { label: 'Tratamentos', href: '/tratamentos/' },
    { label: 'Experiência & Tecnologia', href: '/#experiencia' },
    { label: 'Corpo Clínico', href: '/#equipe' },
  ],
  tratamentos: [
    { label: 'Implantodontia Digital', href: '/tratamentos/#implantodontia-digital' },
    { label: 'Reabilitação Oral Completa', href: '/tratamentos/#reabilitacao-oral-completa' },
    { label: 'Lentes de Contato Dental', href: '/facetas-lentes-contato-dental-bh/' },
    { label: 'DTM e Dor Orofacial', href: '/tratamentos/#dtm-e-dor-orofacial' },
    { label: 'Sedação Consciente', href: '/#sedacao' },
  ],
  endereco: 'Edifício Asteca · Av. do Contorno, 5351 — Cruzeiro, Belo Horizonte/MG',
  // Um item por linha de site.horarios (mesma ordem).
  horarios: ['Seg., ter., qui. e sex. das 8h às 18h', 'Qua. das 9h às 20h'],
  copyright: '© 2026 Lien Reabilitação Oral. Todos os direitos reservados. Belo Horizonte - MG.',
  assinatura: 'Desenvolvido com excelência clínica e rigor ético.',
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
        'Não vendemos nem cedemos seus dados. A conversa pelo WhatsApp passa pela plataforma da Meta, sujeita à política de privacidade dela. O mapa do rodapé e o vídeo do YouTube da seção Experiência só são carregados se você clicar para vê-los; nesse momento, o Google pode coletar dados de navegação conforme a política dele.',
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
