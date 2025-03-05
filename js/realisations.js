// RaceLens - Gestion de la section Réalisations

document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des projets
    initializeFilters();
    
    // Animation au défilement
    initializeScrollAnimations();
    
    // Simulation de pagination
    initializePagination();
    
    // Amélioration de la grille
    setTimeout(enhanceRealisationsGrid, 1000);
});

// Initialisation des filtres
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.realisation-card');
    
    if (!filterButtons.length || !projects.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer la catégorie à filtrer
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrer les projets
            projects.forEach(project => {
                if (filterValue === 'all') {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    const categories = project.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Initialisation des animations au défilement
function initializeScrollAnimations() {
    const header = document.querySelector('.realisations-header');
    const filters = document.querySelector('.realisations-filters');
    const cards = document.querySelectorAll('.realisation-card');
    const footer = document.querySelector('.realisations-footer');
    
    // Fonction pour vérifier si un élément est dans le viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Fonction pour animer les éléments visibles
    function animateOnScroll() {
        if (header && isElementInViewport(header)) {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }
        
        if (filters && isElementInViewport(filters)) {
            filters.style.opacity = '1';
            filters.style.transform = 'translateY(0)';
        }
        
        cards.forEach(card => {
            if (isElementInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        if (footer && isElementInViewport(footer)) {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }
    }
    
    // Exécuter l'animation au chargement et au défilement
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}

// Initialisation de la pagination simulée
function initializePagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    if (!paginationBtns.length) return;
    
    paginationBtns.forEach(btn => {
        if (!btn.hasAttribute('disabled')) {
            btn.addEventListener('click', function() {
                // Simuler un chargement
                const cards = document.querySelectorAll('.realisation-card');
                cards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                });
                
                // Après un délai, réafficher les cartes (simulation de nouvelles cartes)
                setTimeout(() => {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    // Mettre à jour l'indicateur de page
                    const pageIndicator = document.querySelector('.page-indicator');
                    if (pageIndicator) {
                        pageIndicator.textContent = '5-8 sur 12 projets';
                    }
                    
                    // Mettre à jour l'état des boutons
                    paginationBtns[0].removeAttribute('disabled');
                    paginationBtns[1].setAttribute('disabled', '');
                }, 300);
            });
        }
    });
}

// Amélioration de la grille de réalisations
function enhanceRealisationsGrid() {
    // Trouver la section des réalisations
    const realisationsSection = document.querySelector('.realisations-section') || document.getElementById('realisations');
    
    if (!realisationsSection) return;
    
    // Trouver le conteneur de la grille
    function findGridContainer(section) {
        // Chercher un conteneur avec plusieurs images ou éléments
        const containers = section.querySelectorAll('div');
        for (const container of containers) {
            // Vérifier s'il contient plusieurs images
            const images = container.querySelectorAll('img');
            if (images.length >= 3) {
                return container;
            }
            
            // Vérifier s'il contient plusieurs éléments qui pourraient être des cartes
            const children = container.children;
            if (children.length >= 3) {
                let hasImages = true;
                for (const child of children) {
                    if (!child.querySelector('img')) {
                        hasImages = false;
                        break;
                    }
                }
                if (hasImages) {
                    return container;
                }
            }
        }
        
        // Si aucun conteneur spécifique n'est trouvé, retourner la section elle-même
        return section;
    }
    
    const gridContainer = findGridContainer(realisationsSection);
    
    if (!gridContainer) return;
    
    // Identifier les éléments de la grille
    let gridItems;
    const images = gridContainer.querySelectorAll('img');
    
    if (images.length >= 3) {
        // Si nous avons trouvé des images directement, utiliser leurs parents comme éléments de grille
        gridItems = [];
        images.forEach(img => {
            let parent = img.parentElement;
            // Remonter jusqu'à trouver un parent qui n'est pas juste un lien
            while (parent && (parent.tagName === 'A' || parent.children.length <= 1) && parent !== gridContainer) {
                parent = parent.parentElement;
            }
            if (parent && parent !== gridContainer) {
                gridItems.push(parent);
            } else {
                // Si on ne trouve pas de parent approprié, utiliser l'image directement
                gridItems.push(img);
            }
        });
        
        // Éliminer les doublons
        gridItems = [...new Set(gridItems)];
    } else {
        // Sinon, utiliser les enfants directs du conteneur
        gridItems = Array.from(gridContainer.children);
    }
    
    // Ajouter une feuille de style pour notre grille améliorée
    const styleSheet = document.createElement('style');
    const sectionId = 'realisations-section';
    const gridId = 'realisations-grid';
    const itemClass = 'realisation-item';
    
    // S'assurer que nos éléments ont les IDs et classes nécessaires
    realisationsSection.id = sectionId;
    gridContainer.id = gridId;
    gridItems.forEach(item => item.classList.add(itemClass));
    
    // Définir les styles
    styleSheet.textContent = `
        #${sectionId} {
            padding: 5rem 0 3rem;
            position: relative;
            z-index: 1;
        }
        
        #${gridId} {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 1.5rem !important;
            max-width: 1400px !important;
            margin: 0 auto !important;
            padding: 2rem 0 !important;
            box-sizing: border-box !important;
            width: auto !important;
            float: none !important;
        }
        
        .${itemClass} {
            position: relative !important;
            border-radius: 10px !important;
            overflow: hidden !important;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
            transition: all 0.3s ease !important;
            padding-bottom: 65% !important; /* Ratio 16:9 */
            cursor: pointer !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
            float: none !important;
            display: block !important;
        }
        
        .${itemClass} img {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            transition: all 0.5s ease !important;
        }
        
        .${itemClass}:hover img {
            transform: scale(1.1) !important;
        }
        
        /* Responsive */
        @media (max-width: 1200px) {
            #${gridId} {
                grid-template-columns: repeat(3, 1fr) !important;
            }
        }
        
        @media (max-width: 992px) {
            #${gridId} {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 1.2rem !important;
            }
        }
        
        @media (max-width: 576px) {
            #${gridId} {
                grid-template-columns: 1fr !important;
                max-width: 400px !important;
            }
            
            .${itemClass} {
                padding-bottom: 75% !important; /* Ratio 4:3 sur mobile */
            }
        }
    `;
    
    document.head.appendChild(styleSheet);
    
    // Nettoyer les styles existants qui pourraient interférer
    gridItems.forEach(item => {
        if (item.style) {
            item.style.width = '';
            item.style.height = '';
            item.style.margin = '';
            item.style.padding = '';
            item.style.float = '';
            item.style.display = '';
        }
    });
} 