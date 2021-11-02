import React from "react";
import LayoutFiere from "../components/layout-fiere";

const Fiere = ({ pageContext }) => {

    const {locale, translations, slug, parentPath} = pageContext

    return (
        <>
        <LayoutFiere locale = {locale} translations = {translations} pageTitle={slug} pathName={parentPath} >
       
            <h1>{JSON.stringify(pageContext)}</h1>
        </LayoutFiere>
        </>

    )

}

export default Fiere