import { ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { conteudos } from '../../data/content';

/**
 * Conteudos em Saude Bucal na home (alinhamento final, 3.11): degustacao
 * editorial com 3 artigos e o caminho para a biblioteca completa.
 * Faixa teal: texto branco sobre teal e combinacao do manual (4,72:1 sobre
 * branco puro vale para o inverso tambem); os cards sao brancos, com ink.
 */
export function ConteudosHome() {
  return (
    <section id="conteudos" className="bg-teal py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading tag={conteudos.tag} titulo={conteudos.h2} claro />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {conteudos.destaques.map((c, i) => (
            <Reveal as="li" key={c.href} delay={i * 0.06}>
              <a
                href={c.href}
                className="group flex h-full flex-col rounded-3xl bg-white p-7 shadow-lift transition-transform duration-300 ease-brand motion-safe:hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-8"
              >
                <p className="text-legend font-semibold uppercase tracking-[0.14em] text-teal">{c.rotulo}</p>
                <h3 className="mt-3 text-h3 sm:text-h3-lg font-semibold text-ink">{c.titulo}</h3>
                <p className="mt-3 text-body text-ink-muted">{c.descricao}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-[0.9375rem] font-medium text-magenta underline-offset-4 group-hover:underline">
                  {conteudos.lerConteudo}
                  <span className="sr-only">: {c.rotulo}</span>
                  <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <div className="mt-12 flex justify-center">
            <a
              href="/conteudos/"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-7 text-base font-medium text-teal transition-colors hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {conteudos.verTodos}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
