"use client";
import { useReducedMotion } from "framer-motion";
import { MarqueeAnimation } from "@/components/ui/marquee-effect";

/**
 * Faixa de numeros logo abaixo do hero: duas faixas finas em movimento, em
 * direcoes opostas, nas cores pedidas no prompt (#9C1782 e #047E99).
 * Substitui a antiga barra de confianca (Confianca.tsx).
 *
 * Numeros reais apenas: sem "3 reabilitacoes"; "+200 pacientes" so entra se a
 * clinica confirmar. `overflow-x-clip` na secao: a inclinacao de -0.6deg nao
 * pode gerar rolagem horizontal.
 */
const LINE_1 =
  "5,0 no Google  ✦  57 avaliações  ✦  6 especialistas  ✦  Planejamento digital  ✦  Escâner intraoral  ✦";
const LINE_2 =
  "Cruzeiro · Belo Horizonte  ✦  Atendimento particular  ✦  Consulta sem pressa  ✦  Cuidado do início ao acompanhamento  ✦";

const STATS = [
  "Nota 5,0 no Google, com 57 avaliações",
  "6 especialistas",
  "Planejamento digital com escâner intraoral",
  "Atendimento particular no Cruzeiro, Belo Horizonte",
];

export function TrustMarquee() {
  const reduce = useReducedMotion();

  const lineBase =
    "normal-case font-medium text-sm md:text-base tracking-[0.04em] text-white py-2 md:py-2.5 *:me-8";

  return (
    <section aria-label="A Lien em números" className="relative overflow-x-clip bg-background py-10 md:py-14">
      {/* Leitura acessível: leitores de tela ouvem a lista, não o texto repetido */}
      <ul className="sr-only">
        {STATS.map((s) => <li key={s}>{s}</li>)}
      </ul>

      {reduce ? (
        <div aria-hidden className="flex flex-col gap-3">
          <p className={`${lineBase} bg-[#9C1782] px-6 text-center`}>{LINE_1}</p>
          <p className={`${lineBase} bg-[#047E99] px-6 text-center`}>{LINE_2}</p>
        </div>
      ) : (
        <div aria-hidden className="flex flex-col gap-3 -rotate-[0.6deg]">
          <MarqueeAnimation direction="left" baseVelocity={-1.2} className={`${lineBase} bg-[#9C1782]`}>
            {LINE_1}
          </MarqueeAnimation>
          <MarqueeAnimation direction="right" baseVelocity={-1.2} className={`${lineBase} bg-[#047E99]`}>
            {LINE_2}
          </MarqueeAnimation>
        </div>
      )}
    </section>
  );
}
