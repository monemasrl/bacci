import React from "react"

import { GatsbyImage } from "gatsby-plugin-image";
import { Termini, langTag } from "../../../data-translations";
import './correlati.scss'
import { Link } from "gatsby";
import { findItemTranslated, summary } from "../../utils";

const Correlati = ({ categoriaProdotto, locale, limiteVisualizzazione = 100, idProdotto, prodotti_correlati }) => {
  /*   const data = useStaticQuery(graphql`
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
     `) */

  /*   const prodottiCorrelatiCategoria = categoriaProdotto && data.directus.Prodotti.filter((item, index) => {
  
      if (item.id !== idProdotto && item.categoria != undefined) {
  
        return item.categoria.translations.some((categoria) => {
  
          if (categoria.languages_code.code === locale) {
  
            return categoria.nome === categoriaProdotto
          } else { return null }
        })
      } else { return null }
    })
   */

  function tipoCorrelazione() {
    if (prodotti_correlati?.length > 0) {
      return prodotti_correlati.map((item) => { return { ...item.related_Prodotti_id } })
    }
    return []
  }

  //  const correlati = findItemTranslated(prodotti_correlati.Prodotti_id.translations, locale)

  return (
    <>
      {tipoCorrelazione() && tipoCorrelazione().length > 0 &&
        <section className=" widget-correlati">
          <h2>{Termini[locale].correlati}</h2>
          <div className="container">
            {tipoCorrelazione().map((item, index) => {

              const prodottoTradotto = findItemTranslated(item.translations, locale)

              if (prodottoTradotto?.titolo && index < limiteVisualizzazione) {
                return (
                  <div className="col-3" key={prodottoTradotto.titolo}>
                    <div className="box-correlati">
                      {item.immagine?.imageFile && <GatsbyImage imgStyle={{ objectFit: 'contain' }} className="immagine-widget" image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={item.immagine?.description || 'Bacci website image'} />}
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
