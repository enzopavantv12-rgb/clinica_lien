import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Confianca } from '@/components/sections/Confianca';
import { Cardapio } from '@/components/sections/Cardapio';
import { Sobre } from '@/components/sections/Sobre';
import { MetodoLien } from '@/components/sections/MetodoLien';
import { Tratamentos } from '@/components/sections/Tratamentos';
import { Sedacao } from '@/components/sections/Sedacao';
import { Experiencia } from '@/components/sections/Experiencia';
import { Estrutura } from '@/components/sections/Estrutura';
import { Equipe } from '@/components/sections/Equipe';
import { Resultados } from '@/components/sections/Resultados';
import { Depoimentos } from '@/components/sections/Depoimentos';
import { Faq } from '@/components/sections/Faq';
import { CtaFinal } from '@/components/sections/CtaFinal';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { JsonLd } from '@/components/ui/JsonLd';
import { schemaFaq } from '@/data/schema';

/**
 * Ordem das secoes = arquitetura da secao 4 do briefing. Nao reordenar sem
 * atualizar o briefing: a sequencia conduz o paciente da identificacao
 * (cardapio) a confianca (metodo, equipe, prova social) e a conversao.
 * `Resultados` so renderiza com SHOW_RESULTS ligado.
 */
export default function Home() {
  return (
    <>
      {/* FAQPage so aqui: corresponde as perguntas visiveis em #duvidas. */}
      <JsonLd schemas={[schemaFaq]} />
      <Header />

      <main>
        <Hero />
        <Confianca />
        <Cardapio />
        <Sobre />
        <MetodoLien />
        <Tratamentos />
        <Sedacao />
        <Experiencia />
        <Estrutura />
        <Equipe />
        <Resultados />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
