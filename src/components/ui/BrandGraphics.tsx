/**
 * Ativos graficos complementares definidos no manual de marca.
 * Ambos como SVG inline — o manual proibe raster para esses elementos.
 */

let padraoId = 0;

/*
 * Geometria do padrao de ondas, reproduzida do manual.
 *
 * Caracteristicas do original que a implementacao precisa manter:
 *  - Arcos GROSSOS e AFILADOS: espessos no apice, terminando em ponta.
 *    Por isso sao paths PREENCHIDOS (dois arcos de raios diferentes que se
 *    encontram nas pontas), e nao linhas com stroke — stroke tem espessura
 *    constante e nao afina.
 *  - Cadeia DESCONTINUA: crista e vale nao se emendam. O vale fica um pouco
 *    deslocado, criando a mordida caracteristica nas juncoes.
 *  - Linhas alternadas deslocadas em meio periodo na horizontal.
 *  - Espacamento vertical entre linhas = meio periodo.
 */
/*
 * Proporcoes medidas sobre o print do manual, normalizadas para periodo = 100:
 *   periodo (crista -> crista)   ~305px -> 100
 *   profundidade do arco          ~50px ->  16   (AMP) — ~1/3 da largura
 *   espessura no apice            ~21px ->   7   (ESP)
 *   entrelinha                   ~165px ->  54   (ALT / 2)
 *
 * O tile e mais ALTO que largo por isso: com entrelinha 54 e amplitude 18, duas
 * linhas ocupam 108 unidades de altura. Tentar encaixar em um tile 100x100 faz
 * o vale de uma linha invadir a crista da linha de cima e o padrao vira uma
 * malha de estrelas em vez de ondas.
 */
const P = 100; // periodo completo (crista + vale)
const MEIO = P / 2;
const ALT = 108; // altura do tile: 2 linhas x 54 de entrelinha
const GAP = 2; // folga horizontal — mordida subtil, nao um vao
const LARG = MEIO - GAP; // largura de cada arco
const AMP = 16; // profundidade ~1/3 da largura, como no print (16/48)
const ESP = 7; // espessura maxima, no apice
const DESLOC_VALE = 3; // vale levemente abaixo da crista

/** Crescente com apice para CIMA, de (x, y) a (x + LARG, y). */
const crista = (x: number, y: number) =>
  `M${x},${y} Q${x + LARG / 2},${y - 2 * AMP} ${x + LARG},${y} ` +
  `Q${x + LARG / 2},${y - 2 * AMP + 2 * ESP} ${x},${y} Z`;

/** Crescente com apice para BAIXO, de (x, y) a (x + LARG, y). */
const vale = (x: number, y: number) =>
  `M${x},${y} Q${x + LARG / 2},${y + 2 * AMP} ${x + LARG},${y} ` +
  `Q${x + LARG / 2},${y + 2 * AMP - 2 * ESP} ${x},${y} Z`;

/**
 * Padrao de ondas: malha de arcos teal repetidos.
 * Uso previsto: textura de fundo em opacidade 4–8% (hero e CTA final).
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
  const id = `ondas-${++padraoId}`;

  // Duas linhas por tile: a segunda deslocada em meio periodo na horizontal.
  const linhaA = 27;
  const linhaB = 81;

  // Cada arco cabe inteiro dentro do tile (0..LARG e MEIO..MEIO+LARG), entao o
  // padrao fecha sem costura sem precisar de repeticoes nas bordas.
  const d = [
    crista(0, linhaA),
    vale(MEIO, linhaA + DESLOC_VALE),
    vale(0, linhaB + DESLOC_VALE),
    crista(MEIO, linhaB),
  ].join(' ');

  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ opacity: opacidade }}
    >
      <defs>
        <pattern
          id={id}
          width={P}
          height={ALT}
          patternUnits="userSpaceOnUse"
        >
          <path d={d} fill={cor} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * A curva do "sorriso" — o arco que forma o `e` do logotipo.
 * Reutilizada como elemento estrutural: underline sob headlines e divisor.
 */
export function CurvaSorriso({
  className = '',
  cor = '#037E99',
  espessura = 3,
}: {
  className?: string;
  cor?: string;
  espessura?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <path
        d="M2 4 Q60 20 118 4"
        stroke={cor}
        strokeWidth={espessura}
        strokeLinecap="round"
      />
    </svg>
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
