'use client';

import { useState } from 'react';
import {
  CalendarClock,
  ClipboardList,
  HeartHandshake,
  Stethoscope,
  ThumbsDownIcon,
  ThumbsUpIcon,
  type LucideIcon,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/faq-14-utils/accordion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Simbolo } from '@/components/ui/BrandGraphics';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { trackFaqFeedback } from '@/lib/tracking';
import { faq } from '@/data/content';
import { FundoGrade } from '@/components/ui/background-snippets';

const ICONES: Record<string, LucideIcon> = { ClipboardList, HeartHandshake, Stethoscope, CalendarClock };

/** "Esta resposta ajudou?" — so registra no dataLayer (pronto para o GA4). */
function Feedback({ pergunta }: { pergunta: string }) {
  const [respondido, setRespondido] = useState(false);
  const responder = (ajudou: boolean) => {
    trackFaqFeedback(pergunta, ajudou);
    setRespondido(true);
  };

  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      {respondido ? (
        <p className="text-legend font-medium text-teal">{faq.obrigado}</p>
      ) : (
        <>
          <span className="mr-1 text-legend text-ink-muted">{faq.ajudou}</span>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full text-ink focus-visible:ring-magenta" onClick={() => responder(true)}>
            <ThumbsUpIcon className="size-3.5" aria-hidden="true" />
            {faq.sim}
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-full text-ink focus-visible:ring-magenta" onClick={() => responder(false)}>
            <ThumbsDownIcon className="size-3.5" aria-hidden="true" />
            {faq.nao}
          </Button>
        </>
      )}
    </div>
  );
}

/**
 * Duvidas frequentes no modelo "faq-14" (21st.dev): temas em abas com icone e,
 * em cada tema, um accordion com as perguntas daquela area.
 *
 * - As 12 perguntas sao as mesmas de antes, so agrupadas por `categoria`
 *   (content.ts). O schema FAQPage continua gerado do mesmo objeto.
 * - SEO/AEO: o Radix desmonta aba e resposta fechadas por padrao. Aqui
 *   `forceMount` nas duas: todas as respostas ficam no HTML estatico, apenas
 *   ocultas (`hidden`) quando fechadas.
 * - Classes do template em Tailwind v4 / base-ui (`data-open:`,
 *   `data-active:`) traduzidas para os atributos do Radix
 *   (`data-[state=open]:`, `data-[state=active]:`).
 * - "Reach support" (FancyButton, que o prompt nao traz) -> CTA de WhatsApp.
 */
export function Faq() {
  const temaInicial = faq.temas[0].valor;

  return (
    <section id="duvidas" className="relative isolate py-20 sm:py-24 lg:py-28">
      <FundoGrade />
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 sm:px-8">
        <header className="flex flex-col items-start gap-3">
          <p className="text-tag sm:text-tag-lg font-semibold uppercase tracking-[0.18em] text-teal">{faq.tag}</p>
          <h2 className="text-h2 sm:text-h2-lg font-bold text-ink">{faq.h2}</h2>
          <Simbolo variante="rgb" className="mt-1 block h-auto w-14" />
          <p className="mt-2 text-sub sm:text-sub-lg text-ink-muted">{faq.sub}</p>
        </header>

        <Tabs
          defaultValue={temaInicial}
          orientation="vertical"
          className="flex w-full flex-col gap-6 md:flex-row md:gap-10"
        >
          <TabsList className="flex h-auto w-full flex-row gap-1 bg-transparent p-0 md:w-48 md:shrink-0 md:flex-col md:justify-start md:self-start">
            {faq.temas.map(({ valor, rotulo, icone }) => {
              const Icone = ICONES[icone];
              return (
                <TabsTrigger
                  key={valor}
                  value={valor}
                  className="h-auto min-h-11 w-full flex-col justify-center gap-1 rounded-xl px-1.5 py-2 text-[0.6875rem] text-ink-muted sm:flex-row sm:gap-2 sm:px-3 sm:py-2.5 sm:text-[0.9375rem] shadow-none hover:text-ink focus-visible:ring-magenta data-[state=active]:bg-muted data-[state=active]:font-semibold data-[state=active]:text-magenta data-[state=active]:shadow-none sm:justify-start"
                >
                  <Icone className="size-4 shrink-0" aria-hidden="true" />
                  {/* No celular o nome vai embaixo do icone, em corpo menor. */}
                  <span>{rotulo}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {faq.temas.map(({ valor }) => {
            const itens = faq.itens.filter((i) => i.categoria === valor);
            return (
              <TabsContent
                key={valor}
                value={valor}
                forceMount
                className="mt-0 min-w-0 flex-1 focus-visible:ring-magenta data-[state=inactive]:hidden"
              >
                <Accordion type="single" collapsible defaultValue={itens[0]?.pergunta} className="flex flex-col gap-1">
                  {itens.map((item) => (
                    <AccordionItem
                      key={item.pergunta}
                      value={item.pergunta}
                      data-faq-item=""
                      className="rounded-2xl border-none transition-all duration-200 data-[state=open]:bg-cream data-[state=open]:shadow-soft"
                    >
                      <AccordionTrigger className="gap-4 rounded-2xl px-4 py-3.5 text-left text-[1.0625rem] font-semibold leading-snug text-ink hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta sm:text-h3 [&>svg]:size-5 [&>svg]:text-teal">
                        {item.pergunta}
                      </AccordionTrigger>
                      <AccordionContent forceMount className="flex flex-col gap-4 px-4 pb-5 text-ink-muted">
                        <p className="max-w-prose text-body sm:text-body-lg">{item.resposta}</p>
                        <Feedback pergunta={item.pergunta} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            );
          })}
        </Tabs>

        <WhatsAppButton
          origem="duvidas"
          variante="capsula"
          tamanho="capsula"
          className="w-full shadow-[0_10px_30px_-10px_rgba(156,23,129,0.55)] sm:w-fit"
        >
          {faq.cta}
        </WhatsAppButton>
      </div>
    </section>
  );
}
