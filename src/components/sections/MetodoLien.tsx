import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { FundoGrade } from '../ui/background-snippets';
import { metodo } from '../../data/content';

/**
 * Metodo Lien — o "verdadeiro Metodo" em quatro etapas (alinhamento final,
 * 3.5): aprovado e enxuto. 4 colunas no desktop, 2x2 no tablet, empilhado no
 * celular; numeros em destaque, sem icones. Sem foto (conflito C4) e sem a
 * linha do tempo com scroll preso, que pesava a rolagem.
 */
export function MetodoLien() {
  return (
    <section id="metodo" className="relative isolate py-20 sm:py-24 lg:py-28">
      <FundoGrade />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={metodo.tag} titulo={metodo.h2} subtitulo={metodo.intro} />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metodo.etapas.map((etapa, i) => (
            <Reveal as="li" key={etapa.numero} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-3xl border border-brandgray bg-white p-7 shadow-soft">
                <span className="text-[3rem] font-black leading-none tracking-[-0.02em] text-magenta">
                  {etapa.numero}
                </span>
                <h3 className="mt-6 text-h3 sm:text-h3-lg font-semibold text-ink">{etapa.titulo}</h3>
                <p className="mt-3 text-body sm:text-body-lg text-ink-muted">{etapa.texto}</p>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-h3 sm:text-h3-lg font-semibold text-magenta">{metodo.fechamento}</p>
        </Reveal>
      </div>
    </section>
  );
}
