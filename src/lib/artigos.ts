import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Os 14 artigos de "Conteudos em Saude Bucal" (Anexo A do alinhamento final),
 * um arquivo por artigo em content/artigos/<slug>.md, com o texto aprovado
 * LITERAL. So roda no build (fs): a pagina /conteudos/ e as 14 URLs sao
 * estaticas.
 *
 * Formato: frontmatter em JSON entre `---` e corpo num markdown minimo —
 * `#### ` (subtitulo, vira H2), `- ` (lista), `1. ` (lista numerada) e
 * paragrafos separados por linha em branco. Sem dependencia nova: o parser
 * cobre so isso, e um bloco fora do formato quebra o build (melhor que
 * publicar texto torto).
 */

export type Bloco =
  | { tipo: 'h2'; texto: string }
  | { tipo: 'p'; texto: string }
  | { tipo: 'ul'; itens: string[] }
  | { tipo: 'ol'; itens: string[] };

export type Artigo = {
  numero: number;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  author: string;
  category: string;
  tratamentos: string[];
  proximoPasso: string;
  corpo: Bloco[];
};

/** Data de publicacao dos 14 artigos (ISO). Uma so: entraram juntos. */
export const DATA_PUBLICACAO = '2026-10-12';

const PASTA = join(process.cwd(), 'content', 'artigos');

function blocos(md: string, slug: string): Bloco[] {
  return md
    .trim()
    .split(/\n\s*\n/)
    .map((trecho): Bloco => {
      const linhas = trecho.split('\n').map((l) => l.trim());
      if (linhas[0].startsWith('#### ')) {
        if (linhas.length > 1) throw new Error(`${slug}: subtitulo com mais de uma linha`);
        return { tipo: 'h2', texto: linhas[0].slice(5) };
      }
      if (linhas.every((l) => l.startsWith('- '))) return { tipo: 'ul', itens: linhas.map((l) => l.slice(2)) };
      if (linhas.every((l) => /^\d+\. /.test(l))) {
        return { tipo: 'ol', itens: linhas.map((l) => l.replace(/^\d+\. /, '')) };
      }
      if (linhas.some((l) => /^(#|- |\d+\. |>)/.test(l))) {
        throw new Error(`${slug}: bloco fora do formato — "${linhas[0].slice(0, 40)}"`);
      }
      return { tipo: 'p', texto: linhas.join(' ') };
    });
}

function ler(arquivo: string): Artigo {
  const bruto = readFileSync(join(PASTA, arquivo), 'utf8');
  const m = bruto.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${arquivo}: sem frontmatter`);
  const meta = JSON.parse(m[1]) as Omit<Artigo, 'corpo'>;
  return { ...meta, corpo: blocos(m[2], meta.slug) };
}

let cache: Artigo[] | null = null;

/** Todos os artigos, na ordem do PDF (01 a 14). */
export function todosArtigos(): Artigo[] {
  cache ??= readdirSync(PASTA)
    .filter((f) => f.endsWith('.md'))
    .map(ler)
    .sort((a, b) => a.numero - b.numero);
  return cache;
}

export const artigoPorSlug = (slug: string) => todosArtigos().find((a) => a.slug === slug);

/**
 * 2 ou 3 artigos relacionados: primeiro os que levam ao mesmo tratamento,
 * depois os da mesma categoria, na ordem do PDF.
 */
export function relacionados(artigo: Artigo, quantos = 3): Artigo[] {
  const outros = todosArtigos().filter((a) => a.slug !== artigo.slug);
  const pontos = (a: Artigo) =>
    (a.tratamentos.some((t) => artigo.tratamentos.includes(t)) ? 2 : 0) + (a.category === artigo.category ? 1 : 0);
  const proximos = outros
    .map((a) => ({ a, p: pontos(a) }))
    .filter((x) => x.p > 0)
    .sort((x, y) => y.p - x.p || x.a.numero - y.a.numero)
    .slice(0, quantos)
    .map((x) => x.a);
  // Artigo sozinho na categoria (ex.: semaglutida): completa com os de
  // prevencao mais proximos — gengiva —, para nunca ficar sem leitura seguinte.
  if (proximos.length < 2) {
    const extra = outros.filter((a) => a.category === 'Gengiva e Periodontia' && !proximos.includes(a));
    proximos.push(...extra.slice(0, 2 - proximos.length));
  }
  return proximos;
}

/** Data por extenso em portugues ("12 de outubro de 2026"). */
export const dataPorExtenso = (iso: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );
