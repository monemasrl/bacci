import React, { useState, useEffect, useRef } from "react";

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
    embedId,
    title = "Video YouTube",
    consentRequired = true,
    cookieName = "myAwesomeCookieName2",
    aspectRatio = "56.25%",
    placeholderText = "Clicca per abilitare il video",
    className = ""
}) => {
    const [hasConsent, setHasConsent] = useState(!consentRequired);
    const [finalId, setFinalId] = useState(null);
    const [activated, setActivated] = useState(false);
    const [isAPIReady, setIsAPIReady] = useState(false);
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    // Carica YouTube IFrame API
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Se YT è già disponibile
        if (window.YT && window.YT.Player) {
            setIsAPIReady(true);
            return;
        }

        // Carica API script se non già presente
        if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            tag.async = true;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Callback globale per quando API è pronta
        const originalCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            setIsAPIReady(true);
            if (originalCallback) originalCallback();
        };
    }, []);

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

    // Crea player quando tutto è pronto
    useEffect(() => {
        if (!isAPIReady || !finalId || !activated || !hasConsent || !containerRef.current || player) {
            return;
        }

        try {
            const newPlayer = new window.YT.Player(containerRef.current, {
                videoId: finalId,
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                    origin: window.location.origin
                },
                events: {
                    onReady: (event) => {
                        console.log('YouTube player ready');
                    },
                    onStateChange: (event) => {
                        console.log('YouTube state change:', event.data);
                    },
                    onError: (event) => {
                        console.error('YouTube player error:', event.data);
                        setError(`Errore player: ${event.data}`);
                    }
                }
            });

            setPlayer(newPlayer);
            playerRef.current = newPlayer;
        } catch (err) {
            console.error('Errore creazione player YouTube:', err);
            setError('Impossibile creare il player video');
        }
    }, [isAPIReady, finalId, activated, hasConsent, player]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                try {
                    playerRef.current.destroy();
                } catch (err) {
                    console.warn('Errore durante cleanup player:', err);
                }
            }
        };
    }, []);

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

    // Se c'è un errore, mostra fallback
    if (error) {
        return (
            <div className={`video-wrapper ${className}`}>
                <div style={{
                    padding: "1rem",
                    background: "#222",
                    color: "#fff",
                    fontSize: ".9rem",
                    textAlign: "center"
                }}>
                    <p>{error}</p>
                    <a
                        href={`https://www.youtube.com/watch?v=${finalId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#fff", textDecoration: "underline" }}
                    >
                        Apri su YouTube
                    </a>
                </div>
            </div>
        );
    }

    // Placeholder se manca consenso o non ancora attivato
    if (!hasConsent || !activated) {
        return (
            <div
                className={`video-responsive ${className}`}
                style={{
                    position: "relative",
                    overflow: "hidden",
                    paddingBottom: aspectRatio,
                    height: 0,
                    background: "#000",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                }}
                onClick={() => setActivated(true)}
            >
                <div style={{
                    background: "#ffffff",
                    color: "#000",
                    border: "none",
                    padding: "0.75rem 1rem",
                    fontSize: "0.9rem",
                    borderRadius: "4px"
                }}>
                    {placeholderText}
                </div>
            </div>
        );
    }

    // Player attivo (con API YouTube)
    return (
        <div
            className={`video-responsive ${className}`}
            style={{
                position: "relative",
                overflow: "hidden",
                paddingBottom: aspectRatio,
                height: 0,
                background: "#000"
            }}
        >
            <div
                ref={containerRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
            />
            {!player && isAPIReady && (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                    fontSize: ".9rem"
                }}>
                    Caricamento video...
                </div>
            )}
        </div>
    );
};

export default YoutubeEmbed;