import React from 'react';
import {Link} from 'gatsby'
import {langTag } from '../../data-translations';
var slugify = require('slugify')

const LangSwitcher = (props)=>{
const url = slugify(props.translations[0].post_title)
const lang = {
  en_US: 'en',
  it_IT: 'it'
}

    return(
        <ul className="languages">

        <li>{props.locale}</li>
        <li><Link to={`${langTag[props.translations[0].locale] === 'it' ? '':'/'+langTag[props.translations[0].locale]}/${url}`}>{props.translations[0].locale}</Link></li>

      </ul>
    )
}

export default LangSwitcher