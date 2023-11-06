import { langTag } from "../data-translations"

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

function getParentPathFromMenu(locale, title, dataMenu) {
  let idPath
  let g

  dataMenu.forEach(menu => {
    if (menu.node.language === langTag[locale]) {
      menu.node.menuItems.nodes.forEach(item => {
        if (
          title.toLowerCase() === item.label.toLowerCase() &&
          item.parentId !== null
        ) {
          console.log("getParentPathFromMenu", locale, title, dataMenu)
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
        getParent(dataPage.node.locale.locale, dataPage.node.title, dataMenu) +
        dataPage.node.slug
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
export { getParentPathFromMenu, slugify, createPathFromMenu }
