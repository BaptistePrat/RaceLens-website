// Transitions de page
const pageTransition = {
    in: () => {
        const tl = gsap.timeline();
        tl.fromTo('.page-content', 
            {opacity: 0, y: 50},
            {opacity: 1, y: 0, duration: 0.8, ease: "power2.out"}
        );
        return tl;
    },
    out: () => {
        const tl = gsap.timeline();
        tl.to('.page-content', 
            {opacity: 0, y: -50, duration: 0.5, ease: "power2.in"}
        );
        return tl;
    }
}; 