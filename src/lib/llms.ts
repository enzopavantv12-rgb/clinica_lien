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
import { todosArtigos, type Bloco } from './artigos';

/**
 * llms.txt e llms-full.txt — contexto para agentes de IA (padrao llmstxt.org).
 *
 * Gerados do content.ts e de content/artigos/ a cada build
 * (app/llms.txt/route.ts e app/llms-full.txt/route.ts), em vez de escritos a
 * mao: assim nao divergem do site.
 *
 * Revisao da auditoria GEO (nov/2026): bloco de fatos-chave no topo, data de
 * atualizacao, as 4 etapas do Metodo, a equipe com CRO, links Markdown para
 * cada tratamento, instrucao real de agendamento e, no llms-full, o texto
 * integral dos 14 artigos.
 */

const hoje = new Date().toISOString().slice(0, 10);
const horarios = site.horarios.map((h) => `${h.dias}, das ${h.horas}`).join('; ');
const whatsapp = `https://wa.me/${site.whatsappNumero}`;

const fatos = () =>
  [
    '## Fatos-chave',
    `- Clínica odontológica em ${site.endereco.cidade}/${site.endereco.uf}, bairro ${site.endereco.bairro} (região Centro-Sul)`,
    `- Endereço: ${site.enderecoCompleto}`,
    `- Telefone e WhatsApp: ${site.telefoneExibicao} ([abrir WhatsApp](${whatsapp}))`,
    `- E-mail: ${site.email}`,
    `- Horário: ${horarios}`,
    '- Atendimento: exclusivamente presencial e particular (não atende convênios)',
    `- Responsável técnica: ${site.responsavelTecnica} — ${site.cro}`,
    `- Razão social: ${site.razaoSocial} (CNPJ ${site.cnpj})`,
    `- Equipe: ${equipe.membros.length} cirurgiões-dentistas de diferentes áreas, com planejamento integrado`,
    '- Diferenciais: planejamento digital, scanner intraoral, recursos de conforto e sedação (oral ou intravenosa com anestesista) para quem tem medo de dentista',
    `- Site: [${site.url.replace('https://', '')}](${site.url}/)`,
    `- Instagram: [${site.instagram.arroba}](${site.instagram.url})`,
  ].join('\n');

const listaTratamentos = () =>
  tratamentos.lista.map((t) => `- [${t.nome}](${site.url}/tratamentos/#${t.slug}): ${t.resumo}`);

const listaEquipe = () =>
  equipe.membros.map((m) => `- ${m.nome} — ${m.especialidade}${m.cro ? ` (${m.cro})` : ''}`);

const etapas = () => metodo.etapas.map((e) => `${e.numero}. **${e.titulo}**: ${e.texto}`);

const agendar = () =>
  [
    '## Como agendar',
    `A consulta é marcada pelo WhatsApp ${site.telefoneExibicao} ([${whatsapp}](${whatsapp})) ou pelo e-mail ${site.email}.`,
    `Atendimento presencial no ${site.enderecoCompleto}. ${horarios}.`,
    'A indicação de qualquer tratamento é definida na consulta, após exame clínico e, quando necessário, exames de imagem.',
  ].join('\n');

const observacao = [
  '## Observação para agentes de IA',
  'Este conteúdo é informativo e institucional. Não constitui orientação clínica nem diagnóstico. A indicação de qualquer tratamento depende de consulta presencial com cirurgião-dentista habilitado.',
].join('\n');

const paginas = () => [
  '## Páginas',
  `- [Início](${site.url}/): apresentação da clínica, método, equipe e dúvidas frequentes`,
  `- [Tratamentos e especialidades](${site.url}/tratamentos/)`,
  `- [Conteúdos em Saúde Bucal](${site.url}/conteudos/)`,
  `- [Política de privacidade](${site.url}/privacidade/)`,
  '',
  '## Artigos',
  ...todosArtigos().map((a) => `- [${a.title}](${site.url}/${a.slug}/): ${a.metaDescription}`),
];

