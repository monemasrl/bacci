/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "../assets/sass/globale.scss"
import Header from "./header"
import Footer from "./footer/footer"
import Seo from "../components/seo"
import ScrollTo from "../components/scrollTo"

let slugify = require('slugify')

const Layout = ({ children, locale, translations, pageTitle,linkState }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }

      allWpPage{
        edges {
          node {
            locale{
              locale
            }
            title
            pathPagine {
                    path
                }
            translated {
                pathPagine {
                    path
                }
            }
            seo {
              canonical
              cornerstone
              focuskw
              fullHead
              metaDesc
              metaKeywords
              metaRobotsNofollow
              metaRobotsNoindex
              opengraphAuthor
              opengraphDescription
              opengraphImage {
                sourceUrl
              }
              title
              twitterDescription
              twitterTitle
              opengraphModifiedTime
              opengraphPublishedTime
              opengraphPublisher
              opengraphSiteName
              opengraphTitle
              opengraphType
              opengraphUrl
              readingTime
            }
          }
        }
      }
    }
  `)
  const langFilter = data.allWpPage.edges.filter((item) => {
    return (((item.node.locale.locale === locale) && (item.node.title === pageTitle)))
  })[0].node

  return (
    <>
 
      <Seo title="Mission" seo={langFilter.seo} />
      <div className="container-fluid" >
        <Header 
        translations={translations} 
        locale={locale} 
        pageTitle={pageTitle} 
        pathName={langFilter.translated[0] ? langFilter.translated[0].pathPagine.path : ''} 
        currentPath={langFilter.pathPagine.path}
       
        />
    
      </div>

      <main>{children}</main>

      <div className="container-fluid">
        <Footer translations={translations} locale={locale} />
      </div>
      <ScrollTo />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
