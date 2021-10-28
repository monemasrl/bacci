import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout"


export const query = graphql`
 {
  allWpPage(filter: {title: {eq: "Produzione"}}) {
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
        paginaProduzione {
          sezioneProduzione1 {
            fieldGroupName
            paragrafo
            titolo
            immagine {
              altText
              id
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 1080
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
          }
          sezioneProduzione2 {
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
            paragrafo
            paragrafo2
            titolo
          }
          sezioneProduzione3 {
            paragrafo
            paragrafo2
            paragrafo3
            paragrafo4
            titolo
            titolo2
            titolo3
            titolo4
          }
          sezioneProduzione4 {
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
      <Layout pageTitle={dataFilter.title} locale={'it_IT'} translations={dataFilter.translations} pathName = {location.pathname}  >
       
        <section className="container-fluid sezione-interne">
          <div className="box-sx">
            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.paginaProduzione.sezioneProduzione1.titolo }} />
            <p>{dataFilter.paginaProduzione.sezioneProduzione1.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.paginaProduzione.sezioneProduzione1.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.paginaProduzione.sezioneProduzione1.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-3">
          <div className="box-sx">
            <h2 dangerouslySetInnerHTML={{ __html: dataFilter.paginaProduzione.sezioneProduzione2.titolo }} />
            <p dangerouslySetInnerHTML={{ __html: dataFilter.paginaProduzione.sezioneProduzione2.paragrafo }} />
            <GatsbyImage image={dataFilter.paginaProduzione.sezioneProduzione2.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.paginaProduzione.sezioneProduzione2.immagine.altText} />

          </div>

          <div className="box-dx">
            <p dangerouslySetInnerHTML={{ __html: dataFilter.paginaProduzione.sezioneProduzione2.paragrafo2 }} />

          </div>
        </section>

        <section className="container repeater">
          <div className="box-repeater">
            <h3>{dataFilter.paginaProduzione.sezioneProduzione3.titolo}</h3>
            <p>{dataFilter.paginaProduzione.sezioneProduzione3.paragrafo}</p>
          </div>
          <div className="box-repeater">
          <h3>{dataFilter.paginaProduzione.sezioneProduzione3.titolo2}</h3>
            <p>{dataFilter.paginaProduzione.sezioneProduzione3.paragrafo2}</p>
          </div>
          <div className="box-repeater">
          <h3>{dataFilter.paginaProduzione.sezioneProduzione3.titolo3}</h3>
            <p>{dataFilter.paginaProduzione.sezioneProduzione3.paragrafo3}</p>
          </div>
          <div className="box-repeater">
          <h3>{dataFilter.paginaProduzione.sezioneProduzione3.titolo4}</h3>
            <p>{dataFilter.paginaProduzione.sezioneProduzione3.paragrafo4}</p>
          </div>
        </section>

        <section className="container sezione-3">
          <div className="box-sx">
            <h2 dangerouslySetInnerHTML={{ __html: dataFilter.paginaProduzione.sezioneProduzione4.titolo }} />
            <GatsbyImage image={dataFilter.paginaProduzione.sezioneProduzione4.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.paginaProduzione.sezioneProduzione4.immagine.altText} />

          </div>

          <div className="box-dx">
            <p dangerouslySetInnerHTML={{ __html: dataFilter.paginaProduzione.sezioneProduzione4.paragrafo }} />



          </div>
        </section>
      </Layout>
    </>
  )
}

export default Produzione
