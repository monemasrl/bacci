import React from "react";
import LayoutProdotto from "../components/layout/layout-prodotto";
import { GatsbyImage } from "gatsby-plugin-image";
import Correlati from "../components/widgets/correlati";
import { findItemTranslated } from "../utils";
import { Link } from "gatsby";

const Prodotto = ({ pageContext }) => {

    const { locale, parentPath, content, title, allPagePath, listaApplicazioni, listaCategorie
    } = pageContext
    const dataProdottoTranslated = findItemTranslated(content.translations, locale)
    const categoriaProdotto = content.categoria && findItemTranslated(content.categoria.translations, locale)
    const seoFilterLocale = content.seo?.translations.find((item) => item.language_code.code === locale)

    function softwareContent(productSoftwareData, lang) {
        if (productSoftwareData) {
            const traduzioniSezioneSoftware = findItemTranslated(productSoftwareData.translations, locale)
            let path
            if (lang === 'it_IT') {
                path = `/prodotti/${traduzioniSezioneSoftware.slug}/`
            }
            if (lang === 'en_US') {
                path = `/en/products/${traduzioniSezioneSoftware.slug}/`
            }
            const immagine = productSoftwareData.immagine && productSoftwareData.immagine.imageFile.childImageSharp.gatsbyImageData

            return { ...traduzioniSezioneSoftware, path, immagine }
        } else {
            return undefined
        }
    }
    const softwareData = softwareContent(content.product_software, locale)

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
                            <GatsbyImage className="mainprodotto" image={content.immagine.imageFile.childImageSharp.gatsbyImageData} alt={content.immagine.description || dataProdottoTranslated.titolo} />
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
                                    <GatsbyImage image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={item.immagine.description || dataProdottoTranslated.titolo} />
                                </div>
                            </section>

                        )

                    })}
                    {softwareData ?
                        <section className="container sezione-3 center">
                            <h2 className="titolo">Software</h2>
                            <div className="box-immagine">
                                {softwareData.immagine && <GatsbyImage image={softwareData.immagine} alt={'product software'} />}
                            </div>
                            <p>{softwareData.sottotitolo}</p>
                            <div>
                                <Link class="button-sezione" to={softwareData.path}>{softwareData.titolo}</Link>
                            </div>
                        </section> : ''}
                    {content.type === "machinery" && <Correlati locale={locale} idProdotto={content.id} categoriaProdotto={categoriaProdotto.nome} limiteVisualizzazione={3} />}
                </div>
            </LayoutProdotto>
        </>

    )

}

export default Prodotto