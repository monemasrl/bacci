import React from "react";
import Layout from "../components/layout/layout";
import { findItemTranslated, findItemsTranslated } from "../utils";
import { GatsbyImage } from "gatsby-plugin-image"
import LastNews from "../components/widgets/lastNews";

const moment = require('moment')

const Prodotto = ({ pageContext }) => {

  const { locale, parentPath, content, title, allPagePath, listaApplicazioni, listaCategorie } = pageContext
  const dataProdottoTranslated = content && findItemTranslated(content.translations, locale)
  const seoFilterLocale = content.seo?.translations.find((item) => item.language_code.code === locale)

  const date = new Date(Date.parse(content.date_created))
  return (
    <>
      {content && <Layout
        locale={locale}
        pageTitle={title}
        pathName={parentPath}
        tipo='news'
        allPagePath={allPagePath}
        pathFromContext={pageContext}
        listaApplicazioni={listaApplicazioni}
        listaCategorie={listaCategorie}
        seo={seoFilterLocale}
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