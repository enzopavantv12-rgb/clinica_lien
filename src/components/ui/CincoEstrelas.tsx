import { Star } from 'lucide-react';

/**
 * CRITICO: as estrelas precisam renderizar PREENCHIDAS.
 * Estrela vazia e lida como avaliacao zero e destroi a conversao.
 *
 * Implementacao a prova de navegador:
 * - `fill="currentColor"` preenche o corpo do icone.
 * - `stroke="currentColor"` na mesma cor evita halo/contorno claro no Safari.
 * - a cor vem de `text-magenta` no wrapper, entao `currentColor` sempre resolve.
 * - `aria-hidden` nas estrelas + texto acessivel unico em <span class="sr-only">.
 */
export function CincoEstrelas({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <div className="flex items-center gap-1 text-magenta">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={tamanho}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">5 de 5 estrelas</span>
    </div>
  );
}
