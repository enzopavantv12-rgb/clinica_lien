/**
 * Verificacao automatizada do build estatico.
 * Cobre a parte automatizavel da secao 11 da spec de migracao.
 * Uso: npm run build && npm run verificar
 */
import { readFileSync, existsSync, statSync } from 'node:fs';

const CAMINHO = 'out/index.html';

if (!existsSync(CAMINHO)) {
  console.error(`FALHA: ${CAMINHO} nao existe. Rode "npm run build" primeiro.`);
  process.exit(1);
}

const html = readFileSync(CAMINHO, 'utf8');
const falhas = [];
const passou = [];

const checar = (nome, condicao, detalhe = '') => {
  if (condicao) passou.push(nome);
  else falhas.push(detalhe ? `${nome} — ${detalhe}` : nome);
};

const contar = (regex) => (html.match(regex) ?? []).length;

// Marcacao renderizada, sem os <script>: o export embute o payload RSC, que
// repete cada palavra do site e envenena qualquer contagem de conteudo. Regra
// que este projeto ja adotou para assertions de conteudo.
const marcacao = html.replace(/<script[\s\S]*?<\/script>/g, '');
const contarNaMarcacao = (regex) => (marcacao.match(regex) ?? []).length;

// --- O objetivo da migracao: conteudo dentro do HTML, sem executar JS ---
const H1 = 'Devolvemos sua mastigação, seu sorriso e sua confiança.';
checar('H1 do hero presente no HTML', html.includes(H1));
checar('exatamente um <h1>', contar(/<h1[\s>]/g) === 1, `achou ${contar(/<h1[\s>]/g)}`);
checar(
  'subtitulo do hero presente no HTML',
  html.includes('planejamento individualizado'),
);

// --- CTAs de WhatsApp ---
const ctas = contarNaMarcacao(/https:\/\/wa\.me\//g);
checar('10 CTAs de WhatsApp', ctas === 10, `achou ${ctas}`);

// --- FAQ indexavel com accordion fechado ---
const detalhes = contar(/<details[\s>]/g);
checar('8 <details> no FAQ', detalhes === 8, `achou ${detalhes}`);
// `[\s=>]` e obrigatorio: o React serializa atributo booleano como
// `open=""`, nao `open` puro. Sem o `=`, esta assertion nunca casaria.
checar(
  'nenhum <details> aberto por padrao',
  !/<details\b[^>]*\sopen(?:[\s=>]|$)/.test(html),
);

// --- Metadata (Task 5) ---
checar(
  'title correto',
  html.includes('Lien Reabilitação Oral | Implantes e Reabilitação em Belo Horizonte'),
);
// Por atributo: a URL crua tambem aparece em og:url e no JSON-LD.
checar('canonical', /rel="canonical"/.test(html));
checar('robots com max-image-preview', html.includes('max-image-preview:large'));
// Por atributo: o hex tambem pode aparecer em CSS inlinado pelo Next.
checar('theme-color da marca', /name="theme-color"/.test(html));
checar('og:image', html.includes('og-image.jpg'));
checar('twitter:card', html.includes('summary_large_image'));

// --- JSON-LD (Task 6) ---
const blocos = [...html.matchAll(
  /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
)].map((m) => m[1]);
checar('3 blocos ld+json', blocos.length === 3, `achou ${blocos.length}`);

let schemas = [];
// Guarda contra o vacuo: com zero blocos o map nao lanca e a assertion
// passaria sem ter validado nada.
if (blocos.length === 0) {
  falhas.push('todos os ld+json fazem parse — nenhum bloco ld+json para validar');
} else {
  try {
    schemas = blocos.map((b) => JSON.parse(b));
    passou.push('todos os ld+json fazem parse');
  } catch (erro) {
    falhas.push(`ld+json invalido — ${erro.message}`);
  }
}

const tipos = schemas.flatMap((s) => [s['@type']].flat());
checar('schema Dentist', tipos.includes('Dentist'));
checar('schema LocalBusiness', tipos.includes('LocalBusiness'));
checar('schema FAQPage', tipos.includes('FAQPage'));
checar('schema Person', tipos.includes('Person'));

const faqSchema = schemas.find((s) => [s['@type']].flat().includes('FAQPage'));
checar(
  'FAQPage com 8 perguntas',
  faqSchema?.mainEntity?.length === 8,
  `achou ${faqSchema?.mainEntity?.length}`,
);

// --- A folha de estilo existe e tem CSS de verdade ---
// Sem isto um site totalmente sem estilo passaria em todas as outras
// assertions — o proprio plano registrou esse buraco.
const hrefCss = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/)?.[1];
const bytesCss = hrefCss && existsSync(`out${hrefCss}`) ? statSync(`out${hrefCss}`).size : 0;
checar(
  '<link> de stylesheet apontando para CSS nao-trivial',
  bytesCss > 10240,
  `${hrefCss ?? 'nenhum <link rel="stylesheet">'} — ${bytesCss} bytes`,
);

