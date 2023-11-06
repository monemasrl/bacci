import React from "react";
import LayoutProdotto from "../components/layout/layout-prodotto";
import { GatsbyImage } from "gatsby-plugin-image";
import SoftwareProduct from "../components/SoftwareProduct/SoftwareProduct";
import Correlati from "../components/widgets/correlati";
const Prodotto = ({ pageContext }) => {

    const { locale, translations, parentPath, content, title, allPagePath, dataMenu } = pageContext

    return (
        <>
            <LayoutProdotto
                locale={locale}
                translations={translations}
                pageTitle={title}
                pathName={parentPath}
                tipo='prodotto'
                allPagePath={allPagePath}
                dataMenu={dataMenu}
            >

                <div className="container prodotto">
                    <section className="container sezione-3">
                        <div className="box-sx">
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: title }} />
                            <h2 dangerouslySetInnerHTML={{ __html: content.prodotto.sottotitolo }} />
                            <p dangerouslySetInnerHTML={{ __html: content.prodotto.paragrafo }} />
                            <GatsbyImage className="mainprodotto" image={content.prodotto.immagine.localFile.childImageSharp.gatsbyImageData} alt={content.prodotto.immagine.altText} />

                        </div>
                    </section>
                    {content.prodotto.sezioniProdotto.map((item) => {

                        return (
                            <section key={item.titolo} className="container sezione-testo-sx">
                                <div className="box-sx">
                                    <h2 className="titolo" dangerouslySetInnerHTML={{ __html: item.titolo }} />
                                    <p>{item.paragrafo}</p>

                                </div>
                                <div className="box-dx">
                                    <GatsbyImage image={item.immagine.localFile.childImageSharp.gatsbyImageData} alt={item.immagine.altText} />
                                </div>
                            </section>

                        )

                    })}
                    <SoftwareProduct locale={locale} />
                    <Correlati locale={locale} applicazioni={content.prodottiApplicazioni} limiteVisualizzazione={3} />
                </div>
            </LayoutProdotto>
        </>

    )

}

export default Prodotto