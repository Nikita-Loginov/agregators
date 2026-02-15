import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";

import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";

const swipers = [
  {
    ...SWIPERS.GALLERY_CAPTION
  }
];

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  hideUnnecessaryButtons();

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleAllSliders();
  }, 100);
});
