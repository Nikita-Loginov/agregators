import { initSimpleMap } from "./modules/map.js";
import { ofisLagerhauser } from "./data/lagerhauser.js";

const handleGlobalClick = (e) => {};

document.addEventListener("DOMContentLoaded", () => {
  const offset = window.innerWidth < 1023 ?  [200, 0] : [0, 0];

  initSimpleMap("map", [ofisLagerhauser], {
    autoFitBounds: false,
    offset,
  });

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {}, 100);
});
