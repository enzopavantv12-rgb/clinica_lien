import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-03-utils/marquee";
import { depoimentos } from "@/data/content";

/**
 * marquee-03 (21st.dev) com a estrutura, as classes e o card do original.
 * Adaptacoes, e so estas:
 * - Dados: avaliacoes REAIS do Google, de `depoimentos.itens` no content.ts.
 *   Os exemplos do original (SaaS em ingles, fotos de banco) nao entram:
 *   depoimento inventado no site de uma clinica fere a publicidade do CFO.
 * - `@username` vira a origem ("Avaliação no Google").
 * - Sem foto do paciente, o circulo de 32px mostra as iniciais.
 * - Tailwind v3: `h-125` -> `h-[500px]`, `bg-linear-to-*` -> `bg-gradient-to-*`.
 * - Sem `cursor-pointer`: o card nao e clicavel.
 * - Tablet (640-1023px): no original a 3a coluna so aparece em `lg`, e um
 *   terco das avaliacoes some nessa faixa. Aqui ha duas pistas proprias para
 *   ela, dividindo as avaliacoes em 2.
 */

type Review = {
  name: string;
  username: string;
  body: string;
  profile?: string;
};

const reviews: Review[] = depoimentos.itens.map((d) => ({
  name: d.nome,
  username: depoimentos.faixa.origem,
  body: d.texto,
  profile: d.foto,
}));

const iniciais = (nome: string) =>
  nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const ReviewCard = ({ profile, name, username, body }: Review) => {
  return (
    <Card className="relative w-full max-w-sm overflow-hidden border border-border bg-card shadow-none p-4">
      <CardContent className="p-0 flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          {profile ? (
            <img
              className="rounded-full"
              width="32"
              height="32"
              alt=""
              src={profile}
              loading="lazy"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-magenta/10 text-xs font-semibold text-magenta"
            >
              {iniciais(name)}
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs font-medium text-muted-foreground">
              {username}
            </p>
          </div>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
};

const VerticalMarqueeDemo = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
      <div className="flex flex-row items-center justify-center w-full gap-4 px-4 h-full">
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:20s] h-full lg:flex hidden flex-1"
        >
          {reviews
            .filter((_, i) => i % 3 === 0)
            .map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          vertical
          className="[--duration:20s] h-full hidden lg:flex flex-1"
        >
          {reviews
            .filter((_, i) => i % 3 === 1)
            .map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
        </Marquee>
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:20s] h-full hidden lg:flex flex-1"
        >
          {reviews
            .filter((_, i) => i % 3 === 2)
            .map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
        </Marquee>
        {/* Tablet: 2 pistas com todas as avaliacoes divididas em 2. */}
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:20s] h-full hidden sm:flex lg:hidden flex-1"
        >
          {reviews
            .filter((_, i) => i % 2 === 0)
            .map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          vertical
          className="[--duration:20s] h-full hidden sm:flex lg:hidden flex-1"
        >
          {reviews
            .filter((_, i) => i % 2 === 1)
            .map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
        </Marquee>
        <Marquee
          pauseOnHover
          vertical
          className="[--duration:20s] h-full sm:hidden flex flex-1"
        >
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background"></div>
    </div>
  );
};

export default VerticalMarqueeDemo;
