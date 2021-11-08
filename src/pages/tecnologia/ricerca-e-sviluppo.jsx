import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout/layout"


export const query = graphql`
 {
  allWpPage(filter: {title: {eq: "Ricerca e sviluppo"}}) {
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
        ricerca {
          sezioneRicerca1 {
            paragrafo
            titolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1079
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneRicerca2 {
            sottotitolo
            titolo
 
          }
          sezioneRicerca3 {
            paragrafo
            titolo
            sottotitolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                  width: 793
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneRicerca4 {
            paragrafo
            titolo
            sottotitolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                  width: 793
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneRicerca5 {
            paragrafo
            titolo
            sottotitolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                  width: 793
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneRicerca6 {
            paragrafo
            titolo
            sottotitolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                  width: 793
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneRicerca7 {
            titolo
            sottotitolo
          }
        }
      }
    }
  }
}`

const Produzione = ({ data, location }) => {
  const langFilter = data.allWpPage.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })[0].node
  const dataFilter = langFilter

  return (
    <>
      <Layout 
      pageTitle={dataFilter.title} 
      locale={'it_IT'} 
      translations={dataFilter.translations} 
      pathName={location.pathname} 
      seo={dataFilter.seo} >
        <div className="container-fluid ricerca">
          <section className="container-fluid sezione-interne">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca1.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca1.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.ricerca.sezioneRicerca1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.ricerca.sezioneRicerca1.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca2.titolo }} />
              <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca2.sottotitolo }} />
            </div>
          </section>

          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca3.titolo }} />
              <h3 dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca3.sottotitolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca3.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.ricerca.sezioneRicerca3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.ricerca.sezioneRicerca3.immagine.altText} />
            </div>
          </section>

          <section className="container sezione-testo-dx">
            <div className="box-sx">
              <GatsbyImage image={dataFilter.ricerca.sezioneRicerca4.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.ricerca.sezioneRicerca4.immagine.altText} />
            </div>
            <div className="box-dx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca4.titolo }} />
              <h3 dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca4.sottotitolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca4.paragrafo }} />
            </div>
          </section>
          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca5.titolo }} />
              <h3 dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca5.sottotitolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca5.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.ricerca.sezioneRicerca5.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.ricerca.sezioneRicerca5.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-testo-dx">
            <div className="box-sx">
              <GatsbyImage image={dataFilter.ricerca.sezioneRicerca6.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.ricerca.sezioneRicerca6.immagine.altText} />
            </div>
            <div className="box-dx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca6.titolo }} />
              <h3 dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca6.sottotitolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca6.paragrafo }} />
            </div>
          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca7.titolo }} />
              <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca7.sottotitolo }} />
            </div>

            <div className="box-dx">
              <p dangerouslySetInnerHTML={{ __html: dataFilter.ricerca.sezioneRicerca2.paragrafo2 }} />
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export default Produzione
