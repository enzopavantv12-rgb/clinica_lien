/**
 * Icone oficial do WhatsApp, em SVG inline.
 *
 * Substitui o `MessageCircle` generico do lucide: o botao de conversao precisa
 * ser reconhecido como WhatsApp em menos de um segundo, e a bolha generica nao
 * entrega isso.
 *
 * Herda a cor do texto do botao via `currentColor` — branco sobre magenta,
 * magenta sobre branco. Isso mantem o icone dentro da paleta do manual em
 * qualquer contexto, sem introduzir o verde do WhatsApp (cor que nao existe
 * no manual e cujo uso e vedado pelos "usos incorretos").
 *
 * Glifo desenhado em viewBox 24x24 para casar com a metrica dos icones lucide
 * usados no resto da pagina.
 */
export function WhatsAppIcon({
  size = 20,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Contorno da bolha com a cauda no canto inferior esquerdo */}
      <path
        d="M12.04 2.5c-5.23 0-9.48 4.25-9.48 9.48 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.44 9.44 0 0 0 4.64 1.21h.01c5.22 0 9.47-4.25 9.47-9.48a9.42 9.42 0 0 0-2.77-6.7 9.42 9.42 0 0 0-6.71-2.75Zm0 17.36h-.01a7.87 7.87 0 0 1-4.01-1.1l-.29-.17-2.98.78.8-2.91-.19-.3a7.85 7.85 0 0 1-1.2-4.18c0-4.35 3.54-7.88 7.89-7.88a7.83 7.83 0 0 1 5.57 2.31 7.83 7.83 0 0 1 2.3 5.58c0 4.34-3.54 7.87-7.88 7.87Z"
      />
      {/* Fone estilizado interno */}
      <path
        d="M16.36 14.02c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-.86-1.06-.96-1.3-.1-.24-.02-.38.1-.5.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.46-.06-.12-.54-1.3-.74-1.78-.18-.44-.38-.4-.52-.4h-.44c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.68 4.16 3.66.58.24 1.04.38 1.4.48.6.16 1.14.14 1.56.08.44-.06 1.4-.58 1.6-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"
      />
    </svg>
  );
}
