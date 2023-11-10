import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import GridPagination from "../components/grid-pagination"
import Tassonomie from "../components/tassonomie"
import { Termini, langTag } from "../../data-translations"
import { findItemTranslated, findItemsTranslated } from "../utils"

export const query = graphql`
 {
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

  const tassonomie = Tassonomie('it_IT')
  const termini = Termini.it_IT

  const langFilterProdotto = data.directus.Prodotti.filter((itema) => {
    return itema.translations.some((item) => {

      return langTag[item.languages_code.code] === langTag[pageContext.locale]
    })
  })
  const listaApplicazioni = findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)
  console.log(listaCategorie, 'locale')
  // lista delle applicazioni da lista prodotto
  /* let listaApplicazioni = langFilterProdotto.map((item) => item.node.prodottiApplicazioni.nodes)
  listaApplicazioni = listaApplicazioni.reduce((a, b) => { return a.concat(b) })
  listaApplicazioni = listaApplicazioni.map((item) => { return item.name })
  listaApplicazioni = listaApplicazioni.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []); */

  // lista delle categorie da lista prodotto
  /* let listaCategorie = langFilterProdotto.map((item) => item.node.prodottiCategorie.nodes)
  listaCategorie = listaCategorie.reduce((a, b) => { return a.concat(b) })
 
  listaCategorie = listaCategorie.map((item) => { return item.name })
  listaCategorie = listaCategorie.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []); */

  // Mantenere il filtro quando si accede da link esterno

  React.useEffect(() => {

    if (location.state && location.state.categoria) {
      setFiltersCat([location.state.categoria])
    }

  }, [location.state])



  // variabili stato
  const [filtersCat, setFiltersCat] = React.useState(() => [])
  const [filtersApp, setFiltersApp] = React.useState(() => [])
  const [filtersSearch, setFiltersSearch] = React.useState()
  const [resultFilter, setResutlFilter] = React.useState()

  React.useEffect(() => {
    if (langFilterProdotto && pageContext.lang) {

      let filteredCat = langFilterProdotto.filter((prodotto) => {
        const categoriaLang = []
        const filterResultCat = categoriaLang.nome === filtersCat[0]
        return filtersCat.length > 0 && filterResultCat
      });
      setResutlFilter((prev) => langFilterProdotto)
    }

  }, [filtersCat])

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

      return filtersApp.length > 0 && itema.applicazioni.translations.some((item) => {
        return filtersApp.includes(item.label)
      })
    })
    console.log(langFilterProdotto, 'test')
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
  console.log(Categorie())
  const topArchivio = React.useRef()

  return (
    <>
      <Layout pageTitle={pageContext.title} locale={pageContext.locale}
        allPagePath={pageContext.allPagePath} >

        <div className="container prodotti" ref={topArchivio}>
          <div className="container col-sx">
            <h2>affina la ricerca</h2>
            <div className="filters search">
              <input onKeyUp={(e) => onChangeText(e)} type="text" placeholder={termini.tasto_ricerca} />
            </div>

            <form className="filters" onChange={(e) => onChangeCheckboxCategorie(e)} >
              <ul>
                <li>
                  <input type="radio" value={'reset'} name="categorie" />
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

            <form className="filters" onChange={(e) => onChangeCheckboxApplicazioni(e)}>
              <h3>Applicazioni</h3>
              <ul>

                {listaApplicazioni.map((item, index) => {
                  return (
                    <li>
                      <input type="checkbox" value={item.label} name="applicazioni" />
                      <label for="applicazioni">{item.label}</label>
                    </li>)

                })}
              </ul>
            </form>

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