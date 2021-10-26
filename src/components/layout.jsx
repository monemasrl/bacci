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
const Layout = ({ children, locale, translations }) => {
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
      <div className="container-fluid">
        <Header translations={translations} locale={locale} siteTitle={data.site.siteMetadata?.title || `Title`} />

      </div>
      <div className="container-fluid">
        <div className="row">
          <main>{children}</main>
          
        </div>
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
