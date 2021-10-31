import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout"


export const query = graphql`
 {
  allWpPage(filter: {title: {eq: "Servizi Pre vendita"}}) {
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
        prevendita {
          sezionePrevendita1 {
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
          sezionePrevendita2 {
            sottotitolo
            titolo
          }
          sezionePrevendita3 {
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
          sezionePrevendita4 {
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
          sezionePrevendita5 {
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
      <Layout pageTitle={dataFilter.title} locale={'it_IT'} translations={dataFilter.translations} pathName={location.pathname}  >
        <div className="container-fluid prevendita">
          <section className="container-fluid sezione-interne">
            <div className="box-sx">
              <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita1.titolo }} />
              <p dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita1.paragrafo }} />
            </div>
            <div className="box-dx">
              <GatsbyImage image={dataFilter.prevendita.sezionePrevendita1.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.prevendita.sezionePrevendita1.immagine.altText} />
            </div>
          </section>
          <section className="container sezione-3">
            <div className="box-sx">
              <h2 dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita2.titolo }} />
              <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita2.sottotitolo }} />
            </div>
          </section>
          <section className="container repeater">
            <div className="box-repeater">
                <h3>{dataFilter.prevendita.sezionePrevendita3.titolo}</h3>
                <p>{dataFilter.prevendita.sezionePrevendita3.paragrafo}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.prevendita.sezionePrevendita3.titolo2}</h3>
                <p>{dataFilter.prevendita.sezionePrevendita3.paragrafo2}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.prevendita.sezionePrevendita3.titolo3}</h3>
                <p>{dataFilter.prevendita.sezionePrevendita3.paragrafo3}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.prevendita.sezionePrevendita3.titolo4}</h3>
                <p>{dataFilter.prevendita.sezionePrevendita3.paragrafo4}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.prevendita.sezionePrevendita3.titolo5}</h3>
                <p>{dataFilter.prevendita.sezionePrevendita3.paragrafo5}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.prevendita.sezionePrevendita3.titolo6}</h3>
                <p>{dataFilter.prevendita.sezionePrevendita3.paragrafo6}</p>
            </div>
        </section>
        <section className="container sezione-3">
            <div className="box-sx">
            <div className="pretitolo" dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita4.titolo }} />
            <h2 className="titolo-3" dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita4.sottotitolo }} />

            <GatsbyImage image={dataFilter.prevendita.sezionePrevendita4.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.prevendita.sezionePrevendita4.immagine.altText} />
              <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita4.paragrafo }} />
            </div>
          </section>
          <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita5.titolo }} />
            <h3 dangerouslySetInnerHTML={{ __html: dataFilter.prevendita.sezionePrevendita5.sottotitolo }} />
            <p dangerouslySetInnerHTML={{__html:dataFilter.prevendita.sezionePrevendita5.paragrafo}} />
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.prevendita.sezionePrevendita5.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.prevendita.sezionePrevendita5.immagine.altText} />
          </div>
        </section>
       
        </div>
      </Layout>
    </>
  )
}

export default Produzione
