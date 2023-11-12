import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"

import { Termini, langTag } from "../../data-translations"
import { findItemTranslated, findItemsTranslated } from "../utils"

export const query = graphql`
 query{
  directus{
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


  const termini = Termini.it_IT

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
  console.log(filtersApp, filtersCat, filtersSearch, 'filters')


  // Mantenere il filtro quando si accede da link esterno e resettarlo al cambio di pagina (unmount)

  React.useEffect(() => {

    if (location.state && (location.state.categoria || location.state.applicazione)) {
      location.state.categoria && setFiltersCat([location.state.categoria])
      location.state.applicazione && setFiltersApp([location.state.applicazione])
    } else {
      setFiltersCat([])
      setFiltersApp([])
    }
    return () => {
      setFiltersCat([])
      setFiltersApp([])
    }

  }, [location.state])



  console.log(location.state, 'location state')
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
    // filtra prodotti che hanno tra le  applicazioni i filtri selezionati dentro filtersApp

    const filtersResultApp = langFilterProdotto.filter((itema) => {

      return filtersApp.length > 0 && itema.applicazioni.some((itemb) => {

        return itemb.applicazioni_id.translations.some((itemc) => {

          return filtersApp.includes(itemc.label)
        })
      })
    })

    // filtra prodotti per categorie
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
      return campoRicerca

    }
    else if (filtersApp.length === 0 && filtersCat.length === 0) {
      return langFilterProdotto
    } else {
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


            {<GridPagination archivio={Categorie()} lang={pageContext.locale} loading={false} topArchivio={topArchivio} />}
          </div>



        </div>
      </Layout>
    </>
  )

}

export default Prodotti