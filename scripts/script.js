const contactLink = document.querySelector(".page-1__header__menu");
const contactMenu = document.querySelector(".contact-menu");

function openMenu() {
    contactMenu.classList.remove("contact-menu--inactive");
    contactMenu.classList.add("contact-menu--active");
}

function closeMenu() {
    if (contactMenu.classList.contains("contact-menu--active")) {
        contactMenu.classList.remove("contact-menu--active");
        contactMenu.classList.add("contact-menu--inactive");
    }
}

contactLink.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (contactMenu.classList.contains("contact-menu--active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

document.addEventListener("click", function (e) {
    if (!contactMenu.contains(e.target) && !contactLink.contains(e.target)) {
        closeMenu();
    }
});

// Optional: Close on Escape key
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeMenu();
    }
});
