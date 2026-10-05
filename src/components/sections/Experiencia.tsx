'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Asterisk, ChevronLeft, ChevronRight } from 'lucide-react';
import { FundoGrade } from '../ui/background-snippets';
import { Reveal } from '../ui/Reveal';
import larguras from '../../data/imagens.json';
import { experiencia } from '../../data/content';
import { whatsappUrlPor } from '../../lib/whatsapp';
import { trackWhatsAppClick } from '../../lib/tracking';

const LARGURAS = larguras as Record<string, number[]>;
const { consultorio } = experiencia;

/** Foto do card com srcset AVIF/WebP (variantes de `npm run images`). */
function Foto({ src, alt, posicao }: { src: string; alt: string; posicao: string }) {
  const base = src.replace(/^\/img\//, '').replace(/\.[^.]+$/, '');
  const ws = LARGURAS[base] ?? [];
  const srcset = (ext: string) => ws.map((w) => `/img/${base}-${w}.${ext} ${w}w`).join(', ');
  const sizes = '(max-width: 767px) 82vw, (max-width: 1023px) 44vw, 520px';
  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/img/${base}-${ws[1] ?? ws[0]}.webp`}
        alt={alt}
        width={720}
        height={720}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
        style={{ objectPosition: posicao }}
      />
    </picture>
  );
}

const foco =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta';

/**
 * Consultorio — modelo "secao-consultorio" (out/2026): texto curto com o
 * botao de agendamento a esquerda e carrossel de fotos a direita, sangrando
 * ate a borda da tela.
 *
 * - Tipografia so do manual (Poppins): H2 no mesmo estilo das outras secoes.
 *   A Poppins e mais larga que a fonte da referencia: "Um espaco pensado
 *   para" mede 565px no H2, entao a coluna do titulo vai a 570px (>= 1280px)
 *   para manter as duas linhas com a quebra depois de "para".
 *   O destaque do titulo vai so pela cor: o italico da Poppins nao esta entre
 *   os pesos autorizados (nem carregado).
 * - Cores da referencia trocadas pelos tokens da Lien (magenta no destaque,
 *   no botao e no ponto ativo; ink nas setas).
 * - Carrossel com scroll nativo + scroll snap, sem biblioteca. Setas, pontos,
 *   arraste e teclado. Espacador no fim do trilho para o ultimo card alinhar
 *   a esquerda e ativar o ultimo ponto. Sem autoplay.
 * - id "experiencia" mantido: e a ancora do menu.
 */
export function Experiencia() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  const [espacador, setEspacador] = useState(0);
  const total = consultorio.fotos.length;

  const slides = () =>
    Array.from(trilhoRef.current?.querySelectorAll<HTMLElement>('[data-slide]') ?? []);

  const irPara = (indice: number) => {
    const trilho = trilhoRef.current;
    const alvo = slides()[indice];
    if (!trilho || !alvo) return;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    trilho.scrollTo({ left: alvo.offsetLeft, behavior: reduzir ? 'auto' : 'smooth' });
  };

  // Slide ativo = o card mais perto da borda esquerda do trilho.
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        let maisProximo = 0;
        let menorDistancia = Infinity;
        slides().forEach((slide, i) => {
          const distancia = Math.abs(slide.offsetLeft - trilho.scrollLeft);
          if (distancia < menorDistancia) {
            menorDistancia = distancia;
            maisProximo = i;
          }
        });
        setAtivo(maisProximo);
      });
    };
    trilho.addEventListener('scroll', aoRolar, { passive: true });
    return () => {
      trilho.removeEventListener('scroll', aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  // Espacador = largura visivel do trilho menos um card (e o gap que o
  // separa): sem ele o ultimo card nao encosta na esquerda.
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const medir = () => {
      const card = slides()[0];
      if (!card) return;
      setEspacador(Math.max(0, trilho.clientWidth - card.offsetWidth - 16));
    };
    const observador = new ResizeObserver(medir);
    observador.observe(trilho);
    medir();
    return () => observador.disconnect();
  }, []);

  const aoTeclar = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      irPara(Math.min(ativo + 1, total - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      irPara(Math.max(ativo - 1, 0));
    }
  };

  const seta =
    'relative flex size-11 items-center justify-center rounded-full border transition-colors duration-200 lg:size-10 lg:after:absolute lg:after:-inset-0.5 lg:after:content-[""] disabled:cursor-not-allowed disabled:border-brandgray disabled:text-ink/30 enabled:border-ink enabled:text-ink enabled:hover:bg-ink enabled:hover:text-white';

  return (
    <section
      id="experiencia"
      aria-labelledby="consultorio-titulo"
      className="relative isolate overflow-x-clip py-16 md:py-24"
    >
      <FundoGrade />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,580px)_minmax(0,1fr)] xl:gap-[104px]">
          {/* Texto */}
          <Reveal>
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-brandgray bg-cream px-[11px] text-tag font-semibold uppercase tracking-[0.18em] text-teal">
              <Asterisk size={10} strokeWidth={3} aria-hidden="true" />
              {consultorio.tag}
            </span>
            <h2
              id="consultorio-titulo"
              className="mt-4 text-h2 font-bold text-ink sm:text-h2-lg xl:max-w-[570px]"
            >
              <span className="text-magenta">{consultorio.tituloDestaque}</span> {consultorio.tituloResto}
            </h2>
            <p className="mt-6 text-body text-ink-muted sm:text-body-lg lg:max-w-[435px]">{consultorio.texto}</p>
            <a
              href={whatsappUrlPor('experiencia')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('experiencia')}
              data-cta="experiencia"
              className={`group mt-[30px] inline-flex h-11 items-center gap-3 rounded-full bg-magenta pl-[18px] pr-[9px] text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-[#AD2192] ${foco}`}
            >
              {consultorio.cta}
              <span className="sr-only"> (abre o WhatsApp)</span>
              <span className="flex size-[26px] items-center justify-center rounded-full bg-white text-magenta">
                <ArrowUpRight
                  size={12}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </span>
            </a>
          </Reveal>

          {/* Carrossel */}
          <Reveal delay={0.1} className="min-w-0">
            <div
              role="region"
              aria-roledescription="carrossel"
              aria-label={consultorio.regiao}
              className="-mr-5 sm:-mr-8 xl:mr-[calc(-1*((100vw-1200px)/2+2rem))]"
            >
              <div
                ref={trilhoRef}
                tabIndex={0}
                onKeyDown={aoTeclar}
                className={`relative flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-l-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${foco}`}
              >
                {consultorio.fotos.map((foto, i) => (
                  <figure
                    key={foto.src}
                    data-slide=""
                    aria-label={`Foto ${i + 1} de ${total}`}
                    className="aspect-square w-[82vw] flex-none snap-start overflow-hidden rounded-2xl bg-brandgray md:w-[clamp(280px,44vw,420px)] lg:w-[clamp(280px,38.6vw,520px)]"
                  >
                    <Foto {...foto} />
                  </figure>
                ))}
                <div aria-hidden="true" className="flex-none" style={{ width: espacador }} />
              </div>
            </div>

            {/* Controles: setas a esquerda, pontos alinhados a margem direita do container. */}
            <div className="mt-6 flex items-center justify-between md:mt-10">
              <div className="flex gap-3.5">
                <button
                  type="button"
                  onClick={() => irPara(ativo - 1)}
                  disabled={ativo === 0}
                  aria-label={consultorio.anterior}
                  className={`${seta} ${foco}`}
                >
                  <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => irPara(ativo + 1)}
                  disabled={ativo === total - 1}
                  aria-label={consultorio.proxima}
                  className={`${seta} ${foco}`}
                >
                  <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                {consultorio.fotos.map((foto, i) => (
                  <button
                    key={foto.src}
                    type="button"
                    onClick={() => irPara(i)}
                    aria-label={`Ir para a foto ${i + 1} de ${total}`}
                    aria-current={i === ativo ? 'true' : undefined}
                    className={`relative size-1.5 rounded-full transition-[background-color,transform] duration-200 after:absolute after:-inset-3 after:content-[""] ${
                      i === ativo ? 'scale-125 bg-magenta' : 'bg-ink-muted/70 hover:bg-ink'
                    } ${foco}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
