import { getHeightHeader } from "./modules/header.js";
import { toggleDropdown, firstActiveText } from "./modules/dropdown.js";
import { toggleAccordeonItems } from "./modules/accordeon.js";
import { initModal, checkStartOpen } from "./modules/modal.js";
import { checkScrollY } from "./modules/header.js";

const handleGlobalClick = (e) => {
  toggleDropdown(e);
  toggleAccordeonItems(e);
  initModal(e);
};

document.addEventListener("DOMContentLoaded", () => {
  checkStartOpen()
  getHeightHeader();
  firstActiveText()

  document.addEventListener("click", handleGlobalClick);
});

window.addEventListener("resize", getHeightHeader);

document.addEventListener("scroll", checkScrollY);
