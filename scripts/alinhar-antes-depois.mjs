/**
 * Alinha os pares de antes e depois (assets/Depoimentos/) para o comparador.
 *
 * Por que: no ImageCompare as duas fotos ficam sobrepostas e o divisor corta
 * entre elas. Se o rosto (ou o sorriso) estiver em escala ou posicao diferente
 * em cada foto, o corte "quebra" o rosto. Aqui cada par ganha o mesmo
 * enquadramento.
 *
 * Como: dois pontos de referencia por foto (olhos nos retratos; cantos da boca
 * ou do arco dental nas fotos aproximadas), em % da largura/altura. O script
 * calcula escala e deslocamento que levam os pontos do "depois" sobre os do
 * "antes" e recorta, nas duas, o maior quadrado comum, centrado nos pontos.
 *
 * Saida: assets/fotos-originais/antes-depois-<n>-{antes,depois}.png (1200px)
 * Uso:   node scripts/alinhar-antes-depois.mjs && npm run images
 * Ajuste fino: mexa nos pontos abaixo e rode de novo.
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ENTRADA = 'assets/Depoimentos';
const SAIDA = 'assets/fotos-originais';
const LADO = 1200;

/** Pontos [x, y] em % da foto. a = antes, b = depois. */
// Pares 1 e 3 sairam do site em nov/2026 (substituidos pelos 14 e 13).
const PARES = [
  { n: 2, antes: 'Retrato fiel de homem em camiseta cinza.png', depois: 'Retrato de homem sorrindo com camiseta preta.png',
    a: [[41, 36], [58, 36]], b: [[40.4, 39.4], [57.4, 39.4]] },
  { n: 4, antes: 'Restauração de fotografia odontológica lateral.png', depois: 'Restauração do arco dentário lateral.png',
    a: [[12, 47], [88, 47]], b: [[14, 46], [92, 46]] },
  { n: 5, antes: 'Restauração da arcada superior em alta definição.png', depois: 'Arco dental inferior restaurado.png',
    a: [[2, 44], [98, 44]], b: [[2, 48], [98, 48]] },
  { n: 6, antes: 'Retrato restaurado com marcações faciais.png', depois: 'Retrato restaurado com mãos nas bochechas.png',
    a: [[37, 31.6], [65, 31.6]], b: [[36, 30.6], [62, 30.6]] },
  { n: 7, antes: 'Registro clínico do arco dental superior.png', depois: 'Sorriso natural em alta definição.png',
    a: [[28, 48], [74, 48]], b: [[25, 47], [79, 47]] },
  { n: 8, antes: 'Retrato sorridente em close, fundo claro.png', depois: 'Retrato quadrado com sorriso natural.png',
    a: [[37, 42.4], [58, 42.4]], b: [[41.6, 36.6], [58, 36.6]] },
  { n: 9, antes: 'Retrato restaurado com joias delicadas.png', depois: 'Retrato restaurado com joias douradas.png',
    a: [[36.4, 38.8], [58, 38.8]], b: [[39, 40], [58, 40]] },
  // Pares enviados em nov/2026 (fundo preto, estudio). O 13 e o RAW
  // IMG_3142.CR2 (antes) e o IMG_7929.JPG (depois), ambos em 4:3.
  // Pupilas medidas com zoom; `dy` desce o centro do recorte (em % da altura
  // do "antes") dos olhos para o meio do rosto, para o queixo caber.
  { n: 10, antes: 'Harmonizacao marcacoes antes.png', depois: 'Harmonizacao depois.png',
    a: [[38.75, 24.3], [59.5, 24.3]], b: [[37.5, 29.9], [59.5, 29.9]], dy: 14, px: true },
  { n: 11, antes: 'Mulher moletom antes.png', depois: 'Mulher brincos dourados depois.png',
    a: [[36.25, 36.6], [62.5, 36.6]], b: [[33.75, 41.1], [60.3, 41.1]], dy: 9, px: true },
  { n: 12, antes: 'Homem camisa listrada antes.png', depois: 'Homem camisa cinza depois.png',
    a: [[33.75, 38], [60.9, 38]], b: [[32, 29.7], [57, 29.7]], dy: 7, px: true },
  { n: 14, antes: 'Mulher blusa bege antes.png', depois: 'Mulher camiseta preta depois.png',
    a: [[37.8, 33], [55.8, 33]], b: [[41.4, 33.35], [56.6, 33.35]], dy: 6, px: true },
  { n: 13, antes: 'Sorriso close antes.jpg', depois: 'Sorriso close depois.jpg',
    a: [[9.9, 39], [90.2, 39]], b: [[12, 41], [72, 41]], px: true },
];

