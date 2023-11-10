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





const Layout = ({ children, locale, pageTitle, seo, allPagePath }) => {

  console.log(allPagePath, 'allpagepath')


  return (
    <div className="mainwrapper">
      {seo && <Seo lang={locale} title={pageTitle} seo={seo} />}

      <div className="container-fluid " >
        <Header
          locale={locale}
          pageTitle={pageTitle}
          allPagePath={allPagePath}
        />

      </div>

      <main>{children}</main>


      <Footer locale={locale} />

      <ScrollTo />

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
