import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"

import { Termini, langTag } from "../../data-translations"
import { findItemTranslated, findItemsTranslated } from "../utils"

export const query = graphql`
 query{
  directus{
    menus {
          name
          id
          items {
            translations {
              label
              slug
            }
            sub_items {
              translations {
                label
                slug
              }
            }
          }
        }
    prodotto_categorie_translations{
    languages_code{
      code
    }
    nome
  }
  applicazioni_translations{
      languages_code{
        code
      }
      label
    }
  
  Prodotti{
    id
    name
    date_created
    immagine{
      id
  imageFile{
    id
childImageSharp{
  gatsbyImageData
}
  }
      
    }
    featured
    translations{
      languages_code{
        code
      }
      slug
      titolo
      sottotitolo
      testo_antemprima
      paragrafo
      
    }
    applicazioni{
      
      applicazioni_id{
        id
       
        translations{
          languages_code{
            code
          }
          id
           label
        }
      }
      
    }
    categoria{
      id
      translations{
        languages_code{
            code
          }
        id
        nome
      }
    }
    sezioni_prodotto{
      immagine{
        id
        imageFile{
          id
          childImageSharp{
            gatsbyImageData
          }
        }
      }
      prodotto_id{
        id
      }
      translations{
        languages_code{
          code
        }
        titolo
        paragrafo
        
      }
      
    }
    
  }
}
  }`


