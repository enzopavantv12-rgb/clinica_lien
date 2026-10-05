'use client';

import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { MotionConfig, type Variants } from 'motion/react';
import { Simbolo } from '../ui/BrandGraphics';
import { TimelineContent } from '../ui/timeline-animation';
import { WhatsAppLink } from '../ui/WhatsAppLink';
import { cardapio } from '../../data/content';
import { FundoGrade } from '../ui/background-snippets';

type Item = (typeof cardapio.itens)[number];
type Estilo = 'creme' | 'teal' | 'magenta';

/**
 * "Por onde voce quer comecar?" — o cardapio de necessidades, no layout em
 * mosaico do componente "testimonial" (21st.dev): 3 colunas, cards grandes com
 * grade nas pontas e cards compactos no meio, revelados em sequencia.
 *
 * Cores do template trocadas pelas do manual da Lien:
 * - claro com grade (bg-primaryColor) -> cream, texto ink;
 * - azul (bg-blue-600)                -> teal, texto branco;
 * - preto (#111111)                   -> magenta, texto branco.
 * Branco so sobre magenta/teal, como preve o manual. No card cream o link de
 * WhatsApp vai em magenta: teal sobre cream mede 4,46:1 e reprova AA.
 *
 * No lugar das fotos de logo do template, um icone odontologico por card
 * (public/icones/, enviados pela clinica). Cada card mantem as duas saidas: a conversa no WhatsApp
 * com a mensagem daquela dor e o link para o tratamento.
 */
const revealVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
  hidden: { filter: 'blur(10px)', y: -20, opacity: 0 },
};

const estilos: Record<Estilo, { card: string; leva: string; link: string; icone: string }> = {
  creme: {
    card: 'bg-cream text-ink',
    leva: 'text-ink-muted',
    link: 'text-ink-muted hover:text-ink focus-visible:outline-magenta',
    icone: 'bg-white text-teal',
  },
  teal: {
    card: 'bg-teal text-white',
    leva: 'text-white/90',
    link: 'text-white/90 hover:text-white focus-visible:outline-white',
    icone: 'bg-white/15 text-white',
  },
  magenta: {
    card: 'bg-magenta text-white',
    leva: 'text-white/90',
    link: 'text-white/90 hover:text-white focus-visible:outline-white',
    icone: 'bg-white/15 text-white',
  },
};

/**
 * Icone SVG do cardapio como mascara CSS: o arquivo da a forma e a cor vem do
 * `currentColor` do card (branco no magenta/teal, teal no cream). Os arquivos
 * sao monocromaticos, entao a mascara usa so o canal alfa.
 */
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

/** Grade sutil dos cards grandes, com mascara radial (do template). */
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
  timelineRef,
  grande = false,
  className = '',
}: {
  item: Item;
  estilo: Estilo;
  ordem: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  grande?: boolean;
  className?: string;
}) {
  const e = estilos[estilo];
  return (
    <TimelineContent
      as="li"
      animationNum={ordem}
      customVariants={revealVariants}
      timelineRef={timelineRef}
      className={`relative flex min-w-0 flex-col justify-between overflow-hidden rounded-3xl border border-brandgray p-6 sm:p-7 ${e.card} ${className}`}
    >
      {grande && <Grade />}
      <article className="relative mt-auto">
        <h3 className={`font-semibold leading-snug ${grande ? 'text-h3 sm:text-h3-lg lg:text-[1.625rem]' : 'text-h3 sm:text-h3-lg'}`}>
          &ldquo;{item.texto}&rdquo;
        </h3>
        <div className="flex items-end justify-between gap-4 pt-5">
          <div className="min-w-0">
            <p className={`text-legend sm:text-legend-lg ${e.leva}`}>{item.leva}</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <WhatsAppLink
                origem={item.origem}
                contexto={item.texto}
                claro={estilo !== 'creme'}
                className={estilo === 'creme' ? '!text-magenta hover:!text-ink' : ''}
              >
                {cardapio.cta}
              </WhatsAppLink>
              <a
                href={item.ancora}
                className={`inline-flex items-center gap-1.5 self-start rounded text-legend sm:text-legend-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${e.link}`}
              >
                {cardapio.verTratamento}
                <span className="sr-only">: {item.leva}</span>
                <ArrowDown size={14} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
          <span
            aria-hidden="true"
            className={`flex size-12 shrink-0 items-center justify-center rounded-2xl lg:size-14 ${e.icone}`}
          >
            <IconeCard nome={item.icone} />
          </span>
        </div>
      </article>
    </TimelineContent>
  );
}

