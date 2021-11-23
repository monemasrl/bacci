import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { Termini, langTag } from "../../../data-translations";
import './lastFiere.scss'
import LinkFade from "../TransitionLinks/LinkFade";

const LastFiere = ({ locale, limiteVisualizzazione }) => {
    const data = useStaticQuery(graphql`
    {
          allWpFiera {
            edges {
            node {
                fiere {
                dataDa
                dataA
                luogo
                link
                }
                title
                slug
                locale {
              locale
            }
            }
            }
      }
    }
  `)

    let langFilterProdotto = data.allWpFiera.edges.filter((item) => {
        return (item.node.locale.locale === 'it_IT')
    })
    langFilterProdotto = langFilterProdotto.slice(0, limiteVisualizzazione)

    return (
        <>
            <section className="container widget-fiere">
                <h2>{Termini[locale].eventi}</h2>
                <div className="widget-fiere-wrapper">
                {langFilterProdotto.map((item) => {
                     const slug=`${langTag[item.node.locale.locale] === "it" ? '' : langTag[item.node.locale.locale]}/fiere/${item.node.slug}`
                        return (
                            <div className="box-single-fiera">
                             <LinkFade  url={slug}><h2>{item.node.title}</h2>   </LinkFade>  
                              <div className="data">
                                {item.node.fiere.dataDa.slice(0,2)}-
                                {item.node.fiere.dataA}
                              </div>  
                               <div className="luogo">
                               {item.node.fiere.luogo}
                               </div> 
                                <a href={item.node.fiere.link} className="link" targe="_blank" rel="nofollow" >{item.node.fiere.link.slice(8)}</a>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default LastFiere
