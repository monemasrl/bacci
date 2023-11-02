import React from 'react';
import { Link } from 'gatsby'
import { langTag } from '../../data-translations';


const LangSwitcher = (props) => {

  return (
    <>
      {props.translations.length !== 0 ?
        (
          <div className='langbox' >
            <ul className="languages">
              {props.allPagePath.map((item) => {
                if (item.locale === props.locale) {
                  return <li>{langTag[item.locale]}</li>
                }
                else {
                  return <li>
                    <Link to={`/${item.path !== '/' ? item.path : ''}`}>{langTag[item.locale]}</Link>
                  </li>

                }

              })}
            </ul>
          </div>)
        : ''}

    </>
  )
}

export default LangSwitcher