import * as React from "react"
import PropTypes from "prop-types"
import NavBar from "./navbar/navbar"
import NavBarMobile from "./navbar/navbarMobile"
import Breadcrumb from "./breadcrumb/breadCrumb"



const Header = ({ locale, translations, pageTitle, pathName, currentPath, nodeType }) => {

  const [mega, setMega] = React.useState(false)

  //gestione menu per il mobile
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
  })

  const finestraMobile = (windowWidth <= 1024) && true
  console.log(finestraMobile);

  return (
    <header>
      {!finestraMobile ?
        <NavBar locale={locale} translations={translations} currentPath={currentPath} pathName={pathName} mega={mega} setMega={setMega} />
        : <NavBarMobile locale={locale} translations={translations} currentPath={currentPath} pathName={pathName} mega={mega} setMega={setMega} />}

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
