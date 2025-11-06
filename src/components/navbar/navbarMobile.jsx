import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag, Termini } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
import './navbarMobile.scss'

const NavBarMobile = (props) => {
    const data = useStaticQuery(graphql`
    query datimenumobile{
   
        directus{
            
            menus{
                name
                items{
                id
                translations(filter: { creazione_pagina: { _eq: true } }){
                    languages_code{
                        code
                    }
                    label
                    slug
                    creazione_pagina
                }
                sub_items{
                    id
                    translations(filter: { creazione_pagina: { _eq: true } }){
                    languages_code{
                        code
                    }
                    label
                    slug
                    creazione_pagina
                    }
                    parent_item{
                    id
                    }
                }
                }
            }
            }
    
            }
    `)

    const [open, setOpen] = React.useState(false)

    const handleKeyDown = (event, callback) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            callback();
        }
    };

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <>
            <div className="mobile">
                <div className="top-box">
                    <div className="main-logo">
                        <Link
                            to={`${langTag[props.locale] === 'it' ? '/' : '/' + langTag[props.locale] + '/'}`}
                            aria-label="Vai alla homepage di Bacci"
                        >
                            <StaticImage
                                placeholder="none"
                                width={362}
                                src="../../images/logo_scuro.jpg"
                                alt="Logo Bacci"
                            />
                        </Link>
                    </div>

                    <button
                        type="button"
                        className="hamburger"
                        aria-label={open ? "Chiudi menu" : "Apri menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={toggleMenu}
                        onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <StaticImage
                            placeholder="none"
                            width={30}
                            src="../../images/mobile.svg"
                            alt="menu mobile icon"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div
                    id="mobile-menu"
                    className={`container-mobile ${open ? 'open' : ''}`}
                    role="region"
                    aria-label="Menu di navigazione mobile"
                >
                    <nav className="container-fluid top-menu-mobile" role="navigation" aria-label="Menu secondario mobile">
                        <div className="container">
                            <LangSwitcher locale={props.locale} allPagePath={props.allPagePath} pathName={props.pathName} />

                            {data.directus.menus[1] && (
                                <ul role="menubar">
                                    {data.directus.menus[1].items.map((item, index) => {
                                        const itemTranslated = item.translations.find((lang) => {
                                            return langTag[lang.languages_code.code] === langTag[props.locale]
                                        })

                                        if (!itemTranslated?.slug) {
                                            return null;
                                        }
                                        if (item.sub_items.length > 0) {
                                            return (
                                                <li key={item.id + 'sub'} role="none">
                                                    <span role="menuitem" aria-haspopup="true">
                                                        {itemTranslated.label}
                                                    </span>
                                                    <ul role="menu" aria-label={`Sottomenu di ${itemTranslated.label}`}>
                                                        {item.sub_items.map((subitem, subIndex) => {
                                                            const subItemTranslated = subitem.translations.find((lang) => {
                                                                return langTag[lang.languages_code.code] === langTag[props.locale]
                                                            })

                                                            if (!subItemTranslated?.slug) return null;

                                                            return (
                                                                <li key={subIndex} role="none">
                                                                    <Link
                                                                        role="menuitem"
                                                                        to={`${langTag[
                                                                            subItemTranslated.languages_code.code
                                                                        ] === 'it'
                                                                            ? ''
                                                                            : '/' +
                                                                            langTag[
                                                                            subItemTranslated
                                                                                .languages_code.code
                                                                            ]
                                                                            }/${itemTranslated.slug.toLowerCase()}/${subItemTranslated.slug
                                                                            }`}
                                                                    >
                                                                        {subItemTranslated.label}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )
                                        }
                                        return (
                                            <li key={item.id + 'main'} role="none">
                                                <Link
                                                    role="menuitem"
                                                    to={`/${langTag[itemTranslated.languages_code.code] === 'it'
                                                        ? ''
                                                        : langTag[itemTranslated.languages_code.code] + '/'
                                                        }${itemTranslated.slug.toLowerCase()}`}
                                                    onClick={() => setOpen(false)}
                                                >
                                                    {itemTranslated?.label}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </nav>

                    <nav className='container-fluid mainmobile' role="navigation" aria-label="Menu principale mobile">
                        <div className="container">
                            {data.directus.menus[0] && (
                                <ul role="menubar">
                                    {data.directus.menus[0].items.map((item, index) => {
                                        const itemTranslated = item.translations.find((lang) => {
                                            return (langTag[lang.languages_code.code] === langTag[props.locale]) && lang.creazione_pagina
                                        })

                                        if (!itemTranslated) return null;

                                        return (
                                            <React.Fragment key={index}>
                                                <li role="none">
                                                    {(item.sub_items?.length && itemTranslated && itemTranslated.creazione_pagina) ? (
                                                        <span role="menuitem" aria-haspopup="true">
                                                            {itemTranslated.label}
                                                        </span>
                                                    ) : itemTranslated?.slug && (
                                                        <Link
                                                            role="menuitem"
                                                            to={`/${langTag[itemTranslated.languages_code.code] === 'it' ? '' : langTag[itemTranslated.languages_code.code] + '/'}${itemTranslated?.slug.toLowerCase()}`}
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            {itemTranslated.label}
                                                        </Link>
                                                    )}

                                                    {item.sub_items?.length > 0 && itemTranslated?.slug && (
                                                        <ul role="menu" aria-label={`Sottomenu di ${itemTranslated.label}`}>
                                                            {item.sub_items.map((subitem, subIndex) => {
                                                                const subItemTranslated = subitem.translations.find((lang) => {
                                                                    return (langTag[lang.languages_code.code] === langTag[props.locale]) && lang.creazione_pagina
                                                                })

                                                                if (!subItemTranslated?.slug) return null;

                                                                return (
                                                                    <li key={subIndex} role="none">
                                                                        <Link
                                                                            role="menuitem"
                                                                            to={`${langTag[subItemTranslated.languages_code?.code] === 'it' ? '' : '/' + langTag[subItemTranslated.languages_code?.code]}/${itemTranslated.slug.toLowerCase()}/${subItemTranslated.slug}`}
                                                                            onClick={() => setOpen(false)}
                                                                        >
                                                                            {subItemTranslated.label}
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    )}
                                                </li>
                                            </React.Fragment>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default NavBarMobile