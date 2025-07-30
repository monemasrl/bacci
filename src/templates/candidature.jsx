import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { Termini } from "../../data-translations";
import { findItemsTranslated } from "../utils"
import { Link } from "gatsby"
import { langTag } from "../../data-translations"
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
      
      candidature(filter: {translations: {languages_code: {code: {_eq: $locale}}}, status: { _eq: "published" } }) {

        translations {
          languages_code {
            code
          }
          candidatura
          testo
        }
        titolo
        data
        date_created
      }
    }
  }
`


const Candidature = ({ data, pageContext }) => {

  const listaApplicazioni = data && findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = data && findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
  const topArchivio = React.useRef()

  const langFilterFiereSorted = data.directus.candidature.sort((a, b) => {
    return new Date(b.date_created) - new Date(a.date_created)
  })

  const seoFilterLocale = seoSettings.seo.translations.find((item) => { return item.languages_code.code = pageContext.locale })

  const linkToForm = {
    it_IT: '/careers/candidature',
    en_US: '/en/careers/job-applications'
  }

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
        <section className="container candidature" ref={topArchivio}>

          {langFilterFiereSorted?.length && langFilterFiereSorted.map((item, index) => {
            moment.locale(langTag[item.lang])
            const translated = findItemsTranslated(item.translations, pageContext.locale)

            if (translated[0].candidatura && translated[0].testo) {
              return (
                <div className="candidatura" key={index}>
                  <div className="data">  {moment(item.data).format('DD.MM.YYYY')}</div>
                  {item.data && <h2>{translated[0].candidatura && translated[0].candidatura}</h2>}
                  <div className="testo" dangerouslySetInnerHTML={{ __html: translated[0].testo && translated[0].testo }} />
                  <Link className="button-sezione" to={linkToForm[pageContext.locale]}>{Termini[pageContext.locale].buttonCandidatura}</Link>
                </div>
              )
            }
          }
          )}


        </section>
      </Layout>
    </>
  )

}

export default Candidature