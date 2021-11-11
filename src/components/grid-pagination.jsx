import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import Pagination from "./pagination"



const GridPagination = ({ archivio, topArchivio }) => {
    const { useState, useRef, useEffect } = React
    const [posts, setPosts] = useState(() => archivio)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(2)
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirsPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirsPost, indexOfLastPost)


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        setPosts(archivio)
        setCurrentPage(1)
    }, [archivio])

    var slugify = require('slugify')

   
    return (
        <>
            {currentPosts.map((item) => {
               
                return (
                    <div key={item.title} className="box-prodotto">
                        <GatsbyImage image={item.node.prodotto.immagine.localFile.childImageSharp.gatsbyImageData} alt={item.node.prodotto.immagine.altText} />
                        <h2>{item.node.title}</h2>
                        <p>{item.node.prodotto.paragrafo}</p>
                        <div className="button"><Link to={item.node.title}>scopri</Link></div>
                    </div>
                )
            })}
            <div className="break"></div>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} topArchivio={topArchivio} />
        </>
    )
}


export default GridPagination