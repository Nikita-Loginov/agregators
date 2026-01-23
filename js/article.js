import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";

import { initComments } from "./modules/comments.js";
import { SWIPERS, CARDS_OPTIONS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import { getPaginationSwiper } from "./modules/functions.js";

const swipers = [
  {
    ...SWIPERS.ARTICLE_CARDS,
  },
  {
    selector: ".swiper-box--projects .swiper--projects",
    breakpoint: 122300000000,
    options: {
      ...CARDS_OPTIONS,
      pagination: {
        el: getPaginationSwiper(
          document.querySelector(
            ".swiper-box--projects .swiper--projects .swiper__detail"
          )
        ).pagination,
      },
    },
  },
  {
    selector: ".swiper-box--property .swiper--property",
    breakpoint: 122300000000,
    options: {
      ...CARDS_OPTIONS,
      pagination: {
        el: getPaginationSwiper(
          document.querySelector(
            ".swiper-box--property .swiper--property .swiper__detail"
          )
        ).pagination,
      },
    },
  },
  {
    ...SWIPERS.GALLERY_CAPTION
  }
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
