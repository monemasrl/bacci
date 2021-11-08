import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
import LinkFade from "../TransitionLinks/LinkFade"
import Megamenu from '../megamenu/megamenu'
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
console.log('path', item.label);
                            return (
                                <React.Fragment key={item.label}>
                                    
                                    {!item.parentId ?

                                        item.menuCampi.megamenu ?
                                            <li
                                                onMouseOver={() => props.setMega(true)}
                                                onMouseLeave={() => props.setMega(false )}>
                                                <a className={`main-mega ${props.currentPath === item.label.toLowerCase() ? 'active' : ''}`}

                                                    href="#">{item.label}</a>
                                                <Megamenu mega={props.mega} setMega={props.setMega} /></li> 
                                                :
                                            <li >
                                                <Link className={`${props.currentPath === item.label.toLowerCase() ? 'active' : ''}`} disabled={item.path === "#"} to={item.path}>{item.label}

                                                    {item.childItems ?
                                                        <ul>
                                                            {item.childItems.nodes.map((subitem) => {
                                                                return (
                                                                    <>
                                                                        <LinkFade key={subitem.label} url={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${item.label.toLowerCase()}/${slugify(subitem.label.toLowerCase())}`}>
                                                                            <li>   {subitem.label}</li>
                                                                        </LinkFade>

                                                                    </>)

                                                            })}
                                                        </ul>
                                                        : ''}

                                                </Link>
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