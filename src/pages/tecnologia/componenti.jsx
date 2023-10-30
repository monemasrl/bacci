import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout/layout"


export const query = graphql`
 {
  allWpPage(filter: {title: {eq: "Componenti"}}) {
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
        componenti {
          sezioneComponenti9 {
            paragrafo
            paragrafo2
            paragrafo3
            titolo
            titolo2
            titolo3
          }
          sezioneComponenti8 {
            paragrafo
            titolo
          }
          sezioneComponenti7 {
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
          sezioneComponenti6 {
            fieldGroupName
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
          sezioneComponenti5 {
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
          sezioneComponenti4 {
            paragrafo
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
          sezioneComponenti3 {
            paragrafo
            paragrafo2
            paragrafo3
            paragrafo4
            paragrafo5
            paragrafo6
            titolo
            titolo2
            titolo3
            titolo4
            titolo5
            titolo6
          }
          sezioneComponenti2 {
            sottotitolo
            titolo
          }
          sezioneComponenti1 {
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
        seo={dataFilter.seo}
      >

        <div className="container-fluid componenti">
          <section className="container-fluid sezione-interne">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti1.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti1.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.componenti.sezioneComponenti1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.componenti.sezioneComponenti1.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti2.titolo }} />
              <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti2.sottotitolo }} />
            </div>
          </section>
          <section className="container repeater">
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti3.titolo}</h3>
              <p>{dataFilter.componenti.sezioneComponenti3.paragrafo}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti3.titolo2}</h3>
              <p>{dataFilter.componenti.sezioneComponenti3.paragrafo2}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti3.titolo3}</h3>
              <p>{dataFilter.componenti.sezioneComponenti3.paragrafo3}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti3.titolo4}</h3>
              <p>{dataFilter.componenti.sezioneComponenti3.paragrafo4}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti3.titolo5}</h3>
              <p>{dataFilter.componenti.sezioneComponenti3.paragrafo5}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti3.titolo6}</h3>
              <p>{dataFilter.componenti.sezioneComponenti3.paragrafo6}</p>
            </div>
          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <GatsbyImage image={dataFilter.componenti.sezioneComponenti4.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.componenti.sezioneComponenti4.immagine.altText} />
              <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti4.paragrafo }} />
            </div>
          </section>
          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti5.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti5.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.componenti.sezioneComponenti5.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.componenti.sezioneComponenti5.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-testo-dx">
            <div className="box-sx">
              <GatsbyImage image={dataFilter.componenti.sezioneComponenti6.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.componenti.sezioneComponenti6.immagine.altText} />
            </div>
            <div className="box-dx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti6.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti6.paragrafo }} />
            </div>
          </section>
          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti7.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti7.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.componenti.sezioneComponenti7.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.componenti.sezioneComponenti7.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti8.titolo }} />
              <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.componenti.sezioneComponenti8.paragrafo }} />
            </div>
          </section>
          <section className="container repeater no-flag">
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti9.titolo}</h3>
              <p>{dataFilter.componenti.sezioneComponenti9.paragrafo}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti9.titolo2}</h3>
              <p>{dataFilter.componenti.sezioneComponenti9.paragrafo2}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.componenti.sezioneComponenti9.titolo3}</h3>
              <p>{dataFilter.componenti.sezioneComponenti9.paragrafo3}</p>
            </div>

          </section>
        </div>
      </Layout>
    </>
  )
}

export default Produzione
