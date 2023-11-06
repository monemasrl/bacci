import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout-filiali"


export const query = graphql`
  query($lang: String!, $postTitle: String!){
    allWpFiliale(filter: {
    title: {eq: $postTitle}
    locale: {locale: {eq: $lang}}
    }) {
    edges {
      node {
        locale {
          locale
        }
        title
        translations {
          locale
          post_title
        }
        filiali {
          sezioneFiliale1 {
            fieldGroupName
            paragrafo
            sottotitolo
            titolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1420
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneFiliale2 {
            paragrafo
            titolo
            fieldGroupName
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 728
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneFiliale3 {
            paragrafo
            titolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 728
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneFiliale4 {
            paragrafo
            titolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 728
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneFiliale5 {
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1420
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
        }
      }
    }
  }
}`

const BacciCina = ({ data, location, pageContext }) => {

  const dataFilter = data.allWpFiliale.edges[0].node

  return (
    <>
      <Layout pageTitle={dataFilter.title} locale={pageContext.lang} pathName={location.pathname} allPagePath={pageContext.allPagePath} >
        <div className="container-fluid filiale">
          <section className="container sezione-3">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.filiali.sezioneFiliale1.titolo }} />
              <p className="sottotitolo">{dataFilter.filiali.sezioneFiliale1.sottotitolo}</p>
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.filiali.sezioneFiliale1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.filiali.sezioneFiliale1.immagine.altText} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.filiali.sezioneFiliale1.paragrafo }} />

            </div>
          </section>
          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.filiali.sezioneFiliale2.titolo }} />
              <p>{dataFilter.filiali.sezioneFiliale2.paragrafo}</p>
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.filiali.sezioneFiliale2.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.filiali.sezioneFiliale2.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.filiali.sezioneFiliale3.titolo }} />
              <p>{dataFilter.filiali.sezioneFiliale3.paragrafo}</p>
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.filiali.sezioneFiliale3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.filiali.sezioneFiliale3.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.filiali.sezioneFiliale4.titolo }} />
              <p>{dataFilter.filiali.sezioneFiliale4.paragrafo}</p>
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.filiali.sezioneFiliale4.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.filiali.sezioneFiliale4.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-3">

            <div className="box-dx">
              <GatsbyImage image={dataFilter.filiali.sezioneFiliale5.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.filiali.sezioneFiliale5.immagine.altText} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.filiali.sezioneFiliale5.paragrafo }} />

            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export default BacciCina
