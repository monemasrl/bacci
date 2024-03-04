import React from "react";
import Layout from "../components/layout/layout";
import { findItemTranslated } from "../utils";
import { GatsbyImage } from "gatsby-plugin-image"
import BlocksComponent from "../components/blocks/blocks"
import { slugify } from "../utils";
import { Link } from 'gatsby'
import { Termini } from "../../data-translations";
import Correlati from "../components/widgets/correlati";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";



const TemplateCaseHistory = ({ pageContext }) => {

    const { locale, parentPath, content, title, allPagePath, listaApplicazioni, listaCategorie } = pageContext
    const dataTranslated = content && findItemTranslated(content.translations, locale)
    const seoFilterLocale = content.seo?.translations.find((item) => item.language_code.code === locale)
    const contentForBlocchiPagina = content.blocchi?.filter((blocco) => blocco.item.traduzioni.some((traduzione) => traduzione.languages_code?.code === locale))

    const urlWithoutProtocol = new URL(content.website).host;

    const iconSocial = {
        facebook: FaFacebook,
        instagram: FaInstagram,
        linkedin: FaLinkedin,
    }

    function socialShare(socials, icons) {
        const arraySocial = socials.map((social) => {

            switch (social.social) {
                case 'facebook': {
                    return <a href={social.link} target="_blank" rel="noreferrer noopener"><icons.facebook /></a>
                }
                case 'instagram': {
                    return <a href={social.link} target="_blank" rel="noreferrer noopener"><icons.instagram /></a>
                }
                case 'linkedin': {
                    return <a href={social.link} target="_blank" rel="noreferrer noopener"><icons.linkedin /></a>
                }
                default: {
                    return null
                }

            }
            return null

        })
        return arraySocial

    }

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

                <section id={`${slugify(content.case_name).toLowerCase()}`} className={`container-fluid sezione-3 main`}>
                    {dataTranslated && <>
                        <div className={`box-sx `} >
                            <h2 dangerouslySetInnerHTML={{ __html: dataTranslated.title }} />
                            {dataTranslated.sottotitolo && <h3 dangerouslySetInnerHTML={{ __html: dataTranslated.sottotitolo }} />}
                        </div>
                        <div className="box-immagine">
                            {content.featured_image && <GatsbyImage image={content.featured_image.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />}
                        </div>
                        <div className="box-dx">

                            {dataTranslated.main_content_titolo &&
                                <h3 dangerouslySetInnerHTML={{ __html: dataTranslated.main_content_titolo }} />}
                            {dataTranslated.main_content &&
                                <p dangerouslySetInnerHTML={{ __html: dataTranslated.main_content }} />}
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
                                <a href={content.website} target="_blank" rel="noreferrer noopener">{urlWithoutProtocol}</a>
                            </li>}
                            {(content.related_machines.length > 9) && <li className="macchine">
                                <div className="titolo">Bacci Machines</div>
                                <ul>
                                    {content.related_machines.map((item) => {
                                        const translated = findItemTranslated(item.Prodotti_id.translations, locale)
                                        if (translated) { return <li><Link to={`/${locale === 'it_IT' ? '' : locale + '/'}${Termini[locale].prodotti}/${translated.slug}`}>{translated.titolo}</Link></li> } else { return null }
                                    })}
                                </ul>
                            </li>}
                            {content.social_shares && <li className="share">
                                <div className="titolo">Share</div>
                                {socialShare(content.social_shares, iconSocial)}
                            </li>}
                        </ul>
                    </div>
                    <div className="box-dx">
                        <GatsbyImage image={content.secondary_image.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                    </div>

                </section>
                <section className={`container-fluid ${pageContext.pageName}`}>
                    {contentForBlocchiPagina?.map((blocco, index) => {

                        return BlocksComponent(blocco.collection, index, blocco.item.allineamento, blocco, pageContext.pageName)
                    })}
                </section>
                {(content.related_machines.length > 0) && <Correlati locale={locale} idProdotto={content.id} listaProdottiNoQuery={content.related_machines} limiteVisualizzazione={3} />}
            </Layout>}
        </>

    )

}

export default TemplateCaseHistory