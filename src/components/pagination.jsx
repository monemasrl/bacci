import React from 'react'


const Pagination = ({ postsPerPage, totalPosts, paginate, topArchivio }) => {
    const { useState } = React
    const [activePage, setActivePage] = useState('')

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (

        <div className="wrapperpagination">
            {pageNumbers.length > 1 &&
                <ul className="pagination-list">
                    {
                        pageNumbers.map((item) => {
                            return <li key={item}
                                className={
                                    item === activePage ? 'active' : ''
                                }
                                onClick={() => {
                                    setActivePage(item)
                                    paginate(item)

                                }}>{item}</li>
                        })
                    }
                </ul>

            }

        </div>
    )
}
export default Pagination