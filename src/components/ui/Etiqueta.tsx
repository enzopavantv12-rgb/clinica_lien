/**
 * Tag em pilula do padrao "sobre-metodo-lien" (out/2026): Poppins 600 11px,
 * caixa alta, tracking .12em.
 * - magenta: texto #9C1781 sobre #F7E4F5 (6,09:1);
 * - teal: texto #037E99 sobre branco, borda #DCEBEF (4,72:1 — o teal so passa
 *   AA sobre branco puro).
 */
export function Etiqueta({ children, cor = 'magenta' }: { children: React.ReactNode; cor?: 'magenta' | 'teal' }) {
  const estilo =
    cor === 'magenta' ? 'bg-[#F7E4F5] text-[#9C1781]' : 'border border-[#DCEBEF] bg-white text-[#037E99]';
  return (
    <span
      className={`inline-block rounded-full px-[14px] py-[6px] text-[11px] font-semibold uppercase leading-none tracking-[.12em] ${estilo}`}
    >
      {children}
    </span>
  );
}
