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
  const dataFromFilesystem = await graphql(`
    {
      allFile {
        edges {
          node {
            name
            relativePath
          }
        }
      }
    }
  `)

  function slugify(str) {
    /**
     * Semplice funzione per slugify string
     * @date 02/11/2023 - 23:33:05
     *
     * @param {*} str
     * @returns {string}
     */
    return String(str)
      .normalize("NFKD") // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-") // remove consecutive hyphens
  }

  function createPathFromMenu(dataPage, dataMenu, slugPagina, defaultLanguage) {
    /**
     * crea il path della pagina a partire dal nome della pagina e dalla struttura del menu
     * @date 02/11/2023 - 22:54:08
     * @var dataPage - dati di pagina
     * @var dataMenu - dati di menu
     * @type {{ en_US: string; it_IT: string; }}
     */

    if (!dataPage || !dataMenu || !slugPagina || !defaultLanguage) {
      throw new Error("error, parametri mancanti in createPathFromMenu")
    }
    const langTag = {
      en_US: "en",
      it_IT: "it",
    }
    let path = []

    function getParent(locale, title, dataMenu) {
      /**
       * @description Funzione per ottenere il path parent del menu dati il titolo di pagina e la lingua
       * @date 02/11/2023 - 23:03:15
       * @var idPath
       * id del path parent
       * @var parentPath
       * path parent da ritornare in caso esista
       *
       */

      let idPath
      let parentPath

      // cerca per una data lingua se esiste nella lista dei menuItems il titolo della pagina e se quel menuItems ha un parentId se esiste setta idPath

      dataMenu.forEach(menu => {
        if (menu.node.language === langTag[locale]) {
          menu.node.menuItems.nodes.forEach(item => {
            if (
              title.toLowerCase() === item.label.toLowerCase() &&
              item.parentId !== null
            ) {
              idPath = item.parentId
            }
          })
        }
      })

      //cerca idPath nella lista e se esiste setta parentPath con la label del menuItems altrimenti ritorna stringa vuota
      dataMenu.forEach(menu => {
        if (idPath) {
          const isItemInMenu = menu.node.menuItems.nodes.find(item => {
            return item.id === idPath
          })

          if (isItemInMenu) {
            parentPath = menu.node.menuItems.nodes.find(item => {
              return item.id === idPath
            })
          }
        }
      })
      if (parentPath) {
        return slugify(parentPath.label.toLowerCase()) + "/"
      }
      return ""
    }

    function getSlugFromTranslationHref(tHref) {
      /**
       * @description
       * semplice funzione per ottenere lo slug della pagina a partire dall'href della traduzione
       * @date 02/11/2023 - 23:03:15
       * @var tHref
       * href della traduzione, che viene fornito con un path del tipo /it/azienda/ o /en/company/
       * @returns {string}
       * ritorna lo slug della pagina tipo azienda o company
       *
       */
      const arrayFromHref = tHref.split("/").slice(-2)
      return arrayFromHref[0]
    }

    // INIZIO CREAZIONE PATH
    // se la pagina è la home e la lingua è quella di default crea il path di default
    if (dataPage.node.slug === "home") {
      if (dataPage.node.locale.locale === defaultLanguage) {
        path.push({
          path: "/",
          title: dataPage.node.title,
          locale: defaultLanguage,
        })
      }
      // se la pagina è la home e la lingua non è quella di default crea il path di default per le altre lingue
      if (dataPage.node.translations.length) {
        dataPage.node.translations.forEach(translation => {
          const defaultPath = langTag[translation.locale] + "/"

          const translationsPath = {}
          translationsPath.path = defaultPath
          translationsPath.title = translation.post_title
          translationsPath.locale = translation.locale
          // push del path di default per la lingua di default
          // con dati aggiuntivi passati nel context
          path.push(translationsPath)
        })
      }
    }
    // se la pagina non è la home e la lingua è quella di default crea il path della pagina per la lingua di default
    if (dataPage.node.slug === slugPagina && slugPagina !== "home") {
      if (dataPage.node.locale.locale === defaultLanguage) {
        const defaultPath =
          getParent(
            dataPage.node.locale.locale,
            dataPage.node.title,
            dataMenu
          ) + dataPage.node.slug
        // push del path di default per la lingua di default
        // con dati aggiuntivi passati nel context
        path.push({
          path: defaultPath,
          title: dataPage.node.title,
          locale: defaultLanguage,
        })
        // se la pagina non è la home e la lingua non è quella di default crea il path della pagina per le altre lingue
        if (dataPage.node.translations.length) {
          dataPage.node.translations.forEach(translation => {
            const defaultPath =
              translation.locale === defaultLanguage
                ? "/"
                : langTag[translation.locale] + "/"

            const translationsPath = {}
            translationsPath.path =
              defaultPath +
              getParent(translation.locale, translation.post_title, dataMenu) +
              getSlugFromTranslationHref(translation.href)
            translationsPath.title = translation.post_title
            translationsPath.locale = translation.locale
            // push del path di default per la lingua di default
            // con dati aggiuntivi passati nel context
            path.push(translationsPath)
          })
        }
      }
    }
    // ritorna l'array di oggetti con path, title e locale
    return path
  }

  // CREAZIONE PAGINE
  dataForLanguagePath.data.allWpPage.edges.forEach(entry => {
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
  })

  // CREAZIONE PAGINE FIERE, NEWS E PRODOTTI

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
  /* 
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
  }) */

  const prodotti = result.data.allWpProdotto.edges
  prodotti.forEach(entry => {
    const allPagePath = createPathFromMenu(
      entry,
      prodotti,
      entry.node.slug,
      entry.node.locale.locale
    )
    const urlBase =
      langTag[entry.node.locale.locale] === "it"
        ? "/"
        : `/${langTag[entry.node.locale.locale]}/`

    createPage({
      path: `${urlBase}${Termini[entry.node.locale.locale].prodotti}/${
        entry.node.slug
      }`,
      component: require.resolve("./src/templates/templateprodotto.jsx"),
      context: {
        content: entry.node,
        locale: entry.node.locale.locale,
        translations: entry.node.translations,
        slug: entry.node.slug,
        title: entry.node.title,
        allPagePath: allPagePath,
      },
    })
  })
}
