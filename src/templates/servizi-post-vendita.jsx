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
        postvendita {
          sezionePostvendita1 {
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
          sezionePostvendita2 {
            paragrafo
            titolo
          }
 
          sezionePostvendita3 {
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
          sezionePostvendita4{
            titolo
            paragrafo
            titolo2
            paragrafo2
            titolo3
            paragrafo3
          }
          sezionePostvendita5 {
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
          sezionePostvendita6{
            titolo
            paragrafo
            titolo2
            paragrafo2
            titolo3
            paragrafo3
          }
          sezionePostvendita7 {
            titolo
            sottotitolo
            paragrafo
          }
        }
      }
    }
  }
  }`

const ServiziPost = ({ data, location, pageContext }) => {

  const dataFilter = data.allWpPage.edges[0].node

  return (
    <>
      <Layout
        pageTitle={dataFilter.title}
        locale={pageContext.lang}
        allPagePath={pageContext.allPagePath}
        pathName={location.pathname}
        translated={dataFilter.translated}
        seo={dataFilter.seo}
        dataMenu={pageContext.dataMenu}>
        <div className="container-fluid postvendita">
          <section className="container-fluid sezione-interne">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita1.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita1.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.postvendita.sezionePostvendita1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.postvendita.sezionePostvendita1.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita2.titolo }} />
              <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita2.paragrafo }} />
            </div>
          </section>
          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita3.titolo }} />
              <h3 dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita3.sottotitolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita3.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.postvendita.sezionePostvendita3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.postvendita.sezionePostvendita3.immagine.altText} />
            </div>
          </section>

          <section className="container repeater">
            <div className="box-repeater">
              <h3>{dataFilter.postvendita.sezionePostvendita4.titolo}</h3>
              <p>{dataFilter.postvendita.sezionePostvendita4.paragrafo}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.postvendita.sezionePostvendita4.titolo2}</h3>
              <p>{dataFilter.postvendita.sezionePostvendita4.paragrafo2}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.postvendita.sezionePostvendita4.titolo3}</h3>
              <p>{dataFilter.postvendita.sezionePostvendita4.paragrafo3}</p>
            </div>

          </section>
          <section className="container sezione-testo-sx">
            <div className="box-sx">
              <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita5.titolo }} />
              <h3 dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita5.sottotitolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita5.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.postvendita.sezionePostvendita5.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.postvendita.sezionePostvendita5.immagine.altText} />
            </div>
          </section>

          <section className="container repeater">
            <div className="box-repeater">
              <h3>{dataFilter.postvendita.sezionePostvendita6.titolo}</h3>
              <p>{dataFilter.postvendita.sezionePostvendita6.paragrafo}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.postvendita.sezionePostvendita6.titolo2}</h3>
              <p>{dataFilter.postvendita.sezionePostvendita6.paragrafo2}</p>
            </div>
            <div className="box-repeater">
              <h3>{dataFilter.postvendita.sezionePostvendita6.titolo3}</h3>
              <p>{dataFilter.postvendita.sezionePostvendita6.paragrafo3}</p>
            </div>

          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita7.titolo }} />
              <h2 className="titoletto" dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita7.sottotitolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.postvendita.sezionePostvendita7.paragrafo }} />
            </div>
          </section>

        </div>
      </Layout>
    </>
  )
}

export default ServiziPost
