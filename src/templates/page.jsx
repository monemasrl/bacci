import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"
import { Termini } from "../../data-translations"
import { findItemsTranslated } from "../utils"
import BlocksComponent from "../components/blocks/blocks"
import LastNews from "../components/widgets/lastNews"
import TestoMainContent from "../components/blocks/testo_main_content"
import LastFiere from "../components/widgets/lastFiere"

export const query = graphql`
 query($locale: String!, $slug: String!) {

  directus{
    prodotto_categorie_translations(filter: {languages_code: {code: {_eq: $locale}}}){
    languages_code{
      code
    }
    nome
  }
  applicazioni_translations(filter: {languages_code: {code: {_eq: $locale}}}) {
      languages_code{
        code
      }
      label
    }
    pages(filter: {translations: {languages_code: {code: {_eq: $locale}}, slug: {_eq: $slug}}}) {
      __typename
      id
      featured_image{
      id
      imageFile{
        id
        childImageSharp{
          id
          gatsbyImageData(formats: [WEBP, AVIF], quality: 20, placeholder: BLURRED, breakpoints: [ 360, 460, 720, 1024, 1200, 1340, 1620, 1920])
        }
      }
    }
      translations(filter: {languages_code: {code: {_eq: $locale}}, slug: {_eq: $slug}}){
        languages_code{
          code}
        slug
        main_content
        main_content_titolo
        main_content_sottotitolo
      }
   
      blocchi {
        id
        collection
        item{
          ... on DirectusData_block_hero{
              name
              sort
              image{
                id
              imageFile{
                id
                childImageSharp{
                  gatsbyImageData
                }

              }
            }
              translations(filter: {languages_code: {code: {_eq: $locale}}}){
       
                headline
              }
            }
          ... on DirectusData_testo_immagine{
            nome
            novita
       
            allineamento
            id
            immagine{
              id
              imageFile{
                id
                childImageSharp{
                  gatsbyImageData(   

                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF])
                }
              }
            }
          
            nome
            traduzioni(filter: {languages_code: {code: {_eq: $locale}}}) {
              languages_code{
                code
              }
              titolo
              sotto_titolo
							paragrafo
              link_label
              url
            }
            
          }
          ... on DirectusData_Blocchi{
            traduzioni(filter: {languages_code: {code: {_eq: $locale}}}) {
              languages_code{
                code
              }
              blocchi
            }
          }
        }
      }
    }
}
  }`


const Pagine = ({ data, location, pageContext }) => {


  const listaApplicazioni = data && data.directus.applicazioni_translations
  const listaCategorie = data && data.directus.prodotto_categorie_translations
  const termini = Termini[pageContext.locale]
  console.log(listaApplicazioni, listaCategorie, 'data')

  return (
    <>
      {pageContext ?
        <Layout
          pageTitle={pageContext.title}
          locale={pageContext.locale}
          allPagePath={pageContext.allPagePath}
          listaApplicazioni={listaApplicazioni}
          listaCategorie={listaCategorie}
          parentPath={pageContext.parentPath}
        >

          {/* PAGINE INTERNE */}
          {data.directus.pages[0] &&
            <>
              {pageContext.pageName === "home" &&
                <section class="jumbo-home">
                  <GatsbyImage loading="eager" className="jumbo-image" image={data.directus.pages[0].featured_image.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                </section>}
              {pageContext.pageName !== "home" &&
                <TestoMainContent content={data.directus.pages[0].translations[0]} featuredImage={data.directus.pages[0].featured_image?.imageFile.childImageSharp.gatsbyImageData} />}

              <div className={`container-fluid ${pageContext.pageName}`}>
                {data.directus.pages[0].blocchi?.map((blocco, index) => {
                  console.log(blocco, 'blocco')
                  return BlocksComponent(blocco.collection, index, blocco.item.allineamento, blocco, pageContext.pageName)
                })}
              </div>
              {pageContext.pageName === "news" || pageContext.pageName === "home" &&
                <LastNews pageType={pageContext.pageName} locale={pageContext.locale} limiteVisualizzazione={3} />}
              {pageContext.pageName === "news" || pageContext.pageName === "home" &&
                <LastFiere pageType={pageContext.pageName} locale={pageContext.locale} limiteVisualizzazione={3} />}
            </>}
          {!data.directus.pages[0] &&
            <h1>Non ci sono dati!</h1>
          }
        </Layout> : 'Loading...'}
    </>
  )

}

export default Pagine