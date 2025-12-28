import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { toggleVideoSwiper } from "./swiper/functions.js";
import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";

const swipers = [
  {
    ...SWIPERS.ALSO_CARDS
  }
];

const initSwipersGood = () => {
  const swiperThumbs = new Swiper(SWIPERS.GALLERY_SMALL.selector, {
    ...SWIPERS.GALLERY_SMALL.options,
    mousewheel: { ...SWIPERS.GALLERY_SMALL.mousewheel },
  });

  const swiperMain = new Swiper(SWIPERS.GALLERY_BIG.selector, {
    ...SWIPERS.GALLERY_BIG.options,
    mousewheel: { ...SWIPERS.GALLERY_BIG.mousewheel },
    thumbs: {
      swiper: swiperThumbs,
    },
    on: {
      slideChange: (swiper) => {
        toggleVideoSwiper(swiper.slides[swiper.activeIndex]);
      },
    },
  });
};

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

document.addEventListener("DOMContentLoaded", () => {
  initSwipersGood();
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
