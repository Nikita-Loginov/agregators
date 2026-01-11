import { closeAllModals } from "./modal.js";

const toggleMenu = (e) => {
  const { target } = e;

  if (!target.closest(".menu__burger")) return;

  const menu = target.closest(".menu");

  const openMenus = document.querySelectorAll(".menu.open");

  if (openMenus.length > 0) {
    closeAllModals()
  }

  menu.classList.toggle("open");
  document.body.classList.toggle("open-modal");
  document.body.classList.toggle("open-decor");

 
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
  document.body.classList.remove("open-modal");
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

    if (!isClickInsideMenu && !isClickOnBurger && !isClickOnModal && !isClickOnHeader) {
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
