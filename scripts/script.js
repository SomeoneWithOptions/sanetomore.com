const contactLink = document.querySelector(".page-1__header__menu");
const contactMenu = document.querySelector(".contact-menu");

if (contactLink && contactMenu) {
    const ACTIVE_CLASS = "contact-menu--active";
    const INACTIVE_CLASS = "contact-menu--inactive";

    const isMenuOpen = () => contactMenu.classList.contains(ACTIVE_CLASS);

    const openMenu = () => {
        contactMenu.classList.add(ACTIVE_CLASS);
        contactMenu.classList.remove(INACTIVE_CLASS);
        contactMenu.setAttribute("aria-hidden", "false");
    };

    const closeMenu = () => {
        contactMenu.classList.remove(ACTIVE_CLASS);
        contactMenu.classList.add(INACTIVE_CLASS);
        contactMenu.setAttribute("aria-hidden", "true");
    };

    const toggleMenu = () => {
        if (isMenuOpen()) {
            closeMenu();
            return;
        }

        openMenu();
    };

    closeMenu();

    contactLink.addEventListener("click", (event) => {
        toggleMenu();
        event.stopPropagation();
    });

    window.addEventListener("click", (event) => {
        if (!isMenuOpen()) {
            return;
        }

        const clickedInsideMenu = contactMenu.contains(event.target);
        const clickedOnToggle = contactLink.contains(event.target);

        if (!clickedInsideMenu && !clickedOnToggle) {
            closeMenu();
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isMenuOpen()) {
            closeMenu();
        }
    });
}
