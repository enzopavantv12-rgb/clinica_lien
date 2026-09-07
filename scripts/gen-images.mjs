/**
 * Otimizacao de imagem no build.
 *
 * Motivo de existir: producao e estatica (Hostinger), sem runtime Node, logo
 * sem o otimizador do next/image. As variantes sao geradas aqui.
 *
 * Entrada:  assets/fotos-originais/<nome>.{jpg,png,webp}  (fora do deploy)
 * Saida:    public/img/<nome>-<largura>.{avif,webp}
 * Uso:      npm run images
 */
import { readdirSync, mkdirSync, existsSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';
// Larguras por slot: fonte unica, compartilhada com o BrandImage.
// Se os dois divergirem, o srcset aponta para arquivo que nao existe.
import LARGURAS from '../src/data/imagens.json' with { type: 'json' };

const ENTRADA = 'assets/fotos-originais';
const SAIDA = 'public/img';


if (!existsSync(ENTRADA)) {
  console.log(`${ENTRADA} nao existe — nada a gerar. As fotos reais ainda nao chegaram.`);
  process.exit(0);
}

mkdirSync(SAIDA, { recursive: true });

const arquivos = readdirSync(ENTRADA).filter((f) =>
  ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()),
);

if (arquivos.length === 0) {
  console.log(`${ENTRADA} esta vazio — nada a gerar.`);
  process.exit(0);
}

let geradas = 0;

for (const arquivo of arquivos) {
  const nome = basename(arquivo, extname(arquivo));
  const larguras = LARGURAS[nome];

  if (!larguras) {
    console.warn(`  aviso: "${nome}" nao esta no mapa LARGURAS — ignorado.`);
    continue;
  }

  for (const largura of larguras) {
    const origem = join(ENTRADA, arquivo);
    const base = sharp(origem).resize({ width: largura, withoutEnlargement: true });

    await base.clone().avif({ quality: 55 }).toFile(join(SAIDA, `${nome}-${largura}.avif`));
    await base.clone().webp({ quality: 78 }).toFile(join(SAIDA, `${nome}-${largura}.webp`));
    geradas += 2;
  }
  console.log(`  ok  ${nome} — ${larguras.join(', ')}`);
}

console.log(`\n${geradas} arquivo(s) gerado(s) em ${SAIDA}\n`);
