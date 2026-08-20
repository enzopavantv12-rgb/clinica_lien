import { Plus } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { faq } from '../../data/content';

/**
 * FAQ visivel — obrigatorio para AEO.
 * As perguntas/respostas aqui espelham exatamente o schema FAQPage do
 * index.html. Se editar uma, editar a outra.
 *
 * Usa <details>/<summary> nativo: acessivel por teclado de graca, e o conteudo
 * fica no DOM (indexavel) mesmo fechado.
 */
export function Faq() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[860px] px-5 sm:px-8">
        <SectionHeading tag={faq.tag} titulo={faq.h2} />

        <div className="mt-12 flex flex-col gap-3">
          {faq.itens.map((item, i) => (
            <Reveal key={item.pergunta} delay={i * 0.04}>
              <details className="group rounded-2xl border border-brandgray bg-cream px-5 shadow-soft transition-colors open:border-teal/40 sm:px-7">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink sm:text-h3">
                    {item.pergunta}
                  </h3>
                  <Plus
                    size={22}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-teal transition-transform duration-300 ease-brand group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-prose pb-6 pr-8 text-body sm:text-body-lg text-ink-muted">
                  {item.resposta}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
