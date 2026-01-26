import { SWIPERS } from "./swiper/index.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import {
  initMoreBlocks,
  hideUnnecessaryButtons,
} from "./modules/moreContent.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { initSimpleSticky } from "./utils/initSimpleSticky.js";
import { setVar } from "./utils/setVar.js";
import { getHeightFilter } from "./modules/functions.js";
import {
  changeTypeGrid,
  initGridSystem,
  handleGridResize,
} from "./modules/catalogy-grid.js";
import { initCharts } from "./modules/chart.js";
import { charts } from "./data/chart.js";
import { initSharedFormSync } from "./modules/shared-form/sharedFormSync.js";

const swipers = [
  {
    ...SWIPERS.MARKET_TABLE,
  },
];

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

const serVars = () => {
  const heightFilter = getHeightFilter();

  setVar("--filter-height", heightFilter);
};

document.addEventListener("DOMContentLoaded", () => {
  initImgsSwiperGoods();
  hideUnnecessaryButtons();
  initGridSystem();
  initSimpleSticky();
  serVars();

  handleGridResize();

  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  document.addEventListener("click", handleGlobalClick);

  initCharts([{...charts.market}])
  initSharedFormSync();
});

document.addEventListener("change", (e) => {
  changeTypeGrid(e);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    serVars();
    handleAllSliders();
    handleGridResize();
  }, 100);
});

window.addEventListener("scroll", () => {
  serVars();
});
