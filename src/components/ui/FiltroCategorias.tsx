'use client';

import { useState } from 'react';

const foco =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta';

/**
 * Chips de categoria da biblioteca de conteudos. Mostra/oculta os blocos
 * `[data-categoria]` da pagina (renderizados no servidor, todos visiveis sem
 * JS). `aria-pressed` em cada chip: e um filtro, nao uma navegacao.
 */
export function FiltroCategorias({
  categorias,
  todas,
  rotulo,
}: {
  categorias: readonly string[];
  todas: string;
  rotulo: string;
}) {
  const [ativa, setAtiva] = useState<string | null>(null);

  const escolher = (categoria: string | null) => {
    setAtiva(categoria);
    document.querySelectorAll<HTMLElement>('[data-categoria]').forEach((bloco) => {
      bloco.hidden = categoria !== null && bloco.dataset.categoria !== categoria;
    });
  };

  const chip = (selecionado: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
      selecionado ? 'border-magenta bg-magenta text-white' : 'border-ink/20 bg-white text-ink hover:border-magenta'
    } ${foco}`;

  return (
    <div role="group" aria-label={rotulo} className="flex flex-wrap gap-2">
      <button type="button" aria-pressed={ativa === null} onClick={() => escolher(null)} className={chip(ativa === null)}>
        {todas}
      </button>
      {categorias.map((c) => (
        <button key={c} type="button" aria-pressed={ativa === c} onClick={() => escolher(c)} className={chip(ativa === c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
