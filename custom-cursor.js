/**
 * RaceLens Custom Cursor
 * Script autonome pour gérer le curseur personnalisé sur toutes les pages
 */
(function() {
    // Fonction d'initialisation du curseur
    function initCustomCursor() {
        console.log("Initialisation du curseur personnalisé RaceLens");
        
        // Suppression des curseurs existants pour éviter les doublons
        const existingCursors = document.querySelectorAll('.racelens-cursor-dot, .racelens-cursor-outline, .cursor-dot, .cursor-dot-outline');
        existingCursors.forEach(el => el.remove());
        
        // Suppression des anciens styles de curseur
        const oldStyles = document.querySelectorAll('style');
        oldStyles.forEach(style => {
            if (style.textContent.includes('cursor-dot') || 
                style.textContent.includes('cursor-outline') || 
                style.id === 'cursor-styles') {
                style.remove();
            }
        });
        
        // Création des nouveaux styles avec une spécificité plus élevée
        if (!document.getElementById('racelens-cursor-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'racelens-cursor-styles';
            styleElement.textContent = `
                /* Règles renforcées pour masquer le curseur par défaut */
                html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
                    cursor: none !important;
                }
                
                /* Règles spécifiques pour les éléments interactifs */
                a, button, .btn-outline, .cta-button, .nav-item, .social-link, .faq-question, input, select, textarea, [role="button"], [type="button"], [type="submit"], [type="reset"] {
                    cursor: none !important;
                }
                
                /* Règles pour les éléments avec des curseurs spécifiques */
                [style*="cursor"], [style*="pointer"], [style*="default"], [style*="text"] {
                    cursor: none !important;
                }
                
                /* Styles pour le point central du curseur personnalisé */
                .racelens-cursor-dot {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 8px;
                    height: 8px;
                    background-color: #0761ef;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 999999;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out, background-color 0.3s ease-in-out;
                    will-change: transform;
                }
                
                /* Styles pour le contour du curseur personnalisé */
                .racelens-cursor-outline {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(7, 97, 239, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 999998;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out, border-color 0.3s ease-in-out;
                    will-change: transform;
                }
                
                /* Styles pour l'état de survol */
                .racelens-cursor-hover.racelens-cursor-dot {
                    width: 12px;
                    height: 12px;
                    background-color: #fff;
                }
                
                .racelens-cursor-hover.racelens-cursor-outline {
                    width: 60px;
                    height: 60px;
                    border-color: rgba(255, 255, 255, 0.5);
                }
            `;
            document.head.appendChild(styleElement);
        }
        
        // Création des éléments du curseur
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('racelens-cursor-dot');
        document.body.appendChild(cursorDot);
        
        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('racelens-cursor-outline');
        document.body.appendChild(cursorOutline);
        
        // Variables pour la position de la souris
        let mouseX = -100;
        let mouseY = -100;
        
        // Variables pour le suivi fluide
        let dotX = 0;
        let dotY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        // Fonction d'animation pour un mouvement fluide
        function animateCursor() {
            // Calcul des nouvelles positions avec lissage
            dotX += (mouseX - dotX) * 0.2;
            dotY += (mouseY - dotY) * 0.2;
            outlineX += (mouseX - outlineX) * 0.1;
            outlineY += (mouseY - outlineY) * 0.1;
            
            // Application des positions
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
            
            // Continuer l'animation
            requestAnimationFrame(animateCursor);
        }
        
        // Démarrer l'animation
        animateCursor();
        
        // Écouteur d'événement pour le mouvement de la souris
        document.addEventListener('mousemove', function(e) {
            // Mettre à jour les coordonnées de la souris
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Afficher le curseur
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
        
        // Gestion des éléments interactifs
        function updateInteractiveElements() {
            const interactiveElements = document.querySelectorAll('a, button, .btn-outline, .cta-button, .nav-item, .social-link, .faq-question, input, select, textarea, [role="button"]');
            
            interactiveElements.forEach(element => {
                // Vérifier si l'élément a déjà les écouteurs d'événements
                if (!element.dataset.cursorListenersAdded) {
                    element.addEventListener('mouseenter', () => {
                        cursorDot.classList.add('racelens-cursor-hover');
                        cursorOutline.classList.add('racelens-cursor-hover');
                    });
                    
                    element.addEventListener('mouseleave', () => {
                        cursorDot.classList.remove('racelens-cursor-hover');
                        cursorOutline.classList.remove('racelens-cursor-hover');
                    });
                    
                    // Marquer l'élément comme ayant déjà les écouteurs
                    element.dataset.cursorListenersAdded = 'true';
                    
                    // Forcer le style cursor: none !important
                    element.style.setProperty('cursor', 'none', 'important');
                }
            });
        }
        
        // Initialiser les écouteurs pour les éléments interactifs
        updateInteractiveElements();
        
        // Mettre à jour les écouteurs lorsque le DOM change
        const observer = new MutationObserver(updateInteractiveElements);
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Gestion de la visibilité du curseur
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        
        // Forcer l'application du style cursor: none sur tous les éléments
        function forceNoCursor() {
            // Appliquer directement sur tous les éléments
            const allElements = document.querySelectorAll('*');
            allElements.forEach(el => {
                el.style.setProperty('cursor', 'none', 'important');
            });
            
            // Appliquer sur le document et le body
            document.documentElement.style.setProperty('cursor', 'none', 'important');
            document.body.style.setProperty('cursor', 'none', 'important');
        }
        
        // Appliquer immédiatement
        forceNoCursor();
        
        // Réappliquer périodiquement pour gérer les éléments dynamiques
        setInterval(forceNoCursor, 2000);
    }
    
    // Initialiser le curseur lorsque le DOM est chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomCursor);
    } else {
        initCustomCursor();
    }
    
    // Réinitialiser le curseur lors des changements de page avec AJAX
    window.addEventListener('load', initCustomCursor);
    
    // Exposer la fonction d'initialisation globalement pour permettre la réinitialisation manuelle
    window.reinitRaceLensCursor = initCustomCursor;
})(); 