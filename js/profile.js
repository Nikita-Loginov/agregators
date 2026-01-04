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

const swipers = [
  {
    ...SWIPERS.GALLERY_BIG,
  },
  {
    ...SWIPERS.PROPERTY,
  },
  {
    ...SWIPERS.ALSO_CARDS_THREE,
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

  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  initCharts([{...charts.priceChange}])
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
