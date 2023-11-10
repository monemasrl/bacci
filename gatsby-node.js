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

  // CREAZIONE PAGINE
  /*   dataForLanguagePath.data.allWpPage.edges.forEach(entry => {
    if (entry.node.locale.locale === "it_IT") {
      // crea un path di default per l'italiano
      const allPagePath = createPathFromMenu(
        entry,
        dataForLanguagePath.data.allWpMenu.edges,
        entry.node.slug,
        entry.node.locale.locale
      )

      function isTemplateFile() {
        const isFile = dataFromFilesystem.data.allFile.edges.find(file => {
          return file.node.relativePath === `templates/${entry.node.slug}.jsx`
        })
        if (isFile) {
          return `./src/templates/${entry.node.slug}.jsx`
        }
        return `./src/templates/default.jsx`
      }

      allPagePath.forEach(data => {
        const path = data.path
        createPage({
          path: path,
          component: require.resolve(isTemplateFile()),
          context: {
            lang: data.locale,
            postTitle: data.title,
            allPagePath: allPagePath,
          },
        })
      })
    }
  }) */

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
  const prodottiDirectus = result.data.directus.Prodotti
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
