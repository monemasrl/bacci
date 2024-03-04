import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { Termini, langTag } from "../../../data-translations";
import './correlati.scss'
import { Link } from "gatsby";
import { findItemTranslated, summary } from "../../utils";

const Correlati = ({ categoriaProdotto, locale, limiteVisualizzazione, idProdotto, listaProdottiNoQuery }) => {
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


  function tipoCorrelazione() {
    if (categoriaProdotto) {
      const prodottiCorrelatiCategoria = categoriaProdotto && data.directus.Prodotti.filter((item, index) => {
        if (item.id !== idProdotto && item.categoria && index < limiteVisualizzazione) {
          return item.categoria.translations.some((categoria) => {
            if (categoria.languages_code.code === locale) {
              return categoria.nome === categoriaProdotto
            } else { return null }
          })
        } else { return null }
      })
      return prodottiCorrelatiCategoria
    } else if (listaProdottiNoQuery) {
      const datiNormalizzati = listaProdottiNoQuery.map((item, index) => {
        if (index < limiteVisualizzazione) { return ({ immagine: item.Prodotti_id.immagine, translations: item.Prodotti_id.translations }) } else { return null }
      })

      return datiNormalizzati
    }
  }



  return (
    <>
      {tipoCorrelazione() &&
        <section className=" widget-correlati">
          <h2>{Termini[locale].correlati}</h2>
          <div className="container">
            {tipoCorrelazione().map((item) => {

              const prodottoTradotto = findItemTranslated(item.translations, locale)

              if (prodottoTradotto) {
                return (
                  <div className="col-3">
                    <div className="box-correlati">
                      {item.immagine && <GatsbyImage className="immagine-widget" image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={prodottoTradotto.titolo} />}
                      {prodottoTradotto.titolo && <h2>{prodottoTradotto.titolo}</h2>}
                      {prodottoTradotto.testo_antemprima && <p dangerouslySetInnerHTML={{ __html: summary(prodottoTradotto.testo_antemprima, 120) }} />}
                      {prodottoTradotto.slug && <Link to={`/${(locale === 'it_IT') ? '' : langTag[locale] + '/'}${Termini[locale].prodotti}/${prodottoTradotto.slug}`} className="button-sezione">scopri</Link>}
                    </div>
                  </div>
                )
              } else { return null }
            })}
          </div>
        </section>}
    </>
  )
}

export default Correlati
