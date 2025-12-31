import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import { initComments } from "./modules/comments.js";

const swipers = [
  {
    ...SWIPERS.ALSO_CARDS
  },
  {
    ...SWIPERS.GALLERY_BIG
  },
  {
    ...SWIPERS.PROPERTY
  }
];

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
  initComments(e);
};

document.addEventListener("DOMContentLoaded", () => {
  hideUnnecessaryButtons();
  initImgsSwiperGoods();

  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleAllSliders();
  }, 100);
});
