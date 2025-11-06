import React from 'react';
import { Link } from 'gatsby'
import { langTag } from '../../data-translations';


const LangSwitcher = (props) => {
  if (!props.allPagePath || !Array.isArray(props.allPagePath)) {
    return null; // Non renderizzare nulla se i dati non sono disponibili
  }
  const pathInOrdine = props.allPagePath.sort((item) => {
    return item.locale === 'it_IT' ? -1 : 1;
  });

  return (
    <>
      <div className='langbox' >
        <ul className="languages">
          {pathInOrdine.map((item, index) => {
            if (item.locale && item.path) {
              if (item.locale === props.locale) {
                return <li key={index} className='active' >{langTag[item.locale]}</li>
              }
              else if (item.locale !== props.locale) {
                return <li key={index} >
                  <Link to={`${item.path.toLowerCase()}`}>{langTag[item.locale]}</Link>
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