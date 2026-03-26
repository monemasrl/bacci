import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"
import './footer.scss'
import FooterMenu from './footerMenu'
import { FormContatti } from '../form'
import { Termini } from '../../../data-translations'
import { langTag } from '../../../data-translations'
import { useStaticQuery, graphql } from "gatsby"
const Footer = ({ locale, listaTipologia }) => {
    const data = useStaticQuery(graphql`
    {
       directus{
         Prodotti {
       name
        }
        configuration{
            accessibilita_it{
                filename_download
                filename_disk
            }
            accessiblita_eng{
                filename_download
                filename_disk
            }
     
        }
       }
    }
  `)

    return (
        <footer>
            <section className='container-fuid footer1 '>
                <div className='container'>
                    <div className="box-sx" dangerouslySetInnerHTML={{ __html: Termini[locale].footerForm }} />
                    <div className="box-dx">
                        <div className="form-contatti">
                            <FormContatti lang={locale} machines={data.directus.Prodotti} />
                        </div>
                    </div>
                </div>
            </section>
            <FooterMenu locale={locale} listaTipologia={listaTipologia} />
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
                            <li>Tel. + 39 050 75491</li>
                            <li className="certifications">          <a href="https://italy-x.ilsole24ore.com/azienda-certificata/paolino-bacci-srl/" target="_blank" rel="noreferrer noopener">
                                <StaticImage
                                    className='italyX'
                                    placeholder="blurred"
                                    width={300}
                                    height={195}
                                    src="../../images/italyxsmall.png" alt="ItalyX" />
                            </a>
                                <a href="https://www.unioncamere.gov.it/imprese-storiche/paolino-bacci-srl" target="_blank" rel="noreferrer noopener">
                                    <StaticImage
                                        className='italyX'
                                        placeholder="blurred"
                                        width={197}
                                        height={139}
                                        src="../../images/impresastorica.png" alt="impresastorica" />
                                </a></li>

                        </ul>
                    </div>
                    <div className="footer-col">
                        <ul>
                            <li className='fse'>{Termini[locale].footerFse}</li>
                            <li>Partita iva / codice fiscale 01591860505</li>
                            <li>
                                <Link to={`/${langTag[locale] === 'it' ? '' : langTag[locale] + "/"}privacy`}>privacy and conditions</Link>	</li>

                            {data.directus.configuration && data.directus.configuration.accessibilita_it && locale === 'it_IT' && <li><a href={'https://bacci-directus.monema.dev/assets/' + data.directus.configuration.accessibilita_it.filename_disk} target="_blank" rel="noreferrer noopener">{Termini[locale].accessibilita}</a></li>}
                            {data.directus.configuration && data.directus.configuration.accessiblita_eng && locale === 'en_US' && <li><a href={'https://bacci-directus.monema.dev/assets/' + data.directus.configuration.accessiblita_eng.filename_disk} target="_blank" rel="noreferrer noopener">{Termini[locale].accessibilita}</a></li>}
                        </ul>
                    </div>
                </div>

            </section>
        </footer>
    )

}

export default Footer