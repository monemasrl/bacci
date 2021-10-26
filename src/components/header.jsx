import * as React from "react"
import PropTypes from "prop-types"
import NavBar from "./navbar/navbar"
const Header = ({ locale, translations }) => (
  <header>
 
    <NavBar locale={locale} translations={translations} />
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
