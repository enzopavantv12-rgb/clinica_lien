# Qualidade de conteúdo e SEO on-page: lienreabilitacao.com.br

Data: 2026-11-23. Escopo: home, /tratamentos/, /conteudos/, 14 artigos e /privacidade/ (18 URLs do sitemap).
Método: HTML de produção via render_page.py (modo raw; o site é estático, sem SPA, então não foi preciso abrir o Chromium), cruzado com `src/data/content.ts`, `content/artigos/*.md`, `src/data/schema.ts` e `src/lib/artigos.ts`. Nenhum arquivo do projeto foi alterado.

Restrições respeitadas: a copy aprovada da home e dos artigos não foi reescrita. As propostas mexem em title, meta, H1 de páginas internas, links internos, schema e blocos NOVOS (que dependem de aprovação da clínica). Nenhum texto proposto usa "garantido", "sem dor", "indolor", "100%", preço ou superlativo.

---

## Notas

| Métrica | Nota |
|---|---|
| Qualidade de conteúdo (geral) | **58/100** |
| E-E-A-T (ponderado) | **58/100** |
| Prontidão para citação por IA | **52/100** |
| Risco de metadados templatizados | **baixo** (`site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`) |

### E-E-A-T

| Fator (peso interno) | Nota | Evidência |
|---|---|---|
| Experiência (20%) | 55 | A favor: fotos reais do consultório, antes e depois com autorização, 3 depoimentos do Google, vídeos próprios. Contra: os artigos não têm nenhum sinal de prática própria (nenhum "na nossa rotina", nenhum caso, nenhuma foto clínica). |
| Especialidade (25%) | 62 | A favor: autoria nomeada em todos os artigos, credencial correta (Aperfeiçoamento, e não Especialista, em Periodontia), CRO de todos os 6 profissionais na home, responsável técnica + CRO no rodapé. Contra: a linha de autoria do artigo **não traz o CRO**; não existe página de bio; não há revisor por área (DTM, estética e semaglutida assinados pela implantodontista); nenhuma referência bibliográfica. |
| Autoridade (25%) | 40 | Domínio novo (nov/2026), só o Instagram em `sameAs`, link do Perfil da Empresa no Google ainda `null`, nenhuma citação externa, nenhuma fonte científica nos artigos. |
| Confiabilidade (30%) | 72 | CNPJ, endereço, telefone, e-mail, horário, RT + CRO, política LGPD, sem preço, sem `aggregateRating` próprio. Contra: `og-image.jpg` dá **404** (prévia de compartilhamento quebrada); expressões publicitárias com risco CFO ainda no ar (ver C1); datas iguais para os 14 artigos e `dateModified` = `datePublished`. |

Ponderado: 0,20×55 + 0,25×62 + 0,25×40 + 0,30×72 = **58**.

---

## Inventário on-page (produção)

| URL | Title (car.) | Meta (car.) | H1 | Palavras (texto principal) | Links de entrada* |
|---|---|---|---|---|---|
| / | 63 | 173 | "Reabilitação oral com excelência clínica…" | ~975 | n/a |
| /tratamentos/ | 53 | **194** | "Tratamentos e especialidades" | ~826 | 18 |
| /conteudos/ | 49 | 141 | "Conteúdos em Saúde Bucal" | ~467 | 18 |
| implante-dentario-belo-horizonte | 62 | 169 | ok | 335 | 9 |
| protese-dentaria-ou-implante-bh | 56 | 130 | ok | 223 | 10 |
| protese-protocolo-belo-horizonte | 58 | 122 | ok | 260 | 8 |
| reabilitacao-oral-belo-horizonte | 62 | 135 | ok | 226 | 3 |
| perda-ossea-dentaria-implante-bh | 61 | 145 | ok | 176 | 5 |
| enxerto-osseo-dentario-bh | 47 | 142 | ok | 187 | **2** |
| facetas-lentes-contato-dental-bh | 59 | 138 | ok | 192 | 18 (rodapé) |
| dentes-desgastados-tratamento-bh | 55 | 139 | ok | 164 | 3 |
| dentadura-fixa-belo-horizonte | 55 | 129 | ok | 202 | **2** |
| dor-mastigar-estalos-dtm-bh | 51 | 151 | ok | 242 | **2** |
| sangramento-gengiva-belo-horizonte | 64 | 140 | ok | 155 | 7 |
| doenca-periodontal-belo-horizonte | 66 | 134 | ok | 244 | 6 |
| hormonios-saude-gengival-bh | **74** | 154 | ok | 225 | 4 |
| semaglutida-ozempic-wegovy-saude-bucal-bh | 59 | 180 | ok | 287 | **2** |

