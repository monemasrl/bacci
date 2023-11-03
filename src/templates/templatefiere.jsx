import React from "react";
import LayoutFiere from "../components/layout/layout-fiere";
import FormFiere from "../components/form";
import Personale from "../components/personale/personale";

const Fiere = ({ pageContext }) => {

    const { locale, translations, slug, parentPath, content, allPagePath } = pageContext

    return (
        <>
            <LayoutFiere
                locale={locale}
                translations={translations}
                pageTitle={slug}
                pathName={parentPath}
                allPagePath={allPagePath}
                tipo='fiere' >

                <div className="container fiera">
                    <section className="topfiera">
                        <h1>{content.title}</h1>
                        <span className="datafiera">
                            {content.fiere.dataDa.slice(0, 2)}-{content.fiere.dataA}
                        </span>
                        <h2>{content.fiere.sottotitolo}</h2>
                        <p>{content.fiere.descrizione}</p>
                        <div className="calltoaction" id="form-prenotazione">
                            <p dangerouslySetInnerHTML={{ __html: content.fiere.callToAction.paragrafo }} />
                            <FormFiere />
                        </div>
                    </section>
                    <section className="content-fiera">
                        <div className="box-content-fiera" dangerouslySetInnerHTML={{ __html: content.content }} />


                    </section>

                    <Personale locale={locale} personale={content.fiere.personale} />
                    <a className="button-fiere" href="#form-prenotazione">Prenota la tua visita</a>
                </div>
            </LayoutFiere>
        </>

    )

}

export default Fiere