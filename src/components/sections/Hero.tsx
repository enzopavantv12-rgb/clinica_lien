import type { CSSProperties } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { hero } from '../../data/content';

const { imagem } = hero;
const srcset = (ext: string) => imagem.larguras.map((l) => `${imagem.base}-${l}.${ext} ${l}w`).join(', ');

/**
 * Quando a hero empilha (texto em cima, recorte vertical embaixo): celular e
 * tablet em pe. Espelha os breakpoints `hl`/`hlg` do tailwind.config.ts e o
 * preload de app/page.tsx.
 */
export const MEDIA_EMPILHADO = '(max-width: 767px), (max-width: 1279px) and (orientation: portrait)';
export const MEDIA_FUNDO = '(min-width: 1280px), (min-width: 768px) and (orientation: landscape)';

/** Linhas do print: quebra so no layout lado a lado; no celular, texto corrido. */
function Linhas({
  linhas,
  destaque,
}: {
  linhas: readonly (readonly { texto: string; destaque?: boolean }[])[];
  destaque: string;
}) {
  return linhas.map((linha, i) => (
    <span key={i}>
      {i > 0 && (
        <>
          <br className="hidden hl:inline" />
          <span className="hl:hidden"> </span>
        </>
      )}
      {linha.map((p, j) => (p.destaque ? <span key={j} className={destaque}>{p.texto}</span> : p.texto))}
    </span>
  ));
}

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
 * esquerda, direto sobre a parede clara da foto — sem veu nem desfoque, por
 * pedido da clinica (out/2026). No mobile: texto em cima, foto embaixo.
 *
 * Sem `Reveal`: a entrada e CSS puro (@keyframes). O `Reveal` gravaria
 * `style="opacity:0"` no HTML estatico e atrasaria o LCP ate a hidratacao.
 *
 * Layout do print da clinica (out/2026): sem selo, sem sorriso e sem a nota
 * do Google; dois botoes — o CTA de WhatsApp e o convite para a Experiencia.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-cream hl:flex hl:min-h-[clamp(640px,100svh,920px)] hl:items-center"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-10 pt-[104px] sm:px-8 hl:pb-16 hl:pt-[120px] hlg:px-12 paisagem:pb-8 paisagem:pt-[96px]">
        <div className="max-w-[560px] hl:max-w-none">
          <h1
            className="hero-entra text-[2.125rem] font-bold leading-[1.08] text-ink hl:text-[2.75rem] hlg:text-[clamp(2.75rem,3.9vw,3.5rem)] paisagem:text-[clamp(1.875rem,3.6vw,3.25rem)]"
            style={ordem(0)}
          >
            <Linhas linhas={hero.h1Linhas} destaque="text-magenta" />
          </h1>

          <p
            className="hero-entra mt-8 text-[clamp(1rem,1.4vw,1.25rem)] font-light leading-[1.45] text-ink-muted paisagem:mt-5"
            style={ordem(1)}
          >
            <Linhas linhas={hero.textoLinhas} destaque="font-medium text-ink" />
          </p>

          {/* Dois botoes, como no print da clinica (out/2026): o CTA de conversao
              (WhatsApp, com icone de agenda) e o convite para a Experiencia. */}
          <div className="hero-entra mt-10 flex flex-col gap-4 sm:flex-row sm:items-center paisagem:mt-7" style={ordem(2)}>
            <WhatsAppButton
              origem="hero"
              variante="capsula"
              tamanho="capsula"
              comIcone={false}
              className="w-full !px-8 text-[1.1875rem] shadow-[0_10px_30px_-10px_rgba(156,23,129,0.55)] hover:shadow-[0_16px_36px_-12px_rgba(156,23,129,0.6)] sm:w-auto sm:min-w-[300px] sm:!px-10"
            >
              <CalendarDays size={20} strokeWidth={2.2} aria-hidden="true" />
              {hero.cta}
            </WhatsAppButton>
            <a
              href={hero.cta2.href}
              className="inline-flex h-14 w-full items-center justify-center gap-4 rounded-full bg-[linear-gradient(90deg,#0B6489,#118DAE)] px-7 text-center text-base font-semibold leading-[1.2] sm:px-8 sm:text-left sm:text-[1.0625rem] text-white shadow-[0_10px_30px_-12px_rgba(3,126,153,0.55)] transition-all duration-300 ease-brand hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal motion-safe:hover:-translate-y-0.5 sm:w-auto"
            >
              <span>
                {hero.cta2.linhas[0]} <br className="hidden sm:inline" />
                {hero.cta2.linhas[1]}
              </span>
              <ArrowRight size={20} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <HeroFoto />
    </section>
  );
}
