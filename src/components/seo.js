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
function Seo({ description, lang, meta, title, seo, allPagePath }) {
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

  const localePath = allPagePath.find((item) => {
    return item.locale === lang
  })

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

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
      if (langTag[lang]) {
        arrSeo.push({
          property: `og:locale`,
          content: langTag[lang],
        })
      }
      if (localePath?.path) {
        arrSeo.push({
          property: `og:url`,
          content: site.siteMetadata.siteUrl + localePath?.path,
        })
      }

      arrSeo.push({
        property: `og:site_name`,
        content: 'bacci.com',
      })

    }
    return arrSeo
  }
  console.log(seo)
  return (
    <Helmet >
      <html lang={langTag[lang]} />
      <title>{seo?.title || title || defaultTitle}</title>
      <meta
        name="description"
        content={seo?.meta_description || metaDescription}
      />
      <meta name="author" content={site.siteMetadata.author} />
      <link rel="canonical" href={site.siteMetadata.siteUrl + localePath?.path} />
      {allPagePath && allPagePath.map((item, idx) => (
        <link
          key={item.locale}
          rel="alternate"
          hrefLang={item.locale === "it" ? "it" : "en"}
          href={site.siteMetadata.siteUrl + item.path}
        />
      ))}
      {seo &&
        getDataSeoOpenGraph(seo).map((item, index) => {
          return <meta key={index} property={index} {...item} />
        })}
    </Helmet>
  )
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
