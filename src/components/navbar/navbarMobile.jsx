import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../../data-translations'
import LangSwitcher from '../langSwitcher'
import { StaticImage } from "gatsby-plugin-image"
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
                        <Link to={`${langTag[props.locale] === 'it' ? '/' : '/' + langTag[props.locale] + '/'}`}>
                            <StaticImage
                                placeholder="none"
                                width={362}
                                src="../../images/logo.png" alt="Bacci logo" />
                        </Link>

                    </div>
                    <div className="hamburger" tabindex={0} onClick={() => setOpen(!open)} >
                        <span>  <StaticImage
                            placeholder="none"
                            width={30}
                            src="../../images/mobile.svg" alt="hamburger" /></span>
                    </div>
                </div>

                <div className={`container-mobile ${open ? 'open' : ''}`}>
                    <nav className="container-fluid top-menu-mobile">
                        <div className="container">
                            <LangSwitcher locale={props.locale} allPagePath={props.allPagePath} pathName={props.pathName} />

                            {menuFilter[1] && <ul>
                                {menuFilter[1].node.menuItems.nodes.map((item, index) => {

                                    const menuPath = slugify(item.label)

                                    return (
                                        <li key={item.label}>
                                            <Link disabled={item.path === "#"} to={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${menuPath.toLowerCase()}`}>{item.label}</Link>
                                        </li>
                                    )
                                })


                                }
                            </ul>}


                        </div>

                    </nav>
                    <nav className='container-fluid mainmobile'>
                        <div className="container">


                            {menuFilter[0] && <ul>

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
                                                            <>
                                                                <a disabled={item.path === "#"} to={item.path}> {item.label} </a>

                                                                {item.childItems ?
                                                                    <ul>
                                                                        {item.childItems.nodes.map((subitem, index) => {
                                                                            return (
                                                                                <li key={index}>
                                                                                    <Link key={subitem.label} to={`${item.menu.node.language === 'it' ? '' : '/' + item.menu.node.language}/${item.label.toLowerCase()}/${slugify(subitem.label.toLowerCase())}`}>  {subitem.label} </Link></li>


                                                                            )

                                                                        })}
                                                                    </ul>
                                                                    : ''}</>

                                                            : <Link to="/"> {item.label} </Link>
                                                        }

                                                    </li> : ''
                                            }
                                        </React.Fragment>
                                    )
                                })}
                            </ul>}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default NavBarMobile