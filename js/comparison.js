import { initComparison } from "./comparison/index.js";

const handleGlobalClick = (e) => {};

document.addEventListener("DOMContentLoaded", () => {
  initComparison();

  document.addEventListener("click", handleGlobalClick);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {}, 100);
});
