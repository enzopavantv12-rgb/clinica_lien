/**
 * Ativos graficos complementares definidos no manual de marca.
 * Ambos como SVG inline — o manual proibe raster para esses elementos.
 */

let padraoId = 0;

/**
 * Padrao de ondas: malha de arcos teal repetidos.
 * Uso previsto: textura de fundo em opacidade 4–8% (hero e CTA final).
 */
export function PadraoOndas({
  className = '',
  cor = '#037E99',
  opacidade = 0.06,
}: {
  className?: string;
  cor?: string;
  opacidade?: number;
}) {
  const id = `ondas-${++padraoId}`;
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ opacity: opacidade }}
    >
      <defs>
        <pattern id={id} width="72" height="36" patternUnits="userSpaceOnUse">
          <path
            d="M0 28 Q18 8 36 28 T72 28"
            fill="none"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M-36 10 Q-18 -10 0 10 T36 10"
            fill="none"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M36 10 Q54 -10 72 10 T108 10"
            fill="none"
            stroke={cor}
            strokeWidth="2"
            strokeLinecap="round"
          />
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
