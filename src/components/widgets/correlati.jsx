import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { Termini, langTag } from "../../../data-translations";
import './correlati.scss'
import { Link } from "gatsby";

const Correlati = ({ applicazioni, locale, limiteVisualizzazione }) => {
  const data = useStaticQuery(graphql`
    {
      allWpProdotto {
        edges {
          node {
            prodotto {
              testoAnteprima
              immagine {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(width: 350, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                  }
                }
              }
            }
            prodottiApplicazioni {
                    nodes {
                        name
                    }
                }
            title
            slug
            translations {
              href
              id
              locale
              post_title
            }
            locale {
              id
              locale
            }
          }
        }
      }
    }
  `)

  const langFilterProdotto = data.allWpProdotto.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })

  // lista delle applicazioni da lista prodotto
  let listaApplicazioni = applicazioni.nodes.map((item) => item.name)

  const filtersResultApp = langFilterProdotto.filter((item) => {
    return listaApplicazioni.length > 0 && item.node.prodottiApplicazioni.nodes.some((item) => {
      return listaApplicazioni.includes(item.name)
    })
  })

  return (
    <>
      <section className=" widget-correlati">
        <h2>{Termini[locale].correlati}</h2>
        <div className="container">
          {filtersResultApp.map((item) => {

            return (
              <div className="col-3">
                <div className="box-correlati">
                  <GatsbyImage className="immagine-widget" image={item.node.prodotto.immagine.localFile.childImageSharp.gatsbyImageData} alt={item.node.prodotto.immagine.altText} />
                  <h2>{item.node.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: item.node.prodotto.testoAnteprima }} />
                  <Link to={`${(locale === 'it_IT') ? '/' : langTag[locale]}${Termini[locale].prodotti}/${item.node.slug}`} stileClasse="button-sezione">scopri</Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Correlati
