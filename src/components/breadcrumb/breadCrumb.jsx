import React from "react";
import './breadcrumb.scss';
import { langTag, Termini } from "../../../data-translations"
import { navigate } from "gatsby"

const Breadcrumb = ({ dataBreadCrumbFiere, pageTitle, pathName, nodeType, locale, tipo }) => {
    const parentFolder = pathName ? pathName : ''

    return (
        <div className="container-fluid breadcrumb">

            <div className="container">



                {tipo === 'news' ?
                    <h2 className="newsh2">
                        <span onClick={() => navigate(`${langTag[locale] === 'it' ? "/news" : "/" + langTag[locale] + "/news"}`)}> /News<br /></span>
                        <span>{pageTitle}</span>
                    </h2>

                    : tipo === 'fiere' ?
                        <>
                            <h2>
                                {Termini[locale].eventi}
                            </h2>
                            <div className="dataEventi">
                                <span>{pageTitle}</span>
                                <span>{dataBreadCrumbFiere.dataFrom}-{dataBreadCrumbFiere.dataTo}</span>
                                <span>{dataBreadCrumbFiere.location}</span>
                            </div>
                        </>


                        : tipo === 'prodotto' ? <h2>
                            <span>/{Termini[locale].prodotti}</span>
                            <span>{pageTitle}</span></h2> :

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