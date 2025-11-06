import React, { useState, useEffect, Fragment } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import LangSwitcher from '../langSwitcher'
import MegamenuDirectus from '../megamenu/megamenudir'
import { Termini, langTag } from '../../../data-translations'
import icon from '../../images/icon-menu.svg'
import logo from '../../images/logo.svg'
import './navbar.scss'

const NavBarDirectus = (props) => {

    const data = useStaticQuery(graphql`
        query datimenu {
            directus {
                menus {
                    name
                    items {
                        id
                        translations(filter: { creazione_pagina: { _eq: true } }) {
                            languages_code {
                                code
                            }
                            label
                            slug
                            creazione_pagina
                        }
                        sub_items {
                            id
                            translations(filter: { creazione_pagina: { _eq: true } }) {
                                languages_code {
                                    code
                                }
                                label
                                slug
                                creazione_pagina
                            }
                            parent_item {
                                id
                            }
                        }
                    }
                }
            }
        }
    `)


    const terminiTraduzione = Termini[props.locale]
    const [stickyClass, setStickyClass] = useState('relative');
    const [openSub, setOpenSub] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 200 ? setStickyClass('fixed') : setStickyClass('');
        }
    };
    /* translations: translationProdottiPage(
          result.data.directus.languages,
          langTag
        ), */

    const handleKeyDown = (event, callback) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            callback();
        }
    };

    const handleMouseEnter = (itemId) => {
        setOpenSub(itemId);
    };

    const handleMouseLeave = () => {
        setOpenSub(null);
    };

    return (
        <>
            <nav className="container-fluid top-menu" role="navigation" aria-label="Menu secondario">
                <div className="container">
                    {data.directus.menus &&
                        <ul role="menubar">
                            {data.directus.menus[1].items.map((item) => {
                                const itemTranslated = item.translations.find((lang) => {
                                    return (langTag[lang.languages_code.code] === langTag[props.locale]) && lang.creazione_pagina
                                })

                                if (itemTranslated?.slug && itemTranslated?.creazione_pagina) {
                                    return (
                                        <li
                                            role="none"
                                            key={item.id + 'main'}

                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {item.sub_items.length ? (
                                                <button
                                                    type="button"
                                                    role="menuitem"
                                                    aria-haspopup="true"
                                                    aria-expanded={item.id === openSub}
                                                    onClick={() => setOpenSub(item.id === openSub ? null : item.id)}
                                                    onKeyDown={(e) => handleKeyDown(e, () => setOpenSub(item.id === openSub ? null : item.id))}

                                                >
                                                    {itemTranslated.label}
                                                    <img src={icon} width="20" alt="icon" aria-hidden="true" />
                                                </button>
                                            ) : (
                                                itemTranslated.slug && (
                                                    <Link
                                                        role="menuitem"
                                                        to={`/${langTag[itemTranslated.languages_code.code] === 'it'
                                                            ? ''
                                                            : langTag[itemTranslated.languages_code.code] + '/'
                                                            }${itemTranslated.slug.toLowerCase()}`}
                                                    >
                                                        {itemTranslated.label}
                                                    </Link>
                                                )
                                            )}
                                            {item.sub_items.length ? (
                                                <ul
                                                    className={`${item.id === openSub ? 'open' : ''}`}
                                                    role="menu"
                                                    aria-label={`Sottomenu di ${itemTranslated.label}`}
                                                >
                                                    {item.sub_items.map((subitem) => {
                                                        const subItemTranslated = subitem.translations.find(
                                                            (lang) =>
                                                                (langTag[lang.languages_code.code] ===
                                                                    langTag[props.locale]) && lang.creazione_pagina
                                                        );

                                                        if (subItemTranslated?.slug) {
                                                            return (
                                                                <li key={subItemTranslated.label} role="none">
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
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    })}
                                                </ul>
                                            ) : null}
                                        </li>
                                    );
                                } else {
                                    return null
                                }
                            })}
                        </ul>}

                    <LangSwitcher allPagePath={props.allPagePath} locale={props.locale} pathName={props.pathName} />
                </div>
            </nav>

            <nav className={`container-fluid mainmenu ${stickyClass}`} role="navigation" aria-label="Menu principale">
                <div className="container">
                    <div className="main-logo">
                        <Link
                            to={`${langTag[props.locale] === 'it' ? '/' : '/' + langTag[props.locale] + '/'}`}
                            aria-label="Vai alla homepage di Bacci"
                        >
                            <img
                                width={362}
                                src={logo}
                                alt="Logo Bacci"
                            />
                        </Link>
                    </div>

                    {data.directus.menus[0] &&
                        <ul role="menubar">
                            {data.directus.menus[0].items.map((item) => {
                                const itemTranslated = item.translations.find((lang) => {
                                    return (langTag[lang.languages_code.code] === langTag[props.locale]) && lang.creazione_pagina
                                })

                                return (
                                    <Fragment key={item.id}>
                                        {item.id === '2' && itemTranslated ? (
                                            <li
                                                role="none"

                                                onMouseLeave={() => props.setMega(false)}
                                            >
                                                <button
                                                    type="button"
                                                    role="menuitem"
                                                    aria-haspopup="true"
                                                    aria-expanded={props.mega}
                                                    className={`main-mega ${props.mega ? 'open' : ''}${props.currentPath === itemTranslated.slug ? 'active' : ''}`}
                                                    onClick={() => props.setMega(!props.mega)}
                                                    onKeyDown={(e) => handleKeyDown(e, () => props.setMega(!props.mega))}

                                                >
                                                    {itemTranslated.label}
                                                    <img src={icon} width="20" alt="icon" aria-hidden="true" />
                                                </button>

                                                <MegamenuDirectus
                                                    terminiTraduzione={terminiTraduzione}
                                                    mega={props.mega}
                                                    setMega={props.setMega}
                                                    locale={props.locale}
                                                    language={langTag[itemTranslated.languages_code.code]}
                                                    listaApplicazioni={props.listaApplicazioni}
                                                    listaCategorie={props.listaCategorie}
                                                />
                                            </li>
                                        ) : (itemTranslated && itemTranslated.creazione_pagina) && (
                                            <li
                                                role="none"
                                                key={item.id}

                                                onMouseLeave={handleMouseLeave}
                                            >
                                                {item.sub_items.length && itemTranslated ? (
                                                    <button
                                                        type="button"
                                                        role="menuitem"
                                                        aria-haspopup="true"
                                                        aria-expanded={item.id === openSub}
                                                        onClick={() => setOpenSub(item.id === openSub ? null : item.id)}
                                                        onKeyDown={(e) => handleKeyDown(e, () => setOpenSub(item.id === openSub ? null : item.id))}

                                                    >
                                                        {itemTranslated.label}
                                                        <img src={icon} width="20" alt="icon" aria-hidden="true" />
                                                    </button>
                                                ) : itemTranslated.slug && (
                                                    <Link
                                                        role="menuitem"
                                                        to={`/${langTag[itemTranslated.languages_code.code] === 'it' ? '' : langTag[itemTranslated.languages_code.code] + '/'}${itemTranslated.slug.toLowerCase()}`}
                                                    >
                                                        {itemTranslated.label}
                                                    </Link>
                                                )}

                                                {item.sub_items ? (
                                                    <ul
                                                        className={`${item.id === openSub ? 'open' : ''}`}
                                                        role="menu"
                                                        aria-label={`Sottomenu di ${itemTranslated?.label || ''}`}
                                                    >
                                                        {item.sub_items.map((subitem) => {
                                                            const subItemTranslated = subitem.translations.find((lang) => {
                                                                return (langTag[lang.languages_code.code] === langTag[props.locale]) && lang.creazione_pagina
                                                            })
                                                            if (subItemTranslated?.slug) {
                                                                return (
                                                                    <li key={subItemTranslated.label} role="none">
                                                                        <Link
                                                                            role="menuitem"
                                                                            to={`${langTag[subItemTranslated.languages_code.code] === 'it' ? '' : '/' + langTag[subItemTranslated.languages_code.code]}/${itemTranslated.slug?.toLowerCase()}/${subItemTranslated.slug}`}
                                                                        >
                                                                            {subItemTranslated.label || ''}
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            } else {
                                                                return null
                                                            }
                                                        })}
                                                    </ul>
                                                ) : null}
                                            </li>
                                        )}
                                    </Fragment>
                                )
                            })}
                        </ul>}
                </div>
            </nav>
        </>
    )
}

export default NavBarDirectus