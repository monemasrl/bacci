/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"

import { useStaticQuery, graphql } from "gatsby"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"



const LayoutNews = ({ children, locale, translations, pageTitle, tipo }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }

      allWpPost {
        edges {
          node {
            title
            slug
            content
            nodeType
            locale {
              locale
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

  const langFilter = data.allWpPost.edges.filter((item) => {
    return (((item.node.locale.locale === locale) && (item.node.title === pageTitle)))
  })[0].node

  return (
    <div className="mainwrapper">


      <Seo title={pageTitle} seo={langFilter.seo} />
      <div className="container-fluid " >
        <Header tipo={tipo} translations={translations} locale={locale} pageTitle={pageTitle} nodeType={langFilter.nodeType} />
      </div>


      <main>{children}</main>



      <Footer translations={translations} locale={locale} />
      <ScrollTo />
    </div>
  )
}


export default LayoutNews
