import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../../assets/sass/globale.scss"
import Header from "../header"
import Footer from "../footer/footer"
import Seo from "../seo"
import ScrollTo from "../scrollTo"

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




      <Footer locale={locale} />
      <ScrollTo />
    </div>
  )
}


export default LayoutProdotto
