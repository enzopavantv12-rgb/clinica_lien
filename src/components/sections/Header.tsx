import { useEffect, useState } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { navegacao, rodape, site } from '../../data/content';

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 12);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Trava o scroll do body enquanto o menu mobile esta aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-brand ${
        rolou ? 'bg-white/95 shadow-soft backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 sm:px-8">
        <a
          href="#inicio"
          aria-label={`${site.nome} — início`}
          className="rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
        >
          <Logo variante="colorida" className="h-12 sm:h-14" />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {navegacao.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded text-[0.9375rem] font-medium text-ink transition-colors hover:text-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram da Lien Reabilitação Oral (${site.arroba})`}
            className="hidden rounded-xl p-2 text-teal transition-colors hover:bg-teal/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:block"
          >
            <Instagram size={22} strokeWidth={1.75} aria-hidden="true" />
          </a>

          <WhatsAppButton
            origem="menu"
            tamanho="md"
            className="hidden sm:inline-flex"
          >
            {rodape.agendarLabel}
          </WhatsAppButton>

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            className="rounded-xl p-2 text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta lg:hidden"
          >
            {aberto ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {aberto && (
        <div
          id="menu-mobile"
          className="border-t border-brandgray bg-white px-5 pb-7 pt-2 lg:hidden"
        >
          <nav aria-label="Navegação mobile" className="flex flex-col">
            {navegacao.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className="border-b border-brandgray/70 py-4 text-base font-medium text-ink transition-colors hover:text-magenta"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 border-b border-brandgray/70 py-4 text-base font-medium text-ink transition-colors hover:text-magenta"
            >
              <Instagram size={20} strokeWidth={1.75} aria-hidden="true" />
              Instagram
            </a>
          </nav>
          <WhatsAppButton origem="menu" className="mt-6 w-full">
            {rodape.agendarLabel}
          </WhatsAppButton>
        </div>
      )}
    </header>
  );
}
