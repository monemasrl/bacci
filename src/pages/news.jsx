import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { langTag } from "../../data-translations"
import Layout from "../components/layout/layout"
import LinkFade from "../components/TransitionLinks/LinkFade"

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
            seo {
            canonical
            cornerstone
            focuskw
            fullHead
            metaDesc
            metaKeywords
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphAuthor
            opengraphDescription
            opengraphImage {
              sourceUrl
            }
            title
            twitterDescription
            twitterTitle
            opengraphModifiedTime
            opengraphPublishedTime
            opengraphPublisher
            opengraphSiteName
            opengraphTitle
            opengraphType
            opengraphUrl
            readingTime
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
            date(formatString: "DD.MM.YYYY")
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
const News = ({ data, location }, props) => {
  const langFilter = data.allWpPage.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })[0].node

  const langFilterData = data.allWpPost.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })

  const datapage = langFilter

  return (
    <Layout
      pageTitle={datapage.title}
      locale={'it_IT'}
      translations={datapage.translations}
      news
      seo={langFilter.seo}
    >
      <section className="container news">
        {langFilterData.map((item) => {
         
          return (
          <div className="col-3">
            <div className="box-single-news">
              <GatsbyImage image={item.node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={item.node.featuredImage.node.altText} />
              <div className="date">
                {item.node.date}
              </div>
              <h2>{item.node.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: item.node.excerpt }} />
              <LinkFade url={`${langTag[item.node.locale.locale] === "it" ? '' : langTag[item.node.locale.locale]}/news/${item.node.slug}`}>leggi tutto</LinkFade>
            </div>

          </div>)
        })}
      </section>

    </Layout>
  )




}
export default News