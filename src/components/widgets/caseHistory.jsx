import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import { Termini } from "../../../data-translations"
import "./caseHistory.scss"
import { langTag } from "../../../data-translations"

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
                    slug
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
    console.log(dataCaseHistory, 'dataCaseHistory')
    if (dataCaseHistory.length > 0) {
        return (
            <section className="widget-case container">
                {dataCaseHistory.map((item, index) => {
                    if (item) {
                        const translation = item.translations.find((item) => item.languages_code.code === locale)
                        if (translation) {

                            const urlBase = langTag[translation.languages_code.code] === "it"
                                ? "/"
                                : "/" + langTag[translation.languages_code.code] + "/"
                            return (
                                translation && (
                                    <div key={index} className="widget-case__box">
                                        <h2>{translation.title}</h2>
                                        <h3>{translation.sottotitolo}</h3>
                                        <GatsbyImage loading="eager" image={item.featured_image.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                                        <Link className="button-sezione" to={`${urlBase}${Termini[locale].caseHistory}/${translation.slug}`}>{Termini[locale].scopri}</Link>
                                    </div>)
                            )
                        } else { return null }
                    }
                    else { return null }
                }
                )}
            </section >)
    }

}

export default CaseHistory