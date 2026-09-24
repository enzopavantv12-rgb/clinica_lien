'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import VerticalMarqueeDemo from '@/components/ui/marquee-03';
import { depoimentos } from '@/data/content';

/**
 * Invólucro do marquee-03 com controle de pausa. O componente original so
 * pausa no hover, que nao existe no toque nem no teclado — e conteudo em
 * movimento por mais de 5s exige um controle (WCAG 2.2.2). O botao pausa
 * todas as pistas; com movimento reduzido ele some, porque nada se move.
 */
export function DepoimentosMarquee() {
  const [pausado, setPausado] = useState(false);
  const { faixa, google } = depoimentos;

  return (
    <div className="mt-12">
      <div className={pausado ? '[&_.animate-marquee-vertical]:[animation-play-state:paused]' : ''}>
        <VerticalMarqueeDemo />
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-legend font-medium text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta motion-reduce:hidden"
        >
          {pausado ? (
            <Play size={14} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Pause size={14} strokeWidth={2} aria-hidden="true" />
          )}
          {pausado ? faixa.retomar : faixa.pausar}
        </button>
        {google.url && (
          <a
            href={google.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded text-[0.9375rem] font-medium text-magenta underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
          >
            {faixa.verTodas}
          </a>
        )}
      </div>
    </div>
  );
}
