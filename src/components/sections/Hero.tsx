import { ArrowDown } from 'lucide-react';
import { PadraoOndas } from '../ui/BrandGraphics';
import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { hero } from '../../data/content';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white pt-28 sm:pt-32 lg:pt-36">
      {/* Padrao de ondas teal a 5% no fundo da coluna de texto. */}
      <PadraoOndas
        className="pointer-events-none absolute -left-24 top-10 h-[560px] w-[820px]"
        opacidade={0.08}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
          {/* Coluna de texto */}
          <div>
            <Reveal>
              <p
                className="text-tag sm:text-tag-lg font-semibold uppercase text-teal"
                style={{ letterSpacing: '0.18em' }}
              >
                {hero.tag}
              </p>
            </Reveal>

            <Reveal delay={0.07}>
              <h1 className="mt-5 max-w-[19ch] text-h1 sm:text-h1-lg font-bold text-ink">
                {hero.h1}
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-prose text-sub sm:text-sub-lg text-ink-muted">
                {hero.sub}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <WhatsAppButton origem="hero">{hero.ctaPrimario}</WhatsAppButton>

                <a
                  href={hero.ctaSecundarioHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-ink/25 px-7 py-4 text-base font-medium text-ink transition-all duration-300 ease-brand hover:border-ink hover:bg-ink/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-safe:hover:-translate-y-0.5"
                >
                  {hero.ctaSecundario}
                  <ArrowDown size={18} strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Coluna de imagem — no mobile aparece depois do CTA. */}
          <Reveal delay={0.26}>
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-magenta-light/25" />
              <BrandImage
                dados={hero.imagem}
                width={860}
                height={1075}
                prioridade
                proporcao="aspect-[4/5]"
                className="shadow-soft"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
