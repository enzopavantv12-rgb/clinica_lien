import { Star } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { depoimentos } from '../../data/content';

/**
 * CRITICO: as estrelas precisam renderizar PREENCHIDAS.
 * Estrela vazia e lida como avaliacao zero e destroi a conversao.
 *
 * Implementacao a prova de navegador:
 * - `fill="currentColor"` preenche o corpo do icone.
 * - `stroke="currentColor"` na mesma cor evita halo/contorno claro no Safari.
 * - a cor vem de `text-magenta` no wrapper, entao `currentColor` sempre resolve.
 * - `aria-hidden` nas estrelas + texto acessivel unico em <span class="sr-only">.
 */
function CincoEstrelas() {
  return (
    <div className="flex items-center gap-1 text-magenta">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={18}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">5 de 5 estrelas</span>
    </div>
  );
}

export function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading titulo={depoimentos.h2} subtitulo={depoimentos.sub} />

        <ul
          className={`mt-14 grid gap-6 ${
            depoimentos.itens.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'max-w-2xl mx-auto'
          }`}
        >
          {depoimentos.itens.map((d, i) => (
            <Reveal as="li" key={d.nome} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-3xl border border-brandgray bg-cream p-7 shadow-soft sm:p-8">
                <CincoEstrelas />

                <blockquote className="mt-5 flex-1">
                  <p className="max-w-prose text-body sm:text-body-lg text-ink">
                    &ldquo;{d.texto}&rdquo;
                  </p>
                </blockquote>

                <footer className="mt-6 border-t border-brandgray pt-4">
                  <p className="text-[0.9375rem] font-semibold text-ink">{d.nome}</p>
                  <p className="mt-0.5 text-legend text-teal">{d.tratamento}</p>
                </footer>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
