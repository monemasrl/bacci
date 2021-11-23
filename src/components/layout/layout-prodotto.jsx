import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"


let slugify = require('slugify')

const LayoutProdotto = ({ children, locale, translations, pageTitle, pathName, tipo }) => {
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
  const langFilter = data.allWpProdotto.edges.filter((item) => {

    return (((item.node.locale.locale === locale) && (item.node.title === pageTitle)))
  })[0].node

  return (
    <div className="mainwrapper">

      <div className="container-fluid " >
        <Header 
        translations={translations} 
        locale={locale} 
        pageTitle={pageTitle} 
        pathName={pathName} 
        tipo={tipo}
        />
      </div>


      <main>{children}</main>




      <Footer translations={translations} locale={locale} />
      <ScrollTo />
    </div>
  )
}


export default LayoutProdotto
