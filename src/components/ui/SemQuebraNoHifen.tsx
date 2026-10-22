/** Palavras com hifen ("bem-estar") nunca quebram no hifen: o Safari
 *  ignorava o word joiner e partia a palavra em duas linhas. */
export function SemQuebraNoHifen({ texto }: { texto: string }) {
  return texto.split(/(\S+-\S+)/).map((p, i) =>
    /\S+-\S+/.test(p) ? (
      <span key={i} className="whitespace-nowrap">
        {p}
      </span>
    ) : (
      p
    ),
  );
}
