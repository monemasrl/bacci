import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import BlocksComponent from "../components/blocks/blocks"
import LastNews from "../components/widgets/lastNews"
import TestoMainContent from "../components/blocks/testo_main_content"
import LastFiere from "../components/widgets/lastFiere"
import CaseHistory from "../components/widgets/caseHistory"
import Slider from "../components/slider"

export const query = graphql`
 query($locale: String!, $slug: String!) {
  directus{

    social{
      social
    }    

    pages(filter: {translations: {languages_code: {code: {_eq: $locale}}, slug: {_eq: $slug}}, status: {_eq: "published"}}){ 
      __typename
      page_name
      id
      seo{
      translations(filter: {languages_code: {code: {_eq: $locale}}}){
        languages_code{
          code
        }
        title
        meta_description
        keywords
      }
      og_image{  
        id
          imageFile{
            id
            publicURL
            childImageSharp{
          id
          gatsbyImageData(formats: [WEBP], quality: 70, placeholder: BLURRED, breakpoints: [ 440, 1200])
        }}
        }
    }
      featured_image{
      id
      description
      imageFile{
        id
        childImageSharp{
          id
          gatsbyImageData(formats: [WEBP], quality: 70, placeholder: BLURRED, breakpoints: [ 440, 1920])
        }
      }
    }
      translations(filter: {languages_code: {code: {_eq: $locale}}, slug: {_eq: $slug}}){
        languages_code{
          code}
        slug
        main_content
        main_content_titolo
        main_content_sottotitolo
      }
   
      blocchi {
        id
        collection
        item{
          ... on DirectusData_block_hero{
              name
              sort
              image{
                description
                id
              imageFile{
                id
                childImageSharp{
                  gatsbyImageData(formats: [WEBP], quality: 70, placeholder: BLURRED, breakpoints: [ 440, 1920])
                }

              }
            }
              translations(filter: {languages_code: {code: {_eq: $locale}}}){
                titolo
                headline
              }
            }
          ... on DirectusData_testo_immagine{
            nome
            novita
       
            allineamento
            id
            immagine{
              description
              id
              imageFile{
                id
                childImageSharp{
                  gatsbyImageData(   

                    placeholder: BLURRED,
                    formats: [WEBP],
                    breakpoints: [ 440,  790, ])
                  
                }
              }
            }
          
            nome
            traduzioni(filter: {languages_code: {code: {_eq: $locale}}}) {
              languages_code{
                code
              }
              titolo
              sotto_titolo
							paragrafo
              link_label
              url
            }
            
          }
          ... on DirectusData_Blocchi{
            traduzioni(filter: {languages_code: {code: {_eq: $locale}}}) {
              languages_code{
                code
              }
              blocchi
            }
          }
        }
      }
    }
}
  }`


const Pagine = ({ data, pageContext }) => {

  return (
    <>
      {pageContext && data ?
        <Layout
          pageTitle={pageContext.title}
          locale={pageContext.locale}
          allPagePath={pageContext.allPagePath}
          listaApplicazioni={pageContext.listaApplicazioni}
          listaCategorie={pageContext.listaCategorie}
          parentPath={pageContext.parentPath}
          seo={data.directus.pages[0]?.seo.translations[0]}
          seoImage={data.directus.pages[0]?.seo?.og_image?.imageFile?.publicURL && data.directus.pages[0]?.seo?.og_image?.imageFile?.publicURL}
        >

          {/* PAGINE INTERNE */}
          {data.directus.pages[0] &&
            <>

              {pageContext.pageName === "home" &&
                <section className="jumbo-home">
                  <Slider locale={pageContext.locale} />
                  {/*  <GatsbyImage loading="eager" className="jumbo-image" image={data.directus.pages[0].featured_image.imageFile.childImageSharp.gatsbyImageData} alt={'test'} /> */}
                </section>}
              {pageContext.pageName !== "home" &&
                <TestoMainContent content={data.directus.pages[0]?.translations[0]} featuredImage={data.directus.pages[0].featured_image?.imageFile?.childImageSharp.gatsbyImageData || ''}
                  altImage={data.directus.pages[0].featured_image?.description || 'Bacci website image'}
                />}

              <div className={`container-fluid ${pageContext.pageName}`}>
                {data.directus.pages[0].blocchi?.map((blocco, index) => {
                  return <React.Fragment key={index}>{BlocksComponent(blocco.collection, index, blocco.item.allineamento, blocco, pageContext.pageName, pageContext.locale)}</React.Fragment>
                })}
              </div>
              {(pageContext.pageName === "news" || pageContext.pageName === "home") &&
                <LastFiere pageType={pageContext.pageName} locale={pageContext.locale} limiteVisualizzazione={3} />}
            </>}
          {(pageContext.pageName === "news" || pageContext.pageName === "home") &&
            <LastNews pageType={pageContext.pageName} locale={pageContext.locale} limiteVisualizzazione={3} />}

          {pageContext.pageName === "case-history" && <CaseHistory locale={pageContext.locale} />}
          {!data.directus.pages[0] &&
            <h1>Non ci sono dati!</h1>
          }
        </Layout> : 'Loading...'}
    </>
  )

}

export default Pagine