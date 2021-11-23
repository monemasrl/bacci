import React from "react";
import './breadcrumb.scss';
import {Termini} from "../../../data-translations"

const Breadcrumb = ({ pageTitle, pathName, nodeType, fiere, locale, tipo }) => {
    console.log(pathName);
    const parentFolder = pathName ? pathName : ''


    return (
        <div className="container-fluid breadcrumb">

            <div className="container">



                {(nodeType === 'Post') ?
                    <h2>
                        <span>/News<br /></span>
                        <span>{pageTitle}</span>
                    </h2>

                    : fiere ?
                        <h2>
                            {Termini[locale].eventi}
                        </h2>

                        : tipo === 'prodotto' ?  <h2>/{Termini[locale].macchine}</h2> :

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