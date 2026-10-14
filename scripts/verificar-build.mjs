/**
 * Verificacao automatizada do build estatico.
 *
 * Cobre a parte automatizavel do checklist da secao 9 do briefing
 * (prompt-claude-code-site-lien.md) e as protecoes herdadas da migracao.
 * Uso: npm run build && npm run verificar
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';

const URL_SITE = 'https://clinica-lien.vercel.app';
const DOMINIO_ANTIGO = 'lienreabilitacaooral';
const NUMERO_WHATSAPP = '5531985070448';

const ler = (caminho) => (existsSync(caminho) ? readFileSync(caminho, 'utf8') : null);

const html = ler('out/index.html');
if (!html) {
  console.error('FALHA: out/index.html nao existe. Rode "npm run build" primeiro.');
  process.exit(1);
}
const htmlPrivacidade = ler('out/privacidade/index.html') ?? '';
const llms = ler('out/llms.txt') ?? '';
const llmsCompleto = ler('out/llms-full.txt') ?? '';
const robots = ler('out/robots.txt') ?? '';
const sitemap = ler('out/sitemap.xml') ?? '';
const htmlTratamentos = ler('out/tratamentos/index.html') ?? '';
const htmlConteudos = ler('out/conteudos/index.html') ?? '';

// Os 14 artigos: frontmatter de content/artigos/*.md (fonte do texto aprovado).
const ARTIGOS = readdirSync('content/artigos')
  .filter((f) => f.endsWith('.md'))
  .map((f) => JSON.parse(readFileSync(`content/artigos/${f}`, 'utf8').match(/^---\n([\s\S]*?)\n---/)[1]));
const htmlArtigo = Object.fromEntries(ARTIGOS.map((a) => [a.slug, ler(`out/${a.slug}/index.html`) ?? '']));

const falhas = [];
const passou = [];
const checar = (nome, condicao, detalhe = '') => {
  if (condicao) passou.push(nome);
  else falhas.push(detalhe ? `${nome} — ${detalhe}` : nome);
};

// Marcacao renderizada, sem os <script>: o export embute o payload RSC, que
// repete cada palavra do site e envenena qualquer contagem de conteudo.
// Tambem sem comentarios HTML: o React insere `<!-- -->` entre fragmentos de
// texto adjacentes, e uma frase como "Responsavel tecnica: {nome}" sairia
// partida. As checagens comparam texto, nao bytes.
const semScripts = (h) =>
  h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '');
const marcacao = semScripts(html);
const contar = (texto, regex) => (texto.match(regex) ?? []).length;

/** Recorte de uma secao pelo id: do <section id=...> ate o </section> seguinte. */
const secao = (id) => {
  const ini = marcacao.indexOf(`<section id="${id}"`);
  return ini === -1 ? '' : marcacao.slice(ini, marcacao.indexOf('</section>', ini));
};

// --- O objetivo da migracao: conteudo dentro do HTML, sem executar JS ---
const H1 = 'Reabilitação oral com excelência clínica, tecnologia e cuidado em cada detalhe.';
// Texto do <h1> sem tags: o trecho final sai num <span> em magenta.
const textoH1 = (marcacao.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]+>/g, '').trim();
checar('H1 do hero presente no HTML', textoH1 === H1, `achou "${textoH1}"`);
checar('exatamente um <h1>', contar(marcacao, /<h1[\s>]/g) === 1, `achou ${contar(marcacao, /<h1[\s>]/g)}`);
checar('subtitulo do hero presente', marcacao.includes('segurança, conforto e previsibilidade'));