*Quantidade de páginas do site que linkam a URL (contagem única por página). Palavras dos artigos = corpo do .md sem títulos.

Hierarquia de títulos: correta em todas as páginas (um H1; `####` do markdown vira H2; cards da home em H3). Canonical self-referencing em todas. Imagens sem alt são só ícones decorativos (ok).

---

## Achados por prioridade

### CRÍTICO / ALTO

**A1. Artigos rasos para tema YMYL (155 a 335 palavras).** Os 14 artigos estão muito abaixo do piso de cobertura de um post (1.500) e até do de uma página de serviço (800). O texto é tecnicamente correto e prudente (bom sinal: "pode", "depende", nenhuma promessa), mas cada H2 é respondido em 1 ou 2 frases. Para "implante dentário BH" e "prótese protocolo BH", quem compete é página de 1.000 a 2.000 palavras. Nada disso exige reescrever o texto aprovado: dá para ACRESCENTAR blocos novos para a clínica aprovar (ver A5 e o modelo de expansão no fim).

**A2. Nenhum link interno no corpo dos artigos, e o "Leia também" é concentrado.** O algoritmo `relacionados()` ordena por pontuação e depois por `numero`, então os artigos de implante sempre linkam os mesmos (1, 2, 3, 5). Resultado: dentadura fixa, enxerto ósseo, DTM e semaglutida só recebem 2 links internos (de /conteudos/ e /tratamentos/). Reabilitação oral, que é o tema central da marca, só recebe 3.
- Fazer o "Leia também" girar (por exemplo, desempatar por proximidade de `numero` em vez de menor `numero`), ou definir os relacionados à mão no frontmatter (`relacionados: [...]`).
- Acrescentar links contextuais no corpo, com âncora descritiva, onde o próprio texto aprovado já cita o tema (só o `<a>`, sem mudar palavra):
  - implante → "enxertos" para /enxerto-osseo-dentario-bh/; "doença periodontal ativa" para /doenca-periodontal-belo-horizonte/; "volume ósseo insuficiente" para /perda-ossea-dentaria-implante-bh/
  - perda óssea → enxerto ósseo; prótese protocolo
  - prótese protocolo ↔ dentadura fixa (mesmo assunto, sem link entre eles hoje)
  - dentes desgastados → "bruxismo" para /dor-mastigar-estalos-dtm-bh/; "facetas" para /facetas-lentes-contato-dental-bh/
  - sangramento ↔ doença periodontal ↔ hormônios (já existe pelo "Leia também", reforçar no corpo)
  - semaglutida → "erosão" para /dentes-desgastados-tratamento-bh/
  - reabilitação oral → implante, prótese protocolo, dentes desgastados, DTM
- Home: hoje linka só 3 artigos. Acrescentar em "Por onde você quer começar?" os destinos de artigo correspondentes, ou um link "Ver todos" para cada categoria.

**A3. Não existem páginas de serviço para as buscas comerciais locais.** "implante dentário BH", "lentes de contato dental BH", "reabilitação oral BH" e "prótese protocolo BH" têm intenção de contratação. Hoje elas caem em (a) artigos informativos de 200 a 300 palavras ou (b) âncoras de /tratamentos/#slug, que o Google trata como a mesma URL. O link do rodapé "Lentes de Contato Dental" aponta para um artigo de comparação. Há ainda **canibalização**: a home ("Implantes Dentários e Reabilitação Oral em BH") e os artigos 1 e 4 ("…em Belo Horizonte") disputam a mesma consulta.
- Proposta: criar `/tratamentos/implante-dentario/`, `/tratamentos/reabilitacao-oral/`, `/tratamentos/lentes-de-contato-dental/` (e depois periodontia, DTM e sedação). Base: o texto já aprovado do card (oQueE, beneficio, indicado, servicos, nota) + blocos novos: etapas, quem conduz (profissional + CRO), FAQ, antes e depois do tema, artigos relacionados, endereço.
- Distribuição de intenção: home = clínica / dentista no Cruzeiro + reabilitação oral; página de serviço = "<tratamento> em BH"; artigo = pergunta informativa.

