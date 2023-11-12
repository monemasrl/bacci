import * as React from "react"
import { useEffect, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Termini, langTag } from "../../data-translations"
import { Link } from "gatsby"
import Pagination from "./pagination"
import { findItemTranslated } from "../utils"



const GridPagination = ({ archivio, topArchivio, lang }) => {
    console.log(archivio, 'archivio')
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(2)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirsPost = indexOfLastPost - postsPerPage
    const currentPosts = (indexOfLastPost && indexOfFirsPost && (posts.length > 2)) ? posts.slice(indexOfFirsPost, indexOfLastPost) : posts
    console.log(posts, 'currentPosts')
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

    return (
        <>
            {currentPosts && currentPosts.map((item) => {
                const translated = findItemTranslated(item.translations, lang)
                return (
                    <div key={translated.titolo} className="box-prodotto">
                        <GatsbyImage image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={translated.titolo} />
                        <h2>{translated.titolo}</h2>
                        <p>{translated.paragrafo}</p>
                        <Link className="button-sezione" lista to={`${(langTag[translated.languages_code.code] === 'it') ? "/" : "/" + langTag[translated.languages_code.code] + "/"}${Termini[translated.languages_code.code].prodotti + '/' + translated.slug}`}>

                            scopri</Link>
                    </div>
                )
            })}
            <div className="break"></div>
            {<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} topArchivio={topArchivio} />}
        </>
    )
}


export default GridPagination