let activeDropdown = null;
let fixedMenu = null;

export const toggleDropdown = (e) => {
  const target = e.target;

  const isClickInsideActiveDropdown =
    activeDropdown &&
    (activeDropdown.contains(target) ||
      (fixedMenu && fixedMenu.contains(target)));

  if (isClickInsideActiveDropdown) {
    if (target.closest(".dropdown__btn, .dropdown__toggle")) {
      closeDropdown(activeDropdown);
      return;
    }

    if (!target.closest(".dropdown-item-close")) {
      return;
    }
  }

  if (target.closest(".dropdown-item-close")) {
    const itemElement = target.closest(".dropdown__item");

    if (activeDropdown && itemElement) {
      if (
        activeDropdown.hasAttribute("data-select") ||
        activeDropdown.classList.contains("dropdown--select")
      ) {
        applySelectValue(activeDropdown, itemElement);
      }

      closeDropdown(activeDropdown);
    }

    return;
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

  if (!toggle) return;
  const anchor = toggle.closest(".dropdown") || toggle;
  const anchorRect = anchor.getBoundingClientRect();

  const toggleRect = toggle.getBoundingClientRect();

  fixedMenu = menu;
  document.body.appendChild(fixedMenu);

  fixedMenu.style.position = "fixed";
  fixedMenu.style.opacity = "1";
  fixedMenu.style.visibility = "visible";
  fixedMenu.style.zIndex = "9999";

  fixedMenu.style.minWidth = anchorRect.width + "px";
  fixedMenu.style.width = "fit-content";

  fixedMenu.style.top = "0px";
  fixedMenu.style.left = "0px";
  fixedMenu.style.maxHeight = "";
  fixedMenu.style.overflow = "";

  const menuRect = fixedMenu.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  let top = toggleRect.bottom;
  let left = toggleRect.left;

  const spaceBottom = viewportHeight - toggleRect.bottom;
  const spaceTop = toggleRect.top;

  if (menuRect.height > spaceBottom && spaceTop > spaceBottom) {
    top = toggleRect.top - menuRect.height;
  }

  const availableHeight = top < toggleRect.top ? spaceTop : spaceBottom;

  if (menuRect.height > availableHeight) {
    fixedMenu.style.maxHeight = availableHeight - 8 + "px";
    fixedMenu.style.overflowY = "auto";
  }

  if (left + menuRect.width > viewportWidth) {
    left = viewportWidth - menuRect.width - 8;
  }

  if (left < 8) left = 8;
  if (top < 8) top = 8;

  fixedMenu.style.top = top + "px";
  fixedMenu.style.left = left + "px";
};

const openRegularDropdown = (dropdown) => {
  const modalBlock = dropdown.closest(".modalBlock");
  const menu = dropdown.querySelector(".dropdown__content");
  if (!menu) return;

  dropdown.classList.add("active");
  activeDropdown = dropdown;

  menu.style.opacity = "1";
  menu.style.visibility = "visible";

  requestAnimationFrame(() => {
    setDropdownPositionClass(dropdown, menu, {
      useParent: modalBlock || null,
      offset: 8,
    });
  });
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
};

const applySelectValue = (dropdown, selectedItem) => {
  const selectedValue =
    selectedItem.getAttribute("data-value") || selectedItem.textContent.trim();
  const selectedText = selectedItem.textContent.trim();

  dropdown.setAttribute("data-selected", selectedValue);

  if (dropdown.hasAttribute("data-selected-text")) {
    dropdown.setAttribute("data-selected-text", selectedText);
  }

  const allItems = dropdown.querySelectorAll(
    ".dropdown__item, .dropdown-number__link"
  );
  allItems.forEach((item) => item.classList.remove("active"));
  selectedItem.classList.add("active");

  const toggleBtn = dropdown.querySelector(".dropdown__btn");
  if (toggleBtn) {
    const textElement = toggleBtn.querySelector(".dropdown__text");
    if (textElement) {
      textElement.textContent = selectedText;
    } else {
      toggleBtn.setAttribute("data-value", selectedValue);
      toggleBtn.setAttribute("data-text", selectedText);

      const existingText = toggleBtn.querySelector(".dropdown__selected-text");
      if (existingText) {
        existingText.textContent = selectedText;
      } else {
        const span = document.createElement("span");
        span.className = "dropdown__selected-text";
        span.textContent = selectedText;
        toggleBtn.insertBefore(span, toggleBtn.firstChild);
      }
    }
  }

  const activeBox = dropdown.querySelector(".dropdown__active");
  if (activeBox) {
    activeBox.textContent = selectedText;
  }
};

export const firstActiveText = () => {
  const dropdownSelects = document.querySelectorAll(
    ".dropdown.dropdown--select, .dropdown[data-select]"
  );

  dropdownSelects.forEach((dropdown) => {
    let selected = dropdown.querySelector(".dropdown__item[data-active]");

    if (!selected) {
      selected = dropdown.querySelector(".dropdown__item.active");
    }

    if (!selected) {
      selected = dropdown.querySelector(".dropdown__item");
    }

    if (!selected) return;

    const text = selected.textContent.trim();
    const value = selected.getAttribute("data-value") || text;

    dropdown.setAttribute("data-selected", value);

    const toggleBtn = dropdown.querySelector(".dropdown__btn");

    if (toggleBtn) {
      toggleBtn.setAttribute("data-value", value);
      toggleBtn.setAttribute("data-text", text);

      const textElement = toggleBtn.querySelector(".dropdown__text");
      if (textElement) {
        textElement.textContent = text;
      }
    }

    const activeBox = dropdown.querySelector(".dropdown__active");

    if (activeBox) {
      activeBox.textContent = text;
    }
  });
};

const setDropdownPositionClass = (dropdown, menu, options = {}) => {
  const { useParent = false, offset = 8 } = options;

  if (!menu) return;

  menu.classList.remove("left", "right", "top", "bottom");

  const menuRect = menu.getBoundingClientRect();

  let bounds;

  if (useParent) {
    const parent = dropdown.parentElement;
    bounds = parent.getBoundingClientRect();
  } else {
    bounds = {
      top: 0,
      left: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
    };
  }

  const overflowRight = menuRect.right + offset > bounds.right;
  const overflowLeft = menuRect.left - offset < bounds.left;
  const overflowBottom = menuRect.bottom + offset > bounds.bottom;
  const overflowTop = menuRect.top - offset < bounds.top;

  if (overflowRight && !overflowLeft) {
    menu.classList.add("left");
  } else if (overflowLeft && !overflowRight) {
    menu.classList.add("right");
  }

  if (overflowBottom && !overflowTop) {
    menu.classList.add("top");
  } else if (overflowTop && !overflowBottom) {
    menu.classList.add("bottom");
  }
};

window.addEventListener("resize", () => closeAllDropdowns());
