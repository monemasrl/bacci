import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"


export const query = graphql`
  query($locale: String!) {
    directus {
      pages(
        filter: {
          status: { _eq: "published" }
          page_name: { _eq: "news" }
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

      posts(
        filter: {
          translations: { languages_code: { code: { _eq: $locale } } }
          status: { _eq: "published" }
        }
      ) {
        id
        date_created
        translations {
          languages_code {
            code
          }
          title
          slug
          summary
        }
        image {
          id
          description
          imageFile {
            id
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`


const News = ({ data, pageContext }) => {

  const topArchivio = React.useRef()
  const langFilterProdottoSorted = data.directus.posts.sort((a, b) => {
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
        seoImage={data.directus.pages[0]?.seo?.og_image?.imageFile?.publicURL && data.directus.pages[0]?.seo?.og_image?.imageFile?.publicURL}
      >
        <section className="container news" ref={topArchivio}>
          {langFilterProdottoSorted.length > 0 ? (
            <GridPagination pagePath={'/news'} pageName="news" topArchivio={topArchivio} archivio={langFilterProdottoSorted} lang={pageContext.locale} />
          ) : (
            <p>No news </p>
          )}
        </section>
      </Layout>
    </>
  )

}

export default News