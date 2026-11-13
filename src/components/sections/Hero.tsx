import type { CSSProperties } from 'react';
import { CalendarDays } from 'lucide-react';
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
 * - desktop e tablet deitado: camada de fundo absoluta, 16:9 em cover, que
 *   comeca ABAIXO do menu flutuante (top 88px), para o menu nao cobrir o
 *   rosto (nov/2026); o topo da foto esfuma no creme (.hero-foto-desce);
 * - celular e tablet em pe: foto vertical propria (3:4) em tela cheia, abaixo
 *   do menu, com o texto centralizado sobre um veu creme na base (nov/2026).
 *
 * E o LCP: fetchPriority alto, sem lazy, e preload no <head> (app/page.tsx).
 */
function HeroFoto() {
  return (
    <div className="hero-foto-desce absolute inset-x-0 top-14 aspect-[3/4] overflow-hidden hl:bottom-0 hl:top-[88px] hl:aspect-auto">
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
          className="hero-foto h-full w-full object-cover object-[50%_0%] hl:object-[72%_10%] hlg:object-[70%_10%]"
        />
      </picture>
    </div>
  );
}

/**
 * Hero: foto de fundo com a Dra. Natalia no terco direito e o texto a
 * esquerda, com um veu branco suave so sob o texto. No mobile: foto vertical
 * em tela cheia e o texto centralizado na base, sobre um veu creme.
 *
 * Sem `Reveal`: a entrada e CSS puro (@keyframes). O `Reveal` gravaria
 * `style="opacity:0"` no HTML estatico e atrasaria o LCP ate a hidratacao.
 *
 * Layout do print da clinica (out/2026): sem selo, sem sorriso e sem a nota
 * do Google; um unico botao (WhatsApp).
 */
export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-cream hl:min-h-[clamp(640px,100svh,920px)] hl:flex-row hl:items-center hl:justify-start"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-8 pt-[max(56svh,410px)] text-center sm:px-8 hl:pb-16 hl:pt-[120px] hl:text-left hlg:px-12 paisagem:pb-8 paisagem:pt-[96px]">
        <div className="mx-auto max-w-[560px] hl:mx-0 hl:max-w-none">
          <h1
            className="hero-entra text-[1.75rem] font-bold leading-[1.12] text-ink sm:text-[2.5rem] hl:text-[2.75rem] hlg:text-[clamp(2.75rem,3.9vw,3.5rem)] paisagem:text-[clamp(1.875rem,3.6vw,3.25rem)]"
            style={ordem(0)}
          >
            <Linhas linhas={hero.h1Linhas} destaque="text-magenta" />
          </h1>

          <p
            className="hero-entra mt-4 text-[0.9rem] leading-[1.55] sm:text-[1.0625rem] text-ink hl:mt-8 hl:text-[clamp(1rem,1.4vw,1.25rem)] hl:leading-[1.45] paisagem:mt-5"
            style={ordem(1)}
          >
            <Linhas linhas={hero.textoLinhas} destaque="font-semibold" />
          </p>

          {/* CTA unico de conversao (WhatsApp, com icone de agenda). O 2o botao
              do print ("Conheca a Experiencia Lien") saiu a pedido (out/2026). */}
          <div className="hero-entra mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center hl:mt-10 hl:justify-start paisagem:mt-7" style={ordem(2)}>
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
          </div>
        </div>
      </div>

      {/* Veu branco suave so a esquerda, sob o texto, para o contraste (pedido
          da clinica, out/2026). Sem desfoque; zera antes do rosto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden bg-[linear-gradient(90deg,rgba(255,255,255,.72),rgba(255,255,255,.55)_32%,rgba(255,255,255,.2)_48%,rgba(255,255,255,0)_58%)] hl:block"
      />
      {/* Mobile: veu creme na base, sob o texto centralizado (claro e limpo,
          sem desfoque); o rosto, no alto, fica livre. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(250,248,246,0)_44%,rgba(250,248,246,.8)_58%,rgba(250,248,246,.95)_70%,#FAF8F6_84%)] hl:hidden"
      />
      <HeroFoto />
    </section>
  );
}
