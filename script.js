document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for advanced clip-path and card reveals
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animating in to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-card');
    revealElements.forEach(el => revealObserver.observe(el));

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(8, 8, 8, 0.95)';
        } else {
            navbar.style.background = 'rgba(8, 8, 8, 0.8)';
        }
    });

    // Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Ensure menu closes when clicking a link on mobile
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 3D Parallax Mouse Hover Effect for Contact Form & Interactive Cards
    // This allows elements to tilt toward the mouse
    const interactiveCards = document.querySelectorAll('.glass-card, .feature-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            // Get dimensions
            const rect = card.getBoundingClientRect();
            // Mouse position relative to card
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            // Normalize around the center of the card
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt degrees (Max ~8 degrees tilt)
            const tiltX = ((y - centerY) / centerY) * -8; 
            const tiltY = ((x - centerX) / centerX) * 8;
            
            // Apply 3D transform inline
            card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease-out';
            card.style.boxShadow = `${-tiltY * 2}px ${tiltX * 2}px 30px rgba(0, 0, 0, 0.3)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Smoothly reset back to flat
            card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.boxShadow = `none`;
        });
    });

});
