import { BrandImage } from '../ui/BrandImage';
import { ArcoSorriso } from '../ui/BrandGraphics';
import { Reveal } from '../ui/Reveal';
import { sobre } from '../../data/content';

/**
 * "Lien quer dizer vinculo." — historia da marca (alinhamento final, 3.4).
 *
 * Editorial e emocional, nao "startup": texto final literal a esquerda, uma
 * fotografia grande da clinica a direita e um unico destaque — o quote, com o
 * arco teal do sorriso. Sem mini-cards de dados nem video (conflito C3: o
 * video da recepcao foi para o capitulo 2 da Experiencia).
 *
 * Grid: 1 coluna abaixo de 1024px (texto primeiro), 7/5 no desktop.
 */
export function Sobre() {
  return (
    <section id="sobre" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal y={24} duracao={0.6}>
              <p className="text-[0.75rem] font-medium uppercase leading-[1.4] tracking-[0.08em] text-ink-muted underline decoration-1 underline-offset-[6px] sm:text-[0.875rem]">
                {sobre.tag}
              </p>
            </Reveal>

            <Reveal y={24} duracao={0.6} delay={0.08}>
              <h2 className="mt-8 text-[2.75rem] font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[3.5rem] lg:text-[4.25rem]">
                {sobre.tituloLinhas[0]} <br className="hidden lg:block" />
                <span className="text-magenta">{sobre.tituloLinhas[1]}</span>
                <span className="text-teal">.</span>
              </h2>
            </Reveal>

            <Reveal y={24} duracao={0.6} delay={0.16}>
              <div className="mt-10 flex max-w-[600px] flex-col gap-5">
                {sobre.paragrafos.map((p) => (
                  <p key={p.slice(0, 24)} className="text-base leading-[1.75] text-ink lg:text-[1.0625rem]">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mx-auto w-full max-w-[520px] lg:col-span-5 lg:max-w-none">
            <Reveal y={0} duracao={0.6} escala={1.04} className="relative">
              <div className="overflow-hidden rounded-[28px] lg:rounded-[24px_120px_40px_160px]">
                <BrandImage
                  dados={sobre.imagem}
                  width={941}
                  height={1672}
                  proporcao="aspect-[4/5]"
                  className="!rounded-none object-[50%_45%]"
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </div>
            </Reveal>

            <Reveal y={16} duracao={0.6} delay={0.15}>
              <figure className="relative z-10 mx-4 -mt-16 rounded-3xl bg-cream p-7 shadow-lift sm:mx-8 sm:p-8 lg:-ml-16 lg:mr-8">
                <ArcoSorriso className="h-auto w-16" />
                <blockquote className="mt-4 text-[1.1875rem] font-medium leading-[1.45] text-ink sm:text-[1.3125rem]">
                  &ldquo;{sobre.quote}&rdquo;
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
