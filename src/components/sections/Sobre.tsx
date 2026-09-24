import { BrandImage } from '../ui/BrandImage';
import { Reveal } from '../ui/Reveal';
import { VideoGota } from '../ui/VideoGota';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { sobre } from '../../data/content';

/**
 * Sobre a Lien — layout editorial (set/2026, doc "ajustes-site-clinica-lien").
 *
 * Texto a esquerda; a direita, composicao em tres camadas:
 *   1. foto da recepcao, cantos assimetricos, degradê teal na base;
 *   2. contorno em degradê com a forma do video, deslocado para cima e a direita;
 *   3. video em forma de gota por cima de tudo.
 *
 * Tipografia: o documento pede serifada display, mas o manual da marca so
 * autoriza Poppins — o titulo usa Poppins 400 em corpo grande.
 *
 * Grid: 1 coluna abaixo de 768px (texto primeiro), 5/7 no tablet, 6/6 no desktop.
 */
export function Sobre() {
  return (
    <section id="sobre" className="relative bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 py-20 sm:px-8 md:grid-cols-12 md:gap-10 md:py-24 lg:min-h-[720px] lg:gap-16 lg:px-12 lg:py-32">
        {/* Coluna de texto */}
        <div className="md:col-span-5 lg:col-span-6">
          <Reveal y={24} duracao={0.6}>
            <p className="text-[0.875rem] font-normal uppercase tracking-[0.04em] text-ink-muted underline underline-offset-4">
              {sobre.tag}
            </p>
          </Reveal>

          <Reveal y={24} duracao={0.6} delay={0.08}>
            <h2 className="mt-8 max-w-[14ch] text-[2.625rem] font-normal leading-[1.02] tracking-[-0.02em] text-magenta md:text-[3.5rem] lg:text-[4.25rem]">
              {sobre.h2}
            </h2>
          </Reveal>

          <Reveal y={24} duracao={0.6} delay={0.16}>
            <div className="mt-10 flex max-w-[560px] flex-col gap-4 md:mt-12 lg:mt-16">
              {sobre.paragrafos.map((p, i) => (
                <p key={i} className="text-[1.0625rem] leading-[1.6] tracking-[0.01em] text-ink lg:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal y={24} duracao={0.6} delay={0.24}>
            <WhatsAppButton
              origem="sobre"
              variante="pilula"
              tamanho="pilula"
              className="mt-12 w-full md:mt-16 md:w-auto lg:mt-[88px]"
            >
              {sobre.cta}
            </WhatsAppButton>
          </Reveal>
        </div>

        {/* Composicao visual */}
        <div className="md:col-span-7 lg:col-span-6">
          <div className="relative aspect-[1/0.95] w-full">
            {/* Camada 1 — foto de fundo */}
            <Reveal
              y={0}
              duracao={0.6}
              escala={1.04}
              className="lien-fundo absolute right-0 top-0 h-full w-[62%] overflow-hidden"
            >
              <BrandImage
                dados={sobre.imagem}
                width={960}
                height={1470}
                proporcao="h-full"
                className="!rounded-none"
                sizes="(max-width: 768px) 62vw, 380px"
              />
              <div
                aria-hidden="true"
                className="lien-fundo-degrade pointer-events-none absolute inset-0"
              />
            </Reveal>

            {/* Camada 2 — contorno em degradê, atras do video */}
            <Reveal
              y={0}
              duracao={0.6}
              delay={0.15}
              className="lien-outline lien-gota absolute left-[2%] top-[9%] aspect-square w-[66%]"
            >
              <span aria-hidden="true" />
            </Reveal>

            {/* Camada 3 — video em gota */}
            <Reveal y={24} duracao={0.6} delay={0.15} className="absolute left-0 top-[12%] w-[66%]">
              <VideoGota
                video={sobre.video}
                rotuloPausar={sobre.rotuloPausar}
                rotuloReproduzir={sobre.rotuloReproduzir}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
