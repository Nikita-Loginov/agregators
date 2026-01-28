import { getHeightHeader } from "./modules/header.js";
import { setVar } from "./utils/setVar.js";
import { toggleDropdown, firstActiveText } from "./modules/dropdown.js";
import {
  toggleAccordeonItems,
  initAccordeonActiveItems,
} from "./modules/accordeon.js";
import { initModal, checkStartOpen } from "./modules/modal.js";
import { checkScrollY } from "./modules/header.js";
import { initMenu } from "./modules/menu.js";
import { initFormValidation } from "./modules/validate.js";
import { clearAllFormErrors } from "./validation/index.js";
import { initRatingStars } from "./modules/rating.js";
import { initSelects } from "./modules/select.js";
import { onChangeInput } from "./modules/functions.js";
import { checkStorage, initStorage } from "./modules/localStorage.js";
import { initTooltip } from "./modules/tooltip/tooltip.js";
import { clearFormInputs } from "./modules/functions.js";

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const handleGlobalEvents = (e) => {
  toggleDropdown(e);
  toggleAccordeonItems(e);
  initModal(e);
  initMenu(e);
  initRatingStars(e);
  initStorage(e);
  clearAllFormErrors(e);
};

const serVars = () => {
  const heightHeader = getHeightHeader();

  setVar("--header-height", heightHeader);
};

const initValidate = () => {
  const forms = document.querySelectorAll("form.form");

  forms.forEach((form) => {
    initFormValidation(form);

    clearFormInputs(form)
  });
};

document.addEventListener("DOMContentLoaded", () => {
  checkStorage();
  initValidate();
  checkStartOpen();
  serVars();
  firstActiveText();
  initSelects();
  initAccordeonActiveItems();
  initTooltip();

  document.addEventListener("click", handleGlobalEvents);
  document.addEventListener("input", onChangeInput);

  if (!isTouchDevice) {
    document.addEventListener("mouseenter", initRatingStars, true);
    document.addEventListener("mouseleave", initRatingStars, true);
  }
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    serVars();
  }, 300);
});

document.addEventListener("scroll", () => {
  checkScrollY();
  // serVars();
});
