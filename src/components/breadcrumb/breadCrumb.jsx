import React from "react";
import './breadcrumb.scss'
const Breadcrumb = ({ pageTitle, pathName }) => {
    const parentFolder= pathName.substr(0, pathName.lastIndexOf('/'))
  
    return (

        <div className="container-fluid breadcrumb">

            <div className="container">
                <h2><span>{parentFolder}</span><br />{pageTitle}</h2>
            </div>

        </div>

    )
}

export default Breadcrumb