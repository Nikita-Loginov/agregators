import { initImgsSwiperGoods } from "./swiper/functions.js";
import {
  changeTypeGrid,
  initGridSystem,
  handleGridResize,
} from "./modules/catalogy-grid.js";

const handleGlobalClick = (e) => {};

document.addEventListener("DOMContentLoaded", () => {
  initImgsSwiperGoods();
  initGridSystem();

  handleGridResize();

  document.addEventListener("click", handleGlobalClick);
});

document.addEventListener("change", (e) => {
  changeTypeGrid(e);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleGridResize();
  }, 100);
});
