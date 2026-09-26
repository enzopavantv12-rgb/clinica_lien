"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion, useReducedMotion } from "motion/react";
import { testimonials } from "@/content/testimonials";
import { Simbolo } from "@/components/ui/BrandGraphics";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { depoimentos } from "@/data/content";

/**
 * Colunas de depoimentos (testimonials-columns-1), logo abaixo da faixa de
 * numeros. Estrutura do demo; copy e tema da Lien.
 *
 * - So avaliacoes reais (src/content/testimonials.ts). Nunca duplicar textos
 *   para encher: < 6 -> 1 coluna, 6+ -> 2, 9+ -> 3. Sem nenhuma, a secao
 *   mostra so o titulo, a nota do Google e o CTA.
 * - Acessibilidade: as colunas em movimento ficam `aria-hidden` (o componente
 *   duplica a lista internamente) e uma lista `sr-only` le cada depoimento
 *   uma vez. Movimento reduzido: grade estatica com os 3 primeiros.
 * - Pausa: o botao troca as colunas por uma grade estatica com todos os
 *   depoimentos (WCAG 2.2.2). Nao ha pausa no hover: o motion anima por
 *   JavaScript (transform inline a cada quadro), entao nem
 *   `animation-play-state` nem a Web Animations API alcancam a coluna — so
 *   alterando o componente, que deve ficar identico ao original.
 * - Estilo dos cards pelo tema e por CSS (`.lien-depoimentos` no
 *   globals.css), sem mexer no JSX do componente.
 */
const total = testimonials.length;
const numColunas = total >= 9 ? 3 : total >= 6 ? 2 : total > 0 ? 1 : 0;
const porColuna = numColunas ? Math.ceil(total / numColunas) : 0;
const colunas = Array.from({ length: numColunas }, (_, i) =>
  testimonials.slice(i * porColuna, (i + 1) * porColuna),
);
const firstColumn = colunas[0] ?? [];
const secondColumn = colunas[1] ?? [];
const thirdColumn = colunas[2] ?? [];

export const Testimonials = () => {
  const reduzir = useReducedMotion();
  const [pausado, setPausado] = useState(false);

  const { nota, total: totalGoogle, url } = depoimentos.google;

  return (
    <section id="depoimentos" className="lien-depoimentos bg-background py-20 relative">
      <div className="container z-10 mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-teal py-1 px-4 rounded-lg text-tag sm:text-tag-lg font-semibold uppercase tracking-[0.18em] text-teal">
              {depoimentos.tag}
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-ink text-center">
            {depoimentos.h2}
          </h2>
          <Simbolo variante="rgb" className="mt-4 block h-auto w-14" />
          <p className="text-center mt-5 opacity-75 text-ink">
            Nota {nota} no Google, com {totalGoogle} avaliações de pacientes reais.
          </p>
        </motion.div>

        {total > 0 && (
          <>
            {/* Leitores de tela: cada depoimento uma vez so. */}
            <ul className="sr-only">
              {testimonials.map((t) => (
                <li key={t.name + t.text.slice(0, 20)}>
                  {t.text} — {t.name}, {t.role}
                </li>
              ))}
            </ul>

            {reduzir || pausado ? (
              <div aria-hidden="true" className="mt-10 grid justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(reduzir ? testimonials.slice(0, 3) : testimonials).map(({ text, image, name, role }) => (
                  <div key={name + text.slice(0, 20)} className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full">
                    <div>{text}</div>
                    <div className="flex items-center gap-2 mt-5">
                      <img width={40} height={40} src={image} alt="" className="h-10 w-10 rounded-full" />
                      <div className="flex flex-col">
                        <div className="font-medium tracking-tight leading-5">{name}</div>
                        <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden"
              >
                <TestimonialsColumn testimonials={firstColumn} duration={15} />
                {secondColumn.length > 0 && (
                  <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                )}
                {thirdColumn.length > 0 && (
                  <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                )}
              </div>
            )}
          </>
        )}

        <div className="mt-10 flex flex-col items-center gap-5">
          <WhatsAppButton
            origem="depoimentos"
            variante="capsula"
            tamanho="capsula"
            className="shadow-[0_10px_30px_-10px_rgba(156,23,129,0.55)]"
          >
            {depoimentos.cta}
          </WhatsAppButton>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded text-[0.9375rem] font-medium text-ink-muted underline underline-offset-4 hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
              >
                {depoimentos.verTodas}
              </a>
            )}
            {total > 0 && !reduzir && (
              <button
                type="button"
                onClick={() => setPausado((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-legend font-medium text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
              >
                {pausado ? (
                  <Play size={14} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Pause size={14} strokeWidth={2} aria-hidden="true" />
                )}
                {pausado ? depoimentos.retomar : depoimentos.pausar}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
