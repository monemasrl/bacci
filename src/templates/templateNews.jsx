import React from "react";
import Layout from "../components/layout/layout";
import { findItemTranslated, findItemsTranslated } from "../utils";
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import LastNews from "../components/widgets/lastNews";

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
const Prodotto = ({ data, pageContext }) => {

  const { locale, parentPath, content, title, allPagePath } = pageContext
  const dataProdottoTranslated = data && findItemTranslated(content.translations, locale)
  const listaApplicazioni = data && findItemsTranslated(data.directus?.applicazioni_translations, pageContext.locale)
  const listaCategorie = data && findItemsTranslated(data.directus?.prodotto_categorie_translations, pageContext.locale)

  const date = new Date(Date.parse(content.date_created))
  return (
    <>
      {data && <Layout
        locale={locale}
        pageTitle={title}
        pathName={parentPath}
        tipo='news'
        allPagePath={allPagePath}
        pathFromContext={pageContext}
        listaApplicazioni={listaApplicazioni}
        listaCategorie={listaCategorie}
      >
        <div className="wrapper-news">
          <GatsbyImage image={content.image.imageFile.childImageSharp.gatsbyImageData} alt={dataProdottoTranslated.title} />
          <span class="datanews"> {moment(date).locale(pageContext.locale).format('DD MM YYYY')}</span>

          <div dangerouslySetInnerHTML={{ __html: dataProdottoTranslated.content }} />

        </div>
        <LastNews locale={locale} limiteVisualizzazione={3} />
      </Layout>}
    </>

  )

}

export default Prodotto