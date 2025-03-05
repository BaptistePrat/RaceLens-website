// RaceLens - Curseur personnalisé

document.addEventListener("DOMContentLoaded", function() {
    // Créer les éléments du curseur s'ils n'existent pas déjà
    if (!document.querySelector('.cursor-dot')) {
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
    }
    
    if (!document.querySelector('.cursor-dot-outline')) {
        const cursorOutline = document.createElement('div');
        cursorOutline.className = 'cursor-dot-outline';
        document.body.appendChild(cursorOutline);
    }
    
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-dot-outline");

    // Vérifier si les éléments existent
    if (!cursorDot || !cursorOutline) return;

    // Initialisation
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Rendre les curseurs visibles après le chargement
    setTimeout(() => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    }, 500);

    // Suivre le mouvement de la souris
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Le point central suit immédiatement
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    });

    // Animation fluide pour le cercle extérieur
    function animateOutline() {
        // Effet de retard pour le cercle extérieur
        outlineX += (mouseX - outlineX) * 0.2;
        outlineY += (mouseY - outlineY) * 0.2;
        
        cursorOutline.style.left = outlineX + "px";
        cursorOutline.style.top = outlineY + "px";
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Effet au survol des éléments cliquables
    const clickables = document.querySelectorAll('a, button, .nav-item, .portfolio-item, .service-card, .offer-card, .filter-btn, .pagination-btn');

    clickables.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.style.transform = "translate(-50%, -50%) scale(0.7)";
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
        });
    });
    
    // Effet de clic
    document.addEventListener('mousedown', () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(0.9)";
        cursorDot.style.transform = "translate(-50%, -50%) scale(0.7)";
    });
    
    document.addEventListener('mouseup', () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    });
    
    // Masquer le curseur par défaut
    document.documentElement.style.cursor = 'none';
    
    // Restaurer le curseur par défaut sur les appareils tactiles
    if ('ontouchstart' in window) {
        document.documentElement.style.cursor = 'auto';
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }
}); 