// --- O elemento LCP nao pode sair com opacidade zero ---
// Elemento com opacity:0 nao e candidato a LCP: o LCP passa a esperar o
// bundle hidratar, que e o custo que esta migracao existe para eliminar.
const inicioHero = marcacao.indexOf('<section id="inicio"');
const hero = marcacao.slice(inicioHero, marcacao.indexOf('</section>', inicioHero));
// `(?![.\d])` e obrigatorio: o padrao de ondas do hero e legitimamente
// `opacity:0.08`, e sem a guarda o "0" dele casaria e reprovaria o build.
const OPACIDADE_ZERO = /opacity:\s*0(?![.\d])/g;
checar(
  'nenhum opacity:0 no hero renderizado (o H1 e o elemento LCP)',
  inicioHero !== -1 && !OPACIDADE_ZERO.test(hero),
  `achou ${(hero.match(OPACIDADE_ZERO) ?? []).length}`,
);

// --- Os numeros saem com o valor real, nao com o 0 inicial da animacao ---
// O contador anima de 0 ate o valor; se o estado inicial fosse 0, o HTML
// estatico publicaria "+0 pacientes" e "0,0 estrelas" como conteudo
// rastreavel — e os numeros reais ainda sao pendencia de go-live.
const stats = [...marcacao.matchAll(/<p class="text-stat[^"]*"[^>]*>[^<]*<span>(\d+)<\/span>/g)]
  .map((m) => m[1]);
checar(
  '4 numeros com o valor real (nenhum zero)',
  stats.length === 4 && stats.every((v) => v !== '0'),
  `achou [${stats.join(', ')}]`,
);

// --- Arquivos oficiais de marca ---
// Todo /marca/* citado no HTML precisa existir no export. Uma referencia
// quebrada aqui vira logo sem imagem, favicon ausente ou padronagem invisivel
// — nada disso falha o build, e mascara CSS quebrada nem gera erro visivel.
const refsMarca = [...new Set(html.match(/\/marca\/[\w.-]+/g) ?? [])];
const faltando = refsMarca.filter((r) => !existsSync(`out${r}`));
checar(
  'todo arquivo /marca/* citado existe no export',
  refsMarca.length > 0 && faltando.length === 0,
  refsMarca.length === 0 ? 'nenhuma referencia encontrada' : `faltando: ${faltando.join(', ')}`,
);
// `lastIndexOf` para o rodape: os depoimentos tem <footer> proprio (a
// atribuicao da citacao), antes do rodape do site.
const header = marcacao.slice(marcacao.indexOf('<header'), marcacao.indexOf('</header>'));
const rodape = marcacao.slice(marcacao.lastIndexOf('<footer'), marcacao.lastIndexOf('</footer>'));
checar(
  'logo oficial: colorida no header, branca no rodape',
  header.includes('/marca/logo-rgb.png') && rodape.includes('/marca/logo-branca.png'),
);

// --- Regras editoriais permanentes ---
checar('zero ocorrencias de "Coleções Lien"', !html.includes('Coleções Lien'));
checar('zero href="#"', !html.includes('href="#"'));
// Somente pictogramas. O bloco de dingbats (U+2600-27BF) NAO entra: contem
// U+2605 (estrela), usado legitimamente em `numeros` como ",0 *".
checar('zero emoji no HTML', !/[\u{1F300}-\u{1FAFF}]/u.test(html));

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
