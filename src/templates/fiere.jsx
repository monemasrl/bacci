import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"
import { findItemsTranslated } from "../utils"

const seoSettings = {
  seo: {
    translations: [{
      languages_code: {
        code: "it_IT"
      },
      title: 'Fiere',
      meta_description: 'Fiere ed eventi'
    }, {
      languages_code: {
        code: "en_US"
      },
      title: 'Exhibitions',
      meta_description: 'Fair and events'
    },
    ]
  }
}

export const query = graphql`
  query($locale: String!) {
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
    Fiere(filter: {title_translations: {languages_code: {code: {_eq: $locale}}}, status: { _eq: "published" } }){
    name
    date_created
    from
    to
    location
    position
    link_fiera
    type
    page
    title_translations{
          languages_code{
            code
          }
          title
          slug
        }
    translations{
      languages_code{
        code
      }

      sottotitolo
      description
      call2action
      body
      
    }
  }
}
  }`


const Fiere = ({ data, pageContext }) => {
  const listaApplicazioni = data.directus.applicazioni_translations.length > 0 && findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = data.directus.prodotto_categorie_translations.length > 0 && findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
  const topArchivio = React.useRef()
  const langFilterFiereSorted = [...data.directus.Fiere].sort((a, b) => new Date(b.date_created) - new Date(a.date_created))

  const seoFilterLocale = seoSettings.seo.translations.find((item) => { return item.languages_code.code === pageContext.locale })
  console.log(data.directus.Fiere)
  return (
    <>
      <Layout
        pageTitle={pageContext.title}
        locale={pageContext.locale}
        allPagePath={pageContext.allPagePath}
        listaApplicazioni={pageContext.listaApplicazioni}
        listaCategorie={pageContext.listaCategorie}
        seo={seoFilterLocale}
      >
        <section className="container fiere" ref={topArchivio}>
          {langFilterFiereSorted.length > 0 ? <GridPagination pagePath={pageContext.allPagePath} pageName="fiere" topArchivio={topArchivio} archivio={langFilterFiereSorted} lang={pageContext.locale} /> :
            <div>No data</div>}
        </section>
      </Layout>
    </>
  )

}

export default Fiere