**A4. O corpo dos artigos não tem nenhum sinal local.** "Belo Horizonte", "BH" e "Cruzeiro" aparecem 0 vezes no texto principal dos 14 artigos. O local só está no title e no slug (e no "Próximo passo" de 2 artigos). Sem mexer no corpo: acrescentar, no bloco de autoria ou no "Próximo passo", uma linha fixa como "Lien Reabilitação Oral · Av. do Contorno, 5351, Cruzeiro, Belo Horizonte".

**A5. E-E-A-T YMYL: autoria incompleta, nenhuma revisão, nenhuma fonte.**
1. Linha de autoria: incluir o CRO e linkar para a bio.
   `Autoria: Dra. Natália Simões · CRO-MG 49.821 · Especialista em Implantodontia e Prótese Dentária | Aperfeiçoamento em Periodontia`
2. Criar `/equipe/dra-natalia-simoes/` (formação, instituições, CRO, áreas, foto) e, de preferência, uma bio para cada profissional. Schema Person com `hasCredential`/`alumniOf`, `@id` igual ao que já existe.
3. Revisão por área (com o consentimento das profissionais): "Revisão técnica: Dra. Gabriela Ribeiro, CRO-MG 65.103" no artigo de DTM; Dra. Luiza Henriques (CRO-MG 64.936) em facetas/lentes e dentes desgastados. Hoje a implantodontista assina DTM, hormônios e semaglutida sozinha.
4. Seção "Referências" por artigo, com fontes que a clínica confirmar. Sugestões reais para checar: classificação AAP/EFP 2017 de doenças periodontais e peri-implantares (periodontite, sangramento, hormônios); critérios DC/TMD (Schiffman et al., 2014) para DTM; consensos ITI para implante/enxerto; revisões sobre agonistas de GLP-1 e saúde bucal para o artigo de semaglutida (que hoje diz "o que a evidência ainda não permite afirmar" sem citar nenhuma evidência).
5. Data: exibir "Revisado em <data>" e emitir `dateModified` real. Hoje os 14 artigos têm a mesma data (12/10/2026), `dateModified` = `datePublished`.
6. Schema do artigo: acrescentar `image`, `reviewedBy` (quando houver revisor) e, se possível, migrar para `MedicalWebPage` com `lastReviewed` + `about` (MedicalCondition/MedicalProcedure).

**A6. `og-image.jpg` dá 404.** Home, artigos e todas as páginas compartilhadas no WhatsApp/Instagram aparecem sem imagem. Já está como [PENDENTE] em content.ts; vale priorizar, porque o WhatsApp é o canal de conversão.

### MÉDIO

**M1. Titles: ajustes de tamanho e de palavra-chave (sem tocar no corpo).**

