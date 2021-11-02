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


let slugify = require('slugify')

const LayoutFiere = ({ children, locale, translations, pageTitle, pathName}) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }

      allWpFiliale {
        edges {
          node {
          title
          pathPagine{
            path
          }
            locale {
              locale
            }
            translated {
                pathPagine {
                    path
                }
            }
            translations {
              href
              id
              locale
              post_title
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
  const langFilter = data.allWpFiliale.edges.filter((item) => {
    return (((item.node.locale.locale === locale) && (item.node.title === pageTitle)))
  })[0].node

  return (
    <>
  
      <div className="container-fluid" >
        <Header translations={translations} 
        locale={locale} 
        pageTitle={pageTitle} 
        pathName={langFilter.translated[0] ? langFilter.translated[0].pathPagine.path : ''}
        currentPath={langFilter.pathPagine.path}  />
      </div>


      <main>{children}</main>



      <div className="container-fluid">
        <Footer translations={translations} locale={locale} />
      </div>
    </>
  )
}


export default LayoutFiere
