import { SWIPERS } from "./swiper/index.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import { initComments } from "./modules/comments.js";
import { searcBlockTab } from "./modules/tab.js";
import { initCharts } from "./modules/chart.js";
import { charts } from "./data/chart.js";
import { initSimpleMap } from "./modules/map.js";
import { lagerhauser } from "./data/lagerhauser.js";
import { floorInit } from "./modules/floor.js";
import { floorPlansData } from "./data/floorPlan.js";

const swipers = [
  {
    ...SWIPERS.GALLERY_BIG,
  },
  {
    ...SWIPERS.PROPERTY,
    breakpoint: 767,
  },
  {
    ...SWIPERS.ALSO_CARDS,
  },
];

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
  initComments(e);
  searcBlockTab(e);
};

document.addEventListener("DOMContentLoaded", () => {
  hideUnnecessaryButtons();
  initImgsSwiperGoods();
  floorInit(
    floorPlansData,
    document.querySelector('.floor[data-block="floor-relative"]')
  );

  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  initCharts([{ ...charts.priceChange }]);
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
