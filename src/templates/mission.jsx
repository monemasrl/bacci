import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"


export const query = graphql`
 query($lang: String!){
    allWpPage(filter: {
    title: {eq: "Mission"}
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
          href
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
                    width: 1000
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
                    width: 1420
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
                  width: 728
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
                  width: 728
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
                  width: 728
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

const Mission = ({ data, location, pageContext }) => {

  const dataFilter = data.allWpPage.edges[0].node

  return (
    <>
      <Layout
        pageTitle={dataFilter.title}
        locale={pageContext.lang}
        pathName={location.pathname}
        translated={dataFilter.translated}
        seo={dataFilter.seo}
        allPagePath={pageContext.allPagePath}
        dataMenu={pageContext.dataMenu}
      >
        <div className="container-fluid mission">
          <section className="container-fluid sezione-interne">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission1.titolo }} />
              <p>{dataFilter.mission.sezioneMission1.paragrafo}</p>
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.mission.sezioneMission1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.mission.sezioneMission1.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission2.titolo }} />
              <p className="sottotitolo">{dataFilter.mission.sezioneMission2.sottotitolo}</p>
              <GatsbyImage image={dataFilter.mission.sezioneMission2.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.mission.sezioneMission2.immagine.altText} />
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
              <GatsbyImage image={dataFilter.mission.sezioneMission3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.mission.sezioneMission3.immagine.altText} />
            </div>
          </section>

          <section className="container sezione-testo-dx">
            <div className="box-sx">
              <GatsbyImage image={dataFilter.mission.sezioneMission4.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.mission.sezioneMission4.immagine.altText} />
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
              <GatsbyImage image={dataFilter.mission.sezioneMission5.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.mission.sezioneMission5.immagine.altText} />
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export default Mission
