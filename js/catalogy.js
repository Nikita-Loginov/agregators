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

const swipers = [
  {
    ...SWIPERS.PRICING_CARD,
  },
];

const handleGlobalClick = (e) => {
  initMoreBlocks(e);
};

const updateGoodItems = (relativeBox, type) => {
  relativeBox.querySelectorAll(".good-item").forEach((good) => {
    good.classList.toggle("good-item--column", type === "tiles");
  });
};

const changeTypeGrid = (e) => {
  const { target } = e;

  if (target.dataset.block !== "grid-check") return;

  const typeCheck = target.dataset.check;

  if (!typeCheck) return;

  const relativeBox = target.closest('[data-block="grid-relative"]');
  if (!relativeBox) return;

  if (window.innerWidth > 767) {
    relativeBox.setAttribute("data-user-grid", typeCheck);
  }

  relativeBox.setAttribute("data-grid", typeCheck);
  updateGoodItems(relativeBox, typeCheck);
};

const initGridSystem = () => {
  document.querySelectorAll('[data-block="grid-relative"]').forEach((box) => {
    const currentType = box.getAttribute("data-grid") || "list";
    const targetCheckbox = box.querySelector(
      `[data-block="grid-check"][data-check="${currentType}"]`
    );

    if (targetCheckbox) {
      targetCheckbox.checked = true;
      updateGoodItems(box, currentType);
    }
  });
};

const handleGridResize = () => {
  const isMobile = window.innerWidth <= 767;

  document.querySelectorAll('[data-block="grid-relative"]').forEach((box) => {
    if (isMobile) {
      box.setAttribute("data-grid", "tiles");

      const tilesCheckbox = box.querySelector(
        '[data-block="grid-check"][data-check="tiles"]'
      );

      if (tilesCheckbox) {
        tilesCheckbox.checked = true;
      }
    } else {
      const userChoice = box.getAttribute("data-user-grid") || "list";

      box.setAttribute("data-grid", userChoice);

      const userCheckbox = box.querySelector(
        `[data-block="grid-check"][data-check="${userChoice}"]`
      );

      if (userCheckbox) {
        userCheckbox.checked = true;
      }
    }

    const currentType = box.getAttribute("data-grid");
    updateGoodItems(box, currentType);
  });
};

const serVars = () => {
 const heightFilter = getHeightFilter();

 setVar('--filter-height', heightFilter);
}


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

window.addEventListener('scroll', () => {
  serVars();
})
