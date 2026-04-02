document.addEventListener('DOMContentLoaded', () => {

    /* --- Custom Cursor Logic --- */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');

    window.addEventListener('mousemove', (e) => {
        // We use requestAnimationFrame for butter smooth following
        requestAnimationFrame(() => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            // Add a slight lag to the glow for an organic floating effect
            setTimeout(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            }, 50);
        });
    });

    /* --- 3D Tilt Effect on Cards --- */
    const tiltCards = document.querySelectorAll('.hover-tilt');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                // Get constraints of the card
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element

                // Calculate rotation (max 10 degrees)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                // Apply the transformation
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                card.style.transition = 'none'; // remove transition for smooth instant tracking
            });
        });

        // Reset rotation on mouse leave
        card.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    });

    /* --- Scroll Reveal Animations (Intersection Observer) --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* --- Typing Effect for Hero Section --- */
    const textLines = [
        "AI & Data Science Enthusiast",
        "Full-Stack Web Developer",
        "Computer Vision Engineer"
    ];
    
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    let typingSpeed = 100;

    function type() {
        const currentLine = textLines[currentLineIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentLine.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Deleting speed
        } else {
            typingElement.textContent = currentLine.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Typing speed
        }

        if (!isDeleting && currentCharIndex === currentLine.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of line
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentLineIndex = (currentLineIndex + 1) % textLines.length;
            typingSpeed = 500; // Pause before new line
        }

        setTimeout(type, typingSpeed);
    }

    /* --- Parallax Effect on Morphing Blobs --- */
    const morphBg = document.querySelector('.morph-bg');
    window.addEventListener('scroll', () => {
        // Subtle shift upwards on deeper scroll
        const scrollAmount = window.scrollY;
        morphBg.style.transform = `translateY(${scrollAmount * 0.1}px)`;
    });

    /* --- Mobile Navigation ScrollSpy --- */
    const sections = document.querySelectorAll('.section');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (current && item.getAttribute('href') && item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            } else if (!current && item.getAttribute('href') === '#home') {
                item.classList.add('active');
            }
        });
    });

    // Start typing effect after 1 second
    setTimeout(type, 1000);

    /* --- Real-Time Visit Count --- */
    const visitCountElement = document.getElementById('visit-count');
    if (visitCountElement) {
        // Fetch up to increment the visit counter and get the latest count
        fetch('https://api.counterapi.dev/v1/tejesh_portfolio/visits/up')
            .then(response => response.json())
            .then(data => {
                if (data && data.count) {
                    visitCountElement.textContent = `${data.count} Profile Views`;
                } else {
                    visitCountElement.textContent = `1 Profile Views`;
                }
            })
            .catch(error => {
                console.error('Error fetching visit count:', error);
                visitCountElement.textContent = `Profile Views Unavailable`;
            });
    }

});
