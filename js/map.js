import { SWIPERS } from "./swiper/index.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { setVar } from "./utils/setVar.js";
import { initSimpleMap } from "./modules/map.js";
import { lagerhauser } from "./data/lagerhauser.js";
import { toggleSibebar } from "./modules/sibebar.js";
import { initSharedFormSync } from "./modules/shared-form/sharedFormSync.js";

const swipers = [
  {
    ...SWIPERS.MAP_SIBEBAR_CARDS,
  },
];

const serVars = () => {
  const infoMap = document.querySelector(".map__info");

  if (!infoMap) {
  }
  const styles = window.getComputedStyle(infoMap);
  const height = styles.getPropertyValue("height");

  setVar("--info-map-height", height);
};

const handleGlobalClick = (e) => {
  toggleSibebar(e);
};

document.addEventListener("DOMContentLoaded", () => {
  initSimpleMap("map", lagerhauser, {
    clickInit: true,
  });
  initImgsSwiperGoods();
  serVars();

  swipers.forEach((config) => {
    slidersConfig.push(config);
  });

  handleAllSliders();

  document.addEventListener("click", handleGlobalClick);

  initSharedFormSync();
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    handleAllSliders();
    serVars();
  }, 100);
});
