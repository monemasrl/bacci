import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Termini, langTag } from "../../../data-translations";
import './lastFiere.scss'
import { Link } from "gatsby";
import { findItemTranslated } from "../../utils";
const moment = require('moment')

const LastFiere = ({ locale, limiteVisualizzazione = 3 }) => {
  const data = useStaticQuery(graphql`
      {
          directus{
  
            Fiere{
            name
            from
            to
            location
            position
            link_fiera
            type
            page
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

  return (
    <>
      {langFilterFiereSorted && <section className="container widget-fiere">
        <h2>{Termini[locale].eventi}</h2>
        <div className="widget-fiere-wrapper">
          {langFilterFiereSorted.map((item, index) => {

            const titleFiereTranslated = findItemTranslated(item.title_translations, locale)
            const dataFrom = new Date(Date.parse(item.from))
            const dataTo = new Date(Date.parse(item.to))
            if (titleFiereTranslated && index < limiteVisualizzazione) {
              return (
                <div className={`box-single-fiera ${item.type === 'event' ? 'evento' : ''}`}>
                  <h2>{titleFiereTranslated.title}</h2>
                  <div className="datafiera">
                    <span>{moment(dataFrom).locale(locale).format('DD')}</span> - &nbsp;
                    <span>{moment(dataTo).locale(locale).format('DD MMMM YYYY')}</span>
                  </div>
                  <div className="position">{item.position}</div>
                  <div className="luogo">{item.location}</div>
                  <a className="link" href={`https://${item.link_fiera}`} target="_blank">{item.link_fiera}</a>
                  {item.page && <Link className="buttonLink" to={`${locale === "it_IT" ? "" : "/" + langTag[locale]}/${Termini[locale].fiere}/${titleFiereTranslated.slug}`}>&#62;</Link>}
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
