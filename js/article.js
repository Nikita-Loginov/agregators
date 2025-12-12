import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";

import { initComments } from "./modules/comments.js";
import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";

const swipers = [
  {
    ...SWIPERS.ARTICLE_CARDS,
  },
  {
    ...SWIPERS.ALSO_CARDS,
  },
];

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
  initComments(e);
};

document.addEventListener("DOMContentLoaded", () => {
  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  initImgsSwiperGoods();
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
