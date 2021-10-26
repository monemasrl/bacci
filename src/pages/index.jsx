import * as React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-plugin-image'
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

export const query = graphql`
   {
    allWpPage(filter: {title: {eq: "Home"}}) {
    edges {
      node {
        locale {
          locale
        }
        translations {
          locale
          post_title
        }
        featuredImage {
          node {
            localFile {
              childImageSharp {
                gatsbyImageData(
                    width: 1920
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
              }
            }
          }
        }
        home {
          sezione1 {
            paragrafo
            titolo
            link {
              target
              title
              url
            }
            immagine {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 800
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  }
  }`

const IndexPage = ({ data }) => {
  const langFilter = data.allWpPage.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })[0].node
  const dataHome = langFilter
  console.log(dataHome.home);
  return (
    <>
      <Layout locale={'it_IT'} translations={dataHome.translations} >
        <Seo title="Home" />
        <section className="jumbo-home">
          <GatsbyImage image={dataHome.featuredImage.node.localFile.childImageSharp.gatsbyImageData} className="jumbo-image" alt="featured image" />
        </section>
        <section className="container sezione-1">
          <div className="home-sx">
            <h1 dangerouslySetInnerHTML={{__html: dataHome.home.sezione1.titolo}} />
            <p>{dataHome.home.sezione1.paragrafo}</p>
            <div className="button-sezione">
              <Link to="#">Mission</Link>
            </div>
          </div>
          <div className="home-dx">
            <GatsbyImage image={dataHome.home.sezione1.immagine.localFile.childImageSharp.gatsbyImageData} width='400' alt={dataHome.home.sezione1.immagine.altText} />
          </div>
        </section>

      </Layout>
    </>
  )
}

export default IndexPage
