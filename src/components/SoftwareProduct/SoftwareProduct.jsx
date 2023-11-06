import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby"
import { Termini, langTag } from "../../../data-translations";
import { Link } from "gatsby"
const SoftwareProduct = ({ locale }) => {
  const data = useStaticQuery(graphql`
    {
        allWpPage(filter: {title: {eq: "Software"}}) {
          edges {
            node {
              locale {
                locale
              }

              software {
                sezioneSoftware3 {
                  paragrafo
                  titolo
                  sottotitolo
                  immagine {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          width: 1420
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]

                        )
                      }
                    }
                  }
                }
          
              }
            }
          }
        }
    }
  `)
  const dataFilter = data.allWpPage.edges.filter((item) => {
    return (item.node.locale.locale === 'it_IT')
  })[0].node

  return (
    <section className="container sezione-3 pitagora">
      <div className="box-sx">
        <h2>software</h2>
        <GatsbyImage image={dataFilter.software.sezioneSoftware3.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.software.sezioneSoftware3.immagine.altText} />

        <p dangerouslySetInnerHTML={{ __html: Termini[locale].pitagora_desc }} />
        <Link to={`${(locale === 'it_IT') ? '/' : 'langTag[locale]'}${Termini[locale].tecnologia}/software`} className="button-sezione">Software</Link>
      </div>

    </section>
  )
}

export default SoftwareProduct
