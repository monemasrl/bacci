const React = require("react");

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents, setPreBodyComponents, pageContext }) => {
  // Imposta la lingua
  let lang = "it";
  if (pageContext && pageContext.locale) {
    lang = pageContext.locale === "en_US" ? "en" : "it";
  }
  setHtmlAttributes({ lang });

  const GTM_ID = "GTM-KRXXTL5G";

  // Inserisci il Consent Mode v2 PRIMA di GTM
  setHeadComponents([
    React.createElement('script', {
      key: 'gtm-consent-mode',
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });
        `,
      }
    }),
    React.createElement('script', {
      key: 'gtm-script',
      dangerouslySetInnerHTML: {
        __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
      }
    })
  ]);

  // Aggiungi il noscript fallback all'inizio del body
  setPreBodyComponents([
    React.createElement('noscript', {
      key: 'gtm-noscript',
      dangerouslySetInnerHTML: {
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }
    })
  ]);
};
