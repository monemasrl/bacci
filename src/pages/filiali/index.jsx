import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout/layout"
const langTag = {
  en_US: "en",
  it_IT: "it",
}

export const query = graphql`
 {
  allWpPage(filter: {title: {eq: "Filiali"}}) {
    edges {
      node {
        locale {
          locale
        }
        title
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

const Produzione = ({ data, location }) => {
  const langFilter = data.allWpPage.edges.filter((item) => {

    return (item.node.locale.locale === 'it_IT')
  })[0].node



  const dataFilter = langFilter

  return (
    <>
      <Layout pageTitle={dataFilter.title} locale={'it_IT'} translations={dataFilter.translations} pathName={location.pathname}  >
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

export default Produzione
