// ===== NAVIGATION SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate sections
document.querySelectorAll('.service-card, .contact-card, .about-content, .ceo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation class
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Show success message
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

        // Reset form
        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);

    // Log form data for reference
    console.log('Form submitted:', formData);
});

// ===== INTERACTIVE MOON CURSOR FOLLOWING =====
const interactiveMoon = document.getElementById('interactiveMoon');
const heroSection = document.querySelector('.hero');
let moonRect = null;
let heroRect = null;
let isInHero = false;

// Update rects on resize
const updateRects = () => {
    if (interactiveMoon) {
        moonRect = interactiveMoon.getBoundingClientRect();
    }
    if (heroSection) {
        heroRect = heroSection.getBoundingClientRect();
    }
};

window.addEventListener('resize', updateRects);
updateRects();

// Mouse move handler for moon
document.addEventListener('mousemove', (e) => {
    if (!interactiveMoon || !heroSection) return;

    heroRect = heroSection.getBoundingClientRect();
    isInHero = e.clientY >= heroRect.top && e.clientY <= heroRect.bottom;

    if (isInHero) {
        moonRect = interactiveMoon.getBoundingClientRect();
        const moonCenterX = moonRect.left + moonRect.width / 2;
        const moonCenterY = moonRect.top + moonRect.height / 2;

        // Calculate distance from cursor to moon center
        const deltaX = (e.clientX - moonCenterX) * 0.08;
        const deltaY = (e.clientY - moonCenterY) * 0.08;

        // Apply transform with smooth easing
        interactiveMoon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        // Also move the moon glow
        const moonGlow = document.querySelector('.moon-glow');
        if (moonGlow) {
            const glowX = (e.clientX / window.innerWidth - 0.5) * 50;
            const glowY = (e.clientY / window.innerHeight - 0.5) * 50;
            moonGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
        }
    }
});

// Reset moon position when mouse leaves hero
heroSection?.addEventListener('mouseleave', () => {
    if (interactiveMoon) {
        interactiveMoon.style.transform = 'translate(0, 0)';
    }
});

// Touch support for mobile - subtle floating animation
if ('ontouchstart' in window) {
    if (interactiveMoon) {
        interactiveMoon.style.animation = 'moonFloat 6s ease-in-out infinite';
    }
}

// Add floating animation for touch devices
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes moonFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(10px) rotate(-2deg); }
        }
    </style>
`);

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .nav-links a.active {
            color: var(--color-text-primary);
        }
        .nav-links a.active::after {
            width: 100%;
        }
    </style>
`);

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;

    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);

        if (!isNaN(number)) {
            let count = 0;
            const duration = 2000;
            const increment = number / (duration / 16);

            const updateCount = () => {
                count += increment;
                if (count < number) {
                    stat.textContent = Math.floor(count) + (text.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = text;
                }
            };

            updateCount();
        }
    });

    statsAnimated = true;
};

// Trigger stats animation when hero is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(animateStats, 500);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroObserver.observe(heroStats);
}

console.log('Lune Studios website loaded successfully!');
