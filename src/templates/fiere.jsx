import React from "react";
import Layout from "../components/layout"
const Fiere = ({ pageContext }) => {

    const {locale, translations} = pageContext

    return (
        <>
        <Layout locale = {locale} translations = {translations} >
       
            <h1>{JSON.stringify(pageContext)}</h1>
        </Layout>
        </>

    )

}

export default Fiere