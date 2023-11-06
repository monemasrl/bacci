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

function getSlugFromHref(tHref) {
    const arrayFromHref = tHref.split("/").slice(-2)
    return arrayFromHref[0]
}

const NavBar = (props) => {

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

    const menuFilter = data.allWpMenu.edges.filter((lang) => {
        return lang.node.language === langTag[props.locale]
    })

    const terminiTraduzione = Termini[props.locale]
    console.log(createPathFromMenu(data.allWpPage.edges, data.allWpMenu.edges, 'home', 'it_IT'), 'test')
    return (
        <>
            <nav className="container-fluid top-menu">
                <div className="container">
                    {menuFilter[1] &&
                        <ul>

                            {menuFilter[1].node.menuItems.nodes.map((item) => {

                                const menuPath = slugify(item.label)

                                return (
                                    <li key={item.label}>
                                        {
                                            item.path === '#'
                                                ?
                                                <Link to={'#'}>{item.label}</Link>
                                                :
                                                <Link to={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${menuPath.toLowerCase()}`}>{item.label}</Link>
                                        }
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
                    {menuFilter[0] &&

                        <ul>

                            {menuFilter[0].node.menuItems.nodes.map((item) => {


                                return (
                                    <React.Fragment key={item.label}>

                                        {!item.parentId ?

                                            item.menuCampi.megamenu ?
                                                <li tabindex={0} onMouseEnter={() => props.setMega(true)}
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

                                        }
                                    </React.Fragment>
                                )
                            })}
                        </ul>}
                </div>
            </nav>
        </>
    )
}

export default NavBar