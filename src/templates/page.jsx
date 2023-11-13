import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { Termini, langTag } from "../../data-translations"
import { findItemTranslated, findItemsTranslated } from "../utils"

export const query = graphql`
 query{
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
    pages {
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
          }
          ... on DirectusData_Blocchi{
            id
            Nome
            traduzioni{
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
          listaCategorie={listaCategorie}>
          <div className={`container-fluid ${pageContext.slug}`} >



          </div>
        </Layout> : 'Loading...'}
    </>
  )

}

export default Pagine