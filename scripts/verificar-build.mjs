/**
 * Verificacao automatizada do build estatico.
 * Cobre a parte automatizavel da secao 11 da spec de migracao.
 * Uso: npm run build && npm run verificar
 */
import { readFileSync, existsSync } from 'node:fs';

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

// --- O objetivo da migracao: conteudo dentro do HTML, sem executar JS ---
const H1 = 'Devolvemos sua mastigação, seu sorriso e sua confiança.';
checar('H1 do hero presente no HTML', html.includes(H1));
checar('exatamente um <h1>', contar(/<h1[\s>]/g) === 1, `achou ${contar(/<h1[\s>]/g)}`);
checar(
  'subtitulo do hero presente no HTML',
  html.includes('planejamento individualizado'),
);

// --- CTAs de WhatsApp ---
const ctas = contar(/https:\/\/wa\.me\//g);
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
try {
  schemas = blocos.map((b) => JSON.parse(b));
  passou.push('todos os ld+json fazem parse');
} catch (erro) {
  falhas.push(`ld+json invalido — ${erro.message}`);
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
