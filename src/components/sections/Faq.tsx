'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/faq-14-utils/accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { faq } from '@/data/content';

/**
 * Duvidas frequentes (alinhamento final, 3.12): accordion simples, tudo
 * fechado, exatamente as 6 perguntas aprovadas. Sem "Esta resposta ajudou?",
 * sem CTA nas respostas e um unico "Agende sua consulta" no fim da secao.
 *
 * SEO/AEO: o Radix desmonta a resposta fechada por padrao. Aqui `forceMount`:
 * toda resposta fica no HTML estatico, oculta por CSS quando fechada
 * (`[data-faq-item] > [role=region][data-state=closed]`, globals.css). O
 * schema FAQPage sai do mesmo objeto `faq`.
 */
export function Faq() {
  return (
    <section id="duvidas" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 sm:px-8">
        <SectionHeading tag={faq.tag} titulo={faq.h2} curvaGrande />

        <Accordion type="single" collapsible className="flex flex-col gap-2">
          {faq.itens.map((item) => (
            <AccordionItem
              key={item.pergunta}
              value={item.pergunta}
              data-faq-item=""
              className="rounded-2xl border border-brandgray bg-white transition-all duration-200 data-[state=open]:border-transparent data-[state=open]:bg-cream data-[state=open]:shadow-soft"
            >
              <AccordionTrigger className="gap-4 rounded-2xl px-5 py-4 text-left text-[1.0625rem] font-semibold leading-snug text-ink hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta sm:text-h3 [&>svg]:size-5 [&>svg]:text-teal">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent forceMount className="px-5 pb-5 text-ink-muted">
                <p className="max-w-prose text-body sm:text-body-lg">{item.resposta}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-center">
          <WhatsAppButton
            origem="duvidas"
            variante="capsula"
            tamanho="capsula"
            className="w-full shadow-[0_10px_30px_-10px_rgba(156,23,129,0.55)] sm:w-auto"
          >
            {faq.cta}
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
