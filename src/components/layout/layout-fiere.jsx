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


let slugify = require('slugify')

const LayoutFiere = ({ children, locale, pageTitle, pathName, tipo, allPagePath }) => {


  return (
    <div className="mainwrapper">

      <div className="container-fluid " >
        <Header allPagePath={allPagePath} locale={locale} pageTitle={pageTitle} pathName={pathName} tipo={tipo} />
      </div>


      <main>{children}</main>




      <Footer locale={locale} />
      <ScrollTo />
    </div>
  )
}


export default LayoutFiere
