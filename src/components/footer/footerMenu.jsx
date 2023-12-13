import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { findItemTranslated, findItemsTranslated } from "../../utils"
import { Link } from "gatsby"
import { langTag } from "../../../data-translations"
import { GrLink, GrLinkedin, GrYoutube } from "react-icons/gr";


function FooterMenu({ locale }) {
    const data = useStaticQuery(graphql`
    query HeaderQuery {
            directus{        
                prodotto_categorie_translations{
                            languages_code{
                            code
                            }
                            nome
                        }
                menus{
                    name
                    items(filter: {_and:[{_or: [{name: {_eq: "Azienda"}},{name: {_eq: "Prodotti"}}, {name: {_eq: "Tecnologia"}}, {name: {_eq: "Filiali"}}, {name: {_eq: "Contatti"}}]}]}){
                        name
                        translations{
                            languages_code{
                            code
                            }
                            slug
                            label
                        }
                        sub_items{
                        translations{
                            languages_code{
                            code
                            }
                            slug
                            label
                        }
                        }
                    }
                }
                social{
                        social
                        }
        }
    }
  `)
    const vociMenu = () => {
        let arrayVociMenu = []
        data.directus.menus.forEach((item) => {
            arrayVociMenu.push(...item.items)
        })

        const arrayOrdinatoVociMenu = []

        arrayVociMenu.forEach((item) => {
            if (item.name === 'Azienda') {
                arrayOrdinatoVociMenu[0] = item
            }
            if (item.name === 'Prodotti') {
                arrayOrdinatoVociMenu[1] = item
            }
            if (item.name === 'Tecnologia') {
                arrayOrdinatoVociMenu[2] = item
            }
            if (item.name === 'Filiali') {
                arrayOrdinatoVociMenu[3] = item
            }
            if (item.name === 'Contatti') {
                arrayOrdinatoVociMenu[4] = item
            }
        })
        return arrayOrdinatoVociMenu
    }


    return (<section className='container footer2'>


        {vociMenu().map((item) => {
            if (item.name === 'Azienda' || item.name === 'Tecnologia') {
                const parentItemTranslated = findItemTranslated(item.translations, locale)

                return (
                    <div className="footer-col">
                        <ul>
                            <li>{parentItemTranslated.label}</li>
                            {item.sub_items.map((subitem) => {
                                const itemTranslated = findItemTranslated(subitem.translations, locale)
                                if (itemTranslated) {
                                    return (
                                        <li key={itemTranslated.label}>
                                            <Link to={"/" + `${langTag[locale] === 'it' ? '' : langTag[locale] + "/"}${parentItemTranslated ? parentItemTranslated.label.toLowerCase() + "/" : ''}${itemTranslated.slug.toLowerCase()}`}>{itemTranslated.label.toLowerCase()}</Link>
                                        </li>
                                    )
                                }
                            })}

                        </ul>
                    </div>
                )

            }
            if (item.name === 'Prodotti') {
                const parentItemTranslated = findItemTranslated(item.translations, locale)
                const listaCategorieTranslated = findItemsTranslated(data.directus.prodotto_categorie_translations, locale)
                console.log(listaCategorieTranslated, 'listaCategorieTranslated')
                if (parentItemTranslated) {
                    return (
                        <div className="footer-col">
                            <ul>
                                <li>{parentItemTranslated.label}</li>
                                {listaCategorieTranslated.map((subitem) => {
                                    return <li key={subitem.nome} ><Link to={"/" + `${langTag[locale] === 'it' ? '' : langTag[locale] + "/"}${parentItemTranslated ? parentItemTranslated.label.toLowerCase() + "/" : ''}`} state={{ categoria: subitem.nome }}>{subitem.nome}</Link></li>
                                })}
                            </ul>
                        </div>
                    )
                }

            }

            if (item.name === 'Filiali' || item.name === 'Contatti') {
                const parentItemTranslated = findItemTranslated(item.translations, locale)
                if (parentItemTranslated) {
                    return (
                        <div className="footer-col">
                            <ul>
                                <li> <Link to={"/" + `${langTag[locale] === 'it' ? '' : langTag[locale] + "/"}${parentItemTranslated ? parentItemTranslated.label.toLowerCase() + "/" : ''}`}>{parentItemTranslated.label.toLowerCase()}</Link></li>
                            </ul>
                        </div>
                    )
                }
            }

        })}
        <div className="footer-col">
            <ul className="social">
                <li>Follow us</li>
                {data.directus.social.social.map((item) => {
                    return (
                        <li key={item.nome}>
                            <a href={item.url} target="_blank" rel="noreferrer">
                                {item.nome === 'Youtube' && <GrYoutube />}
                                {item.nome === 'Linkedin' && <GrLinkedin />}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>


    </section>)
}

export default FooterMenu