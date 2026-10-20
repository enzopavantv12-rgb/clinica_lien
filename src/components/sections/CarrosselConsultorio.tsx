'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import larguras from '@/data/imagens.json';
import { sobre } from '@/data/content';

const LARGURAS = larguras as Record<string, number[]>;

const seta =
  'grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/80 text-ink shadow-[0_6px_18px_-8px_rgba(26,20,32,.35)] backdrop-blur-sm transition-colors hover:bg-white hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta';

/**
 * Carrossel das fotos do consultorio na secao "Lien quer dizer vinculo."
 * (pedido da clinica, out/2026), no lugar da foto unica.
 *
 * - Uma foto por vez, em loop, recorte vertical 4:5 (as duas fotos novas sao
 *   verticais; a horizontal entra com o foco na cadeira e na janela).
 * - Passa sozinho a cada 5 s; pausa no hover e no foco (regiao inteira), e pelo botao
 *   (WCAG 2.2.2). Movimento reduzido: sem autoplay e troca instantanea.
 * - Setas sobre a foto, pontos abaixo; setas do teclado com o foco na regiao.
 * - So a 1a foto carrega de cara (lazy nas demais).
 */
export function CarrosselConsultorio() {
  const { fotos, carrossel } = sobre;
  const [reduzir, setReduzir] = useState(false);
  const autoplay = useRef(
    Autoplay({ delay: 5000, playOnInit: false, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: false }),
  );
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, duration: 30 }, [autoplay.current]);
  const [selecionado, setSelecionado] = useState(0);
  const [pausado, setPausado] = useState(false);
  // Hover e foco contam na regiao inteira (setas e pontos inclusos): o
  // stopOnMouseEnter do plugin so ve o viewport, e o clique na seta somado a
  // passagem automatica pulava duas fotos.
  const [hover, setHover] = useState(false);
  const [foco, setFoco] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const aoMudar = () => setReduzir(mql.matches);
    aoMudar();
    mql.addEventListener('change', aoMudar);
    return () => mql.removeEventListener('change', aoMudar);
  }, []);

  useEffect(() => {
    if (!embla) return;
    const aoSelecionar = () => setSelecionado(embla.selectedScrollSnap());
    aoSelecionar();
    embla.on('select', aoSelecionar).on('reInit', aoSelecionar);
    return () => {
      embla.off('select', aoSelecionar).off('reInit', aoSelecionar);
    };
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    if (reduzir || pausado || hover || foco) autoplay.current.stop();
    else autoplay.current.play();
  }, [embla, reduzir, pausado, hover, foco]);

  const ir = (fn: 'scrollPrev' | 'scrollNext') => embla?.[fn](reduzir);
  const irPara = (i: number) => embla?.scrollTo(i, reduzir);

  const aoTeclar = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      ir('scrollPrev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      ir('scrollNext');
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={carrossel.rotulo}
      onKeyDown={aoTeclar}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setFoco(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFoco(false);
      }}
    >
      <div className="relative">
        <div
          ref={viewportRef}
          className="overflow-hidden rounded-[24px] shadow-[0_20px_40px_-24px_rgba(26,20,32,.18)] lg:rounded-[28px]"
        >
          {/* Respiro de 16px entre slides (-ml-4/pl-4): sem ele, o arredondamento
              subpixel mostrava 1px da foto vizinha na borda. */}
          <ul className="-ml-4 flex touch-pan-y">
            {fotos.map((f, i) => {
              const ws = LARGURAS[f.base] ?? [];
              const srcset = (ext: string) => ws.map((l) => `/img/${f.base}-${l}.${ext} ${l}w`).join(', ');
              // Recorte 4:5 em cover: a foto horizontal precisa de ~2,2x a largura do quadro.
              const sizes = f.width > f.height ? '(max-width: 1024px) 200vw, 1200px' : '(max-width: 1024px) 92vw, 540px';
              return (
                <li
                  key={f.base}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${fotos.length}`}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4"
                >
                  <picture>
                    <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
                    <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
                    <img
                      src={`/img/${f.base}-${ws[Math.floor(ws.length / 2)]}.webp`}
                      alt={f.alt}
                      width={f.width}
                      height={f.height}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                      className="aspect-[4/5] w-full select-none object-cover"
                      style={{ objectPosition: f.foco }}
                    />
                  </picture>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
          <button type="button" onClick={() => ir('scrollPrev')} aria-label={carrossel.anterior} className={`${seta} pointer-events-auto`}>
            <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => ir('scrollNext')} aria-label={carrossel.proxima} className={`${seta} pointer-events-auto`}>
            <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          {fotos.map((f, i) => (
            <button
              key={f.base}
              type="button"
              onClick={() => irPara(i)}
              aria-label={`${carrossel.irPara} ${i + 1} de ${fotos.length}`}
              aria-current={i === selecionado ? 'true' : undefined}
              className={`relative h-2 rounded-full transition-all duration-300 after:absolute after:-inset-2.5 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta ${
                i === selecionado ? 'w-6 bg-magenta' : 'w-2 bg-brandgray hover:bg-ink-muted/50'
              }`}
            />
          ))}
        </div>
        {!reduzir && (
          <button
            type="button"
            onClick={() => setPausado((p) => !p)}
            aria-label={pausado ? carrossel.retomar : carrossel.pausar}
            aria-pressed={pausado}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
          >
            {pausado ? <Play size={15} strokeWidth={2} aria-hidden="true" /> : <Pause size={15} strokeWidth={2} aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
