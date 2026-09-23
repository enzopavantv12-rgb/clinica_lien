/**
 * Gera as versoes web dos arquivos oficiais de marca.
 *
 * Entrada:  assets/Pastas/  (originais enviados pela clinica — fonte, fora do deploy)
 * Saida:    public/marca/
 * Uso:      npm run marca
 *
 * Motivo de existir: os originais chegam em resolucao de impressao (a
 * padronagem tem 11839px e 854KB). O script reduz ao necessario para tela sem
 * alterar o desenho. Logos e simbolos so tem as bordas transparentes aparadas,
 * para que as variacoes tenham o mesmo enquadramento — o respiro exigido pelo
 * manual e aplicado pelo componente, nao pelo arquivo.
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ENTRADA = 'assets/Pastas';
const SAIDA = 'public/marca';
const MAGENTA = '#9C1781';

mkdirSync(SAIDA, { recursive: true });

// [original, saida, largura]. A largura cobre 3x a maior exibicao no site.
const MARCAS = [
  ['LIEN_logo_rgb.png', 'logo-rgb.png', 600],
  ['Logo Lien Branca.png', 'logo-branca.png', 600],
  ['LIEN_simbolo_rgb.png', 'simbolo-rgb.png', 480],
  ['LIEN_simbolo_cyano.png', 'simbolo-cyano.png', 480],
  ['LIEN_simbolo_negativo.png', 'simbolo-negativo.png', 480],
];

for (const [original, saida, largura] of MARCAS) {
  const info = await sharp(join(ENTRADA, original))
    .trim()
    .resize({ width: largura, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(SAIDA, saida));
  console.log(`  ok  ${saida.padEnd(22)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)}KB`);
}

// Padronagem: usada como mascara CSS, entao so o canal alfa importa. Vai
// inteira, sem aparar — as margens fazem parte do desenho do arquivo.
// Com perda leve: e textura a 8% de opacidade, e a borda segue limpa mesmo
// ampliada 2x. 44KB contra 145KB da versao sem perda — ela carrega no hero.
{
  const info = await sharp(join(ENTRADA, 'LIEN_padronagem.png'))
    .resize({ width: 2000 })
    .webp({ quality: 40, alphaQuality: 60 })
    .toFile(join(SAIDA, 'padronagem.webp'));
  console.log(`  ok  ${'padronagem.webp'.padEnd(22)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)}KB`);
}

// Favicons: simbolo negativo (branco) sobre o magenta da marca.
// O apple-icon sai sem cantos arredondados: o iOS arredonda sozinho e pinta
// de preto qualquer area transparente.
async function favicon(tamanho, saida, arredondar) {
  const raio = arredondar ? Math.round(tamanho * 0.22) : 0;
  const fundo = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}">` +
      `<rect width="100%" height="100%" rx="${raio}" fill="${MAGENTA}"/></svg>`,
  );
  const simbolo = await sharp(join(ENTRADA, 'LIEN_simbolo_negativo.png'))
    .trim()
    .resize({ width: Math.round(tamanho * 0.72) })
    .png()
    .toBuffer();
  const info = await sharp(fundo)
    .composite([{ input: simbolo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(join(SAIDA, saida));
  console.log(`  ok  ${saida.padEnd(22)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)}KB`);
}

await favicon(32, 'favicon-32.png', true);
await favicon(512, 'icon-512.png', true);
await favicon(180, 'apple-icon.png', false);

console.log(`\nArquivos de marca gerados em ${SAIDA}\n`);
