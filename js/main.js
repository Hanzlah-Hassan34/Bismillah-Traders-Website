// Modern JavaScript Framework for Bismillah Traders
// Enhanced with animations, interactions, and mobile navigation

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all main functions
    initPageLoader();
    initFloatingShapes();
    initScrollEffects();
    initNavigationEffects();
    initFAQToggle();
    initScrollToTop();
    initAnimationObserver();
    initParticleEffect();
    initTypewriterEffect();
    initCardAnimations();
    initCounterAnimations();
    initProgressiveLoad();
    initMobileNavigation();
    
    // Initialize page-specific features
    if (window.location.pathname.includes('products.html')) {
        initProductCardFlips();
    }
    
    console.log('Bismillah Traders - All systems loaded successfully!');
});

// Page Loader Animation
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    
    // Hide loader after page load with animation
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        }, 1500); // Show loader for at least 1.5 seconds
    });
}

// Floating Background Shapes Animation
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    
    shapes.forEach((shape, index) => {
        // Random animation duration for each shape
        const duration = 4 + Math.random() * 4; // 4-8 seconds
        shape.style.animationDuration = duration + 's';
        
        // Random delay for staggered effect
        shape.style.animationDelay = (index * 0.5) + 's';
        
        // Add mouse interaction
        shape.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
}

// Enhanced Scroll Effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for floating shapes
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Header background opacity
        const header = document.querySelector('header');
        if (header) {
            const opacity = Math.min(scrolled / 100, 0.95);
            header.style.background = `rgba(255, 255, 255, ${opacity})`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Mobile Navigation
function initMobileNavigation() {
    // Create mobile menu button if it doesn't exist
    let mobileBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileBtn) {
        mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '☰';
        
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.appendChild(mobileBtn);
        }
    }
    
    const navList = document.querySelector('.nav-list');
    
    if (mobileBtn && navList) {
        mobileBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Animate button
            if (navList.classList.contains('active')) {
                this.innerHTML = '✕';
                this.style.transform = 'rotate(180deg)';
            } else {
                this.innerHTML = '☰';
                this.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('header') && navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileBtn.innerHTML = '☰';
                mobileBtn.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when clicking on nav links
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('active');
                mobileBtn.innerHTML = '☰';
                mobileBtn.style.transform = 'rotate(0deg)';
            });
        });
    }
}

// Enhanced Navigation Effects
function initNavigationEffects() {
    updateActiveNavLink();
    
    // Add smooth scroll to anchor links
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Enhanced FAQ Toggle with Animations
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            // Remove any existing onclick attribute
            question.removeAttribute('onclick');
            
            // Add proper event listener
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleFAQ(this);
            });
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add click animation
            this.style.transform = 'scale(0.8)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
}

// Intersection Observer for Animations
function initAnimationObserver() {
    const animatedElements = document.querySelectorAll('.animate-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animate-in class to cards that don't have it
    const cards = document.querySelectorAll('.card-base, .category-card, .product-card');
    cards.forEach((card, index) => {
        if (!card.classList.contains('animate-in')) {
            card.classList.add('animate-in');
            card.style.transitionDelay = (index * 0.1) + 's';
            observer.observe(card);
        }
    });
}

// Enhanced Particle Effect System
function initParticleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .category-card, .product-card');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createParticles(e, this);
        });
    });
}

