// ==========================================
// SHAHZAD & BROTHERS FERTILIZER - MAIN.JS
// ==========================================

// ==========================================
// NAVBAR FUNCTIONALITY
// ==========================================

const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// DARK MODE TOGGLE
// ==========================================

const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

const scrollToTop = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (scrollY > 300) {
        scrollToTop.classList.add('show');
    } else {
        scrollToTop.classList.remove('show');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// STATISTICS COUNTER ANIMATION
// ==========================================

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    let count = 0;
    const increment = target / 50;
    
    const updateCount = () => {
        count += increment;
        if (count < target) {
            element.textContent = Math.floor(count);
            setTimeout(updateCount, 30);
        } else {
            element.textContent = target;
        }
    };
    
    updateCount();
};

// Trigger counter animation when section comes into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'stats') {
            const counters = document.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.getElementById('stats');
if (statsSection) {
    observer.observe(statsSection);
}

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================

let currentTestimonial = 0;
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonialItems.forEach(item => item.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    currentTestimonial = index;
    testimonialItems[index].classList.add('active');
    testimonialDots[index].classList.add('active');
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
    showTestimonial(currentTestimonial);
}, 5000);

// ==========================================
// CONTACT FORM HANDLER
// ==========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create mailto link
        const mailtoLink = `mailto:shahzadncc1212@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        alert('Thank you for your message! We will get back to you soon.');
    });
}

// ==========================================
// SMOOTH SCROLL ENHANCEMENT
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// PRODUCT CARDS INTERACTION
// ==========================================

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    const button = card.querySelector('.btn');
    if (button) {
        button.addEventListener('click', () => {
            const productName = card.querySelector('.product-name').textContent;
            alert(`Product: ${productName}\n\nFor detailed information and pricing, please contact us:\nPhone: +92 343 7082553\nWhatsApp: +92 322 7494453\nEmail: shahzadncc1212@gmail.com`);
        });
    }
});

// ==========================================
// FEATURE CARDS HOVER EFFECT
// ==========================================

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ==========================================
// LAZY LOADING FOR IMAGES
// ==========================================

if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// SEARCH FUNCTIONALITY (IF NEEDED)
// ==========================================

function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchQuery = query.toLowerCase();
    
    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        const productDesc = product.querySelector('.product-desc').textContent.toLowerCase();
        
        if (productName.includes(searchQuery) || productDesc.includes(searchQuery)) {
            product.style.display = 'block';
            product.style.animation = 'fadeInUp 0.3s ease';
        } else {
            product.style.display = 'none';
        }
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Fade in elements on scroll
const fadeInOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .product-card, .gallery-item');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', fadeInOnScroll);

// ==========================================
// LOADING ANIMATION
// ==========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ==========================================
// UTILITY: Get current date
// ==========================================

function getCurrentYear() {
    return new Date().getFullYear();
}

// ==========================================
// UTILITY: Format phone number
// ==========================================

function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{7})$/);
    if (match) {
        return `+${match[1]} ${match[2]} ${match[3]}`;
    }
    return phone;
}

// ==========================================
// PAGE PERFORMANCE MONITORING
// ==========================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

console.log('Shahzad & Brothers Fertilizer Website - Loaded Successfully');
