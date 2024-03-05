import * as React from "react"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import ScrollTo from "../scrollTo"
import Gdpr from "../gdpr"
const LayoutProdotto = ({ listaApplicazioni, listaCategorie, children, locale, pageTitle, pathName, tipo, allPagePath }) => {


  return (
    <div className="mainwrapper">



      <div className="container-fluid " >
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
