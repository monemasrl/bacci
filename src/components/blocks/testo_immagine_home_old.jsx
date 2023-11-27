import * as React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

function TestoImmagineHome({ index, allineamento, content }) {
    const isInView = useRef(null)

    if (allineamento === 'left') {
        return (
            <motion.section ref={isInView}
                className={`container sezione-1 ${content.item.novita ? 'seznovita' : ''} ${'index-' + index}`}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            >
                {content.item.traduzioni.length > 0 && <>
                    <div className={`box-sx`} >
                        {content.item.novita && <div className="novita">Novità</div>}
                        {index === 0 ?
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                            :
                            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />}
                        <p>{content.item.traduzioni[0].paragrafo}</p>
                        {content.item.traduzioni[0].url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}
                    </div>

                    <div className="box-dx">
                        <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                    </div></>}
            </motion.section>
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

                    {content.item.traduzioni[0].url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}

                </div>
            </>}
        </section>)
    }
}
export default TestoImmagineHome