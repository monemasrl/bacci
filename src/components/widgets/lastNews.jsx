import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { langTag } from "../../../data-translations";
import { findItemTranslated } from "../../utils";
import { Termini } from "../../../data-translations";
import './lastNews.scss'
import { Link } from "gatsby";
const moment = require('moment')
const LastNews = ({ locale, limiteVisualizzazione, pageType }) => {
  const data = useStaticQuery(graphql`
    {
       directus{
         posts {
          id
          date_created
          translations {
            languages_code {
              code
            }
            title
            slug
            summary
            content
          }
          image {
            id
            imageFile {
              id
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
       }
    }
  `)

  const langFilterNews = data.directus.posts.filter((item) => {
    return item.translations.some((lang) => {
      return lang.languages_code.code === locale
    })
  })
  const langFilterProdottoSorted = langFilterNews.sort((a, b) => {
    return new Date(b.date_created) - new Date(a.date_created)
  })

  return (
    <>
      <section className="widget-news">
        {pageType !== "home" ? <h2>{Termini[locale].newsCorrelate}</h2> : <h2>{Termini[locale].ultime_news}</h2>}
        <div className="container">
          {langFilterProdottoSorted.map((item, index) => {
            const prodottoTradotto = findItemTranslated(item.translations, locale)
            let date = new Date(Date.parse(item.date_created))
            date = moment(date).locale(locale).format('DD MM YYYY')
            if (index < limiteVisualizzazione) {
              return (
                <div className="col-3">
                  <div className="box-news">
                    <GatsbyImage className="immagine-widget" image={item.image.imageFile.childImageSharp.gatsbyImageData} alt={prodottoTradotto.titolo} />
                    <div className="box-correlati">

                      <h3 className="date">{date}</h3>
                      <Link to={`${(locale === 'it_IT') ? '/' : langTag[locale]}${"news"}/${prodottoTradotto.slug}`} ><h2>{prodottoTradotto.title}</h2></Link>
                      <p dangerouslySetInnerHTML={{ __html: prodottoTradotto.summary }} />
                      <Link to={`${(locale === 'it_IT') ? '/' : langTag[locale]}${"news"}/${prodottoTradotto.slug}`} className="button-sezione">Leggi tutto</Link>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </section>
    </>
  )
}

export default LastNews
