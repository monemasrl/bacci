import React from "react";
import Layout from "../components/layout"
const Fiere = ({ pageContext }) => {

    const {locale, translations} = pageContext

    return (
        <>
       
       
            <h1>{JSON.stringify(pageContext)}</h1>
     
        </>

    )

}

export default Fiere