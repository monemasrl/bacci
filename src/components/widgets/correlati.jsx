import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { Termini, langTag } from "../../../data-translations";
import './correlati.scss'
import { Link } from "gatsby";
import { findItemTranslated } from "../../utils";

const Correlati = ({ categoriaProdotto, locale, limiteVisualizzazione, idProdotto }) => {
  const data = useStaticQuery(graphql`
 query {
       directus {
        Prodotti{
          id
            immagine{
              id
          imageFile{
            id
        childImageSharp{
          gatsbyImageData
          }
          }
            }
            translations{
              languages_code{
                code
              }
              slug
              titolo
              sottotitolo
              testo_antemprima
              paragrafo
              
            }
     
            categoria{
              id
              translations{
                languages_code{
                    code
                  }
                id
                nome
              }
            }
          }
       }
     }
   `)

  const prodottiCorrelatiCategoria = data.directus.Prodotti.filter((item) => {
    if (item.id !== idProdotto) {
      return item.categoria.translations.some((categoria) => {
        if (categoria.languages_code.code === locale) {
          return categoria.nome === categoriaProdotto
        }
      })
    }
  })

  return (
    <>
      {prodottiCorrelatiCategoria.length &&
        <section className=" widget-correlati">
          <h2>{Termini[locale].correlati}</h2>
          <div className="container">
            {prodottiCorrelatiCategoria.map((item) => {
              const prodottoTradotto = findItemTranslated(item.translations, locale)
              return (
                <div className="col-3">
                  <div className="box-correlati">
                    <GatsbyImage className="immagine-widget" image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={prodottoTradotto.titolo} />
                    <h2>{prodottoTradotto.titolo}</h2>
                    <p dangerouslySetInnerHTML={{ __html: prodottoTradotto.testoAnteprima }} />
                    <Link to={`${(locale === 'it_IT') ? '/' : langTag[locale]}${Termini[locale].prodotti}/${prodottoTradotto.slug}`} className="button-sezione">scopri</Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>}
    </>
  )
}

export default Correlati
