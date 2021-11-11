import React from "react";
import {  useStaticQuery, graphql } from "gatsby";

const Tassonomie = (locale) => {
    const data = useStaticQuery(graphql`
{

    allWpProdotto {
                edges {
                  node {
                    title
                    locale {
                          locale
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
`)

const langFilterProdotto = data.allWpProdotto.edges.filter((item) => {
    return (item.node.locale.locale === locale)
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
const tassonomie = {
    categorie: listaCategorie,
    applicazioni: listaApplicazioni
}
return  tassonomie
}

export default Tassonomie