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


    const onChangeCheckboxCategorie = (evt) => {

        return setFiltersCat([evt.target.value])
    }

    const onChangeCheckboxApplicazioni = (evt) => {

        return setFiltersApp([evt.target.value])
    }

    const [filtersCat, setFiltersCat] = React.useState([])
    const [filtersApp, setFiltersApp] = React.useState([])

 
    const filtered = () => {
        let filteredArr = langFilterProdotto.filter((prodotto) => {
           console.log(filtersCat[0]);
           const filterResult = filtersCat.length === 0 ||  filtersCat[0] === 'reset' ? prodotto : prodotto.node.prodottiCategorie.nodes[0].name === filtersCat[0]
            return  filterResult
    
        });

        return filteredArr
    }

    const filterListaCategorie = () => {
        // prende i prodotti filtrati per categoria e ritorna array gli con le categorie
        let arrayNomiCategorie = langFilterProdotto.map((item)=>{return item.node.prodottiCategorie.nodes})
        
        // riduce ad un array gli array con i nomi
        arrayNomiCategorie = arrayNomiCategorie.reduce(function (a, b) {
                    return a.concat(b);
                }, [])
        // Controlla se ci sono dei prodotti filtrati altrimenti ritorna l'array con tutte le categorie
                let arrayFiltrato = arrayNomiCategorie.map((item) => {
                    return item.name
                }) 
                arrayFiltrato = arrayFiltrato.reduce(function(a,b){
                    if (a.indexOf(b) < 0 ) a.push(b);
                    return a;
                  },[]);
                
          
                return arrayFiltrato
            }
        
        

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div className="containter">
                
                    <ul onChange={(e) => onChangeCheckboxCategorie(e)}>
                    <li>  <input type="radio" value={'reset'} name="categorie"/>
                                    <label for="categorie">all</label></li>
                        {filterListaCategorie().map((item) => {
                            return (
                                <li>
                                    <input type="radio" value={item} name="categorie"
                                        checked={item === filtersCat[0]} />
                                    <label for="categorie">{item}</label>

                                </li>)


                        })}
                    </ul>

                </div>
                <div className="containter">
                    {filtered().map((item) => {
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
        console.log(filtersForm);

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