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
function Seo({ description, lang, meta, title, seo }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

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
      if (seo.description) {
        arrSeo.push({
          property: `og:description`,
          content: seo.description,
        })
      }
      if (seo.type) {
        arrSeo.push({
          property: `og:type`,
          content: seo.type,
        })
      }
    }
    return arrSeo
  }
  return (
    <Helmet>
      <html lang={langTag[lang]} />
      <title>{seo?.title || title || defaultTitle}</title>
      <meta
        name="description"
        content={seo?.meta_description || metaDescription}
      />
      <meta name="author" content={site.siteMetadata.author} />
      <link rel="icon" href="/src/images/favicon.png" />
      {seo &&
        getDataSeoOpenGraph(seo).map((item, index) => {
          return <meta property={index} {...item} />
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
