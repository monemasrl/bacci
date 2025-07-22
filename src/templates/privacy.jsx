import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"

import 'moment/locale/it'

const moment = require('moment')

const seoSettings = {
  seo: {
    translations: [{
      languages_code: {
        code: "it_IT"
      },
      title: 'Posizioni aperte',
      meta_description: 'Posizioni aperte e candidature'
    }, {
      languages_code: {
        code: "en_US"
      },
      title: 'Open positions',
      meta_description: 'Open positions and applications'

    },
    ]
  }
}

export const query = graphql`
  query ($locale: String!) {
     directus {
    pages(filter: {page_name: {_eq: "Privacy"}}) {
      id
      translations(
        filter: {languages_code: {code: {_eq: $locale}}}
      ) {
        languages_code {
          code
        }
        slug
        main_content
        main_content_titolo
        main_content_sottotitolo
      }
      seo {
        translations(filter: {languages_code: {code: {_eq: $locale}}}) {
          languages_code {
            code
          }
          title
          meta_description
          keywords
        }
      }
    }
  }
  }
`


const Privacy = ({ data, pageContext }) => {


  const seoFilterLocale = seoSettings.seo.translations.find((item) => { return item.languages_code.code = pageContext.locale })
  console.log(pageContext.allPagePath, "allPagePath  ")

  return (
    <>
      <Layout
        pageTitle={pageContext.title}
        locale={pageContext.locale}
        allPagePath={pageContext.allPagePath}
        listaApplicazioni={pageContext.listaApplicazioni}
        listaCategorie={pageContext.listaCategorie}
        parentPath={pageContext.parentPath}
        seo={seoFilterLocale}
      >
        <div className={`mainContent`}>
          <section className="wrapperPrivacy" dangerouslySetInnerHTML={{ __html: data.directus.pages[0].translations[0].main_content }} />
        </div>

      </Layout>
    </>
  )

}

export default Privacy