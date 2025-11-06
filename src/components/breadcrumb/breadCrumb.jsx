import React from "react";
import './breadcrumb.scss';
import { langTag, Termini } from "../../../data-translations"
import { navigate } from "gatsby"
import { Link } from "gatsby";
import { useLocation } from '@reach/router';

const Breadcrumb = ({ dataBreadCrumbFiere, pageTitle, pathName, nodeType, locale, tipo }) => {
    const location = useLocation()

    function breadCrumbTitle(pageTitle, termini) {
        if (pageTitle === 'News') {
            return 'Bacci News'
        }
        else if (pageTitle === 'Fiere' || pageTitle === 'Exhibitions') {
            return termini[locale].eventi
        }
        else { return pageTitle }
    }

    const handleKeyDown = (event, callback) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            callback();
        }
    };

    const parentFolder = pathName ? pathName : ''
    const parentFolderNoSlash = parentFolder.endsWith('/') ? parentFolder.slice(0, -1) : parentFolder
    const terminiTraduzione = Termini[locale]

    return (
        <div className="container-fluid breadcrumb" role="navigation" aria-label="Breadcrumb">
            <div className="container">
                {tipo === 'news' ?
                    <h2 className="newsh2">
                        <span
                            onClick={() => navigate(`${langTag[locale] === 'it' ? "/news" : "/" + langTag[locale] + "/" + Termini[locale][tipo]}`)}
                            onKeyDown={(e) => handleKeyDown(e, () => navigate(`${langTag[locale] === 'it' ? "/news" : "/" + langTag[locale] + "/" + Termini[locale][tipo]}`))}
                            role="button"
                            tabIndex="0"
                            aria-label={`Vai a ${Termini[locale][tipo]}`}
                        >
                            &#47;{Termini[locale][tipo]}<br />
                        </span>
                        <span aria-current="page">{pageTitle}</span>
                    </h2>
                    : tipo === 'caseHistory' ?
                        <h2 className="newsh2">
                            <span
                                onClick={() => navigate(`${langTag[locale] === 'it' ? "/case-history" : "/" + langTag[locale] + "/case-history"}`)}
                                onKeyDown={(e) => handleKeyDown(e, () => navigate(`${langTag[locale] === 'it' ? "/case-history" : "/" + langTag[locale] + "/case-history"}`))}
                                role="button"
                                tabIndex="0"
                                aria-label={`Vai a ${Termini[locale][tipo]}`}
                            >
                                &#47;{Termini[locale][tipo]}&#47;<br />
                            </span>
                            <span aria-current="page">{pageTitle}</span>
                        </h2>

                        : tipo === 'fiera' ?
                            <>
                                <h2 id="event-title">
                                    {Termini[locale].eventi}
                                </h2>
                                <div className="dataEventi" role="region" aria-labelledby="event-title" aria-label="Informazioni evento">
                                    <span aria-label="Nome evento">{pageTitle}</span>
                                    <span aria-label="Date evento">{dataBreadCrumbFiere.dataFrom}-{dataBreadCrumbFiere.dataTo}</span>
                                    <span aria-label="Luogo evento">{dataBreadCrumbFiere.location}</span>
                                </div>
                            </>

                            : tipo === 'prodotto' ?
                                <h2>
                                    <Link
                                        to={`${locale === "it_IT"
                                            ? "/" + terminiTraduzione.prodotti
                                            : "/" +
                                            langTag[locale] +
                                            "/" +
                                            terminiTraduzione.prodotti
                                            }`}
                                        state={location.state ? { ...location.state } : {}}
                                        className="prodotti"
                                        aria-label={`Vai alla sezione ${Termini[locale].prodotti}`}
                                    >
                                        <span>&#47;{Termini[locale].prodotti}</span>
                                    </Link>
                                    <span className="nomeProdotto" aria-current="page">{pageTitle}</span>
                                </h2> :

                                (pageTitle.toLowerCase() === parentFolder.toLowerCase()) || !parentFolder ?
                                    <h2 id="page-title">{breadCrumbTitle(pageTitle, Termini)}</h2>
                                    :
                                    <h2>
                                        <span aria-label="Sezione corrente">&#47;{parentFolder && parentFolderNoSlash}&#47; <br /></span>
                                        <span aria-current="page">{pageTitle}</span>
                                    </h2>
                }
            </div>
        </div>
    )
}

export default Breadcrumb