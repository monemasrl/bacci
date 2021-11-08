import * as React from "react"
import PropTypes from "prop-types"
import NavBar from "./navbar/navbar"
import Breadcrumb from "./breadcrumb/breadCrumb"
import Megamenu from "./megamenu/megamenu"


const Header = ({ locale, translations, pageTitle, pathName, currentPath, nodeType }) => {

  const [mega, setMega] = React.useState(false)

  return (
    <header>

      <NavBar locale={locale} translations={translations} currentPath={currentPath} pathName={pathName} mega={mega} setMega={setMega} />
      
      {pageTitle !== 'Home' ? <Breadcrumb pageTitle={pageTitle} pathName={currentPath} nodeType={nodeType} /> : ''}

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
