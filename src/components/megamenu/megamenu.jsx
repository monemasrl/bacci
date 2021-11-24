import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import { StaticImage } from "gatsby-plugin-image";
import Tassonomie from "../tassonomie";
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, Link, graphql } from "gatsby";
import { Termini, langTag } from "../../../data-translations";
import LinkFade from "../TransitionLinks/LinkFade";
import './megamenu.scss'
import { node } from "prop-types";

const Megamenu = ({ mega, setMega, terminiTraduzione, locale, language }) => {

    const dataMega = useStaticQuery(graphql`
        query megamenu {
                allWpProdotto {
                    edges {
                    node {
                        date
                        slug
                        prodotto {
                        paragrafo
                        sottotitolo
                        testoAnteprima
                        sezioniProdotto {
                            paragrafo 
                            titolo
                        }
                        inEvidenza
                        immagine{
                            altText
                            localFile {
                            childImageSharp {
                                gatsbyImageData(
                                width: 422
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF]

                                )
                            }
                            }
                        }
                        }
                        locale{locale}
                        title
                        translated {
                        prodottiApplicazioni {
                            nodes {
                            name
                            }
                        }
                        translations {
                            id
                        }
                        translated {
                            prodotto {
                            sezioniProdotto {
                                paragrafo
                                titolo
                            }
                            }
                        }
                        }
                    }
                    }
                }

            }`)


    const tassonomie = Tassonomie(locale)
    const langFilterProdotto = dataMega.allWpProdotto.edges.filter((item) => {
        return (item.node.locale.locale === locale)
    })

    const novita =  langFilterProdotto.sort((item) => item.node.date)
    const inEvidenza = langFilterProdotto.filter((item) => item.node.prodotto.inEvidenza === 'si')

    console.log('novita', novita);
    return (

        <AnimatePresence>
            {mega && (
                <motion.div
                    className="wrapper-megamenu" onMouseLeave={() => setMega(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                >

                    <div className="mega-box" >
                        <motion.div className="col-mega"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.3
                            }}>
                            <div className="box-prodotto">
                                <div className="titolo-col-mega">
                                    NOVITA’
                                </div>
                                <div className="content-mega">
                                    <>
                                        <div>
                                            <LinkFade url={`${(locale === 'it_IT') ? '/' : langTag[locale]}${Termini[locale].prodotti}/${novita[0].node.slug}`}>
                                                <h2>{novita[0].node.title}</h2>
                                            </LinkFade>
                                            <p>{novita[0].node.prodotto.sottotitolo}</p>
                                        </div>
                                        <GatsbyImage image={novita[0].node.prodotto.immagine.localFile.childImageSharp.gatsbyImageData} alt={novita[0].node.prodotto.immagine.altText} />
                                        <p className="desc" dangerouslySetInnerHTML={{ __html: novita[0].node.prodotto.testoAnteprima }} />
                                    </>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div className="col-mega"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.4
                            }} >
                            <div className="box-prodotto">
                                <div className="titolo-col-mega">
                                    IN EVIDENZA
                                </div>
                                {inEvidenza[0].node.title &&
                                    <div className="content-mega">
                                        <div>
                                            <LinkFade url={`${(locale === 'it_IT') ? '/' : langTag[locale]}${Termini[locale].prodotti}/${inEvidenza[0].node.slug}`}>
                                                <h2>{inEvidenza[0].node.title}</h2>
                                            </LinkFade>
                                            <p>{inEvidenza[0].node.prodotto.sottotitolo}</p>
                                        </div>
                                        <GatsbyImage image={inEvidenza[0].node.prodotto.immagine.localFile.childImageSharp.gatsbyImageData} alt={inEvidenza[0].node.prodotto.immagine.altText} />
                                        <p className="desc" dangerouslySetInnerHTML={{ __html: inEvidenza[0].node.prodotto.testoAnteprima }} />
                                    </div>}
                            </div>
                        </motion.div>
                        <motion.div className="col-mega"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.5
                            }} >
                            <div className="titolo-col-mega">
                                APPLICAZIONE
                            </div>
                            <ul className="mega-list">
                                <li>Fresatura</li>
                                <li>Mortasa | Telone</li>
                                <li>Doppie teste</li>
                                <li>Tornitura</li>
                                <li>TAVOLI E PANNELLI</li>
                                <li>DIVANI</li>
                                <li>ANTINE</li>
                                <li>PORTE E FINESTRE</li>
                                <li>ARTICOLI SPORTIVI</li>
                                <li>STRUMENTI MUSICALI</li>
                                <li>COFANI</li>
                                <li>TORNITURA</li>
                                <li>LETTINI</li>
                            </ul>
                        </motion.div>
                        <motion.div className="col-mega" initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.6
                            }} >
                            <div className="titolo-col-mega">
                                TIPOLOGIA
                            </div>
                            <ul className="mega-list">
                                {tassonomie.categorie.map((item) => <li>
                                    <Link to={`${locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + language + "/" + terminiTraduzione.prodotti}`} state={{ categoria: item }}
                                        className="mega-item">{item}</Link></li>
                                )}
                            </ul>


                            <Link className="tutti-prodotti" to={`${locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + language + "/" + terminiTraduzione.prodotti}`}>{terminiTraduzione.tutti_prodotti}</Link>


                            <div>
                                <Link to="">
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </motion.div>

            )}
        </AnimatePresence>

    )
}

export default Megamenu