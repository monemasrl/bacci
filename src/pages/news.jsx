import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { langTag } from "../../data-translations"
import Layout from "../components/layout/layout"


export const query = graphql`
{

    allWpPage(filter: {title: {eq: "News"}}) {
        edges {
        node {
                title
            locale {
            locale
            }
            translations {
            locale
            post_title
            }
        }
        }
    }


    allWpPost {
        edges {
          node {
            content
            title
            slug
            date
            excerpt
            locale {
              locale
            }

            featuredImage {
              node {
                localFile {
                  childImageSharp {
                      gatsbyImageData(
                        width: 487
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
`
const News = ({ data, location }) => {
    const langFilter = data.allWpPage.edges.filter((item) => {
        return (item.node.locale.locale === 'it_IT')
    })[0].node

    const langFilterData = data.allWpPost.edges.filter((item) => {
        return (item.node.locale.locale === 'it_IT')
    })

    const datapage = langFilter
    console.log(datapage.translations);
    return (
        <Layout
            pageTitle={datapage.title}
            locale={'it_IT'}
            translations={datapage.translations}
            news
        >
            <section className="container news">
                {langFilterData.map((item) => {
                    console.log(item)
                    return (<div className="col-news">
                        <div className="box-single-news">
                            <GatsbyImage image={item.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={item.node.featuredImage.node.altText} />
                            <div className="date">
                            {item.node.date}
                            </div>
                            <h2>{item.node.title}</h2>
                            <p dangerouslySetInnerHTML={{__html:item.node.excerpt}} />
                            <Link to={`${langTag[item.node.locale.locale]=== "it" ? '' : langTag[item.node.locale.locale]}/news/${item.node.slug}`}>leggi tutto</Link>
                        </div>

                    </div>)
                })}
            </section>

        </Layout>
    )




}
export default News