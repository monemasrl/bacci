exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  
  function getSlugFromTranslationHref(tHref) {
    const arrayFromHref = tHref.split("/").slice(2, 3)
    return arrayFromHref[0]
  }

  const langTag = {
    en_US: "en",
    it_IT: "it",
  }
  const Termini = {
    en_US: {
      azienda: "company",
      prodotti: "products",
      tutti_prodotti: "all products",
      tasto_ricerca: "Search for model",
      eventi: "fair and events",
      prodotti: "products",
      macchine: "machines",
      tecnologia: "tecnology",
      correlati: "realted products",
    },
    it_IT: {
      azienda: "azienda",
      prodotti: "prodotti",
      tutti_prodotti: "tutti i prodotti",
      tasto_ricerca: "Ricerca Modello",
      eventi: "eventi e fiere",
      prodotti: "prodotti",
      macchine: "macchine",
      tecnologia: "tecnologia",
      correlati: "prodotti correlati",
    },
  }
  const result = await graphql(`
    {
      allWpFiera {
        edges {
          node {
            content
            fiere {
              dataDa
              dataA
              luogo
              link
              sottotitolo
              descrizione
              personale {
                ... on WpPersonale {
                  id
                  title
                  personale {
                    immagine {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData(
                            width: 238
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                          )
                        }
                      }
                    }
                    link
                    nome
                    professione
                    cognome
                  }
                }
              }
              callToAction {
                paragrafo
              }
            }
            title
            slug
            locale {
              locale
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
      wpPersonale {
        id
        title
        personale {
          immagine {
            id
          }
          link
          nome
          professione
          cognome
        }
      }
      allWpPost {
        edges {
          node {
            content
            title
            slug
            date(formatString: "DD.MM.YYYY")
            articoli {
              sottotitolo
            }
            locale {
              locale
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
      allWpProdotto {
        edges {
          node {
            prodottiApplicazioni {
              nodes {
                name
              }
            }
            prodotto {
              inEvidenza
              paragrafo
              software
              sottotitolo
              testoAnteprima
              immagine {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      width: 900
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
              }
              sezioniProdotto {
                immagine {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        width: 728
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                      )
                    }
                  }
                }
                paragrafo
                titolo
              }
            }
            title
            slug
            translations {
              href
              id
              locale
              post_title
            }
            locale {
              id
              locale
            }
          }
        }
      }
    }
  `)

  const dataForLanguagePath = await graphql(`
    {
      allWpPage {
        edges {
          node {
            title
            slug
            pathPagine {
              path
            }
            locale {
              locale
            }
            translations {
              locale
              post_title
              href
            }
          }
        }
      }
      allWpMenu {
        edges {
          node {
            language
            menuItems {
              nodes {
                label
                id
                path
                parentId
              }
            }
          }
        }
      }
    }
  `)
  const fiere = result.data.allWpFiera.edges

  /**
   * Creazione delle pagine statiche
   * @date 31/10/2023 - 11:40:10
   *
   *
   */

  function getParentPathFromMenu(locale, title, dataMenu) {
    let idPath
    let g

    dataMenu.forEach(menu => {
      if (menu.node.language === langTag[locale]) {
        menu.node.menuItems.nodes.forEach(item => {
          if (title === item.label && item.parentId !== null) {
            idPath = item.parentId
          }
        })
      }
    })

    dataMenu.forEach(menu => {
      if (idPath) {
        const isItemInMenu = menu.node.menuItems.nodes.find(item => {
          return item.id === idPath
        })
        if (isItemInMenu) {
          g = menu.node.menuItems.nodes.find(item => {
            return item.id === idPath
          })
        }
      }
    })
    if (g) {
      return g.label.toLowerCase()
    }
    return ""
  }

  dataForLanguagePath.data.allWpPage.edges.forEach(entry => {
    if (entry.node.slug === "home") {
      const path =
        langTag[entry.node.locale.locale] === "it"
          ? "/"
          : langTag[entry.node.locale.locale] + "/"

      createPage({
        path: path,
        component: require.resolve("./src/templates/home.jsx"),
        context: {
          lang: entry.node.locale.locale,
        },
      })
    }

    if (entry.node.slug === "gruppo-bacci") {
      // creare un path di default per l'italiano
      const defaultPath =
        getParentPathFromMenu(
          entry.node.locale.locale,
          entry.node.title,
          dataForLanguagePath.data.allWpMenu.edges
        ) +
        "/" +
        entry.node.slug +
        "/"
      // crea la pagina di lingua default in italiano
      createPage({
        path: defaultPath,
        component: require.resolve("./src/templates/gruppo-bacci.jsx"),
        context: {
          lang: entry.node.locale.locale,
          postTitle: entry.node.title,
        },
      })

      // cicla su ogni traduzione e crea la pagina per ogni lingua
      entry.node.translations.forEach(translation => {
        const path =
          langTag[translation.locale] +
          "/" +
          getParentPathFromMenu(
            translation.locale,
            translation.post_title,
            dataForLanguagePath.data.allWpMenu.edges
          ) +
          "/" +
          getSlugFromTranslationHref(translation.href) +
          "/"

        createPage({
          path: path,
          component: require.resolve("./src/templates/gruppo-bacci.jsx"),
          context: {
            lang: translation.locale,
            postTitle: translation.post_title,
          },
        })
      })
    }
  })

  fiere.forEach(entry => {
    const urlBase =
      langTag[entry.node.locale.locale] === "it"
        ? "/"
        : `/${langTag[entry.node.locale.locale]}/`

    createPage({
      path: `${urlBase}fiere/${entry.node.slug}`,
      component: require.resolve("./src/templates/fiere.jsx"),
      context: {
        content: entry.node,
        locale: entry.node.locale.locale,
        translations: entry.node.translations,
        slug: entry.node.slug,
        parentPath: entry.node.fiere.path,
      },
    })
  })

  const news = result.data.allWpPost.edges

  news.forEach(entry => {
    const urlBase =
      langTag[entry.node.locale.locale] === "it"
        ? "/"
        : `/${langTag[entry.node.locale.locale]}/`

    createPage({
      path: `${urlBase}news/${entry.node.slug}`,
      component: require.resolve("./src/templates/news.jsx"),
      context: {
        content: entry.node.content,
        locale: entry.node.locale.locale,
        sottotitolo: entry.node.articoli.sottotitolo,
        translations: entry.node.translations,
        slug: entry.node.slug,
        title: entry.node.title,
        date: entry.node.date,
      },
    })
  })

  result.data.allWpProdotto.edges.forEach(entry => {
    const urlBase =
      langTag[entry.node.locale.locale] === "it"
        ? "/"
        : `/${langTag[entry.node.locale.locale]}/`

    createPage({
      path: `${urlBase}${Termini[entry.node.locale.locale].prodotti}/${
        entry.node.slug
      }`,
      component: require.resolve("./src/templates/prodotto.jsx"),
      context: {
        content: entry.node,
        locale: entry.node.locale.locale,
        translations: entry.node.translations,
        slug: entry.node.slug,
        title: entry.node.title,
      },
    })
  })
}
