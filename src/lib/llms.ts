import {
  cardapio,
  equipe,
  estrutura,
  experiencia,
  faq,
  metodo,
  sedacao,
  seo,
  site,
  sobre,
  tratamentos,
} from '../data/content';

/**
 * llms.txt e llms-full.txt — contexto para agentes de IA.
 *
 * Gerados do content.ts a cada build (app/llms.txt/route.ts e
 * app/llms-full.txt/route.ts), em vez de escritos a mao: a versao manual
 * anterior tinha divergido do site (horario, Instagram, vocabulario proibido
 * e um depoimento sem origem). Agora os dois arquivos nao tem como divergir.
 */

const todosTratamentos = [
  tratamentos.destaque,
  ...tratamentos.medios,
  ...tratamentos.grade,
  ...tratamentos.compactos,
];

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

export function llmsResumo() {
  return [
    `# ${site.nome}`,
    '',
    `> ${seo.description}`,
    '',
    identificacao(),
    '',
    '## Tratamentos',
    ...todosTratamentos.map((t) => `- ${t.nome}: ${t.oQueE}`),
    '',
    '## Diferencial',
    `${sobre.paragrafos[2]} ${experiencia.sub}`,
    '',
    '## Como agendar',
    `Pelo WhatsApp ${site.telefoneExibicao}. ${faq.itens[0].resposta}`,
    '',
    '## Detalhamento',
    `- [Conteúdo completo](${site.url}/llms-full.txt)`,
    '',
    observacao,
    '',
  ].join('\n');
}

export function llmsCompleto() {
  const secaoTratamentos = todosTratamentos.flatMap((t) => [
    `### ${t.nome}${'apelido' in t && t.apelido ? ` (${t.apelido})` : ''}`,
    `${tratamentos.rotulos.oQueE}: ${t.oQueE}`,
    ...('beneficio' in t && t.beneficio ? [`${tratamentos.rotulos.beneficio}: ${t.beneficio}`] : []),
    ...('indicado' in t && t.indicado ? [`${tratamentos.rotulos.indicado}: ${t.indicado}`] : []),
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
    ...sobre.paragrafos,
    `${sobre.missao.titulo}: ${sobre.missao.texto}`,
    `${sobre.filosofia.titulo}: ${sobre.filosofia.texto}`,
    '',
    `## ${cardapio.h2}`,
    ...cardapio.itens.map((i) => `- "${i.texto}" → ${i.leva}`),
    '',
    `## ${metodo.tag}: ${metodo.h2}`,
    ...metodo.etapas.flatMap((e) => [`### ${e.numero}. ${e.titulo}`, e.texto, '']),
    `## ${tratamentos.tag}`,
    '',
    ...secaoTratamentos,
    `## ${sedacao.h2}`,
    sedacao.texto,
    ...sedacao.itens.map((i) => `- ${i}`),
    '',
    `## ${experiencia.tag}: ${experiencia.h2}`,
    ...experiencia.diferenciais.map((d) => `- ${d.titulo}: ${d.texto}`),
    '',
    `## ${estrutura.h2}`,
    ...estrutura.itens.map((i) => `- ${i.titulo}: ${i.texto}`),
    '',
    `## ${equipe.h2}`,
    ...equipe.membros.flatMap((m) => [
      `### ${m.nome}${'cargo' in m && m.cargo ? ` — ${m.cargo}` : ''}`,
      ...([m.especialidade, m.cro, m.bio] as (string | null)[]).filter((x): x is string => Boolean(x)),
      '',
    ]),
    `## ${faq.h2}`,
    ...faq.itens.flatMap((i) => [`### ${i.pergunta}`, i.resposta, '']),
    '## Como agendar',
    `Pelo WhatsApp ${site.telefoneExibicao}, ou pelo e-mail ${site.email}.`,
    '',
    observacao,
    '',
  ].join('\n');
}
