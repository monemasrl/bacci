exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  function getSlugFromTranslationHref(tHref) {
    const arrayFromHref = tHref.split("/").slice(-2)
    return arrayFromHref[0]
  }
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

  function createPathFromMenu(dataPage, dataMenu, slugPagina, defaultLanguage) {
    const langTag = {
      en_US: "en",
      it_IT: "it",
    }
    let path = []
    function getParent(locale, title, dataMenu) {
      let idPath
      let g

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
        return slugify(g.label.toLowerCase()) + "/"
      }
      return ""
    }

    if (!dataPage || !dataMenu || !slugPagina || !defaultLanguage) {
      throw new Error("error, parametri mancanti in createPathFromMenu")
    }

    if (dataPage.node.slug === "home") {
      if (dataPage.node.locale.locale === defaultLanguage) {
        path.push({
          path: "/",
          title: dataPage.node.title,
          locale: defaultLanguage,
        })
      }
      if (dataPage.node.translations.length) {
        dataPage.node.translations.forEach(translation => {
          const defaultPath = langTag[translation.locale] + "/"

          const translationsPath = {}
          translationsPath.path = defaultPath
          translationsPath.title = translation.post_title
          translationsPath.locale = translation.locale
          path.push(translationsPath)
        })
      }
    }
    if (dataPage.node.slug === slugPagina && slugPagina !== "home") {
      if (dataPage.node.locale.locale === defaultLanguage) {
        const defaultPath =
          getParent(
            dataPage.node.locale.locale,
            dataPage.node.title,
            dataMenu
          ) + dataPage.node.slug

        path.push({
          path: defaultPath,
          title: dataPage.node.title,
          locale: defaultLanguage,
        })

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
            path.push(translationsPath)
          })
        }
      }
    }
    return path
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
      return slugify(g.label.toLowerCase()) + "/"
    }
    return ""
  }

  dataForLanguagePath.data.allWpPage.edges.forEach(entry => {
    if (entry.node.slug === "home" && entry.node.locale.locale === "it_IT") {
      const allPagePath = createPathFromMenu(
        entry,
        dataForLanguagePath.data.allWpMenu.edges,
        entry.node.slug,
        entry.node.locale.locale
      )

      allPagePath.forEach(data => {
        const path = data.path
        createPage({
          path: path,
          component: require.resolve("./src/templates/home.jsx"),
          context: {
            lang: data.locale,
            postTitle: data.title,
            allPagePath: allPagePath,
          },
        })
      })
    }

    if (
      entry.node.slug === "gruppo-bacci" &&
      entry.node.locale.locale === "it_IT"
    ) {
      // creare un path di default per l'italiano
      const allPagePath = createPathFromMenu(
        entry,
        dataForLanguagePath.data.allWpMenu.edges,
        entry.node.slug,
        entry.node.locale.locale
      )

      allPagePath.forEach(data => {
        const path = data.path
        createPage({
          path: path,
          component: require.resolve("./src/templates/gruppo-bacci.jsx"),
          context: {
            lang: data.locale,
            postTitle: data.title,
            allPagePath: allPagePath,
          },
        })
      })
    }
    if (
      entry.node.slug === "case-history" &&
      entry.node.locale.locale === "it_IT"
    ) {
      // creare un path di default per l'italiano
      const allPagePath = createPathFromMenu(
        entry,
        dataForLanguagePath.data.allWpMenu.edges,
        entry.node.slug,
        entry.node.locale.locale
      )

      allPagePath.forEach(data => {
        const path = data.path
        createPage({
          path: path,
          component: require.resolve("./src/templates/case-history.jsx"),
          context: {
            lang: data.locale,
            postTitle: data.title,
            allPagePath: allPagePath,
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
