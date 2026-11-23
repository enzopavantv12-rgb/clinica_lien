# Auditoria Local SEO - Lien Reabilitação Oral (2026-11-23)
Base: leitura de src/data/content.ts, schema.ts, Footer.tsx, content/artigos (sem fetch ao vivo, sem DataForSEO). Nada do código foi modificado.

## Resumo
- Tipo: brick-and-mortar (endereço visível, link ao Maps). Vertical: saúde/odontologia (Dentist, CRO-MG, equipe multidisciplinar).
- Score estimado: 54/100
  - GBP signals 25%: 10/25 (sem link do perfil, sem embed, sem geo/hasMap por place ID)
  - Reviews 20%: 13/20 (5,0 / 57 no texto, mas sem link para o perfil; conformidade ética ok, sem aggregateRating)
  - On-page local 20%: 11/20 (Cruzeiro/BH presente; sem Savassi/Funcionários/Serra; sem página de "como chegar")
  - NAP/citações 15%: 8/15 (NAP interno consistente; citações não verificáveis)
  - Schema 10%: 7/10
  - Links/autoridade 10%: 5/10
- Proximidade (~55% da variância no ranking do pack) está fora do controle.

## NAP (fonte x fonte)
| Fonte | Nome | Endereço | Tel |
|---|---|---|---|
| content.ts | Lien Reabilitação Oral | Edifício Asteca, Av. do Contorno, 5351 - Cruzeiro, BH/MG 30110-923 | (31) 98507-0448 |
| Rodapé (Footer) | idem | idem (sem CEP no texto) | tel:+5531985070448 |
| JSON-LD | idem | streetAddress "Av. do Contorno, 5351 — Edifício Asteca", CEP ok | +5531985070448 |
| Maps/hasMap | - | grafia "Av. do Contorno, 5351 - Cruzeiro..." | - |
Sem divergência interna. Atenções: (a) sem sala/andar (PENDENTE no código); (b) telefone marcado como "confirmar se é número único"; (c) o GBP deve ter exatamente a mesma grafia (Edifício Asteca no linha 2, não no nome). (d) streetAddress mistura rua e edifício com travessão; melhor "Av. do Contorno, 5351, Sala XXX" com o edifício na description/name do local.

## Schema local
Correto: Dentist com @id, openingHoursSpecification, telephone, url, areaServed, sameAs, Person com CRO, FAQPage, Breadcrumb, Article, sem aggregateRating (decisão correta para autoavaliação).
Problemas:
1. `@type: ['Dentist','LocalBusiness','MedicalBusiness']` - redundante; usar `['Dentist','MedicalBusiness']` ou só `Dentist` (Dentist já herda LocalBusiness). Baixa prioridade.
2. `geo` ausente (PENDENTE de lat/long) - adicionar com 5 casas decimais.
3. `hasMap` usa search URL; trocar pela URL do perfil (maps.app.goo.gl / cid / place_id) quando existir.
4. `sameAs` só Instagram; adicionar perfil Google, Doctoralia, Facebook, LinkedIn, Bing quando existirem.
5. `availableService` com MedicalProcedure: não é propriedade padrão de LocalBusiness (válida em schema.org só em alguns tipos; Google ignora). Usar `hasOfferCatalog` (sem preço) ou remover. `medicalSpecialty: 'Dentistry'` é aceito, mas o valor correto da enumeração é `https://schema.org/Dentistry`.
6. `image` é a logo: trocar por fotos reais da fachada/consultório (já existem em /img/consultorio-*).
7. `areaServed` só cidade: adicionar bairros (Cruzeiro, Savassi, Funcionários, Serra, Santo Agostinho, Lourdes, Sion, Anchieta, Santo Antônio) como `City`/`AdministrativeArea`.
8. `founder` aninhado sem @id: apontar para `#natalia-simoes`.
9. `email` pessoal gmail no schema: aceitável, mas domínio próprio é melhor para confiança.
10. `employee`/`member` ausente: vincular os 6 profissionais com CRO (reforça E-E-A-T e a ligação com perfis Doctoralia).
11. `priceRange` ausente por regra do CFO: manter.
12. `isAcceptingNewPatients`, `paymentAccepted` opcionais; `knowsLanguage` opcional.

