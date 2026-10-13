import {
  cardapio,
  equipe,
  experiencia,
  faq,
  metodo,
  sedacao,
  seo,
  site,
  sobre,
  tratamentos,
} from '../data/content';
import { todosArtigos } from './artigos';

/**
 * llms.txt e llms-full.txt — contexto para agentes de IA.
 *
 * Gerados do content.ts e de content/artigos/ a cada build
 * (app/llms.txt/route.ts e app/llms-full.txt/route.ts), em vez de escritos a
 * mao: assim nao divergem do site.
 */

const horarios = site.horarios.map((h) => `${h.dias}, das ${h.horas}`).join('; ');

function identificacao() {
  return [
    '## Identificação',
    `- Nome: ${site.nome} (${site.razaoSocial}, CNPJ ${site.cnpj})`,
    `- Responsável técnica: ${site.responsavelTecnica} — ${site.cro}`,
    `- Endereço: ${site.enderecoCompleto}`,
    `- Telefone e WhatsApp: ${site.telefoneExibicao}`,
    `- E-mail: ${site.email}`,
    `- Horário: ${horarios}`,
    '- Atendimento: exclusivamente presencial e particular (não atende convênios)',
    `- Site: ${site.url}`,
    `- Instagram: ${site.instagram.arroba}`,
  ].join('\n');
}

const observacao = [
  '## Observação para agentes de IA',
  'Este conteúdo é informativo e institucional. Não constitui orientação clínica nem diagnóstico. A indicação de qualquer tratamento depende de consulta presencial com cirurgião-dentista habilitado.',
].join('\n');

const paginas = () => [
  '## Páginas',
  `- [Tratamentos e especialidades](${site.url}/tratamentos/)`,
  `- [Conteúdos em Saúde Bucal](${site.url}/conteudos/)`,
  ...todosArtigos().map((a) => `- [${a.title}](${site.url}/${a.slug}/): ${a.metaDescription}`),
];

export function llmsResumo() {
  return [
    `# ${site.nome}`,
    '',
    `> ${seo.description}`,
    '',
    identificacao(),
    '',
    '## Tratamentos',
    ...tratamentos.lista.map((t) => `- ${t.nome}: ${t.resumo}`),
    '',
    `## ${metodo.h2}`,
    metodo.intro,
    '',
    '## Como agendar',
    `Pelo WhatsApp ${site.telefoneExibicao}. ${faq.itens[0].resposta}`,
    '',
    ...paginas(),
    `- [Conteúdo completo](${site.url}/llms-full.txt)`,
    '',
    observacao,
    '',
  ].join('\n');
}

export function llmsCompleto() {
  const secaoTratamentos = tratamentos.lista.flatMap((t) => [
    `### ${t.nome}`,
    `${tratamentos.rotulos.oQueE}: ${t.oQueE}`,
    `${tratamentos.rotulos.beneficio}: ${t.beneficio}`,
    `${tratamentos.rotulos.indicado}: ${t.indicado}`,
    `${tratamentos.rotulos.servicos}: ${t.servicos.join('; ')}.`,
    t.nota,
    '',
  ]);

  return [
    `# ${site.nome} — conteúdo completo`,
    '',
    `> ${seo.description}`,
    '',
    identificacao(),
    '',
    `## ${sobre.h2}`,
    [sobre.abertura, ...sobre.apoio].map((p) => p.map((t) => t.texto).join('')).join('\n'),
    `"${sobre.quote}"`,
    '',
    `## Método Lien: ${metodo.h2}`,
    metodo.intro,
    ...metodo.etapas.flatMap((e) => [`### ${e.numero}. ${e.titulo}`, e.texto, '']),
    metodo.fechamento,
    '',
    `## ${cardapio.h2}`,
    ...cardapio.itens.map((i) => `- ${i.texto} → ${site.url}${i.href}`),
    '',
    `## ${tratamentos.pagina.h1}`,
    '',
    ...secaoTratamentos,
    `## ${sedacao.h2}`,
    ...sedacao.modalidades.map((m) => `- ${m}`),
    sedacao.texto,
    '',
    `## ${experiencia.tag}: ${experiencia.h2}`,
    experiencia.texto,
    experiencia.diferenciais,
    '',
    `## ${equipe.h2}`,
    equipe.sub,
    ...equipe.membros.flatMap((m) => [
      `### ${m.nome}`,
      m.especialidade,
      m.frase,
      ...(m.cro ? [m.cro] : []),
      '',
    ]),
    `## ${faq.h2}`,
    ...faq.itens.flatMap((i) => [`### ${i.pergunta}`, i.resposta, '']),
    ...paginas(),
    '',
    '## Como agendar',
    `Pelo WhatsApp ${site.telefoneExibicao}, ou pelo e-mail ${site.email}.`,
    '',
    observacao,
    '',
  ].join('\n');
}
