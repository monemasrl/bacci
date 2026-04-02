/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// Inizializza GTM per il client-side
export const onClientEntry = () => {
    // Inizializza dataLayer se non esiste
    window.dataLayer = window.dataLayer || [];

    // Invia evento di inizializzazione
    window.dataLayer.push({
        event: 'gatsby-init',
        platform: 'gatsby'
    });
};

// Traccia i cambi di rotta
export const onRouteUpdate = ({ location, prevLocation }) => {
    // Aggiorna l'attributo lang dell'HTML in base alla lingua corrente (navigazione client-side)
    if (typeof document !== 'undefined') {
        const lang = location.pathname.startsWith('/en/') || location.pathname === '/en' ? 'en' : 'it';
        document.documentElement.setAttribute('lang', lang);
    }

    if (typeof window !== 'undefined' && window.dataLayer) {
        // Aspetta un po' per essere sicuri che la pagina sia caricata
        setTimeout(() => {
            window.dataLayer.push({
                event: 'gatsby-route-change',
                page_path: location.pathname,
                page_title: document.title,
                page_location: window.location.href,
                ...(prevLocation && { previous_page_path: prevLocation.pathname })
            });
        }, 100);
    }
};
