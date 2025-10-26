const contactLink = document.querySelector(".page-1__header__menu");
const contactMenu = document.querySelector(".contact-menu");

if (contactLink && contactMenu) {
    const toggleMenu = () => {
        contactMenu.classList.toggle("contact-menu--active");
        contactMenu.classList.toggle("contact-menu--inactive");
    };

    if (!contactMenu.classList.contains("contact-menu--inactive")) {
        contactMenu.classList.add("contact-menu--inactive");
    }

    contactLink.addEventListener("click", (event) => {
        if (contactMenu.classList.contains("contact-menu--inactive")) {
            toggleMenu();
        }

        contactMenu.classList.add("contact-menu--active");
        event.stopPropagation();
    });

    window.addEventListener("click", () => {
        if (contactMenu.classList.contains("contact-menu--active")) {
            toggleMenu();
        }
    });
}
