import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"
import './footer.scss'
import FooterMenu from './footerMenu'
import { FormContatti } from '../form'
import { Termini } from '../../../data-translations'



const Footer = ({ locale }) => {

    return (
        <footer>
            <section className='container-fuid footer1 '>
                <div className='container'>
                    <div className="box-sx" dangerouslySetInnerHTML={{ __html: Termini[locale].footerForm }} />

                    <div className="box-dx">
                        <div className="form-contatti">

                            <FormContatti lang={locale} />
                        </div>

                    </div>
                </div>
            </section>
            <FooterMenu locale={locale} />
            <section className='container-fluid footer3'>

                <div className="container">
                    <div className="footer-col">
                        <StaticImage
                            placeholder="blurred"
                            width={239}
                            height={50}
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
                            <li>Cap. Sociale 1.500.000,00 i.v. <br /> Partita iva / codice fiscale 022456588996365</li>
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