import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { findItemsTranslated } from "../utils"
import 'moment/locale/it'
import { FormCandidature } from "../components/form";
import { GatsbyImage } from "gatsby-plugin-image";
const moment = require('moment')

const seoSettings = {
    seo: {
        translations: [{
            languages_code: {
                code: "it_IT"
            },
            title: 'Posizioni aperte',
            meta_description: 'Posizioni aperte e candidature'
        }, {
            languages_code: {
                code: "en_US"
            },
            title: 'Open positions',
            meta_description: 'Open positions and applications'

        },
        ]
    }
}

export const query = graphql`
    query ($locale: String! ) {
        directus {
            prodotto_categorie_translations {
                languages_code {
                    code
                }
                nome
            }
            applicazioni_translations {
                languages_code {
                    code
                }
                label
            }
            candidature(
                filter: { translations: { languages_code: { code: { _eq: $locale } } } }
            ) {
                translations {
                    languages_code {
                        code
                    }
                    candidatura
                }
                titolo
                data
                date_created
            }
                pages(
            filter: {
                page_name: { _eq: "candidature" }
                translations: {
                    languages_code: { code: { _eq: $locale } }
                }
            }
        ) {
            __typename
            id
            seo {
                translations(
                    filter: { languages_code: { code: { _eq: $locale } } }
                ) {
                    languages_code {
                        code
                    }
                    title
                    meta_description
                    keywords
                }
            }
            featured_image {
                id
                description
                imageFile {
                    id
                    childImageSharp {
                        id
                        gatsbyImageData(
                            formats: [WEBP, AVIF]
                            quality: 70
                            placeholder: BLURRED
                            breakpoints: [360, 460,1024, 1200, 1920]
                        )
                    }
                }
            }
            translations(
                filter: {
                    languages_code: { code: { _eq: $locale } }
                  
                }
            ) {
                languages_code {
                    code
                }
                slug
                main_content
                main_content_titolo
                main_content_sottotitolo
            }
        }
        }

    }
`


const CandidatureForm = ({ data, pageContext }) => {

    const listaApplicazioni = data && findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
    const listaCategorie = data && findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
    const content = data && data.directus.pages[0].translations[0]
    const featuredImage = data && data.directus.pages[0].featured_image && data.directus.pages[0].featured_image.imageFile && data.directus.pages[0].featured_image.imageFile.childImageSharp && data.directus.pages[0].featured_image.imageFile.childImageSharp.gatsbyImageData ? data.directus.pages[0].featured_image.imageFile.childImageSharp.gatsbyImageData : null
    const langFilterFiereSorted = data.directus.candidature.sort((a, b) => {
        return new Date(b.date_created) - new Date(a.date_created)
    })
    const seoFilterLocale = seoSettings.seo.translations.find((item) => { return item.languages_code.code = pageContext.locale })


    return (
        <>
            <Layout
                pageTitle={pageContext.title}
                locale={pageContext.locale}
                allPagePath={pageContext.allPagePath}
                listaApplicazioni={listaApplicazioni}
                listaCategorie={listaCategorie}
                seo={seoFilterLocale}
            >

                <div className="mainContent candidature">
                    {content && <>
                        <div className={`box-sx`} >
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: content.main_content_titolo }} />
                            <div dangerouslySetInnerHTML={{ __html: content.main_content }} />

                            <FormCandidature lang={pageContext.locale} candidature={langFilterFiereSorted} />

                        </div>
                        {featuredImage && <div className="box-dx">
                            <GatsbyImage image={featuredImage} alt={content.main_content_titolo || 'Bacci website image'} />
                        </div>}</>}
                </div>


            </Layout>
        </>
    )

}

export default CandidatureForm