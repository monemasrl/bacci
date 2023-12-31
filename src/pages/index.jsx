import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"
import Fade from 'react-reveal/Fade';
import LinkFade from "../components/TransitionLinks/LinkFade";
import LastNews from "../components/widgets/lastNews";
import LastFiere from "../components/widgets/lastFiere";
export const query = graphql`
   {
    allWpPage(filter: {title: {eq: "Home"}}) {
    edges {
      node {

        locale {
          locale
        }
        translations {
          locale
          post_title
        }
        title
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(
                    width: 1920
                    placeholder: NONE
                    layout: CONSTRAINED
                    formats: [AUTO, WEBP, AVIF]
                  )
              }
            }
          }
        }
        home {
          sezione1 {
            paragrafo
            titolo
            link {
              target
              title
              url
            }
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
          sezione2 {
            paragrafo
            titolo
            link {
              target
              title
              url
            }
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
          sezione3 {
            paragrafo
            titolo
            link {
              target
              title
              url
            }
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
          sezione4 {
            paragrafo
            titolo
            link {
              target
              title
              url
            }
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 893
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
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
      }
    }
  }
  }`



const IndexPage = ({ data, location }, props) => {
  const langFilter = data.allWpPage.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })[0].node
  const dataHome = langFilter



  return (
    <>

      <Layout pageTitle={dataHome.title} seo={dataHome.seo} locale={'it_IT'} translations={dataHome.translations} >
        <div className="container-fluid home">
          <section className="jumbo-home">
            <GatsbyImage image={dataHome.featuredImage.node.localFile.childImageSharp.gatsbyImageData} className="jumbo-image" alt="featured image" />
          </section>

          <section className={`container sezione-1 `}>
            <Fade left>
              <div className={`box-sx`} >
                <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataHome.home.sezione1.titolo }} />
                <p>{dataHome.home.sezione1.paragrafo}</p>

                <LinkFade stileClasse="button-sezione" url={dataHome.home.sezione1.link.url}>{dataHome.home.sezione1.link.title}</LinkFade>

              </div>
            </Fade>
            <div className="box-dx">
              <GatsbyImage image={dataHome.home.sezione1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataHome.home.sezione1.immagine.altText} />
            </div>
          </section>


          <section className={`container sezione-2 `}>
            <Fade left>
              <div className={`box-sx`} >
                <div className="novita">
                  Novità
                </div>
                <h2 dangerouslySetInnerHTML={{ __html: dataHome.home.sezione2.titolo }} />
                <p dangerouslySetInnerHTML={{ __html: dataHome.home.sezione2.paragrafo }} />

                <LinkFade stileClasse="button-sezione" url={dataHome.home.sezione2.link.url}>{dataHome.home.sezione2.link.title}
                </LinkFade>

              </div>
            </Fade>
            <div className="box-dx">
              <GatsbyImage image={dataHome.home.sezione2.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataHome.home.sezione1.immagine.altText} />

            </div>
          </section>

          <Fade bottom>
            <section className={`container sezione-3 `}>
              <div className={`box-sx `} >
                <h2 dangerouslySetInnerHTML={{ __html: dataHome.home.sezione3.titolo }} />
                <GatsbyImage image={dataHome.home.sezione3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataHome.home.sezione1.immagine.altText} />

              </div>

              <div className="box-dx">
                <p dangerouslySetInnerHTML={{ __html: dataHome.home.sezione3.paragrafo }} />

                <LinkFade stileClasse="button-sezione" className="button-sezione" url={dataHome.home.sezione3.link.url}>{dataHome.home.sezione3.link.title}</LinkFade>

              </div>
            </section>
          </Fade>
          <section className="container sezione-4">
            <Fade left>
              <div className={`box-sx `} >
                <h2 dangerouslySetInnerHTML={{ __html: dataHome.home.sezione4.titolo }} />
                <p>{dataHome.home.sezione4.paragrafo}</p>

                <LinkFade stileClasse="button-sezione" className="button-sezione" url={dataHome.home.sezione4.link.url}>{dataHome.home.sezione4.link.title}</LinkFade>

              </div>
            </Fade>
            <Fade right>
              <div className={`box-dx`}>
                <GatsbyImage image={dataHome.home.sezione4.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataHome.home.sezione4.immagine.altText} />
              </div>
            </Fade>
          </section>
          <LastFiere locale={dataHome.locale.locale} limiteVisualizzazione={3}/>
          <LastNews locale={dataHome.locale.locale} limiteVisualizzazione={3}/>
        </div>
      </Layout>
    </>
  )
}

export default IndexPage
