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
query datimenu{
    directus{

            menus{
                name
                items{
                id
                translations{
                    languages_code{
                        code
                    }
                    label
                    slug
                }
                sub_items{
                    id
                    translations{
                    languages_code{
                        code
                    }
                    label
                    slug
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


    return (
        <>
            <nav className="container-fluid top-menu">
                <div className="container">
                    {data.directus.menus &&
                        <ul>
                            {data.directus.menus[1].items.map((item) => {

                                const itemTranslated = item.translations.find((lang) => {
                                    return langTag[lang.languages_code.code] === langTag[props.locale]
                                })
                                if (itemTranslated.slug) {
                                    return (
                                        <li key={itemTranslated.label}>
                                            <Link to={`${langTag[props.locale] === 'it' ? '' : '/' + langTag[props.locale]}/${itemTranslated.slug.toLowerCase()}`}>{itemTranslated.label.toLowerCase()}</Link>
                                        </li>
                                    )
                                }
                            })


                            }
                        </ul>}

                    <LangSwitcher allPagePath={props.allPagePath} locale={props.locale} pathName={props.pathName} />

                </div>

            </nav>
            <nav className={`container-fluid mainmenu ${stickyClass}`}>
                <div className="container">
                    <div className="main-logo">
                        <Link to={`${langTag[props.locale] === 'it' ? '/' : '/' + langTag[props.locale] + '/'}`}>
                            <img
                                width={362}
                                src={logo} alt="Bacci logo" />
                        </Link>

                    </div>
                    {data.directus.menus[0] &&

                        <ul>
                            {data.directus.menus[0].items.map((item) => {

                                const itemTranslated = item.translations.find((lang) => {
                                    return langTag[lang.languages_code.code] === langTag[props.locale]
                                })

                                return (
                                    <Fragment key={item.id} >
                                        {item.id === '2' ?
                                            <li key={item.id} role="button" tabIndex={0} onClick={() => props.setMega(true)}
                                                onMouseLeave={() => props.setMega(false)}>
                                                <div className={`main-mega  ${props.mega ? 'open' : ''}${props.currentPath === itemTranslated.slug ? 'active' : ''}`} ><a>{itemTranslated.label}</a><img src={icon} width="20" alt="iconamenu" />
                                                </div>

                                                <MegamenuDirectus
                                                    terminiTraduzione={terminiTraduzione} mega={props.mega}
                                                    setMega={props.setMega}
                                                    locale={props.locale}
                                                    language={langTag[itemTranslated.languages_code.code]}
                                                    listaApplicazioni={props.listaApplicazioni}
                                                    listaCategorie={props.listaCategorie}

                                                />

                                            </li> :
                                            <li role="button" tabIndex={0} onClick={() => setOpenSub(item.id)} onMouseLeave={() => setOpenSub(null)} key={item.id}>
                                                {item.sub_items.length ? <a >{itemTranslated.label}<img src={icon} width="20" alt="iconamenu" /></a> :
                                                    itemTranslated.slug && <Link to={`/${langTag[itemTranslated.languages_code.code] === 'it' ? '' : langTag[itemTranslated.languages_code.code] + '/'}${itemTranslated.slug.toLowerCase()}`}>{itemTranslated.label}</Link>} {item.sub_items ? <ul className={`${item.id === openSub ? 'open' : ''}`}>
                                                        {item.sub_items.map((subitem) => {
                                                            const subItemTranslated = subitem.translations.find((lang) => {
                                                                return langTag[lang.languages_code.code] === langTag[props.locale]
                                                            })
                                                            if (subItemTranslated.slug) {
                                                                return (
                                                                    <li key={subItemTranslated.label}><Link to={`${langTag[subItemTranslated.languages_code.code] === 'it' ? '' : '/' + langTag[subItemTranslated.languages_code.code]}/${itemTranslated.slug.toLowerCase()}/${subItemTranslated.slug}`}>
                                                                        {subItemTranslated.label}
                                                                    </Link>
                                                                    </li>
                                                                )
                                                            }

                                                        })}
                                                    </ul> : ''}</li>}
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