import * as React from "react"
import PropTypes from "prop-types"

import NavBarMobile from "./navbar/navbarMobile"
import Breadcrumb from "./breadcrumb/breadCrumb"
import NavBarDirectus from "./navbar/navbardirectus"

const Header = ({ locale, pageTitle, currentPath, nodeType, tipo, allPagePath, listaApplicazioni, listaCategorie }) => {

  const [mega, setMega] = React.useState(false)



  return (
    <header>

      <NavBarDirectus
        locale={locale}
        mega={mega}
        setMega={setMega}
        allPagePath={allPagePath}
        listaApplicazioni={listaApplicazioni}
        listaCategorie={listaCategorie}
      />

      {/*  <NavBarMobile locale={locale} allPagePath={allPagePath} currentPath={currentPath} pathName={pathName} mega={mega} setMega={setMega} /> */}

      {pageTitle !== 'Home' ? <Breadcrumb pageTitle={pageTitle} pathName={currentPath} nodeType={nodeType} locale={locale} tipo={tipo} /> : ''}

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
