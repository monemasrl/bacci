import React from "react";
import Layout from "../components/layout/layout";
import { findItemTranslated, findItemsTranslated } from "../utils";
import { GatsbyImage } from "gatsby-plugin-image"
import BlocksComponent from "../components/blocks/blocks"
import { slugify } from "../utils";
import { Link } from 'gatsby'
import { Termini } from "../../data-translations";
import Correlati from "../components/widgets/correlati";
const moment = require('moment')

const TemplateCaseHistory = ({ pageContext }) => {

    const { locale, parentPath, content, title, allPagePath, listaApplicazioni, listaCategorie } = pageContext
    const dataTranslated = content && findItemTranslated(content.translations, locale)
    const seoFilterLocale = content.seo?.translations.find((item) => item.language_code.code === locale)
    console.log(content, 'dataTranslated')
    return (
        <>
            {content && <Layout
                locale={locale}
                pageTitle={title}
                pathName={parentPath}
                tipo='caseHistory'
                allPagePath={allPagePath}
                pathFromContext={pageContext}
                listaApplicazioni={listaApplicazioni}
                listaCategorie={listaCategorie}
                seo={seoFilterLocale}
            >

                <section id={`${slugify(content.case_name).toLowerCase()}`} className={`container-fluid sezione-3`}>
                    {dataTranslated && <>
                        <div className={`box-sx `} >
                            <h2 dangerouslySetInnerHTML={{ __html: dataTranslated.title }} />
                            {dataTranslated.sottotitolo && <h3 dangerouslySetInnerHTML={{ __html: dataTranslated.sottotitolo }} />}
                        </div>
                        <div className="box-immagine">
                            {content.featured_image && <GatsbyImage image={content.featured_image.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />}
                        </div>
                        <div className="box-dx">
                            <h3 dangerouslySetInnerHTML={{ __html: dataTranslated.main_content_titolo }} />
                            <p dangerouslySetInnerHTML={{ __html: dataTranslated.main_content }} />
                            {dataTranslated.url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}
                        </div>
                    </>}
                </section>
                <section className={`container sezione-1 customer`}>
                    <div className="box-sx">
                        <ul>
                            {content.customer && <li className="customer">
                                <div className="titolo">{Termini[locale].cliente}</div>
                                {content.customer}
                            </li>}
                            {content.country && <li className="nazione">
                                <div className="titolo">{Termini[locale].nazione}</div>
                                {content.country}
                            </li>}
                            {content.city && <li className="citta">
                                <div className="titolo">{Termini[locale].citta}</div>
                                {content.city}
                            </li>}
                            {content.website && <li className="website">
                                <div className="titolo">Website</div>
                                {content.website}
                            </li>}
                            {content.related_machines && <li className="macchine">
                                <div className="titolo">Bacci Machines</div>
                            </li>}
                            {content.share && <li className="share">
                                <div className="titolo">Share</div>
                            </li>}
                        </ul>
                    </div>
                    <div className="box-dx">
                        <GatsbyImage image={content.secondary_image.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                    </div>

                </section>
                <section className={`container-fluid ${pageContext.pageName}`}>
                    {content.blocchi?.map((blocco, index) => {

                        return BlocksComponent(blocco.collection, index, blocco.item.allineamento, blocco, pageContext.pageName)
                    })}
                </section>
                <Correlati locale={locale} idProdotto={content.id} listaProdottiNoQuery={content.related_machines} limiteVisualizzazione={3} />
            </Layout>}
        </>

    )

}

export default TemplateCaseHistory