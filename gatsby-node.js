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

  function slugify(str) {
    return String(str)
      .normalize("NFKD") // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-") // remove consecutive hyphens
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
  function findItemTranslated(translations, langCode) {
    const itemTranslated = translations.find(lang => {
      const code = lang.languages_code.code
      return langTag[code] === langTag[langCode]
    })
    if (!itemTranslated) {
      console.log("error, traduzione non trovata")
    } else {
      return itemTranslated
    }
  }
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

  const findMenuItem = (menuName, itemToFind) => {
    const menu = result.data.directus.menus.find(item => {
      return item.name === menuName
    })
    let menuItem
    if (menu) {
      menuItem = menu.items.find(item => {
        return item.name === itemToFind
      })
    } else {
      throw new Error("menu non trovato")
    }
    if (menuItem != undefined) {
      return menuItem
    }
  }
  function findItemsTranslated(translations, langCode) {
    const itemTranslated = translations.filter(lang => {
      const code = lang.languages_code.code
      return langTag[code] === langTag[langCode]
    })
    if (!itemTranslated) {
      console.log("error, traduzione non trovata")
    } else {
      return itemTranslated
    }
  }
  const result = await graphql(`
    {
      directus {
        prodotto_categorie_translations {
          languages_code {
            code
          }
          nome
        }
        applicazioni_translations {
          languages_code {
            code
          }
          label
        }
        menus {
          name
          id
          items {
            name
            translations {
              languages_code {
                code
              }
              label
              slug
            }
            sub_items {
              name
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
        Fiere {
          seo {
            translations {
              languages_code {
                code
              }
              title
              meta_description
            }
          }
          name
          from
          to
          link_fiera
          type
          page
          location
          position
          title_translations {
            languages_code {
              code
            }
            title
            slug
          }
          translations {
            languages_code {
              code
            }

            sottotitolo
            description
            call2action
            body
          }
        }
        posts {
          seo {
            translations {
              languages_code {
                code
              }
              title
              meta_description
            }
          }
          id
          date_created
          translations {
            languages_code {
              code
            }
            title
            slug
            summary
            content
          }
          image {
            id
            imageFile {
              id
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        Prodotti {
          id
          seo {
            translations {
              languages_code {
                code
              }
              title
              meta_description
            }
          }
          name
          date_created
          type
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
              languages_code {
                code
              }
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

  // Dati generici
  const applicazioni_en = findItemsTranslated(
    result.data.directus.applicazioni_translations,
    "en_US"
  )
  const applicazioni_it = findItemsTranslated(
    result.data.directus.applicazioni_translations,
    "it_IT"
  )

  const categorie_en = findItemsTranslated(
    result.data.directus.prodotto_categorie_translations,
    "en_US"
  )
  const categorie_it = findItemsTranslated(
    result.data.directus.prodotto_categorie_translations,
    "it_IT"
  )

  const tassonomiaProdotti = {
    applicazioni: {
      en_US: applicazioni_en,
      it_IT: applicazioni_it,
    },

    categorie: {
      en_US: categorie_en,
      it_IT: categorie_it,
    },
  }
  console.log(tassonomiaProdotti.applicazioni.en_US, "tassonomiaProdotti")
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
        listaApplicazioni:
          tassonomiaProdotti.applicazioni[translation.languages_code.code],
        listaCategorie:
          tassonomiaProdotti.categorie[translation.languages_code.code],
        pageName: "home",
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
            path: `${urlBase}${translation.slug.toLowerCase()}`,
            component: require.resolve("./src/templates/page.jsx"),
            context: {
              locale: translation.languages_code.code,
              title: translation.label,
              slug: translation.slug,
              allPagePath: allPagePath,
              pageName: slugify(item.name).toLowerCase(),
              listaApplicazioni:
                tassonomiaProdotti.applicazioni[
                  translation.languages_code.code
                ],
              listaCategorie:
                tassonomiaProdotti.categorie[translation.languages_code.code],
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

            if (translation.slug) {
              createPage({
                path: `${urlBase}${findParent.parentPath.toLowerCase()}${translation.slug.toLowerCase()}`,
                component: require.resolve("./src/templates/page.jsx"),
                context: {
                  parentPath: findParent.parentPath,
                  locale: translation.languages_code.code,
                  slug: translation.slug,
                  title: translation.label,
                  allPagePath: allPagePath,
                  pageName: slugify(subItem.name).toLowerCase(),
                  listaApplicazioni:
                    tassonomiaProdotti.applicazioni[
                      translation.languages_code.code
                    ],
                  listaCategorie:
                    tassonomiaProdotti.categorie[
                      translation.languages_code.code
                    ],
                },
              })
            }
          })
        })
      }
    })
  })

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

    if (translation.slug) {
      createPage({
        path: `${urlBase}${translation.slug.toLowerCase()}`,
        component: require.resolve("./src/templates/prodotti.jsx"),
        context: {
          locale: translation.languages_code.code,
          slug: translation.slug,
          title: translation.titolo,
          listaApplicazioni:
            tassonomiaProdotti.applicazioni[translation.languages_code.code],
          listaCategorie:
            tassonomiaProdotti.categorie[translation.languages_code.code],
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
    }
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

      if (translation.slug) {
        createPage({
          path: `${urlBase}${
            Termini[translation.languages_code.code].prodotti
          }/${translation.slug.toLowerCase()}`,
          component: require.resolve("./src/templates/templateprodotto.jsx"),
          context: {
            content: entry,
            locale: translation.languages_code.code,
            slug: translation.slug,
            title: translation.titolo,
            allPagePath: allPagePath,
            listaApplicazioni:
              tassonomiaProdotti.applicazioni[translation.languages_code.code],
            listaCategorie:
              tassonomiaProdotti.categorie[translation.languages_code.code],
          },
        })
      }
    })
  })

  //PAGINA NEWS
  const paginaNews = {
    translations: [
      {
        titolo: "news",
        languages_code: { code: "it_IT" },
        slug: "news",
      },
      {
        titolo: "news",
        languages_code: { code: "en_US" },
        slug: "news",
      },
    ],
  }

  paginaNews.translations.forEach(translation => {
    const urlBase =
      langTag[translation.languages_code.code] === "it"
        ? "/"
        : "/" + langTag[translation.languages_code.code] + "/"

    if (translation.slug) {
      createPage({
        path: `${urlBase}${translation.slug.toLowerCase()}`,
        component: require.resolve("./src/templates/news.jsx"),
        context: {
          locale: translation.languages_code.code,
          slug: translation.slug,
          title: translation.titolo,
          listaApplicazioni:
            tassonomiaProdotti.applicazioni[translation.languages_code.code],
          listaCategorie:
            tassonomiaProdotti.categorie[translation.languages_code.code],
          allPagePath: [
            {
              path: "/news/",
              locale: "it_IT",
              title: "news",
            },
            {
              path: "/en/news",
              locale: "en_US",
              title: "news",
            },
          ],
        },
      })
    }
  })
  // SINGOLA NEWS
  const news = await result.data.directus.posts
  function getAllPathNews(translations) {
    const allPath = []
    translations.forEach(item => {
      const lang = item.languages_code.code
      const baseLang = langTag[lang] !== "it" ? "/" + langTag[lang] + "/" : "/"
      const path = baseLang + "news" + "/" + item.slug
      const pathObj = {
        path: path,
        locale: lang,
        title: item.title,
      }
      allPath.push(pathObj)
    })
    return allPath
  }
  news.forEach(entry => {
    const allPagePath = getAllPathNews(entry.translations)

    entry.translations.forEach(translation => {
      const urlBase =
        langTag[translation.languages_code.code] === "it"
          ? "/"
          : "/" + langTag[translation.languages_code.code] + "/"

      if (translation.slug) {
        createPage({
          path: `${urlBase}${"news"}/${translation.slug.toLowerCase()}`,
          component: require.resolve("./src/templates/templateNews.jsx"),
          context: {
            content: entry,
            locale: translation.languages_code.code,
            slug: translation.slug,
            title: translation.title,
            allPagePath: allPagePath,
            listaApplicazioni:
              tassonomiaProdotti.applicazioni[translation.languages_code.code],
            listaCategorie:
              tassonomiaProdotti.categorie[translation.languages_code.code],
          },
        })
      }
    })
  })
  //PAGINA FIERE
  const paginaFiereMenuItem = findMenuItem("Top Menu", "Fiere")

  function getAllPathFiera(translations) {
    const allPath = []
    translations.forEach(item => {
      const lang = item.languages_code.code
      const baseLang = langTag[lang] !== "it" ? "/" + langTag[lang] + "/" : "/"
      const path = baseLang + item.slug + "/"
      const pathObj = {
        path: path,
        locale: lang,
        title: item.label,
      }
      allPath.push(pathObj)
    })
    return allPath
  }
  paginaFiereMenuItem.translations.forEach(translation => {
    const urlBase =
      langTag[translation.languages_code.code] === "it"
        ? "/"
        : "/" + langTag[translation.languages_code.code] + "/"

    if (translation.slug) {
      createPage({
        path: `${urlBase}${translation.slug.toLowerCase()}`,
        component: require.resolve("./src/templates/fiere.jsx"),
        context: {
          locale: translation.languages_code.code,
          slug: translation.slug,
          title: translation.label,
          allPagePath: getAllPathFiera(paginaFiereMenuItem.translations),
          listaApplicazioni:
            tassonomiaProdotti.applicazioni[translation.languages_code.code],
          listaCategorie:
            tassonomiaProdotti.categorie[translation.languages_code.code],
        },
      })
    }
  })

  // SINGOLA FIERA
  const fiere = await result.data.directus.Fiere
  function getAllPathFiere(translations) {
    const allPath = []
    translations.forEach(item => {
      const parentPathFromMenu = paginaFiereMenuItem.translations.find(
        itemb => item.languages_code.code === itemb.languages_code.code
      )

      const lang = item.languages_code.code
      const baseLang = langTag[lang] !== "it" ? "/" + langTag[lang] + "/" : "/"
      const path = baseLang + parentPathFromMenu.label + "/" + item.slug
      const pathObj = {
        path: path,
        locale: lang,
        title: item.title,
      }
      allPath.push(pathObj)
    })
    return allPath
  }

  fiere.forEach(entry => {
    const allPagePath = getAllPathFiere(entry.title_translations)

    entry.title_translations.forEach((translation, index) => {
      const urlBase =
        langTag[translation.languages_code.code] === "it"
          ? "/"
          : "/" + langTag[translation.languages_code.code] + "/"

      const parentPathFromMenu = paginaFiereMenuItem.translations.find(
        itemb => translation.languages_code.code === itemb.languages_code.code
      )

      if (translation.slug && entry.page === true) {
        createPage({
          path: `${urlBase}${parentPathFromMenu.slug.toLowerCase()}/${translation.slug.toLowerCase()}`,
          component: require.resolve("./src/templates/templateFiere.jsx"),
          context: {
            content: entry,
            locale: translation.languages_code.code,
            slug: translation.slug,
            title: translation.title,
            allPagePath: allPagePath,
            listaApplicazioni:
              tassonomiaProdotti.applicazioni[translation.languages_code.code],
            listaCategorie:
              tassonomiaProdotti.categorie[translation.languages_code.code],
          },
        })
      }
    })
  })
}
//Per attivare la source  map sul scss
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: "cheap-module-source-map",
  })
}
