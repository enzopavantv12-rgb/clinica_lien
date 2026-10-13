"use client";
import { useReducedMotion } from "framer-motion";
import { MarqueeAnimation } from "@/components/ui/marquee-effect";
import { faixa } from "@/data/content";

/**
 * Faixa unica de prova rapida, logo abaixo do hero. O alinhamento final
 * (3.2) reduziu as duas faixas (magenta + teal) a uma: ficou a magenta, que e
 * a cor do esqueleto. Movimento lento; com movimento reduzido, texto parado.
 *
 * Numeros reais apenas. `overflow-x-clip` na secao: a inclinacao de -0.6deg
 * nao pode gerar rolagem horizontal.
 */
export function TrustMarquee() {
  const reduce = useReducedMotion();

  const linha =
    "normal-case font-medium text-sm md:text-base tracking-[0.04em] text-white py-2 md:py-2.5 *:me-8";

  return (
    <section aria-label={faixa.rotulo} className="relative overflow-x-clip bg-background py-8 md:py-10">
      {/* Leitura acessivel: leitores de tela ouvem a lista, nao o texto repetido */}
      <ul className="sr-only">
        {faixa.leitura.map((s) => <li key={s}>{s}</li>)}
      </ul>

      {reduce ? (
        <p aria-hidden className={`${linha} bg-[#9C1782] px-6 text-center`}>{faixa.texto}</p>
      ) : (
        <div aria-hidden className="-rotate-[0.6deg]">
          <MarqueeAnimation direction="left" baseVelocity={-0.8} className={`${linha} bg-[#9C1782]`}>
            {faixa.texto}
          </MarqueeAnimation>
        </div>
      )}
    </section>
  );
}
