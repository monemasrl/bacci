import React from "react"
import './modale.scss'

function Modale({ children, show, close }) {
    return (
        <div className={`modale ${show ? 'visible' : ''}`} >
            <div className="modale__background" onClick={close}></div>
            <div className="modale__content">
                {show ? children : 'loading...'}
            </div>
        </div>
    )
}

export default Modale
