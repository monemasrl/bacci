import * as React from "react"

import { GatsbyImage } from "gatsby-plugin-image"

function Hero({ content, pageName, index }) {


    if (pageName === 'gruppo-bacci') return (
        <section key={index} className="map-gruppo-bacci">
            {content.item.translations[0].titolo && <h2 className="map-gruppo-bacci__titolo">{content.item.translations[0].titolo}</h2>}
            <div className="map-gruppo-bacci__lista" dangerouslySetInnerHTML={{ __html: content.item.translations[0].headline }} />
            <GatsbyImage className="map-gruppo-bacci__image" image={content.item.image.imageFile.childImageSharp.gatsbyImageData} alt={'map'} />
        </section>
    )

}



export default Hero