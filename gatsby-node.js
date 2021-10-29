exports.createPages = async ({ graphql, actions: { createPage } }) => {
 
  const result = await graphql(` 
   { 
       allWpFiera {
        edges {
          node {
            slug
        
            content
            locale {
              locale
            }
            translations {
              href
              id
              locale
              post_title
            }
            fiere {
              note
              path
           
            }
          }
        }
      }
    }
    `);

  const fiere = result.data.allWpFiera.edges
  const langTag = {
    en_US: 'en',
    it_IT: 'it'
  }
  fiere.forEach((entry) => {

    const urlBase = langTag[entry.node.locale.locale] === 'it' ? '/' : `/${langTag[entry.node.locale.locale]}/`



    createPage({
      path: `${urlBase}${entry.node.fiere.path}/${entry.node.slug}`,
      component: require.resolve('./src/templates/fiere.jsx'),
      context: {
        content: entry.node.content,
        locale: entry.node.locale.locale,
        translations: entry.node.translations,
        slug: entry.node.slug,
        parentPath: entry.node.fiere.path
      }
    })


  })
}