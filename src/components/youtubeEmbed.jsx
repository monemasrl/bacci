/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect, useRef } from "react";
import { Termini } from "../../data-translations"; // Import your translations

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
    locale = "it_IT",
    consentRequired = true,
    cookieName = "myAwesomeCookieName2",
    aspectRatio = "56.25%",
    placeholderText,
    className = "",
    autoplay = false,
    loop = false,
    background = false,   // 👈 NUOVO: autoplay + loop + muto + niente controlli, non interattivo
    isHomePage = false
}) => {
    // In modalità background forziamo autoplay, loop e niente consenso/placeholder
    const autoPlay = autoplay || background;
    const loopPlay = loop || background;
    const requiresConsent = consentRequired && !background;

    const [hasConsent, setHasConsent] = useState(!requiresConsent);
    const [finalId, setFinalId] = useState(null);
    const [activated, setActivated] = useState(!requiresConsent);
    const [isAPIReady, setIsAPIReady] = useState(false);
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const playerRef = useRef(null);

    // Get translations for current locale
    const t = Termini[locale] || Termini.it_IT;

    // Set default placeholder text if not provided
    const defaultPlaceholderText = placeholderText || t.videoPlaceholder || "Clicca per abilitare il video";

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
        // Legge consenso cookie (saltato in modalità background)
        if (requiresConsent && typeof window !== "undefined") {
            const stored = window.localStorage.getItem(cookieName);
            if (stored === "true") {
                setHasConsent(true);
            }
        }
    }, [requiresConsent, cookieName]);

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
                    autoplay: autoPlay ? 1 : 0,
                    controls: autoPlay ? 0 : 1,   // niente barra controlli in autoplay/background
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                    mute: autoPlay || loopPlay ? 1 : 0,  // muto obbligatorio per l'autoplay
                    loop: loopPlay ? 1 : 0,
                    playlist: loopPlay ? finalId : undefined,  // necessario perché il loop funzioni
                    disablekb: background ? 1 : 0,   // niente tastiera in background
                    fs: background ? 0 : 1,          // niente bottone fullscreen in background
                    iv_load_policy: 3,               // niente annotazioni
                    origin: window.location.origin
                },
                events: {
                    onReady: (event) => {
                        // in background assicura muto + play (alcuni browser lo richiedono)
                        if (background) {
                            try {
                                event.target.mute();
                                event.target.playVideo();
                            } catch (e) { /* noop */ }
                        }
                    },
                    onStateChange: (event) => {
                        // fallback loop: se il video finisce, ricomincia
                        if (loopPlay && event.data === window.YT.PlayerState.ENDED) {
                            event.target.seekTo(0);
                            event.target.playVideo();
                        }
                    },
                    onError: (event) => {
                        console.error('YouTube player error:', event.data);
                        setError(t.videoError || `Errore player: ${event.data}`);
                    }
                }
            });

            setPlayer(newPlayer);
            playerRef.current = newPlayer;
        } catch (err) {
            console.error('Errore creazione player YouTube:', err);
            setError(t.videoErrorGeneric || 'Impossibile creare il player video');
        }
    }, [isAPIReady, finalId, activated, hasConsent, player, t, autoPlay, loopPlay, background]);

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
                    {t.videoNotAvailable || "Video non disponibile"}
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
                        {t.videoOpenYouTube || "Apri su YouTube"}
                    </a>
                </div>
            </div>
        );
    }

    const handleActivation = () => {
        console.log('Attivando video...');
        setActivated(true);
        if (!hasConsent) {
            setHasConsent(true);
        }
    };

    // Placeholder: tutta l'area è cliccabile, niente più bottone
    // (saltato in background perché requiresConsent è false)
    if (!hasConsent || !activated) {
        return (
            <div
                className={`video-responsive ${className}`}
                onClick={handleActivation}
                role="button"
                tabIndex={0}
                aria-label={defaultPlaceholderText}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleActivation();
                    }
                }}
                style={{
                    position: "relative",
                    overflow: "hidden",
                    paddingBottom: aspectRatio,
                    height: isHomePage ? "100%" : 0,
                    width: "100%",
                    maxWidth: isHomePage ? "100%" : "1500px",
                    margin: "0 auto",
                    background: `#000 url(https://img.youtube.com/vi/${finalId}/maxresdefault.jpg) center / cover no-repeat`,
                    cursor: "pointer"
                }}
            >
                {/* icona play stile YouTube al centro */}
                <svg
                    height="48"
                    viewBox="0 0 68 48"
                    width="68"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none"
                    }}
                >
                    <path
                        d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                        fill="#f00"
                    />
                    <path d="M 45 24 L 27 14 L 27 34 Z" fill="#fff" />
                </svg>
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
                height: isHomePage ? "100%" : 0,
                width: "100%",
                maxWidth: isHomePage ? "100%" : "1500px",
                margin: "0 auto",
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

            {/* overlay trasparente: in background blocca hover/click sul player
                così non compaiono controlli YouTube e non si può mettere in pausa */}
            {background && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                        cursor: "default"
                    }}
                />
            )}

            {!player && isAPIReady && (
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                    fontSize: ".9rem"
                }}>
                    {t.videoLoading || "Caricamento video..."}
                </div>
            )}
        </div>
    );
};

export default YoutubeEmbed;