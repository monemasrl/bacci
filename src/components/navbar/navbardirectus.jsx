import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
//import Megamenu from '../megamenu/megamenu'
import MegamenuDirectus from '../megamenu/megamenudir'
import { Termini, langTag } from '../../../data-translations'
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
                                return (
                                    <li key={itemTranslated.label}>
                                        <Link to={`${langTag[props.locale] === 'it' ? '' : '/' + langTag[props.locale]}/${itemTranslated.slug.toLowerCase()}`}>{itemTranslated.label.toLowerCase()}</Link>
                                    </li>
                                )
                            })


                            }
                        </ul>}

                    <LangSwitcher allPagePath={props.allPagePath} locale={props.locale} pathName={props.pathName} />

                </div>

            </nav>
            <nav className='container-fluid mainmenu'>
                <div className="container">

                    <div className="main-logo">
                        <Link to={`${langTag[props.locale] === 'it' ? '/' : '/' + langTag[props.locale] + '/'}`}>
                            <StaticImage
                                placeholder="none"
                                width={362}
                                src="../../images/logo_scuro.jpg" alt="Bacci logo" />
                        </Link>

                    </div>
                    {data.directus.menus[0] &&

                        <ul>
                            {data.directus.menus[0].items.map((item) => {

                                const itemTranslated = item.translations.find((lang) => {
                                    return langTag[lang.languages_code.code] === langTag[props.locale]
                                })

                                return (
                                    < >
                                        {item.id === '2' ? <li key={item.id} role="button" tabIndex={0} onMouseEnter={() => props.setMega(true)}
                                            onMouseLeave={() => props.setMega(true)}>
                                            <div className={`main-mega  ${props.mega ? 'open' : ''}${props.currentPath === itemTranslated.slug ? 'active' : ''}`} ><a href="#">{itemTranslated.label}</a>
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
                                            <li key={item.id}>
                                                {item.sub_items.length ? <a href='#'>{itemTranslated.label}</a> : <Link to={`/${langTag[itemTranslated.languages_code.code] === 'it' ? '' : langTag[itemTranslated.languages_code.code] + '/'}${itemTranslated.slug.toLowerCase()}`}>{itemTranslated.label}</Link>} {item.sub_items ? <ul>
                                                    {item.sub_items.map((subitem) => {
                                                        const subItemTranslated = subitem.translations.find((lang) => {
                                                            return langTag[lang.languages_code.code] === langTag[props.locale]
                                                        })
                                                        return (
                                                            <li key={subItemTranslated.label}><Link to={`${langTag[subItemTranslated.languages_code.code] === 'it' ? '' : '/' + langTag[subItemTranslated.languages_code.code]}/${itemTranslated.slug.toLowerCase()}/${subItemTranslated.slug}`}>
                                                                {subItemTranslated.label}
                                                            </Link>
                                                            </li>
                                                        )

                                                    })}
                                                </ul> : ''}</li>}
                                    </>
                                )
                            })}
                        </ul>}
                </div>
            </nav>
        </>
    )
}

export default NavBarDirectus