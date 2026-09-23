import { BrandImage } from '../ui/BrandImage';
import { Simbolo } from '../ui/BrandGraphics';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { sobre } from '../../data/content';

/**
 * Sobre a Lien — o manifesto. Conceito central da marca: Lien = vinculo.
 *
 * "Moldura em arco" do briefing = o sorriso teal do logo. O simbolo oficial
 * sobrepoe a base da foto da Dra. Natalia, como assinatura visual.
 */
export function Sobre() {
  return (
    <section id="sobre" className="bg-cream py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[42fr_58fr] lg:gap-20">
          <Reveal>
            <div className="relative mx-auto max-w-[420px] pb-10">
              <BrandImage
                dados={sobre.imagem}
                width={760}
                height={950}
                proporcao="aspect-[4/5]"
                className="shadow-soft"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
              <Simbolo className="absolute bottom-0 left-1/2 block h-auto w-40 -translate-x-1/2 sm:w-48" />
            </div>
          </Reveal>

          <div>
            <SectionHeading tag={sobre.tag} titulo={sobre.h2} centralizado={false} />

            <div className="mt-8 flex flex-col gap-4">
              {sobre.paragrafos.map((p, i) => (
                <Reveal key={i} delay={0.06 * i}>
                  <p className="max-w-prose text-body sm:text-body-lg text-ink">{p}</p>
                </Reveal>
              ))}
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              {[sobre.missao, sobre.filosofia].map((bloco, i) => (
                <Reveal key={bloco.titulo} delay={0.1 + 0.06 * i}>
                  <div className="h-full rounded-3xl bg-white p-6 shadow-soft">
                    <dt
                      className="text-tag sm:text-tag-lg font-semibold uppercase text-teal"
                      style={{ letterSpacing: '0.18em' }}
                    >
                      {bloco.titulo}
                    </dt>
                    <dd className="mt-3 text-body sm:text-body-lg text-ink-muted">{bloco.texto}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.24}>
              <p className="mt-10 max-w-prose border-l-4 border-magenta pl-5 text-sub sm:text-sub-lg font-medium text-ink">
                {sobre.fechamento}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
