import React from "react";
import LayoutProdotto from "../components/layout/layout-prodotto";
import { GatsbyImage } from "gatsby-plugin-image";
import Correlati from "../components/widgets/correlati";
import { findItemTranslated } from "../utils";


const Prodotto = ({ pageContext }) => {

    const { locale, parentPath, content, title, allPagePath, listaApplicazioni, listaCategorie
    } = pageContext
    const dataProdottoTranslated = findItemTranslated(content.translations, locale)
    const categoriaProdotto = content.categoria && findItemTranslated(content.categoria.translations, locale)

    const seoFilterLocale = content.seo?.translations.find((item) => item.language_code.code === locale)

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
                seo={seoFilterLocale}
            >

                <div className="container prodotto">
                    <section className="container sezione-1 mainProdotto">
                        <div className="box-sx">
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.titolo }} />
                            <h2 dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.sottotitolo }} />
                            <p dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.paragrafo }} />
                        </div>
                        <div className="box-dx">
                            <GatsbyImage className="mainprodotto" image={content.immagine.imageFile.childImageSharp.gatsbyImageData} alt={dataProdottoTranslated.titolo} />

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

                    {content.type === "machinery" && <Correlati locale={locale} idProdotto={content.id} categoriaProdotto={categoriaProdotto.nome} limiteVisualizzazione={3} />}
                </div>
            </LayoutProdotto>
        </>

    )

}

export default Prodotto