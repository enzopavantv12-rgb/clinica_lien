import type { ReactNode } from 'react';
import { IconeTratamento } from './IconesTratamento';

/**
 * Card de tratamento no estilo do print aprovado (prompt "tratamentos-lien",
 * out/2026): branco, raio 20px, icone num quadrado tintado, titulo,
 * descricao curta e o botao "Saiba mais" pastel de largura total, empurrado
 * para a base. Variante pela posicao: par = magenta, impar = teal (icone e
 * botao juntos). Usado na home (link) e em /tratamentos/ (botao que expande).
 */
export const VARIANTES = {
  magenta: {
    tile: 'bg-[#F7E4F5] text-magenta',
    botao: 'bg-[#F4E6F2] hover:bg-[#EED5EA]',
    rotulo: 'text-magenta',
    ponto: 'bg-magenta',
  },
  teal: {
    tile: 'bg-[#E3F1F4] text-teal',
    botao: 'bg-[#E6F1F3] hover:bg-[#D6EAEE]',
    rotulo: 'text-teal',
    ponto: 'bg-teal',
  },
} as const;

export type Variante = keyof typeof VARIANTES;
export const variantePor = (i: number): Variante => (i % 2 === 0 ? 'magenta' : 'teal');

export const MOLDURA =
  'rounded-[20px] border border-[rgba(225,225,225,.55)] bg-white shadow-[0_10px_30px_-14px_rgba(26,20,32,.10),0_1px_2px_rgba(26,20,32,.03)]';

export const classeBotao = (v: Variante) =>
  `mt-6 flex h-[38px] w-full items-center justify-center rounded-[10px] text-[12.5px] font-medium text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta ${VARIANTES[v].botao}`;

/** Icone + titulo + descricao: o topo comum aos dois usos do card. */
export function TopoTratamento({
  slug,
  nome,
  resumo,
  variante,
  Titulo = 'h3',
  tituloGrande = false,
}: {
  slug: string;
  nome: string;
  resumo: string;
  variante: Variante;
  Titulo?: 'h2' | 'h3';
  tituloGrande?: boolean;
}) {
  return (
    <>
      <span aria-hidden="true" className={`grid h-[46px] w-[46px] place-items-center rounded-xl ${VARIANTES[variante].tile}`}>
        <IconeTratamento slug={slug} className="h-7 w-7" />
      </span>
      <Titulo
        className={`mt-[22px] font-bold leading-[1.3] text-ink ${tituloGrande ? 'text-[17px] lg:text-[24px]' : 'text-[17px]'}`}
      >
        {nome}
      </Titulo>
      {/* Peso 400, e nao 300: a 13px a Poppins Light fica fina demais. */}
      <p className="mt-3 text-[13px] leading-[1.6] text-ink-muted">{resumo}</p>
    </>
  );
}

/** Card fechado com link (home). */
export function TratamentoCardLink({
  slug,
  nome,
  resumo,
  indice,
  href,
  rotulo,
}: {
  slug: string;
  nome: string;
  resumo: string;
  indice: number;
  href: string;
  rotulo: ReactNode;
}) {
  const v = variantePor(indice);
  return (
    <article
      className={`flex h-full flex-col px-[26px] pb-[26px] pt-7 transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-[3px] hover:shadow-[0_16px_36px_-14px_rgba(26,20,32,.14),0_1px_2px_rgba(26,20,32,.03)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${MOLDURA}`}
    >
      <TopoTratamento slug={slug} nome={nome} resumo={resumo} variante={v} />
      <div className="mt-auto">
        <a href={href} className={classeBotao(v)}>
          {rotulo}
          <span className="sr-only"> sobre {nome}</span>
        </a>
      </div>
    </article>
  );
}
