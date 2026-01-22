import { CARDS_OPTIONS } from "./swiper/index.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { getPaginationSwiper, getArrowSwiper } from "./modules/functions.js";

const swipers = [
  {
    selector: ".projects .swiper--projects",
    breakpoint: 122300000000,
    options: {
      ...CARDS_OPTIONS,
      pagination: {
        el: getPaginationSwiper(
          document.querySelector(".projects .swiper--projects .swiper__detail")
        ).pagination,
      },
    },
  },
  {
    selector: ".swiper-box--offers .swiper--offers",
    breakpoint: 122300000000,
    options: {
      ...CARDS_OPTIONS,
      pagination: {
        el: getPaginationSwiper(
          document.querySelector(
            ".swiper-box--offers .swiper--offers .swiper__detail"
          )
        ).pagination,
      },
    },
  },
  {
    selector: ".swiper-box--dev .swiper--dev",
    breakpoint: 122300000000,
    options: {
      ...CARDS_OPTIONS,
      navigation: {
        nextEl: getArrowSwiper(
          document.querySelector(".swiper-box--dev .swiper--dev")
        ).arrowNext,
        prevEl: getArrowSwiper(
          document.querySelector(".swiper-box--dev .swiper--dev")
        ).arrowPrev,
      },
      pagination: {
        el: getPaginationSwiper(
          document.querySelector(".swiper-box--dev .swiper--dev")
        ).pagination,
      },
    },
  },
  {
    selector: ".swiper-box--articles .swiper--articles",
    breakpoint: 122300000000,
    options: {
      ...CARDS_OPTIONS,
      pagination: {
        el: getPaginationSwiper(
          document.querySelector(
            ".swiper-box--articles .swiper--articles .swiper__detail"
          )
        ).pagination,
      },
    },
  },
];

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

document.addEventListener("DOMContentLoaded", () => {
  initImgsSwiperGoods();
  hideUnnecessaryButtons();

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