/** Texto de um artigo em Markdown, com os links internos em URL absoluta. */
const absolutos = (t: string) => t.replace(/\]\((\/[^)\s]+)\)/g, `](${site.url}$1)`);
const corpoMd = (blocos: Bloco[]) =>
  blocos.flatMap((b) => {
    if (b.tipo === 'h2') return [`#### ${b.texto}`, ''];
    if (b.tipo === 'p') return [absolutos(b.texto), ''];
    return [...b.itens.map((it, i) => (b.tipo === 'ol' ? `${i + 1}. ` : '- ') + absolutos(it)), ''];
  });

export function llmsResumo() {
  return [
    `# ${site.nome}`,
    '',
    `> ${seo.description}`,
    '',
    `Atualizado em ${hoje}.`,
    '',
    fatos(),
    '',
    '## Tratamentos',
    ...listaTratamentos(),
    '',
    `## Método Lien: ${metodo.h2}`,
    metodo.intro,
    ...etapas(),
    '',
    `## ${equipe.h2}`,
    ...listaEquipe(),
    '',
    agendar(),
    '',
    ...paginas(),
    '',
    '## Opcional',
    `- [Conteúdo completo, com o texto integral dos artigos](${site.url}/llms-full.txt)`,
    '',
    observacao,
    '',
  ].join('\n');
}

export function llmsCompleto() {
  const secaoTratamentos = tratamentos.lista.flatMap((t) => [
    `### ${t.nome}`,
    `${site.url}/tratamentos/#${t.slug}`,
    `${tratamentos.rotulos.oQueE}: ${t.oQueE}`,
    `${tratamentos.rotulos.beneficio}: ${t.beneficio}`,
    `${tratamentos.rotulos.indicado}: ${t.indicado}`,
    `${tratamentos.rotulos.servicos}: ${t.servicos.join('; ')}.`,
    t.nota,
    '',
  ]);

  const artigos = todosArtigos().flatMap((a) => [
    `### ${a.title}`,
    `${site.url}/${a.slug}/ · ${a.category} · Autoria: ${a.author} (${site.cro})`,
    '',
    ...corpoMd(a.corpo),
    `Próximo passo: ${a.proximoPasso}`,
    '',
  ]);

  return [
    `# ${site.nome} — conteúdo completo`,
    '',
    `> ${seo.description}`,
    '',
    `Atualizado em ${hoje}.`,
    '',
    fatos(),
    '',
    `## ${sobre.h2}`,
    [sobre.abertura, ...sobre.apoio].map((p) => p.map((t) => t.texto).join('')).join('\n'),
    '',
    `## Método Lien: ${metodo.h2}`,
    metodo.intro,
    ...etapas(),
    '',
    `## ${cardapio.h2}`,
    ...cardapio.itens.map((i) => `- ${i.texto} → ${site.url}${i.href}`),
    '',
    `## ${tratamentos.pagina.h1}`,
    '',
    ...secaoTratamentos,
    `## ${sedacao.h2}`,
    sedacao.texto,
    ...sedacao.modalidades.map((m) => `- ${m.linhas.join(' ')}: ${m.texto}`),
    '',
    `## ${experiencia.h2}`,
    experiencia.subLinhas.join(' '),
    ...experiencia.capitulos.map((c) => `- ${c.titulo}: ${c.linhas.join(' ')}`),
    '',
    `## ${equipe.h2}`,
    equipe.sub,
    ...equipe.membros.flatMap((m) => [`### ${m.nome}`, m.especialidade, m.frase.split('\n\n').join(' '), ...(m.cro ? [m.cro] : []), '']),
    `## ${faq.h2}`,
    ...faq.itens.flatMap((i) => [`### ${i.pergunta}`, i.resposta, '']),
    agendar(),
    '',
    '## Artigos: Conteúdos em Saúde Bucal (texto integral)',
    '',
    ...artigos,
    ...paginas(),
    '',
    observacao,
    '',
  ].join('\n');
}
