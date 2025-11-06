import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { Link } from "gatsby";
import { Termini, langTag } from "../../data-translations";
import { useGTM } from "../hooks/useGTM";

function Gdpr({ locale }) {
    const [hasConsent, setHasConsent] = useState(false);
    const { loadGTM, removeGTM } = useGTM(hasConsent);

    useEffect(() => {
        // Controlla se il consenso è già stato dato
        if (typeof window !== 'undefined') {
            const consent = localStorage.getItem('bacciCookie');
            if (consent === 'true') {
                setHasConsent(true);
            }
        }
    }, []);

    const handleAccept = () => {
        setHasConsent(true);
        // Salva il consenso
        localStorage.setItem('bacciCookie', 'true');

        // Event tracking per GTM (opzionale)
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'cookie_consent_granted',
                consent_type: 'marketing'
            });
        }
    };

    const handleDecline = () => {
        setHasConsent(false);
        localStorage.setItem('bacciCookie', 'false');
        removeGTM();
    };

    return (
        <CookieConsent
            location="bottom"
            buttonText={Termini[locale].cookieButton}
            declineButtonText="Rifiuta"
            enableDeclineButton={true}
            cookieName="bacciCookie"
            style={{
                background: "#0e294b",
                padding: "1rem 1rem",
                maxWidth: "600px",
                right: "1rem",
                left: 'auto'
            }}
            buttonStyle={{
                color: "black",
                fontSize: "1rem",
                display: "block",
                background: "white",
                marginRight: "1rem"
            }}
            declineButtonStyle={{
                color: "white",
                fontSize: "1rem",
                display: "block",
                background: "transparent",
                border: "1px solid white"
            }}
            expires={150}
            onAccept={handleAccept}
            onDecline={handleDecline}
        >
            <p style={{ color: "white", fontSize: "1rem", marginBottom: "2rem" }}>
                {Termini[locale].cookieTesto}
            </p>
            <Link
                style={{
                    color: "white",
                    border: "1px solid white",
                    padding: ".5rem",
                    display: "inline-block",
                    marginBottom: "1rem"
                }}
                to={`/${langTag[locale] === 'it' ? '' : langTag[locale] + '/'}privacy`}
            >
                Privacy Policy
            </Link>
        </CookieConsent>
    );
}

export default Gdpr;