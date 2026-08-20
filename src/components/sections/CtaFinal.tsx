import { PadraoOndas } from '../ui/BrandGraphics';
import { Reveal } from '../ui/Reveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { ctaFinal } from '../../data/content';

/**
 * UM UNICO BOTAO. Dois CTAs com a mesma acao geram paralisia de decisao —
 * qualquer "Falar Agora" secundario foi deliberadamente removido.
 */
export function CtaFinal() {
  return (
    <section id="agendar" className="relative overflow-hidden bg-magenta py-20 sm:py-24 lg:py-28">
      {/* Padrao de ondas a 6% de opacidade, em branco sobre o magenta. */}
      <PadraoOndas
        className="pointer-events-none absolute inset-0 h-full w-full"
        cor="#FFFFFF"
        opacidade={0.06}
      />

      <div className="relative mx-auto max-w-[760px] px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="mx-auto max-w-[22ch] text-h2 sm:text-h2-lg font-bold text-white">
            {ctaFinal.h2}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-prose text-sub sm:text-sub-lg text-white/90">
            {ctaFinal.sub}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10">
            <WhatsAppButton origem="ctaFinal" variante="branco">
              {ctaFinal.cta}
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="mx-auto mt-8 max-w-[46ch] text-legend sm:text-legend-lg text-white/75">
            {ctaFinal.suporte}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
