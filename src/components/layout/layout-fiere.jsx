/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"


let slugify = require('slugify')

const LayoutFiere = ({ children, locale, translations, pageTitle, pathName}) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }

      allWpFiera {
        edges {
          node {
            slug
            content
            locale {
              locale
            }
            translations {
              href
              id
              locale
              post_title
            }

          }
        }
      }
    }
  `)
 
  return (
    <>
  
      <div className="container-fluid" >
        <Header translations={translations} locale={locale} pageTitle={pageTitle} pathName={pathName}  />
      </div>


      <main>{children}</main>



 
        <Footer translations={translations} locale={locale} />
        <ScrollTo />
    </>
  )
}


export default LayoutFiere
