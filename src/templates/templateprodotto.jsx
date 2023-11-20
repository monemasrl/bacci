import React from "react";
import LayoutProdotto from "../components/layout/layout-prodotto";
import { GatsbyImage } from "gatsby-plugin-image";
import SoftwareProduct from "../components/SoftwareProduct/SoftwareProduct.jsx";
import Correlati from "../components/widgets/correlati";
import { findItemTranslated, findItemsTranslated } from "../utils";
import { graphql } from "gatsby"

export const query = graphql`
 query{
  directus{
    prodotto_categorie_translations{
    languages_code{
      code
    }
    nome
  }
  applicazioni_translations{
      languages_code{
        code
      }
      label
    }
}
  }`
const Prodotto = ({ data, pageContext }) => {
    console.log(pageContext, 'content')
    const { locale, parentPath, content, title, allPagePath } = pageContext
    const dataProdottoTranslated = findItemTranslated(content.translations, locale)
    const listaApplicazioni = findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
    const listaCategorie = findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
    const categoriaProdotto = findItemTranslated(content.categoria.translations, locale)
    console.log(categoriaProdotto, 'data prodotto scheda')
    return (
        <>
            <LayoutProdotto
                locale={locale}
                pageTitle={title}
                pathName={parentPath}
                tipo='prodotto'
                allPagePath={allPagePath}
                pathFromContext={pageContext}
                listaApplicazioni={listaApplicazioni}
                listaCategorie={listaCategorie}
            >

                <div className="container prodotto">
                    <section className="container sezione-3">
                        <div className="box-sx">
                            <GatsbyImage className="mainprodotto" image={content.immagine.imageFile.childImageSharp.gatsbyImageData} alt={dataProdottoTranslated.titolo} />
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.titolo }} />
                            <h2 dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.sottotitolo }} />
                            <p dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.paragrafo }} />
                        </div>
                    </section>
                    {content.sezioni_prodotto.map((item) => {
                        const dataProdottoTranslated = findItemTranslated(item.translations, locale)


                        return (
                            <section className="container sezione-1 left">
                                <div className="box-sx">
                                    <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.titolo }} />
                                    <p>{dataProdottoTranslated.paragrafo}</p>

                                </div>
                                <div className="box-dx">
                                    <GatsbyImage image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={dataProdottoTranslated.titolo} />
                                </div>
                            </section>

                        )

                    })}
                    <SoftwareProduct locale={locale} />
                    <Correlati locale={locale} idProdotto={content.id} categoriaProdotto={categoriaProdotto.nome} limiteVisualizzazione={3} />
                </div>
            </LayoutProdotto>
        </>

    )

}

export default Prodotto