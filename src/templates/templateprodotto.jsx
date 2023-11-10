import React from "react";
import LayoutProdotto from "../components/layout/layout-prodotto";
import { GatsbyImage } from "gatsby-plugin-image";
import SoftwareProduct from "../components/SoftwareProduct/SoftwareProduct";
import Correlati from "../components/widgets/correlati";
import { findItemTranslated } from "../utils";

const Prodotto = ({ pageContext }) => {

    const { locale, parentPath, content, title, allPagePath } = pageContext
    const dataProdottoTranslated = findItemTranslated(content.translations, locale)


    return (
        <>
            <LayoutProdotto
                locale={locale}
                pageTitle={title}
                pathName={parentPath}
                tipo='prodotto'
                allPagePath={allPagePath}
            >

                <div className="container prodotto">
                    <section className="container sezione-3">
                        <div className="box-sx">
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.titolo }} />
                            <h2 dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.sottotitolo }} />
                            <p dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.paragrafo }} />
                            <GatsbyImage className="mainprodotto" image={content.immagine.imageFile.childImageSharp.gatsbyImageData} alt={dataProdottoTranslated.titolo} />
                        </div>
                    </section>
                    {content.sezioni_prodotto.map((item) => {
                        const dataProdottoTranslated = findItemTranslated(item.translations, locale)


                        return (
                            <section className="container sezione-testo-sx">
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
                    {/*  <Correlati locale={locale} applicazioni={content.prodottiApplicazioni} limiteVisualizzazione={3} /> */}
                </div>
            </LayoutProdotto>
        </>

    )

}

export default Prodotto