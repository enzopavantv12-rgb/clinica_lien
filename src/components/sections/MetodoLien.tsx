import { PadraoOndas, Simbolo } from '../ui/BrandGraphics';
import { Etiqueta } from '../ui/Etiqueta';
import { Reveal } from '../ui/Reveal';
import { Cardapio } from './Cardapio';
import { metodo } from '../../data/content';

/**
 * Metodo Lien + "Por onde voce quer comecar?" — layout do Print 2 (prompt
 * "sobre-metodo-lien", out/2026), texto do Alinhamento 2026 (literal).
 *
 * As duas sao <section> irmas (ancoras #metodo e #comecar, ordem conferida
 * pelo verificador) sobre o mesmo fundo branco com a padronagem oficial de
 * ondas em magenta a 3,5%, em ladrilho de 200px (mais delicada e sem zoom,
 * pedido da clinica em out/2026). O "Por onde comecar" e uma caixa propria, 96px
 * abaixo: o alinhamento exige a separacao entre Metodo e navegacao por queixa.
 *
 * Etapas: card neutro (o mesmo dos depoimentos), badge numerico alternando
 * magenta/teal (aria-hidden: a ordem vem do <ol>), mesma altura. Sem foto.
 */
export function MetodoLien() {
  return (
    <div className="relative isolate overflow-hidden bg-white py-[72px] lg:py-[112px]">
      <PadraoOndas className="pointer-events-none absolute inset-0 -z-10 h-full w-full" cor="#9C1781" opacidade={0.035} ladrilho={200} />

      <section id="metodo" aria-labelledby="metodo-title" className="mx-auto max-w-[1160px] px-6">
        <Reveal y={16} duracao={0.6} className="flex flex-col items-center text-center">
          <Etiqueta>{metodo.tag}</Etiqueta>
          <h2
            id="metodo-title"
            className="mt-3 text-[clamp(28px,3vw,38px)] font-bold leading-[1.15] text-ink"
          >
            {metodo.h2}
          </h2>
          <p className="mt-[14px] max-w-[620px] text-[17px] font-light leading-[1.6] text-ink-muted">{metodo.intro}</p>
        </Reveal>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {metodo.etapas.map((e, i) => (
            <Reveal as="li" key={e.numero} y={16} duracao={0.6} delay={i * 0.09} className="flex">
              <article className="w-full rounded-[24px] border border-[#E6E8EC] bg-[#F7F8FA] px-[30px] py-9 shadow-[0_1px_2px_rgba(26,20,32,.04),0_8px_24px_-12px_rgba(26,20,32,.08)] transition-transform duration-[250ms] ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <span
                  aria-hidden="true"
                  className={`grid h-11 w-11 place-items-center rounded-xl text-lg font-bold text-white ${
                    i % 2 === 0
                      ? 'bg-magenta shadow-[0_6px_14px_-6px_rgba(156,23,129,.5)]'
                      : 'bg-teal shadow-[0_6px_14px_-6px_rgba(3,126,153,.5)]'
                  }`}
                >
                  {e.numero}
                </span>
                <h3 className="mt-[22px] text-lg font-bold text-ink">{e.titulo}</h3>
                <p className="mt-[14px] text-[13.5px] leading-[1.65] text-ink-muted">{e.texto}</p>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal y={16} duracao={0.6} className="mt-10 flex flex-col items-center text-center">
          <p className="text-base font-medium italic text-ink">{metodo.fechamento}</p>
          <Simbolo className="mt-4 block h-auto w-24" />
        </Reveal>
      </section>

      <Cardapio />
    </div>
  );
}
