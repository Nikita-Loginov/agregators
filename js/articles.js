import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
// import { toggleTags } from "./modules/toggleTags.js";

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
  // toggleTags(e);
};

document.addEventListener("DOMContentLoaded", () => {
  hideUnnecessaryButtons();

  document.addEventListener("click", handleGlobalClick);
});
