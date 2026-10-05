'use client';

import { MoveHorizontal } from 'lucide-react';
import ImageCompare from '@/components/ui/image-compare';
import { Reveal } from '@/components/ui/Reveal';
import larguras from '@/data/imagens.json';
import { depoimentos, resultados } from '@/data/content';

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
 * Antes e depois na secao de depoimentos, logo abaixo do titulo: cada caso num
 * comparador arrastavel (ImageCompare). Resolucao CFO 196/2019: so pares
 * confirmados pela clinica, com autorizacao escrita e sem edicao do resultado;
 * legenda de autorizacao em cada caso e o aviso de que os resultados variam.
 */
export function AntesDepois() {
  const { casos, rotulos, instrucao } = depoimentos.antesDepois;
  if ((casos as readonly unknown[]).length === 0) return null;

  return (
    <div className="mx-auto mt-12 max-w-[1200px]">
      <p className="flex items-center justify-center gap-2 text-legend font-medium text-ink-muted">
        <MoveHorizontal size={16} strokeWidth={2} aria-hidden="true" className="text-magenta" />
        {instrucao}
      </p>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {casos.map((caso, i) => (
          <Reveal as="li" key={caso.id} delay={i * 0.06}>
            <figure className="rounded-[1.75rem] border border-brandgray bg-white p-2.5 shadow-soft">
              <ImageCompare
                before={<Foto {...caso.antes} />}
                after={<Foto {...caso.depois} />}
                labels={rotulos}
                label={`${resultados.rotuloComparar}, caso ${caso.id}`}
                aspectRatio="1 / 1"
              />
              <figcaption className="px-2 pb-1 pt-3 text-legend text-ink-muted">
                {resultados.autorizacao}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      <p className="mt-6 text-center text-legend text-ink-muted">{resultados.variacao}</p>
    </div>
  );
}
