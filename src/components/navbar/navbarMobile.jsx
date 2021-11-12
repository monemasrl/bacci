import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
import LinkFade from "../TransitionLinks/LinkFade"
import Megamenu from '../megamenu/megamenu'
import { Termini } from '../../../data-translations'
import './navbarMobile.scss'
let slugify = require('slugify')


const NavBarMobile = (props) => {


    const data = useStaticQuery(graphql`
    query datimenumobile{
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
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <div className="mobile">

                <div className="top-box">
                    <div className="main-logo">
                        <LinkFade url={`${langTag[props.locale] === 'it' ? '/' : '/' + langTag[props.locale] + '/'}`}>
                            <StaticImage
                                placeholder="none"
                                width={362}
                                src="../../images/logo.png" alt="Bacci logo" />
                        </LinkFade>

                    </div>
                    <div className="hamburger" onClick={()=>setOpen(!open)} >
                       <span>  <StaticImage
                                placeholder="none"
                                width={30}
                                src="../../images/mobile.svg" alt="hamburger" /></span> 
                    </div>
                </div>

                <div className={`container-mobile ${open ? 'open': ''}`}>
                <nav className="container-fluid top-menu-mobile">
                    <div className="container">
                        <LangSwitcher locale={props.locale} translations={props.translations} pathName={props.pathName} />

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


                    </div>

                </nav>
                <nav className='container-fluid mainmobile'>
                    <div className="container">


                        <ul>

                            {menuFilter[0].node.menuItems.nodes.map((item, index) => {

                                const menuPath = slugify(item.label)

                                return (
                                    <React.Fragment key={item.label}>

                                        {!item.parentId ?
                                            item.menuCampi.megamenu ?
                                                <li>
                                                    <Link to={`${props.locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + item.menu.node.language + "/" + terminiTraduzione.prodotti}`}>{item.label}</Link>

                                                </li>

                                                :

                                                <li >
                                                    {item.path === "#" ?

                                                        <a  disabled={item.path === "#"} to={item.path}> {item.label}

                                                            {item.childItems ?
                                                                <ul>
                                                                    {item.childItems.nodes.map((subitem) => {
                                                                        return (
                                                                            <>

                                                                                <li>   <LinkFade key={subitem.label} url={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${item.label.toLowerCase()}/${slugify(subitem.label.toLowerCase())}`}>  {subitem.label} </LinkFade></li>


                                                                            </>)

                                                                    })}
                                                                </ul>
                                                                : ''}

                                                        </a> : <Link to="/"> {item.label} </Link>
                                                    }

                                                </li> : ''
                                        }
                                    </React.Fragment>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
                </div>
            </div>
        </>
    )
}

export default NavBarMobile