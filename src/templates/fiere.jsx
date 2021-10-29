import React from "react";
import LayoutFiere from "../components/layout-fiere";

const Fiere = ({ pageContext }) => {

    const {locale, translations, slug, parentPath} = pageContext
    console.log('langFilter');

    return (
        <>
        <LayoutFiere locale = {locale} translations = {translations} pageTitle={slug} pathName={parentPath} >
       
            <h1>{JSON.stringify(pageContext)}</h1>
        </LayoutFiere>
        </>

    )

}

export default Fiere