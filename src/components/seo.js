/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { langTag } from "../../data-translations"

function Seo({ description, lang, meta, title, seo, allPagePath, seoImage, pageType }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
          }
        }
      }
    `
  )

  // Normalizza il locale in tutte le possibili forme
  const normalizeLocale = (locale) => {
    if (!locale) return "it"

    // Mappa di conversione per tutti i formati possibili
    const localeMap = {
      "it_IT": "it",
      "en_US": "en",
      "it-IT": "it",
      "en-US": "en",
      "it": "it",
      "en": "en",
      "IT": "it",
      "EN": "en"
    }

    return localeMap[locale] || "it"
  }

  const htmlLang = normalizeLocale(lang)

  const localePath = allPagePath?.find((item) => {
    return item.locale === lang
  })

  // Fallback intelligenti per descrizione basati sul tipo di pagina
  const getFallbackDescription = () => {
    // Evita placeholder scartando valori comuni non significativi
    const isPlaceholder = (str) => {
      if (!str) return true
      const lowerStr = str.toLowerCase()
      return (
        lowerStr.includes("descrizione") ||
        lowerStr.includes("meta") ||
        lowerStr.includes("placeholder") ||
        lowerStr === "bacci" ||
        str.length < 10
      )
    }

    // Se il seo.meta_description esiste e non è placeholder, usalo
    if (seo?.meta_description && !isPlaceholder(seo.meta_description)) {
      return seo.meta_description
    }

    // Se è passato un description personalizzato, usalo
    if (description && !isPlaceholder(description)) {
      return description
    }

    // Fallback intelligente basato sul tipo di pagina
    const fallbacksByPageType = {
      prodotto: lang === "en_US"
        ? "Industrial wood processing machinery - CNC cutting, optimization and finishing solutions."
        : "Macchine e soluzioni per la lavorazione industriale del legno.",
      prodotti: lang === "en_US"
        ? "Browse our complete range of wood processing machinery and solutions."
        : "Scopri la gamma completa di macchine per la lavorazione del legno.",
      news: lang === "en_US"
        ? "Latest news and updates from Bacci - innovating in wood processing technology."
        : "Ultime notizie e aggiornamenti da Bacci - innovazione nella lavorazione del legno.",
      fiere: lang === "en_US"
        ? "Bacci at fairs and exhibitions worldwide. Meet us to discover our solutions."
        : "Bacci alle fiere e mostre internazionali. Vieni a scoprire le nostre soluzioni.",
      contatti: lang === "en_US"
        ? "Contact Bacci for information about our wood processing machinery."
        : "Contatta Bacci per informazioni sulle nostre macchine.",
      azienda: lang === "en_US"
        ? "Learn about Bacci: A leader in wood processing machinery since 1924."
        : "Scopri Bacci: Leader nella lavorazione del legno dal 1924.",
    }

    return fallbacksByPageType[pageType] || site.siteMetadata.description
  }

  const metaDescription = getFallbackDescription()
  const defaultTitle = site.siteMetadata?.title
  const pageTitle = seo?.title || title || defaultTitle

  // Fix URL construction per evitare doppi slash
  const canonicalUrl = localePath?.path
    ? `${site.siteMetadata.siteUrl}${localePath.path.startsWith('/') ? localePath.path : '/' + localePath.path}`
    : site.siteMetadata.siteUrl

  // Rimuovi trailing slash per consistency
  const siteUrlClean = site.siteMetadata.siteUrl.replace(/\/$/, '')

  // Genera gli hreflang links
  const generateHreflangLinks = () => {
    const links = []

    if (allPagePath && allPagePath.length > 0) {
      // x-default punta alla versione IT se disponibile, altrimenti alla homepage
      const itVersion = allPagePath.find(item => item.locale === 'it_IT' || item.locale === 'it')
      const xDefaultUrl = itVersion ? `${site.siteMetadata.siteUrl}${itVersion.path}` : site.siteMetadata.siteUrl

      links.push({
        rel: 'alternate',
        hrefLang: 'x-default',
        href: xDefaultUrl
      })

      // Genera hreflang per tutte le varianti linguistiche
      allPagePath.forEach(item => {
        const hrefLangCode = langTag[item.locale] || "it"
        const itemUrl = `${site.siteMetadata.siteUrl}${item.path}`

        links.push({
          rel: 'alternate',
          hrefLang: hrefLangCode,
          href: itemUrl
        })
      })
    } else {
      // Fallback per pagine senza allPagePath
      links.push({
        rel: 'alternate',
        hrefLang: 'x-default',
        href: site.siteMetadata.siteUrl
      })
    }

    return links
  }

  const hreflangLinks = generateHreflangLinks()

  // Dati strutturati corretti
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrlClean}/#organization`,
    "name": "Bacci",
    "url": siteUrlClean,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrlClean}/favicon-32x32.png`,
      "width": 32,
      "height": 32
    },
    "description": metaDescription,
    "foundingDate": "1924",
    "industry": "Wood Processing Machinery"
  }

  // Aggiungi immagine se presente - FIX: aggiungi all'oggetto principale, non all'array
  if (seoImage) {
    const imageUrl = seoImage.startsWith('http')
      ? seoImage
      : `${site.siteMetadata.siteUrl}${seoImage}`

    structuredData.image = {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    }
  }

  function getDataSeoOpenGraph(seo) {
    const arrSeo = []
    
    // og:title - sempre presente, usa il fallback se necessario
    arrSeo.push({
      property: `og:title`,
      content: seo?.title || pageTitle || defaultTitle,
    })

    // og:description - sempre presente, usa il fallback
    arrSeo.push({
      property: `og:description`,
      content: metaDescription,
    })

    // og:url - sempre coerente con canonical
    arrSeo.push({
      property: `og:url`,
      content: canonicalUrl,
    })

    // og:image - se disponibile
    if (seoImage) {
      const imageUrl = seoImage.startsWith('http')
        ? seoImage
        : `${site.siteMetadata.siteUrl}${seoImage}`
      arrSeo.push({
        property: `og:image`,
        content: imageUrl,
      })
      // Aggiungi anche dimensioni standard per og:image
      arrSeo.push({
        property: `og:image:width`,
        content: '1200',
      })
      arrSeo.push({
        property: `og:image:height`,
        content: '630',
      })
    }

    // og:locale - formato Facebook
    const ogLocale = langTag[lang] === 'it' ? 'it_IT' : 'en_US'
    arrSeo.push({
      property: `og:locale`,
      content: ogLocale,
    })

    // og:site_name
    arrSeo.push({
      property: `og:site_name`,
      content: 'Bacci',
    })

    // og:type
    arrSeo.push({
      property: `og:type`,
      content: 'website',
    })

    return arrSeo
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={site.siteMetadata.author} />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang */}
      {hreflangLinks.map((link, index) => (
        <link
          key={`hreflang-${index}`}
          rel={link.rel}
          hrefLang={link.hrefLang}
          href={link.href}
        />
      ))}

      {/* OpenGraph tags - generati sempre con fallback intelligenti */}
      {getDataSeoOpenGraph(seo).map((item, index) => (
        <meta key={`og-${index}`} property={item.property} content={item.content} />
      ))}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  allPagePath: PropTypes.array,
  seoImage: PropTypes.string,
  pageType: PropTypes.string,
}

export default Seo
