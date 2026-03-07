document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero__parallax-img');
    const heroBlob = document.querySelector('.hero__blob');
    const heroLines = document.querySelectorAll('.hero__line-text');
    const heroWrapper = document.querySelector('.hero__image-wrapper');
    const revealElements = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersStaticHero = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;

    const activateReveal = (element) => {
        element.classList.add('reveal--active');
        element.addEventListener('transitionend', () => {
            element.classList.add('reveal--complete');
        }, { once: true });
    };

    const animateCounter = (counter) => {
        const target = Number(counter.getAttribute('data-target'));

        if (prefersReducedMotion) {
            counter.innerText = String(target);
            return;
        }

        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentVal = Math.floor(progress * target);

            counter.innerText = String(currentVal);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = String(target);
            }
        };

        requestAnimationFrame(updateCounter);
    };

    if (prefersReducedMotion) {
        revealElements.forEach((element) => {
            element.classList.add('reveal--active', 'reveal--complete');
        });
    } else if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activateReveal(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => {
            element.classList.add('reveal--active', 'reveal--complete');
        });
    }

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach((counter) => counterObserver.observe(counter));
    } else {
        counters.forEach((counter) => animateCounter(counter));
    }

    if (heroLines.length > 0) {
        if (prefersReducedMotion || prefersStaticHero) {
            heroLines.forEach((line) => line.classList.add('hero__line-text--active'));
        } else {
            window.setTimeout(() => {
                heroLines[0].classList.add('hero__line-text--active');
            }, 60);

            window.setTimeout(() => {
                if (heroLines[1]) {
                    heroLines[1].classList.add('hero__line-text--active');
                }
            }, 160);
        }
    }

    if (heroWrapper) {
        if (prefersReducedMotion) {
            heroWrapper.classList.add('hero__image-wrapper--active');
        } else {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    heroWrapper.classList.add('hero__image-wrapper--active');
                });
            });
        }
    }

    if (hero && heroImage && heroBlob && !prefersReducedMotion && !prefersStaticHero) {
        let ticking = false;

        const updateParallax = () => {
            const scrollY = Math.min(window.scrollY, hero.offsetHeight);
            const imageOffset = scrollY * 0.14;
            const blobOffset = scrollY * 0.08;

            heroImage.style.transform = `translate3d(0, ${imageOffset}px, 0)`;
            heroBlob.style.transform = `translate3d(0, ${blobOffset}px, 0)`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }
});
