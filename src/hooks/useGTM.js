import { useEffect } from 'react';

export const useGTM = (hasConsent) => {
    const GTM_ID = "GTM-KRXXTL5G";

    const loadGTM = () => {
        // Evita di caricare GTM più volte
        if (window.dataLayer && window.dataLayer.find(item => item.event === 'gtm.js')) {
            return;
        }

        // Inizializza dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });

        // Carica lo script GTM
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        document.head.appendChild(script);

        // Carica il noscript fallback
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
    };

    const removeGTM = () => {
        // Rimuovi script GTM
        const scripts = document.querySelectorAll(`script[src*="${GTM_ID}"]`);
        scripts.forEach(script => script.remove());

        // Rimuovi noscript
        const noscripts = document.querySelectorAll(`noscript iframe[src*="${GTM_ID}"]`);
        noscripts.forEach(noscript => noscript.parentElement.remove());

        // Pulisci dataLayer
        if (window.dataLayer) {
            window.dataLayer = [];
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (hasConsent) {
                loadGTM();
            } else {
                removeGTM();
            }
        }
    }, [hasConsent]);

    return { loadGTM, removeGTM };
};