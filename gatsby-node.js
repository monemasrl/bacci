exports.createPages = async ({ graphql, actions: { createPage } }) => {

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
                immagine{
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
      path: `${urlBase}fiere/${entry.node.slug}`,
      component: require.resolve('./src/templates/fiere.jsx'),
      context: {
        content: entry.node,
        locale: entry.node.locale.locale,
        translations: entry.node.translations,
        slug: entry.node.slug,
        parentPath: entry.node.fiere.path,
      }
    })


  })

  const news = result.data.allWpPost.edges

  news.forEach((entry) => {

    const urlBase = langTag[entry.node.locale.locale] === 'it' ? '/' : `/${langTag[entry.node.locale.locale]}/`



    createPage({
      path: `${urlBase}news/${entry.node.slug}`,
      component: require.resolve('./src/templates/news.jsx'),
      context: {
        content: entry.node.content,
        locale: entry.node.locale.locale,
        sottotitolo: entry.node.articoli.sottotitolo,
        translations: entry.node.translations,
        slug: entry.node.slug,
        title: entry.node.title,
        date: entry.node.date
       
      }
    })


  })
}