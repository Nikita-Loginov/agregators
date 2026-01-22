import { getHeightHeader } from "./modules/header.js";
import { setVar } from "./utils/setVar.js";
import { checkScrollY } from "./modules/header.js";
import { initMenu } from "./modules/menu.js";
import { initFormValidation } from "./modules/validate.js";
import { clearAllFormErrors } from "./validation/index.js";
import { onChangeInput } from "./modules/functions.js";
import { checkStorage, initStorage } from "./modules/localStorage.js";
import { initTooltip } from "./modules/tooltip/tooltip.js";

const handleGlobalEvents = (e) => {
  initMenu(e);
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
  });
};

document.addEventListener("DOMContentLoaded", () => {
  checkStorage();
  initValidate();
  serVars();
  initTooltip();

  document.addEventListener("click", handleGlobalEvents);
  document.addEventListener("input", onChangeInput);
});

window.addEventListener("resize", serVars);
document.addEventListener("scroll", () => {
  checkScrollY();
});
