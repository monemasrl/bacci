import React from "react";
import CookieConsent from "react-cookie-consent";
import { Link } from "gatsby"
import { Termini } from "../../data-translations";

function Gdpr({ locale }) {
    return <CookieConsent
        location="bottom"
        buttonText={Termini[locale].cookieButton}
        cookieName="myAwesomeCookieName2"
        style={{ background: "#0e294b", padding: "1rem 1rem", maxWidth: "600px", right: "1rem", left: 'auto' }}
        buttonStyle={{ color: "black", fontSize: "1rem", display: "block", background: "white" }}
        expires={150}
    >
        <p style={{ color: "white", fontSize: "1rem", marginBottom: "2rem" }}>{Termini[locale].cookieTesto}</p>
        <Link style={{ color: "white", border: "1px solid white", padding: ".5rem" }} to={`/${locale}/privacy-policy/`}>privacy-policy</Link>
    </CookieConsent>
}

export default Gdpr