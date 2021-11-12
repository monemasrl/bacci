import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"
import Tassonomie from "../components/tassonomie"
export const query = graphql`
{

  allWpPage(filter: {title: {eq: "Prodotti"}}) {
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
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 476
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]

                )
              }
            }
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

  }

`
const Prodotti = ({ data, location }) => {

  const langFilter = data.allWpPage.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })[0].node

  const langFilterProdotto = data.allWpProdotto.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })

  const tassonomie = Tassonomie('it_IT')
  // lista delle applicazioni da lista prodotto
  let listaApplicazioni = langFilterProdotto.map((item) => item.node.prodottiApplicazioni.nodes)
  listaApplicazioni = listaApplicazioni.reduce((a, b) => { return a.concat(b) })

  listaApplicazioni = listaApplicazioni.map((item) => { return item.name })
  listaApplicazioni = listaApplicazioni.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);

  // lista delle categorie da lista prodotto
  let listaCategorie = langFilterProdotto.map((item) => item.node.prodottiCategorie.nodes)
  listaCategorie = listaCategorie.reduce((a, b) => { return a.concat(b) })

  listaCategorie = listaCategorie.map((item) => { return item.name })
  listaCategorie = listaCategorie.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);


  React.useEffect(() => {
     
    if (location.state && location.state.categoria) {
      setFiltersCat([location.state.categoria])
    }

  }, [location.state && location.state.categoria])



  // variabili stato
  const [filtersCat, setFiltersCat] = React.useState(() => [])
  const [filtersApp, setFiltersApp] = React.useState([])
  const [toggleFilterCat, setToggleFilterCat] = React.useState(false)

  //setta il valore del campo nella variabile di stato
  const onChangeCheckboxCategorie = (evt) => {
    setToggleFilterCat(true)

    if (evt.target.value === 'reset') {
      setFiltersCat([])
    } else {
      setFiltersCat([evt.target.value])
    }

  }




  let fromMegaMenu = location.state && location.state.categoria


  const Categorie = () => {

    let filteredCat = langFilterProdotto.filter((prodotto) => {
      const filterResultCat = filtersCat.length === 0 ? prodotto.node.prodottiCategorie.nodes : prodotto.node.prodottiCategorie.nodes[0].name === filtersCat[0]
      return filterResultCat
    });


    return filteredCat
  }


  const topArchivio = React.useRef()

  return (
    <>
      <Layout pageTitle={langFilter.title} seo={langFilter.seo} locale={'it_IT'} translations={langFilter.translations} >

        <div className="container prodotti" ref={topArchivio}>
          <div className="container col-sx">
            <h2>affina la ricerca</h2>
            <form className="filters" onChange={(e) => onChangeCheckboxCategorie(e)} >
              <ul>
                <li>
                  <input type="radio" value={'reset'} name="categorie" />
                  <label for="categorie">all</label></li>
                {tassonomie.categorie.map((item) => {
                  return (
                    <li>
                      <input type="radio" value={item} name="categorie"
                        checked={item === filtersCat[0]} />
                      <label for="categorie">{item}</label>
                    </li>)


                })}
              </ul>
            </form>


          </div>
          <div className="container col-dx">

            {<GridPagination archivio={Categorie()} loading={false} topArchivio={topArchivio} />}

          </div>



        </div>
      </Layout>
    </>
  )

}

export default Prodotti





/*   
const onChangeCheckboxApplicazioni = (evt) => {
 setToggleFilterTag(true)
 setToggleFilterCat(false)
 
 // se il filtro è check crea l'array
 if (evt.target.checked) {
   setFiltersApp([...filtersApp, evt.target.value])
 } else {
 
   // se il filtro è uncheck togli il record dall'array
   const filterUnchecked = filtersApp.filter((item) => {
     return item !== evt.target.value
   })
 
   setFiltersApp([...filterUnchecked])
 }
 
} */



{/* 
<form className="filters" onChange={(e) => onChangeCheckboxApplicazioni(e)}>
  <ul>

    {listaApplicazioni.map((item, index) => {

      return (
        <li>
          <input type="checkbox" value={item} name="applicazioni" />
          <label for="applicazioni">{item}</label>

        </li>)

    })}
  </ul>
</form> */}


/*
const Applicazioni = () => {

  const filterProductApp = () => {
    const result = langFilterProdotto.filter((item) => {
      return item.node.prodottiApplicazioni.nodes.some((item) => {

        return filtersApp.includes(item.name)
      })
    })
    return result
  }


  return filterProductApp()

} */