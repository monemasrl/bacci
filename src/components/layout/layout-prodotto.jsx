import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"


let slugify = require('slugify')

const LayoutProdotto = ({ children, locale, pageTitle, pathName, tipo, allPagePath }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }

      allWpProdotto {
        edges {
          node {
            title
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
            translated {
               id
            }
          }
        }
      }
    }
  `)

  return (
    <div className="mainwrapper">

      <div className="container-fluid " >
        <Header

          locale={locale}
          pageTitle={pageTitle}
          pathName={pathName}
          tipo={tipo}
          allPagePath={allPagePath}
        />
      </div>


      <main>{children}</main>




      <Footer locale={locale} />
      <ScrollTo />
    </div>
  )
}


export default LayoutProdotto
