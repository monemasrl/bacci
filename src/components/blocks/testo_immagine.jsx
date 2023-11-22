import * as React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { slugify } from "../../utils"
function TestoImmagine({ index, allineamento, content }) {

    if (allineamento === 'left') {
        return (
            <section className={`container sezione-1 ${allineamento} ${content.item.novita ? 'seznovita' : ''} ${'index-' + index}`}>
                {content.item.traduzioni.length > 0 && <>
                    <div className={`box-sx`} >
                        {content.item.novita && <div className="novita">Novità</div>}
                        <h2 className="titoli" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                        <p>{content.item.traduzioni[0].paragrafo}</p>
                        {content.item.link && <Link className="button-sezione" to={content.item.link.translations[0].slug}>{content.item.link.translations[0].slug}</Link>}
                    </div>

                    {content.item.immagine && <div className="box-dx">
                        <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                    </div>}</>}
            </section>
        )
    }
    if (allineamento === 'center') {
        return (<section id={`${slugify(content.item.nome).toLowerCase()}`} className={`container sezione-3 ${allineamento}`}>
            {content.item.traduzioni.length > 0 && <>
                <div className={`box-sx `} >
                    <h2 dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                    {content.item.traduzioni[0].sotto_titolo && <h3 dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].sotto_titolo }} />}
                    {content.item.immagine && <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />}
                </div>

                <div className="box-dx">

                    <p dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].paragrafo }} />

                    {content.item.link && <Link className="button-sezione" to={content.item.link.translations[0].slug}>{content.item.link.translations[0].slug}</Link>}

                </div>
            </>}
        </section>)
    }
    if (allineamento === 'right') {
        return (<section className={`container sezione-1 ${allineamento} ${content.item.novita ? 'seznovita' : ''} ${'index-' + index}`}>
            {content.item.traduzioni.length > 0 && <>
                <div className={`box-sx`} >
                    {content.item.novita && <div className="novita">Novità</div>}
                    {index === 0 ?
                        <h1 className="titolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                        :
                        <h2 className="titoli" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />}
                    <p>{content.item.traduzioni[0].paragrafo}</p>
                    {content.item.link && <Link className="button-sezione" to={content.item.link.translations[0].slug}>{content.item.link.translations[0].slug}</Link>}
                </div>

                {content.item.immagine && <div className="box-dx">
                    <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                </div>}</>}
        </section>)
    }
}
export default TestoImmagine