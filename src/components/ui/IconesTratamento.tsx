/**
 * Icones oficiais dos 10 tratamentos (pasta EXCELENCIA-ODONTOLOGICA, enviada
 * pela clinica em out/2026). Cada arquivo ja traz o quadrado tintado na cor
 * da variante do card (magenta/teal, alternando como os cards). Versoes web
 * geradas por `npm run icones`. Decorativos: o titulo do card da o nome.
 */
export function IconeTratamento({ slug, className = '' }: { slug: string; className?: string }) {
  return (
    <img
      src={`/icones-lien/tratamento-${slug}.webp`}
      width={144}
      height={144}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