function createParticles(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create multiple particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `hsl(${120 + Math.random() * 60}, 70%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        element.style.position = 'relative';
        element.appendChild(particle);
        
        // Random direction and velocity
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 30 + Math.random() * 20;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        animateParticle(particle, vx, vy);
    }
}

function animateParticle(particle, vx, vy) {
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    let scale = 1;
    let rotation = 0;
    
    function animate() {
        posX += vx * 0.05;
        posY += vy * 0.05 + 0.5; // Add gravity
        opacity -= 0.02;
        scale += 0.03;
        rotation += 5;
        
        particle.style.transform = `translate(${posX}px, ${posY}px) scale(${scale}) rotate(${rotation}deg)`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// Typewriter Effect for Hero Text
function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && heroTitle.textContent) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--accent-green)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typewriter effect after loader
        setTimeout(typeWriter, 2000);
    }
}

// Enhanced Card Animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.card-base, .category-card, .product-card');
    
    cards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0)';
            
            // Animate child elements
            const icon = this.querySelector('.category-icon, .product-image, .contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            const icon = this.querySelector('.category-icon, .product-image, .contact-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Progressive Loading Effect
function initProgressiveLoad() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'all 0.6s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // If already loaded
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Enhanced Ripple Effect
function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (event.clientX - rect.left - radius) + 'px';
    circle.style.top = (event.clientY - rect.top - radius) + 'px';
    circle.classList.add('ripple');
    
    // Ripple styles
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(255,255,255,0.6)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple-animation 0.6s linear';
    circle.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    const ripple = element.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    element.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// WhatsApp Integration Helper
function openWhatsApp(productName, companyName) {
    const message = `Hello! I'm interested in ${productName} from ${companyName}. Can you provide more information about pricing and availability?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923371617023?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Enhanced FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = element.querySelector('.faq-toggle');
    
    if (!answer || !toggle) {
        console.error('FAQ elements not found');
        return;
    }
    
    // Toggle current FAQ without closing others
    const isActive = answer.classList.contains('active');
    
    if (!isActive) {
        // Open the FAQ
        answer.classList.add('active');
        toggle.classList.add('active');
        element.style.background = 'linear-gradient(135deg, var(--secondary-green), var(--primary-green))';
        element.style.color = 'var(--white)';
        
        console.log('FAQ opened');
        
        // Scroll to FAQ if needed
        setTimeout(() => {
            const rect = element.getBoundingClientRect();
            if (rect.bottom > window.innerHeight) {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 400);
    } else {
        // Close the FAQ
        answer.classList.remove('active');
        toggle.classList.remove('active');
        element.style.background = '';
        element.style.color = '';
        
        console.log('FAQ closed');
    }
    
    // Add click effect
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = '';
    }, 150);
}

// Preload Resources
function preloadResources() {
    const resources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    resources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Export functions for external use
window.BismillahTraders = {
    scrollToSection,
    openWhatsApp,
    toggleFAQ,
    createRipple,
    createParticles
};

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            max-height: 300px;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            max-height: 300px;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            max-height: 0;
            transform: translateY(-10px);
        }
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-green);
        cursor: pointer;
        padding: 0.5rem;
        transition: var(--transition-smooth);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav-list {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            box-shadow: var(--shadow-light);
            gap: 1rem;
        }
        
        .nav-list.active {
            display: flex;
        }
        
        .nav-list a {
            width: 100%;
            text-align: center;
            padding: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Contact Form Handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const inquiryType = formData.get('inquiry-type');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Hello! I'm ${name}. 
Phone: ${phone}
Inquiry Type: ${inquiryType}
Message: ${message}

Please get back to me as soon as possible.`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/923371617023?text=${encodedMessage}`;
    
    // Show success message
    const submitBtn = event.target.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="btn-text">Sending...</span><span class="btn-icon">⏳</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<span class="btn-text">Message Sent!</span><span class="btn-icon">✅</span>';
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            event.target.reset();
        }, 1500);
    }, 1000);
}

// Directions function
function openDirections() {
    const address = "Chak no 90 SB Anwarabad Manya, Sargodha, Punjab, Pakistan";
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

// Product Card Flip Animation Initialization
function initProductCardFlips() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Skip if already has flip structure
        if (card.querySelector('.product-card-inner')) {
            return;
        }
        
        // Get original content elements
        const productImage = card.querySelector('.product-image')?.outerHTML || '<div class="product-image">🧪</div>';
        const productName = card.querySelector('h4')?.textContent || 'Product';
        const productDesc = card.querySelector('p')?.textContent || 'Description';
        const buyNowLink = card.querySelector('a.btn-primary')?.href || '#';
        
        // Create simplified front content (only image and name)
        const frontContent = `
            ${productImage}
            <div class="product-info">
                <h4>${productName}</h4>
            </div>
        `;
        
        // Create back content with description and contact button
        const backContent = createProductBackContent(productName, productDesc, buyNowLink);
        
        // Create flip structure
        const flipStructure = `
            <div class="product-card-inner">
                <div class="product-card-front">
                    ${frontContent}
                </div>
                <div class="product-card-back">
                    ${backContent}
                </div>
            </div>
        `;
        
        // Replace card content
        card.innerHTML = flipStructure;
    });
}

// Create back content for product cards
function createProductBackContent(name, description, buyNowLink) {
    return `
        <div class="product-back-content">
            <div class="product-description">
                <p>${description}</p>
            </div>
            <div class="product-contact">
                <a href="${buyNowLink}" class="btn-primary contact-btn" onclick="createParticles(event, this)">
                    <span class="btn-text">Contact Now</span>
                    <span class="btn-icon">📞</span>
                </a>
            </div>
        </div>
    `;
}

console.log('Bismillah Traders JavaScript Framework Loaded Successfully! 🌿');