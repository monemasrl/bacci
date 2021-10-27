import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
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
                                    <Link to={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${menuPath}`}>{item.label}</Link>
                                </li>

                            )
                        })}
                    </ul>
                    <div className='langbox' >  <LangSwitcher locale={props.locale} translations={props.translations} /></div>
                </div>

            </nav>
            <nav className='container-fluid mainmenu'>
                <div className="container">

                    <div className="main-logo">

                        <StaticImage
                            placeholder="none"
                            layout="fixed"
                            width={362}
                            height={77} src="../../images/logo.png" alt="Bacci logo" />

                    </div>
                    <ul>
                        {menuFilter[0].node.menuItems.nodes.map((item) => {
                            console.log(item);
                            const menuPath = slugify(item.label)

                            return (
                                <>
                                    {!item.parentId ?
                                        <li key={item.label}>
                                            <Link to={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${menuPath}`}>{item.label}

                                                {item.childItems ?
                                                    <ul>
                                                        {item.childItems.nodes.map((subitem)=>{
                                                            return <li>
                                                                
                                                                
                                    <Link to={`/${item.label.toLowerCase()}/${subitem.label.toLowerCase()}`}>

                                                                {subitem.label}
                                                                </Link>
                                                                </li>
                                                        })}
                                                    </ul>
                                                    : ''}

                                            </Link>
                                        </li> : ''
                                    }
                                </>
                            )
                        })}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar