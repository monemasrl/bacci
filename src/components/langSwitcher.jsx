import React from 'react';
import { Link } from 'gatsby'
import { langTag } from '../../data-translations';
var slugify = require('slugify')

const LangSwitcher = (props) => {

  const url = props.translations ? slugify(props.translations[0].post_title) : ''
  console.log(url);

  return (
    <>{
      <ul className="languages">

        <li>{props.locale}</li>
        props.translations ?
        <li><Link to={`${langTag[props.translations[0].locale] === 'it' ? '' : '/' + langTag[props.translations[0].locale]}/${url === 'Home' ? '' : url}`}>{props.translations[0].locale}</Link></li>
        : ''


      </ul>
    }
    </>
  )
}

export default LangSwitcher