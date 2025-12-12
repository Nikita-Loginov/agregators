import { getHeightHeader } from "./modules/header.js";
import { toggleDropdown, firstActiveText } from "./modules/dropdown.js";
import { toggleAccordeonItems } from "./modules/accordeon.js";
import { initModal, checkStartOpen } from "./modules/modal.js";
import { checkScrollY } from "./modules/header.js";
import { initMenu } from "./modules/menu.js";
import { initFormValidation } from "./modules/validate.js";
import { initRatingStars } from "./modules/rating.js";

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const handleGlobalEvents = (e) => {
  toggleDropdown(e);
  toggleAccordeonItems(e);
  initModal(e);
  initMenu(e);
  initRatingStars(e);
};

const initValidate = () => {
  const forms = document.querySelectorAll("form.form");
  forms.forEach((form) => {
    initFormValidation(form);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initValidate();
  checkStartOpen();
  getHeightHeader();
  firstActiveText();

  document.addEventListener("click", handleGlobalEvents);

  if (!isTouchDevice) {
    document.addEventListener("mouseenter", initRatingStars, true);
    document.addEventListener("mouseleave", initRatingStars, true);
  }
});

window.addEventListener("resize", getHeightHeader);
document.addEventListener("scroll", checkScrollY);
