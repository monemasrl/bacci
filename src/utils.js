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
function getSlugFromHref(tHref) {
  const arrayFromHref = tHref.split("/").slice(-2)
  return arrayFromHref[0]
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

  dataPage.forEach(item => {
    if (item.node.slug === "home") {
      if (item.node.locale.locale === defaultLanguage) {
        path.push({
          path: "/",
          title: item.node.title,
          locale: defaultLanguage,
        })
      }
      if (item.node.translations.length) {
        item.node.translations.forEach(translation => {
          const defaultPath = langTag[translation.locale] + "/"

          const translationsPath = {}
          translationsPath.path = defaultPath
          translationsPath.title = translation.post_title
          translationsPath.locale = translation.locale
          path.push(translationsPath)
        })
      }
    }
    if (item.node.slug === slugPagina) {
      if (item.node.locale.locale === defaultLanguage) {
        const defaultPath =
          getParent(item.node.locale.locale, item.node.title, dataMenu) +
          item.node.slug
        path.push({ path: defaultPath, locale: defaultLanguage })

        if (item.node.translations.length) {
          item.node.translations.forEach(translation => {
            const defaultPath =
              translation.locale === defaultLanguage
                ? "/"
                : langTag[translation.locale] + "/"

            const translationsPath = {}
            translationsPath.path =
              defaultPath +
              getParent(translation.locale, translation.post_title, dataMenu) +
              getSlugFromHref(translation.href)
            translationsPath.title = translation.post_title
            translationsPath.locale = translation.locale
            path.push(translationsPath)
          })
        }
      }
    }
  })
  return path
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
export {
  getParentPathFromMenu,
  slugify,
  createPathFromMenu,
  findItemTranslated,
  findItemsTranslated,
}
