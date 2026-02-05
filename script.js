// Parallax Effect
const img = document.querySelector('.parallax-img');
const hero = document.querySelector('.hero');

if (img && hero) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < hero.offsetHeight) {
            img.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
    });
}

// Reveal on Scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
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

// Magnetic Links Effect
const magnets = document.querySelectorAll('.magnetic-link');
magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', (e) => {
        const rect = magnet.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Move the element slightly towards the mouse
        magnet.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });

    magnet.addEventListener('mouseleave', () => {
        // Reset position
        magnet.style.transform = 'translate(0, 0)';
    });
});
