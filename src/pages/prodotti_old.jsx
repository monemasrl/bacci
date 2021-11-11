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
  allWpProdottiApplicazione {
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

  // variabili stato
  const [filtersCat, setFiltersCat] = React.useState([])
  const [filtersApp, setFiltersApp] = React.useState([])
  const [toggleFilterTag, setToggleFilterTag] = React.useState(true)
  const [toggleFilterCat, setToggleFilterCat] = React.useState(true)

  //setta il valore del campo nella variabile di stato
  const onChangeCheckboxCategorie = (evt) => {
    setToggleFilterTag(()=>false)
    setToggleFilterCat(()=>true)

   toggleFilterCat === true ? setFiltersCat([evt.target.value]) : setFiltersCat([])
  }
  //setta il valore del campo nella variabile di stato
  const onChangeCheckboxApplicazioni = (evt) => {
    setToggleFilterTag(()=>true)
    setToggleFilterCat(()=>false)

    // se il filtro è check crea l'array
    if (evt.target.checked) {
       toggleFilterTag === true ? setFiltersApp([...filtersApp, evt.target.value]) : setFiltersApp([])
    } else {

      // se il filtro è uncheck togli il record dall'array
      const filterUnchecked = filtersApp.filter((item) => {
        return item !== evt.target.value
      })

       toggleFilterTag === true ? setFiltersApp([...filterUnchecked]) : setFiltersApp([])
    }

  }


  // filtra i prodotti per le categorie dentro la variabile di stato
  const filtered = () => {

    let filteredCat = langFilterProdotto.filter((prodotto) => {
      const filterResultCat = prodotto.node.prodottiCategorie.nodes[0].name === filtersCat[0]

      return filterResultCat
    });



    // filtra i prodotti per applicazioni dentro la variabile di stato

    const filterProductApp = () => {
      const result = langFilterProdotto.filter((item) => {
        return item.node.prodottiApplicazioni.nodes.some((item) => {

          return filtersApp.includes(item.name)
        })
      })
      return result
    }





    return toggleFilterTag ? filterProductApp() : filteredCat
  }




  return (
    <>
      <div style={{ display: 'flex' }}>
        <div className="containter">

          <ul onChange={(e) => onChangeCheckboxCategorie(e)}>
            <li>  <input type="radio" value={'reset'} name="categorie" />
              <label for="categorie">all</label></li>
            {listaCategorie.map((item) => {
              return (
                <li>
                  <input type="radio" value={item} name="categorie"
                    checked={item === filtersCat[0]} />
                  <label for="categorie">{item}</label>

                </li>)


            })}
          </ul>

          <ul >

            {listaApplicazioni.map((item, index) => {

              return (
                <li>
                  <input onClick={(e) => onChangeCheckboxApplicazioni(e)} type="checkbox" value={item} name="applicazioni" />
                  <label for="applicazioni">{item}</label>

                </li>)

            })}
          </ul>

        </div>
        <div className="containter">

          {filtersCat[0] === 'reset' ?
            langFilterProdotto.map((item) => <h1>{item.node.title}</h1>)
            :

            filtered().map((item) => {
              return <h1>{item.node.title} - {item.node.prodottiCategorie.nodes[0].name}</h1>
            })}
        </div>
      </div>
    </>
  )

}

export default Prodotti



/* 
const filtered = () => {
    let filteredArr = langFilterProdotto.filter((prodotto) => {
        let tags = prodotto.node.prodottiCategorie.nodes.concat(prodotto.node.prodottiApplicazioni.nodes);
        tags = tags.map((item) => item.name)
        //prende il valore dai filtri nel form
        const filtersForm = filtersApp.concat(filtersCat)
        

        return filtersForm.length == 0  ? prodotto : filtersForm.every(f => tags.includes(f));
    });
    return filteredArr
} */

{/* <ul onChange={(e) => onChangeCheckboxApplicazioni(e)}>
                    
{filterListaTag().map((item) => {
  
    return (
        <li>
            <input type="checkbox" value={item} name="applicazioni"
                />
            <label for="applicazioni">{item}</label>

        </li>)


})}
</ul> */}




/* const filterListaTag = () => {
    // prende i prodotti filtrati per categoria e ritorna array gli con le applicazioni
            let arrayNomiApplicazioni = filtered().map(
                (item) => {
                    return item.node.prodottiApplicazioni.nodes
                })
    // riduce ad un array gli array con i nomi
            arrayNomiApplicazioni = arrayNomiApplicazioni.reduce(function (a, b) {
                return a.concat(b);
            }, [])


    // Controlla se ci sono dei prodotti filtrati altrimenti ritorna l'array con tutte le applicazioni
            let arrayFiltrato = arrayNomiApplicazioni.map((item) => {
                return item.name
            })
            arrayFiltrato = arrayFiltrato.reduce(function(a,b){
                if (a.indexOf(b) < 0 ) a.push(b);
                return a;
              },[]);
            return arrayFiltrato
        }
     */