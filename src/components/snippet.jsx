import React from "react";



const snippet = () => (
    <>
        {/* sezione intestazione pagine interne */}
        <section className="container-fluid sezione-interne">
            <div className="box-sx">
                <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission1.titolo }} />
                <p>{dataFilter.mission.sezioneMission1.paragrafo}</p>
            </div>
            <div className="box-dx">
                <GatsbyImage image={dataFilter.mission.sezioneMission1.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.mission.sezioneMission1.immagine.altText} />
            </div>
        </section>
        {/* sezione paragrafo-immagine tipo home */}
        <section className="container sezione-1">
            <div className="box-sx">
                <h1 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.paginaProduzione.sezioneProduzione1.titolo }} />
                <p>{dataFilter.paginaProduzione.sezioneProduzione1.paragrafo}</p>
            </div>
            <div className="box-dx">
                <GatsbyImage image={dataFilter.paginaProduzione.sezioneProduzione1.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.paginaProduzione.sezioneProduzione1.immagine.altText} />
            </div>
        </section>
        {/* sezione repeater */}
        <section className="container repeater">
            <div className="box-repeater">
                <h3>{dataFilter.paginaProduzione.sezioneProduzione3.titolo}</h3>
                <p>{dataFilter.paginaProduzione.sezioneProduzione3.paragrafo}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.paginaProduzione.sezioneProduzione3.titolo2}</h3>
                <p>{dataFilter.paginaProduzione.sezioneProduzione3.paragrafo2}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.paginaProduzione.sezioneProduzione3.titolo3}</h3>
                <p>{dataFilter.paginaProduzione.sezioneProduzione3.paragrafo3}</p>
            </div>
            <div className="box-repeater">
                <h3>{dataFilter.paginaProduzione.sezioneProduzione3.titolo4}</h3>
                <p>{dataFilter.paginaProduzione.sezioneProduzione3.paragrafo4}</p>
            </div>
        </section>
           {/* sezione in colonna */}
           <section className="container sezione-3">
          <div className="box-sx">
            <h2 dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission2.titolo }} />
            <p dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission2.paragrafo }} />
            <GatsbyImage image={dataFilter.mission.sezioneMission2.immagine.localFile.childImageSharp.gatsbyImageData} alt={dataFilter.mission.sezioneMission2.immagine.altText} />

          </div>

          <div className="box-dx">
            <p dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission2.paragrafo2 }} />

          </div>
        </section>
        {/* sezione testo sx  */}
        <section className="container sezione-testo-sx">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission3.titolo }} />
            <p>{dataFilter.mission.sezioneMission3.paragrafo}</p>
          </div>
          <div className="box-dx">
            <GatsbyImage image={dataFilter.mission.sezioneMission3.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.mission.sezioneMission3.immagine.altText} />
          </div>
        </section>

        {{/* sezione testo dx */}}
        <section className="container sezione-testo-dx">
          <div className="box-sx">
          <GatsbyImage image={dataFilter.mission.sezioneMission4.immagine.localFile.childImageSharp.gatsbyImageData}  alt={dataFilter.mission.sezioneMission4.immagine.altText} />
          </div>
          <div className="box-dx">
          <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.mission.sezioneMission4.titolo }} />
          <p>{dataFilter.mission.sezioneMission4.paragrafo}</p>
          </div>
        </section>
        {{/* sezione testo no immagine */}}
        <section className="container sezione-testo-no-immagine">
          <div className="box-sx">
            <h2 className="titolo" dangerouslySetInnerHTML={{ __html: dataFilter.storia.sezioneStoria4.titolo }} />
            <p>{dataFilter.storia.sezioneStoria4.paragrafo}</p>
          </div>
        </section>

    </>
)

