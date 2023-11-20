import React from "react";
import Layout from "../components/layout/layout";
import { findItemTranslated, findItemsTranslated } from "../utils";
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const moment = require('moment')

export const query = graphql`
 query{
  directus{
    prodotto_categorie_translations{
    languages_code{
      code
    }
    nome
  }
  applicazioni_translations{
      languages_code{
        code
      }
      label
    }

}
  }`
const Fiere = ({ data, pageContext }) => {

  const { locale, parentPath, content, title, allPagePath } = pageContext
  const dataProdottoTranslated = findItemTranslated(content.translations, locale)
  const listaApplicazioni = findItemsTranslated(data.directus.applicazioni_translations, pageContext.locale)
  const listaCategorie = findItemsTranslated(data.directus.prodotto_categorie_translations, pageContext.locale)

  const dateFrom = new Date(Date.parse(content.from))
  const dateTo = new Date(Date.parse(content.to))

  const dataBreadCrumbFiere = {
    dataFrom: moment(dateFrom).locale(pageContext.locale).format('DD'),
    dataTo: moment(dateTo).locale(pageContext.locale).format('DD MMMM YYYY'),
    title: dataProdottoTranslated.title,
    location: content.location,
  }

  return (
    <>
      <Layout
        locale={locale}
        pageTitle={title}
        pathName={parentPath}
        tipo='fiere'
        allPagePath={allPagePath}
        pathFromContext={pageContext}
        listaApplicazioni={listaApplicazioni}
        listaCategorie={listaCategorie}
        dataBreadCrumbFiere={dataBreadCrumbFiere}
      >
        <div className="wrapper-fiere">
          {content.image && <GatsbyImage image={content.image.imageFile.childImageSharp.gatsbyImageData} alt={dataProdottoTranslated.title} />}
          <section className="topfiera">
            <h1>{dataProdottoTranslated.title}</h1>

            <div className="description" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.description }} />
            <div className="call2action" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.call2action }} />
          </section>
          <div className="bodyFiera" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.body }} />

        </div>

      </Layout>
    </>

  )

}

export default Fiere