// Reproduction exacte du curseur de la page index
document.addEventListener("DOMContentLoaded", function() {
    // Suppression des anciens curseurs s'ils existent (pour éviter les doublons)
    const oldCursors = document.querySelectorAll('.cursor-dot, .cursor-dot-outline');
    oldCursors.forEach(el => el.remove());
    
    // Création des éléments du curseur avec les mêmes classes et styles que sur index
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-dot-outline');
    document.body.appendChild(cursorOutline);
    
    // Variables pour la position de la souris
    let mouseX = -100; // Position initiale hors écran
    let mouseY = -100; // Position initiale hors écran
    
    // Variables pour le suivi fluide (comme sur index)
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Facteurs de lissage identiques à ceux de index
    const dotEasing = 0.2; // Vitesse de suivi du point central
    const outlineEasing = 0.1; // Vitesse de suivi du contour (plus lent pour l'effet traînant)
    
    // Fonction d'animation pour un mouvement fluide comme sur index
    function animateCursor() {
        // Calcul des nouvelles positions avec lissage
        dotX += (mouseX - dotX) * dotEasing;
        dotY += (mouseY - dotY) * dotEasing;
        outlineX += (mouseX - outlineX) * outlineEasing;
        outlineY += (mouseY - outlineY) * outlineEasing;
        
        // Application des positions avec transform pour de meilleures performances
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        
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
        
        // Afficher le curseur s'il était caché
        if (cursorDot.style.opacity !== '1') {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        }
    });
    
    // Gestion des éléments interactifs - exactement comme sur index
    const interactiveElements = document.querySelectorAll('a, button, .btn-outline, .cta-button, .nav-item, .social-link, .faq-question, input, select, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-hover');
            cursorOutline.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-hover');
            cursorOutline.classList.remove('cursor-hover');
        });
    });
    
    // Gestion de la visibilité du curseur
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    // Log pour le débogage
    console.log('Curseur personnalisé initialisé (version index)');
}); 