
// Parallax Effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const img = document.querySelector('.parallax-img');
    const hero = document.querySelector('.hero');
    
    if (scrollY < hero.offsetHeight) {
        img.style.transform = `translateY(${scrollY * 0.2}px)`;
    }
});
