import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import { Termini } from "../../data-translations";
import { findItemsTranslated } from "../utils"
import { Link } from "gatsby"
import { langTag } from "../../data-translations"
import 'moment/locale/it'

const moment = require('moment')


export const query = graphql`
  query ($locale: String!) {
    directus {
     pages(filter: {status: {_eq: "published"}, page_name: {_eq: "Careers"}, translations: {languages_code: {code: {_eq: $locale}}}}) {
            seo{
      translations(filter: {languages_code: {code: {_eq: $locale}}}){
        languages_code{
          code
        }
        title
        meta_description
        keywords
      }
      og_image{  
        id
          imageFile{
            id
            publicURL
            childImageSharp{
          id
          gatsbyImageData(formats: [WEBP], quality: 70, placeholder: BLURRED, breakpoints: [ 440, 1200])
        }}
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


  const topArchivio = React.useRef()

  const langFilterFiereSorted = data.directus.candidature.sort((a, b) => {
    return new Date(b.date_created) - new Date(a.date_created)
  })


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
        seo={data.directus.pages[0]?.seo.translations[0]}
        seoImage={data.directus.pages[0]?.seo?.og_image?.imageFile?.publicURL && data.directus.pages[0]?.seo?.og_image?.imageFile?.publicURL}
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
            } else {
              return null
            }
          }
          )}


        </section>
      </Layout>
    </>
  )

}

export default Candidature