// ==========================================
// SHAHZAD & BROTHERS FERTILIZER - ANIMATIONS.JS
// Advanced Animation Library using Intersection Observer
// ==========================================

class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        this.animatedElements = new Set();
    }

    init() {
        this.observeElements('[data-animate]');
        this.observeElements('.feature-card');
        this.observeElements('.product-card');
        this.observeElements('.gallery-item');
        this.observeElements('.about-text');
        this.observeElements('.contact-form');
    }

    observeElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                this.animateElement(entry.target);
                this.animatedElements.add(entry.target);
            }
        });
    }

    animateElement(element) {
        const animationType = element.getAttribute('data-animate') || 'fadeInUp';
        const delay = element.getAttribute('data-delay') || '0';
        const duration = element.getAttribute('data-duration') || '0.6s';

        element.style.animation = `${animationType} ${duration} ease ${delay}s forwards`;
    }
}

// Initialize animation observer
document.addEventListener('DOMContentLoaded', () => {
    const animationObserver = new AnimationObserver();
    animationObserver.init();
});

// ==========================================
// PARALLAX EFFECT
// ==========================================

class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length > 0) {
            window.addEventListener('scroll', this.update.bind(this));
        }
    }

    update() {
        this.elements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -window.scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ParallaxEffect();
});

// ==========================================
// STAGGER ANIMATION
// ==========================================

class StaggerAnimation {
    constructor(selector, delay = 0.1) {
        this.elements = document.querySelectorAll(selector);
        this.delay = delay;
        this.init();
    }

    init() {
        this.elements.forEach((element, index) => {
            element.style.setProperty('--stagger-delay', `${index * this.delay}s`);
            element.classList.add('stagger-animated');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StaggerAnimation('.feature-card', 0.1);
    new StaggerAnimation('.product-card', 0.1);
});

// ==========================================
// SCROLL REVEAL
// ==========================================

class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('[data-reveal]');
        this.revealOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        this.revealOnScroll = new IntersectionObserver(
            this.reveal.bind(this),
            this.revealOptions
        );
        this.init();
    }

    init() {
        this.revealElements.forEach(element => {
            this.revealOnScroll.observe(element);
        });
    }

    reveal(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                this.revealOnScroll.unobserve(entry.target);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
});

// ==========================================
// TEXT ANIMATION - TYPING EFFECT
// ==========================================

class TypewriterEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    start() {
        this.element.textContent = '';
        this.type();
    }
}

// Apply typewriter effect to hero title (optional)
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        const typewriter = new TypewriterEffect(heroTitle, originalText, 30);
        setTimeout(() => typewriter.start(), 300);
    }
});

// ==========================================
// FLOATING ANIMATION
// ==========================================

const addFloatingAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        
        .floating {
            animation: float 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', addFloatingAnimation);

// ==========================================
// GLOW EFFECT
// ==========================================

class GlowEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            element.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
        });
    }

    handleMouseMove(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        element.style.background = `radial-gradient(
            circle at ${x}px ${y}px,
            rgba(212, 175, 55, 0.3),
            rgba(45, 106, 79, 0.05)
        )`;
    }

    handleMouseLeave(e) {
        e.currentTarget.style.background = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GlowEffect('.feature-card');
});

// ==========================================
// COUNTER ANIMATION (ENHANCED)
// ==========================================

class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.current = 0;
        this.increment = target / (duration / 16);
        this.observed = false;
    }

    start() {
        if (this.observed) return;
        this.observed = true;
        this.animate();
    }

    animate() {
        this.current += this.increment;
        
        if (this.current < this.target) {
            this.element.textContent = Math.floor(this.current);
            requestAnimationFrame(() => this.animate());
        } else {
            this.element.textContent = this.target;
        }
    }
}

// Initialize counters
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = new CounterAnimation(
                    entry.target,
                    parseInt(entry.target.getAttribute('data-count')),
                    1500
                );
                counter.start();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});

// ==========================================
// SMOOTH SCROLL SNAP
// ==========================================

const enableScrollSnap = () => {
    document.documentElement.style.scrollBehavior = 'smooth';
};

document.addEventListener('DOMContentLoaded', enableScrollSnap);

// ==========================================
// PAGE TRANSITION ANIMATION
// ==========================================

class PageTransition {
    constructor() {
        this.transitionDuration = 300;
    }

    startTransition() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, this.transitionDuration);
    }
}

// ==========================================
// ELEMENT SCALE ON SCROLL
// ==========================================

class ScaleOnScroll {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'scale(1)';
                    entry.target.style.opacity = '1';
                } else {
                    entry.target.style.transform = 'scale(0.95)';
                    entry.target.style.opacity = '0.7';
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(element => {
            element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            scaleObserver.observe(element);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScaleOnScroll('.product-card');
    new ScaleOnScroll('.gallery-item');
});

// ==========================================
// GRADIENT ANIMATION
// ==========================================

const addGradientAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
        
        .gradient-animated {
            background-size: 200% 200%;
            animation: gradientShift 6s ease infinite;
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', addGradientAnimation);

// ==========================================
// RIPPLE EFFECT ON CLICK
// ==========================================

class RippleEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('click', (e) => this.createRipple(e));
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Remove existing ripples
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);
    }
}

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    markStart(label) {
        this.metrics[label] = performance.now();
    }

    markEnd(label) {
        if (this.metrics[label]) {
            const duration = performance.now() - this.metrics[label];
            console.log(`${label}: ${duration.toFixed(2)}ms`);
        }
    }
}

// Initialize performance monitor
const perfMonitor = new PerformanceMonitor();

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Animation system initialized successfully');
    
    // Add any additional initialization here
    prefersReducedMotion();
});

// ==========================================
// ACCESSIBILITY: PREFERS REDUCED MOTION
// ==========================================

function prefersReducedMotion() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReduced.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================
// MOBILE SPECIFIC ANIMATIONS
// ==========================================

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile()) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--transition', 'all 0.15s ease');
}
