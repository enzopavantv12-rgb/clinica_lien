# Blocos preparados de GA4 e GTM — recuperados do `index.html` do Vite

Estes dois blocos existiam **comentados** no `index.html` da versão Vite e
foram apagados junto com o arquivo na migração para o Next.js. Ficavam
recuperáveis só por SHA (`git show 8bc8a42:index.html` / `git show
fa128d4:index.html`) — commits desta branch de feature, que deixam de existir
depois de um squash merge com delete da branch. Este arquivo é a cópia
durável, porque duas pendências de go-live dependem deles.

**Nada aqui está instalado.** Os blocos continuam inertes e os IDs continuam
placeholders `[[CONFIRMAR]]`. Instalar exige o ID real e uma decisão sobre
GA4-dentro-do-GTM (ver o aviso no fim).

## Google Analytics 4

```html
<!-- Google Analytics 4 — [[CONFIRMAR: G-XXXXXXXXXX]]
     Descomentar apos receber o Measurement ID. Se o GTM for usado para
     gerenciar tags, prefira instalar o GA4 POR DENTRO do GTM e deixar este
     bloco comentado — os dois juntos duplicam pageviews.
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
-->
```

## Google Tag Manager

```html
<!-- Google Tag Manager — [[CONFIRMAR: GTM-XXXXXXX]]
     Descomentar apos receber o ID. O build funciona sem isto: o
     dataLayer.push do src/lib/tracking.ts falha em silencio.
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
-->
```

## Como instalar quando o ID chegar

Não há mais `index.html` onde colar o `<script>` cru. No App Router o lugar é
`app/layout.tsx`, com `next/script`:

- `strategy="afterInteractive"` para o loader (`gtag/js` ou `gtm.js`);
- o bloco de configuração inline em um `<Script id="...">` irmão;
- o `src/lib/tracking.ts` já faz `dataLayer.push` com falha silenciosa, então
  não precisa mudar nada nos componentes.

> **GA4 e GTM juntos duplicam pageviews.** Se o GTM for usado para gerenciar
> tags, instale o GA4 **por dentro** do GTM e deixe o bloco de GA4 acima
> comentado. Instalar os dois separadamente é a única forma errada.
