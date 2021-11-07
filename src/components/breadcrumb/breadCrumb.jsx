import React from "react";
import './breadcrumb.scss'
const Breadcrumb = ({ pageTitle, pathName, nodeType }) => {
    const parentFolder = pathName ? pathName : ''


    return (
        <div className="container-fluid breadcrumb">

            <div className="container">



                {(nodeType === 'Post') ?
                    <h2>
                        <span>/News<br /></span>
                        <span>{pageTitle}</span>
                    </h2>

                    :

                    (pageTitle.toLowerCase() === parentFolder.toLowerCase()) || !parentFolder ?

                        <h2>{pageTitle}</h2>

                        :

                        <h2>
                            <span>/{parentFolder}  <br /></span>
                            <span>{pageTitle}</span>
                        </h2>
                }


            </div>

        </div>

    )
}

export default Breadcrumb