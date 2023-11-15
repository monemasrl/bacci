import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { Termini, langTag } from "../../data-translations"
import { findItemTranslated, findItemsTranslated } from "../utils"
import BlocksComponent from "../components/blocks/blocks"




export const query = graphql`
 query($locale: String!, $slug: String!) {
  directus{
    prodotto_categorie_translations{
    languages_code{
      code
    }
    nome
  }
  applicazioni_translations{
      languages_code{
        code
      }
      label
    }
    pages(filter: {translations: {languages_code: {code: {_eq: $locale}}, slug: {_eq: $slug}}}) {
      id
      translations(filter: {languages_code: {code: {_eq: $locale}}, slug: {_eq: $slug}}){
        languages_code{
          code}
        slug
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
            link{
              translations(filter: {languages_code: {code: {_eq: $locale}}}){
                slug
              }
            }
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


  const listaApplicazioni = data && findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = data && findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
  const termini = Termini[pageContext.locale]
  console.log(data, 'data')
  console.log(pageContext, 'context')

  return (
    <>
      {pageContext && data.directus.pages[0] ?
        <Layout
          pageTitle={pageContext.title}
          locale={pageContext.locale}
          allPagePath={pageContext.allPagePath}
          listaApplicazioni={listaApplicazioni}
          listaCategorie={listaCategorie}
          parentPath={pageContext.parentPath}
        >
          <div className={`container-fluid ${pageContext.pageName}`}>
            {data.directus.pages[0].blocchi?.map((blocco, index) => {
              return BlocksComponent(blocco.collection, index, blocco.item.allineamento, blocco, pageContext.pageName)
            })}
          </div>
        </Layout> : 'Loading...'}
    </>
  )

}

export default Pagine