// --- Ordem das secoes (app/page.tsx; alinhamento final 2026, secao 3) ---
const ORDEM = [
  'inicio', 'resultados', 'depoimentos', 'sobre', 'metodo', 'comecar', 'tratamentos', 'sedacao',
  'experiencia', 'equipe', 'conteudos', 'duvidas', 'agendar',
];
const idsNaPagina = [...marcacao.matchAll(/<section id="([a-z-]+)"/g)].map((m) => m[1]);
checar(
  'secoes na ordem do briefing',
  JSON.stringify(idsNaPagina) === JSON.stringify(ORDEM),
  `achou [${idsNaPagina.join(', ')}]`,
);
const legendasCfo = contar(secao('resultados'), /Imagem publicada com autorização do paciente\./g);
checar('resultados: 4 a 6 casos, cada um com legenda de autorizacao', legendasCfo >= 4 && legendasCfo <= 6, `achou ${legendasCfo}`);
checar('resultados: aviso de individualidade', secao('resultados').includes('Os resultados variam de pessoa para pessoa'));
// Depoimentos do Google (prompt "depoimentos-lien"): 3 cards literais, sem CTA.
checar(
  'depoimentos: 3 cards literais, sem CTA',
  contar(secao('depoimentos'), /<blockquote/g) === 3 &&
    !secao('depoimentos').includes('wa.me') &&
    ['Alessandra Lopes', 'Nilson Antônio', 'Nádia Graciely'].every((n) => secao('depoimentos').includes(n)) &&
    secao('depoimentos').includes('cuidadosa com todos os detalhes , explicações'),
);
// LGPD: o video do YouTube da Experiencia so carrega no clique (como o mapa).
checar(
  'experiencia: sem embed nem imagem do YouTube no HTML (so no clique)',
  !/<iframe[^>]*youtube|i\.ytimg\.com/.test(secao('experiencia')) && secao('experiencia').includes('/img/experiencia-scanner-540.webp'),
);
checar('hero: prova social do Google no lugar do 2o botao', secao('inicio').includes('5,0 no Google · 57 avaliações'));
checar('faixa unica de prova rapida (sem a 2a faixa teal)', !marcacao.includes('bg-[#047E99]'));
const linksTratamentosHome = [...secao('tratamentos').matchAll(/href="\/tratamentos\/#([a-z-]+)"/g)].map((m) => m[1]);
checar(
  'home: 3 tratamentos, implantodontia primeiro, e "Ver todos"',
  JSON.stringify(linksTratamentosHome) === JSON.stringify(['implantodontia-digital', 'reabilitacao-oral-completa', 'facetas-e-proteses']) &&
    secao('tratamentos').includes('href="/tratamentos/"'),
  `achou [${linksTratamentosHome.join(', ')}]`,
);
const linksConteudosHome = contar(secao('conteudos'), /href="\/[a-z0-9-]+-(bh|belo-horizonte)\/"/g);
checar('home: 3 conteudos e "Ver todos os conteudos"', linksConteudosHome === 3 && secao('conteudos').includes('href="/conteudos/"'), `achou ${linksConteudosHome}`);
checar('menu com Tratamentos e Conteudos (paginas internas)', marcacao.includes('href="/tratamentos/"') && marcacao.includes('href="/conteudos/"'));

