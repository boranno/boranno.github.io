// Portfolio Website JavaScript with Smooth Page Transitions
// Author: Enhanced Portfolio Script
// Description: Interactive functionality with smooth page transitions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPageTransitions();
    initNavigation();
    initScrollAnimations();
    initSkillsAnimations();
    initProjectFilters();
    initTypingEffect();
    initMobileMenu();
    initSmoothScrolling();
    initThemeToggle();
    initContactForm();
    initLoadingAnimation();
});

// ==========================================
// PAGE TRANSITIONS
// ==========================================
function initPageTransitions() {
    // Create page transition overlay
    createTransitionOverlay();
    
    // Handle all internal navigation links
    const internalLinks = document.querySelectorAll('a[href]:not([href^="http"]):not([href^="mailto"]):not([href^="tel"]):not([href^="#"])');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            // Don't transition if it's the same page
            if (targetUrl === window.location.pathname) return;
            
            performPageTransition(targetUrl);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.url) {
            performPageTransition(e.state.url, false);
        }
    });
    
    // Add current page to history
    if (window.history.pushState) {
        history.replaceState({ url: window.location.pathname }, document.title, window.location.pathname);
    }
}

function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-content">
            <div class="transition-loader">
                <div class="loader-ring"></div>
                <div class="loader-ring"></div>
                <div class="loader-ring"></div>
            </div>
            <div class="transition-text">Loading...</div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Add CSS for transition overlay
    addTransitionStyles();
}

function addTransitionStyles() {
    if (document.getElementById('transition-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'transition-styles';
    style.textContent = `
        .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #000000 0%, #111111 50%, #1a1a1a 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
        }
        
        .page-transition-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .transition-content {
            text-align: center;
            color: white;
            transform: translateY(30px);
            transition: transform 0.5s ease;
        }
        
        .page-transition-overlay.active .transition-content {
            transform: translateY(0);
        }
        
        .transition-loader {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
        }
        
        .loader-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid transparent;
            border-top: 2px solid #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .loader-ring:nth-child(2) {
            width: 60px;
            height: 60px;
            top: 10px;
            left: 10px;
            animation-delay: -0.3s;
            border-top-color: #cccccc;
        }
        
        .loader-ring:nth-child(3) {
            width: 40px;
            height: 40px;
            top: 20px;
            left: 20px;
            animation-delay: -0.6s;
            border-top-color: #888888;
        }
        
        .transition-text {
            font-size: 1.2rem;
            font-weight: 300;
            opacity: 0.8;
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 0.4; }
        }
        
        /* Page fade effects */
        .page-fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .page-fade-in {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.3s ease;
        }
        
        /* Loading animation styles */
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        
        .page-loader.fade-out {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .logo-animation {
            font-size: 3rem;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 2rem;
            animation: logoFadeIn 1s ease;
        }
        
        .progress-bar-container {
            width: 300px;
            height: 4px;
            background: #333;
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #ffffff, #cccccc);
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 2px;
        }
        
        @keyframes logoFadeIn {
            0% {
                opacity: 0;
                transform: scale(0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

function performPageTransition(targetUrl, pushState = true) {
    const overlay = document.querySelector('.page-transition-overlay');
    const mainContent = document.querySelector('main') || document.body;
    
    // Show transition overlay
    overlay.classList.add('active');
    mainContent.classList.add('page-fade-out');
    
    // Add to browser history
    if (pushState && window.history.pushState) {
        history.pushState({ url: targetUrl }, '', targetUrl);
    }
    
    // Simulate loading time and navigate
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 800);
}

// ==========================================
// ENHANCED LOADING ANIMATION
// ==========================================
function initLoadingAnimation() {
    // Create page loader if it doesn't exist
    if (!document.querySelector('.page-loader')) {
        createPageLoader();
    }
    
    // Simulate loading progress
    simulateLoading();
}

function createPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="logo-animation">Portfolio</div>
        <div class="progress-bar-container">
            <div class="progress-bar-fill" id="progress-fill"></div>
        </div>
    `;
    document.body.appendChild(loader);
}

function simulateLoading() {
    const progressFill = document.getElementById('progress-fill');
    const loader = document.querySelector('.page-loader');
    
    if (!progressFill || !loader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loader after completion
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                    document.body.classList.add('loaded');
                    startPageAnimations();
                }, 500);
            }, 300);
        }
        
        progressFill.style.width = progress + '%';
    }, 100);
}

