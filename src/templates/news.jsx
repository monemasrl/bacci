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
      title: 'News',
      meta_description: 'Le ultime dal mondo Bacci'
    }, {
      languages_code: {
        code: "en_US"
      },
      title: 'News',
      meta_description: 'Lastest news from Bacci world'
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
    posts(filter: {translations: {languages_code: {code: {_eq: $locale}}}}){
    id
    date_created
    translations{
      languages_code{
        code
      }
      
      title
    	slug
      summary
    }
    image{
      id
      description
      imageFile{
        id
        childImageSharp{
          gatsbyImageData
        }
      }
    }
  }
}
  }`


const News = ({ data, pageContext }) => {
  const listaApplicazioni = data && findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = data && findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
  const topArchivio = React.useRef()
  const langFilterProdottoSorted = data.directus.posts.sort((a, b) => {
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
        <section className="container news" ref={topArchivio}>
          {langFilterProdottoSorted &&
            <GridPagination pagePath={'/news'} pageName="news" topArchivio={topArchivio} archivio={langFilterProdottoSorted} lang={pageContext.locale} />}
        </section>
      </Layout>
    </>
  )

}

export default News