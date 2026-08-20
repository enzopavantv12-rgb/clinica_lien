import { CurvaSorriso } from './BrandGraphics';
import { Reveal } from './Reveal';

/**
 * Cabecalho padrao de secao: tag em caixa alta + H2 + subtitulo opcional.
 * A curva do "sorriso" entra como underline sob o H2 (elemento estrutural
 * previsto no manual).
 */
export function SectionHeading({
  tag,
  titulo,
  subtitulo,
  claro = false,
  centralizado = true,
  comCurva = true,
}: {
  tag?: string;
  titulo: string;
  subtitulo?: string;
  claro?: boolean;
  centralizado?: boolean;
  comCurva?: boolean;
}) {
  const corTitulo = claro ? 'text-white' : 'text-ink';
  const corSub = claro ? 'text-white/85' : 'text-ink-muted';
  const corTag = claro ? 'text-white/75' : 'text-teal';
  const alinhamento = centralizado ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alinhamento}`}>
      {tag && (
        <Reveal>
          <p
            className={`text-tag sm:text-tag-lg font-semibold uppercase ${corTag}`}
            style={{ letterSpacing: '0.18em' }}
          >
            {tag}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          className={`mt-3 max-w-prose text-h2 sm:text-h2-lg font-bold ${corTitulo} ${
            centralizado ? 'mx-auto' : ''
          }`}
        >
          {titulo}
        </h2>
      </Reveal>
      {comCurva && (
        <Reveal delay={0.12}>
          <CurvaSorriso
            className="mt-4 h-3 w-28"
            cor={claro ? '#F0B6F2' : '#037E99'}
          />
        </Reveal>
      )}
      {subtitulo && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 max-w-prose text-sub sm:text-sub-lg ${corSub} ${
              centralizado ? 'mx-auto' : ''
            }`}
          >
            {subtitulo}
          </p>
        </Reveal>
      )}
    </div>
  );
}
