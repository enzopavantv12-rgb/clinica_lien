/**
 * Regenera public/sitemap.xml com o lastmod de hoje.
 * Uso: npm run sitemap
 */
import { readFileSync, writeFileSync } from 'node:fs';

const caminho = new URL('../public/sitemap.xml', import.meta.url);
const hoje = new Date().toISOString().slice(0, 10);

const original = readFileSync(caminho, 'utf8');
const atualizado = original.replace(
  /<lastmod>[^<]*<\/lastmod>/,
  `<lastmod>${hoje}</lastmod>`,
);

writeFileSync(caminho, atualizado);
console.log(`sitemap.xml atualizado — lastmod: ${hoje}`);
