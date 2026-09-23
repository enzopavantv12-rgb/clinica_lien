'use client';

import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappUrlPor } from '../../lib/whatsapp';
import { trackWhatsAppClick } from '../../lib/tracking';

/** Distancia de rolagem usada nas paginas sem hero (ex.: /privacidade/). */
const LIMITE_SEM_HERO = 600;

/**
 * Botao flutuante de WhatsApp.
 * Aparece so depois que o hero sai da tela — antes disso o CTA do proprio hero
 * esta visivel, e dois botoes iguais disputariam a atencao.
 * So icone, entao aqui o `aria-label` e o nome acessivel.
 * Posicionado com safe-area para nao cobrir conteudo no mobile.
 */
export function FloatingWhatsApp() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const hero = document.getElementById('inicio');
      const limite = hero ? hero.offsetTop + hero.offsetHeight : LIMITE_SEM_HERO;
      setVisivel(window.scrollY > limite);
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar, { passive: true });
    return () => {
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
    };
  }, []);

  return (
    <a
      href={whatsappUrlPor('flutuante')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('flutuante')}
      data-cta="flutuante"
      aria-label="Agende sua consulta pelo WhatsApp"
      aria-hidden={!visivel}
      tabIndex={visivel ? 0 : -1}
      className={`fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-magenta text-white shadow-lift transition-all duration-300 ease-brand hover:bg-[#87146F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta ${
        visivel ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
