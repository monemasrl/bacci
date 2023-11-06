import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"

export const query = graphql`
 
  query($lang: String!, $postTitle: String!){
    allWpPage(filter: {
    title: {eq: $postTitle}
    locale: {locale: {eq: $lang}}
    }) {
    edges {
      node {
        locale {
          locale
        }
        title
        translated{
                    pathPagine{
                      path
                    }
                  }
        translations {
          locale
          post_title
        }
        seo {
              canonical
              cornerstone
              focuskw
              fullHead
              metaDesc
              metaKeywords
              metaRobotsNofollow
              metaRobotsNoindex
              opengraphAuthor
              opengraphDescription
              opengraphImage {
                sourceUrl
              }
              title
              twitterDescription
              twitterTitle
              opengraphModifiedTime
              opengraphPublishedTime
              opengraphPublisher
              opengraphSiteName
              opengraphTitle
              opengraphType
              opengraphUrl
              readingTime
            }
        gruppoBacci {
          sezioneGruppo1 {
            fieldGroupName
            paragrafo
            titolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1000
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneGruppo2 {
            paragrafo
            titolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1220
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneGruppo3 {
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1620
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
            immagine2 {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1620
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
            immagine3 {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1620
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
            immagine4 {
              altText

              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1620
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
            immagine5 {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1620
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
            paragrafo
            paragrafo2
            paragrafo3
            paragrafo4
            paragrafo5
            sottotitolo
            sottotitolo2
            sottotitolo3
            sottotitolo4
            sottotitolo5
            titolo
            titolo2
            titolo3
            titolo4
            titolo5
          }
        }
      }
    }
  }
}`

const GruppoBacci = ({ data, location, pageContext }) => {


  const dataFilter = data.allWpPage.edges[0].node
  return (
    <>
      <Layout
        pageTitle={dataFilter.title}
        locale={pageContext.lang}
        translated={dataFilter.translated}
        pathName={location.pathname}
        allPagePath={pageContext.allPagePath}
        seo={dataFilter.seo}
        dataMenu={pageContext.dataMenu}
      >
        <div className="container-fluid gruppo-bacci">
          <section className="container-fluid sezione-interne">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo1.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo1.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.gruppoBacci.sezioneGruppo1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.gruppoBacci.sezioneGruppo1.immagine.altText} />
            </div>
          </section>
          <section className="container planisfero">
            <h2>{dataFilter.gruppoBacci.sezioneGruppo2.titolo}</h2>
            <div className="box-planisfero">
              <GatsbyImage image={dataFilter.gruppoBacci.sezioneGruppo2.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.gruppoBacci.sezioneGruppo2.immagine.altText} />
              <div className="box-lista-gruppo" dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo2.paragrafo }} />
            </div>
          </section>
          <section id="macchine" className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.sottotitolo }} />
              <GatsbyImage image={dataFilter.gruppoBacci.sezioneGruppo3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.gruppoBacci.sezioneGruppo3.immagine.altText} />

            </div>

            <div className="box-dx">
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.paragrafo }} />

            </div>
          </section>

          <section id="meccanica" className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.titolo2 }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.sottotitolo2 }} />
              <GatsbyImage image={dataFilter.gruppoBacci.sezioneGruppo3.immagine2.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.gruppoBacci.sezioneGruppo3.immagine2.altText} />

            </div>

            <div className="box-dx">
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.paragrafo2 }} />

            </div>
          </section>

          <section id="automation" className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.titolo3 }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.sottotitolo3 }} />
              <GatsbyImage image={dataFilter.gruppoBacci.sezioneGruppo3.immagine3.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.gruppoBacci.sezioneGruppo3.immagine3.altText} />

            </div>

            <div className="box-dx">
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.paragrafo3 }} />

            </div>
          </section>
          <section id="america" className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.titolo4 }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.sottotitolo4 }} />
              <GatsbyImage image={dataFilter.gruppoBacci.sezioneGruppo3.immagine4.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.gruppoBacci.sezioneGruppo3.immagine4.altText} />

            </div>

            <div className="box-dx">
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.paragrafo4 }} />

            </div>
          </section>
          <section id="china" className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.titolo5 }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.sottotitolo5 }} />
              <GatsbyImage image={dataFilter.gruppoBacci.sezioneGruppo3.immagine5.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.gruppoBacci.sezioneGruppo3.immagine5.altText} />

            </div>

            <div className="box-dx">
              <p dangerouslySetInnerHTML={{ __html: dataFilter.gruppoBacci.sezioneGruppo3.paragrafo5 }} />

            </div>
          </section>

        </div>
      </Layout>
    </>
  )
}

export default GruppoBacci
