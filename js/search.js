import { initImgsSwiperGoods } from "./swiper/functions.js";

const handleGlobalClick = (e) => {};

document.addEventListener("DOMContentLoaded", () => {
  initImgsSwiperGoods();

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {}, 100);
});
