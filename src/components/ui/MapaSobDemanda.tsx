'use client';

import { useState } from 'react';
import { Map as IconeMapa } from 'lucide-react';

/**
 * Mapa do Google carregado so com clique (facade).
 *
 * O iframe do Google Maps grava cookies do Google ao carregar. Com
 * `loading="lazy"` ele carregaria sozinho ao rolar a pagina — antes de qualquer
 * consentimento, o que conflita com a LGPD e com a politica de privacidade do
 * site. Aqui nada do Google e baixado ate o visitante pedir.
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

  if (aberto) {
    return (
      <iframe
        title={`Mapa: ${endereco}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed`}
        className="aspect-[4/3] w-full rounded-2xl border border-brandgray"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ink/20 bg-white p-5 text-center">
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
