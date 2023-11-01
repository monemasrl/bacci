import React from 'react';
import { Link } from 'gatsby'
import { langTag } from '../../data-translations';
var slugify = require('slugify')

const LangSwitcher = (props) => {
  console.log(props.pathName, 'props.pathname')
  const url = props.translations.length !== 0 ? slugify(props.translations[0].post_title) : ''

  return (
    <>
      {props.translations.length !== 0 ?
        (
          <div className='langbox' >
            <ul className="languages">

              <li>{langTag[props.locale].toUpperCase()}</li>
              <li>
                <Link to={`${langTag[props.translations[0].locale] === 'it' ? '' : '/'
                  + langTag[props.translations[0].locale]}/${url === 'Home' ? '' : (props.pathName ? props.pathName : '') + '/' + url.toLowerCase()}`}>{langTag[props.translations[0].locale]}</Link>
              </li>
            </ul>
          </div>)
        : ''}

    </>
  )
}

export default LangSwitcher