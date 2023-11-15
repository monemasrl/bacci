import * as React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

function TestoImmagineHome({ index, allineamento, content }) {

    if (allineamento === 'left') {
        return (
            <section className={`container sezione-1 ${content.item.novita ? 'seznovita' : ''} ${'index-' + index}`}>
                {content.item.traduzioni.length > 0 && <>
                    <div className={`box-sx`} >
                        {content.item.novita && <div className="novita">Novità</div>}
                        {index === 0 ?
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                            :
                            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />}
                        <p>{content.item.traduzioni[0].paragrafo}</p>
                        {content.item.link && <Link className="button-sezione" to={content.item.link.translations[0].slug}>{content.item.link.translations[0].slug}</Link>}
                    </div>

                    <div className="box-dx">
                        <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                    </div></>}
            </section>
        )
    }
    if (allineamento === 'center') {
        return (<section className={`container sezione-3`}>
            {content.item.traduzioni.length > 0 && <>
                <div className={`box-sx `} >
                    <h2 dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                    <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />

                </div>

                <div className="box-dx">
                    <p dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].paragrafo }} />

                    {content.item.link && <Link className="button-sezione" to={content.item.link.translations[0].slug}>{content.item.link.translations[0].slug}</Link>}

                </div>
            </>}
        </section>)
    }
}
export default TestoImmagineHome