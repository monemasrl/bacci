import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function TestQueryNode() {
  const result = useStaticQuery(graphql`
    query {
      directus {
        languages {
          code
        }
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
        case_history {
          translations {
            languages_code {
              code
            }
            title
            sottotitolo
            main_content_titolo
            main_content
            slug
          }
          case_name
          customer
          city
          country
          social_shares
          related_machines {
            Prodotti_id {
              translations {
                languages_code {
                  code
                }
                titolo
                sottotitolo
                testo_antemprima
                slug
              }
              immagine {
                id
                imageFile {
                  id
                  childImageSharp {
                    id
                    gatsbyImageData
                  }
                }
              }
            }
          }
          featured_image {
            id
            imageFile {
              id
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          secondary_image {
            id
            imageFile {
              id
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          blocchi {
            id
            collection
            item {
              ... on DirectusData_testo_immagine {
                nome
                novita
                allineamento
                id
                images {
                  id
                  directus_files_id {
                    id
                    imageFile {
                      id
                      childImageSharp {
                        gatsbyImageData(
                          placeholder: BLURRED
                          formats: [AUTO, WEBP, AVIF]
                        )
                      }
                    }
                  }
                }
                immagine {
                  id
                  imageFile {
                    id
                    childImageSharp {
                      gatsbyImageData(
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                      )
                    }
                  }
                }
                nome
                traduzioni {
                  languages_code {
                    code
                  }
                  titolo
                  sotto_titolo
                  paragrafo
                  link_label
                  url
                }
              }
              ... on DirectusData_Blocchi {
                traduzioni {
                  languages_code {
                    code
                  }
                  blocchi
                }
              }
            }
          }
        }
      }
    }
  `)

  function tassonomieTraduzioni(lingue, dati) {
    const tassonomia = {}
    lingue.forEach(lingua => {
      tassonomia[lingua.code] = dati.filter(tassonomia => {
        return tassonomia.languages_code.code === lingua.code
      })
    })
    return tassonomia
  }
  console.log(
    tassonomieTraduzioni(
      result.directus.languages,
      result.directus.applicazioni_translations
    ),
    "tassonomieTraduzioni"
  )

  /* const applicazioni_en = findItemsTranslated(
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
  ) */
}
export default TestQueryNode
