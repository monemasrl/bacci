import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import Tassonomie from "../tassonomie";
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, Link, graphql } from "gatsby";
import { Termini, langTag } from "../../../data-translations";
import { findItemTranslated } from "../../utils";
import './megamenu.scss'

const MegamenuDirectus = ({ mega, setMega, terminiTraduzione, locale, language }) => {


    /**
     * Megamenu
     * 
     * @var locale string contiene la lingua dal gatsby node
     * @date 09/11/2023 - 11:16:50
     *
     * @type {*}
     */

    const dataMega = useStaticQuery(graphql`
        query megamenu {
            directus{
                Prodotti{
                    id
                   
                    date_created
                    immagine{
                         id 
                    imageFile{
                        id
                        childImageSharp {
                                gatsbyImageData(
                                width: 422
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF]

                                )
                            }
                    }
                    }
                    featured
                    translations{
                        slug
                    languages_code{
                        code
                    }
                    
                    titolo
                    sottotitolo
                    testo_antemprima
                    paragrafo
                    
                    }
                    applicazioni{
                    
                    applicazioni_id{
                        id
                    
                        translations{
                        
                        id
                        label
                        }
                    }
                    
                    }
                    categoria{
                    id
                    translations{
                        id
                        nome
                    }
                    }
                    sezioni_prodotto{
                    immagine{
                        imageFile{
                        childImageSharp{
                            gatsbyImageData
                        }
                        }
                    }
                    prodotto_id{
                        id
                    }
                    translations{
                        titolo
                        paragrafo
                        
                    }
                    
                    }
                    
                }
            }
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

    const novita = dataMega.directus.Prodotti.sort((item) => item.date_create)

    const inEvidenza = dataMega.directus.Prodotti.filter((item) => item.featured[0] === 'true')
    const inEvidenzaLocalizzato = findItemTranslated(inEvidenza[0].translations, locale)
    const novitaLocalizzato = findItemTranslated(novita[0].translations, locale)

    console.log(novitaLocalizzato, 'novitaLocalizzato')
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
                                            <Link to={`/${(langTag[locale] === 'it') ? '' : langTag[locale] + '/'}${Termini[locale].prodotti}/${novitaLocalizzato.slug}`}>
                                                <h2>{novitaLocalizzato.titolo}</h2>
                                            </Link>
                                            <p>{novitaLocalizzato.sottotitolo}</p>
                                        </div>
                                        <GatsbyImage image={novita[0].immagine.imageFile.childImageSharp.gatsbyImageData} alt={novita[0].titolo} />
                                        <p className="desc" dangerouslySetInnerHTML={{ __html: novitaLocalizzato.testo_anteprima }} />
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
                                {inEvidenzaLocalizzato.titolo &&
                                    <div className="content-mega">
                                        <div>
                                            <Link to={`/${(langTag[locale] === 'it') ? '' : langTag[locale] + '/'}${Termini[locale].prodotti}/${inEvidenzaLocalizzato.slug}`}>
                                                <h2>{inEvidenzaLocalizzato.titolo}</h2>
                                            </Link>
                                            <p>{inEvidenzaLocalizzato.sottotitolo}</p>
                                        </div>
                                        <GatsbyImage image={inEvidenza[0].immagine.imageFile.childImageSharp.gatsbyImageData} alt={inEvidenzaLocalizzato.titolo} />
                                        <p className="desc" dangerouslySetInnerHTML={{ __html: inEvidenzaLocalizzato.testo_anteprima }} />
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

export default MegamenuDirectus