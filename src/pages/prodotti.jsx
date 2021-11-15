import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"
import Tassonomie from "../components/tassonomie"
import { Termini } from "../../data-translations"
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
  const termini = Termini.it_IT
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
  const [filtersApp, setFiltersApp] = React.useState(() => [])
  const [filtersSearch, setFiltersSearch] = React.useState()

  // setta il valore del campo ricerca nello stato  
  const onChangeText = (evt) => {
    if (evt.target.value === '') {
      setFiltersSearch()
    } else {
      setFiltersSearch([evt.target.value])
    }
  }


  // setta il valore dei filtri nello stato
  const onChangeCheckboxCategorie = (evt) => {

    if (evt.target.value === 'reset') {
      setFiltersCat([])
    } else {
      setFiltersCat([evt.target.value])
    }

  }

  const onChangeCheckboxApplicazioni = (evt) => {

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

  }



  const Categorie = () => {
    // filtra prodotti per tag applicazioni
    const filtersResultApp = langFilterProdotto.filter((item) => {
      return filtersApp.length > 0 && item.node.prodottiApplicazioni.nodes.some((item) => {
        return filtersApp.includes(item.name)
      })
    })
    // filtra prodotti per categorie
    let filteredCat = langFilterProdotto.filter((prodotto) => {
      const filterResultCat = prodotto.node.prodottiCategorie.nodes[0].name === filtersCat[0]
      return filtersCat.length > 0 && filterResultCat
    });
    // filtra prodotti per campo di ricerca

    let campoRicerca = langFilterProdotto.filter((prodotto) => {
      let filterResultSearch = prodotto.node.title.toLowerCase()
      filterResultSearch = filterResultSearch.includes(filtersSearch)
      return filterResultSearch && filterResultSearch
    })


    // se i filtri sono vuoti renderizza tutti i prodotti altrimenti concatena i due array
    // elimina gli elementi duplicati e ritorna l'array
    if (campoRicerca.length > 0) {
      return campoRicerca

    }
    else if (filtersApp.length === 0 && filtersCat.length === 0) {
      return langFilterProdotto
    } else {
      let concatArray = filteredCat.concat(filtersResultApp)

      concatArray = concatArray.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.node.title === thing.node.title
        ))
      )

      return concatArray
    }
  }



  const topArchivio = React.useRef()

  return (
    <>
      <Layout pageTitle={langFilter.title} seo={langFilter.seo} locale={'it_IT'} translations={langFilter.translations} >

        <div className="container prodotti" ref={topArchivio}>
          <div className="container col-sx">
            <h2>affina la ricerca</h2>
            <div className="filters search">
              <input onKeyUp={(e) => onChangeText(e)} type="text" placeholder={termini.tasto_ricerca}/>
            </div>

            <form  className="filters" onChange={(e) => onChangeCheckboxCategorie(e)} >
              <ul>
                <li>
                  <input type="radio" value={'reset'} name="categorie" />
                  <label for="categorie">{termini.tutti_prodotti}</label></li>
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
            <form className="filters" onChange={(e) => onChangeCheckboxApplicazioni(e)}>
              <h3>Applicazioni</h3>
              <ul>

                {listaApplicazioni.map((item, index) => {
                  return (
                    <li>
                      <input type="checkbox" value={item} name="applicazioni" />
                      <label for="applicazioni">{item}</label>
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