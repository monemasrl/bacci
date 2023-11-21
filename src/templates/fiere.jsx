import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"
import { findItemsTranslated } from "../utils"

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
    Fiere{
    name
    from
    to
    location
    link_fiera
    translations{
      languages_code{
        code
      }
      slug
      title

      sottotitolo
      description
      call2action
      body
      
    }
  }
}
  }`


const Fiere = ({ data, pageContext }) => {
  const listaApplicazioni = data && findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = data && findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
  const topArchivio = React.useRef()
  const langFilterFiereSorted = data.directus.Fiere.sort((a, b) => {
    return new Date(b.date_created) - new Date(a.date_created)
  })
  return (
    <>
      <Layout
        pageTitle={pageContext.title}
        locale={pageContext.locale}
        allPagePath={pageContext.allPagePath}
        listaApplicazioni={listaApplicazioni}
        listaCategorie={listaCategorie}
      >
        <section className="container fiere" ref={topArchivio}>
          <GridPagination pagePath={pageContext.allPagePath} pageName="fiere" topArchivio={topArchivio} archivio={langFilterFiereSorted} lang={pageContext.locale} />
        </section>
      </Layout>
    </>
  )

}

export default Fiere