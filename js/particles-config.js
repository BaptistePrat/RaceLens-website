// RaceLens - Configuration des particules

document.addEventListener("DOMContentLoaded", function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-canvas", {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#0761ef"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#0761ef",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn("La bibliothèque particles.js n'est pas chargée.");
    }
    
    // Créer les orbes lumineux
    createGlowOrbs();
});

// Fonction pour créer les orbes lumineux
function createGlowOrbs() {
    // Supprimer les orbes existants
    const existingOrbs = document.querySelectorAll('.glow-orb, .fixed-glow-orb');
    existingOrbs.forEach(orb => orb.remove());
    
    // Ajouter des keyframes pour les animations
    if (!document.getElementById('orb-animations')) {
        const animationStyles = document.createElement('style');
        animationStyles.id = 'orb-animations';
        
        animationStyles.textContent = `
            @keyframes floatSlow1 {
                0% { transform: translate(0, 0); }
                25% { transform: translate(-50px, 30px); }
                50% { transform: translate(20px, -40px); }
                75% { transform: translate(40px, 20px); }
                100% { transform: translate(0, 0); }
            }
            
            @keyframes floatSlow2 {
                0% { transform: translate(0, 0); }
                33% { transform: translate(40px, -30px); }
                66% { transform: translate(-30px, -20px); }
                100% { transform: translate(0, 0); }
            }
            
            @keyframes floatSlow3 {
                0% { transform: translate(0, 0); }
                20% { transform: translate(-20px, 40px); }
                40% { transform: translate(30px, 20px); }
                60% { transform: translate(10px, -30px); }
                80% { transform: translate(-40px, -10px); }
                100% { transform: translate(0, 0); }
            }
            
            @keyframes floatSlow4 {
                0% { transform: translate(0, 0); }
                30% { transform: translate(30px, 30px); }
                60% { transform: translate(-20px, -40px); }
                100% { transform: translate(0, 0); }
            }
            
            @keyframes pulse {
                0% { opacity: 0.4; }
                50% { opacity: 0.6; }
                100% { opacity: 0.4; }
            }
        `;
        document.head.appendChild(animationStyles);
    }
    
    // Styles pour les orbes fixes
    const orbStyles = [
        `position: fixed; top: 15%; left: 15%; width: 300px; height: 300px; background: radial-gradient(circle at center, rgba(7, 97, 239, 0.6), rgba(7, 97, 239, 0) 70%); border-radius: 50%; filter: blur(50px); z-index: 0; opacity: 0.4; animation: floatSlow1 30s ease-in-out infinite, pulse 8s ease-in-out infinite;`,
        
        `position: fixed; top: 75%; left: 80%; width: 250px; height: 250px; background: radial-gradient(circle at center, rgba(7, 97, 239, 0.5), rgba(7, 97, 239, 0) 70%); border-radius: 50%; filter: blur(60px); z-index: 0; opacity: 0.3; animation: floatSlow2 25s ease-in-out infinite, pulse 10s ease-in-out infinite;`,
        
        `position: fixed; top: 85%; left: 25%; width: 400px; height: 400px; background: radial-gradient(circle at center, rgba(7, 97, 239, 0.4), rgba(7, 97, 239, 0) 70%); border-radius: 50%; filter: blur(70px); z-index: 0; opacity: 0.35; animation: floatSlow3 35s ease-in-out infinite, pulse 12s ease-in-out infinite;`,
        
        `position: fixed; top: 30%; left: 85%; width: 350px; height: 350px; background: radial-gradient(circle at center, rgba(7, 97, 239, 0.5), rgba(7, 97, 239, 0) 70%); border-radius: 50%; filter: blur(55px); z-index: 0; opacity: 0.3; animation: floatSlow4 28s ease-in-out infinite, pulse 9s ease-in-out infinite;`
    ];
    
    // Créer et ajouter chaque orbe au body
    orbStyles.forEach(style => {
        const orb = document.createElement('div');
        orb.setAttribute('style', style);
        orb.className = 'fixed-glow-orb';
        document.body.appendChild(orb);
    });
} 