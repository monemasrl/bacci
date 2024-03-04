import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, Link, graphql } from "gatsby";
import { Termini, langTag } from "../../../data-translations";
import { findItemTranslated, summary } from "../../utils";
import './megamenu.scss'

const MegamenuDirectus = ({ mega, setMega, terminiTraduzione, locale, language, listaApplicazioni, listaCategorie }) => {


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
                   type
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
            }`)





    const inEvidenza = dataMega.directus.Prodotti.filter((item) => {
        if (!item.featured) return false
        return item.featured[0] === 'true'
    })
    const inEvidenzaLocalizzato = findItemTranslated(inEvidenza[0].translations, locale)
    const novita = dataMega.directus.Prodotti.sort((item) => { if (item.type === "machinery") { return item.date_create } else { return item } })
    const novitaLocalizzato = findItemTranslated(novita[novita.length - 1].translations, locale)
    const software = dataMega.directus.Prodotti.filter((item) => item.type === "software")


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
                                    {Termini[locale].novita}
                                </div>
                                <div className="content-mega">
                                    <>
                                        {novitaLocalizzato && <div>
                                            <Link to={`/${(langTag[locale] === 'it') ? '' : langTag[locale] + '/'}${Termini[locale].prodotti}/${novitaLocalizzato.slug}`}>
                                                <h2>{novitaLocalizzato.titolo}</h2>
                                            </Link>
                                            <p>{novitaLocalizzato.sottotitolo && summary(novitaLocalizzato.sottotitolo, 120)}</p>
                                        </div>}
                                        <GatsbyImage image={novita[novita.length - 1].immagine.imageFile.childImageSharp.gatsbyImageData} alt={novita[0].titolo} />

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
                                    {Termini[locale].in_evidenza}
                                </div>
                                {inEvidenzaLocalizzato &&
                                    <div className="content-mega">
                                        <div>
                                            <Link to={`/${(langTag[locale] === 'it') ? '' : langTag[locale] + '/'}${Termini[locale].prodotti}/${inEvidenzaLocalizzato.slug}`}>
                                                <h2>{inEvidenzaLocalizzato.titolo}</h2>
                                            </Link>
                                            <p>{inEvidenzaLocalizzato.sottotitolo && summary(inEvidenzaLocalizzato.sottotitolo, 120)}</p>
                                        </div>
                                        <GatsbyImage image={inEvidenza[0].immagine.imageFile.childImageSharp.gatsbyImageData} alt={inEvidenzaLocalizzato.titolo} />

                                    </div>}
                            </div>
                        </motion.div>
                        <motion.div className="col-mega list"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.5
                            }} >
                            <div className="titolo-col-mega">
                                {Termini[locale].applicazione}
                            </div>
                            <ul className="mega-list">
                                {listaApplicazioni && listaApplicazioni.map((item) => item &&
                                    <li>
                                        <Link to={`${locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + language + "/" + terminiTraduzione.prodotti}`} state={{ applicazione: item.label }}
                                            className="mega-item">{item.label}</Link></li>
                                )}
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
                                {Termini[locale].tipologia}
                            </div>
                            <ul className="mega-list">
                                {listaCategorie && listaCategorie.map((item) => item && <li>
                                    <Link to={`${locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + language + "/" + terminiTraduzione.prodotti}`} state={{ categoria: item.nome }}
                                        className="mega-item">{item.nome}</Link></li>
                                )}
                            </ul>
                            <div className="titolo-col-mega software">
                                Software
                            </div>
                            <ul className="mega-list">
                                {software.map((item) => {
                                    const traduzioni = findItemTranslated(item.translations, locale)

                                    if (traduzioni) {
                                        return (<li>
                                            <Link to={`${locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + language + "/" + terminiTraduzione.prodotti}/${traduzioni.slug}`}
                                                className="mega-item">{traduzioni.titolo}</Link></li>)
                                    } else {
                                        return null
                                    }
                                })}
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MegamenuDirectus