import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
import LinkFade from "../TransitionLinks/LinkFade"
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
                        {menuFilter[1].node.menuItems.nodes.map((item) => {

                            const menuPath = slugify(item.label)
                            return (
                                <li key={item.label}>
                                    <Link disabled={item.path === "#"} to={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${menuPath.toLowerCase()}`}>{item.label}</Link>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='langbox' >
                        <LangSwitcher locale={props.locale} translations={props.translations} pathName={props.pathName} /></div>
                    </div>

            </nav>
            <nav className='container-fluid mainmenu'>
                <div className="container">

                    <div className="main-logo">
                        <Link  to={`${langTag[props.locale] === 'it' ? '/' : '/'+langTag[props.locale] + '/'}`}>
                            <StaticImage
                                placeholder="none"
                                width={362}
                                height={77} src="../../images/logo.png" alt="Bacci logo" />
                        </Link>

                    </div>
                    <ul>
   
                        {menuFilter[0].node.menuItems.nodes.map((item) => {

                            const menuPath = slugify(item.label)

                            return (
                                <React.Fragment key={item.label}>
                                    {!item.parentId ?
                                        <li >
                                            <Link disabled={item.path === "#"} to={item.path}>{item.label}

                                                {item.childItems ?
                                                    <ul>
                                                        {item.childItems.nodes.map((subitem) => {
                                                            return (
                                                                <>
                                                                <LinkFade  key={subitem.label} url={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${item.label.toLowerCase()}/${slugify(subitem.label.toLowerCase())}`}>
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