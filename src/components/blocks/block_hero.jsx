import * as React from "react"
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

function Hero({ index, allineamento, content, pageName }) {


    {
        if (pageName === 'gruppo-bacci') return (
            <section className="map-gruppo-bacci">
                <div className="map-gruppo-bacci__lista" dangerouslySetInnerHTML={{ __html: content.item.translations[0].headline }} />
                <GatsbyImage className="map-gruppo-bacci__image" image={content.item.image.imageFile.childImageSharp.gatsbyImageData} alt={'map'} />
            </section>
        )
    }
}



export default Hero