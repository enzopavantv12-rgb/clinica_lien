/**
 * Verificacao automatizada do build estatico.
 *
 * Cobre a parte automatizavel do checklist da secao 9 do briefing
 * (prompt-claude-code-site-lien.md) e as protecoes herdadas da migracao.
 * Uso: npm run build && npm run verificar
 */
import { readFileSync, existsSync, statSync } from 'node:fs';

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
const H1 = 'Recuperar o sorriso começa com um cuidado de verdade.';
// Texto do <h1> sem tags: o trecho final sai num <span> em magenta.
const textoH1 = (marcacao.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]+>/g, '').trim();
checar('H1 do hero presente no HTML', textoH1 === H1, `achou "${textoH1}"`);
checar('exatamente um <h1>', contar(marcacao, /<h1[\s>]/g) === 1, `achou ${contar(marcacao, /<h1[\s>]/g)}`);
checar('subtitulo do hero presente', marcacao.includes('planejamento individual, tecnologia digital'));

// --- Ordem das secoes = arquitetura da secao 4 do briefing ---
const ORDEM = [
  'inicio', 'confianca', 'para-voce', 'sobre', 'metodo', 'tratamentos', 'sedacao',
  'experiencia', 'estrutura', 'equipe', 'depoimentos', 'duvidas', 'agendar',
];
const idsNaPagina = [...marcacao.matchAll(/<section id="([a-z-]+)"/g)].map((m) => m[1]);
checar(
  'secoes na ordem do briefing',
  JSON.stringify(idsNaPagina) === JSON.stringify(ORDEM),
  `achou [${idsNaPagina.join(', ')}]`,
);
checar('antes e depois oculto (SHOW_RESULTS desligado)', !marcacao.includes('id="resultados"'));
checar(
  'implante digital e o primeiro tratamento (destaque)',
  secao('tratamentos').indexOf('id="tratamento-implante"') > -1 &&
    secao('tratamentos').indexOf('id="tratamento-implante"') < secao('tratamentos').indexOf('id="tratamento-reabilitacao"'),
);

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
const ORIGENS_OBRIGATORIAS = [
  'hero', 'menu', 'final', 'flutuante', 'sedacao',
  'cardapio-comer', 'cardapio-dentes', 'cardapio-protese', 'cardapio-sorriso',
  'cardapio-completo', 'cardapio-mandibula', 'cardapio-gengiva', 'cardapio-medo',
  'tratamento-implante', 'tratamento-reabilitacao', 'tratamento-protese',
  'tratamento-periodontia', 'tratamento-harmonizacao', 'tratamento-lentes',
  'tratamento-dtm', 'tratamento-endodontia', 'tratamento-ortodontia', 'tratamento-clareamento',
];
const origensFaltando = ORIGENS_OBRIGATORIAS.filter((o) => !origens.has(o));
checar('todas as origens de CTA presentes', origensFaltando.length === 0, `faltando: ${origensFaltando.join(', ')}`);
const mensagens = linksWhats.map(([, href]) =>
  decodeURIComponent(href.split('?text=')[1].replace(/&amp;/g, '&')),
);

// --- FAQ indexavel com accordion fechado ---
const detalhesFaq = contar(secao('duvidas'), /<details[\s>]/g);
checar('12 perguntas no FAQ', detalhesFaq === 12, `achou ${detalhesFaq}`);
// `[\s=>]` e obrigatorio: o React serializa atributo booleano como `open=""`.
checar('nenhum <details> aberto por padrao', !/<details\b[^>]*\sopen(?:[\s=>]|$)/.test(marcacao));

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
checar('FAQPage com 12 perguntas', faqSchema?.mainEntity?.length === 12, `achou ${faqSchema?.mainEntity?.length}`);
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
for (const [regex, rotulo] of PROIBIDOS) {
  const onde = Object.entries(fontes)
    .filter(([, texto]) => regex.test(texto))
    .map(([nome]) => nome);
  checar(`vocabulario: sem "${rotulo}"`, onde.length === 0, `aparece em: ${onde.join(', ')}`);
}

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
  !/\[(PENDENTE|SUGEST)|CONFIRMAR/.test(Object.values(fontes).join('\n')),
);

// --- Dominio unico ---
const publicados = { 'index.html': html, 'privacidade': htmlPrivacidade, 'llms.txt': llms, 'llms-full.txt': llmsCompleto, 'robots.txt': robots, 'sitemap.xml': sitemap };
const comDominioAntigo = Object.entries(publicados).filter(([, t]) => t.includes(DOMINIO_ANTIGO)).map(([n]) => n);
checar('nenhum arquivo com o dominio antigo', comDominioAntigo.length === 0, `em: ${comDominioAntigo.join(', ')}`);
checar('robots.txt aponta o sitemap do dominio atual', robots.includes(`Sitemap: ${URL_SITE}/sitemap.xml`));
checar(
  'sitemap com a home e a privacidade',
  sitemap.includes(`<loc>${URL_SITE}/</loc>`) && sitemap.includes(`<loc>${URL_SITE}/privacidade/</loc>`),
);
checar('llms.txt e llms-full.txt gerados', llms.length > 500 && llmsCompleto.length > 2000);

// --- Regras editoriais permanentes ---
checar('zero href="#"', !marcacao.includes('href="#"'));
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
checar(
  'logo: colorida no header e no rodape, branca no CTA final',
  header.includes('/marca/logo-rgb.png') &&
    rodape.includes('/marca/logo-rgb.png') &&
    secao('agendar').includes('/marca/logo-branca.png'),
);

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
