import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
//import Megamenu from '../megamenu/megamenu'
import MegamenuDirectus from '../megamenu/megamenudir'
import { Termini, langTag } from '../../../data-translations'
import './navbar.scss'
import { getParentPathFromMenu, createPathFromMenu } from '../../utils'


function getSlugFromHref(tHref) {
    const arrayFromHref = tHref.split("/").slice(-2)
    return arrayFromHref[0]
}

const NavBarDirectus = (props) => {

    const data = useStaticQuery(graphql`
    query datimenu{
        allWpPage{
            edges {
                node{
                    title
                    slug
                    locale {
                        locale
                    }
                    translations{
                    locale
                    post_title
                    href
                  }
                }
            }
        }
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
        allWpMenu {
                edges {
                node {
                    language
                    menuItems {
                    nodes {
                        id
                        label
                        parentId
                        path
                        childItems {
                          nodes {
                            label
                            path
                         parentId
                          }
                        }
                        menu {
                        node {
                            language
                        }
                        }
                        menuCampi {
                              megamenu
                            }
                    }
                    }
                }
                }
            }
            }
    `)


    const terminiTraduzione = Termini[props.locale]
    console.log(data.directus.menus, 'directus')
    console.log(data.allWpMenu.edges, 'wp menu')
    console.log(createPathFromMenu(data.allWpPage.edges, data.allWpMenu.edges, 'home', 'it_IT'), 'test')
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
                                        <Link to={`${props.locale === 'it_IT' ? '' : '/' + props.locale}/${itemTranslated.slug}`}>{itemTranslated.label}</Link>
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
                                src="../../images/logo.png" alt="Bacci logo" />
                        </Link>

                    </div>
                    {data.directus.menus[0] &&

                        <ul>
                            {data.directus.menus[0].items.map((item) => {

                                const itemTranslated = item.translations.find((lang) => {
                                    return langTag[lang.languages_code.code] === langTag[props.locale]
                                })
                                console.log(item, 'item')
                                return (
                                    <React.Fragment key={item.label}>

                                        {item.id === '2' ? <li role="button" tabIndex={0} onMouseEnter={() => props.setMega(true)}
                                            onMouseLeave={() => props.setMega(false)}>
                                            <div className={`main-mega  ${props.mega ? 'open' : ''}${props.currentPath === itemTranslated.slug ? 'active' : ''}`} ><a href="#">{itemTranslated.label}</a>
                                            </div>
                                            {/*     <Megamenu terminiTraduzione={terminiTraduzione} mega={props.mega} setMega={props.setMega} locale={props.locale} language={langTag[itemTranslated.languages_code.code]} /> */}
                                            <MegamenuDirectus terminiTraduzione={terminiTraduzione} mega={props.mega} setMega={props.setMega} locale={props.locale} language={langTag[itemTranslated.languages_code.code]} />

                                        </li> :
                                            <li>
                                                <a href='#'>{itemTranslated.label}</a> {item.sub_items ? <ul>
                                                    {item.sub_items.map((subitem) => {
                                                        const subItemTranslated = subitem.translations.find((lang) => {
                                                            return langTag[lang.languages_code.code] === langTag[props.locale]
                                                        })
                                                        console.log(subItemTranslated, 'subitem')
                                                        return (
                                                            <li key={subItemTranslated.label}><Link to={`${langTag[subItemTranslated.languages_code.code] === 'it' ? '' : '/' + langTag[subItemTranslated.languages_code.code]}/${itemTranslated.slug}/${subItemTranslated.slug}`}>
                                                                {subItemTranslated.label}
                                                            </Link>
                                                            </li>
                                                        )

                                                    })}
                                                </ul> : ''}</li>}
                                    </React.Fragment>
                                )
                            })}
                        </ul>}
                </div>
            </nav>
        </>
    )
}

export default NavBarDirectus