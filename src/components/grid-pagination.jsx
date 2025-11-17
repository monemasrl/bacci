import * as React from "react"
import { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Termini, langTag } from "../../data-translations"
import { Link } from "gatsby"
import Pagination from "./pagination"
import { findItemTranslated, summary } from "../utils"
import 'moment/locale/it'

const moment = require('moment')


const GridPagination = ({ pagePath, pageName, archivio, topArchivio, lang, postPerPage = 10, locationState = {} }) => {
    const [posts, setPosts] = useState(archivio)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(postPerPage)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirsPost = indexOfLastPost - postsPerPage
    const currentPosts = posts?.slice(indexOfFirsPost, indexOfLastPost) || []

    moment.locale(langTag[lang])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        setPosts(archivio)
        setCurrentPage(1)
    }, [archivio])


    if (pageName === 'prodotti') {
        return (
            <>
                {currentPosts?.length ? currentPosts.map((item) => {
                    const translated = findItemTranslated(item.translations, lang)
                    if (translated.titolo) {

                        return (
                            <div key={translated.titolo} className="box-prodotto">
                                {item.immagine?.imageFile && <div className="thumb">
                                    <GatsbyImage image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={item.immagine.description || 'Bacci website image'} />
                                </div>}
                                <h2>{translated.titolo}</h2>
                                <p>{translated.testo_antemprima && summary(translated.testo_antemprima, 120)}</p>
                                <Link className="button-sezione" lista to={`${(langTag[translated.languages_code.code] === 'it') ? "/" : "/" + langTag[translated.languages_code.code] + "/"}${Termini[translated.languages_code.code].prodotti + '/' + translated.slug}`} state={
                                    { applicazione: locationState.applicazione, categoria: locationState.categoria }
                                }>
                                    {Termini[translated.languages_code.code].scopri}</Link>
                            </div>
                        )
                    } else {
                        return null
                    }
                }) : <div>Loading...</div>}

                {(posts.length > postPerPage) && <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} topArchivio={topArchivio} />}
            </>
        )
    }

    if (pageName === 'news') {

        return (
            <>
                {currentPosts?.length && currentPosts.map((item, index) => {
                    const translated = findItemTranslated(item.translations, lang)
                    const data = new Date(Date.parse(item.date_published))
                    console.log('data news', item)
                    if (translated?.title) {
                        return (
                            <div key={index} className="col-3">
                                <div className="box-single-news">
                                    {item.image?.imageFile && <GatsbyImage image={item.image.imageFile.childImageSharp.gatsbyImageData} alt={translated.title} />}
                                    <div className="box-correlati">
                                        <div className="date">
                                            {moment(data).locale(lang).format('DD.MM.YYYY')}
                                        </div>
                                        <h2>{translated.title}</h2>
                                        <p dangerouslySetInnerHTML={{ __html: translated.summary ? summary(translated.summary, 120) : '' }} />
                                        <Link to={`${langTag[translated.languages_code.code] === 'it' ? '/' : '/' + langTag[translated.languages_code.code] + '/'}${'news/'}${translated.slug}`}>leggi tutto</Link>
                                    </div>
                                </div>
                            </div>)
                    } else {
                        return null
                    }
                })}
                <div className="break"></div>
                {posts?.length && <Pagination postsPerPage={postsPerPage} totalPosts={posts?.length} paginate={paginate} topArchivio={topArchivio} />}
            </>
        )

    }
    if (pageName === 'fiere') {

        return (
            <>
                {currentPosts?.length && currentPosts.map((item, index) => {
                    const itemLinkNoHTTPS = item.link_fiera && item.link_fiera.replace(/^https?:\/\//, '');
                    const titleTranslated = findItemTranslated(item.title_translations, lang)
                    const dataFrom = new Date(Date.parse(item.from))
                    const dataTo = new Date(Date.parse(item.to))
                    const pathTranslated = pagePath.find((item) => item.locale === lang)
                    if (titleTranslated?.title) {
                        return (
                            <div className="col-3" key={index}>
                                <div className={`box-single-fiera ${item.type === 'event' ? 'evento' : ''}`}>
                                    <h2>{titleTranslated.title}</h2>
                                    <div className="datafiera">
                                        <span>{moment(dataFrom).locale(lang).format('DD')}</span> - &nbsp;
                                        <span>{moment(dataTo).locale(lang).format('DD MMMM YYYY')}</span>
                                    </div>
                                    <div className="position">{item.position && item.position}</div>
                                    <div className="luogo">{item.location && item.location}</div>
                                    {item.link_fiera && <a className="link" href={`${item.link_fiera}`} target="_blank" rel="noreferrer noopener">{itemLinkNoHTTPS}</a>}
                                    {item.page && <Link className="buttonLink" to={`${pathTranslated.path}/${titleTranslated.slug}`}>&#62;</Link>}
                                </div>

                            </div>)
                    } else {
                        return null
                    }
                })}
                <div className="break"></div>
                {(posts.length > postPerPage) && <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} topArchivio={topArchivio} />}
            </>
        )

    } else {
        return null
    }
}



export default GridPagination
