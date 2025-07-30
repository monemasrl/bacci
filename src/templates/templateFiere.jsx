import React from "react";
import Layout from "../components/layout/layout";
import { findItemTranslated } from "../utils";
import { FormFiere } from "../components/form";
import { langTag } from "../../data-translations";

const moment = require('moment')


const Fiere = ({ pageContext }) => {

  const { locale, parentPath, content, title, allPagePath, listaApplicazioni, listaCategorie } = pageContext
  const dataProdottoTranslated = findItemTranslated(content.translations, locale)

  const dateFrom = new Date(Date.parse(content.from))
  const dateTo = new Date(Date.parse(content.to))
  moment.locale(langTag[pageContext.locale])
  const dataBreadCrumbFiere = {
    dataFrom: moment(dateFrom).format('DD'),
    dataTo: moment(dateTo).format('DD MMM YYYY'),
    title: dataProdottoTranslated?.title || '',
    location: content.location,
  }

  const seoFilterLocale = content.seo?.translations.find((item) => item.languages_code.code === locale)

  return (
    <>
      <Layout
        locale={locale}
        pageTitle={title}
        pathName={parentPath}
        tipo='fiera'
        allPagePath={allPagePath}
        pathFromContext={pageContext}
        listaApplicazioni={pageContext.listaApplicazioni}
        listaCategorie={pageContext.listaCategorie}
        dataBreadCrumbFiere={dataBreadCrumbFiere}
        seo={seoFilterLocale}
      >
        <div className="wrapper-fiere">

          <section className="topfiera">
            <h2>{dataProdottoTranslated?.sottotitolo && dataProdottoTranslated?.sottotitolo}</h2>
            <p className="description">
              {dataProdottoTranslated?.description && dataProdottoTranslated?.description}
            </p>
            {dataProdottoTranslated?.call2action && <div className="call2action">
              <div dangerouslySetInnerHTML={{ __html: dataProdottoTranslated?.call2action && dataProdottoTranslated?.call2action }} />
              <FormFiere nomeEvento={title} lang={pageContext.locale} />
            </div>}
          </section>
          <div className="bodyFiera" dangerouslySetInnerHTML={{ __html: dataProdottoTranslated?.body && dataProdottoTranslated?.body }} />
          <div className="wrapperFormBottomFiere">
            <FormFiere nomeEvento={title} lang={pageContext.locale} />
          </div>
        </div>

      </Layout>
    </>

  )

}

export default Fiere