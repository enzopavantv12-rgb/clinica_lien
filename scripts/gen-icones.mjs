/**
 * Gera as versoes web dos icones oficiais do site.
 *
 * Entrada:  assets/ICONES_LIEN_SITE/<SECAO>/<Nome>.png  (enviados pela clinica, out/2026)
 * Saida:    public/icones-lien/<saida>.webp
 * Uso:      npm run icones
 *
 * Cada pasta corresponde a uma secao do site (o nome da pasta e a tag da
 * secao): EXCELENCIA-ODONTOLOGICA = cards de tratamento, ORIENTACAO-
 * PERSONALIZADA = "Por onde voce quer comecar?", NOSSA ESSENCIA = Sobre,
 * ACOLHIMENTO-AVANCADO = Sedacao. Os originais tem ate 1843px; aqui saem
 * aparados (bordas transparentes) e na largura de ~3x a maior exibicao.
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ENTRADA = 'assets/ICONES_LIEN_SITE';
const SAIDA = 'public/icones-lien';

mkdirSync(SAIDA, { recursive: true });

// [pasta/arquivo original, saida, largura]
const ICONES = [
  // Cards de tratamento (46px): o arquivo ja traz o quadrado tintado.
  ['EXCELENCIA-ODONTOLOGICA/Implantodontia.png', 'tratamento-implantodontia-digital', 144],
  ['EXCELENCIA-ODONTOLOGICA/Reabilitaçao.png', 'tratamento-reabilitacao-oral-completa', 144],
  ['EXCELENCIA-ODONTOLOGICA/Faceta.png', 'tratamento-facetas-e-proteses', 144],
  ['EXCELENCIA-ODONTOLOGICA/Periodontia.png', 'tratamento-periodontia', 144],
  ['EXCELENCIA-ODONTOLOGICA/Harmonizaçao.png', 'tratamento-harmonizacao-orofacial', 144],
  ['EXCELENCIA-ODONTOLOGICA/DTM.png', 'tratamento-dtm-e-dor-orofacial', 144],
  ['EXCELENCIA-ODONTOLOGICA/Bucomaxilo.png', 'tratamento-cirurgia-bucomaxilofacial', 144],
  ['EXCELENCIA-ODONTOLOGICA/Ortodontia.png', 'tratamento-ortodontia', 144],
  ['EXCELENCIA-ODONTOLOGICA/Endodontia.png', 'tratamento-endodontia', 144],
  ['EXCELENCIA-ODONTOLOGICA/Clinica-Geral.png', 'tratamento-clinica-geral', 144],
  // "Por onde voce quer comecar?" (44px).
  ['ORIENTAÇAO-PERSONALIZADA/Protese.png', 'comecar-protese', 144],
  ['ORIENTAÇAO-PERSONALIZADA/Mandibula.png', 'comecar-mandibula', 144],
  ['ORIENTAÇAO-PERSONALIZADA/Sorriso.png', 'comecar-sorriso', 144],
  ['ORIENTAÇAO-PERSONALIZADA/Medo.png', 'comecar-medo', 144],
  // Sobre (40px).
  ['NOSSA ESSENCIA/Personalizado.png', 'essencia-personalizado', 128],
  ['NOSSA ESSENCIA/Localizaçao.png', 'essencia-localizacao', 96],
  // Sedacao: modalidades (38px) e o circulo do card "Converse" (64px).
  ['ACOLHIMENTO-AVANÇADO/Sedaçao.png', 'sedacao-pilula', 120],
  ['ACOLHIMENTO-AVANÇADO/Anestesista.png', 'sedacao-anestesista', 120],
  ['ACOLHIMENTO-AVANÇADO/Equipe_v02.png', 'sedacao-equipe', 192],
];

for (const [original, saida, largura] of ICONES) {
  const info = await sharp(join(ENTRADA, original.normalize('NFD')))
    .trim()
    .resize({ width: largura, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(join(SAIDA, `${saida}.webp`));
  console.log(`  ok  ${saida.padEnd(40)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)}KB`);
}

console.log(`\nIcones gerados em ${SAIDA}\n`);
