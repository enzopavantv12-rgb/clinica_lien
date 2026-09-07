import { ImageOff } from 'lucide-react';
import larguras from '@/data/imagens.json';

const LARGURAS_POR_SLOT = larguras as Record<string, number[]>;

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
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: {
  dados: Dados;
  className?: string;
  width: number;
  height: number;
  prioridade?: boolean;
  proporcao?: string;
  sizes?: string;
}) {
  // Nome base sem extensao: /img/hero-dra-natalia.webp -> hero-dra-natalia
  const nomeBase = dados.src.replace(/^\/img\//, '').replace(/\.[^.]+$/, '');

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
        {/* O que o dono da foto precisa entregar e o ORIGINAL em
            assets/fotos-originais/ — o `npm run images` e que gera as
            variantes em /img/. Imprimir `dados.src` aqui mandava a pessoa
            criar um arquivo que o BrandImage nunca pede. */}
        <p className="max-w-[22ch] px-6 text-center text-[0.6875rem] leading-snug text-ink-muted/80">
          {`assets/fotos-originais/${nomeBase}.jpg`}
        </p>
      </div>
    );
  }

  // Nome renomeado para nao sombrear o import `larguras` de imagens.json.
  const largurasSlot = LARGURAS_POR_SLOT[nomeBase] ?? [];

  // Slot fora do mapa: sem isto os dois srcset saem vazios e o fallback vira
  // /img/<nome>-undefined.webp — um 404 silencioso, sem erro de tipo, e logo
  // na hora em que alguem esta justamente adicionando a foto. Avisa alto (o
  // gen-images.mjs faz o mesmo) e degrada para a imagem unica.
  if (largurasSlot.length === 0) {
    console.warn(
      `  aviso: "${nomeBase}" nao esta em src/data/imagens.json — sem srcset, servindo ${dados.src} direto.`,
    );
    return (
      <img
        src={dados.src}
        alt={dados.alt}
        width={width}
        height={height}
        loading={prioridade ? 'eager' : 'lazy'}
        {...(prioridade ? { fetchPriority: 'high' as const } : {})}
        decoding={prioridade ? 'sync' : 'async'}
        className={`${proporcao} w-full rounded-3xl object-cover ${className}`}
      />
    );
  }

  const srcset = (ext: string) =>
    largurasSlot.map((l) => `/img/${nomeBase}-${l}.${ext} ${l}w`).join(', ');
  const intermediaria = largurasSlot[Math.floor(largurasSlot.length / 2)];

  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/img/${nomeBase}-${intermediaria}.webp`}
        alt={dados.alt}
        width={width}
        height={height}
        loading={prioridade ? 'eager' : 'lazy'}
        // fetchPriority alto apenas na imagem do hero.
        {...(prioridade ? { fetchPriority: 'high' as const } : {})}
        decoding={prioridade ? 'sync' : 'async'}
        className={`${proporcao} w-full rounded-3xl object-cover ${className}`}
      />
    </picture>
  );
}
