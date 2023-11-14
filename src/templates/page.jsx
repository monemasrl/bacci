import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { Termini, langTag } from "../../data-translations"
import { findItemTranslated, findItemsTranslated } from "../utils"

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
      translations(filter: {languages_code: {code: {_eq: $locale}}}){
        languages_code{
          code}
        slug
      }
   
      blocchi {
        id
        collection
        item{
          ... on DirectusData_testo_immagine{
            id
            immagine{
              id
              imageFile{
                id
                childImageSharp{
                  gatsbyImageData
                }
              }
            }
            novita
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
        
        }
      }
    }
}
  }`


const Pagine = ({ data, location, pageContext }) => {
  console.log(data.directus.pages, 'data')
  console.log(pageContext, 'data')
  const listaApplicazioni = findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
  const termini = Termini[pageContext.locale]

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
          <div className={`container-fluid ${pageContext.slug}`} >



          </div>
        </Layout> : 'Loading...'}
    </>
  )

}

export default Pagine