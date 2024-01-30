import React from "react";
import './breadcrumb.scss';
import { langTag, Termini } from "../../../data-translations"
import { navigate } from "gatsby"

const Breadcrumb = ({ dataBreadCrumbFiere, pageTitle, pathName, nodeType, locale, tipo }) => {

    function breadCrumbTitle(pageTitle, termini) {
        if (pageTitle === 'News') {
            return 'Bacci News'
        }
        else if (pageTitle === 'Fiere' || pageTitle === 'Exhibitions') {
            return termini[locale].eventi
        }
        else { return pageTitle }
    }

    const parentFolder = pathName ? pathName : ''

    return (
        <div className="container-fluid breadcrumb">

            <div className="container">

                {tipo === 'news' || tipo === 'caseHistory' ?
                    <h2 className="newsh2">
                        <span onClick={() => navigate(`${langTag[locale] === 'it' ? "/news" : "/" + langTag[locale] + "/" + Termini[locale][tipo]}`)}> /{Termini[locale][tipo]}<br /></span>
                        <span>{pageTitle}</span>
                    </h2>
                    : tipo === 'fiera' ?
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

                                <h2>{breadCrumbTitle(pageTitle, Termini)}</h2>
                                :
                                <h2>
                                    <span>/{parentFolder && parentFolder}  <br /></span>
                                    <span>{pageTitle}</span>
                                </h2>
                }


            </div>

        </div>

    )
}

export default Breadcrumb