import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
import Megamenu from '../megamenu/megamenu'
import { Termini } from '../../../data-translations'
import './navbar.scss'
import { getParentPathFromMenu, createPathFromMenu } from '../../utils'

let slugify = require('slugify')

const langCode = {
    "it-IT": 'it_IT',
    "en-US": 'en_US',
}

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
                                    return langCode[lang.languages_code.code] === props.locale
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
                                    return langCode[lang.languages_code.code] === props.locale
                                })
                                console.log(item, 'item')
                                return (
                                    <React.Fragment key={item.label}>

                                        {item.id === '2' ? <li role="button" tabIndex={0} onMouseEnter={() => props.setMega(true)}
                                            onMouseLeave={() => props.setMega(false)}>
                                            <div className={`main-mega  ${props.mega ? 'open' : ''}${props.currentPath === itemTranslated.slug ? 'active' : ''}`} ><a href="#">{itemTranslated.label}</a>
                                            </div>
                                            <Megamenu terminiTraduzione={terminiTraduzione} mega={props.mega} setMega={props.setMega} locale={props.locale} language={langCode[itemTranslated.languages_code.code]} /></li> :
                                            <li>
                                                <a href='#'>{itemTranslated.label}</a> {item.sub_items ? <ul>
                                                    {item.sub_items.map((subitem) => {
                                                        const subItemTranslated = subitem.translations.find((lang) => {
                                                            return langCode[lang.languages_code.code] === props.locale
                                                        })
                                                        console.log(subItemTranslated, 'subitem')
                                                        return (
                                                            <li key={subItemTranslated.label}><Link to={`${langCode[subItemTranslated.languages_code.code] === 'it_IT' ? '' : '/' + langCode[subItemTranslated.languages_code.code]}/${itemTranslated.slug}/${subItemTranslated.slug}`}>
                                                                {subItemTranslated.label}
                                                            </Link>
                                                            </li>
                                                        )

                                                    })}
                                                </ul> : ''}</li>}

                                        {/*    {!item.parentId ?
                                            item.menuCampi.megamenu ?
                                                <li role="button" tabIndex={0} onMouseEnter={() => props.setMega(true)}
                                                    onMouseLeave={() => props.setMega(false)}>
                                                    <div className={`main-mega  ${props.mega ? 'open' : ''}${props.currentPath === item.label.toLowerCase() ? 'active' : ''}`} ><a href="#">{item.label}</a>
                                                    </div>
                                                    <Megamenu terminiTraduzione={terminiTraduzione} mega={props.mega} setMega={props.setMega} locale={props.locale} language={item.menu.node.language} /></li>
                                                :
                                    <li>
                                    {item.path === "#" ?
                                            <>
                            <a className={`${props.currentPath === item.label.toLowerCase() ? 'active' : ''}`} disabled={item.path === "#"} to={item.path}>{item.label}</a>

                                                {item.childItems ?
                                                            <ul>
                                    {item.childItems.nodes.map((subitem) => {

                                                            return (

                    <li key={subitem.label}><Link to={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${getParentPathFromMenu(props.locale, subitem.label, data.allWpMenu.edges)}${getSlugFromHref(subitem.path)}`}>
                                            {subitem.label}
                                                                            </Link>
                                                                            </li>
                                                                        )

                                                                    })}
                                                                </ul>
                                                                : ''}</>

                                                        :
                                                        <Link to={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${slugify(item.label.toLowerCase())}`}>
                                                            {item.label}
                                                        </Link>
                                                    }

                                                </li> : ''

                                        } */}
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