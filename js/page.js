import { getHeightHeader } from "./modules/header.js";
import { toggleDropdown, firstActiveText } from "./modules/dropdown.js";
import { toggleAccordeonItems } from "./modules/accordeon.js";
import { initModal, checkStartOpen } from "./modules/modal.js";
import { checkScrollY } from "./modules/header.js";
import { initMenu } from "./modules/menu.js";
import { initFormValidation } from "./modules/validate.js";

const handleGlobalClick = (e) => {
  toggleDropdown(e);
  toggleAccordeonItems(e);
  initModal(e);
  initMenu(e);
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

  document.addEventListener("click", handleGlobalClick);
});

window.addEventListener("resize", getHeightHeader);

document.addEventListener("scroll", checkScrollY);
