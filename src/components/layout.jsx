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

const Layout = ({ children, locale, translations, pageTitle, pathName }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div className="container-fluid" >
        <Header translations={translations} locale={locale} pageTitle={pageTitle} pathName={pathName} />
      </div>
      <div className={`container-fluid ${pageTitle ? slugify(pageTitle.toLowerCase()) : '' }`} >

        <main>{children}</main>


      </div>
      <div className="container-fluid">
        <Footer translations={translations} locale={locale} />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
