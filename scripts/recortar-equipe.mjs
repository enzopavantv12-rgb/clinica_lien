/**
 * Recorte quadrado das fotos da equipe.
 *
 * Motivo: os cards do corpo clinico sao quadrados e o BrandImage usa
 * object-cover centralizado. Nas fotos 4:5 isso cortaria o topo da cabeca;
 * aqui cada foto sai quadrada, enquadrada do alto da cabeca ao tronco.
 *
 * Entrada:  assets/fotos/Equipe/<nome do profissional>.<ext>  (como a clinica enviou)
 * Saida:    assets/fotos-originais/<slot>.jpg  -> depois `npm run images`
 * Uso:      node scripts/recortar-equipe.mjs && npm run images
 *
 * `topo` e `esquerda` sao fracoes da altura/largura da foto; `lado` e o lado
 * do quadrado como fracao da largura. Ajuste aqui se trocar alguma foto.
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ENTRADA = 'assets/fotos/Equipe';
const SAIDA = 'assets/fotos-originais';

const FOTOS = [
  { arquivo: 'Dra Natália simões.JPG.jpeg', slot: 'equipe-natalia-simoes', topo: 0.394, esquerda: 0.075, lado: 0.75 },
  { arquivo: 'Dra. Maria Emília Murta.PNG', slot: 'equipe-maria-emilia', topo: 0.03, esquerda: 0, lado: 1 },
  { arquivo: 'Dra. Isabela Guieiro.PNG', slot: 'equipe-isabela-guieiro', topo: 0.03, esquerda: 0, lado: 1 },
  { arquivo: 'Dr. Alexsander Pedrosa.PNG', slot: 'equipe-alexander-pedrosa', topo: 0.03, esquerda: 0, lado: 1 },
  { arquivo: 'Dra. Gabriela Ribeiro.PNG', slot: 'equipe-gabriela-ribeiro', topo: 0.03, esquerda: 0, lado: 1 },
  { arquivo: 'Dra. Luiza Henriques.jpeg', slot: 'equipe-luiza-henriques', topo: 0.08, esquerda: 0, lado: 1 },
];

mkdirSync(SAIDA, { recursive: true });

for (const f of FOTOS) {
  const imagem = sharp(join(ENTRADA, f.arquivo)).rotate();
  const { width, height } = await imagem.metadata();
  const lado = Math.round(width * f.lado);
  const top = Math.min(Math.round(height * f.topo), height - lado);
  const left = Math.round(width * f.esquerda);

  await imagem
    .extract({ left, top, width: lado, height: lado })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(join(SAIDA, `${f.slot}.jpg`));
  console.log(`  ok  ${f.slot} — ${lado}x${lado} (de ${width}x${height})`);
}
