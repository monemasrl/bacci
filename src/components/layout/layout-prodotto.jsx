import * as React from "react"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import ScrollTo from "../scrollTo"
import Gdpr from "../gdpr"
import Seo from "../seo"
const LayoutProdotto = ({ listaApplicazioni, listaCategorie, children, locale, pageTitle, pathName, tipo, allPagePath, seo }) => {


  return (
    <div className="mainwrapper">
      <div className="container-fluid " >
        <Seo lang={locale} title={pageTitle} seo={seo} />
        <Header
          locale={locale}
          pageTitle={pageTitle}
          pathName={pathName}
          tipo={tipo}
          allPagePath={allPagePath}
          listaApplicazioni={listaApplicazioni}
          listaCategorie={listaCategorie}
        />
      </div>


      <main>{children}</main>




      <Footer listaTipologia={listaCategorie} locale={locale} />
      <ScrollTo />
      <Gdpr locale={locale} />
    </div>
  )
}


export default LayoutProdotto
