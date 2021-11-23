import React from "react";
import LayoutNews from "../components/layout/layout-news";




const News = ({ pageContext }) => {



    const { locale, translations, content, title, sottotitolo, date  } = pageContext
  
    return (
        <>
            <LayoutNews locale={locale} translations={translations} pageTitle={title} tipo="news">
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