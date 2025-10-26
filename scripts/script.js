const contactToggle = document.querySelector(".page-1__header__menu");
const contactMenu = document.querySelector(".contact-menu");

if (contactToggle && contactMenu) {
    const showMenu = () => {
        if (contactMenu.classList.contains("contact-menu--visible")) {
            return;
        }

        contactMenu.classList.remove("contact-menu--hidden");
        contactMenu.classList.add("contact-menu--visible");
        contactToggle.setAttribute("aria-expanded", "true");
        contactMenu.setAttribute("aria-hidden", "false");
    };

    const hideMenu = () => {
        if (!contactMenu.classList.contains("contact-menu--visible")) {
            return;
        }

        contactMenu.classList.remove("contact-menu--visible");
        contactMenu.classList.add("contact-menu--hidden");
        contactToggle.setAttribute("aria-expanded", "false");
        contactMenu.setAttribute("aria-hidden", "true");
    };

    const toggleMenu = () => {
        if (contactMenu.classList.contains("contact-menu--visible")) {
            hideMenu();
        } else {
            showMenu();
        }
    };

    contactToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener("click", (event) => {
        const clickInsideMenu = contactMenu.contains(event.target) || contactToggle.contains(event.target);
        if (!clickInsideMenu) {
            hideMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            hideMenu();
        }
    });
}
