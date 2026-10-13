import { ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { cardapio } from '../../data/content';

type Item = (typeof cardapio.itens)[number];
type Estilo = 'creme' | 'teal' | 'magenta';

/**
 * "Por onde voce quer comecar?" — navegacao por queixa (alinhamento final,
 * 3.6), separada do Metodo. Mosaico de 3 colunas (cards grandes nas pontas,
 * compactos no meio) com as cores do manual:
 * - creme: texto ink; o link em magenta (teal sobre creme mede 4,46:1);
 * - teal e magenta: texto branco.
 *
 * O card inteiro e o link "Entenda esse cuidado ->" para o tratamento mais
 * proximo em /tratamentos/; nenhum WhatsApp nos cards. Um unico CTA abaixo.
 */
const estilos: Record<Estilo, { card: string; leva: string; link: string; icone: string; foco: string }> = {
  creme: {
    card: 'bg-cream text-ink hover:border-magenta/40',
    leva: 'text-ink-muted',
    link: 'text-magenta',
    icone: 'bg-white text-teal',
    foco: 'focus-visible:outline-magenta',
  },
  teal: {
    card: 'bg-teal text-white',
    leva: 'text-white/90',
    link: 'text-white',
    icone: 'bg-white/15 text-white',
    foco: 'focus-visible:outline-teal',
  },
  magenta: {
    card: 'bg-magenta text-white',
    leva: 'text-white/90',
    link: 'text-white',
    icone: 'bg-white/15 text-white',
    foco: 'focus-visible:outline-magenta',
  },
};

/** Icone SVG da clinica como mascara CSS: a cor vem do `currentColor`. */
function IconeCard({ nome }: { nome: string }) {
  const url = `url(/icones/${nome}.svg)`;
  return (
    <span
      aria-hidden="true"
      className="block size-8 bg-current lg:size-9"
      style={{
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
}

/** Grade sutil dos cards grandes, com mascara radial. */
function Grade() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(26,20,32,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(26,20,32,0.06)_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
    />
  );
}

function Card({
  item,
  estilo,
  ordem,
  grande = false,
  className = '',
}: {
  item: Item;
  estilo: Estilo;
  ordem: number;
  grande?: boolean;
  className?: string;
}) {
  const e = estilos[estilo];
  return (
    <Reveal as="li" delay={ordem * 0.05} className={`flex min-w-0 ${className}`}>
      <a
        href={item.href}
        className={`group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-brandgray p-6 transition-[transform,box-shadow,border-color] duration-300 ease-brand motion-safe:hover:-translate-y-1 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-7 ${e.card} ${e.foco}`}
      >
        {grande && <Grade />}
        <div className="relative mt-auto">
          <h3
            className={`font-semibold leading-snug ${grande ? 'text-h3 sm:text-h3-lg lg:text-[1.625rem]' : 'text-h3 sm:text-h3-lg'}`}
          >
            &ldquo;{item.texto}&rdquo;
          </h3>
          <div className="flex items-end justify-between gap-4 pt-5">
            <div className="min-w-0">
              <p className={`text-legend sm:text-legend-lg ${e.leva}`}>{item.leva}</p>
              <span
                className={`mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium underline-offset-4 group-hover:underline ${e.link}`}
              >
                {cardapio.link}
                <ArrowRight
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                />
              </span>
            </div>
            <span
              aria-hidden="true"
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl lg:size-14 ${e.icone}`}
            >
              <IconeCard nome={item.icone} />
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export function Cardapio() {
  const [comer, dentes, protese, sorriso, completo, mandibula, gengiva, medo] = cardapio.itens;
  // Celular: empilha; tablet: cada coluna vira linha; desktop: 3 colunas.
  const coluna = 'flex flex-col gap-3 md:flex-row lg:flex-col';
  const colunaMeio = 'grid gap-3 md:grid-cols-2 lg:flex lg:flex-col';

  return (
    <section id="comecar" className="relative overflow-x-clip bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={cardapio.tag} titulo={cardapio.h2} subtitulo={cardapio.sub} />

        <div className="mt-12 flex w-full flex-col gap-3 lg:grid lg:grid-cols-3">
          <ul className={coluna}>
            <Card item={comer} estilo="creme" grande ordem={0} className="md:flex-[6] lg:flex-[7]" />
            <Card item={dentes} estilo="teal" ordem={1} className="md:flex-[4] lg:flex-[3]" />
          </ul>
          <ul className={colunaMeio}>
            <Card item={protese} estilo="magenta" ordem={2} className="lg:flex-[1_0_auto]" />
            <Card item={sorriso} estilo="magenta" ordem={3} className="lg:flex-[1_0_auto]" />
            <Card item={completo} estilo="magenta" ordem={4} className="lg:flex-[1_0_auto]" />
            <Card item={medo} estilo="magenta" ordem={5} className="lg:flex-[1_0_auto]" />
          </ul>
          <ul className={coluna}>
            <Card item={mandibula} estilo="teal" ordem={6} className="md:flex-[4] lg:flex-[3]" />
            <Card item={gengiva} estilo="creme" grande ordem={7} className="md:flex-[6] lg:flex-[7]" />
          </ul>
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-center gap-5 text-center">
            <p className="text-h3 sm:text-h3-lg font-semibold text-ink">{cardapio.pergunta}</p>
            <WhatsAppButton
              origem="comecar"
              variante="capsula"
              tamanho="capsula"
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
