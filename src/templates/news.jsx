import { useState, useEffect } from "react"
import React from "react"
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

  const [newsFromREST, setNewsFromREST] = useState()


  useEffect(() => {
    // get data from GitHub api
    try {
      fetch(`https://bacci-bedrock.monema.dev/wp-json/wp/v2/posts?_embed&per_page=3&lang=${langTag[pageContext.lang]}`)
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {
          setNewsFromREST(resultData)
        }) // set data for the number of stars}
    } catch {
      console.log('errore')
    }
  }, [])

  useEffect(() => {



  }, [newsFromREST])


  console.log(newsFromREST, 'newsFromREST')
  return (
    <Layout
      pageTitle={datapage.title}
      locale={pageContext.lang}
      allPagePath={pageContext.allPagePath}
      pathName={location.pathname}
      news
      seo={datapage.seo}
    >
      <section className="container news">
        {newsFromREST ? newsFromREST.map((item) => {
          return (
            <div className="col-3">
              <div className="box-single-news">
                <img height={356} width={487} src={item.yoast_head_json.og_image[0].url} alt={`featured image for ${item.title.rendered}`} />
                <div className="date">
                  {item.title.date}
                </div>
                <h2>{item.title.rendered}</h2>
                <div dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
                <Link to={`${langTag[item.yoast_head_json.og_locale] === "it" ? '' : langTag[item.yoast_head_json.og_locale]}/news/${item.slug}`}>leggi tutto</Link>
              </div>

            </div>)
        }) : 'Loading...'}
      </section>

    </Layout>
  )




}
export default News