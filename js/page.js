import { getHeightHeader } from "./modules/header.js";
import { toggleDropdown, firstActiveText } from "./modules/dropdown.js";
import { toggleAccordeonItems } from "./modules/accordeon.js";
import { initModal } from "./modules/modal.js";

const handleGlobalClick = (e) => {
  toggleDropdown(e);
  toggleAccordeonItems(e);
  initModal(e);
};

document.addEventListener("DOMContentLoaded", () => {
  getHeightHeader();
  firstActiveText()

  document.addEventListener("click", handleGlobalClick);
});

window.addEventListener("resize", getHeightHeader);