## Sinais locais on-page
- Presentes: "Cruzeiro, BH" no title, hero, faixa, alt de OG, FAQ "Onde fica" (Centro-Sul), rodapé com endereço e tel:, URLs de artigos com "-belo-horizonte"/"-bh".
- Ausentes: nenhuma menção a Savassi, Funcionários, Serra, Santo Agostinho, Lourdes; nenhum bloco de "Como chegar" (mapa removido por LGPD, mas o clique-para-carregar já é usado no vídeo - mesma técnica serve para o mapa); sem estacionamento/acessibilidade/ponto de referência; sem página dedicada de localização; artigos praticamente sem menção a bairro; links de contato fora do rodapé (ex.: página /contato ou /como-chegar).
- Páginas de serviço: a lista de 10 tratamentos está em uma única página com âncoras (/tratamentos/#slug). Serviço dedicado é o fator orgânico local nº 1: criar uma URL por serviço (ex.: /implante-dentario-belo-horizonte/ já existe como artigo; faltam harmonização, DTM, endodontia, ortodontia, periodontia, lentes). Âncoras com hash não são indexadas como páginas separadas, e o schema aponta para #slug.
- Prova social: "5,0 / 57 avaliações" sem link para o perfil (google.url = null). Atualizar a contagem antes de cada deploy ou renderizar sem número fixo. Texto "avaliação" tem restrição de vocabulário do projeto; manter ""Nota"".
- Conteúdo de risco ético (CFO/CRO): "relaxamento absoluto", "total segurança", "excelência", "alto padrão", "sorriso que você merece", "Especialista" em cards sem registro de RQE. Já marcados PENDENTE; a CRO-MG deve validar. Antes/depois: CFO 196/2019 exige autorização e padronização; as legendas atuais cumprem. Resolução CFO 196 proíbe divulgar preço, sorteios e "autopromoção"; Resolução 118/2012 também; manter.
- Número do CRO: exibido na equipe? (cro existe no dado); confirmar que aparece no HTML de cada card e no rodapé (CRO-MG da responsável técnica + inscrição da clínica no CRO-MG).

## GBP: checklist (itens detectados x a fazer)
Detectados: link de rota via Maps; endereço grafado igual ao Maps; horários definidos; Instagram.
Ausentes/sem confirmação: link do perfil no site; embed; place ID; fotos reais no perfil; posts; Q&A.
Recomendações para o perfil:
- Categoria principal: "Dentista" ou, se a clínica quer ranquear por implante, "Implantodontista" (verificar se disponível em pt-BR; fator nº 1 de ranking). Para a posição principal, escolher a que corresponde ao serviço de maior receita; Dr. Alexander (cirurgia) e harmonização não devem ser principais. Secundárias: Clínica odontológica, Cirurgião bucomaxilofacial, Ortodontista, Endodontista, Periodontista, Dentista cosmético, Clínica de DTM (se existir), Clínica de estética (só se ofertar harmonização; avaliar).
- Serviços: um item para cada um dos 10 tratamentos + subserviços (implante, protocolo, lentes, placa de bruxismo, sedação, siso, canal), descrição sem preço/promessa.
- Nome: exatamente "Lien Reabilitação Oral" (sem keywords tipo "- Implantes BH"; viola as diretrizes e a ética).
- Horário: conferir quarta 9h-20h; marcar feriados; telefone principal (31) 98507-0448 e site com UTM.
- Link de agendamento: WhatsApp (wa.me) como link de "Agendar".
- Atributos: acessibilidade (rampa/elevador), estacionamento (valet/rotativo), Wi-Fi, "atendimento por hora marcada", "particular".
- Fotos: fachada/entrada do Edifício Asteca e o caminho até a sala, recepção, consultório, equipe (consentimento), equipamentos (scanner). Mín. 25, novas semanalmente/quinzenalmente. Sem antes/depois com paciente identificável sem autorização escrita; seguir CFO 196.
- Vídeos curtos (consultório, scanner), 30 s.
- Posts: 1-2/semana, conteúdo educativo (sem preço, sem promoção, sem "garantido"). Reaproveitar os 14 artigos com CTA para a consulta.
- Q&A: semear 6-8 perguntas reais (convênio? sedação? estacionamento? como chegar?) e responder como proprietário.
- Mensagens: ativar chat/WhatsApp; meta de resposta < 1 h no horário.
- Verificação: confirmar que o perfil está verificado e vinculado ao e-mail da clínica, com 2 proprietários.

## Estratégia de avaliações (conforme CFO)
- Pedir após alta/etapa, de modo neutro, com link curto do perfil (QR code na recepção, WhatsApp pós-consulta). Pedir a todos, não filtrar (review gating viola política do Google).
- Sem incentivo, brinde ou sorteio (CFO 196/2019 e política do Google). Não republicar avaliação com promessa de resultado; paciente não identifica tratamento em "depoimentos" no site além do que consta no Google (a clínica já mostra só a fonte).
- Responder todas em até 48 h, sem confirmar que a pessoa é paciente nem citar dados de saúde (LGPD/sigilo, Código de Ética Odontológica). Modelo: "Agradecemos a sua avaliação. Ficamos à disposição pelo canal oficial."
- Negativas: responder com cordialidade e levar ao canal privado; sinalizar fake no Google.
- Cadência: meta de 4-8 novas/mês; 57 avaliações é razoável, concorrentes locais no Centro-Sul costumam ter 100-500+ (benchmark a verificar).
- Cuidado: não incluir aggregateRating no schema (self-serving; manter assim).

## Citações (Brasil)
Prioridade 1 (NAP idêntico): Google Business Profile, Apple Business Connect (Apple Maps), Bing Places, Doctoralia (perfil da clínica + cada profissional, com CRO), Facebook Page, Instagram (endereço/botão de contato no perfil, @clinica_lien), Waze (via GBP), LinkedIn (empresa).
Prioridade 2: TeleListas/Apontador/Guiamais, Solutudo, Cylex Brasil, Foursquare, Yelp (pouco forte no BR), Reclame Aqui (cadastro e resposta), Encontra BH, Todo Dentista/Dentistas.com.br/Saúde Dentária, Boa Consulta, Doctoralia, iClinic/Conexa (agenda), CRO-MG (consulta pública de inscrição, para validação de legitimidade), CNES (cadastro de estabelecimento de saúde), Sebrae/Junta/Receita (CNPJ com mesmo endereço: CNAE 8630-5/04 odontológico).
Notas: pesquisar no Google "Lien Reabilitação Oral" e "30110-923" para encontrar duplicidades; corrigir grafias (Av. Contorno / Avenida do Contorno). Verificar se o Edifício Asteca tem listagem de outras clínicas com o mesmo endereço (confusão de perfil).
Backlinks locais: Sociedade/associações (ABO-MG, APCD-style, SBPqO), faculdades, imprensa BH (Estado de Minas, O Tempo, Itatiaia), parceiros do edifício, colegas médicos (anestesista, fisioterapia, nutrição, fonoaudiologia), eventos e podcasts.

## Fatores locais de dentista (YMYL)
- E-E-A-T: CRO e RQE de cada profissional, formação (USP, mestrado) comprovável, revisão clínica nos artigos (autor nomeado e data), responsável técnica identificada (já ok).
- Doctoralia e Google costumam aparecer na SERP para "dentista + bairro": perfil completo e avaliações lá.
- Buscas-alvo: "implante dentário BH", "dentista Savassi/Funcionários/Cruzeiro", "lente de contato dental BH", "dentista com sedação BH", "protocolo dentário BH", "dentista para quem tem medo".
- Convênio: site diz atendimento particular; deixar claro no GBP e Q&A para evitar avaliações ruins de quem busca convênio.
- Segmento de público: bairros de alta renda em torno (Cruzeiro, Savassi, Funcionários, Serra, Santo Agostinho, Lourdes, Anchieta, Sion, Belvedere): citar como "atende pacientes de" sem dizer que a clínica fica lá.

## Ações priorizadas
### No código do site
1. (Crítico) Criar páginas dedicadas por serviço (URL própria, H1 com serviço + BH, FAQ, equipe responsável, schema Service/MedicalProcedure), prioridade: implante, lentes/facetas, DTM, harmonização, endodontia, ortodontia, periodontia.
2. (Alto) Adicionar `geo` (5 casas) e `hasMap` com URL do perfil; preencher `google.url` (link do perfil) e usar em sameAs, rodapé e seção de depoimentos ("Ver no Google").
3. (Alto) Bloco/página "Como chegar" com mapa click-to-load (mantém LGPD), sala/andar, estacionamento, acessibilidade, pontos de referência e acessos pela Av. do Contorno, e menção natural a Savassi, Funcionários, Serra, Santo Agostinho, Lourdes, Centro-Sul. Evitar páginas de bairro duplicadas (doorway).
4. (Alto) Schema: ampliar areaServed com bairros, trocar `medicalSpecialty` por URL do enum, @id no founder, `employee` com os 6 profissionais e CRO, sameAs ampliado, imagens reais; revisar tipo duplicado.
5. (Médio) Incluir sala e CEP no rodapé, número CRO da clínica; FAQ com bairros e estacionamento.
6. (Médio) Link interno dos artigos para a página de serviço correspondente e menção de Cruzeiro/BH em cada um (hoje 16 ocorrências só, nos 14 artigos).
7. (Médio) Hoje a contagem "57" é fixa: automatizar ou revisar mensalmente (conflito se desatualizar com o GBP).
8. (Baixo) og-image real, Search Console, `llms.txt` com endereço e bairros.

### Fora do site (clínica)
1. (Crítico) Otimizar GBP: categoria principal, secundárias, serviços, atributos, horários, fotos (fachada e entrada), link de agendamento.
2. (Crítico) Rotina de avaliações compliance (QR, link, resposta em 48 h, sem incentivo).
3. (Alto) Reivindicar/atualizar Doctoralia (clínica e profissionais), Apple Business Connect, Bing Places, Facebook, LinkedIn.
4. (Alto) Posts semanais e Q&A no GBP; fotos novas quinzenais.
5. (Médio) Citações secundárias (TeleListas, Guiamais, Apontador, Solutudo, Cylex) com NAP idêntico; auditar duplicatas.
6. (Médio) Backlinks locais e parcerias; coberturas na imprensa de BH.
7. (Médio) Revisão ética pela CRO-MG de termos pendentes (relaxamento absoluto, total segurança, "Especialista").
8. (Baixo) Confirmar número único de telefone/WhatsApp (PENDENTE).

## Limitações
Sem acesso ao GBP, sem dados de ranking no pack, sem verificação ao vivo de citações (Doctoralia, Bing, Apple), sem contagem real de avaliações ou taxa de resposta, sem DataForSEO. Benchmarks de concorrentes são estimativas. Análise a partir do código-fonte, não do HTML renderizado em produção.
