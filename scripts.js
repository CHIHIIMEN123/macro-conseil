document.addEventListener("DOMContentLoaded", function() {
    // Sticky Navigation
    const nav = document.querySelector('.ftnt-navigation');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('sticky', window.scrollY > 100);
    });

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Intersection Observer for Service Cards
const serviceCards = document.querySelectorAll('.service-card');
const serviceCardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            serviceCardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => serviceCardObserver.observe(card));

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const topToolbar = document.querySelector('.top-toolbar');

menuToggle.addEventListener('click', () => {
    const isExpanded = topToolbar.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', isExpanded);
});

// Animated Number Counter
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for Animated Counters
const counters = document.querySelectorAll('.elementor-counter-number');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const endValue = parseFloat(element.getAttribute('data-to-value'));
            animateValue(element, 0, endValue, 2000);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));
});