import * as React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { slugify } from "../../utils"
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

function TestoImmagine({ index, allineamento, content, pageName }) {
    const left = useRef(null)
    const center = useRef(null)
    const right = useRef(null)
    const isInViewLeft = useInView(left, { once: true });
    const isInViewCenter = useInView(center, { once: true });
    const isInViewRight = useInView(right, { once: true });

    if (allineamento === 'left') {
        return (
            <motion.section key={index} ref={left} className={`container sezione-1 ${allineamento} ${content.item.novita ? 'seznovita' : ''} ${'index-' + index}`}
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
                        <div className="heading">
                            <h2 className="titoli" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />
                            <h3 className="sottotitolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].sotto_titolo }} />
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].paragrafo }} />
                        {content.item.traduzioni[0].url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}
                    </div>
                    {content.item.images && <div className="image-gallery">
                        {content.item.images.map((item, index) => {
                            return <div key={index} className="boxImage">
                                <GatsbyImage image={item.directus_files_id.imageFile.childImageSharp.gatsbyImageData} alt={item.description || 'Bacci website image'} />
                            </div>
                        })}
                    </div>}

                    {content.item.immagine && <div className="box-dx">
                        <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={content.item.immagine.description || 'Bacci website image'} />
                    </div>}</>}
            </motion.section>
        )
    }
    if (allineamento === 'center') {
        return (<motion.section key={index} ref={center} id={`${slugify(content.item.nome).toLowerCase()}`} className={`container-fluid sezione-3 ${allineamento} ${pageName}`}
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

                </div>
                <div className="box-immagine">
                    {content.item.immagine && <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={content.item.immagine.description || 'Bacci website image'} />}
                </div>
                <div className="box-dx">
                    <p dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].paragrafo }} />
                    {content.item.traduzioni[0].url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}
                </div>
            </>}
        </motion.section>)
    }
    if (allineamento === 'right') {
        return (<motion.section key={index} ref={right} className={`container sezione-1 ${allineamento} ${content.item.novita ? 'seznovita' : ''} ${'index-' + index}`}
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
                    {index === 0 &&
                        <h1 className="titolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />}
                    <div className="heading">
                        {index !== 0 && <h2 className="titoli" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].titolo }} />}
                        <h3 className="sottotitolo" dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].sotto_titolo }} />
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: content.item.traduzioni[0].paragrafo }} />
                    {content.item.traduzioni[0].url && <Link className="button-sezione" to={content.item.traduzioni[0].url}>{content.item.traduzioni[0].link_label}</Link>}
                </div>

                {content.item.immagine && <div className="box-dx">
                    <GatsbyImage image={content.item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={content.item.immagine.description || 'Bacci website image'} />
                </div>}</>}
        </motion.section>)
    }
}
export default TestoImmagine