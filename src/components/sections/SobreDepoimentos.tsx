'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { CincoEstrelas } from '../ui/CincoEstrelas';
import { Marquee } from '../ui/Marquee';
import { Reveal } from '../ui/Reveal';
import { depoimentos } from '../../data/content';

type Avaliacao = (typeof depoimentos.itens)[number];

const iniciais = (nome: string) =>
  nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

function CardAvaliacao({ nome, texto }: Avaliacao) {
  return (
    <article className="w-full rounded-2xl border border-brandgray bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        {/* Iniciais no lugar da foto: preserva a privacidade do paciente. */}
        <div
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-magenta/10 text-sm font-semibold text-magenta"
        >
          {iniciais(nome)}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[0.9375rem] font-semibold leading-tight text-ink">{nome}</p>
          <div className="flex items-center gap-2">
            <CincoEstrelas tamanho={12} />
            <span className="text-legend text-ink-muted">{depoimentos.faixa.origem}</span>
          </div>
        </div>
      </div>
      <blockquote className="mt-4">
        <p className="text-body text-ink">{texto}</p>
      </blockquote>
    </article>
  );
}

/** Divide as avaliacoes em `n` colunas, alternando. */
const colunas = (n: number) =>
  Array.from({ length: n }, (_, c) => depoimentos.itens.filter((_, i) => i % n === c));

/**
 * Faixa de depoimentos da secao Sobre: marquee vertical, adaptado do
 * marquee-03 (21st.dev). So avaliacoes reais do Google — sem nenhuma
 * cadastrada (ou com menos que `minimoMarquee`), a faixa nao renderiza.
 *
 * - 1 coluna abaixo de 640px, 2 ate 1023px, 3 a partir de 1024px. Cada
 *   largura divide as avaliacoes pelo numero de colunas VISIVEIS — no
 *   original, a terceira coluna sumia entre 640 e 1023px e levava um terco
 *   das avaliacoes junto.
 * - 28s por volta (36s no mobile): devagar, no tom "consulta nao tem pressa".
 * - Pausa no hover e num botao (hover nao existe no toque nem no teclado, e
 *   movimento acima de 5s exige controle — WCAG 2.2.2).
 */
export function SobreDepoimentos() {
  const [pausado, setPausado] = useState(false);
  const { faixa, itens, minimoMarquee, google } = depoimentos;

  if (itens.length < minimoMarquee) return null;

  const pistas = (lista: Avaliacao[][], visibilidade: string, duracao: string) =>
    lista.map((coluna, i) => (
      <Marquee
        key={i}
        vertical
        pauseOnHover
        reverse={i % 2 === 1}
        duracao={duracao}
        className={`h-full flex-1 ${visibilidade}`}
      >
        {coluna.map((a, j) => (
          <CardAvaliacao key={`${a.nome}-${j}`} {...a} />
        ))}
      </Marquee>
    ));

  return (
    <Reveal y={0} duracao={0.8} className="mt-[72px] lg:mt-[120px]">
      <div className="text-center">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink-muted sm:text-[0.875rem]">
          {faixa.tag}
        </p>
        <h3 className="mt-3 text-[1.75rem] font-semibold leading-tight tracking-[-0.01em] text-magenta lg:text-[2.5rem]">
          {faixa.h3}
        </h3>
      </div>

      <div
        className={`relative mt-12 h-[440px] overflow-hidden sm:h-[500px] ${
          pausado ? '[&_.animate-marquee-vertical]:[animation-play-state:paused]' : ''
        }`}
      >
        <div className="flex h-full w-full gap-4">
          {pistas([itens as Avaliacao[]], 'flex sm:hidden', '36s')}
          {pistas(colunas(2), 'hidden sm:flex lg:hidden', '28s')}
          {pistas(colunas(3), 'hidden lg:flex', '28s')}
        </div>
        {/* Fade no topo e na base, na cor do fundo da secao. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cream" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream" />
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
    </Reveal>
  );
}
