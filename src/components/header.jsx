import * as React from "react"
import PropTypes from "prop-types"
import NavBar from "./navbar/navbar"
import NavBarMobile from "./navbar/navbarMobile"
import Breadcrumb from "./breadcrumb/breadCrumb"

const isBrowser = typeof window !== "undefined"

const Header = ({ locale, translations, pageTitle, pathName, currentPath, nodeType, tipo }) => {

  const [mega, setMega] = React.useState(false)

 

  return (
    <header>
  
        <NavBar locale={locale} translations={translations} currentPath={currentPath} pathName={pathName} mega={mega} setMega={setMega} />
        <NavBarMobile locale={locale} translations={translations} currentPath={currentPath} pathName={pathName} mega={mega} setMega={setMega} />

      {pageTitle !== 'Home' ? <Breadcrumb pageTitle={pageTitle}  pathName={currentPath} nodeType={nodeType} locale={locale} tipo={tipo} /> : ''}

    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
