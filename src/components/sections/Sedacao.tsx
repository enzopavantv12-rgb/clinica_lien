import { ShieldCheck } from 'lucide-react';
import { PadraoOndas } from '../ui/BrandGraphics';
import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { sedacao } from '../../data/content';

/**
 * Sedacao (alinhamento final, 3.8) — so sedacao: titulo novo, as duas
 * modalidades em itens discretos, texto de apoio e um unico CTA. Nada de
 * fones, massagem ou cafeteria aqui, e nenhuma promessa de sono completo.
 *
 * Faixa magenta, como no esqueleto, com a padronagem oficial a 8%: texto
 * branco sobre magenta e combinacao prevista no manual (8:1).
 * A foto generica ("Implante dentario com precisao") saiu; ate a foto real
 * chegar, o espaco mostra o placeholder neutro do BrandImage.
 */
export function Sedacao() {
  return (
    <section id="sedacao" className="relative isolate overflow-hidden bg-magenta py-20 sm:py-24 lg:py-28">
      <PadraoOndas className="pointer-events-none absolute inset-0 -z-10 h-full w-full" cor="#FFFFFF" opacidade={0.08} />

      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <p className="text-tag sm:text-tag-lg font-semibold uppercase tracking-[0.18em] text-white">{sedacao.tag}</p>
          <h2 className="mt-4 text-h2 sm:text-h2-lg font-bold text-white">{sedacao.h2}</h2>

          <ul className="mt-8 flex flex-col gap-3">
            {sedacao.modalidades.map((m) => (
              <li
                key={m}
                className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-5 py-4 text-body sm:text-body-lg font-medium text-white"
              >
                <ShieldCheck size={20} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
                {m}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-prose text-body sm:text-body-lg text-white">{sedacao.texto}</p>

          <WhatsAppButton origem="sedacao" variante="branco" className="mt-10 w-full sm:w-auto">
            {sedacao.cta}
          </WhatsAppButton>
        </Reveal>

        <Reveal delay={0.1}>
          <BrandImage
            dados={sedacao.foto}
            width={960}
            height={1200}
            proporcao="aspect-[4/5]"
            className="!rounded-[32px]"
            sizes="(max-width: 1024px) 90vw, 520px"
          />
        </Reveal>
      </div>
    </section>
  );
}
