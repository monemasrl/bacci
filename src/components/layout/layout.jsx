import * as React from "react"

import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"
import Gdpr from "../gdpr"

const Layout = ({ dataBreadCrumbFiere, children, locale, pageTitle, seo, seoImage, allPagePath, listaApplicazioni, listaCategorie, parentPath, tipo }) => {

  return (
    <div className={`mainwrapper ${tipo}`}>

      <Seo lang={locale} title={pageTitle} seo={seo} allPagePath={allPagePath} seoImage={seoImage} />
      <Gdpr locale={locale} />
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

      <Footer listaTipologia={listaCategorie} locale={locale} />

      <ScrollTo />

    </div>
  )
}


export default Layout
