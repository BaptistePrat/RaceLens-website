// Animation au scroll avec AOS
AOS.init({
    duration: 1000,
    once: true
});

// Navigation fluide
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(item.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Suivi du scroll pour le menu
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Curseur personnalisé
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// Création des traînées
const trails = Array.from({length: 5}, (_, i) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = (1 - i * 0.2);
    document.body.appendChild(trail);
    return trail;
});

let mouseX = 0, mouseY = 0;
let trailPositions = trails.map(() => ({x: 0, y: 0}));

// Mise à jour de la position du curseur
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
    
    // Effet de grossissement au survol des éléments cliquables
    const target = e.target;
    if (target.closest('a') || target.closest('button')) {
        cursor.style.transform = `translate(${mouseX - 15}px, ${mouseY - 15}px) scale(1.5)`;
    }
});

// Animation des traînées
function animateTrails() {
    trailPositions.forEach((pos, i) => {
        pos.x += (mouseX - pos.x) * (0.2 / (i + 1));
        pos.y += (mouseY - pos.y) * (0.2 / (i + 1));
        trails[i].style.transform = `translate(${pos.x - 5}px, ${pos.y - 5}px)`;
    });
    
    requestAnimationFrame(animateTrails);
}

animateTrails(); 