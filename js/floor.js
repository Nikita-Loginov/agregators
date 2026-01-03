import { initImgsSwiperGoods } from "./swiper/functions.js";
import { searcBlockTab } from "./modules/tab.js";


const handleGlobalClick = (e) => {
  searcBlockTab(e);
};

document.addEventListener("DOMContentLoaded", () => {
  initImgsSwiperGoods();

  document.addEventListener("click", handleGlobalClick);
});

