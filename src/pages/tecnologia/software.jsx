import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout/layout"


export const query = graphql`
 {
  allWpPage(filter: {title: {eq: "Software"}}) {
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
        software {
          sezioneSoftware1 {
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
          sezioneSoftware2 {
            paragrafo
            titolo
  
          }
          sezioneSoftware3 {
            paragrafo
            titolo
            sottotitolo
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
          sezioneSoftware4 {
            paragrafo
            paragrafo2
            paragrafo3
            paragrafo4
            titolo
            titolo2
            titolo3
            titolo4
          }
          sezioneSoftware5 {
            paragrafo
            sottotitolo
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
      pathName={location.pathname}  
      seo={dataFilter.seo}
      >
        <div className="container-fluid software">
          <section className="container-fluid sezione-interne">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.software.sezioneSoftware1.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.software.sezioneSoftware1.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.software.sezioneSoftware1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.software.sezioneSoftware1.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-3 ">
          <div className="box-sx">
            <h2 dangerouslySetInnerHTML={{ __html: dataFilter.software.sezioneSoftware2.titolo }} />
            <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.software.sezioneSoftware2.paragrafo}} />
          </div>
        </section>
          <section className="container sezione-3 pitagora">
          <div className="box-sx">
            <h2 dangerouslySetInnerHTML={{ __html: dataFilter.software.sezioneSoftware3.titolo }} />
            <h3 dangerouslySetInnerHTML={{ __html: dataFilter.software.sezioneSoftware3.sottotitolo }} />
            <GatsbyImage image={dataFilter.software.sezioneSoftware3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.software.sezioneSoftware1.immagine.altText} />

            <p dangerouslySetInnerHTML={{ __html: dataFilter.software.sezioneSoftware3.paragrafo}} />
          </div>
        </section>
        <section className="container repeater">
            <div className="box-repeater">
                <h3>{dataFilter.software.sezioneSoftware4.titolo}</h3>
                <p>{dataFilter.software.sezioneSoftware4.paragrafo}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.software.sezioneSoftware4.titolo2}</h3>
                <p>{dataFilter.software.sezioneSoftware4.paragrafo2}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.software.sezioneSoftware4.titolo3}</h3>
                <p>{dataFilter.software.sezioneSoftware4.paragrafo3}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.software.sezioneSoftware4.titolo4}</h3>
                <p>{dataFilter.software.sezioneSoftware4.paragrafo4}</p>
            </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.software.sezioneSoftware5.titolo }} />
            <h3>{dataFilter.software.sezioneSoftware5.sottotitolo}</h3>
            <p>{dataFilter.software.sezioneSoftware5.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.software.sezioneSoftware5.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.software.sezioneSoftware5.immagine.altText} />
          </div>
        </section>
        </div>
      </Layout>
    </>
  )
}

export default Produzione
