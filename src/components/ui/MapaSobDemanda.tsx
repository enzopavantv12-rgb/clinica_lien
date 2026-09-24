'use client';

import { useState } from 'react';
import { Map as IconeMapa } from 'lucide-react';

/**
 * Mapa do Google carregado so com clique (facade).
 *
 * O iframe do Google Maps grava cookies do Google ao carregar. Com
 * `loading="lazy"` ele carregaria sozinho ao rolar a pagina — antes de qualquer
 * consentimento, o que conflita com a LGPD e com a politica de privacidade do
 * site. Aqui nada do Google e baixado ate o visitante pedir. Depois do
 * clique, o mapa e o embed interativo completo (zoom, arraste, abrir no app).
 *
 * Contêiner: 300px no mobile, 380px a partir de 768px, cantos de 24px e borda
 * de 1px. O embed do Google nao tem tema escuro — fica claro dentro da borda.
 */
export function MapaSobDemanda({
  endereco,
  rotulo,
  aviso,
}: {
  endereco: string;
  rotulo: string;
  aviso: string;
}) {
  const [aberto, setAberto] = useState(false);

  const caixa = 'h-[300px] w-full overflow-hidden rounded-[24px] border border-ink/10 md:h-[380px]';

  if (aberto) {
    return (
      <div className={caixa}>
        <iframe
          title="Localização da Clínica Lien no Google Maps"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(endereco)}&z=16&hl=pt-BR&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className={`${caixa} flex flex-col items-center justify-center gap-3 bg-white p-5 text-center`}>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-ink/25 px-4 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
      >
        <IconeMapa size={18} strokeWidth={1.75} aria-hidden="true" className="text-teal" />
        {rotulo}
      </button>
      <p className="max-w-[30ch] text-legend text-ink-muted">{aviso}</p>
    </div>
  );
}
