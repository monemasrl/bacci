import * as React from "react"
import PropTypes from "prop-types"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"

const Layout = ({ children, locale, pageTitle, seo, allPagePath, listaApplicazioni, listaCategorie, parentPath, tipo }) => {



  return (
    <div className="mainwrapper">
      <Seo lang={locale} title={pageTitle} seo={seo} />

      <div className="container-fluid " >
        <Header
          locale={locale}
          pageTitle={pageTitle}
          allPagePath={allPagePath}
          listaApplicazioni={listaApplicazioni}
          listaCategorie={listaCategorie}
          parentPath={parentPath}

          tipo={tipo}
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
