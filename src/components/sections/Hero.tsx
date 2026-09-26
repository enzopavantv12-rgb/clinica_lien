import type { CSSProperties } from 'react';
import { Star } from 'lucide-react';
import { Simbolo } from '../ui/BrandGraphics';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { depoimentos, hero } from '../../data/content';

const { imagem } = hero;
const srcset = (ext: string) => imagem.larguras.map((l) => `${imagem.base}-${l}.${ext} ${l}w`).join(', ');

/**
 * Quando a hero empilha (texto em cima, recorte vertical embaixo): celular e
 * tablet em pe. Espelha os breakpoints `hl`/`hlg` do tailwind.config.ts e o
 * preload de app/page.tsx.
 */
export const MEDIA_EMPILHADO = '(max-width: 767px), (max-width: 1279px) and (orientation: portrait)';
export const MEDIA_FUNDO = '(min-width: 1280px), (min-width: 768px) and (orientation: landscape)';

/** Atraso da entrada em sequencia (ver .hero-entra no globals.css). */
const ordem = (i: number) => ({ '--i': i }) as CSSProperties;

/**
 * Foto da hero. Uma unica <picture> para as duas composicoes:
 * - desktop e tablet deitado: camada de fundo absoluta, 16:9 em cover, presa
 *   em 70-72% / 10% (a foto tem pouco respiro acima da cabeca; com 30% na
 *   vertical, o topo da cabeca sumia em telas largas);
 * - celular e tablet em pe: recorte vertical 3:4 abaixo do texto, com o topo
 *   em arco.
 *
 * E o LCP: fetchPriority alto, sem lazy, e preload no <head> (app/page.tsx).
 */
function HeroFoto() {
  return (
    <div className="hero-arco relative mx-6 mb-14 aspect-[3/4] overflow-hidden sm:mx-8 sm:max-w-[520px] hl:absolute hl:inset-0 hl:m-0 hl:max-w-none hl:aspect-auto hl:rounded-none">
      <picture>
        <source media={MEDIA_EMPILHADO} type="image/avif" srcSet={`${imagem.mobile}.avif`} />
        <source media={MEDIA_EMPILHADO} type="image/webp" srcSet={`${imagem.mobile}.webp`} />
        <source type="image/avif" srcSet={srcset('avif')} sizes="100vw" />
        <source type="image/webp" srcSet={srcset('webp')} sizes="100vw" />
        <img
          src={`${imagem.base}-1440.webp`}
          alt={imagem.alt}
          width={imagem.width}
          height={imagem.height}
          fetchPriority="high"
          className="hero-foto h-full w-full object-cover object-[50%_20%] hl:object-[72%_10%] hlg:object-[70%_10%]"
        />
      </picture>
    </div>
  );
}

/**
 * Hero: foto de fundo com a Dra. Natalia no terco direito e o texto a
 * esquerda, sobre a area clara (veu `.hero-veu` so ate ~60% da largura).
 * No mobile: texto em cima, foto embaixo.
 *
 * Sem `Reveal`: a entrada e CSS puro (@keyframes). O `Reveal` gravaria
 * `style="opacity:0"` no HTML estatico e atrasaria o LCP ate a hidratacao.
 *
 * Um unico CTA, como pede o briefing: a conversao e uma so (WhatsApp).
 */
export function Hero() {
  const { nota, total, url } = depoimentos.google;
  const provaSocial = (
    <>
      <Star size={15} fill="currentColor" stroke="currentColor" aria-hidden="true" className="text-magenta" />
      <span>
        {nota} no Google · {total} avaliações
      </span>
    </>
  );

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-cream hl:flex hl:min-h-[clamp(640px,100svh,920px)] hl:items-center"
    >
      <div aria-hidden="true" className="hero-veu pointer-events-none absolute inset-0 z-[1] hidden hl:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-10 pt-[104px] sm:px-8 hl:pb-16 hl:pt-[120px] hlg:px-12 paisagem:pb-8 paisagem:pt-[96px]">
        <div className="max-w-[560px] hl:max-w-[480px] hlg:max-w-[560px]">
          {/* Selo branco translucido: o teal da marca em corpo pequeno so passa
              AA (4,5:1) sobre branco — sobre o creme e a foto ficava em ~4,3. */}
          <p
            className="hero-entra inline-flex rounded-full bg-white/90 px-3 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-teal sm:text-[0.8125rem]"
            style={ordem(0)}
          >
            {hero.tag}
          </p>

          <h1
            className="hero-entra mt-5 text-[2.125rem] font-bold leading-[1.08] text-ink hl:text-[2.625rem] hlg:text-[clamp(2.625rem,4.2vw,3.75rem)] paisagem:mt-4 paisagem:text-[clamp(1.875rem,3.4vw,3rem)]"
            style={ordem(1)}
          >
            {hero.h1Partes[0]}
            <span className="text-magenta">{hero.h1Partes[1]}</span>
          </h1>

          {/* Simbolo oficial da Lien (o sorriso), sob o titulo. */}
          <span className="hero-entra mt-4 block" style={ordem(2)}>
            <Simbolo variante="rgb" carregamento="eager" className="block h-auto w-[72px]" />
          </span>

          <p
            className="hero-entra mt-6 max-w-[46ch] text-[clamp(1rem,1.4vw,1.1875rem)] leading-[1.55] text-ink-muted paisagem:mt-4"
            style={ordem(3)}
          >
            {hero.sub}
          </p>

          <div className="hero-entra mt-8 paisagem:mt-6" style={ordem(4)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <WhatsAppButton
                origem="hero"
                variante="capsula"
                tamanho="capsula"
                className="w-full shadow-[0_10px_30px_-10px_rgba(156,23,129,0.55)] hover:shadow-[0_16px_36px_-12px_rgba(156,23,129,0.6)] sm:w-auto"
              >
                {hero.cta}
              </WhatsAppButton>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-center rounded text-[0.875rem] font-medium text-ink-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta sm:self-auto"
                >
                  {provaSocial}
                </a>
              ) : (
                <p className="inline-flex items-center gap-2 self-center text-[0.875rem] font-medium text-ink-muted sm:self-auto">
                  {provaSocial}
                </p>
              )}
            </div>
            <p className="mt-4 text-center text-[0.8125rem] text-ink-muted sm:text-left">{hero.microcopy}</p>
          </div>
        </div>
      </div>

      <HeroFoto />
    </section>
  );
}
