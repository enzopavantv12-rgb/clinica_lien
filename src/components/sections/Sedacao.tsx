'use client';

import type { PointerEvent } from 'react';
import { CalendarDays, ShieldCheck } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import larguras from '../../data/imagens.json';
import { sedacao, type OrigemWhatsApp } from '../../data/content';
import { whatsappUrlPor } from '../../lib/whatsapp';
import { trackWhatsAppClick } from '../../lib/tracking';

const LARGURAS = larguras as Record<string, number[]>;
const { foto } = sedacao;

/** Brilho que acompanha o mouse no vidro (--luz-x/--luz-y do .vidro::after). */
const aoMover = (e: PointerEvent<HTMLElement>) => {
  if (e.pointerType !== 'mouse') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const caixa = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--luz-x', `${e.clientX - caixa.left}px`);
  e.currentTarget.style.setProperty('--luz-y', `${e.clientY - caixa.top}px`);
};

const aoSair = (e: PointerEvent<HTMLElement>) => {
  e.currentTarget.style.removeProperty('--luz-x');
  e.currentTarget.style.removeProperty('--luz-y');
};

const botao =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-medium transition-[background-color,border-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-auto';

function Botao({
  origem,
  className,
  children,
}: {
  origem: OrigemWhatsApp;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={whatsappUrlPor(origem)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(origem)}
      data-cta={origem}
      className={`${botao} ${className}`}
    >
      {children}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}

/**
 * Sedacao — modelo "secao-sedacao" (out/2026): faixa de largura total com a
 * foto "Implante dentario com precisao" ao fundo e um card Liquid Glass
 * escuro a esquerda (estilos .vidro no globals.css).
 *
 * - Cores da referencia trocadas pela paleta da Lien: tinta e veu em ink,
 *   destaque e icone em ciano #68C0D4, botao principal em magenta com texto
 *   branco. O magenta como texto no vidro escuro nao chega a 3:1 e o rosa
 *   nao e cor de texto.
 * - Contraste medido no canvas (foto + veu + desfoque + tinta 0,55), no pior
 *   ponto, em 1440px: paragrafo 6,1:1, titulo branco 7:1, titulo ciano 3,5:1
 *   (texto grande, minimo 3:1).
 * - Titulo com uma frase por linha no desktop. Na Poppins a segunda frase
 *   mede ~17,9x o tamanho da fonte (501px em 28px) e nao cabe no card de
 *   575px da referencia com o H2 de 44px. Por isso o card vai a
 *   clamp(540px, 46vw, 640px) e a fonte acompanha a largura util dele
 *   (24px em 1024, ~27px em 1280, 30px de 1440 para cima).
 * - Os dois botoes abrem o WhatsApp, como todo CTA do site: "Agendar
 *   consulta" com a mensagem de agendamento (data-cta sedacao-agendar) e
 *   "Falar pelo WhatsApp" com a de duvida sobre sedacao (data-cta sedacao).
 * - Entrada: o Reveal anima o proprio card (opacity/transform), nunca um pai.
 */
export function Sedacao() {
  const ws = LARGURAS[foto.base] ?? [];
  const srcset = (ext: string) => ws.map((w) => `/img/${foto.base}-${w}.${ext} ${w}w`).join(', ');
  // No celular a foto tem 440px de altura: ~780px de largura renderizada.
  const sizes = '(max-width: 767px) 780px, 100vw';

  return (
    <section
      id="sedacao"
      aria-labelledby="sedacao-titulo"
      className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-ink px-4 pb-4 pt-[260px] md:min-h-[clamp(520px,39vw,640px)] md:items-center md:px-0 md:py-24"
    >
      {/* No celular a foto fica presa no topo (440px) e o veu funde a base
          dela no fundo ink da secao: o card ancorado embaixo nao esconde o
          rosto. Do tablet para cima ela cobre a secao inteira. */}
      <div className="absolute inset-x-0 top-0 z-0 h-[440px] md:inset-0 md:h-auto">
        <picture className="absolute inset-0">
          <source type="image/avif" srcSet={srcset('avif')} sizes={sizes} />
          <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
          <img
            src={`/img/${foto.base}-${ws[0]}.webp`}
            alt={foto.alt}
            width={foto.largura}
            height={foto.altura}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-[64%_center] md:object-[70%_center]"
          />
        </picture>
        <div aria-hidden="true" className="vidro-veu absolute inset-0 z-10" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1200px] md:px-8">
        <Reveal
          className="vidro w-full p-6 text-white md:w-[clamp(420px,56vw,520px)] md:p-9 lg:w-[clamp(540px,46vw,640px)] lg:p-11"
          onPointerMove={aoMover}
          onPointerLeave={aoSair}
        >
          <ShieldCheck size={28} strokeWidth={1.75} className="text-teal-light" aria-hidden="true" />
          <h2
            id="sedacao-titulo"
            className="mt-7 text-h2 font-bold text-white lg:text-[length:clamp(1.5rem,calc(2.52vw-5px),1.875rem)]"
          >
            <span className="md:block">{sedacao.tituloLinhas[0]} </span>
            <span className="text-teal-light md:block">{sedacao.tituloLinhas[1]}</span>
          </h2>
          <p className="mt-5 max-w-[480px] text-body sm:text-body-lg text-white/[0.86]">{sedacao.texto}</p>
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
            <Botao
              origem="sedacao-agendar"
              className="bg-magenta text-white hover:bg-[#AD2192] motion-safe:hover:-translate-y-px"
            >
              <CalendarDays size={16} aria-hidden="true" />
              {sedacao.ctaAgendar}
            </Botao>
            <Botao origem="sedacao" className="vidro-botao-secundario text-white">
              <WhatsAppIcon size={16} />
              {sedacao.cta}
            </Botao>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
