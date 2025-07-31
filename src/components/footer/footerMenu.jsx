import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { findItemTranslated, findItemsTranslated } from "../../utils"
import { Link } from "gatsby"
import { langTag } from "../../../data-translations"
import { GrLinkedin, GrYoutube } from "react-icons/gr";


function FooterMenu({ locale, listaTipologia }) {

    const data = useStaticQuery(graphql`
        query HeaderQuery {
            directus {
                sedi {
                    tipo
                    nome_sede
                }
                prodotto_categorie_translations {
                    languages_code {
                        code
                    }
                    nome
                }
                menus {
                    name
                    items(
                        filter: {
                            _and: [
                                {
                                    _or: [
                                        { name: { _eq: "Azienda" } }
                                        { name: { _eq: "Prodotti" } }
                                        { name: { _eq: "Tecnologia" } }
                                        { name: { _eq: "Filiali" } }
                                        { name: { _eq: "contatti" } }
                                    ]
                                }
                            ]
                        }
                    ) {
                        name
                        translations {
                            languages_code {
                                code
                            }
                            slug
                            label
                        }
                        sub_items {
                            translations {
                                languages_code {
                                    code
                                }
                                slug
                                label
                            }
                        }
                    }
                }
                social {
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
            if (item.name === 'contatti') {
                arrayOrdinatoVociMenu[4] = item
            }
        })
        return arrayOrdinatoVociMenu
    }


    return (<section className='container footer2'>


        {vociMenu().map((item, index) => {
            if (item.name === 'Azienda' || item.name === 'Tecnologia') {
                const parentItemTranslated = findItemTranslated(item.translations, locale)

                if (parentItemTranslated.slug && item.sub_items.length > 0) {
                    return (
                        <div key={index} className="footer-col">
                            <ul>
                                <li>{parentItemTranslated.label}</li>
                                {item.sub_items.map((subitem, index) => {
                                    const itemTranslated = findItemTranslated(subitem.translations, locale)
                                    if (itemTranslated && itemTranslated.slug) {
                                        return (
                                            <li key={index}>
                                                <Link to={`/${langTag[locale] === 'it' ? '' : langTag[locale] + "/"}${parentItemTranslated ? parentItemTranslated?.label.toLowerCase() + "/" : ''}${itemTranslated?.slug.toLowerCase()}`}>{itemTranslated?.label.toLowerCase()}</Link>
                                            </li>
                                        )
                                    } else {
                                        return null
                                    }
                                })}

                            </ul>
                        </div>
                    )
                }

            }
            if (item.name === 'Prodotti') {
                const parentItemTranslated = findItemTranslated(item.translations, locale)
                const listaCategorieTranslated = findItemsTranslated(listaTipologia, locale)

                if (parentItemTranslated) {
                    return (
                        <div key={index} className="footer-col">
                            {parentItemTranslated.slug && < ul >
                                <li>{parentItemTranslated.label}</li>
                                {listaCategorieTranslated.map((subitem, index) => {
                                    if (subitem) { return <li key={index} ><Link to={`/${langTag[locale] === 'it' ? '' : langTag[locale] + "/"}${parentItemTranslated ? parentItemTranslated.label.toLowerCase() + "/" : ''}`} state={{ categoria: subitem.nome }}>{subitem.nome}</Link></li> }
                                    else { return null }
                                })}
                            </ul>}
                        </div>
                    )
                }

            }
            if (item.name === 'Filiali') {
                const parentItemTranslated = findItemTranslated(item.translations, locale)
                const sediTipo2 = data.directus.sedi.filter(sede => Number(sede.tipo) === 2)

                if (parentItemTranslated && sediTipo2.length > 0) {
                    return (
                        <div key={index} className="footer-col">
                            {parentItemTranslated.label && <ul>
                                <li>{parentItemTranslated.label}</li>
                                {sediTipo2.map((sede, idx) => (
                                    <li key={idx}>
                                        <Link to={`/${langTag[locale] === 'it' ? '' : langTag[locale] + "/"}${parentItemTranslated ? parentItemTranslated.label?.toLowerCase() + "/" : ''}`}>{sede.nome_sede}</Link>
                                    </li>
                                ))}
                            </ul>}
                        </div>
                    )
                }
            }
            if (item.name === 'contatti') {
                const parentItemTranslated = findItemTranslated(item.translations, locale)
                if (parentItemTranslated) {
                    return (
                        <div key={index} className="footer-col">
                            <ul>
                                <li> <Link to={`/${langTag[locale] === 'it' ? '' : langTag[locale] + "/"}${parentItemTranslated ? parentItemTranslated.label.toLowerCase() + "/" : ''}`}>{parentItemTranslated.label.toLowerCase()}</Link></li>
                            </ul>
                        </div>
                    )
                }
            }

            return null


        })}
        <div className="footer-col">
            <ul className="social">
                <li>Follow us</li>
                <li>
                    <ul className="social_list">
                        {data.directus.social?.social?.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item?.url && <a href={item.url} target="_blank" rel="noreferrer">
                                        {item.nome === 'Youtube' && <GrYoutube />}
                                        {item.nome === 'Linkedin' && <GrLinkedin />}
                                    </a>}
                                </li>
                            )
                        })}
                    </ul>
                </li>
            </ul>
        </div>


    </section >)
}

export default FooterMenu