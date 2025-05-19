document.addEventListener('DOMContentLoaded', () => {
    // Page load fade-in
    document.body.classList.add('loaded');

    // Music Toggle
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isMusicPlaying = false;

    if (musicToggle && bgMusic) {
        bgMusic.volume = 0.3; // Set initial volume a bit lower

        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicToggle.textContent = '🔇';
                    musicToggle.classList.add('playing');
                    isMusicPlaying = true;
                }).catch(e => console.error("Error playing music:", e));
            } else {
                bgMusic.pause();
                musicToggle.textContent = '🎵';
                musicToggle.classList.remove('playing');
                isMusicPlaying = false;
            }
        });
    }

    // Dynamic Stars Background
    const starContainer = document.getElementById('star-container');
    if (starContainer) {
        const numberOfStars = 150; // More stars for a richer feel
        for (let i = 0; i < numberOfStars; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            const size = Math.random() * 2.5 + 0.5; // Star size between 0.5px and 3px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Math.random() * 7}s`;
            star.style.animationDuration = `${Math.random() * 5 + 5}s`; // Slightly varied twinkle
            starContainer.appendChild(star);
        }
    }

    // Enhanced Floating Elements
    const createFloatingElement = (type) => {
        const el = document.createElement('div');
        el.className = 'floating-element';
        
        let content = '';
        let color = '';

        // Make sure :root variables are accessible, fallback if not fully loaded
        const rootStyles = getComputedStyle(document.documentElement);
        const lovePink = rootStyles.getPropertyValue('--love-pink').trim() || '#FF69B4';
        const stardustPink = rootStyles.getPropertyValue('--stardust-pink').trim() || '#FFCAD4';
        const blushRed = rootStyles.getPropertyValue('--blush-red').trim() || '#E57373';
        const softPurple = rootStyles.getPropertyValue('--soft-purple').trim() || '#C3B1E1';
        const roseGold = rootStyles.getPropertyValue('--rose-gold').trim() || '#B76E79';

        const randomChoice = Math.random();
        if (type === 'heart' || randomChoice < 0.4) {
            const hearts = ['💖', '❤️', '💕', '😍'];
            content = hearts[Math.floor(Math.random() * hearts.length)];
            const heartColors = [lovePink, stardustPink, blushRed];
            color = heartColors[Math.floor(Math.random() * heartColors.length)];
        } else if (type === 'sparkle' || randomChoice < 0.8) {
            const sparkles = ['✨', '🌟', '✧', '✦'];
            content = sparkles[Math.floor(Math.random() * sparkles.length)];
            const sparkleColors = [softPurple, '#FFFFFF', roseGold];
            color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        } else { 
            if (isMusicPlaying && Math.random() > 0.3){ // Make musical notes less frequent
                const notes = ['🎵', '🎶', '🎼'];
                content = notes[Math.floor(Math.random() * notes.length)];
                color = stardustPink;
            } else {
                const sparkles = ['✨', '🌟', '✧', '✦']; // Fallback to sparkle
                content = sparkles[Math.floor(Math.random() * sparkles.length)];
                const sparkleColors = [softPurple, '#FFFFFF', roseGold];
                color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
            }
        }
        
        el.innerHTML = content;
        el.style.color = color;
        el.style.left = `${Math.random() * 95}%`;
        el.style.top = `${Math.random() * 90 + 5}%`;
        el.style.fontSize = `${Math.random() * 15 + 12}px`;
        
        const animationDuration = Math.random() * 10 + 10;
        el.style.animationDuration = `${animationDuration}s, 1s`; // For floatComposite, fadeInElement

        document.body.appendChild(el);

        setTimeout(() => {
            el.style.animationName = 'fadeOutElement'; // Switch to fadeOut animation
            el.style.animationDuration = '1s';
            el.style.animationIterationCount = '1';
            el.style.animationFillMode = 'forwards';
            el.style.animationTimingFunction = 'ease-out';
            setTimeout(() => el.remove(), 1000); // Remove after fadeOut
        }, (animationDuration * 1000) - 1000); // Start fadeOut 1s before floatComposite would loop
    };

    // Create CSS for fadeOutElement
    if (!document.getElementById('dynamic-animations-style')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = "dynamic-animations-style";
        styleSheet.innerText = `
            @keyframes fadeOutElement { 
                to { opacity: 0; transform: translateY(-30px) scale(0.5) rotate(15deg); } 
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Generate floating elements
    const numInitialElements = Math.floor(window.innerWidth / 150); // Scale with window width
    for(let i=0; i<numInitialElements; i++){
        setTimeout(() => createFloatingElement('random'), Math.random() * 1500); // Stagger initial ones
    }

    setInterval(() => {
        if (document.querySelectorAll('.floating-element').length < 25) { // Max 25 floating elements
             createFloatingElement(Math.random() > 0.6 ? 'heart' : 'sparkle'); // Slightly more sparkles
        }
    }, 1800); // Add a new one every ~1.8 seconds if below limit

    // Highlight active nav link
    const currentPagePath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-header nav ul li a');

    navLinks.forEach(link => {
        // Normalize href to compare with pathname effectively
        const linkPath = new URL(link.href).pathname;
        link.classList.remove('active'); // Remove active from all first

        if (linkPath === currentPagePath) {
            link.classList.add('active');
        }
        // Handle index.html explicitly for root path
        if (currentPagePath === '/' || currentPagePath === '/index.html' || currentPagePath.endsWith('/index.html')) {
            if (linkPath.endsWith('/index.html') || linkPath === '/') {
                 document.querySelector('nav a[href="index.html"]').classList.add('active');
            }
        }
    });
});