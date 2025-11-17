import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"


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
          pages(
        filter: {
          status: { _eq: "published" }
          page_name: { _eq: "fiere" }
          translations: { languages_code: { code: { _eq: $locale } } }
        }
      ) {
        seo {
          translations(filter: { languages_code: { code: { _eq: $locale } } }) {
            languages_code {
              code
            }
            title
            meta_description
            keywords
          }
          og_image {
            id
            imageFile {
              id
              publicURL
              childImageSharp {
                id
                gatsbyImageData(
                  formats: [WEBP]
                  quality: 70
                  placeholder: BLURRED
                  breakpoints: [440, 1200]
                )
              }
            }
          }
        }
      }
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

  const topArchivio = React.useRef()
  const langFilterFiereSorted = [...data.directus.Fiere].sort((a, b) => new Date(b.from) - new Date(a.from))


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
        <section className="container fiere" ref={topArchivio}>
          {langFilterFiereSorted.length > 0 ? <GridPagination pagePath={pageContext.allPagePath} pageName="fiere" topArchivio={topArchivio} archivio={langFilterFiereSorted} lang={pageContext.locale} /> :
            <div>No data</div>}
        </section>
      </Layout>
    </>
  )

}

export default Fiere