| Página | Atual | Proposto | Car. |
|---|---|---|---|
| Home | Implantes Dentários e Reabilitação Oral em BH \| Lien — Cruzeiro (63) | Implante Dentário e Reabilitação Oral no Cruzeiro, BH \| Lien | 60 |
| /tratamentos/ | Tratamentos e especialidades em Belo Horizonte \| Lien | Tratamentos Odontológicos no Cruzeiro, BH \| Lien | 48 |
| /conteudos/ | Conteúdos em Saúde Bucal \| Lien Reabilitação Oral | Artigos de Saúde Bucal: implantes, gengiva e DTM \| Lien BH | 58 |
| implante | Implante Dentário em Belo Horizonte: quando é indicado? \| Lien (62) | Implante Dentário em BH: quando é indicado? \| Lien | 50 |
| reabilitação | Reabilitação Oral em Belo Horizonte: quando é indicada? \| Lien (62) | Reabilitação Oral em BH: quando é indicada? \| Lien | 50 |
| facetas | Facetas e Lentes de Contato Dental em BH: diferenças \| Lien | Lentes de Contato Dental ou Facetas? Diferenças \| Lien BH | 57 |
| hormônios | …relação com ciclo, gravidez e menopausa \| Lien (74) | Hormônios e Gengiva: ciclo, gravidez e menopausa \| Lien | 55 |
| doença periodontal | (66) | Doença Periodontal: sintomas e tratamento em BH \| Lien | 54 |
| sangramento | (64) | Gengiva Sangrando: quando se preocupar? \| Lien BH | 49 |
| enxerto | Enxerto Ósseo Dentário em Belo Horizonte \| Lien | Enxerto Ósseo Dentário: quando é necessário? \| Lien BH | 54 |
| DTM | Dor ao Mastigar e Estalos na Mandíbula em BH \| Lien | Dor ao Mastigar e Estalos na Mandíbula (DTM) em BH \| Lien | 57 |
| semaglutida | Semaglutida, Ozempic e Saúde Bucal: o que já se sabe \| Lien | Ozempic e Saúde Bucal: boca seca, refluxo e cuidados \| Lien | 59 |

Se as páginas de serviço (A3) forem criadas, os títulos dos artigos 1 e 4 passam a ser informativos (tirar o "em BH") e o local fica com a página de serviço:
- `/tratamentos/implante-dentario/`: "Implante Dentário no Cruzeiro, BH \| Lien Reabilitação Oral"
- `/tratamentos/lentes-de-contato-dental/`: "Lentes de Contato Dental em BH: planejamento estético \| Lien" (60)
- sedação: "Sedação no Dentista em BH: medo e ansiedade \| Lien" (50)

**M2. Metas longas ou genéricas.**

| Página | Proposta | Car. |
|---|---|---|
| Home (173) | Clínica odontológica no Cruzeiro, em BH: implantes com planejamento digital, reabilitação oral, lentes de contato dental e sedação para quem tem medo de dentista. | 162 |
| /tratamentos/ (194) | Implantes, reabilitação oral, lentes de contato dental, periodontia, DTM, ortodontia, canal e clínica geral, com equipe multidisciplinar no Cruzeiro, em BH. | 156 |
| /conteudos/ | Artigos da Dra. Natália Simões (CRO-MG 49.821) e equipe sobre implante dentário, prótese protocolo, gengiva, lentes de contato dental, DTM e prevenção. | 151 |
| implante (169) | Quando o implante dentário pode ser indicado, o que precisa ser tratado antes da cirurgia e como funciona o planejamento digital. Clínica no Cruzeiro, em BH. | 157 |
| facetas | Lentes de contato dental e facetas: diferenças de material, espessura e desgaste, quando podem ser consideradas e o que avaliar antes. Clínica no Cruzeiro, BH. | 159 |
| semaglutida (180) | Boca seca, refluxo e vômitos podem afetar dentes e gengiva de quem usa semaglutida (Ozempic, Wegovy). Veja cuidados práticos e o que a evidência ainda não diz. | 159 |

O verificador de templates não acusou repetição: as descrições são únicas e não há CTA comum entre elas. Os únicos alertas foram de severidade baixa (`brand_suffix_in_description` em home, /tratamentos/ e no artigo de implante), que as propostas acima já resolvem.

**M3. H1 de /tratamentos/ genérico.** "Tratamentos e especialidades" não tem termo de busca nem local. Proposta: "Tratamentos odontológicos no Cruzeiro, em Belo Horizonte". O H1 da home é copy aprovada; deixar como está, já que o title cobre o termo.

