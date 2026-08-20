/**
 * Logotipo Lien.
 *
 * Regras do manual respeitadas pela construcao deste componente:
 * - Area de protecao X/2 em todos os lados, minimo de 10px no digital
 *   (aplicada via padding no wrapper).
 * - Sem sombra, sem contorno, sem distorcao (aspect ratio preservado
 *   pelo viewBox + `preserveAspectRatio` padrao).
 * - Duas versoes apenas: colorida (fundo branco/cream) e branca
 *   monocromatica (fundos magenta ou teal).
 *
 * O arquivo oficial deve substituir este desenho: /public/logo-lien.svg
 * Enquanto nao chegar, este componente reproduz a estrutura da marca
 * (palavra + curva do "sorriso" no `e` + assinatura) com os pesos e cores
 * corretos, para nao bloquear o desenvolvimento.
 */
export function Logo({
  variante = 'colorida',
  className = '',
  comAssinatura = true,
}: {
  variante?: 'colorida' | 'branca';
  className?: string;
  comAssinatura?: boolean;
}) {
  const corPalavra = variante === 'branca' ? '#FFFFFF' : '#9C1781';
  const corCurva = variante === 'branca' ? '#FFFFFF' : '#037E99';
  const corAssinatura = variante === 'branca' ? '#FFFFFF' : '#037E99';

  return (
    // p-[10px] garante o respiro digital minimo exigido pelo manual.
    <span className={`inline-block p-[10px] ${className}`}>
      <svg
        viewBox="0 0 200 68"
        role="img"
        aria-label="Lien Reabilitação Oral"
        className="h-full w-auto"
      >
        <text
          x="0"
          y="36"
          fill={corPalavra}
          fontFamily="Poppins, sans-serif"
          fontWeight={700}
          fontSize="40"
          letterSpacing="-1"
        >
          lien
        </text>
        {/* A curva do "sorriso": o arco teal que forma o `e`.
            Geometria mantida acima de y=46 para nao colidir com a
            assinatura (cujo topo de caixa fica em ~y=51). */}
        <path
          d="M60 39 Q81 48 102 39"
          fill="none"
          stroke={corCurva}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {comAssinatura && (
          <text
            x="1"
            y="60"
            fill={corAssinatura}
            fontFamily="Poppins, sans-serif"
            fontWeight={400}
            fontSize="9"
            letterSpacing="2.1"
          >
            REABILITAÇÃO ORAL
          </text>
        )}
      </svg>
    </span>
  );
}
