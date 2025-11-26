import { SWIPERS } from "./swiper/index.js";
import { initSwiper } from "./modules/functions.js";
import { initMoreBlocks, hideUnnecessaryButtons } from "./modules/moreContent.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";

const swipers = [
  {
    ...SWIPERS.PRICING_CARD
  }
]

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

const initImgsSwiperGoods = () => {
  const imgSwipers = document.querySelectorAll(".swiper--good-img");

  imgSwipers.forEach((swiper) => {
    const nextEl = swiper.querySelector(".arrow-swiper.next");
    const prevEl = swiper.querySelector(".arrow-swiper.prev");
    const paginationEl = swiper.querySelector(".swiper-pagination");

    const config = {
      ...SWIPERS.IMG_GOODS,
      navigation:
        nextEl && prevEl
          ? {
              nextEl: nextEl,
              prevEl: prevEl,
            }
          : false,
      pagination: paginationEl
        ? {
            el: paginationEl,
            clickable: true,
          }
        : false,
    };

    initSwiper(swiper, config);
  });
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
  resizeTimeout = setTimeout(handleAllSliders, 100);
});
