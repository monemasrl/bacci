import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
const NotFoundPage = ({ pageContext }) => {

  return (

    <div class="mainwrapper">
      <main>
        <div className="container">
          <div className="page404">
            <StaticImage
              placeholder="none"
              width={362}
              src="../../images/logo_scuro.jpg"
              alt="Logo Bacci"
            />
            <h1>404: Not Found</h1>
            <p>Ci dispiace, la pagina che hai richiesto non esiste!</p>
            <a href="/">Torna alla home</a>
          </div>
        </div>
      </main>
    </div>

  )
}

export default NotFoundPage

