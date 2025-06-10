import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { Termini, langTag } from "../../../data-translations";
import './correlati.scss'
import { Link } from "gatsby";
import { findItemTranslated, summary } from "../../utils";

const Correlati = ({ categoriaProdotto, locale, limiteVisualizzazione, idProdotto, prodotti_correlati }) => {
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

  const prodottiCorrelatiCategoria = categoriaProdotto && data.directus.Prodotti.filter((item, index) => {


    if (item.id !== idProdotto && item.categoria != undefined) {

      return item.categoria.translations.some((categoria) => {

        if (categoria.languages_code.code === locale) {
          console.log(categoriaProdotto, 'prodotti correlati categoria')
          return categoria.nome === categoriaProdotto
        } else { return null }
      })
    } else { return null }
  })


  console.log(prodottiCorrelatiCategoria, 'prodotti correlati')
  function tipoCorrelazione() {
    if (prodotti_correlati?.length > 0) {
      return prodotti_correlati.map((item) => { return { ...item.related_Prodotti_id } })
    } else {
      return prodottiCorrelatiCategoria
    }
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

              if (prodottoTradotto && index < limiteVisualizzazione) {
                return (
                  <div className="col-3" key={prodottoTradotto.titolo}>
                    <div className="box-correlati">
                      {item.immagine.imageFile && <GatsbyImage className="immagine-widget" image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={prodottoTradotto.titolo} />}
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
