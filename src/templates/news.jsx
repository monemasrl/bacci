import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { langTag } from "../../data-translations"
import Layout from "../components/layout/layout"


export const query = graphql`
query($lang: String!, $postTitle: String!){
    allWpPage(filter: {
    title: {eq: $postTitle}
    locale: {locale: {eq: $lang}}
    }) {
        edges {
        node {
            title
       
            locale {
            locale
            }
            translated{
                    pathPagine{
                      path
                    }
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


    allWpPost(filter:{locale:{locale:{eq: $lang}}}) {
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
const News = ({ data, location, pageContext }) => {

  const langFilterData = data.allWpPost.edges

  const datapage = data.allWpPage.edges[0].node

  return (
    <Layout
      pageTitle={datapage.title}
      locale={pageContext.lang}
      allPagePath={pageContext.allPagePath}
      translated={datapage.translated}
      pathName={location.pathname}
      dataMenu={pageContext.dataMenu}
      news
      seo={datapage.seo}
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
                <Link to={`${langTag[item.node.locale.locale] === "it" ? '' : langTag[item.node.locale.locale]}/news/${item.node.slug}`}>leggi tutto</Link>
              </div>

            </div>)
        })}
      </section>

    </Layout>
  )




}
export default News