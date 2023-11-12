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



const LayoutNews = ({ children, locale, pageTitle, tipo, allPagePath }) => {


  return (
    <div className="mainwrapper">


      <Seo lang={locale} title={pageTitle} seo={langFilter.seo} />
      <div className="container-fluid " >
        <Header allPagePath={allPagePath} tipo={tipo} locale={locale} pageTitle={pageTitle} nodeType={langFilter.nodeType} />
      </div>


      <main>{children}</main>



      <Footer locale={locale} />
      <ScrollTo />
    </div>
  )
}


export default LayoutNews
