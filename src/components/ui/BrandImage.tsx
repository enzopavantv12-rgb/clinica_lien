import { ImageOff } from 'lucide-react';

type Dados = { src: string; alt: string; pendente?: boolean };

/**
 * Imagem de marca com placeholder explicito.
 *
 * Regras inegociaveis do prompt mestre implementadas aqui:
 * - Nunca banco de imagens. Se a foto real nao existe, aparece um placeholder
 *   visivel marcado [FOTO PENDENTE] — nunca uma stock photo.
 * - Nunca avatar com iniciais no corpo clinico.
 * - `alt` descritivo com palavra-chave local e obrigatorio (vem de content.ts).
 * - `width`/`height` explicitos para evitar CLS.
 */
export function BrandImage({
  dados,
  className = '',
  width,
  height,
  prioridade = false,
  proporcao = 'aspect-[4/5]',
}: {
  dados: Dados;
  className?: string;
  width: number;
  height: number;
  prioridade?: boolean;
  proporcao?: string;
}) {
  if (dados.pendente) {
    return (
      <div
        className={`flex ${proporcao} w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-ink/20 bg-brandgray ${className}`}
        role="img"
        aria-label={dados.alt}
      >
        <ImageOff size={28} className="text-ink-muted" aria-hidden="true" />
        <p className="px-6 text-center text-legend font-semibold uppercase tracking-[0.14em] text-ink-muted">
          [Foto pendente]
        </p>
        <p className="max-w-[22ch] px-6 text-center text-[0.6875rem] leading-snug text-ink-muted/80">
          {dados.src}
        </p>
      </div>
    );
  }

  return (
    <img
      src={dados.src}
      alt={dados.alt}
      width={width}
      height={height}
      loading={prioridade ? 'eager' : 'lazy'}
      // fetchPriority alto apenas na imagem do hero.
      {...(prioridade ? { fetchPriority: 'high' as const } : {})}
      decoding={prioridade ? 'sync' : 'async'}
      className={`${proporcao} w-full rounded-3xl object-cover ${className}`}
    />
  );
}
