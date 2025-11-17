import React from "react";
import Layout from "../components/layout/layout";
import { findItemTranslated } from "../utils";
import { GatsbyImage } from "gatsby-plugin-image"
import LastNews from "../components/widgets/lastNews";

const moment = require('moment')

const Prodotto = ({ pageContext }) => {

  const { locale, parentPath, content, title, allPagePath } = pageContext
  const dataProdottoTranslated = content && findItemTranslated(content.translations, locale)
  const seoFilterLocale = content.seo?.translations.find((item) => item.languages_code.code === locale)

  const date = new Date(Date.parse(content.date_published))
  return (
    <>
      {content && <Layout
        locale={locale}
        pageTitle={title}
        pathName={parentPath}
        tipo='news'
        allPagePath={allPagePath}
        pathFromContext={pageContext}
        listaApplicazioni={pageContext.listaApplicazioni}
        listaCategorie={pageContext.listaCategorie}
        seo={seoFilterLocale}
      >
        <div className="wrapper-news">
          {content.image?.imageFile && <GatsbyImage image={content.image?.imageFile?.childImageSharp.gatsbyImageData} alt={content.image.description || dataProdottoTranslated.title} />}

          <span className="datanews"> {moment(date).locale(pageContext.locale).format('DD MM YYYY')}</span>

          {dataProdottoTranslated?.content && <div dangerouslySetInnerHTML={{ __html: dataProdottoTranslated?.content }} />}

        </div>
        <LastNews locale={locale} limiteVisualizzazione={3} idCurrentNews={content.id} />
      </Layout>}
    </>
  )

}

export default Prodotto