'use client';

import { MoveHorizontal } from 'lucide-react';
import ImageCompare from '@/components/ui/image-compare';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FundoGrade } from '@/components/ui/background-snippets';
import larguras from '@/data/imagens.json';
import { resultados } from '@/data/content';

const LARGURAS = larguras as Record<string, number[]>;

/** Foto do caso com srcset AVIF/WebP (variantes de `npm run images`). */
function Foto({ src, alt }: { src: string; alt: string }) {
  const base = src.replace(/^\/img\//, '').replace(/\.[^.]+$/, '');
  const ws = LARGURAS[base] ?? [];
  const srcset = (ext: string) => ws.map((w) => `/img/${base}-${w}.${ext} ${w}w`).join(', ');
  const sizes = '(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px';
  return (
    <picture>
      <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={`/img/${base}-${ws[0]}.webp`}
        alt={alt}
        width={720}
        height={720}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}

/**
 * "Resultados que contam historias." — prova clinica (alinhamento final,
 * 3.3.1): 6 casos com o mesmo recorte quadrado, cada um num comparador
 * arrastavel. Resolucao CFO 196/2019: legenda de autorizacao em cada caso e o
 * aviso de individualidade dos resultados. Fica separada da prova emocional
 * (os videos de "Quem vive a Lien, conta.", na secao seguinte, sobre creme).
 */
export function Resultados() {
  const { casos, rotulos, instrucao } = resultados;

  return (
    <section id="resultados" className="relative isolate py-20 sm:py-24 lg:py-28">
      <FundoGrade />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={resultados.tag} titulo={resultados.h2} subtitulo={resultados.apoio} />

        <p className="mt-10 flex items-center justify-center gap-2 text-legend font-medium text-ink-muted">
          <MoveHorizontal size={16} strokeWidth={2} aria-hidden="true" className="text-magenta" />
          {instrucao}
        </p>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {casos.map((caso, i) => (
            <Reveal as="li" key={caso.id} delay={(i % 3) * 0.06}>
              <figure className="rounded-[1.75rem] border border-brandgray bg-white p-2.5 shadow-soft">
                <ImageCompare
                  before={<Foto {...caso.antes} />}
                  after={<Foto {...caso.depois} />}
                  labels={rotulos}
                  label={`${resultados.rotuloComparar}, caso ${i + 1}`}
                  aspectRatio="1 / 1"
                />
                <figcaption className="px-2 pb-1 pt-3 text-legend text-ink-muted">{resultados.autorizacao}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-center text-legend text-ink-muted">{resultados.variacao}</p>
      </div>
    </section>
  );
}
