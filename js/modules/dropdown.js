let activeDropdown = null;
let fixedMenu = null;

export const toggleDropdown = (e) => {
  const target = e.target;
  

  if (activeDropdown && activeDropdown.contains(target)) {
    if (!target.closest(".dropdown-item-close")) {
      return; 
    }
  }

  if (target.closest(".dropdown")) {
    const dropdown = target.closest(".dropdown");

    if (dropdown !== activeDropdown) {
      closeAllDropdowns();
      if (dropdown.hasAttribute("data-fixed-dropdown")) {
        openFixedDropdown(dropdown);
      } else {
        openRegularDropdown(dropdown);
      }
    } else {
      closeDropdown(dropdown);
    }

    return;
  }

  if (target.closest(".dropdown-item-close")) {
    const itemElement = target.closest(".dropdown__item");

    if (activeDropdown && itemElement) {
      applySelectValue(activeDropdown, itemElement);
      closeDropdown(activeDropdown);
    }

    return;
  }

  if (activeDropdown) {
    closeAllDropdowns();
  }
};

const openFixedDropdown = (dropdown) => {
  const menu = dropdown.querySelector(".dropdown__content");
  if (!menu) return;

  dropdown.classList.add("active");
  activeDropdown = dropdown;

  const toggle =
    dropdown.querySelector(".dropdown__toggle") ||
    dropdown.querySelector(".dropdown__btn");
  const rect = toggle.getBoundingClientRect();

  fixedMenu = menu;
  fixedMenu.style.position = "fixed";
  fixedMenu.style.top = rect.bottom + "px";
  fixedMenu.style.left = rect.left + "px";
  fixedMenu.style.opacity = "1";
  fixedMenu.style.visibility = "visible";
  fixedMenu.style.zIndex = "9999";

  document.body.appendChild(fixedMenu);
};

const openRegularDropdown = (dropdown) => {
  const menu = dropdown.querySelector(".dropdown__content");
  if (!menu) return;

  dropdown.classList.add("active");
  activeDropdown = dropdown;

  menu.style.opacity = "1";
  menu.style.visibility = "visible";
};

const closeDropdown = (dropdown) => {
  if (!dropdown) return;

  dropdown.classList.remove("active");

  if (dropdown.hasAttribute("data-fixed-dropdown") && fixedMenu) {
    dropdown.appendChild(fixedMenu);

    fixedMenu.style.position = "";
    fixedMenu.style.top = "";
    fixedMenu.style.left = "";
    fixedMenu.style.width = "";
    fixedMenu.style.opacity = "0";
    fixedMenu.style.visibility = "hidden";
    fixedMenu.style.zIndex = "";

    fixedMenu = null;
  } else {
    const menu = dropdown.querySelector(".dropdown__content");
    if (menu) {
      menu.style.opacity = "0";
      menu.style.visibility = "hidden";
    }
  }

  activeDropdown = null;
};

export const closeAllDropdowns = () => {
  if (activeDropdown) {
    closeDropdown(activeDropdown);
  }
}

const applySelectValue = (dropdown, selectedItem) => {
  const selectedText = selectedItem.textContent.trim();

  const realItems = dropdown.querySelectorAll(".dropdown__item");

  realItems.forEach((item) => item.classList.remove("active"));

  const realItem = Array.from(realItems).find(
    (el) => el.textContent.trim() === selectedText
  );

  if (realItem) realItem.classList.add("active");

  const activeBox = dropdown.querySelector(".dropdown__active");
  if (activeBox) {
    activeBox.textContent = selectedText;
  }
};

export const firstActiveText = () => {
  const dropdownSelects = document.querySelectorAll(
    ".dropdown.dropdown--select"
  );

  dropdownSelects.forEach((dropdown) => {
    const selected =
      dropdown.querySelector(".dropdown__item.active") ||
      dropdown.querySelector(".dropdown__item");

    if (!selected) return;

    const text = selected.textContent.trim();
    const activeBox = dropdown.querySelector(".dropdown__active");

    if (activeBox) activeBox.textContent = text;
  });
};

window.addEventListener("resize", () => closeAllDropdowns());