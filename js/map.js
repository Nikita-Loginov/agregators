import { SWIPERS } from "./swiper/index.js";
import { initImgsSwiperGoods } from "./swiper/functions.js";
import { handleAllSliders, slidersConfig } from "./modules/swiper.js";
import { setVar } from "./utils/setVar.js";
import { initSimpleMap } from "./modules/map.js";
import { lagerhauser } from "./data/lagerhauser.js";

const swipers = [
  {
    ...SWIPERS.PRICING_CARD,
  },
];

const serVars = () => {
  const infoMap = document.querySelector('.map__info');

  if (!infoMap) {

  }
 const styles = window.getComputedStyle(infoMap);
  const height = styles.getPropertyValue("height");

 setVar('--info-map-height', height);
}

const handleGlobalClick = (e) => {};

document.addEventListener("DOMContentLoaded", () => {
  initSimpleMap("map", lagerhauser);
  initImgsSwiperGoods();
  serVars();

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
    serVars();
  }, 100);
});
