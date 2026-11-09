document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero__parallax-img');
    const heroBlob = document.querySelector('.hero__blob');
    const heroLines = document.querySelectorAll('.hero__line-text');
    const heroWrapper = document.querySelector('.hero__image-wrapper');
    const heroIntro = document.querySelector('.hero__intro');
    const revealElements = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('.counter');
    const spriteItems = document.querySelectorAll('.interests__item[data-sprite]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersStaticHero = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;

    /* 8x8 pixel sprites, two frames each. '#' = filled pixel. */
    const SPRITES = {
        drums: [
            ['#......#', '.#....#.', '..#..#..', '........', '.######.', '#......#', '#.#..#.#', '.######.'],
            ['........', '........', '#......#', '.##..##.', '.######.', '#......#', '#.#..#.#', '.######.']
        ],
        run: [
            ['.....##.', '.....##.', '...###..', '..#.##.#', '....#...', '...#.#..', '..#...#.', '.#.....#'],
            ['.....##.', '.....##.', '....##..', '...###..', '....#...', '....##..', '....#.#.', '...##...']
        ],
        salsa: [
            ['#..##..#', '.#.##.#.', '..####..', '...##...', '...##...', '..#..#..', '.#....#.', '.#....##'],
            ['...##...', '...##...', '.######.', '#..##..#', '...##...', '..#..#..', '..#...#.', '.##....#']
        ],
        gamepad: [
            ['........', '.######.', '##.###.#', '#...#.##', '##.#####', '########', '###..###', '##....##'],
            ['........', '.######.', '##.#####', '#...#..#', '##.#####', '########', '###..###', '##....##']
        ]
    };

    const gridToRects = (rows) => rows.map((row, y) => {
        let rects = '';
        let x = 0;

        while (x < row.length) {
            if (row[x] === '#') {
                let run = 1;

                while (row[x + run] === '#') {
                    run += 1;
                }

                rects += `<rect x="${x}" y="${y}" width="${run}" height="1"/>`;
                x += run;
            } else {
                x += 1;
            }
        }

        return rects;
    }).join('');

    spriteItems.forEach((item, index) => {
        const frames = SPRITES[item.dataset.sprite];

        if (!frames) {
            return;
        }

        item.insertAdjacentHTML('afterbegin', `<svg class="interests__sprite" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true" focusable="false" style="--sprite-delay: ${0.3 + index * 0.1}s"><g class="interests__sprite-frame--a">${gridToRects(frames[0])}</g><g class="interests__sprite-frame--b">${gridToRects(frames[1])}</g></svg>`);
        item.classList.add('interests__item--sprite');
    });

    const activateReveal = (element) => {
        element.classList.add('reveal--active');

        const sprite = element.querySelector('.interests__sprite');

        if (sprite) {
            sprite.classList.add('interests__sprite--play');
        }

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

    const finishHeroIntro = () => {
        if (heroIntro) {
            heroIntro.classList.add('hero__intro--done');
        }

        if (heroWrapper) {
            heroWrapper.classList.add('hero__image-wrapper--active');
        }
    };

    /* Orange pixel sweep: a diagonal band of accent blocks uncovers the portrait (10 frames, 300ms). */
    const runHeroSweep = () => {
        const rect = heroWrapper.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.round(rect.width * dpr);
        const height = Math.round(rect.height * dpr);
        const ctx = heroIntro.getContext('2d');

        if (!ctx || width === 0 || height === 0) {
            finishHeroIntro();
            return;
        }

        heroIntro.width = width;
        heroIntro.height = height;

        const rootStyles = getComputedStyle(document.documentElement);
        const bgColor = rootStyles.getPropertyValue('--bg-color').trim() || '#121212';
        const accentColor = rootStyles.getPropertyValue('--accent').trim() || '#ff4d00';
        const cols = 12;
        const block = width / cols;
        const blockSize = Math.ceil(block) + 1;
        const rows = Math.ceil(height / block);
        const band = 2;
        const frameCount = 10;
        const frameMs = 30;
        const reach = cols + rows - 2 + band + 1;
        let frame = 0;
        let lastTime = 0;

        const drawFrame = (index) => {
            const front = ((index + 1) / frameCount) * reach;

            ctx.clearRect(0, 0, width, height);

            for (let y = 0; y < rows; y += 1) {
                for (let x = 0; x < cols; x += 1) {
                    const diagonal = x + y;

                    if (diagonal >= front - band) {
                        ctx.fillStyle = diagonal < front ? accentColor : bgColor;
                        ctx.fillRect(Math.floor(x * block), Math.floor(y * block), blockSize, blockSize);
                    }
                }
            }
        };

        const tick = (now) => {
            if (frame > 0 && now - lastTime < frameMs) {
                requestAnimationFrame(tick);
                return;
            }

            if (frame === frameCount) {
                ctx.clearRect(0, 0, width, height);
                finishHeroIntro();
                return;
            }

            drawFrame(frame);

            if (frame === 0) {
                heroIntro.classList.add('hero__intro--running');
            }

            frame += 1;
            lastTime = now;
            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    if (heroWrapper) {
        if (prefersReducedMotion || !heroIntro || !heroImage) {
            finishHeroIntro();
        } else {
            const startHeroSweep = () => {
                /* The CSS failsafe hides the cover at 1.5s; past that, skip the sweep to avoid a late flash. */
                if (performance.now() > 1400) {
                    finishHeroIntro();
                    return;
                }

                runHeroSweep();
            };

            const decoded = typeof heroImage.decode === 'function' ? heroImage.decode() : Promise.resolve();

            decoded.then(startHeroSweep, finishHeroIntro);
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
