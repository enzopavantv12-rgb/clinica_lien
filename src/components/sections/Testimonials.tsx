'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { testimonials } from '@/content/testimonials';
import { depoimentos } from '@/data/content';

const Star = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[15px] w-[15px] fill-[#F2A23A]">
    <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.9l-5.25 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
  </svg>
);

/**
 * "Quem vive a Lien, conta." — layout do print aprovado (prompt
 * "depoimentos-lien", out/2026): 3 cards com estrelas, depoimento literal em
 * italico, divisor e autor com avatar de inicial (permitido em depoimento de
 * paciente; proibido so na equipe). Sem CTA, setas ou "ver mais".
 *
 * - Desktop (>= 1024px): 3 colunas, mesma altura, autor colado na base.
 * - Tablet e celular: carrossel com scroll-snap (60% / 85% por card); pontos
 *   so no celular, atualizados por IntersectionObserver.
 * - Separada dos Resultados (prova clinica, logo acima, sobre a grade):
 *   aqui fundo liso quase branco, sem a grade e o brilho.
 *
 * Desvios do prompt, pelas regras do projeto:
 * - Degrade de fundo sem as posicoes (0/50/100 sao o padrao de 3 cores): o
 *   verificador reprova "100%" em qualquer lugar da marcacao.
 * - Italico: a Poppins italica nao e carregada (e nao se importa fonte nova);
 *   o navegador inclina a Poppins regular.
 * - Pill: teal sobre #E3F1F4 mede 4,08:1 (reprova AA em 11px). Fundo branco
 *   (4,72:1) com borda teal-clara no lugar.
 * - Linha de contexto em #6B6470 (5,37:1): #7A7380 mede 4,3:1 sobre o card.
 * - Estrelas com "Nota 5 de 5 estrelas" (o verificador bloqueia "avaliacao").
 */
export function Testimonials() {
  const trilhoRef = useRef<HTMLUListElement>(null);
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const itens = Array.from(trilho.children) as HTMLElement[];
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setAtivo(itens.indexOf(e.target as HTMLElement));
        }
      },
      { root: trilho, threshold: 0.6 },
    );
    itens.forEach((i) => observador.observe(i));
    return () => observador.disconnect();
  }, []);

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="overflow-x-clip bg-[linear-gradient(180deg,#FFFFFF,#F9FAFB,#FFFFFF)] py-[72px] lg:py-[112px]"
    >
      <Reveal y={16} duracao={0.6} className="mx-auto max-w-[1160px] px-6 text-center">
        <span className="inline-block rounded-full border border-[#037E99]/25 bg-white px-[14px] py-[6px] text-[11px] font-semibold uppercase leading-none tracking-[.12em] text-[#037E99]">
          {depoimentos.tag}
        </span>
        <h2
          id="depoimentos-title"
          className="mt-[10px] text-[clamp(26px,2.6vw,32px)] font-bold leading-[1.2] text-[#1A1420]"
        >
          {depoimentos.h2}
        </h2>
        <p className="mx-auto mt-3 max-w-[640px] text-base leading-[1.6] text-[#5A5260]">{depoimentos.sub}</p>
      </Reveal>

      <ul
        ref={trilhoRef}
        role="list"
        aria-label={depoimentos.trilho}
        tabIndex={0}
        className="mx-auto mt-14 flex max-w-[1160px] snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible"
      >
        {testimonials.map((t, i) => (
          <Reveal
            as="li"
            key={t.name}
            y={16}
            duracao={0.6}
            delay={i * 0.09}
            className="flex flex-[0_0_85%] snap-center sm:flex-[0_0_60%] lg:flex-auto"
          >
            <figure className="flex w-full flex-col rounded-[24px] border border-[#E6E8EC] bg-[#F7F8FA] px-[30px] pb-7 pt-8 text-left shadow-[0_1px_2px_rgba(26,20,32,.04),0_8px_24px_-12px_rgba(26,20,32,.08)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(26,20,32,.05),0_14px_32px_-14px_rgba(26,20,32,.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <div role="img" aria-label={depoimentos.estrelas} className="flex gap-[2px]">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} />
                ))}
              </div>

              <blockquote className="mb-6 mt-5 text-[14.5px] italic leading-[1.75] text-[#3B3540]">
                <p>&ldquo;{t.text}&rdquo;</p>
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3 border-t border-[#E6E8EC] pt-[18px]">
                <span
                  aria-hidden="true"
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-base font-semibold text-white ${
                    i % 2 === 0 ? 'bg-[#9C1781]' : 'bg-[#037E99]'
                  }`}
                >
                  {t.name.charAt(0)}
                </span>
                {/* Altura de nome + 2 linhas de contexto: os divisores dos 3 cards
                    ficam na mesma linha mesmo quando o contexto cabe em uma. */}
                <span className="flex min-h-[55px] flex-col justify-center">
                  <strong className="text-[15px] font-semibold leading-[1.3] text-[#1A1420]">{t.name}</strong>
                  <span className="text-[12.5px] leading-[1.4] text-[#6B6470]">
                    Paciente {t.context} · {depoimentos.fonte}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      {/* Pontos so no celular (abaixo de 640px), decorativos: o trilho ja e
          rolavel por teclado e o leitor de tela le a lista inteira. */}
      <div aria-hidden="true" className="mt-5 flex justify-center gap-2 sm:hidden">
        {testimonials.map((t, i) => (
          <span
            key={t.name}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${i === ativo ? 'bg-[#9C1781]' : 'bg-[#E1E1E1]'}`}
          />
        ))}
      </div>
    </section>
  );
}
