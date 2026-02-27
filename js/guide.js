import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import {
  changeTypeGrid,
  initGridSystem,
  handleGridResize,
} from "./modules/catalogy-grid.js";

import { initTabletSwipers } from "./modules/table-swiper.js";

const swipers = [
  {
    ...SWIPERS.GALLERY_BIG,
  },
  {
    ...SWIPERS.DEV,
  },
];



const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

document.addEventListener("DOMContentLoaded", () => {
  hideUnnecessaryButtons();
  initImgsSwiperGoods();
  initGridSystem();

  initTabletSwipers();

  handleGridResize();

  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  document.addEventListener("click", handleGlobalClick);
});

document.addEventListener("change", (e) => {
  changeTypeGrid(e);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleAllSliders();
    handleGridResize();
  }, 100);
});
