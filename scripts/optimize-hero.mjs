/**
 * Variantes da imagem da hero (Dra. Natalia com o arco ao fundo).
 *
 * Entrada:  assets/hero/Banner-lien-Firefly-Upscaler-escala-2x.png  (3840x2160, 16:9)
 *           — fica em assets/, fora do deploy: o original tem 10 MB.
 * Saida:    public/img/hero-lien-{2000,1440,1024}.{avif,webp}   desktop/tablet
 *           public/img/hero-lien-mobile-900.{avif,webp}          recorte 900x1200 (3:4)
 * Uso:      npm run hero
 *
 * O recorte mobile e centrado em x = 71% da largura (rosto e ombros da
 * doutora) e ocupa a altura inteira da foto. Ao trocar a imagem, confira
 * CENTRO_ROSTO_X e rode de novo.
 */
import { mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ORIGINAL = 'assets/hero/Banner-lien-Firefly-Upscaler-escala-2x.png';
const SAIDA = 'public/img';
const CENTRO_ROSTO_X = 0.71;

mkdirSync(SAIDA, { recursive: true });

const kb = (arquivo) => `${Math.round(statSync(arquivo).size / 1024)} KB`;

async function gravar(pipeline, nome) {
  const avif = join(SAIDA, `${nome}.avif`);
  const webp = join(SAIDA, `${nome}.webp`);
  await pipeline.clone().avif({ quality: 50, effort: 6 }).toFile(avif);
  await pipeline.clone().webp({ quality: 76 }).toFile(webp);
  console.log(`  ok  ${nome} — avif ${kb(avif)} · webp ${kb(webp)}`);
}

const original = sharp(ORIGINAL);
const { width, height } = await original.metadata();

for (const largura of [2000, 1440, 1024]) {
  await gravar(original.clone().resize({ width: largura }), `hero-lien-${largura}`);
}

// Recorte vertical 3:4 com a altura inteira da foto.
const larguraRecorte = Math.round((height * 3) / 4);
const esquerda = Math.min(
  width - larguraRecorte,
  Math.max(0, Math.round(width * CENTRO_ROSTO_X - larguraRecorte / 2)),
);
await gravar(
  original
    .clone()
    .extract({ left: esquerda, top: 0, width: larguraRecorte, height })
    .resize({ width: 900, height: 1200 }),
  'hero-lien-mobile-900',
);
