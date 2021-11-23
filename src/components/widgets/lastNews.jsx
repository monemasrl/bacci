import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { Termini, langTag } from "../../../data-translations";
import './lastNews.scss'
import LinkFade from "../TransitionLinks/LinkFade";

const LastNews = ({ locale, limiteVisualizzazione }) => {
    const data = useStaticQuery(graphql`
    {
        allWpPost {
        edges {
          node {
            content
            title
            slug
            date(formatString: "DD.MM.YYYY")
            excerpt
            locale {
              locale
            }

            featuredImage {
              node {
                altText
                localFile {
                  childImageSharp {
                      gatsbyImageData(
                        width: 401
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]

                      )
                    }
                }
              }
            }
            translations {
              href
              id
              locale
              post_title
            }
          }
        }
      }
    }
  `)

    let langFilterProdotto = data.allWpPost.edges.filter((item) => {
        return (item.node.locale.locale === 'it_IT')
    })
    langFilterProdotto = langFilterProdotto.slice(0, limiteVisualizzazione)

    return (
        <>
            <section className="container widget-news">
                <h2>Bacci news</h2>
                <div className="container">
                    {langFilterProdotto.map((item) => {
                        console.log(item);
                        return (
                            <div className="col-3">
                                <div className="box-news">
                                    <GatsbyImage className="immagine-widget" image={item.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={item.node.featuredImage.node.altText} />
                                    <h3>{item.node.date}</h3>
                                    <LinkFade url={`${(locale === 'it_IT') ? '/' : langTag[locale]}news/${item.node.slug}`}>
                                        <h2>{item.node.title}</h2>
                                    </LinkFade>
                                    <p dangerouslySetInnerHTML={{ __html: item.node.excerpt }} />
                                    <LinkFade url={`${(locale === 'it_IT') ? '/' : langTag[locale]}news/${item.node.slug}`}><span class="leggi-tutto">Leggi tutto</span>
                                    </LinkFade>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default LastNews
