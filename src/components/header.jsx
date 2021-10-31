import * as React from "react"
import PropTypes from "prop-types"
import NavBar from "./navbar/navbar"
import Breadcrumb from "./breadcrumb/breadCrumb"
const Header = ({ locale, translations, pageTitle, pathName, currentPath }) => (

  <header>

    <NavBar locale={locale} translations={translations} pathName={pathName}  />

    {pageTitle !== 'Home' ? <Breadcrumb pageTitle = {pageTitle} pathName = {currentPath} /> : ''}

  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
