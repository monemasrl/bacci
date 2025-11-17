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

function Seo({ description, lang, meta, title, seo, allPagePath, seoImage }) {
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

  const localePath = allPagePath?.find((item) => {
    return item.locale === lang
  })

  const metaDescription = seo?.meta_description || description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const pageTitle = seo?.title || title || defaultTitle

  // Fix URL construction per evitare doppi slash
  const canonicalUrl = localePath?.path
    ? `${site.siteMetadata.siteUrl}${localePath.path.startsWith('/') ? localePath.path : '/' + localePath.path}`
    : site.siteMetadata.siteUrl

  // Rimuovi trailing slash per consistency
  const siteUrlClean = site.siteMetadata.siteUrl.replace(/\/$/, '')

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
    if (seo) {
      if (seo.title) {
        arrSeo.push({
          property: `og:title`,
          content: seo.title,
        })
      }
      if (seo.meta_description) {
        arrSeo.push({
          property: `og:description`,
          content: seo.meta_description,
        })
      }

      // Fix locale format per Facebook
      const ogLocale = langTag[lang] === 'it' ? 'it_IT' : 'en_US'
      arrSeo.push({
        property: `og:locale`,
        content: ogLocale,
      })

      arrSeo.push({
        property: `og:url`,
        content: canonicalUrl,
      })

      arrSeo.push({
        property: `og:site_name`,
        content: 'Bacci',
      })

      arrSeo.push({
        property: `og:type`,
        content: 'website',
      })
    }
    return arrSeo
  }

  return (
    <Helmet>
      <html lang={langTag[lang] || "it"} />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={site.siteMetadata.author} />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={site.siteMetadata.siteUrl}
      />

      {allPagePath && allPagePath.map((item) => {
        const hrefLangCode = langTag[item.locale] || "it"
        const itemUrl = `${site.siteMetadata.siteUrl}${item.path}`

        return (
          <link
            key={item.locale}
            rel="alternate"
            hrefLang={hrefLangCode}
            href={itemUrl}
          />
        )
      })}

      {/* OpenGraph tags */}
      {seo && getDataSeoOpenGraph(seo).map((item, index) => (
        <meta key={`og-${index}`} property={item.property} content={item.content} />
      ))}

      {/* OG Image */}
      {seoImage && (
        <meta
          property="og:image"
          content={seoImage.startsWith('http') ? seoImage : `${site.siteMetadata.siteUrl}${seoImage}`}
        />
      )}

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
}

export default Seo
