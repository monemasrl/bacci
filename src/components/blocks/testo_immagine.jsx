import * as React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { slugify } from "../../utils"
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

function TestoImmagine({ index, allineamento, content }) {
    const left = useRef(null)
    const center = useRef(null)
    const right = useRef(null)
    const isInViewLeft = useInView(left, { once: true });
    const isInViewCenter = useInView(center, { once: true });
    const isInViewRight = useInView(right, { once: true });

    if (allineamento === 'left') {
        return (
            <motion.section ref={left} className={`container sezione-1 ${allineamento} ${content.item.novita ? 'seznovita' : ''} ${'index-' + index}`}
                animate={isInViewLeft ? {
                    opacity: 1, y: 0,
                    transition: {
                        duration: 1,
                    }
                } : { opacity: 0, y: 100 }}

            >
                {content.item.traduzioni.length > 0 && <>
                    <div className={`box-sx`} >
                        {content.item.novita && <div className="novita">Novità</div>}
                        <h2 className="titoli" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                        <h3 className="sottotitolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].sotto_titolo }} />
                        <p>{content.item.traduzioni[0].paragrafo}</p>
                        {content.item.traduzioni[0].url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}
                    </div>

                    {content.item.immagine && <div className="box-dx">
                        <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                    </div>}</>}
            </motion.section>
        )
    }
    if (allineamento === 'center') {
        return (<motion.section ref={center} id={`${slugify(content.item.nome).toLowerCase()}`} className={`container sezione-3 ${allineamento}`}
            animate={isInViewCenter ? {
                opacity: 1, y: 0,
                transition: {
                    duration: 1,
                }
            } : { opacity: 0, y: 100 }}>
            {content.item.traduzioni.length > 0 && <>
                <div className={`box-sx `} >
                    <h2 dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                    {content.item.traduzioni[0].sotto_titolo && <h3 dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].sotto_titolo }} />}
                    {content.item.immagine && <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />}
                </div>

                <div className="box-dx">
                    <p dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].paragrafo }} />
                    {content.item.traduzioni[0].url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}
                </div>
            </>}
        </motion.section>)
    }
    if (allineamento === 'right') {
        return (<motion.section ref={right} className={`container sezione-1 ${allineamento} ${content.item.novita ? 'seznovita' : ''} ${'index-' + index}`}
            animate={isInViewRight ? {
                opacity: 1, y: 0,
                transition: {
                    duration: 1,
                }
            } :
                { opacity: 0, y: 100 }}>

            {content.item.traduzioni.length > 0 && <>
                <div className={`box-sx`} >
                    {content.item.novita && <div className="novita">Novità</div>}
                    {index === 0 ?
                        <h1 className="titolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                        :
                        <h2 className="titoli" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />}
                    <h3 className="sottotitolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].sotto_titolo }} />
                    <p>{content.item.traduzioni[0].paragrafo}</p>
                    {content.item.traduzioni[0].url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}
                </div>

                {content.item.immagine && <div className="box-dx">
                    <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={'test'} />
                </div>}</>}
        </motion.section>)
    }
}
export default TestoImmagine