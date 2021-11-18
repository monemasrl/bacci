import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout/layout"
import LinkFade from "../../components/TransitionLinks/LinkFade"
import { langTag } from "../../../data-translations"

export const query = graphql`
{

    allWpPage(filter: {title: {eq: "Fiere"}}) {
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
`

const indexFiere = ({ data }) => {

    const langFilter = data.allWpPage.edges.filter((item) => {
        return (item.node.locale.locale === 'it_IT')
    })[0].node


    const langFilterFiera = data.allWpFiera.edges.filter((item) => {
        return (item.node.locale.locale === 'it_IT')
    })

console.log(langFilterFiera);

    return (
        <>

            <Layout
                pageTitle={langFilter.title}
                locale={'it_IT'}
                translations={langFilter.translations}
                seo={langFilter.seo}
            >
                <section className="container fiere">
                    {langFilterFiera.map((item) => {
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


                </section>
            </Layout>

        </>
    )
}
export default indexFiere