import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { equipe } from '../../data/content';
import { FundoGrade } from '../ui/background-snippets';

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
    <section id="equipe" className="relative isolate py-20 sm:py-24 lg:py-28">
      <FundoGrade />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={equipe.tag} titulo={equipe.h2} subtitulo={equipe.sub} />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipe.membros.map((membro, i) => (
            <Reveal as="li" key={membro.nome} delay={(i % 3) * 0.06}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-brandgray bg-white shadow-soft">
                <BrandImage
                  dados={membro.foto}
                  width={520}
                  height={520}
                  proporcao="aspect-square"
                  className="rounded-none rounded-t-3xl object-[50%_30%]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3 sm:text-h3-lg font-semibold text-ink">{membro.nome}</h3>
                  <p className="mt-1.5 text-legend sm:text-legend-lg font-medium text-teal">{membro.especialidade}</p>
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