// --- CTAs de WhatsApp ---
const linksWhats = [...marcacao.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^"]*)"[^>]*>/g)];
checar('existem CTAs de WhatsApp', linksWhats.length > 0);
checar(
  'todo CTA usa o numero da clinica e mensagem pre-preenchida',
  linksWhats.every(([, href]) => href.startsWith(`https://wa.me/${NUMERO_WHATSAPP}?text=`)),
);
checar(
  'todo CTA tem data-cta (medicao por secao)',
  linksWhats.every(([tag]) => /\sdata-cta="[a-z-]+"/.test(tag)),
  `${linksWhats.filter(([tag]) => !/\sdata-cta=/.test(tag)).length} sem data-cta`,
);
const origens = new Set(linksWhats.map(([tag]) => tag.match(/data-cta="([a-z-]+)"/)?.[1]));
const ORIGENS_OBRIGATORIAS = ['hero', 'menu', 'cta-final', 'flutuante', 'comecar', 'sedacao', 'duvidas'];
const origensFaltando = ORIGENS_OBRIGATORIAS.filter((o) => !origens.has(o));
checar('todas as origens de CTA presentes', origensFaltando.length === 0, `faltando: ${origensFaltando.join(', ')}`);
checar(
  'todo CTA tem data-page (medicao por pagina)',
  linksWhats.every(([tag]) => /\sdata-page="\/[^"]*"/.test(tag)),
  `${linksWhats.filter(([tag]) => !/\sdata-page=/.test(tag)).length} sem data-page`,
);
// Um CTA por momento de decisao, sempre "Agende sua consulta" (alinhamento
// final, secao 1). Fora da regra: o flutuante (so icone), o contato do rodape
// e a Sedacao, que usa "Quero conversar sobre isso" por decisao da clinica
// (print aprovado, out/2026) — conferida a parte, logo abaixo.
const ctasPrincipais = [...marcacao.matchAll(/<a\b[^>]*href="https:\/\/wa\.me\/[^"]*"[^>]*data-cta="([a-z-]+)"[^>]*>([\s\S]*?)<\/a>/g)]
  .filter(([, origem]) => !['flutuante', 'rodape', 'sedacao'].includes(origem));
checar(
  'sedacao: CTA do print ("Quero conversar sobre isso") e sem foto',
  secao('sedacao').includes('Quero conversar sobre isso') && !secao('sedacao').includes('<img'),
);
checar(
  'todo CTA principal da home diz "Agende sua consulta"',
  ctasPrincipais.length > 0 && ctasPrincipais.every(([, , texto]) => texto.includes('Agende sua consulta')),
  ctasPrincipais.filter(([, , t]) => !t.includes('Agende sua consulta')).map(([, o]) => o).join(', '),
);
checar(
  'um CTA so por secao de decisao (comecar, sedacao, duvidas)',
  ['comecar', 'sedacao', 'duvidas'].every((id) => contar(secao(id), /href="https:\/\/wa\.me\//g) === 1),
);
const mensagens = linksWhats.map(([, href]) =>
  decodeURIComponent(href.split('?text=')[1].replace(/&amp;/g, '&')),
);

// --- FAQ: accordion fechado, exatamente 6 perguntas (alinhamento final 3.12) ---
// Radix com forceMount: toda resposta fica no HTML estatico, oculta por CSS.
const itensFaq = contar(secao('duvidas'), /data-faq-item=""/g);
checar('6 perguntas no FAQ', itensFaq === 6, `achou ${itensFaq}`);
checar('FAQ todo fechado de inicio', !/data-faq-item=""[^>]*data-state="open"|data-state="open"[^>]*data-faq-item=""/.test(secao('duvidas')));
checar('sem "Esta resposta ajudou?"', !marcacao.includes('Esta resposta ajudou'));

// --- Metadata ---
checar('title do briefing', html.includes('<title>Implantes Dentários e Reabilitação Oral em BH | Lien — Cruzeiro</title>'));
checar('canonical no dominio de producao', html.includes(`<link rel="canonical" href="${URL_SITE}/"/>`));
checar('robots com max-image-preview', html.includes('max-image-preview:large'));
checar('theme-color da marca', /name="theme-color"/.test(html));
checar('uma unica meta description', contar(html, /name="description"/g) === 1);
checar('og:image e twitter:card', html.includes('og:image') && html.includes('summary_large_image'));

// --- JSON-LD ---
const extrairSchemas = (h) =>
  [...h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const blocos = extrairSchemas(html);
let schemas = [];
try {
  schemas = blocos.map((b) => JSON.parse(b));
} catch (erro) {
  falhas.push(`ld+json invalido — ${erro.message}`);
}
checar('home com 3 blocos ld+json validos', blocos.length === 3 && schemas.length === 3, `achou ${blocos.length}`);
const tipos = schemas.flatMap((s) => [s['@type']].flat());
for (const t of ['Dentist', 'LocalBusiness', 'FAQPage', 'Person']) checar(`schema ${t}`, tipos.includes(t));
const faqSchema = schemas.find((s) => [s['@type']].flat().includes('FAQPage'));
checar('FAQPage com 6 perguntas', faqSchema?.mainEntity?.length === 6, `achou ${faqSchema?.mainEntity?.length}`);
// Toda resposta do schema precisa estar visivel (no HTML) na secao de duvidas.
const escaparHtml = (t) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const respostasFora = (faqSchema?.mainEntity ?? []).filter(
  (q) => !secao('duvidas').includes(escaparHtml(q.acceptedAnswer.text)),
);
checar('todas as respostas do FAQ no HTML', respostasFora.length === 0, `faltam ${respostasFora.length}`);
const jsonLd = blocos.join('\n');
checar('sem aggregateRating (autoavaliacao)', !jsonLd.includes('aggregateRating'));
checar('sem priceRange (briefing proibe preco)', !jsonLd.includes('priceRange'));
checar('sem placeholder no schema', !/CONFIRMAR|PENDENTE/.test(jsonLd));
checar('horario de quarta 9h-20h no schema', /"Wednesday"\][^}]*"opens":"09:00","closes":"20:00"/.test(jsonLd));

// --- Politica de privacidade ---
checar('pagina /privacidade/ gerada', htmlPrivacidade.includes('Política de privacidade'));
checar('rodape linka a politica', marcacao.includes('href="/privacidade/"'));
checar(
  'sem FAQPage na /privacidade/ (Google exige FAQ visivel)',
  htmlPrivacidade !== '' && !htmlPrivacidade.includes('FAQPage'),
);

// --- Compliance: linha legal ---
const rodape = marcacao.slice(marcacao.lastIndexOf('<footer'), marcacao.lastIndexOf('</footer>'));
checar('rodape com CNPJ', rodape.includes('60.080.536/0001-96'));
checar(
  'rodape com responsavel tecnica e CRO',
  rodape.includes('Responsável técnica: Dra. Natália Ferreira Simões') && rodape.includes('CRO-MG 49.821'),
);

// --- Vocabulario (secao 2 do briefing) ---
// Varre tudo que o publico le: marcacao (inclui alt e aria-label), JSON-LD,
// mensagens de WhatsApp, a pagina de privacidade e os llms.txt.
//
// Duas regras sao mais estreitas que o grep literal da secao 9, porque o
// literal reprovaria a copy do proprio briefing:
//  - "avaliacao" no sentido de consulta e proibido; "avaliacoes" do Google, nao.
//  - "o melhor caminho" e copy aprovada; proibidas sao as formas
//    autopromocionais ("o melhor de", "a melhor clinica"...).
//  - "valor da consulta" e proibido; a pergunta "saber o valor do meu
//    tratamento" e copy aprovada da FAQ.
const PROIBIDOS = [
  [/avalia(ção|cao|r\b|mos\b)/i, 'avaliação (use consulta)'],
  [/orçamento|orcamento/i, 'orçamento'],
  [/preço|preco\b/i, 'preço'],
  [/promoç|promoc/i, 'promoção'],
  [/desconto/i, 'desconto'],
  [/garant/i, 'garantido'],
  [/indolor|sem dor/i, 'indolor / sem dor'],
  [/\b(o|a) melhor (de|da|do|clínica|dentista|opção)\b|melhor de bh/i, 'superlativo'],
  [/100\s?%/, '100%'],
  [/R\$/, 'R$'],
  [/sem compromisso/i, 'sem compromisso'],
  [/parcel/i, 'parcelamento'],
  [/valor da consulta/i, 'valor da consulta'],
  [/incrível|revolucion/i, 'superlativo vazio'],
  [/Coleções Lien/, 'Coleções Lien'],
];
const fontes = {
  'home (marcacao)': marcacao,
  'JSON-LD': jsonLd,
  'mensagens de WhatsApp': mensagens.join('\n'),
  '/privacidade/': semScripts(htmlPrivacidade),
  'llms.txt': llms,
  'llms-full.txt': llmsCompleto,
};
// Paginas internas e artigos: o texto aprovado (literal) usa "avaliacao" em
// sentido tecnico, "sem dor" no titulo do artigo 12 e "a melhor opcao" no 02
// (listados no relatorio para a clinica). Ali valem so as proibicoes duras.
const SO_NA_HOME = new Set(['avaliação (use consulta)', 'superlativo', 'indolor / sem dor']);
const fontesInternas = {
  '/tratamentos/': semScripts(htmlTratamentos),
  '/conteudos/': semScripts(htmlConteudos),
  ...Object.fromEntries(Object.entries(htmlArtigo).map(([slug, h]) => [`/${slug}/`, semScripts(h)])),
};
// No llms, as linhas de artigo sao o texto aprovado; o resto segue a regra da home.
const linhaDeArtigo = (l) => ARTIGOS.some((a) => l.includes(`/${a.slug}/`));
fontes['llms.txt'] = llms.split('\n').filter((l) => !linhaDeArtigo(l)).join('\n');
fontes['llms-full.txt'] = llmsCompleto.split('\n').filter((l) => !linhaDeArtigo(l)).join('\n');
for (const [regex, rotulo] of PROIBIDOS) {
  const onde = Object.entries(fontes)
    .filter(([, texto]) => regex.test(texto))
    .map(([nome]) => nome);
  if (!SO_NA_HOME.has(rotulo)) {
    onde.push(...Object.entries(fontesInternas).filter(([, t]) => regex.test(t)).map(([n]) => n));
  }
  checar(`vocabulario: sem "${rotulo}"`, onde.length === 0, `aparece em: ${onde.join(', ')}`);
}
// "sem dor" so pode aparecer como o titulo aprovado do artigo 12 (nunca promessa).
const semDorForaDoTitulo = Object.entries(fontesInternas).filter(([, t]) =>
  /indolor|sem dor/i.test(t.replaceAll('Doença periodontal: por que ela pode avançar sem dor', '')),
);
checar('"sem dor" so no titulo do artigo 12', semDorForaDoTitulo.length === 0, semDorForaDoTitulo.map(([n]) => n).join(', '));

// Os numeros inflados do site anterior nao podem voltar: o briefing registra
// ~3 reabilitacoes e fundacao em 2024.
checar(
  'sem numeros inflados (+150 reabilitados, +8 anos)',
  !/\+\s*150|Pacientes reabilitados|anos de excelência/i.test(marcacao + llmsCompleto),
);

// Marcadores de pendencia sao comentario de codigo — nunca texto publicado.
// ("[Foto pendente]", em minusculas, e o placeholder visual intencional.)
checar(
  'nenhum marcador [PENDENTE] / [SUGESTAO] / CONFIRMAR publicado',
  !/\[(PENDENTE|SUGEST)|CONFIRMAR/.test([...Object.values(fontes), ...Object.values(fontesInternas)].join('\n')),
);

// --- Dominio unico ---
const publicados = {
  'index.html': html, 'privacidade': htmlPrivacidade, 'tratamentos': htmlTratamentos, 'conteudos': htmlConteudos,
  ...htmlArtigo, 'llms.txt': llms, 'llms-full.txt': llmsCompleto, 'robots.txt': robots, 'sitemap.xml': sitemap,
};
const comDominioAntigo = Object.entries(publicados).filter(([, t]) => t.includes(DOMINIO_ANTIGO)).map(([n]) => n);
checar('nenhum arquivo com o dominio antigo', comDominioAntigo.length === 0, `em: ${comDominioAntigo.join(', ')}`);
checar('robots.txt aponta o sitemap do dominio atual', robots.includes(`Sitemap: ${URL_SITE}/sitemap.xml`));
const URLS_SITEMAP = ['/', '/tratamentos/', '/conteudos/', ...ARTIGOS.map((a) => `/${a.slug}/`), '/privacidade/'];
const foraDoSitemap = URLS_SITEMAP.filter((u) => !sitemap.includes(`<loc>${URL_SITE}${u}</loc>`));
checar('sitemap com home, tratamentos, conteudos, 14 artigos e privacidade', foraDoSitemap.length === 0, `faltando: ${foraDoSitemap.join(', ')}`);
checar('llms.txt e llms-full.txt gerados', llms.length > 500 && llmsCompleto.length > 2000);

// --- Regras editoriais permanentes ---
checar('zero href="#"', ![marcacao, ...Object.values(fontesInternas)].some((t) => t.includes('href="#"')));
// Somente pictogramas. O bloco de dingbats (U+2600-27BF) NAO entra: contem
// U+2605 (estrela), usado legitimamente em "5,0 ★".
checar('zero emoji no HTML', !/[\u{1F300}-\u{1FAFF}]/u.test(marcacao));

// --- A folha de estilo existe e tem CSS de verdade ---
// Um site sem Tailwind compilado passaria em todas as assertions de conteudo.
const css = marcacao.match(/<link rel="stylesheet" href="([^"]+\.css)"/)?.[1];
const cssTamanho = css && existsSync(`out${css}`) ? statSync(`out${css}`).size : 0;
checar('folha de estilo presente e nao trivial', cssTamanho > 10240, `${cssTamanho} bytes`);

// --- O elemento LCP nao pode sair com opacidade zero ---
// `(?![.\d])`: o padrao de ondas do hero e legitimamente `opacity:0.08`.
const OPACIDADE_ZERO = /opacity:\s*0(?![.\d])/g;
checar('nenhum opacity:0 no hero (o H1 e o elemento LCP)', secao('inicio') !== '' && !OPACIDADE_ZERO.test(secao('inicio')));

// --- Arquivos oficiais de marca ---
const refsMarca = [...new Set(html.match(/\/marca\/[\w.-]+/g) ?? [])];
const faltando = refsMarca.filter((r) => !existsSync(`out${r}`));
checar(
  'todo arquivo /marca/* citado existe no export',
  refsMarca.length > 0 && faltando.length === 0,
  refsMarca.length === 0 ? 'nenhuma referencia encontrada' : `faltando: ${faltando.join(', ')}`,
);
const header = marcacao.slice(marcacao.indexOf('<header'), marcacao.indexOf('</header>'));
// O CTA final do print aprovado (out/2026) nao tem logo.
checar(
  'logo colorida no header e no rodape',
  header.includes('/marca/logo-rgb.png') && rodape.includes('/marca/logo-rgb.png'),
);
checar(
  'CTA final do print: card em degrade e um unico "Agende sua consulta"',
  secao('agendar').includes('cta-final-card') &&
    contar(secao('agendar'), /data-cta="cta-final"/g) === 1 &&
    secao('agendar').includes('consulta cuidadosa.'),
);

// --- Pagina /tratamentos/ (alinhamento final, secao 4) ---
const mTrat = semScripts(htmlTratamentos);
const SLUGS_TRATAMENTOS = [
  'implantodontia-digital', 'reabilitacao-oral-completa', 'facetas-e-proteses', 'periodontia',
  'harmonizacao-orofacial', 'dtm-e-dor-orofacial', 'cirurgia-bucomaxilofacial', 'ortodontia',
  'endodontia', 'clinica-geral',
];
checar('/tratamentos/ gerada, com um <h1>', contar(mTrat, /<h1[\s>]/g) === 1);
checar('/tratamentos/: 10 tratamentos com ancora propria', SLUGS_TRATAMENTOS.every((s) => mTrat.includes(`id="${s}"`)));
checar(
  '/tratamentos/: um "Agende sua consulta" por tratamento',
  SLUGS_TRATAMENTOS.every((s) => contar(mTrat, new RegExp(`data-cta="tratamento-${s}"`, 'g')) === 1),
);
checar('/tratamentos/: canonical e BreadcrumbList', htmlTratamentos.includes(`<link rel="canonical" href="${URL_SITE}/tratamentos/"/>`) && htmlTratamentos.includes('BreadcrumbList'));

// --- Biblioteca /conteudos/ (5.1) ---
const mCont = semScripts(htmlConteudos);
checar('/conteudos/ gerada, com um <h1>', contar(mCont, /<h1[\s>]/g) === 1);
checar('/conteudos/: link para os 14 artigos', ARTIGOS.every((a) => mCont.includes(`href="/${a.slug}/"`)));

// --- Os 14 artigos (5.3): URL, title, meta-descricao e H1 exatos ---
const escaparAttr = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const problemas = [];
for (const a of ARTIGOS) {
  const h = htmlArtigo[a.slug];
  const m = semScripts(h);
  const h1 = (m.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]+>/g, '');
  const erros = [
    !h && 'pagina nao gerada',
    !h.includes(`<title>${escaparHtml(a.metaTitle)}</title>`) && 'title',
    !h.includes(`<meta name="description" content="${escaparAttr(a.metaDescription)}"/>`) && 'description',
    contar(m, /<h1[\s>]/g) !== 1 && 'um h1',
    h1 !== escaparHtml(a.title) && 'h1 = titulo',
    !h.includes(`<link rel="canonical" href="${URL_SITE}/${a.slug}/"/>`) && 'canonical',
    !(h.includes('"@type":"Article"') && h.includes('BreadcrumbList')) && 'schema Article/BreadcrumbList',
    !m.includes(`data-cta="artigo-${a.slug}"`) && 'CTA final',
    !m.includes('Próximo passo') && 'bloco Proximo passo',
    !a.tratamentos.every((t) => m.includes(`href="/tratamentos/#${t}"`)) && 'link do tratamento',
    !m.includes('Autoria:') && 'autoria',
  ].filter(Boolean);
  if (erros.length) problemas.push(`${a.slug}: ${erros.join(', ')}`);
}
checar('14 artigos com URL, title, descricao, H1, schema, autoria e CTA', ARTIGOS.length === 14 && problemas.length === 0, problemas.join(' | '));

// --- Relatorio ---
console.log(`\n${passou.length} passou, ${falhas.length} falhou\n`);
for (const p of passou) console.log(`  ok   ${p}`);
if (falhas.length) {
  console.log('');
  for (const f of falhas) console.log(`  FALHA  ${f}`);
  console.log('');
  process.exit(1);
}
console.log('\nTudo verde.\n');
