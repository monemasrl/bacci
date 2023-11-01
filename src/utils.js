import { langTag } from "../data-translations"

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

export { getParentPathFromMenu }
