import React, { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { Link } from "gatsby";
import { Termini, langTag } from "../../data-translations";

function Gdpr({ locale }) {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        // Controlla se il consenso è già stato dato
        if (typeof window !== 'undefined') {
            const consent = localStorage.getItem('bacciCookie');

            if (consent === 'true') {
                setHasConsent(true);
                updateGoogleConsent(true);
            }
        }
    }, []);

    // Funzione per aggiornare il Google Consent Mode
    const updateGoogleConsent = (granted) => {
        const status = granted ? 'granted' : 'denied';

        if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                'event': 'consent_update',
                'consent': {
                    'analytics_storage': status,
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                }
            });

            // Metodo alternativo per Consent Mode v2
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    'analytics_storage': status,
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                });
            }
        }
    };

    // Funzione per eliminare cookie di GA (solo come fallback)
    const deleteGACookies = () => {
        const cookies = document.cookie.split(";");
        const domain = window.location.hostname;

        cookies.forEach(cookie => {
            const cookieName = cookie.split("=")[0].trim();

            if (cookieName.startsWith('_ga') || cookieName.startsWith('_gat') || cookieName.startsWith('_gid')) {
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
                document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
            }
        });
    };

    const handleAccept = () => {
        setHasConsent(true);
        localStorage.setItem('bacciCookie', 'true');
        updateGoogleConsent(true);
    };

    const handleDecline = () => {
        setHasConsent(false);
        localStorage.setItem('bacciCookie', 'false');
        updateGoogleConsent(false);
        deleteGACookies();
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
                padding: "1.5rem",
                maxWidth: "600px",
                right: "1rem",
                left: 'auto',
                borderRadius: "8px"
            }}
            buttonStyle={{
                color: "black",
                fontSize: "1rem",
                display: "block",
                background: "white",
                marginRight: "1rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                cursor: "pointer"
            }}
            declineButtonStyle={{
                color: "white",
                fontSize: "1rem",
                display: "block",
                background: "transparent",
                border: "1px solid white",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                cursor: "pointer"
            }}
            expires={150}
            onAccept={handleAccept}
            onDecline={handleDecline}
        >
            <p style={{ color: "white", fontSize: "1rem", marginBottom: "1.5rem" }}>
                {Termini[locale].cookieTesto}
            </p>

            <Link
                style={{
                    color: "white",
                    border: "1px solid white",
                    padding: ".5rem 1rem",
                    display: "inline-block",
                    borderRadius: "4px",
                    textDecoration: "none"
                }}
                to={`/${langTag[locale] === 'it' ? '' : langTag[locale] + '/'}privacy`}
            >
                Privacy Policy
            </Link>
        </CookieConsent>
    );
}

export default Gdpr;
