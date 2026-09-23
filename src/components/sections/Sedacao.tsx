import { Check } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { sedacao } from '../../data/content';

/**
 * Implantes e cirurgias com sedacao — pedido explicito da clinica, conversa
 * com o publico que tem medo.
 *
 * Redacao conservadora ate a validacao com a Dra. Natalia e o Dr. Alexander
 * Pedrosa: nada de "voce dorme durante todo o procedimento" nem "sem dor".
 *
 * Contraste: branco sobre teal mede 4,72:1 e passa AA. Branco translucido
 * (white/80 e afins) cai abaixo de 4,5 — por isso todo texto aqui e branco
 * cheio.
 */
export function Sedacao() {
  return (
    <section id="sedacao" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-10 rounded-3xl bg-teal p-8 text-white shadow-lift sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p
                className="text-tag sm:text-tag-lg font-semibold uppercase text-white"
                style={{ letterSpacing: '0.18em' }}
              >
                {sedacao.tag}
              </p>
              <h2 className="mt-3 text-h2 sm:text-h2-lg font-bold text-white">{sedacao.h2}</h2>
              <p className="mt-5 max-w-prose text-sub sm:text-sub-lg text-white">{sedacao.texto}</p>
            </div>

            <div>
              <ul className="flex flex-col gap-4">
                {sedacao.itens.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="text-body sm:text-body-lg text-white">{item}</span>
                  </li>
                ))}
              </ul>
              <WhatsAppButton origem="sedacao" variante="branco" className="mt-9">
                {sedacao.cta}
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
