import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
import './footer.scss'
var slugify = require('slugify')

const Footer = () => {

    return (
        <footer>
            <section className='container-fuid footer1 '>
                <div className='container'>
                    <div className="box-sx">
                        <h2>Hai bisogno di <strong>informazioni?</strong></h2>
                        <p>Se desideri avere maggiori informazioni sulla nostra Azienda
                            e sui nostri prodotti, scrivici compilando il form.
                            il nostro Staff ti risponderà presto!</p>
                    </div>
                    <div className="box-dx">
                        <div className="form-contatti">

                            <form method="POST" name="contatti" action="/thanks" netlify-honeypot="bot-field" data-netlify="true">
                                <input type="hidden" name="form-name" value="contatti" />
                                <div className="box-form">
                                    <label htmlFor="nome">
                                        <input placeholder="nome" type="text" name="nome" id="nome" required />
                                    </label>
                                    <label htmlFor="cognome">
                                        <input placeholder="cognome" type="url" name="url" id="cognome" />
                                    </label>
                                </div>
                                <div className="box-form">
                                    <label htmlFor="azienda">
                                        <input placeholder="azienda" type="text" name="azienda" id="azienda" required />
                                    </label>
                                    <label htmlFor="email">
                                        <input placeholder="email" type="text" name="email" id="email" required />
                                    </label>
                                </div>
                                <div className="box-form-message">
                                    <label htmlFor="messaggio">
                                        <textarea rows={6} placeholder="messaggio" name="messaggio" id="messaggio" required />
                                    </label>
                                </div>
                                <label htmlFor="privacy">
                                    <input type="checkbox" placeholder="privacy" name="privacy" id="privacy" required />
                                    <span>Accettazione della <Link to="/privacy"> Privacy</Link></span>
                                </label>
                                <div className="box-submit">
                                    <label htmlFor="submit">
                                        <input className='button-sezione' type="submit" value="invia" name="submit" />
                                    </label>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </section>
            <section className='container footer2'>
                <div className="footer-col">test</div>
                <div className="footer-col">test</div>
                <div className="footer-col">test</div>
                <div className="footer-col">test</div>
                <div className="footer-col">test</div>
                <div className="footer-col">test</div>
            </section>
            <section className='container footer3'></section>
        </footer>
    )

}

export default Footer