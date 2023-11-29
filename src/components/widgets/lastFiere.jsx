import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Termini, langTag } from "../../../data-translations";
import './lastFiere.scss'
import { Link } from "gatsby";
import { findItemTranslated } from "../../utils";
const moment = require('moment')

const LastFiere = ({ locale, limiteVisualizzazione }) => {
  const data = useStaticQuery(graphql`
      {
          directus{
  
            Fiere{
            name
            from
            to
            location
            link_fiera
            title_translations{
                languages_code{
                  code
                }  title
                slug
              }
            translations{
              languages_code{
                code
              }

              sottotitolo
              description
              call2action
              body
              
            }
          }
        }
      }
    `)

  const langFilterFiereSorted = data.directus.Fiere.sort((a, b) => {
    return new Date(b.date_created) - new Date(a.date_created)
  })
  console.log(langFilterFiereSorted, 'langFilterFiereSorted')
  return (
    <>
      {langFilterFiereSorted && <section className="container widget-fiere">
        <h2>{Termini[locale].eventi}</h2>
        <div className="widget-fiere-wrapper">
          {langFilterFiereSorted.map((item) => {

            const titleFiereTranslated = findItemTranslated(item.title_translations, locale)
            const dataFrom = new Date(Date.parse(item.from))
            const dataTo = new Date(Date.parse(item.to))
            if (titleFiereTranslated) {
              return (
                <div key={titleFiereTranslated.title} className="box-single-fiera">
                  <Link to={`/${langTag[locale] === "it" ? '' : langTag[locale] + "/"}${Termini[locale].fiere.toLowerCase()}/${titleFiereTranslated.slug}`}><h2>{titleFiereTranslated.title}</h2>   </Link>
                  <div className="datafiera">
                    <span>{moment(dataFrom).locale(locale).format('DD')}</span> - &nbsp;
                    <span>{moment(dataTo).locale(locale).format('DD MMMM YYYY')}</span>
                  </div>
                  <div className="luogo">
                    {item.location}
                  </div>
                  <a href={item.link_fiera} className="link" targe="_blank" rel="nofollow" >{item.link_fiera}</a>
                </div>
              )
            }
          })}
        </div>
      </section>}
    </>
  )
}

export default LastFiere
