import * as React from "react"
import Layout from "../components/layout/layout"

const NotFoundPage = ({ pageContext }) => {
  return (
    <Layout
      locale={pageContext?.locale || "it_IT"}
      pageTitle="404 - Pagina non trovata"
      tipo="page404"
    >
      <div className="container">
        <div className="page404">
          <h1>404: Not Found</h1>
          <p>Ci dispiace, la pagina che hai richiesto non esiste!</p>
          <a href="/">Torna alla home</a>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