function startPageAnimations() {
    // Trigger entrance animations
    const elementsToAnimate = document.querySelectorAll('.section, .hero-title, .hero-subtitle');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * 100);
    });
}

// ==========================================
// NAVIGATION FUNCTIONALITY (Enhanced)
// ==========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect with smooth transition
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Active link highlighting with animation
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Add click ripple effect
            createRippleEffect(this);
        });
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    element.appendChild(ripple);
    
    // Position ripple
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    // Add ripple animation
    ripple.style.cssText += `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // Add ripple keyframes if not exists
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ==========================================
// ENHANCED MOBILE MENU
// ==========================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isActive = navLinks.classList.contains('active');
            
            if (isActive) {
                // Close menu with animation
                navLinks.style.animation = 'slideUp 0.3s ease forwards';
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    navLinks.style.animation = '';
                }, 300);
            } else {
                // Open menu with animation
                navLinks.classList.add('active');
                navLinks.style.animation = 'slideDown 0.3s ease forwards';
            }
            
            this.classList.toggle('active');
            
            // Animate hamburger icon
            if (this.classList.contains('active')) {
                this.innerHTML = '✕';
                this.style.transform = 'rotate(180deg)';
            } else {
                this.innerHTML = '☰';
                this.style.transform = 'rotate(0deg)';
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.style.transform = 'rotate(0deg)';
            });
        });
        
        // Add mobile menu animations
        addMobileMenuStyles();
    }
}

function addMobileMenuStyles() {
    if (document.getElementById('mobile-menu-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'mobile-menu-styles';
    style.textContent = `
        #mobile-menu-btn {
            transition: transform 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// SCROLL ANIMATIONS (Enhanced)
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.project-card, .skill-category, .cert-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .overview-card, .project-card, .certification-card, .achievement-card, .skill-category');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// SKILLS PROGRESS BARS ANIMATION
// ==========================================
function initSkillsAnimations() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });
}

// ==========================================
// PROJECT FILTERING
// ==========================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.classList.add('show');
                    }, index * 50);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('show');
                }
            });
        });
    });
}

// ==========================================
// TYPING EFFECT FOR HERO SECTION
// ==========================================
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (!heroTitle) return;

    const titles = [
        "Hello, I'm Boranno Goloder",
        "I'm a Developer",
        "I'm a Problem Solver",
        "I'm a Tech Enthusiast"
    ];
    
    const subtitles = [
        "Computer Science & Engineering Student",
        "Full-Stack Web Developer",
        "AI/ML Enthusiast",
        "Open Source Contributor"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentTitle = titles[titleIndex];
        const currentSubtitle = subtitles[titleIndex];
        
        if (isDeleting) {
            heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        heroSubtitle.textContent = currentSubtitle;

        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        setTimeout(typeWriter, 1000); // Delay to let page load
    }
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// THEME TOGGLE
// ==========================================
// function initThemeToggle() {
//     const navbar = document.querySelector('.nav-container');
//     if (navbar && !document.querySelector('.theme-toggle')) {
//         const themeToggle = document.createElement('button');
//         themeToggle.className = 'theme-toggle';
//         themeToggle.innerHTML = '🌙';
//         themeToggle.setAttribute('aria-label', 'Toggle theme');
//         navbar.appendChild(themeToggle);
        
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme) {
//             document.body.setAttribute('data-theme', savedTheme);
//             themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
//         }
        
//         themeToggle.addEventListener('click', function() {
//             const currentTheme = document.body.getAttribute('data-theme');
//             const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
//             document.body.setAttribute('data-theme', newTheme);
//             localStorage.setItem('theme', newTheme);
//             this.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
//         });
//     }
// }

// ==========================================
// CONTACT FORM HANDLING
// ==========================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// PERFORMANCE OPTIMIZATIONS
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ERROR HANDLING
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// KEYBOARD NAVIGATION
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('nav-links');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
    }
});

// ANALYTICS
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
}

trackEvent('page_view', {
    page: window.location.pathname,
    title: document.title
});

document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .project-link, .cert-verify')) {
        trackEvent('button_click', {
            button_text: e.target.textContent,
            button_class: e.target.className
        });
    }
});

// EXPORT FOR MODULES
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initScrollAnimations,
        initSkillsAnimations,
        initProjectFilters,
        showNotification,
        performPageTransition
    };
}