import React, { useState, useEffect } from "react";

// Estrae l'ID da vari formati possibili
function extractYouTubeId(raw) {
    if (!raw) return null;
    const str = raw.trim();

    // Se è già solo l'ID (11 caratteri alfanumerici + _ -)
    if (/^[\w-]{11}$/.test(str)) return str;

    // watch?v=ID
    const watchMatch = str.match(/[?&]v=([\w-]{11})/);
    if (watchMatch) return watchMatch[1];

    // youtu.be/ID
    const shortMatch = str.match(/youtu\.be\/([\w-]{11})/);
    if (shortMatch) return shortMatch[1];

    // embed/ID
    const embedMatch = str.match(/embed\/([\w-]{11})/);
    if (embedMatch) return embedMatch[1];

    return null;
}

const YoutubeEmbed = ({
    embedId,            // Può essere ID puro o URL
    title = "Video YouTube",
    consentRequired = true,  // Se true, aspetta consenso cookie
    cookieName = "myAwesomeCookieName2",
    useNoCookieDomain = true,
    aspectRatio = "56.25%",  // 16:9
    placeholderText = "Clicca per abilitare il video",
    className = ""
}) => {

    const [hasConsent, setHasConsent] = useState(!consentRequired);
    const [finalId, setFinalId] = useState(null);
    const [activated, setActivated] = useState(true);

    useEffect(() => {
        // Legge consenso cookie
        if (consentRequired && typeof window !== "undefined") {
            const stored = window.localStorage.getItem(cookieName);
            if (stored === "true") {
                setHasConsent(true);
            }
        }
    }, [consentRequired, cookieName]);

    useEffect(() => {
        setFinalId(extractYouTubeId(embedId));
    }, [embedId]);

    // Se manca ID valido
    if (!embedId || !finalId) {
        return (
            <div className={`video-wrapper ${className}`}>
                <div style={{ padding: "1rem", background: "#eee", fontSize: ".9rem" }}>
                    Video non disponibile
                </div>
            </div>
        );
    }

    const srcBase = useNoCookieDomain
        ? "https://www.youtube-nocookie.com/embed/"
        : "https://www.youtube.com/embed/";

    const iframeSrc = `${srcBase}${finalId}`;

    // Placeholder se manca consenso o non ancora attivato


    // Iframe attivo
    return (
        <div
            className={`video-responsive ${className}`}
            style={{
                position: "relative",
                overflow: "hidden",
                paddingBottom: aspectRatio,
                height: 0
            }}
        >
            <iframe
                src={iframeSrc}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0
                }}
            />
        </div>
    );
};

export default YoutubeEmbed;