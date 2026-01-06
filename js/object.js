import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import { searcBlockTab } from "./modules/tab.js";
import { initSimpleMap } from "./modules/map.js";
import { lagerhauser } from "./data/lagerhauser.js";

const swipers = [
  {
    ...SWIPERS.ALSO_CARDS
  },
  {
    ...SWIPERS.STATIC_TABLE
  }
];

const initSwipersGood = () => {
  const swiperThumbs = new Swiper(SWIPERS.GALLERY_SMALL.selector, {
    ...SWIPERS.GALLERY_SMALL.options,
  });

  const swiperMain = new Swiper(SWIPERS.GALLERY_BIG.selector, {
    ...SWIPERS.GALLERY_BIG.options,
    thumbs: {
      swiper: swiperThumbs,
    },
    on: {
      ...SWIPERS.GALLERY_BIG.events
    },
  });
};

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
  searcBlockTab(e);
};

document.addEventListener("DOMContentLoaded", () => {
  initSwipersGood();
  hideUnnecessaryButtons();
  initImgsSwiperGoods();

  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  initSimpleMap("map-2d", [lagerhauser.at(-1)]);

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleAllSliders();
  }, 100);
});
