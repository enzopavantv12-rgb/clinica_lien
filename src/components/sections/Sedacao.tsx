import { Reveal } from '../ui/Reveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { sedacao } from '../../data/content';

/** Icones oficiais (pasta ACOLHIMENTO-AVANCADO, `npm run icones`). Decorativos. */
function Icone({ nome, className = '' }: { nome: string; className?: string }) {
  return (
    <img
      src={`/icones-lien/sedacao-${nome}.webp`}
      width={120}
      height={120}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}

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
 * - H2 em Poppins 700 e textos em 500, como no print de diagramacao (out/2026).
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
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-6 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          <Reveal y={16} duracao={0.6}>
            <span className="inline-block rounded-full bg-white/[.16] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[.12em] text-white/85">
              {sedacao.tag}
            </span>
          </Reveal>
          <Reveal y={16} duracao={0.6} delay={0.08}>
            <h2
              id="sedacao-title"
              className="mt-[14px] text-[clamp(32px,3.8vw,44px)] font-bold leading-[1.08] tracking-[-.01em] text-white"
            >
              <Linhas linhas={sedacao.h2Linhas} />
            </h2>
          </Reveal>
          <Reveal y={16} duracao={0.6} delay={0.16}>
            <p className="mt-5 max-w-[680px] text-[16px] font-medium leading-[1.75] text-white">{sedacao.texto}</p>
          </Reveal>

          <ul role="list" className="mt-10 grid max-w-[680px] gap-[14px] sm:grid-cols-2 sm:gap-5">
            {sedacao.modalidades.map((m, i) => {
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
                    <Icone nome={m.icone} className="h-[38px] w-[38px] shrink-0" />
                    <h3 className="text-[14.5px] font-bold leading-[1.35] text-white">
                      <Linhas linhas={m.linhas} />
                    </h3>
                  </div>
                  <p className="mt-[18px] text-[13px] font-medium leading-[1.6] text-white/[.95]">{m.texto}</p>
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
            {/* O arquivo ja traz o circulo rosa-claro. */}
            <Icone nome="equipe" className="mx-auto block h-16 w-16" />
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
