import React from "react";
import LangSwitcher from "../components/langSwitcher";
import Layout from "../components/layout"
const Fiere = ({ pageContext }) => {


    return (
        <>
        <Layout locale = {pageContext.locale} translations = {pageContext.translations} >
       
            <h1>{JSON.stringify(pageContext)}</h1>
        </Layout>
        </>

    )

}

export default Fiere