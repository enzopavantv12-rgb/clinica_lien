import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { faq } from '@/data/content';
import { semViuva } from '@/lib/semViuva';

/**
 * Duvidas frequentes (alinhamento final, 3.12): accordion simples, tudo
 * fechado, as 5 perguntas do print da clinica (out/2026). Sem "Esta resposta ajudou?",
 * sem CTA nas respostas e um unico "Agende sua consulta" no fim da secao.
 *
 * <details>/<summary> nativos (nov/2026, desempenho): zero JS (o Radix
 * Accordion custava ~24 KB) e toda resposta fica no HTML estatico (SEO/AEO).
 * `name="faq"`: abrir uma fecha as outras, como antes (navegadores atuais; nos
 * antigos, varias podem ficar abertas). Teclado e leitor de tela vem do
 * proprio elemento. O schema FAQPage sai do mesmo objeto `faq`.
 */
export function Faq() {
  return (
    <section id="duvidas" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 sm:px-8">
        <SectionHeading tag={faq.tag} titulo={faq.h2} subtitulo={faq.sub} curvaGrande />

        <div className="flex flex-col gap-2">
          {faq.itens.map((item) => (
            <details
              key={item.pergunta}
              name="faq"
              data-faq-item=""
              className="group rounded-2xl border border-brandgray bg-white transition-colors duration-200 open:border-transparent open:bg-cream open:shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-[1.0625rem] font-semibold leading-snug text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta sm:text-h3 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[inherit] font-[inherit] leading-[inherit]">{item.pergunta}</h3>
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-teal transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <div className="px-5 pb-5 text-ink-muted">
                <p className="max-w-prose text-body sm:text-body-lg">{semViuva(item.resposta)}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="flex justify-center">
          <WhatsAppButton
            origem="duvidas"
            variante="capsulaDegrade"
            tamanho="capsula"
            className="w-full shadow-[0_10px_30px_-10px_rgba(80,60,140,0.5)] sm:w-auto"
          >
            {faq.cta}
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
