import { execSync } from 'node:child_process';

/**
 * Data (AAAA-MM-DD) do ultimo commit que mexeu nos arquivos dados. So roda no
 * build. Sem git (ou com clone raso que nao cobre o arquivo), devolve a
 * reserva. Usado no lastmod do sitemap e no dateModified dos artigos.
 */
export function dataGit(arquivos: string[], reserva: string): string {
  try {
    const d = execSync(`git log -1 --format=%cs -- ${arquivos.map((a) => `"${a}"`).join(' ')}`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : reserva;
  } catch {
    return reserva;
  }
}
