/**
 * Ativos graficos complementares da marca.
 *
 * A padronagem e o simbolo usam os arquivos oficiais enviados pela clinica
 * (originais em assets/Pastas/, versoes servidas geradas por `npm run marca`).
 */

const PADRONAGEM = '/marca/padronagem.webp';

/**
 * Padronagem oficial da Lien: o simbolo do sorriso repetido em ondas.
 * Uso previsto: textura de fundo em opacidade 4–8% (hero e CTA final).
 *
 * O arquivo e branco sobre transparente, entao entra como MASCARA CSS: o
 * canal alfa recorta a forma e o `background-color` pinta. Um unico arquivo
 * serve em qualquer cor — teal sobre branco no hero, branco sobre magenta no
 * CTA final.
 *
 * Vai inteiro, com `cover`, sem retalhar em mosaico: o arquivo tem margens
 * desiguais (topo e base diferentes) e nao fecha sem emenda se repetido.
 */
export function PadraoOndas({
  className = '',
  cor = '#037E99',
  opacidade = 0.08,
}: {
  className?: string;
  cor?: string;
  opacidade?: number;
}) {
  const mascara = `url(${PADRONAGEM})`;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        opacity: opacidade,
        backgroundColor: cor,
        WebkitMaskImage: mascara,
        maskImage: mascara,
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}

const SIMBOLOS = {
  rgb: '/marca/simbolo-rgb.png', //       teal — sobre fundos claros
  cyano: '/marca/simbolo-cyano.png', //   ciano — sobre fundos escuros
  negativo: '/marca/simbolo-negativo.png', // branco — sobre magenta/teal
} as const;

/**
 * O simbolo da Lien — o sorriso que forma o `e` do logotipo.
 * Usado como elemento estrutural: underline sob os titulos de secao.
 * Decorativo: `alt` vazio, o titulo ao lado ja carrega o significado.
 */
export function Simbolo({
  variante = 'rgb',
  className = '',
  carregamento = 'lazy',
}: {
  variante?: keyof typeof SIMBOLOS;
  className?: string;
  /** `eager` quando aparece logo na abertura da pagina (hero). */
  carregamento?: 'lazy' | 'eager';
}) {
  return (
    <img
      src={SIMBOLOS[variante]}
      // Dimensoes dos arquivos gerados (as tres variacoes tem as mesmas). So
      // reservam o espaco antes do carregamento: a proporcao exibida e a
      // natural do arquivo, entao o simbolo nunca e distorcido.
      width={480}
      height={203}
      alt=""
      aria-hidden="true"
      className={className}
      loading={carregamento}
      decoding="async"
    />
  );
}

/** Divisor curvo entre blocos, derivado da mesma geometria do logo. */
export function DivisorCurvo({
  className = '',
  cor = '#FAF8F6',
  invertido = false,
}: {
  className?: string;
  cor?: string;
  invertido?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={
          invertido
            ? 'M0 64 Q720 -8 1440 64 L1440 64 L0 64 Z'
            : 'M0 0 Q720 72 1440 0 L1440 0 L0 0 Z'
        }
        fill={cor}
      />
    </svg>
  );
}

/**
 * O arco do sorriso (a curva do `e` da Lien) em traco teal — acento das
 * citacoes e do "Proximo passo" dos artigos. Decorativo.
 */
export function ArcoSorriso({ className = '', cor = '#037E99' }: { className?: string; cor?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 34" fill="none" aria-hidden="true" focusable="false">
      <path d="M4 4 Q60 56 116 4" stroke={cor} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Arco grande do sorriso em azul-claro — decoracao da grade de /tratamentos/
 * (preenche o espaco vazio da ultima linha). Desenha o traco ao aparecer
 * (.arco-desenha, globals.css), sem animacao com movimento reduzido.
 */
export function ArcoGrande({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 380 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ filter: 'drop-shadow(0 18px 30px rgba(104,192,212,.25))' }}
    >
      <path
        className="arco-desenha"
        pathLength={1}
        d="M20 22 Q190 196 360 22"
        stroke="#68C0D4"
        strokeOpacity={0.85}
        strokeWidth={22}
        strokeLinecap="round"
      />
    </svg>
  );
}
