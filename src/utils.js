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
    return slugify(g.label.toLowerCase())
  }
  return ""
}

export { getParentPathFromMenu, slugify }
