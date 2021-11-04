import React from "react";
import LayoutNews from "../components/layout/layout-news";




const News = ({ pageContext }) => {

    const { locale, translations, content, title } = pageContext
    console.log(translations);
    return (
        <>
            <LayoutNews locale={locale} translations={translations} pageTitle={title}>
                <h1>test</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />

            </LayoutNews>
        </>

    )

}

export default News