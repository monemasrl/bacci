import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
import LinkFade from "../TransitionLinks/LinkFade"
import Megamenu from '../megamenu/megamenu'
import { Termini } from '../../../data-translations'
import './navbar.scss'
let slugify = require('slugify')


const NavBar = (props) => {



    const data = useStaticQuery(graphql`
    query datimenu{
        allWpMenu {
                edges {
                node {
                    language
                    menuItems {
                    nodes {
                        label
                        parentId
                        path
                        childItems {
                          nodes {
                            label
                            path
                            parent{
                                id
                            }
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

    return (
        <>
            <nav className="container-fluid top-menu">
                <div className="container">

                    <ul>
                        {menuFilter[1].node.menuItems.nodes.map((item, index) => {

                            const menuPath = slugify(item.label)

                            return (
                                <li key={item.label}>
                                    <LinkFade disabled={item.path === "#"} url={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${menuPath.toLowerCase()}`}>{item.label}</LinkFade>
                                </li>
                            )
                        })


                        }
                    </ul>

                    <LangSwitcher locale={props.locale} translations={props.translations} pathName={props.pathName} />

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
                    <ul>

                        {menuFilter[0].node.menuItems.nodes.map((item, index) => {

                            const menuPath = slugify(item.label)

                            return (
                                <React.Fragment key={item.label}>

                                    {!item.parentId ?

                                        item.menuCampi.megamenu ?
                                            <li
                                                onMouseEnter={() => props.setMega(true)}
                                                onMouseLeave={() => props.setMega(false)}>
                                                <div className={`main-mega  ${props.mega ? 'open' : ''}${props.currentPath === item.label.toLowerCase() ? 'active' : ''}`}

                                                    href="#"><a href="#">{item.label}</a>
                                                </div>
                                                <Megamenu terminiTraduzione={terminiTraduzione} mega={props.mega} setMega={props.setMega} locale={props.locale} language={item.menu.node.language} /></li>
                                            :
                                            <li>
                                                {item.path === "#" ?

                                                    <a className={`${props.currentPath === item.label.toLowerCase() ? 'active' : ''}`} disabled={item.path === "#"} to={item.path}>{item.label}

                                                        {item.childItems ?
                                                            <ul>
                                                                {item.childItems.nodes.map((subitem) => {
                                                                    console.log('subitem', subitem);
                                                                    return (
                                                                        <>
                                                                            <li> <LinkFade key={subitem.label} url={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${item.label.toLowerCase()}/${slugify(subitem.label.toLowerCase())}`}>
                                                                                {subitem.label}
                                                                            </LinkFade>
                                                                            </li>
                                                                        </>)

                                                                })}
                                                            </ul>
                                                            : ''}

                                                    </a> : 
                                                    <LinkFade url={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${slugify(item.label.toLowerCase())}`}>
                                                        {item.label}
                                                    </LinkFade>
                                                }

                                            </li> : ''

                                    }
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar