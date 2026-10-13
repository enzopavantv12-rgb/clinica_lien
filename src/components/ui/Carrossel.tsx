'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const foco =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta';

/**
 * Carrossel com scroll nativo + scroll snap, sem biblioteca (padrao da secao
 * Consultorio, out/2026): setas, pontos, arraste e teclado (setas com o foco
 * no trilho). Sem autoplay. Espacador no fim do trilho para o ultimo slide
 * alinhar a esquerda e ativar o ultimo ponto.
 *
 * O trilho precisa de `position: relative` — senao o offsetLeft dos slides e
 * medido contra um ancestral e o primeiro clique pula para o fim.
 */
export function Carrossel({
  slides,
  rotulo,
  rotuloSlide,
  anterior,
  proximo,
  classeSlide,
  classeTrilho = '',
  gap = 16,
  centralizar = false,
}: {
  slides: ReactNode[];
  rotulo: string;
  /** "Vídeo" -> "Vídeo 1 de 3" (aria-label de cada slide e dos pontos). */
  rotuloSlide: string;
  anterior: string;
  proximo: string;
  classeSlide: string;
  classeTrilho?: string;
  gap?: number;
  /** Quando todos os slides cabem, centraliza e esconde os controles. */
  centralizar?: boolean;
}) {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  const [espacador, setEspacador] = useState(0);
  const [cabe, setCabe] = useState(false);
  const total = slides.length;

  const elementos = () =>
    Array.from(trilhoRef.current?.querySelectorAll<HTMLElement>('[data-slide]') ?? []);

  const irPara = (indice: number) => {
    const trilho = trilhoRef.current;
    const alvo = elementos()[indice];
    if (!trilho || !alvo) return;
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    trilho.scrollTo({ left: alvo.offsetLeft, behavior: reduzir ? 'auto' : 'smooth' });
  };

  // Slide ativo = o mais perto da borda esquerda do trilho.
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        let maisProximo = 0;
        let menor = Infinity;
        elementos().forEach((el, i) => {
          const d = Math.abs(el.offsetLeft - trilho.scrollLeft);
          if (d < menor) {
            menor = d;
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

  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const medir = () => {
      const lista = elementos();
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (!primeiro || !ultimo) return;
      const larguraSlides = ultimo.offsetLeft + ultimo.offsetWidth - primeiro.offsetLeft;
      const todosCabem = larguraSlides <= trilho.clientWidth + 1;
      setCabe(todosCabem);
      setEspacador(todosCabem ? 0 : Math.max(0, trilho.clientWidth - primeiro.offsetWidth - gap));
    };
    const observador = new ResizeObserver(medir);
    observador.observe(trilho);
    medir();
    return () => observador.disconnect();
  }, [gap]);

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
    <div role="region" aria-roledescription="carrossel" aria-label={rotulo}>
      <div
        ref={trilhoRef}
        tabIndex={0}
        onKeyDown={aoTeclar}
        style={{ gap }}
        className={`relative flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          centralizar && cabe ? 'justify-center' : ''
        } ${foco} ${classeTrilho}`}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            data-slide=""
            role="group"
            aria-roledescription="slide"
            aria-label={`${rotuloSlide} ${i + 1} de ${total}`}
            className={`flex-none snap-start ${classeSlide}`}
          >
            {slide}
          </div>
        ))}
        {espacador > 0 && <div aria-hidden="true" className="flex-none" style={{ width: espacador }} />}
      </div>

      {total > 1 && !(centralizar && cabe) && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-3.5">
            <button
              type="button"
              onClick={() => irPara(ativo - 1)}
              disabled={ativo === 0}
              aria-label={anterior}
              className={`${seta} ${foco}`}
            >
              <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => irPara(ativo + 1)}
              disabled={ativo === total - 1}
              aria-label={proximo}
              className={`${seta} ${foco}`}
            >
              <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => irPara(i)}
                aria-label={`Ir para: ${rotuloSlide.toLowerCase()} ${i + 1} de ${total}`}
                aria-current={i === ativo ? 'true' : undefined}
                className={`relative size-1.5 rounded-full transition-[background-color,transform] duration-200 after:absolute after:-inset-3 after:content-[""] ${
                  i === ativo ? 'scale-125 bg-magenta' : 'bg-ink-muted/70 hover:bg-ink'
                } ${foco}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
