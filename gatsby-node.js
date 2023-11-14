exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const sharp = require("sharp")

  sharp.cache(false)
  sharp.simd(false)
  /**
   * Creazione contenuti
   * @date 02/11/2023 - 17:51:04
   *
   * @function slugify - slugify string
   * @function createPathFromMenu - crea il path della pagina a partire dal nome della pagina e dalla struttura del menu
   * @var result - query per ottenere i contenuti di prodotto, news e fiere
   * @var dataForLanguagePath - query dei dati per la costruzione del path delle pagine
   */

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
      directus {
        menus {
          name
          id
          items {
            translations {
              languages_code {
                code
              }
              label
              slug
            }
            sub_items {
              translations {
                languages_code {
                  code
                }
                label
                slug
              }
            }
          }
        }
        Prodotti {
          id
          name
          date_created
          immagine {
            id
            imageFile {
              id
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          featured
          translations {
            languages_code {
              code
            }
            slug
            titolo
            sottotitolo
            testo_antemprima
            paragrafo
          }
          applicazioni {
            applicazioni_id {
              id

              translations {
                id
                label
              }
            }
          }
          categoria {
            id
            translations {
              id
              nome
            }
          }
          sezioni_prodotto {
            immagine {
              id
              imageFile {
                id
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            prodotto_id {
              id
            }
            translations {
              languages_code {
                code
              }
              titolo
              paragrafo
            }
          }
        }
      }
    }
  `)
  function getAllPathPagine(translations, parent) {
    const allPath = []
    translations.forEach(item => {
      // cerca tra le traduzioni del parent path quella con la stessa lingua della traduzione corrente
      const parentPath =
        parent && parent.find(itemb => item.languages_code.code === itemb.lang)

      const lang = item.languages_code.code
      const baseLang = langTag[lang] !== "it" ? "/" + langTag[lang] + "/" : "/"
      const path =
        baseLang + (parentPath ? parentPath.parentPath : "") + item.slug
      const pathObj = {
        //solo se esiste uno slug in traduzione crea il path
        path: item.slug && path,
        locale: lang,
        title: item.label,
      }
      allPath.push(pathObj)
    })
    return allPath
  }

  // CREAZIONE HOMEPAGE
  const homePage = {
    translations: [
      {
        titolo: "Home",
        languages_code: { code: "it_IT" },
        slug: "",
      },
      {
        titolo: "Home",
        languages_code: { code: "en_US" },
        slug: "en",
      },
    ],
  }
  homePage.translations.forEach(translation => {
    createPage({
      path: `/${
        translation.languages_code.code == "it_IT"
          ? ""
          : langTag[translation.languages_code.code] + "/"
      }`,
      component: require.resolve("./src/templates/page.jsx"),
      context: {
        locale: translation.languages_code.code,
        slug: "home",
        title: translation.titolo,
        allPagePath: [
          {
            path: "/",
            locale: "it_IT",
            title: "Home",
          },
          {
            path: "/en",
            locale: "en_US",
            title: "Home",
          },
        ],
      },
    })
  })

  // CREAZIONE PAGINE

  await result.data.directus.menus.forEach(menu => {
    // Loop su tutti i menu
    menu.items.forEach(item => {
      // se non ci sono elementi di secondo livello crea la pagina
      if (item.sub_items.length === 0) {
        const allPagePath = getAllPathPagine(item.translations)

        item.translations.forEach(translation => {
          const urlBase =
            langTag[translation.languages_code.code] === "it"
              ? "/"
              : langTag[translation.languages_code.code] + "/"

          createPage({
            path: `${urlBase}${translation.slug}`,
            component: require.resolve("./src/templates/page.jsx"),
            context: {
              locale: translation.languages_code.code,
              title: translation.label,
              slug: translation.slug,
              allPagePath: allPagePath,
            },
          })
        })
      }
      // se ci sono elementi di secondo livello crea le pagine
      if (item.sub_items.length > 0) {
        // per ogni traduzione di voce di menu padre crea un array con tutti i path parent
        let parentPath = []

        item.translations.forEach(translation => {
          parentPath.push({
            parentPath: translation.slug + "/",
            lang: translation.languages_code.code,
          })
        })
        //per ogni pagina di secondo livello crea i dati per il context e la pagina
        item.sub_items.forEach(subItem => {
          subItem.translations.forEach((translation, index) => {
            const allPagePath = getAllPathPagine(
              subItem.translations,
              parentPath
            )
            // il path viene creato concatenando il path del padre con il path del figlio
            const findParent = parentPath.find(item => {
              return item.lang === translation.languages_code.code
            })
            const urlBase =
              langTag[translation.languages_code.code] === "it"
                ? "/"
                : "/" + langTag[translation.languages_code.code] + "/"

            createPage({
              path: `${urlBase}${findParent.parentPath}${translation.slug}`,
              component: require.resolve("./src/templates/page.jsx"),
              context: {
                parentPath: findParent.parentPath,
                locale: translation.languages_code.code,
                slug: translation.slug,
                title: translation.label,
                allPagePath: allPagePath,
              },
            })
          })
        })
      }
    })
  })

  // CREAZIONE PAGINE FIERE, NEWS E PRODOTTI
  /* 
   const fiere = result.data.allWpFiera.edges

  fiere.forEach(entry => {
    const allPagePath = createPathFromMenu(
      entry,
      fiere,
      entry.node.slug,
      entry.node.locale.locale
    )

    const urlBase =
      langTag[entry.node.locale.locale] === "it"
        ? "/"
        : `/${langTag[entry.node.locale.locale]}/`

    createPage({
      path: `${urlBase}fiere/${entry.node.slug}`,
      component: require.resolve("./src/templates/templatefiere.jsx"),
      context: {
        content: entry.node,
        locale: entry.node.locale.locale,
        translations: entry.node.translations,
        slug: entry.node.slug,
        parentPath: entry.node.fiere.path,
        allPagePath: allPagePath,
      },
    })
  }) 

  const news = result.data.allWpPost.edges

  news.forEach(entry => {
    const allPagePath = createPathFromMenu(
      entry,
      news,
      entry.node.slug,
      entry.node.locale.locale
    )
    const urlBase =
      langTag[entry.node.locale.locale] === "it"
        ? "/"
        : `/${langTag[entry.node.locale.locale]}/`

    createPage({
      path: `${urlBase}news/${entry.node.slug}`,
      component: require.resolve("./src/templates/templatenews.jsx"),
      context: {
        content: entry.node.content,
        locale: entry.node.locale.locale,
        sottotitolo: entry.node.articoli.sottotitolo,
        translations: entry.node.translations,
        slug: entry.node.slug,
        title: entry.node.title,
        date: entry.node.date,
        allPagePath: allPagePath,
      },
    })
  })*/

  //PAGINA PRODOTTI
  const paginaProdotto = {
    translations: [
      {
        titolo: "prodotti",
        languages_code: { code: "it_IT" },
        slug: "prodotti",
      },
      {
        titolo: "products",
        languages_code: { code: "en_US" },
        slug: "products",
      },
    ],
  }

  paginaProdotto.translations.forEach(translation => {
    const urlBase =
      langTag[translation.languages_code.code] === "it"
        ? "/"
        : "/" + langTag[translation.languages_code.code] + "/"

    createPage({
      path: `${urlBase}${translation.slug}`,
      component: require.resolve("./src/templates/prodotti.jsx"),
      context: {
        locale: translation.languages_code.code,
        slug: translation.slug,
        title: translation.titolo,
        allPagePath: [
          {
            path: "/prodotti/",
            locale: "it_IT",
            title: "prodotti",
          },
          {
            path: "/en/products",
            locale: "en_US",
            title: "products",
          },
        ],
      },
    })
  })

  // SCHEDA PRODOTTO
  const prodottiDirectus = await result.data.directus.Prodotti
  function getAllPathProdotti(translations) {
    const allPath = []
    translations.forEach(item => {
      const lang = item.languages_code.code
      const baseLang = langTag[lang] !== "it" ? "/" + langTag[lang] + "/" : "/"
      const path = baseLang + Termini[lang].prodotti + "/" + item.slug
      const pathObj = {
        path: path,
        locale: lang,
        title: item.titolo,
      }
      allPath.push(pathObj)
    })
    return allPath
  }
  prodottiDirectus.forEach(entry => {
    const allPagePath = getAllPathProdotti(entry.translations)

    entry.translations.forEach(translation => {
      const urlBase =
        langTag[translation.languages_code.code] === "it"
          ? "/"
          : "/" + langTag[translation.languages_code.code] + "/"

      createPage({
        path: `${urlBase}${Termini[translation.languages_code.code].prodotti}/${
          translation.slug
        }`,
        component: require.resolve("./src/templates/templateprodotto.jsx"),
        context: {
          content: entry,
          locale: translation.languages_code.code,
          slug: translation.slug,
          title: translation.titolo,
          allPagePath: allPagePath,
        },
      })
    })
  })
}
