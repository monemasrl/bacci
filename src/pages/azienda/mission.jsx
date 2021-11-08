import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout/layout"


export const query = graphql`
 {
  allWpPage(filter: {title: {eq: "Mission"}}) {
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
        mission {
          sezioneMission1 {
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
          sezioneMission2 {
            paragrafo
            sottotitolo
            titolo
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
          }
          sezioneMission3 {
            paragrafo
            titolo
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
          sezioneMission4 {
            paragrafo
            titolo
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
          sezioneMission5 {
            paragrafo
            titolo
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
      pathName = {location.pathname}  
      seo={dataFilter.seo}
      >
    <div className="container-fluid mission">
        <section className="container-fluid sezione-interne">
          <div className="box-sx">
            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission1.titolo }} />
            <p>{dataFilter.mission.sezioneMission1.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.mission.sezioneMission1.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.mission.sezioneMission1.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-3">
          <div className="box-sx">
            <h2 dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission2.titolo }} />
            <p className="sottotitolo">{dataFilter.mission.sezioneMission2.sottotitolo}</p>
            <GatsbyImage image={dataFilter.mission.sezioneMission2.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.mission.sezioneMission2.immagine.altText} />
            <p dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission2.paragrafo }} />

          </div>

          <div className="box-dx">
            <p dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission2.paragrafo2 }} />

          </div>
        </section>

        <section className="container sezione-testo-sx">
          <div className="box-sx">
                      <h2 className="titoli" dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission3.titolo }} />
            <p>{dataFilter.mission.sezioneMission3.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.mission.sezioneMission3.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.mission.sezioneMission3.immagine.altText} />
          </div>
        </section>

        <section className="container sezione-testo-dx">
          <div className="box-sx">
          <GatsbyImage image={dataFilter.mission.sezioneMission4.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.mission.sezioneMission4.immagine.altText} />
          </div>
          <div className="box-dx">
                    <h2 className="titoli" dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission4.titolo }} />
          <p>{dataFilter.mission.sezioneMission4.paragrafo}</p>
          </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
                      <h2 className="titoli" dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission5.titolo }} />
            <p>{dataFilter.mission.sezioneMission5.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.mission.sezioneMission5.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.mission.sezioneMission5.immagine.altText} />
          </div>
        </section>
        </div>
      </Layout>
    </>
  )
}

export default Produzione
