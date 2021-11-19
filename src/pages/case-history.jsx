import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { langTag, Termini } from "../../data-translations"
import Layout from "../components/layout/layout"
import LinkFade from "../components/TransitionLinks/LinkFade"

export const query = graphql`
{

    allWpPage(filter: {title: {eq: "case history"}}) {
        edges {
        node {
            title
            caseHistory {
              caseHistorySezione1 {
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
            locale {
            locale
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
        }
        }
    }


    allWpCaseHistory {
    edges {
      node {
        title
        caseHistorySingle {
          paragrafo
          sottotitolo
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
        locale {
          locale
          id
        }
        translations {
          href
          id
          locale
          post_title
        }
      }
    }
  }
}
`
const CaseHistory = ({ data, location }, props) => {
  const langFilter = data.allWpPage.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })[0].node

  const langFilterData = data.allWpCaseHistory.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })

  const datapage = langFilter

  return (
    <Layout
      pageTitle={datapage.title}
      locale={'it_IT'}
      translations={datapage.translations}

      seo={langFilter.seo}
    >
      <section className="container case-history">
        <section className="container sezione-4">
          <div className="box-sx">
            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: langFilter.caseHistory.caseHistorySezione1.titolo }} />
            <p>{langFilter.caseHistory.caseHistorySezione1.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={langFilter.caseHistory.caseHistorySezione1.immagine.localFile.childImageSharp.gatsbyImageData} alt={langFilter.caseHistory.caseHistorySezione1.immagine.altText} />
          </div>
        </section>

        {langFilterData.map((item) => {

          return (
            <section className="container sezione-3">
              <div className="box-sx">
                <h2 dangerouslySetInnerHTML={{ __html: item.node.title }} />
                <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: item.node.caseHistorySingle.sottotitolo }} />
                <GatsbyImage image={item.node.caseHistorySingle.immagine.localFile.childImageSharp.gatsbyImageData} alt={item.node.caseHistorySingle.immagine.altText} />
                <LinkFade stileClasse="button-sezione" className="button-sezione">{Termini['it_IT'].scopri}</LinkFade>
              </div>


            </section>
          )
        })}
      </section>

    </Layout>
  )




}
export default CaseHistory