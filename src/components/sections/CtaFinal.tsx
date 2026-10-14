import { Reveal } from '../ui/Reveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { ctaFinal } from '../../data/content';

/**
 * CTA final — print aprovado (prompt "cta-final-lien", out/2026): card largo
 * em degrade magenta -> teal (.cta-final-card, globals.css: o "100%" do
 * degrade nao pode ir na marcacao), texto centralizado e um unico botao
 * branco "Agende sua consulta" (UM UNICO BOTAO: dois CTAs iguais geram
 * paralisia de decisao).
 *
 * - H2 em Poppins 800 no prompt: o peso nao e carregado, o navegador usa o
 *   900; "consulta cuidadosa." em italico sintetico (sem Poppins italica).
 * - Contraste: no extremo teal (#34809A) o branco mede 4,47:1 e o branco a
 *   92% 4,06:1. O paragrafo ficou em branco cheio e o degrade so se move a
 *   partir de 768px, onde o texto nao alcanca a borda teal (5,2:1 ou mais).
 * - Sem logo (o print nao tem).
 * - Celular: padding de 24px e 12px entre icone e texto (e nao 30/40 e 20px),
 *   para "Agende sua consulta" caber numa linha no botao de 340px.
 */
export function CtaFinal() {
  const [inicio, uma, destaque] = ctaFinal.h2Partes;
  return (
    <section id="agendar" aria-labelledby="cta-final-title" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1320px] px-6">
        <Reveal
          y={24}
          duracao={0.7}
          className="cta-final-card relative overflow-hidden rounded-3xl px-6 py-12 text-center shadow-[0_34px_60px_-24px_rgba(26,20,32,.35),0_12px_24px_-12px_rgba(26,20,32,.18)] md:px-8 md:pb-[60px] md:pt-16"
        >
          {/* Brilho muito sutil no topo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,.08),transparent_70%)]"
          />
          <Reveal y={16} duracao={0.6} delay={0.09} className="relative">
            <h2
              id="cta-final-title"
              className="mx-auto max-w-[640px] text-[clamp(28px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-.01em] text-white"
            >
              {inicio} <br className="hidden md:inline" />
              {uma} <em className="italic">{destaque}</em>
            </h2>
          </Reveal>
          <Reveal y={16} duracao={0.6} delay={0.18} className="relative">
            <p className="mx-auto mt-6 max-w-[760px] text-[clamp(15px,1.3vw,17.5px)] font-light leading-[1.7] text-white">
              {ctaFinal.textoLinhas[0]} <br className="hidden md:inline" />
              {ctaFinal.textoLinhas[1]}
            </p>
          </Reveal>
          <Reveal y={16} duracao={0.6} delay={0.27} className="relative">
            <WhatsAppButton
              origem="cta-final"
              variante="branco"
              comIcone={false}
              className="group mx-auto mt-12 !inline-flex !h-14 w-full max-w-[340px] whitespace-nowrap !gap-3 !rounded-full !px-6 !py-0 md:!pl-[30px] md:!pr-10 !text-[17px] !font-bold !text-[#8E1F7E] shadow-[0_12px_24px_-10px_rgba(20,10,30,.35)] transition hover:!text-magenta hover:shadow-[0_18px_32px_-12px_rgba(20,10,30,.4)] active:translate-y-0 focus-visible:!outline-[3px] focus-visible:!outline-offset-4 focus-visible:!outline-[#F0B6F2] motion-reduce:transition-none md:!h-[60px] md:w-auto md:max-w-none md:!gap-6 md:!text-xl"
            >
              <WhatsAppGrande />
              {ctaFinal.cta}
            </WhatsAppButton>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}

/** Icone do WhatsApp em 26px (celular) / 30px (desktop), na cor do texto. */
function WhatsAppGrande() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className="h-[26px] w-[26px] shrink-0 md:h-[30px] md:w-[30px]">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
