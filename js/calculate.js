import { initImgsSwiperGoods } from "./swiper/functions.js";
import {
  changeTypeGrid,
  initGridSystem,
  handleGridResize,
} from "./modules/catalogy-grid.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { SWIPERS } from "./swiper/index.js";

const swipers = [
  {
    ...SWIPERS.RESULT_CARD,
  },
];

const handleGlobalClick = (e) => {};

document.addEventListener("DOMContentLoaded", () => {
  initImgsSwiperGoods();
  initGridSystem();

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
