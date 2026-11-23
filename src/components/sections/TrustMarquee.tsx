import { faixa } from '@/data/content';

/**
 * Faixa unica de prova rapida, logo abaixo do hero. O alinhamento final
 * (3.2) reduziu as duas faixas (magenta + teal) a uma: ficou a magenta, que e
 * a cor do esqueleto. Movimento lento; com movimento reduzido, texto parado.
 *
 * So CSS (nov/2026, desempenho): a faixa antes rodava no framer-motion. O
 * trilho tem 4 copias; a animacao (.marquee-trilho) desliza uma copia (25%)
 * em 31,25s, a mesma velocidade de antes. `overflow-x-clip` na secao: a
 * inclinacao de -0.6deg nao pode gerar rolagem horizontal.
 */
export function TrustMarquee() {
  const linha = 'normal-case font-medium text-sm md:text-base tracking-[0.04em] text-white py-2 md:py-2.5';

  return (
    <section aria-label={faixa.rotulo} className="relative overflow-x-clip bg-background py-8 md:py-10">
      {/* Leitura acessivel: leitores de tela ouvem a lista, nao o texto repetido */}
      <ul className="sr-only">
        {faixa.leitura.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="-rotate-[0.6deg]">
        <div className={`relative flex max-w-[100vw] overflow-hidden bg-[#9C1782] ${linha}`}>
          <div className="marquee-trilho flex flex-nowrap whitespace-nowrap *:me-8 *:block">
            <span>{faixa.texto}</span>
            <span>{faixa.texto}</span>
            <span>{faixa.texto}</span>
            <span>{faixa.texto}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
