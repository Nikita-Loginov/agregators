import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
// import { toggleTags } from "./modules/toggleTags.js";
// import { closeAllDropdownInputs } from "./modules/functions.js";

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
  // toggleTags(e);

  // closeAllDropdownInputs(e)
};

document.addEventListener("DOMContentLoaded", () => {
  hideUnnecessaryButtons();

  document.addEventListener("click", handleGlobalClick);
});
