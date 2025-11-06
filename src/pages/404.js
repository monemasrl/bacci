import * as React from "react"

const NotFoundPage = ({ pageContext }) => {
  const defaultPagePath = [
    { path: '/', locale: 'it_IT', title: 'Home' },
    { path: '/en/', locale: 'en_US', title: 'Home' }
  ]
  return (

    <div class="mainwrapper">
      <main>
        <div className="container">
          <div className="page404">
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