**M4. Credenciais e títulos de especialista (CFO).** Pendências que já estão em content.ts, mas que contam como sinal de confiança:
- Card da Dra. Natália: "Reabilitação Oral | Implantodontia e Periodontia". "Reabilitação Oral" não é especialidade registrada no CFO e Periodontia é Aperfeiçoamento. Sugestão: "Implantodontia e Prótese Dentária | Aperf. em Periodontia" (igual ao schema e à autoria).
- Dra. Luiza: rótulo "Dentística e Estética" com a frase "Especialista em Prótese Dentária pela USP". O rótulo deveria refletir a especialidade registrada.
- Dra. Isabela: "Especialista em Harmonização Orofacial e Ortodontia". Confirmar os dois registros no CRO-MG.
- Faixa "6 especialistas": só manter se as 6 tiverem especialidade registrada.

**M5. Expressões publicitárias de risco ainda no ar** (copy aprovada; recomenda-se só que a clínica revise com o CRO, sem reescrita nossa): "excelência clínica" (H1), "tecnologia de ponta" (home e /tratamentos/), "relaxamento absoluto", "total segurança", "profundo relaxamento", "ultraprecisa", "o sorriso que você merece", "alto padrão", "Localização privilegiada", "Desenvolvido com excelência clínica". Já estão listadas no RELATORIO-ALTERACOES.md. O "sem dor" do H1 de doença periodontal é descrição clínica (a doença avança sem sintoma), não promessa: ok.

**M6. Perfil da Empresa no Google sem link.** `google.url = null` e o schema `sameAs` só tem o Instagram. Incluir a URL do perfil no Google (e o Instagram da Dra. no Person, que já existe). Para "dentista Cruzeiro BH", o pacote de mapas pesa mais do que a página.

### BAIXO

- **L1. Legibilidade.** Frases curtas (média de 10 a 17 palavras), mas Flesch adaptado para PT de 21 a 37 ("difícil"), por causa do vocabulário técnico (reabsorção, osseointegração, periodontal). Aceitável para saúde; um bloco "Em resumo" (A5/modelo) e um glossário de 1 linha nos termos técnicos ajudam o leitor leigo.
- **L2. Repetição de estrutura entre os artigos.** Todos seguem "o que é / quando é indicado / como funciona / quanto dura" e a mesma densidade de "pode/depende/varia" (3 a 10 por artigo). Não chega a ser conteúdo de massa (cada um traz fatos específicos), mas sem nenhum sinal de experiência própria parece genérico. Corrige-se com A5 e com o bloco "Na prática da Lien".
- **L3. /conteudos/ sem texto introdutório** além do H1 e dos cards (~470 palavras, quase só títulos). Um parágrafo de 60 a 80 palavras explicando quem escreve e como os textos são revisados reforça o E-E-A-T.
- **L4. /privacidade/:** título e meta ok.

---

## Prontidão para citação por IA (52/100)

A favor: H2 em forma de pergunta ("Implante dói?", "Quanto tempo um implante pode durar?"), texto em HTML estático, `llms.txt` e `llms-full.txt` publicados, schema Article + BreadcrumbList + Dentist + Person com CRO, FAQPage na home.
Contra: respostas de 1 frase sem número nem fonte; nenhum trecho de 40 a 60 palavras autossuficiente logo após o H1; nenhuma referência; `dateModified` estático; nenhum dado próprio.

Modelo de bloco novo "Em resumo" (logo abaixo do H1, para a clínica aprovar). Exemplo para o artigo de implante (51 palavras, só reaproveitando fatos do texto aprovado):

> O implante dentário é uma estrutura, geralmente de titânio, instalada no osso para substituir a raiz de um dente perdido. A indicação depende de volume ósseo, saúde da gengiva, condições sistêmicas e hábitos como o tabagismo, avaliados com exame clínico e tomografia. Alguns casos precisam de enxerto ou tratamento periodontal antes.

Modelo de expansão por artigo (para levar cada um a ~800 a 1.200 palavras sem mexer no texto aprovado):
1. "Em resumo" (40 a 60 palavras) abaixo do H1.
2. Texto aprovado (sem alteração), com links contextuais (A2).
3. "Na prática da Lien": 2 ou 3 parágrafos da Dra. sobre como o caso é conduzido na clínica (exames usados, sequência das consultas, quem participa). É o sinal de experiência que falta hoje.
4. "Perguntas frequentes" com 4 a 6 perguntas reais de paciente, respostas de 40 a 80 palavras. Ex. (implante): "Quem tem diabetes pode fazer implante?", "Fumante pode fazer implante?", "Implante pode ser feito no mesmo dia da extração?", "Qual a diferença entre implante e prótese protocolo?".
5. "Referências" + "Revisado em <data> por <nome, CRO>".

