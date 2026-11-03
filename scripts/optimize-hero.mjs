/**
 * Variantes da imagem da hero (Dra. Natalia com o arco ao fundo).
 *
 * Entrada:  assets/hero/Banner_Nat.png  (3344x1882, 16:9; nov/2026)
 *           — fica em assets/, fora do deploy.
 * Saida:    public/img/hero-lien-{2000,1440,1024}.{avif,webp}   desktop/tablet
 *           public/img/hero-lien-mobile-900.{avif,webp}          900x1200 (3:4), de
 *           assets/hero/hero-mobile.png (foto vertical propria, nov/2026)
 * Uso:      npm run hero
 *
 */
import { mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ORIGINAL = 'assets/hero/Banner_Nat.png';
const ORIGINAL_MOBILE = 'assets/hero/hero-mobile.png';
const SAIDA = 'public/img';

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
for (const largura of [2000, 1440, 1024]) {
  await gravar(original.clone().resize({ width: largura }), `hero-lien-${largura}`);
}

// Celular e tablet em pe: foto vertical propria (3:4), enviada pela clinica.
await gravar(sharp(ORIGINAL_MOBILE).resize({ width: 900, height: 1200, fit: 'cover', position: 'top' }), 'hero-lien-mobile-900');
