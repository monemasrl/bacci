/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"



const LayoutFiere = ({ children, locale, pageTitle }) => {

  return (
    <div className="mainwrapper">
      <Seo lang={locale} title={pageTitle} seo={langFilter.seo} />
      <div className="container-fluid " >
        <Header
          locale={locale}
          pageTitle={pageTitle}
          pathName={langFilter.translated[0] ? langFilter.translated[0].pathPagine.path : ''}
          currentPath={langFilter.pathPagine.path} />
      </div>


      <main>{children}</main>




      <Footer locale={locale} />
      <ScrollTo />
    </div>
  )
}


export default LayoutFiere
