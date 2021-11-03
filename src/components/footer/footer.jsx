import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"
import './footer.scss'


const Footer = () => {
    const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }

    }
  `)
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
                <div className="footer-col">
                    <ul>
                        <li>Azienda</li>
                        <li>GRUPPO</li>
                        <li>MISSION</li>
                        <li>PRODUZIONE</li>
                        <li>STORIA</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <ul>
                        <li>macchine</li>
                        <li>FORATRICI</li>
                        <li>TORNITURA</li>
                        <li>FRESATURA</li>
                        <li>MORTASA/TELONE</li>
                        <li>DOPPIE TESTE</li>
                        <li>SPECIALI</li>
                        <li>MATERIALI COMPOSITI</li>

                    </ul>
                </div>
                <div className="footer-col">
                    <ul>
                        <li>tecnologia</li>
                        <li>RICERCA E SVILUPPO</li>
                        <li>TECNOLOGIE DISTINTIVE</li>
                        <li>COMPONENTI</li>
                        <li>PERSONALIZZAZIONE</li>
                        <li>SERVICE</li>
                        <li>SOFTWARE</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <ul>
                        <li>filiali</li>
                        <li>BACCI AMERICA</li>
                        <li>BACCI CHINA</li>

                    </ul>
                </div>
                <div className="footer-col">
                    <ul>
                        <li>contatti</li>
                        <li>richiedi informazioni</li>
                    </ul>
                </div>
                <div className="footer-col">
                    <ul>
                        <li>seguici su</li>
                        <li>Facebook</li>
                        <li>YouTube</li>
                    </ul>
                </div>
            </section>
            <section className='container-fluid footer3'>

                <div className="container">
                    <div className="footer-col">
                        <StaticImage
                            placeholder="none"
                            width={239}
                            src="../../images/logo-footer.png" alt="Bacci logo" />
                    </div>
                    <div className="footer-col">
                        <ul>
                            <li>Paolino Bacci S.r.l.</li>
                            <li>VIA PALERMO, 32, 56021, Cascina, Pisa - ITALY</li>
                            <li>Tel. + 39 050 252525</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <ul>
                            <li>Cap. Sociale 1.500.000,00 i.v. <br/> Partita iva / codice fiscale 022456588996365</li>
                            <li>
                                <Link to="/"> Privacy Policy</Link>	<Link to="/">Termini e condizioni</Link>	</li>
                        </ul>
                    </div>
                </div>

            </section>
        </footer>
    )

}

export default Footer