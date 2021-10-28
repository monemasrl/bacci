import React from 'react';
import { Link } from 'gatsby'
import { langTag } from '../../data-translations';
var slugify = require('slugify')

const LangSwitcher = (props) => {

  const url = props.translations.length !== 0 ? slugify(props.translations[0].post_title) : ''
 
  console.log(props);
  return (
    <>{
      <ul className="languages">

        <li>{props.locale}</li>
       { props.translations.length !== 0 ? <li><Link to={`${langTag[props.translations[0].locale] === 'it' ? '' : '/' + langTag[props.translations[0].locale]}/${url === 'Home' ? '' : url}`}>{props.translations[0].locale}</Link></li>
        : ''}


      </ul>
    }
    </>
  )
}

export default LangSwitcher