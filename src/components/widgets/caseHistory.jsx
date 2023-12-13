import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { Termini } from "../../../data-translations"

function CaseHistory({ locale }) {
    const data = useStaticQuery(graphql`
    {
        directus{
            case_history{
                translations{
                    languages_code{
                    code
                    }
                    title
                    sottotitolo
                main_content_titolo
                    main_content
                }
                featured_image{
                    id
                    imageFile{
                    id
                    childImageSharp{
                        gatsbyImageData
                    }
                    }
                }
            }
        }
    }
  `)
    const dataCaseHistory = data.directus.case_history
    return (
        <section className="widget-case container">
            {dataCaseHistory.map((item, index) => {
                const translation = item.translations.find((item) => item.languages_code.code === locale)
                return (
                    <div className="widget-case__box">
                        <h1>{translation.title}</h1>
                        <h2>{translation.sottotitolo}</h2>
                        <GatsbyImage loading="eager" image={item.featured_image.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                        <Link className="button-sezione" to={'/'}>{Termini[locale].scopri}</Link>
                    </div>
                )
            })}
        </section >)

}

export default CaseHistory