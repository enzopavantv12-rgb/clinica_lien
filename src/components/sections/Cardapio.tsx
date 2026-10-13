import { ArrowRight } from 'lucide-react';
import { Etiqueta } from '../ui/Etiqueta';
import { Reveal } from '../ui/Reveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { cardapio } from '../../data/content';

/** Icone SVG da clinica como mascara CSS: a cor vem do `currentColor`. */
function IconeCard({ nome }: { nome: string }) {
  const url = `url(/icones/${nome}.svg)`;
  return (
    <span
      aria-hidden="true"
      className="block size-11 bg-current"
      style={{
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'left top',
        maskPosition: 'left top',
      }}
    />
  );
}

/**
 * "Por onde voce quer comecar?" — caixa do Print 2, dentro do fundo de ondas
 * do Metodo (renderizada por MetodoLien), como <section> propria (#comecar,
 * com H2). Degrade rosado -> azul-acinzentado, 4 cards em que o card inteiro
 * e o link "Entenda esse cuidado ->" e um unico CTA abaixo.
 *
 * Card a 90% de branco (e nao de #F9FAFB, como no prompt): o link teal de
 * 12px precisa de fundo quase branco para passar AA (4,7:1).
 */
export function Cardapio() {
  return (
    <section id="comecar" aria-labelledby="comecar-title" className="mx-auto mt-24 max-w-[1160px] px-6">
      <div className="rounded-[28px] border border-[#E6DDE8] bg-[linear-gradient(135deg,#FBF3FA,#F4F6F9_55%,#EEF4F6)] px-5 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] sm:px-10 sm:py-14">
        <Reveal y={16} duracao={0.6} className="flex flex-col items-center text-center">
          <Etiqueta cor="teal">{cardapio.tag}</Etiqueta>
          <h2 id="comecar-title" className="mt-3 text-[clamp(24px,2.4vw,30px)] font-bold text-ink">
            {cardapio.h2}
          </h2>
          <p className="mt-2.5 text-sm text-ink-muted">{cardapio.sub}</p>
        </Reveal>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cardapio.itens.map((item, i) => (
            <Reveal as="li" key={item.texto} y={16} duracao={0.6} delay={i * 0.09} className="flex">
              <a
                href={item.href}
                className="group flex w-full flex-col rounded-2xl border border-brandgray/70 bg-white/90 px-6 pb-6 pt-[22px] shadow-[0_10px_24px_-16px_rgba(26,20,32,.12)] transition-[transform,border-color] duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-magenta/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-magenta motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="text-magenta">
                  <IconeCard nome={item.icone} />
                </span>
                <span className="mt-[18px] text-[15px] leading-[1.45] text-ink">{item.texto}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-medium text-teal">
                  {cardapio.link}
                  <ArrowRight
                    size={13}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-[250ms] motion-safe:group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal y={16} duracao={0.6}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <p className="text-[15px] text-ink">{cardapio.pergunta}</p>
            <WhatsAppButton
              origem="comecar"
              variante="capsula"
              tamanho="capsulaMenu"
              className="w-full shadow-[0_10px_30px_-10px_rgba(156,23,129,0.55)] sm:w-auto"
            >
              {cardapio.cta}
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
