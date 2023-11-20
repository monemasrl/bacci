import * as React from "react"
import { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Termini, langTag } from "../../data-translations"
import { Link } from "gatsby"
import Pagination from "./pagination"
import { findItemTranslated } from "../utils"
const moment = require('moment')



const GridPagination = ({ pagePath, pageName, archivio, topArchivio, lang, postPerPage = 2 }) => {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(postPerPage)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirsPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirsPost, indexOfLastPost)

    useEffect(() => {
        setPosts(archivio)
    }, [])




    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        setPosts(archivio)
        setCurrentPage(1)
    }, [archivio])

    console.log(currentPosts, 'archivio')


    if (pageName === 'prodotti') {
        return (
            <>
                {currentPosts && currentPosts.map((item) => {
                    const translated = findItemTranslated(item.translations, lang)

                    return (
                        <div key={translated.titolo} className="box-prodotto">
                            {item.immagine && <GatsbyImage image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={translated.titolo} />}
                            <h2>{translated.titolo}</h2>
                            <p>{translated.paragrafo}</p>
                            <Link className="button-sezione" lista to={`${(langTag[translated.languages_code.code] === 'it') ? "/" : "/" + langTag[translated.languages_code.code] + "/"}${Termini[translated.languages_code.code].prodotti + '/' + translated.slug}`}>

                                scopri</Link>
                        </div>
                    )
                })}
                <div className="break"></div>
                {(posts.length > postPerPage) && <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} topArchivio={topArchivio} />}
            </>
        )
    }

    if (pageName === 'news') {
        return (
            <>
                {currentPosts && currentPosts.map((item) => {
                    const translated = findItemTranslated(item.translations, lang)
                    const data = new Date(Date.parse(item.date_created))
                    console.log(pagePath, 'translated')
                    const pathTranslated = pagePath.find((item) => item.locale === lang)
                    return (
                        <div className="col-3">
                            <div className="box-single-news">
                                {item.image && <GatsbyImage image={item.image.imageFile.childImageSharp.gatsbyImageData} alt={translated.title} />}
                                <div className="date">
                                    {moment(data).locale(lang).format('DD MMMM YYYY')}
                                </div>
                                <h2>{translated.title}</h2>
                                <p dangerouslySetInnerHTML={{ __html: translated.summary }} />
                                <Link to={`${pathTranslated.path}${translated.slug}`}>leggi tutto</Link>
                            </div>
                        </div>)
                })}
                <div className="break"></div>
                {<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} topArchivio={topArchivio} />}
            </>
        )

    }
    if (pageName === 'fiere') {
        return (
            <>
                {currentPosts && currentPosts.map((item) => {
                    const translated = findItemTranslated(item.translations, lang)
                    const dataFrom = new Date(Date.parse(item.from))
                    const dataTo = new Date(Date.parse(item.to))
                    console.log(pagePath, 'translated')
                    const pathTranslated = pagePath.find((item) => item.locale === lang)
                    return (
                        <div className="col-3">
                            <div className="box-single-fiera">
                                <Link to={`${pathTranslated.path}${translated.slug}`}><h2>{translated.title}</h2></Link>
                                <div className="datafiera">
                                    <span>{moment(dataFrom).locale(lang).format('DD')}</span> - &nbsp;
                                    <span>{moment(dataTo).locale(lang).format('DD MMMM YYYY')}</span>
                                </div>
                                <div className="luogo">{item.location}</div>
                                <a className="link" href={item.link_fiera} target="_blank">{item.link_fiera}</a>
                            </div>
                        </div>)
                })}
                <div className="break"></div>
                {<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} topArchivio={topArchivio} />}
            </>
        )

    }
}



export default GridPagination
