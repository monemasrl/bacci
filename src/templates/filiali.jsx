import * as React from "react"
import { Link, graphql } from "gatsby"
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
          href
        }
        filialeIndex {
          sezioneFilialeindex1 {
            paragrafo
            titolo
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 948
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneFilialeindex2 {
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
          sezioneFilialeindex3 {
            paragrafo
            titolo
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

  
        }
      }
    }
  }
}`

const Filiali = ({ data, location, pageContext }) => {

  const dataFilter = data.allWpPage.edges[0].node

  return (
    <>
      <Layout
        pageTitle={dataFilter.title}
        locale={pageContext.lang}
        allPagePath={pageContext.allPagePath}
        translated={dataFilter.translated}
        pathName={location.pathname}
        dataMenu={pageContext.dataMenu}
      >
        <div className="container-fluid filiali">
          <section className="container-fluid sezione-interne">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.filialeIndex.sezioneFilialeindex1.titolo }} />
              <p>{dataFilter.filialeIndex.sezioneFilialeindex1.paragrafo}</p>
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.filialeIndex.sezioneFilialeindex1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.filialeIndex.sezioneFilialeindex1.immagine.altText} />
            </div>
          </section>
          {/*         <section className="container sezione-3">
          <div className="box-sx">
         <Link to="america">   <h2 dangerouslySetInnerHTML={{ __html: dataFilter.filialeIndex.sezioneFilialeindex2.titolo }} /></Link>
            <p className="sottotitolo">{dataFilter.filialeIndex.sezioneFilialeindex2.sottotitolo}</p>
            <GatsbyImage image={dataFilter.filialeIndex.sezioneFilialeindex2.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.filialeIndex.sezioneFilialeindex2.immagine.altText} />
            <p dangerouslySetInnerHTML={{ __html: dataFilter.filialeIndex.sezioneFilialeindex2.paragrafo }} />

          </div>

          <div className="box-dx">
            <p dangerouslySetInnerHTML={{ __html: dataFilter.filialeIndex.sezioneFilialeindex2.paragrafo2 }} />

          </div>
        </section> */}
          <section className="container sezione-3">
            <div className="box-sx">
              <Link to="bacci-china">
                <h2 dangerouslySetInnerHTML={{ __html: dataFilter.filialeIndex.sezioneFilialeindex3.titolo }} />
              </Link>
              <p className="sottotitolo">{dataFilter.filialeIndex.sezioneFilialeindex3.sottotitolo}</p>
              <GatsbyImage image={dataFilter.filialeIndex.sezioneFilialeindex3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.filialeIndex.sezioneFilialeindex3.immagine.altText} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.filialeIndex.sezioneFilialeindex3.paragrafo }} />

            </div>

            <div className="box-dx">
              <p dangerouslySetInnerHTML={{ __html: dataFilter.filialeIndex.sezioneFilialeindex2.paragrafo2 }} />

            </div>
          </section>


        </div>
      </Layout>
    </>
  )
}

export default Filiali
