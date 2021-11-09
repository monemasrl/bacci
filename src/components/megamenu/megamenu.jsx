import React from "react";
import { motion, AnimatePresence } from "framer-motion"
import { StaticImage } from "gatsby-plugin-image";
import './megamenu.scss'

const Megamenu = ({ mega, setMega }) => {

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
                                    <h2>Master Max</h2>
                                    <p>Centro di lavoro a 6 assi con struttura a portale</p>
                                    <StaticImage
                                        src="../../images/test-megamenu.jpg"
                                        width={422}
                                        placeholder="none"
                                        alt="test-megamenu"
                                    />
                                    <p>
                                        <strong>Indicata per la produzione di: </strong>
                                        elementi di sedie, tavoli, letti, scocche, componenti di scale e strumenti musicali.
                                    </p>
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
                                <div  className="content-mega">
                                    <h2>Master Max</h2>
                                    <p>Centro di lavoro a 6 assi con struttura a portale</p>
                                    <StaticImage
                                        src="../../images/test-megamenu.jpg"
                                        width={422}
                                        placeholder="none"
                                        alt="test-megamenu"
                                    />
                                    <p>
                                        <strong>Indicata per la produzione di:<br /></strong>
                                        elementi di sedie, tavoli, letti, scocche, componenti di scale e strumenti musicali.
                                    </p>
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
                                <li>CENTRI DI LAVORO DOPPIA TESTA</li>
                                <li>CENTRI DI LAVORO A PORTALE</li>
                                <li>CENTRI DI LAVORO A MONTANTE MOBILE</li>
                                <li>CENTRI DI LAVORO A PORTALE EVOLUTI</li>
                                <li>CENTRI DI LAVORO PER COMPOSITI</li>
                                <li>MACCHINE PER ANTINE</li>
                                <li>MACCHINE PER PORTE E FINESTRE</li>
                                <li>FRESATRICI LINEARI</li>
                                <li>TORNITURA</li>
                                <li>CONVENZIONALI</li>
                                <li>SEGHE</li>
                            </ul>
                        </motion.div>
                    </div>

                </motion.div>

            )}
        </AnimatePresence>

    )
}

export default Megamenu