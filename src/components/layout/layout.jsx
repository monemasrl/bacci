import * as React from "react"
import PropTypes from "prop-types"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"
import CookieConsent from "react-cookie-consent";
import { Link } from "gatsby"

import { Termini } from "../../../data-translations"

const Layout = ({ dataBreadCrumbFiere, children, locale, pageTitle, seo, allPagePath, listaApplicazioni, listaCategorie, parentPath, tipo }) => {

  return (
    <div className={`mainwrapper ${tipo}`}>

      <Seo lang={locale} title={pageTitle} seo={seo} />

      <div className={`container-fluid ${tipo}`}  >
        <Header
          locale={locale}
          pageTitle={pageTitle}
          allPagePath={allPagePath}
          listaApplicazioni={listaApplicazioni}
          listaCategorie={listaCategorie}
          parentPath={parentPath}
          dataBreadCrumbFiere={dataBreadCrumbFiere}
          tipo={tipo}
        />

      </div>

      <main>{children}</main>


      <Footer locale={locale} />

      <ScrollTo />
      <CookieConsent
        location="bottom"
        buttonText={Termini[locale].cookieButton}
        cookieName="myAwesomeCookieName2"
        style={{ background: "#0e294b", padding: "1rem 1rem", maxWidth: "600px", right: 0, left: 'auto' }}
        buttonStyle={{ color: "black", fontSize: "1rem", display: "block", background: "white" }}
        expires={150}
      >
        <p style={{ color: "white", fontSize: "1rem", marginBottom: "2rem" }}>{Termini[locale].cookieTesto}</p>
        <Link style={{ color: "white", border: "1px solid white", padding: ".5rem" }} to={`/${locale}/privacy-policy/`}>privacy-policy</Link>
      </CookieConsent>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
