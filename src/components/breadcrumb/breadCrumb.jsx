import React from "react";
import './breadcrumb.scss'
const Breadcrumb = ({ pageTitle, pathName, nodeType }) => {
    const parentFolder = pathName ? pathName : ''


    return (
        <div className="container-fluid breadcrumb">

            <div className="container">

                <h2>

                    {(pageTitle.toLowerCase() === parentFolder.toLowerCase())  ?
                       
                       '' : pageTitle === 'post' ? <span>News<br /></span> :
                        
                        <span>/{parentFolder}  <br /></span>}

                    {pageTitle}</h2>

            </div>

        </div>

    )
}

export default Breadcrumb