/**
 * Transformacao depois = k * antes + t (por eixo, mesma escala k) e o maior
 * quadrado, em coordenadas do "antes", que cabe nas duas fotos.
 */
function enquadrar({ a, b, dy = 0 }) {
  const k = (b[1][0] - b[0][0]) / (a[1][0] - a[0][0]);
  const media = (p) => [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2];
  const [ax, ay] = media(a);
  const [bx, by] = media(b);
  const t = [bx - k * ax, by - k * ay];

  // Intervalo valido de cada eixo, em coordenadas do "antes": dentro do
  // "antes" (0..100) e com a imagem no "depois" tambem dentro (0..100).
  const faixa = (ti) => [Math.max(0, -ti / k), Math.min(100, (100 - ti) / k)];
  const [x0, x1] = faixa(t[0]);
  const [y0, y1] = faixa(t[1]);
  const lado = Math.min(x1 - x0, y1 - y0);
  const centrar = (c, lo, hi) => Math.min(Math.max(c - lado / 2, lo), hi - lado);
  const esq = centrar(ax, x0, x1);
  const topo = centrar(ay + dy, y0, y1);
  return {
    antes: { esq, topo, lado },
    depois: { esq: k * esq + t[0], topo: k * topo + t[1], lado: k * lado },
  };
}

async function recortar(arquivo, { esq, topo, lado }, destino) {
  const img = sharp(join(ENTRADA, arquivo));
  const { width, height } = await img.metadata();
  const px = (v, total) => Math.round((v / 100) * total);
  const s = Math.min(px(lado, width), px(lado, height));
  const left = Math.min(px(esq, width), width - s);
  const top = Math.min(px(topo, height), height - s);
  await img
    .extract({ left, top, width: s, height: s })
    .resize(LADO, LADO)
    .png({ compressionLevel: 9 })
    .toFile(destino);
}

/**
 * Versao em pixels (`px: true`, pares de nov/2026): a de % mistura largura e
 * altura quando a foto nao e quadrada e, em retrato, prendia o recorte no
 * topo (cortava o queixo). Aqui escala, deslocamento, `dy` e o quadrado sao
 * calculados em pixels de cada foto.
 */
async function enquadrarPx({ antes, depois, a, b, dy = 0 }) {
  const da = await sharp(join(ENTRADA, antes)).metadata();
  const db = await sharp(join(ENTRADA, depois)).metadata();
  const pa = a.map(([x, y]) => [(x / 100) * da.width, (y / 100) * da.height]);
  const pb = b.map(([x, y]) => [(x / 100) * db.width, (y / 100) * db.height]);
  const dist = (p) => Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]);
  const k = dist(pb) / dist(pa);
  const media = (p) => [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2];
  const [ax, ay] = media(pa);
  const [bx, by] = media(pb);
  const t = [bx - k * ax, by - k * ay];
  const faixa = (ti, tamA, tamB) => [Math.max(0, -ti / k), Math.min(tamA, (tamB - ti) / k)];
  const [x0, x1] = faixa(t[0], da.width, db.width);
  const [y0, y1] = faixa(t[1], da.height, db.height);
  const lado = Math.min(x1 - x0, y1 - y0);
  const centrar = (c, lo, hi) => Math.min(Math.max(c - lado / 2, lo), hi - lado);
  const esq = centrar(ax, x0, x1);
  const topo = centrar(ay + (dy / 100) * da.height, y0, y1);
  return {
    antes: { left: esq, top: topo, s: lado },
    depois: { left: k * esq + t[0], top: k * topo + t[1], s: k * lado },
    pct: (lado / Math.min(da.width, da.height)) * 100,
  };
}

async function recortarPx(arquivo, { left, top, s }, destino) {
  const r = Math.round;
  await sharp(join(ENTRADA, arquivo))
    .extract({ left: r(left), top: r(top), width: r(s), height: r(s) })
    .resize(LADO, LADO)
    .png({ compressionLevel: 9 })
    .toFile(destino);
}

mkdirSync(SAIDA, { recursive: true });
for (const par of PARES) {
  const destino = (lado) => join(SAIDA, `antes-depois-${par.n}-${lado}.png`);
  if (par.px) {
    const q = await enquadrarPx(par);
    await recortarPx(par.antes, q.antes, destino('antes'));
    await recortarPx(par.depois, q.depois, destino('depois'));
    console.log(`  ok  par ${par.n} — lado ${q.pct.toFixed(1)}% do lado menor do antes`);
    continue;
  }
  const q = enquadrar(par);
  await recortar(par.antes, q.antes, destino('antes'));
  await recortar(par.depois, q.depois, destino('depois'));
  console.log(`  ok  par ${par.n} — lado ${q.antes.lado.toFixed(1)}% do antes`);
}
