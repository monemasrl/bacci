import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import { Termini } from "../../../data-translations";

import './personale.scss'

const Personale = ({ personale, locale }) => {


    return (
        <>
            <section className="personale">
            <h2>{Termini[locale].accoglienza}</h2>
                <div className="wrap-personale">

                    {personale.map((item) => {
                        return (
                            <>
                                <div className="box-personale">
                                    <div className="sx">

                                        <GatsbyImage image={item.personale.immagine.localFile.childImageSharp.gatsbyImageData} alt={item.personale.immagine.altText} />
                                    </div>
                                    <div className="dx">
                                        {item.personale.link && <div className="linkedin">
                                            <a href={item.personale.link}> <StaticImage
                                                placeholder="none"
                                                width={40}
                                                src="../../images/linkedin.png" alt="Bacci logo" /></a>
                                        </div>}

                                        <h2>{item.personale.nome} {item.personale.cognome}</h2>
                                        <span className="professione">{item.personale.professione}</span>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default Personale