import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";

import { initImgsSwiperGoods } from "./swiper/functions.js";

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

document.addEventListener("DOMContentLoaded", () => {
  initImgsSwiperGoods();
  hideUnnecessaryButtons();

  document.addEventListener("click", handleGlobalClick);
});