export function Cardapio() {
  const ref = useRef<HTMLElement>(null);
  const [comer, dentes, protese, sorriso, completo, mandibula, gengiva, medo] = cardapio.itens;
  // Colunas no celular e tablet: empilham; no tablet cada coluna vira linha.
  const coluna = 'flex flex-col gap-3 md:flex-row lg:flex-col';
  // A coluna do meio tem 4 cards: no tablet vira grade 2x2 (em linha, cada
  // card ficaria com ~175px).
  const colunaMeio = 'grid gap-3 md:grid-cols-2 lg:flex lg:flex-col';

  return (
    <MotionConfig reducedMotion="user">
      <section id="para-voce" ref={ref} className="relative isolate overflow-x-clip py-20 sm:py-24 lg:py-28">
        <FundoGrade />
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="mx-auto flex max-w-screen-md flex-col items-center text-center">
            <TimelineContent
              as="p"
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={ref}
              className="text-tag sm:text-tag-lg font-semibold uppercase tracking-[0.18em] text-teal"
            >
              {cardapio.tag}
            </TimelineContent>
            <TimelineContent
              as="h2"
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={ref}
              className="mt-3 text-h2 sm:text-h2-lg font-bold text-ink"
            >
              {cardapio.h2}
            </TimelineContent>
            <Simbolo variante="rgb" className="mt-4 block h-auto w-14" />
            <TimelineContent
              as="p"
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={ref}
              className="mt-5 max-w-prose text-sub sm:text-sub-lg text-ink-muted"
            >
              {cardapio.sub}
            </TimelineContent>
          </div>

          <div className="mt-12 flex w-full flex-col gap-3 pb-6 lg:grid lg:grid-cols-3">
            <ul className={coluna}>
              <Card item={comer} estilo="creme" grande ordem={2} timelineRef={ref} className="md:flex-[6] lg:flex-[7]" />
              <Card item={dentes} estilo="teal" ordem={3} timelineRef={ref} className="md:flex-[4] lg:flex-[3]" />
            </ul>
            <ul className={colunaMeio}>
              <Card item={protese} estilo="magenta" ordem={4} timelineRef={ref} className="lg:flex-[1_0_auto]" />
              <Card item={sorriso} estilo="magenta" ordem={5} timelineRef={ref} className="lg:flex-[1_0_auto]" />
              <Card item={completo} estilo="magenta" ordem={6} timelineRef={ref} className="lg:flex-[1_0_auto]" />
              <Card item={medo} estilo="magenta" ordem={7} timelineRef={ref} className="lg:flex-[1_0_auto]" />
            </ul>
            <ul className={coluna}>
              <Card item={mandibula} estilo="teal" ordem={8} timelineRef={ref} className="md:flex-[4] lg:flex-[3]" />
              <Card item={gengiva} estilo="creme" grande ordem={9} timelineRef={ref} className="md:flex-[6] lg:flex-[7]" />
            </ul>
          </div>
        </div>

        {/* Linha de base com os dois "pregos" nas pontas (do template). */}
        <div aria-hidden="true" className="absolute bottom-4 left-[5%] z-[2] h-16 w-[90%] border-b-2 border-brandgray md:left-0 md:w-full">
          <div className="relative mx-auto h-full w-full max-w-[1200px] before:absolute before:-bottom-2 before:-left-2 before:h-4 before:w-4 before:border before:border-brandgray before:bg-white before:shadow-sm after:absolute after:-bottom-2 after:-right-2 after:h-4 after:w-4 after:border after:border-brandgray after:bg-white after:shadow-sm" />
        </div>
      </section>
    </MotionConfig>
  );
}
