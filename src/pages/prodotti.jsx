import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"

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
  const langFilter = data.allWpPage.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })[0].node

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
  const [toggleFilterTag, setToggleFilterTag] = React.useState(false)
  const [toggleFilterCat, setToggleFilterCat] = React.useState(false)

  //setta il valore del campo nella variabile di stato
  const onChangeCheckboxCategorie = (evt) => {
    setToggleFilterTag(false)
    setToggleFilterCat(true)
    toggleFilterCat === true ? setFiltersCat([evt.target.value]) : setFiltersCat([])
  }
  //setta il valore del campo nella variabile di stato
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

  }


  // filtra i prodotti per le categorie dentro la variabile di stato


  const Categorie = () => {

    let filteredCat = langFilterProdotto.filter((prodotto) => {
      const filterResultCat = prodotto.node.prodottiCategorie.nodes[0].name === filtersCat[0]

      return filterResultCat
    });



    // filtra i prodotti per applicazioni dentro la variabile di stato



    return filteredCat
  }

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

  }



  return (
    <>
      <Layout pageTitle={langFilter.title} seo={langFilter.seo} locale={'it_IT'} translations={langFilter.translations} >

        <div className="container prodotti">
          <div className="container col-sx">
            <h2>affina la ricerca</h2>
            <form className="filters" onChange={(e) => onChangeCheckboxCategorie(e)}>
              <ul >
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
            </form>

            <form className="filters" onChange={(e) => onChangeCheckboxApplicazioni(e)}>
              <ul  >

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


            {toggleFilterTag ?

              Applicazioni().map((item) => {
                return (
                  <div className="box-prodotto">
                  <GatsbyImage image={item.node.prodotto.immagine.localFile.childImageSharp.gatsbyImageData}  alt={item.node.prodotto.immagine.altText} />
                 <h2>{item.node.title}</h2>
                 <p>{item.node.prodotto.paragrafo}</p>
                 <div className="button"><Link to={item.node.title}>scopri</Link></div>
               </div>
                )
              }) :

              !toggleFilterTag && !toggleFilterCat ?
                langFilterProdotto.map((item) => {
                  return (
                  <div className="box-prodotto">
                     <GatsbyImage image={item.node.prodotto.immagine.localFile.childImageSharp.gatsbyImageData}  alt={item.node.prodotto.immagine.altText} />
                    <h2>{item.node.title}</h2>
                    <p>{item.node.prodotto.paragrafo}</p>
                    <div className="button"><Link to={item.node.title}>scopri</Link></div>
                  </div>
                  
                  )
                }) :

                Categorie().map((item) => {
                  return(
                    <div className="box-prodotto">
                    <GatsbyImage image={item.node.prodotto.immagine.localFile.childImageSharp.gatsbyImageData}  alt={item.node.prodotto.immagine.altText} />
                   <h2>{item.node.title}</h2>
                   <p>{item.node.prodotto.paragrafo}</p>
                   <div className="button"><Link to={item.node.title}>scopri</Link></div>
                 </div>)
                })}
          </div>
        </div>
      </Layout>
    </>
  )

}

export default Prodotti





