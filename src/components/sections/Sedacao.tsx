import { Reveal } from '../ui/Reveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { sedacao } from '../../data/content';

/* Icones preenchidos do print: corpo rosa-claro com detalhes em branco a 70%
   (cards de vidro) e equipe com dente em magenta (card lateral). Decorativos. */

function IconePilula({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      <g transform="rotate(-40 18 20)">
        <rect x="6" y="13" width="26" height="12" rx="6" fill="#F0B6F2" />
        <path d="M19 13v12" stroke="#fff" strokeOpacity={0.7} strokeWidth={1.6} />
        <path d="M10.5 17.2c.6-.9 1.6-1.4 2.7-1.4" stroke="#fff" strokeOpacity={0.7} strokeWidth={1.6} strokeLinecap="round" fill="none" />
      </g>
      <circle cx="31" cy="30.5" r="5" fill="#F0B6F2" />
      <path d="M28 30.5h6" stroke="#fff" strokeOpacity={0.7} strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

function IconeAnestesista({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      <circle cx="16" cy="12.5" r="7" fill="#F0B6F2" />
      <path d="M3.5 34c0-7 5.6-12 12.5-12s12.5 5 12.5 12v1.5h-25Z" fill="#F0B6F2" />
      <circle cx="31" cy="15" r="6.5" fill="#F0B6F2" />
      <path d="M31 11.6v6.8M27.6 15h6.8" stroke="#fff" strokeOpacity={0.85} strokeWidth={1.8} strokeLinecap="round" />
    </svg>
  );
}

function IconeEquipeDente({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {/* Dente acima, com dois tracos de brilho. */}
      <path d="M14 2.2c-1.4 0-2.3 1-2.3 2.4 0 1.5.6 2.4 1 3.8.3 1.3.5 3 1.4 3 .8 0 .8-2 1.9-2s1.1 2 1.9 2c.9 0 1.1-1.7 1.4-3 .4-1.4 1-2.3 1-3.8 0-1.4-.9-2.4-2.3-2.4-.9 0-1.3.4-2 .4s-1.1-.4-2-.4Z" />
      <path d="M9 3.5 7.6 2.4M23 3.5l1.4-1.1" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
      {/* Tres bustos, o do meio maior. */}
      <circle cx="16" cy="16.5" r="3.4" />
      <path d="M9.6 29.5c0-3.9 2.9-6.6 6.4-6.6s6.4 2.7 6.4 6.6Z" />
      <circle cx="7.2" cy="18.6" r="2.6" opacity={0.75} />
      <path d="M2.4 29.5c0-3.1 2.1-5.3 4.8-5.3 1.1 0 2.1.3 2.9.9-1 1.2-1.6 2.8-1.6 4.4Z" opacity={0.75} />
      <circle cx="24.8" cy="18.6" r="2.6" opacity={0.75} />
      <path d="M29.6 29.5c0-3.1-2.1-5.3-4.8-5.3-1.1 0-2.1.3-2.9.9 1 1.2 1.6 2.8 1.6 4.4Z" opacity={0.75} />
    </svg>
  );
}

const ICONES = { pilula: IconePilula, anestesista: IconeAnestesista } as const;

/** Duas linhas com quebra so no desktop (as do print); no mobile, texto corrido. */
function Linhas({ linhas }: { linhas: readonly string[] }) {
  return (
    <>
      {linhas[0]} <br className="hidden lg:inline" />
      {linhas[1]}
    </>
  );
}

/**
 * Sedacao — print aprovado (prompt "sedacao-lien", out/2026): layout e copy
 * LITERAIS, por decisao da clinica. Degrade magenta, sem foto; a esquerda tag,
 * H2 em 2 linhas, paragrafo e 2 cards de vidro (as modalidades); a direita o
 * card branco "Converse com nossa equipe" com o WhatsApp.
 *
 * - H2 em Poppins 800 no prompt: o peso nao e carregado, o navegador usa o 900.
 * - Contraste (medido nos 3 pontos do degrade): paragrafo branco 7,9:1+, texto
 *   dos cards a 92% 5,8:1+, tag a 85% 4,6:1+.
 * - Botao com padding de 16px (e nao 22px) e sem quebra: com 22px o texto
 *   quebrava em 2 linhas no card de 306px.
 * - CTA "Quero conversar sobre isso" no lugar de "Agende sua consulta" e
 *   decisao da clinica (excecao registrada no verificador e no relatorio).
 */
export function Sedacao() {
  const { conversa } = sedacao;
  return (
    <section
      id="sedacao"
      aria-labelledby="sedacao-title"
      className="bg-[linear-gradient(100deg,#8E1F7E,#82206F_45%,#6E1A63)] py-16 lg:py-[88px]"
    >
      <div className="mx-auto grid max-w-[1080px] items-center gap-10 px-6 lg:grid-cols-[1fr_306px] lg:gap-14">
        <div>
          <Reveal y={16} duracao={0.6}>
            <span className="inline-block rounded-full bg-white/[.16] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[.12em] text-white/85">
              {sedacao.tag}
            </span>
          </Reveal>
          <Reveal y={16} duracao={0.6} delay={0.08}>
            <h2
              id="sedacao-title"
              className="mt-[14px] text-[clamp(32px,3.8vw,42px)] font-extrabold leading-[1.06] tracking-[-.01em] text-white"
            >
              <Linhas linhas={sedacao.h2Linhas} />
            </h2>
          </Reveal>
          <Reveal y={16} duracao={0.6} delay={0.16}>
            <p className="mt-5 max-w-[610px] text-[15.5px] leading-[1.7] text-white">{sedacao.texto}</p>
          </Reveal>

          <ul role="list" className="mt-11 grid max-w-[652px] gap-[14px] sm:grid-cols-2 sm:gap-5">
            {sedacao.modalidades.map((m, i) => {
              const Icone = ICONES[m.icone];
              return (
                <Reveal
                  as="li"
                  key={m.icone}
                  y={16}
                  duracao={0.6}
                  delay={0.24 + i * 0.08}
                  className="rounded-2xl border border-white/[.18] bg-white/10 px-[22px] pb-[26px] pt-[22px] backdrop-blur-[6px] transition-colors hover:bg-white/[.14] motion-reduce:transition-none"
                >
                  <div className="flex items-start gap-3">
                    <Icone className="h-[38px] w-[38px] shrink-0" />
                    <h3 className="text-[14.5px] font-bold leading-[1.35] text-white">
                      <Linhas linhas={m.linhas} />
                    </h3>
                  </div>
                  <p className="mt-[18px] text-[12.5px] leading-[1.65] text-white/[.92]">{m.texto}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal y={0} escala={0.97} duracao={0.7} delay={0.25} className="w-full">
          <aside
            aria-labelledby="sedacao-cta-title"
            className="mx-auto w-full rounded-[22px] bg-white px-[26px] pb-[26px] pt-[22px] text-center shadow-[0_30px_60px_-20px_rgba(30,0,25,.45),0_8px_20px_-10px_rgba(30,0,25,.25)] transition-transform duration-[250ms] hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:max-w-[380px] lg:max-w-none"
          >
            <span aria-hidden="true" className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#F7E4F5]">
              <IconeEquipeDente className="h-[30px] w-[30px] text-magenta" />
            </span>
            <h3 id="sedacao-cta-title" className="mt-[14px] text-[19px] font-bold leading-[1.35] text-ink">
              <Linhas linhas={conversa.linhas} />
            </h3>
            <p className="mt-4 text-[12px] leading-[1.6] text-ink-muted">
              <Linhas linhas={conversa.textoLinhas} />
            </p>
            <WhatsAppButton
              origem="sedacao"
              variante="capsula"
              tamanho="capsulaMenu"
              className="mt-[22px] w-full whitespace-nowrap !h-11 !rounded-[10px] !px-4 !text-sm !font-medium"
            >
              {conversa.cta}
              <span className="sr-only">{conversa.ctaLeitor}</span>
            </WhatsAppButton>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
