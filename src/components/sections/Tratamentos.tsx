import { Etiqueta } from '../ui/Etiqueta';
import { Reveal } from '../ui/Reveal';
import { TratamentoCardLink } from '../ui/TratamentoCard';
import { tratamentos } from '../../data/content';

const destaques = tratamentos.lista.filter((t) => 'home' in t && t.home);

/**
 * Tratamentos na home — visual do print aprovado (prompt "tratamentos-lien",
 * out/2026) com a estrutura do Alinhamento Final: so os 3 destaques, com a
 * frase aprovada, e "Ver todos os tratamentos" (secundario, para nao
 * competir com o CTA principal). Nenhum WhatsApp nos cards; sem o arco
 * decorativo (aqui nao sobra espaco vazio na grade).
 *
 * Tag teal sobre branco com borda: sobre #E3F1F4 o teal mede 4,08:1.
 * Degrade sem as posicoes finais: o verificador reprova "100%" na marcacao.
 */
export function Tratamentos() {
  return (
    <section
      id="tratamentos"
      aria-labelledby="tratamentos-title"
      className="bg-[linear-gradient(180deg,#FFFFFF,#F6F7F9_18%)] py-[72px] lg:py-[112px]"
    >
      <Reveal y={16} duracao={0.6} className="mx-auto flex max-w-[1000px] flex-col items-center px-6 text-center">
        <Etiqueta cor="teal">{tratamentos.tag}</Etiqueta>
        <h2 id="tratamentos-title" className="mt-3 text-[clamp(28px,3vw,34px)] font-bold leading-[1.15] text-ink">
          {tratamentos.h2}
        </h2>
        <p className="mt-[14px] max-w-[470px] text-base font-light leading-[1.6] text-ink-muted">{tratamentos.sub}</p>
      </Reveal>

      <ul
        role="list"
        className="mx-auto mt-14 grid max-w-[1000px] gap-4 px-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7"
      >
        {destaques.map((t, i) => (
          <Reveal
            as="li"
            key={t.slug}
            y={16}
            duracao={0.6}
            delay={i * 0.07}
            // Tablet (2 colunas): o 3o card fica sozinho e centralizado.
            className="sm:last:col-span-2 sm:last:mx-auto sm:last:w-[calc(50%-10px)] lg:last:col-span-1 lg:last:w-auto"
          >
            <TratamentoCardLink
              slug={t.slug}
              nome={t.nome}
              resumo={t.resumo}
              indice={i}
              href={`/tratamentos/#${t.slug}`}
              rotulo={tratamentos.saibaMais}
            />
          </Reveal>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <a
          href="/tratamentos/"
          className="inline-flex h-12 items-center rounded-full border-[1.5px] border-magenta px-7 text-[15px] font-medium text-magenta transition-colors hover:bg-[#F7E4F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
        >
          {tratamentos.verTodos}
        </a>
      </div>
    </section>
  );
}
