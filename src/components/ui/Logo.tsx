/**
 * Logotipo Lien — arquivos oficiais enviados pela clinica.
 *
 * Originais em assets/Pastas/; as versoes servidas saem de `npm run marca`.
 *
 * Regras do manual respeitadas pela construcao deste componente:
 * - Area de protecao minima de 10px no digital, aplicada via padding no
 *   wrapper (os arquivos gerados tem as bordas transparentes aparadas).
 * - Sem sombra, sem contorno, sem distorcao: so a altura e fixada, e a
 *   largura segue a proporcao natural do arquivo.
 * - Duas versoes: colorida (fundo branco/cream) e branca (fundos escuros,
 *   magenta ou teal).
 */
const ARQUIVOS = {
  // width/height sao as dimensoes dos arquivos gerados. So servem para o
  // navegador reservar o espaco antes do carregamento — a proporcao exibida e
  // sempre a do arquivo, entao nao ha distorcao se ele for regerado.
  colorida: { src: '/marca/logo-rgb.png', webp: '/marca/logo-rgb-320.webp', width: 600, height: 302 },
  branca: { src: '/marca/logo-branca.png', webp: '/marca/logo-branca-320.webp', width: 600, height: 283 },
} as const;

export function Logo({
  variante = 'colorida',
  className = '',
}: {
  variante?: keyof typeof ARQUIVOS;
  className?: string;
}) {
  const arquivo = ARQUIVOS[variante];

  return (
    // p-[10px] garante o respiro digital minimo exigido pelo manual.
    <span className={`inline-block p-[10px] ${className}`}>
      {/* WebP de 320px (~5 KB) para a tela; o PNG de 600px fica de fallback. */}
      <picture className="block h-full">
        <source type="image/webp" srcSet={arquivo.webp} />
        <img
          src={arquivo.src}
          width={arquivo.width}
          height={arquivo.height}
          alt="Lien Reabilitação Oral"
          className="h-full w-auto"
          decoding="async"
        />
      </picture>
    </span>
  );
}
