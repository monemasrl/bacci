import React, { useState } from "react";
import LayoutProdotto from "../components/layout/layout-prodotto";
import { GatsbyImage } from "gatsby-plugin-image";
import Correlati from "../components/widgets/correlati";
import { findItemTranslated } from "../utils";
import Modale from "../components/modale/modale";
import { FormDownloadCatalogo } from "../components/form";
import { Termini } from "../../data-translations";
import { GrDocumentPdf } from "react-icons/gr";
import YoutubeEmbed from "../components/youtubeEmbed";
const Prodotto = ({ pageContext }) => {

    const { locale, parentPath, content, title, allPagePath, listaApplicazioni, listaCategorie
    } = pageContext
    const dataProdottoTranslated = findItemTranslated(content.translations, locale)
    const categoriaProdotto = content.categoria && findItemTranslated(content.categoria.translations, locale)
    const seoFilterLocale = content.seo?.translations.find((item) => item.language_code.code === locale)

    /* function softwareContent(productSoftwareData, lang) {
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

     const softwareData = softwareContent(content.product_software, locale) */
    const [showModale, setShowModale] = useState(false)
    const [isCatalogoVisible, setIsCatalogoVisible] = useState(false)
    const [isVideoVisible, setIsVideoVisible] = useState(false)
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
                {content.catalogo?.filename_disk && <Modale show={showModale} close={() => setShowModale(false)}>
                    <div className="titoloModale">
                        {!isCatalogoVisible ? Termini[locale].downloadCatalogoText : Termini[locale].downloadCatalogoTextLink}
                    </div>
                    {!isCatalogoVisible && <FormDownloadCatalogo lang={locale} setIsCatalogoVisible={setIsCatalogoVisible} />}
                    <div className={`boxDownloadCatalogo ${isCatalogoVisible ? 'visible' : ''}`}><a target="_blank" rel="noreferrer noopener" href={`https://bacci-directus.monema.dev/assets/${content.catalogo.filename_disk}`}><GrDocumentPdf />&nbsp;Catalogo</a></div>
                </Modale>}
                {content.video && <Modale show={isVideoVisible} close={() => setIsVideoVisible(false)}>
                    <YoutubeEmbed embedId={content.video} />
                </Modale>}
                <div className="container prodotto">
                    <section className="container sezione-1 mainProdotto">
                        <div className="box-sx">
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.titolo }} />
                            <h2 dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.sottotitolo }} />
                            <p dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.paragrafo }} />
                            <nav>
                                <button className="button-sezione" onClick={() => setShowModale(true)} >download</button>
                                <button className="button-sezione" onClick={() => setIsVideoVisible(true)} >video</button>

                            </nav>
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
                                    <div className="heading">
                                        <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.titolo }} />
                                    </div>
                                    <p>{dataProdottoTranslated.paragrafo}</p>
                                </div>
                                <div className="box-dx">
                                    <GatsbyImage image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={item.immagine.description || dataProdottoTranslated.titolo} />
                                </div>

                            </section>

                        )

                    })}
                    {/*{softwareData ?
                        <section className="container sezione-3 center">
                            <h2 className="titolo">Software</h2>
                            <div className="box-immagine">
                                {softwareData.immagine && <GatsbyImage image={softwareData.immagine} alt={'product software'} />}
                            </div>
                            <p>{softwareData.sottotitolo}</p>
                            <div>
                                <Link className="button-sezione" to={softwareData.path}>{softwareData.titolo}</Link>
                            </div>
                        </section> : ''} */}
                    {content.type === "machinery" && <Correlati locale={locale} idProdotto={content.id} categoriaProdotto={categoriaProdotto.nome} limiteVisualizzazione={3} />}
                </div>
            </LayoutProdotto>
        </>

    )

}

export default Prodotto