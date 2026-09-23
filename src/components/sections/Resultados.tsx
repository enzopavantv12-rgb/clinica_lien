'use client';

import { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SHOW_RESULTS, resultados } from '../../data/content';

type Caso = (typeof resultados.casos)[number];

/**
 * Comparador antes/depois com um <input type="range"> nativo: arrastavel no
 * mouse e no toque, e operavel por teclado (setas) sem codigo extra.
 * Sem zoom sensacionalista, sem seta "WOW". Imagens com loading lazy.
 */
function Comparador({ caso }: { caso: Caso }) {
  const [posicao, setPosicao] = useState(50);

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
        <img
          src={caso.depois.src}
          alt={caso.depois.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={caso.antes.src}
          alt={caso.antes.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - posicao}% 0 0)` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
          style={{ left: `${posicao}%` }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-legend text-white">
          {resultados.rotuloAntes}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-legend text-white">
          {resultados.rotuloDepois}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={posicao}
          onChange={(e) => setPosicao(Number(e.target.value))}
          aria-label={`${resultados.rotuloComparar}: ${caso.tratamento}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {/* Legenda obrigatoria em CADA caso (Resolucao CFO 196/2019). */}
      <figcaption className="mt-4">
        <p className="text-body font-semibold text-ink">{caso.tratamento}</p>
        <p className="mt-1 text-legend text-ink-muted">{resultados.autorizacao}</p>
        <p className="mt-0.5 text-legend text-ink-muted">{resultados.variacao}</p>
      </figcaption>
    </figure>
  );
}

/**
 * Resultados — antes e depois. Pronta e OCULTA: so aparece com SHOW_RESULTS
 * ligado e ao menos um caso autorizado cadastrado em content.ts.
 */
export function Resultados() {
  if (!SHOW_RESULTS || resultados.casos.length === 0) return null;

  return (
    <section id="resultados" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={resultados.tag} titulo={resultados.h2} />
        <ul className="mt-14 grid gap-10 md:grid-cols-2">
          {resultados.casos.map((caso, i) => (
            <Reveal as="li" key={caso.antes.src} delay={i * 0.08}>
              <Comparador caso={caso} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
