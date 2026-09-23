import { ArrowDown } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { WhatsAppLink } from '../ui/WhatsAppLink';
import { cardapio } from '../../data/content';

/**
 * "Por onde voce quer comecar?" — o cardapio de necessidades.
 *
 * Inspiracao pedida pela clinica: o modo cardapio do humanrace.com, em que o
 * visitante escolhe pelo que sente, nas palavras dele. Cada card tem duas
 * saidas: a conversa no WhatsApp com a mensagem daquela dor (a conversao) e o
 * link para o tratamento correspondente, para quem ainda quer entender antes.
 */
export function Cardapio() {
  return (
    <section id="para-voce" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={cardapio.tag} titulo={cardapio.h2} subtitulo={cardapio.sub} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {cardapio.itens.map((item, i) => (
            <Reveal as="li" key={item.origem} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-3xl border border-brandgray bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-7">
                <h3 className="text-h3 sm:text-h3-lg font-semibold text-ink">
                  &ldquo;{item.texto}&rdquo;
                </h3>
                <p className="mt-3 text-legend sm:text-legend-lg text-ink-muted">{item.leva}</p>

                <div className="mt-auto flex flex-col gap-3 pt-6">
                  <WhatsAppLink origem={item.origem} contexto={item.texto}>
                    {cardapio.cta}
                  </WhatsAppLink>
                  <a
                    href={item.ancora}
                    className="inline-flex items-center gap-1.5 self-start rounded text-legend sm:text-legend-lg font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
                  >
                    {cardapio.verTratamento}
                    <span className="sr-only">: {item.leva}</span>
                    <ArrowDown size={14} strokeWidth={2} aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
