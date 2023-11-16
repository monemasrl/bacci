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
                    <div className="hamburger" role="button" tabIndex={0} onClick={() => setOpen(!open)} >
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

                            {data.directus.menus[1] && <ul>
                                {data.directus.menus[1].items.map((item, index) => {

                                    const itemTranslated = item.translations.find((lang) => {
                                        return langTag[lang.languages_code.code] === langTag[props.locale]
                                    })
                                    return (
                                        <li key={itemTranslated.label}>
                                            <Link to={`${langTag[props.locale] === 'it' ? '' : '/' + langTag[props.locale]}/${itemTranslated.slug}`}>{itemTranslated.label}</Link>
                                        </li>
                                    )
                                })


                                }
                            </ul>}


                        </div>

                    </nav>
                    <nav className='container-fluid mainmobile'>
                        <div className="container">


                            {data.directus.menus[0] && <ul>

                                {data.directus.menus[0].items.map((item, index) => {

                                    const itemTranslated = item.translations.find((lang) => {
                                        return langTag[lang.languages_code.code] === langTag[props.locale]
                                    })

                                    return (
                                        <React.Fragment key={item.label}>

                                            {item.id === '2' ?
                                                <li>
                                                    <Link to={`${props.locale === 'it_IT' ? '/' + terminiTraduzione.prodotti : '/' + itemTranslated.slug + "/" + terminiTraduzione.prodotti}`}>{itemTranslated.label}</Link>

                                                </li>

                                                :

                                                <li key={item.id}>
                                                    {item.sub_items.length ? <a href='#'>{itemTranslated.label}</a> : <Link to={`/${langTag[itemTranslated.languages_code.code] === 'it' ? '' : langTag[itemTranslated.languages_code.code] + '/'}${itemTranslated.slug}`}>{itemTranslated.label}</Link>} {item.sub_items ? <ul>
                                                        {item.sub_items.map((subitem) => {
                                                            const subItemTranslated = subitem.translations.find((lang) => {
                                                                return langTag[lang.languages_code.code] === langTag[props.locale]
                                                            })
                                                            return (
                                                                <li key={subItemTranslated.label}><Link to={`${langTag[subItemTranslated.languages_code.code] === 'it' ? '' : '/' + langTag[subItemTranslated.languages_code.code]}/${itemTranslated.slug}/${subItemTranslated.slug}`}>
                                                                    {subItemTranslated.label}
                                                                </Link>
                                                                </li>
                                                            )

                                                        })}
                                                    </ul> : ''}</li>
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