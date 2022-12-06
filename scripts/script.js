const contactLink = document.querySelector(".page-1__header__menu");
const contactMenu = document.querySelector(".contact-menu");

contactLink.addEventListener("click", function (e) {
  contactMenu.classList.remove("contact-menu--inactive");
  contactMenu.classList.add("contact-menu--active");
  e.stopPropagation();
});

document.querySelector("body").addEventListener("click", function (e) {
  if (contactMenu.classList.contains("contact-menu--active")) {
    contactMenu.classList.remove("contact-menu--active");
    contactMenu.classList.add("contact-menu--inactive");
  }
});
