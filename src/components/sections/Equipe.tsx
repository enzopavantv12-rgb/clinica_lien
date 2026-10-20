import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { Etiqueta } from '../ui/Etiqueta';
import { equipe } from '../../data/content';

/**
 * Equipe (alinhamento final, 3.10): foto grande + nome + especialidade +
 * 1 frase, sem mini curriculo. Todas as fotos no mesmo quadrado e no mesmo
 * enquadramento (recortadas por scripts/recortar-equipe.mjs). O CRO fica
 * numa linha discreta: identificacao do profissional exigida pelo CFO.
 *
 * PROIBIDO avatar com iniciais: sem foto, o BrandImage mostra o bloco neutro.
 */
export function Equipe() {
  return (
    <section id="equipe" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* Cabecalho do print (out/2026): tag em pilula, H2 em 2 linhas e
            subtitulo, sem o sorriso. */}
        <Reveal className="flex flex-col items-center text-center">
          <Etiqueta>{equipe.tag}</Etiqueta>
          <h2 className="mt-3 text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.12] tracking-[-.01em] text-ink">
            {equipe.h2Linhas[0]} <br className="hidden sm:inline" />
            {equipe.h2Linhas[1]}
          </h2>
          <p className="mt-5 max-w-[720px] text-[clamp(16px,1.4vw,19px)] font-light leading-[1.6] text-ink-muted">{equipe.sub}</p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipe.membros.map((membro, i) => (
            <Reveal as="li" key={membro.nome} delay={(i % 3) * 0.06}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-brandgray bg-white shadow-soft">
                <div className="relative">
                  <BrandImage
                    dados={membro.foto}
                    width={520}
                    height={520}
                    proporcao="aspect-square"
                    className="rounded-none rounded-t-3xl object-[50%_30%]"
                  />
                  {/* Selo do print da clinica (out/2026), na cor alternada do card. */}
                  {'selo' in membro && membro.selo && (
                    <span
                      className={`absolute bottom-3.5 right-3.5 rounded-full px-3 py-1 text-[0.8125rem] font-semibold text-white shadow-[0_4px_12px_-4px_rgba(26,20,32,.35)] ${
                        i % 2 === 0 ? 'bg-magenta' : 'bg-teal'
                      }`}
                    >
                      {membro.selo}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3 sm:text-h3-lg font-semibold text-ink">{membro.nome}</h3>
                  <p
                    className={`mt-1.5 text-legend sm:text-legend-lg font-semibold uppercase tracking-[0.08em] ${
                      i % 2 === 0 ? 'text-magenta' : 'text-teal'
                    }`}
                  >
                    {membro.especialidade}
                  </p>
                  <p className="mt-3.5 text-body text-ink-muted">{membro.frase}</p>
                  {membro.cro && <p className="mt-auto pt-4 text-legend text-ink-muted">{membro.cro}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
