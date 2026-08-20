import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappUrlPor } from '../../lib/whatsapp';
import { trackWhatsAppClick } from '../../lib/tracking';

/**
 * Botao flutuante de WhatsApp.
 * Visivel a partir de 600px de scroll. `aria-label` descritivo.
 * Posicionado com safe-area para nao cobrir conteudo no mobile.
 */
export function FloatingWhatsApp() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 600);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <a
      href={whatsappUrlPor('flutuante')}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('flutuante')}
      aria-label="Agendar avaliação na Lien pelo WhatsApp"
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