const Prodotti = ({ data, location, pageContext }) => {


  function getAllPathPagine(translations) {

    const allPath = []
    translations.forEach(item => {
      const lang = item.languages_code.code
      const baseLang = langTag[lang] !== "it" ? "/" + langTag[lang] + "/" : "/"
      const path = baseLang + "/" + item.slug
      const pathObj = {
        path: path,
        locale: lang,
        title: item.titolo,
      }
      allPath.push(pathObj)
    })
    return allPath
  }
  console.log(data.directus.menus[0].items[2], 'menus')
  //console.log(getAllPathPagine(data.directus.menus[0]), 'menus')

  /**
   * Description placeholder
   * @date 12/11/2023 - 12:12:36
   * @var data - data from graphql query
   * @var location - location from gatsby
   * @var pageContext - pageContext from gatsby
   * @var langFilterProdotto - filter prodotti by language
   * @var listaApplicazioni - Lista applicazioni filtrata per lingua
   * @var listaCategorie - Lista applicazioni filtrata per lingua
   * --- state ---
   * @var filtersCat - state for categorie filter
   * @var filtersApp - state for applicazioni filter
   * @var filtersSearch - state for search filter
   * --- functions ---
   * @function onChangeText - set state for search filter
   * @function onChangeCheckboxCategorie - set state for categorie filter
   * @function onChangeCheckboxApplicazioni - set state for applicazioni filter
   * @function resultFromFilters - filter prodotti by categorie applicazioni and search
   * @type {*}
   */

  const termini = Termini[pageContext.locale]
  const langFilterProdotto = data.directus.Prodotti.filter((itema) => {
    return itema.translations.some((item) => {
      return langTag[item.languages_code.code] === langTag[pageContext.locale]
    })
  })
  const listaApplicazioni = findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
  // variabili stato
  const [filtersCat, setFiltersCat] = React.useState(() => [])
  const [filtersApp, setFiltersApp] = React.useState(() => [])
  const [filtersSearch, setFiltersSearch] = React.useState()


  // Mantenere il filtro quando si accede da link esterno e resettarlo al cambio di pagina (unmount)

  React.useEffect(() => {
    // se il filtro è passato da link esterno setta i filtri nello stato corrispondente.
    if (location.state && (location.state.categoria || location.state.applicazione)) {
      location.state.categoria && setFiltersCat([location.state.categoria])
      location.state.applicazione && setFiltersApp([location.state.applicazione])
    } else {
      setFiltersCat([])
      setFiltersApp([])
    }
    // all'unmount resetta i filtri
    return () => {
      setFiltersCat([])
      setFiltersApp([])
    }
  }, [location.state])


  // setta il valore del campo ricerca nello stato  
  const onChangeText = (evt) => {
    if (evt.target.value === '') {
      setFiltersSearch()
    } else {
      setFiltersSearch([evt.target.value])
    }
  }

  // setta il valore dei filtri della categoria nello stato filtersCat 
  const onChangeCheckboxCategorie = (evt) => {
    if (evt.target.value === 'reset') {
      // se il filtro è reset resetta l'array
      setFiltersCat([])
    } else {
      setFiltersCat([evt.target.value])
    }
  }

  // setta il valore dei filtri della applicazione nello stato filtersApp 
  const onChangeCheckboxApplicazioni = (evt) => {
    // se il filtro è check crea o aggiorna l'array 
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


  const resultFromFilters = () => {
    // Se ci sono filtri per applicazioni filtra i prodotti per applicazioni
    const filtersResultApp = langFilterProdotto.filter((itema) => {
      return filtersApp.length > 0 && itema.applicazioni.some((itemb) => {
        return itemb.applicazioni_id.translations.some((itemc) => {

          return filtersApp.includes(itemc.label)
        })
      })
    })

    // Se ci sono filtri per categorie filtra i prodotti per categorie
    let filteredCat = langFilterProdotto.filter((prodotto) => {
      const categoriaLang = findItemTranslated(prodotto.categoria.translations, pageContext.locale)
      const filterResultCat = categoriaLang.nome === filtersCat[0]
      return filtersCat.length > 0 && filterResultCat
    });

    // filtra prodotti per campo di ricerca
    let campoRicerca = langFilterProdotto.filter((prodotto) => {
      let filterResultSearch = prodotto.name.toLowerCase()
      filterResultSearch = filterResultSearch.includes(filtersSearch)
      return filterResultSearch && filterResultSearch
    })

    // se i filtri sono vuoti renderizza tutti i prodotti altrimenti concatena i due array
    // elimina gli elementi duplicati e ritorna l'array
    if (campoRicerca.length > 0) {
      // se il cammpo di ricerca ha un valore ritorna i prodotti filtrati
      return campoRicerca
    } else if (filtersApp.length === 0 && filtersCat.length === 0) {
      // se non ci sono filtri ritorna tutti i prodotti
      return langFilterProdotto
    } else {
      // concatena i due array di prodotti filtrati per categoria e applicazione e ritorna l'array

      let concatArray = filteredCat.concat(filtersResultApp)

      concatArray = concatArray.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.name === thing.name
        ))
      )
      return concatArray
    }
  }

  const topArchivio = React.useRef()

  return (
    <>
      <Layout
        pageTitle={pageContext.title}
        locale={pageContext.locale}
        allPagePath={pageContext.allPagePath}
        listaApplicazioni={listaApplicazioni}
        listaCategorie={listaCategorie}
      >

        <div className="container prodotti" ref={topArchivio}>
          <div className="container col-sx">
            <h2>affina la ricerca</h2>
            <div className="filters search">
              <input onKeyUp={(e) => onChangeText(e)} type="text" placeholder={termini.tasto_ricerca} />
            </div>

            <form className="filters" onChange={(e) => onChangeCheckboxCategorie(e)} >
              <ul>
                <li>
                  <input type="radio" checked={filtersCat.length === 0} value={'reset'} name="categorie" />
                  <label for="categorie">{termini.tutti_prodotti}</label></li>
                {listaCategorie.map((item) => {

                  return (
                    <li>
                      <input type="radio" value={item.nome} name="categorie"
                        checked={item.nome === filtersCat[0]} />
                      <label for="categorie">{item.nome}</label>
                    </li>)

                })}
              </ul>
            </form>
            <div className="filters">
              <h3>Applicazioni</h3>
              <button onClick={() => setFiltersApp([])}> Tutte le applicazioni</button>
              <form onChange={(e) => onChangeCheckboxApplicazioni(e)}>
                <ul>
                  {listaApplicazioni.map((item, index) => {
                    return (
                      <li>
                        <input type="checkbox" checked={filtersApp.includes(item.label)} value={item.label} id={item.label} name="applicazioni" />
                        <label htmlFor={item.label}>{item.label}</label>
                      </li>)
                  })}
                </ul>
              </form>
            </div>

          </div>
          <div className="container col-dx">


            {<GridPagination archivio={resultFromFilters()} lang={pageContext.locale} loading={false} topArchivio={topArchivio} />}
          </div>



        </div>
      </Layout>
    </>
  )

}

export default Prodotti