import React from "react";
import LayoutNews from "../components/layout/layout-news";




const News = ({ pageContext }) => {



    const { locale, translations, content, title, sottotitolo, date, allPagePath, dataMenu } = pageContext

    return (
        <>
            <LayoutNews allPagePath={allPagePath} locale={locale} pageTitle={title} tipo="news"
                dataMenu={dataMenu}>
                <div className="wrapper-news">
                    <span className="datanews">{date}</span>
                    <h2>{sottotitolo}</h2>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </LayoutNews>
        </>

    )

}

export default News