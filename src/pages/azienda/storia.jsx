import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout/layout"


export const query = graphql`
 {
  allWpPage(filter: {title: {eq: "Storia"}}) {
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
        storia {
          sezioneStoria1 {
            paragrafo
            titolo

            logoStoria{
              altText
               localFile {
                childImageSharp {
                  gatsbyImageData(
                  width: 479
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]

                  )
                }
              }
            }
            immagine{
              altText
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
          sezioneStoria2 {
            paragrafo
            titolo
            sottotitolo
            immagine{
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
          sezioneStoria3 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria4 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria5 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria6 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria7 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria8 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria9 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria10 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria11 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria12 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria13 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria14 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria15 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria16 {
            paragrafo
            titolo
            immagine{
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
          sezioneStoria17 {
            paragrafo
            titolo
            
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
        <div className="container-fluid storia">
        <section className="container-fluid sezione-interne">
          <div className="box-sx">
          <GatsbyImage image={dataFilter.storia.sezioneStoria1.logoStoria.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria1.logoStoria.altText} />
            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria1.titolo }} />
            <p>{dataFilter.storia.sezioneStoria1.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria1.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria1.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-3">
          <div className="box-sx">
            <h2 dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria2.titolo }} />
            <p className="sottotitolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria2.sottotitolo }} />
          
            <GatsbyImage image={dataFilter.storia.sezioneStoria2.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria2.immagine.altText} />
            <p dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria2.paragrafo }} />

          </div>

          <div className="box-dx">
            <p dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria2.paragrafo2 }} />

          </div>
        </section>

        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria3.titolo }} />
            <p>{dataFilter.storia.sezioneStoria3.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria3.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria3.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-no-immagine">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria4.titolo }} />
            <p>{dataFilter.storia.sezioneStoria4.paragrafo}</p>
          </div>
      
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria5.titolo }} />
            <p>{dataFilter.storia.sezioneStoria5.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria5.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria5.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria6.titolo }} />
            <p>{dataFilter.storia.sezioneStoria6.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria6.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria6.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria7.titolo }} />
            <p>{dataFilter.storia.sezioneStoria7.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria7.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria7.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria8.titolo }} />
            <p>{dataFilter.storia.sezioneStoria8.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria8.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria8.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria9.titolo }} />
            <p>{dataFilter.storia.sezioneStoria9.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria9.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria9.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria10.titolo }} />
            <p>{dataFilter.storia.sezioneStoria10.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria10.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria10.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-no-immagine">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria11.titolo }} />
            <p>{dataFilter.storia.sezioneStoria11.paragrafo}</p>
          </div>
      
        </section>
     
 
        <section className="container sezione-testo-no-immagine">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria12.titolo }} />
            <p>{dataFilter.storia.sezioneStoria12.paragrafo}</p>
          </div>
      
        </section>
     
 
        <section className="container sezione-testo-no-immagine">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria13.titolo }} />
            <p>{dataFilter.storia.sezioneStoria13.paragrafo}</p>
          </div>
      
        </section>
     
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria14.titolo }} />
            <p>{dataFilter.storia.sezioneStoria14.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria14.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria14.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria15.titolo }} />
            <p>{dataFilter.storia.sezioneStoria15.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria15.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria15.immagine.altText} />
          </div>
        </section>
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria16.titolo }} />
            <p>{dataFilter.storia.sezioneStoria16.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.storia.sezioneStoria16.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.storia.sezioneStoria16.immagine.altText} />
          </div>
        </section>

        <section className="container sezione-testo-no-immagine">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria17.titolo }} />
            <p>{dataFilter.storia.sezioneStoria17.paragrafo}</p>
          </div>
      
        </section>
        </div>
      </Layout>
    </>
  )
}

export default Produzione
