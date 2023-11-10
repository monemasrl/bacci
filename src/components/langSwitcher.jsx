import React from 'react';
import { Link } from 'gatsby'
import { langTag } from '../../data-translations';


const LangSwitcher = (props) => {

  return (
    <>

      <div className='langbox' >
        <ul className="languages">
          {props.allPagePath.map((item, index) => {
            console.log(item, 'itemlangswitcher')
            if (item.locale) {
              if (item.locale === props.locale) {
                return <li key={index} >{langTag[item.locale]}</li>
              }
              else if (item.locale !== props.locale) {
                return <li key={index}>
                  <Link to={`${item.path}`}>{langTag[item.locale]}</Link>
                </li>
              }
            }
            return ''
          })}
        </ul>
      </div>

    </>
  )
}

export default LangSwitcher