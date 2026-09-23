import { confianca } from '../../data/content';

/**
 * Barra de confianca, logo abaixo do hero.
 *
 * Numeros ESTATICOS, sem contagem animada. A animacao anterior causou dois
 * defeitos: o HTML pre-renderizado publicava "0" como valor, e depois o
 * contador travou em 0 para o usuario. Aqui o numero sai certo no HTML e na
 * pagina viva, sem estado nem efeito — e por isso e Server Component.
 *
 * Mobile: carrossel horizontal com scroll-snap (CSS puro). Desktop: 4 colunas.
 */
export function Confianca() {
  const itens = confianca.mostrarOpcionais
    ? [...confianca.itens, ...confianca.opcionais]
    : confianca.itens;

  return (
    <section
      id="confianca"
      aria-label="Por que confiar na Lien"
      className="border-y border-brandgray/70 bg-cream py-10 sm:py-12"
    >
      <div className="mx-auto max-w-[1200px] sm:px-8">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:gap-8">
          {itens.map((item) => (
            <li key={item.texto} className="w-[72%] shrink-0 snap-start text-center sm:w-auto">
              {/* Bloco alinhado pela BASE, com altura minima igual em todos:
                  itens so de texto e itens numericos terminam na mesma linha,
                  e as legendas embaixo ficam alinhadas entre colunas. */}
              <p className="flex min-h-[2.75rem] items-end justify-center font-black text-magenta sm:min-h-[4rem]">
                <span className="flex items-baseline gap-2">
                  {item.numero && <span className="text-stat sm:text-stat-lg">{item.numero}</span>}
                  {item.complemento && (
                    <span className="text-[1.625rem] leading-tight sm:text-[2rem]">{item.complemento}</span>
                  )}
                </span>
              </p>
              <p className="mx-auto mt-2 max-w-[24ch] text-legend sm:text-legend-lg text-ink-muted">
                {item.texto}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
