import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, Link, graphql } from "gatsby";
import { Termini, langTag } from "../../../data-translations";
import { findItemTranslated } from "../../utils";
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
            }`)




    const novita = dataMega.directus.Prodotti.sort((item) => item.date_create)

    const inEvidenza = dataMega.directus.Prodotti.filter((item) => item.featured[0] === 'true')
    const inEvidenzaLocalizzato = findItemTranslated(inEvidenza[0].translations, locale)
    const novitaLocalizzato = findItemTranslated(novita[0].translations, locale)


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
                                    {Termini[locale].in_evidenza}
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
                                {Termini[locale].applicazione}
                            </div>
                            <ul className="mega-list">
                                {listaApplicazioni.map((item) =>
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
                                {listaCategorie.map((item) => <li>
                                    <Link to={`${locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + language + "/" + terminiTraduzione.prodotti}`} state={{ categoria: item.nome }}
                                        className="mega-item">{item.nome}</Link></li>
                                )}
                            </ul>


                            {/* PULSANTE A TUTTI I PRODOTTI
                            <Link className="tutti-prodotti" to={`${locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + language + "/" + terminiTraduzione.prodotti}`}>{terminiTraduzione.tutti_prodotti}</Link> */}


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