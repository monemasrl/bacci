import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/layout";
import { Termini } from "../../data-translations";
import { langTag } from "../../data-translations";
import Map from "../components/map/map";
import "moment/locale/it";
import { GatsbyImage } from "gatsby-plugin-image";

const moment = require("moment");

export const query = graphql`
    query ($locale: String!, $slug: String!) {
        directus {
            pages(
                filter: {
                    translations: {
                        languages_code: { code: { _eq: $locale } }
                        slug: { _eq: $slug }
                    }
                }
            ) {
                id
                seo {
                    translations(
                        filter: { languages_code: { code: { _eq: $locale } } }
                    ) {
                        languages_code {
                            code
                        }
                        title
                        meta_description
                        keywords
                    }
                }
                featured_image {
                    id
                    description
                    imageFile {
                        id
                        childImageSharp {
                            id
                            gatsbyImageData(
                                formats: [WEBP]
                                quality: 70
                                placeholder: BLURRED
                                breakpoints: [
                                    440,
                                  
                                    1024,
                             
                                    1920
                                ]
                            )
                        }
                    }
                }
                translations(
                    filter: {
                        languages_code: { code: { _eq: $locale } }
                        slug: { _eq: $slug }
                    }
                ) {
                    languages_code {
                        code
                    }
                    slug
                    nome
                    main_content
                    main_content_sottotitolo
                }
            }
            sedi {
                nome_sede
                tipo
                indirizzo
                area
                telefono
                fax
                mail
                piva
                cf
                data_iscr
                rea
                capitale_sociale
            }
        }
    }
`;

const Contatti = ({ data, pageContext }) => {
    const {
        locale,
        parentPath,
        title,
        allPagePath,

    } = pageContext;
    moment.locale(langTag[pageContext.locale]);

    const seoFilterLocale = data.directus.pages[0].seo?.translations.find(
        (item) => item.languages_code.code === locale
    );

    return (
        <>
            <Layout
                locale={locale}
                pageTitle={title}
                pathName={parentPath}
                allPagePath={allPagePath}
                pathFromContext={pageContext}
                listaApplicazioni={pageContext.listaApplicazioni}
                listaCategorie={pageContext.listaCategorie}
                seo={seoFilterLocale}
            >
                <div className="wrapper-contatti">
                    <section className="map-gruppo-bacci">
                        {data.directus.pages[0]?.translations[0]?.main_content_sottotitolo && (
                            <h1 className="titolo" dangerouslySetInnerHTML={{ __html: data.directus.pages[0].translations[0].main_content_sottotitolo }} />
                        )}

                        {data.directus.pages[0]?.featured_image?.imageFile && (
                            <GatsbyImage
                                className="map-gruppo-bacci__image"
                                image={data.directus.pages[0].featured_image.imageFile.childImageSharp.gatsbyImageData}
                                alt={"map"}
                            />
                        )}
                    </section>

                    {data.directus.sedi.length > 0 && (
                        <div className="wrappersedi">
                            <section className="sedelegale">
                                <h3>Paolino Bacci S.R.L.</h3>
                                <div className="heading">
                                    <h2 className="titoli">{Termini[locale].sedeLegale}</h2>
                                </div>
                                <div className="sedi hq">
                                    {data.directus.sedi.map((item, index) => {
                                        if (Number(item.tipo) === 0) {
                                            return (
                                                <div className="sede hq" key={index}>
                                                    <div className="sede-col">
                                                        <ul>
                                                            <li>{item.indirizzo && item.indirizzo}</li>
                                                            <li>{item.area && item.area}</li>
                                                            {item.telefono && <li>{Termini[locale].contattiPhone + ' ' + item.telefono}</li>}
                                                            {item.fax && <li>F.{item.fax}</li>}
                                                            {item.mail && <li><a href={"mailto:" + item.mail} target="_blank">{item.mail}</a> </li>}
                                                        </ul>
                                                    </div>
                                                    <div className="sede-col">
                                                        <ul>
                                                            {item.piva && <li>P.IVA: {item.piva}</li>}
                                                            {item.cf && <li>CF: {item.cf}</li>}
                                                            {item.data_iscr && <li> Data iscr.: {item.data_iscr}</li>}
                                                            {item.rea && <li>R.E.A: {item.rea}</li>}
                                                            {item.capitale_sociale && <li>Capitale Sociale: {item.capitale_sociale}</li>}
                                                        </ul>
                                                    </div>
                                                    {item.indirizzo && <div className="sede-col">
                                                        <Map address={item.indirizzo + ', ' + item.area} />
                                                    </div>}
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            </section>
                            <section>
                                <div className="heading">
                                    <h2 className="titoli">{Termini[locale].sediItalia}</h2>
                                </div>
                                <div className="sedi">
                                    {data.directus.sedi.map((item, index) => {
                                        if (Number(item.tipo) === 1) {
                                            return (<div className="sede" key={index}>
                                                <div className="sede-col">
                                                    <h3>{item.nome_sede}</h3>

                                                    <ul>
                                                        <li>{item.indirizzo}</li>
                                                        <li>{item.area}</li>
                                                        {item.telefono && <li>{Termini[locale].contattiPhone + ' ' + item.telefono}</li>}
                                                        {item.fax && <li>F.{item.fax}</li>}
                                                        {item.mail && <li><a href={"mailto:" + item.mail} target="_blank">{item.mail}</a> </li>}
                                                    </ul>
                                                </div>

                                                <div className="sede-col">
                                                    <Map address={item.indirizzo + ' ' + item.area} />
                                                </div>
                                            </div>)
                                        }
                                    })}
                                </div>
                            </section>
                            <section>
                                <div className="heading">
                                    <h2 className="titoli">{Termini[locale].filialiEstere}</h2>
                                </div>
                                <div className="sedi">
                                    {data.directus.sedi.map((item, index) => {
                                        if (Number(item.tipo) === 2) {
                                            return (<div className="sede" key={index}>
                                                <div className="sede-col">
                                                    <h3>{item.nome_sede}</h3>

                                                    <ul>
                                                        <li>{item.indirizzo}</li>
                                                        <li>{item.area}</li>
                                                        {item.telefono && <li>{Termini[locale].contattiPhone + ' ' + item.telefono}</li>}
                                                        {item.fax && <li>F.{item.fax}</li>}
                                                        {item.mail && <li><a href={"mailto:" + item.mail} target="_blank">{item.mail}</a> </li>}
                                                    </ul>
                                                </div>

                                                <div className="sede-col">
                                                    <Map address={item.indirizzo + ' ' + item.area} />
                                                </div>
                                            </div>)
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            </section>
                        </div>
                    )}
                    {/*   <Map address={'Via Palermo 32,56021 Cascina (PI), Italia'} /> */}
                </div>
            </Layout>
        </>
    );
};

export default Contatti;
