// Parallax Effect
const hero = document.querySelector('.hero');
const img = document.querySelector('.hero__parallax-img');
const blob = document.querySelector('.hero__blob');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < hero.offsetHeight) {
            if (img) img.style.transform = `translateY(${scrollY * 0.2}px)`;
            if (blob) blob.style.top = `calc(-10% + ${scrollY * 0.2}px)`;
        }
    });
}

// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal--active');
            
            // Add complete class after transition to reset delays for hover interactions
            entry.target.addEventListener('transitionend', () => {
                entry.target.classList.add('reveal--complete');
            }, { once: true });

            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Experience Counter Animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Constant speed (Linear)
                const currentVal = Math.floor(progress * target);
                counter.innerText = currentVal;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            
            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Hero Animation on Page Load
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero__image-container');
    const heroLines = document.querySelectorAll('.hero__line-text');
    
    // Animate Image Curtain
    setTimeout(() => {
        if (heroImage) heroImage.classList.add('hero__image-container--active');
    }, 400);

    // Animate Border (Wait for image to reveal)
    const heroWrapper = document.querySelector('.hero__image-wrapper');
    setTimeout(() => {
        if (heroWrapper) heroWrapper.classList.add('hero__image-wrapper--active');
    }, 1500);

    // Animate Text Lines Staggered
    if (heroLines.length > 0) {
        setTimeout(() => {
            heroLines[0].classList.add('hero__line-text--active');
        }, 100);
        
        setTimeout(() => {
            heroLines[1].classList.add('hero__line-text--active');
        }, 250);
    }
});
