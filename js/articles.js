import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

document.addEventListener("DOMContentLoaded", () => {
  hideUnnecessaryButtons();

  document.addEventListener("click", handleGlobalClick);
});