---

## Novos conteúdos sugeridos (lacunas de palavra-chave)

Serviços existentes sem nenhum conteúdo próprio, em ordem de prioridade:
1. Sedação / medo de dentista: o maior diferencial da home, sem página nem artigo. "Medo de dentista: como funciona a sedação consciente na odontologia" (depende da revisão CRO do bloco de sedação).
2. Lentes de contato dental: página de serviço (A3) + artigo "Lentes de contato dental: cuidados, durabilidade e quando não são indicadas".
3. Carga imediata: "Implante com carga imediata: quando é possível?" (o artigo de prótese protocolo já cita "no mesmo dia").
4. Bruxismo e placa oclusal (citado em DTM e em dentes desgastados, sem artigo).
5. Endodontia: "Tratamento de canal: quando é necessário e como é feito".
6. Siso: "Extração de siso: quando indicar e como é a recuperação".
7. Alinhadores transparentes, clareamento dental e harmonização orofacial (serviços listados sem conteúdo).

Local: um bloco "Como chegar" (Av. do Contorno, 5351, Edifício Asteca, Cruzeiro, região Centro-Sul; estacionamento, número da sala, que ainda está PENDENTE). Citar bairros vizinhos só se a clínica confirmar a proximidade.

---

## Dados estruturados para audit-data.json (categoria Content Quality)

```json
{
  "category": "Content Quality",
  "score": 58,
  "eeat": {"experience": 55, "expertise": 62, "authoritativeness": 40, "trustworthiness": 72, "weighted": 58},
  "ai_citation_readiness": 52,
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}},
  "findings": [
    {"id": "A1", "severity": "high", "title": "Artigos YMYL rasos (155-335 palavras)", "pages": 14},
    {"id": "A2", "severity": "high", "title": "Sem links internos no corpo; 4 artigos com só 2 links de entrada", "pages": ["dentadura-fixa-belo-horizonte", "enxerto-osseo-dentario-bh", "dor-mastigar-estalos-dtm-bh", "semaglutida-ozempic-wegovy-saude-bucal-bh"]},
    {"id": "A3", "severity": "high", "title": "Sem páginas de serviço para buscas comerciais locais; canibalização home x artigos 1 e 4"},
    {"id": "A4", "severity": "high", "title": "Zero menções a BH/Cruzeiro no corpo dos 14 artigos"},
    {"id": "A5", "severity": "high", "title": "Autoria sem CRO, sem bio, sem revisor, sem referências, dateModified estático"},
    {"id": "A6", "severity": "high", "title": "og-image.jpg retorna 404"},
    {"id": "M1", "severity": "medium", "title": "Titles longos (hormônios 74, doença periodontal 66, sangramento 64, home 63)"},
    {"id": "M2", "severity": "medium", "title": "Metas longas (tratamentos 194, semaglutida 180, home 173, implante 169)"},
    {"id": "M3", "severity": "medium", "title": "H1 de /tratamentos/ sem termo de busca nem local"},
    {"id": "M4", "severity": "medium", "title": "Rótulos de especialidade inconsistentes com o registro no CFO"},
    {"id": "M5", "severity": "medium", "title": "Superlativos/expressões de risco CFO na copy aprovada"},
    {"id": "M6", "severity": "medium", "title": "Link do Perfil da Empresa no Google ausente (google.url null, sameAs só com Instagram)"},
    {"id": "L1", "severity": "low", "title": "Flesch PT 21-37 (vocabulário técnico)"},
    {"id": "L2", "severity": "low", "title": "Estrutura repetida entre artigos, sem sinal de experiência"},
    {"id": "L3", "severity": "low", "title": "/conteudos/ sem texto introdutório"}
  ]
}
```
