import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"

import 'moment/locale/it'
import { FormCandidature } from "../components/form";
import { GatsbyImage } from "gatsby-plugin-image";



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
        seo{
      translations(filter: {languages_code: {code: {_eq: $locale}}}){
        languages_code{
          code
        }
        title
        meta_description
        keywords
      }
      og_image{  
        id
          imageFile{
            id
            publicURL
            childImageSharp{
          id
          gatsbyImageData(formats: [WEBP], quality: 70, placeholder: BLURRED, breakpoints: [ 440, 1200])
        }}
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
                            formats: [WEBP]
                            quality: 70
                            placeholder: BLURRED
                            breakpoints: [440, 1024, 1920]
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


    const content = data && data.directus.pages[0].translations[0]
    const featuredImage = data && data.directus.pages[0].featured_image && data.directus.pages[0].featured_image.imageFile && data.directus.pages[0].featured_image.imageFile.childImageSharp && data.directus.pages[0].featured_image.imageFile.childImageSharp.gatsbyImageData ? data.directus.pages[0].featured_image.imageFile.childImageSharp.gatsbyImageData : null
    const langFilterFiereSorted = data.directus.candidature.sort((a, b) => {
        return new Date(b.date_created) - new Date(a.date_created)
    })



    return (
        <>
            <Layout
                pageTitle={pageContext.title}
                locale={pageContext.locale}
                allPagePath={pageContext.allPagePath}
                listaApplicazioni={pageContext.listaApplicazioni}
                listaCategorie={pageContext.listaCategorie}
                seo={data.directus.pages[0]?.seo.translations[0]}
                seoImage={data.directus.pages[0]?.seo.og_image?.imageFile?.publicURL}
            >

                <div className="mainContent candidature">
                    {content && <>
                        <div className={`box-sx`} >
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: content.main_content_titolo && content.main_content_titolo }} />
                            <div dangerouslySetInnerHTML={{ __html: content.main_content && content.main_content }} />

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