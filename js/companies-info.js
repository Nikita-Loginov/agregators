import {
  initMoreBlocks,
  hideUnnecessaryButtons,
  initClampText,
  handleMoreContentResize,
  clampTextToggle,
} from "./modules/moreContent.js";
import { initComments } from "./modules/comments.js";
import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import {
  changeTypeGrid,
  initGridSystem,
  handleGridResize,
} from "./modules/catalogy-grid.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";

const swipers = [
  {
    ...SWIPERS.EMPLOYEES,
  },
  {
    ...SWIPERS.COMPANY_PROPERTY,
  },
];

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
  clampTextToggle(e);
  initComments(e);
};

document.addEventListener("DOMContentLoaded", () => {
  hideUnnecessaryButtons();
  initGridSystem();
  handleGridResize()
  initImgsSwiperGoods();


  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  initClampText()

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
    handleMoreContentResize();
  }, 100);
});

