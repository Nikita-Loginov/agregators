import { closeAllModals } from "./modal.js";

const toggleMenu = (e) => {
  const { target } = e;

  if (!target.closest(".menu__burger")) return;

  const menu = target.closest(".menu");

  const openMenus = document.querySelectorAll(".menu.open");

  if (openMenus.length > 0) {

    closeAllModals();
  }

  menu.classList.toggle("open");

  if (menu.classList.contains("open")) {
    document.body.classList.add("open-menu", "open-decor");
  } else {
    document.body.classList.remove("open-menu", "open-decor");
  }
};

const closeMenuOnItemClick = (e) => {
  const { target } = e;

  const menu = target.closest(".menu");

  if (
    target.closest(".menu-item") ||
    target.closest(".menu-link") ||
    target.closest(".menu__close") ||
    target.closest("[data-close-menu]")
  ) {
    closeMenu(menu);
  }
};

const closeMenu = (menu) => {
  if (!menu) return;

  menu.classList.remove("open");
  document.body.classList.remove("open-menu");
  document.body.classList.remove("open-decor");
};

const closeMenuOnOutsideClick = (e) => {
  const { target } = e;

  const openMenus = document.querySelectorAll(".menu.open");
  if (openMenus.length === 0) return;

  openMenus.forEach((menu) => {
    const isClickInsideMenu = menu.contains(target);
    const isClickOnBurger = target.closest(".menu__burger");
    const isClickOnModal = target.closest(".modalSecond");
    const isClickOnHeader = target.closest("header");

    if (
      !isClickInsideMenu &&
      !isClickOnBurger &&
      !isClickOnModal &&
      !isClickOnHeader
    ) {
      closeAllModals();
      closeMenu(menu);
    }
  });
};

export const initMenu = (e) => {
  toggleMenu(e);
  closeMenuOnItemClick(e);
  closeMenuOnOutsideClick(e);
};
