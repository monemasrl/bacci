import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"

export const query = graphql`
{
    allWpProdotto {
    edges {
      node {
        title
        locale {
              locale
            }
        prodotto {
          paragrafo
          sottotitolo
          immagine {
            id
          }
        }
        prodottiCategorie {
          nodes {
            name
          }
        }
        prodottiApplicazioni {
          nodes {
            name
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
  allWpProdottiCategoria {
    edges {
      node {
        name
      }
    }
  }
  }

`
const Prodotti = ({ data }) => {

    const langFilterProdotto = data.allWpProdotto.edges.filter((item) => {
        return (item.node.locale.locale === 'it_IT')
    })
const categoryFilter = (tassonomia) =>{

 return   langFilterProdotto.filter((item)=>{
        return (

            item.node.prodottiApplicazioni.nodes[0].name === tassonomia
          

            )
        })

}
console.log(categoryFilter('antine'));

    return (
        <>
          <div className="containter">
          {data.allWpProdottiCategoria.edges.map((item) => {
                return <h1>{item.node.name}</h1>
            })}
              </div>  
          <div className="containter">
          {langFilterProdotto.map((item) => {
                return <h1>{item.node.title} - {item.node.prodottiCategorie.nodes[0].name}</h1>
            })}
              </div>  
        </>
    )

}

export default Prodotti