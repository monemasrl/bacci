import * as React from "react"

import { GatsbyImage } from "gatsby-plugin-image"



function TestoMainContent({ content, featuredImage }) {


    return (
        <section className={`mainContent`}>
            {content && <>
                <div className={`box-sx`} >
                    <h1 className="titolo" dangerouslySetInnerHTML={{ __html: content.main_content_titolo }} />
                    <p dangerouslySetInnerHTML={{ __html: content.main_content }} />
                </div>

                {featuredImage && <div className="box-dx">
                    <GatsbyImage image={featuredImage} alt={content.main_content_titolo || 'Bacci website image'} />
                </div>}</>}
        </section>
    )
}


export default TestoMainContent