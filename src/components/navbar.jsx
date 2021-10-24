import React from 'react'
import { Link, StaticQuery, graphql, useStaticQuery } from 'gatsby'
import { langTag } from '../../data-translations'

var slugify = require('slugify')
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

const menuFilter = data.allWpMenu.edges.filter((lang)=>{  
return lang.node.language === langTag[props.locale] 
})

return (
    <>
            <ul>
               {menuFilter[0].node.menuItems.nodes.map((item) => {
                   console.log(item);
                    const menuPath = slugify(item.label)

                    return (
                        <li key={item.label}>
                            <Link to={`${item.menu.node.language ==='it' ? '' : '/'+item.menu.node.language}/${menuPath}`}>{item.label}</Link>
                        </li>

                    )
                })}  
            </ul>
        </>
    )
}

export default NavBar