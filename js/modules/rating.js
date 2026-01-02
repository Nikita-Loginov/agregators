import { removeAllElementClass } from "./functions.js";

const CONFIG = {
  CLASS_ACTIVE: "active",
  CLASS_PRE_ACTIVE: "pre-active",
  CLASS_BOX: "rating-stars",
  CLASS_ITEM: "rating-stars__item",
};

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

const setActiveStars = (target) => {
  if (!target || !target.closest) return;
  
  const item = target.closest(`.${CONFIG.CLASS_ITEM}`);
  if (!item) return;

  const box = item.closest(`.${CONFIG.CLASS_BOX}`);
  if (!box) return;
  
  const stars = box.querySelectorAll(`.${CONFIG.CLASS_ITEM}`);
  removeAllElementClass(stars, CONFIG.CLASS_ACTIVE);
  removeAllElementClass(stars, CONFIG.CLASS_PRE_ACTIVE);

  item.classList.add(CONFIG.CLASS_ACTIVE);

  for (let i = 0; i < stars.length; i++) {
    if (stars[i] === item) break;
    stars[i].classList.add(CONFIG.CLASS_ACTIVE);
  }
};

const setPreActiveStars = (target) => {
  if (!target || !target.closest) return;
  
  const item = target.closest(`.${CONFIG.CLASS_ITEM}`);
  if (!item) return;

  const box = item.closest(`.${CONFIG.CLASS_BOX}`);
  if (!box) return;
  
  const stars = box.querySelectorAll(`.${CONFIG.CLASS_ITEM}`);
  removeAllElementClass(stars, CONFIG.CLASS_PRE_ACTIVE);

  item.classList.add(CONFIG.CLASS_PRE_ACTIVE);

  for (let i = 0; i < stars.length; i++) {
    if (stars[i] === item) break;
    stars[i].classList.add(CONFIG.CLASS_PRE_ACTIVE);
  }
};

const removePreActiveStars = (e) => {
  if (!e.target || !e.target.closest) return;
  
  const box = e.target.closest(`.${CONFIG.CLASS_BOX}`);
  if (!box) return;
  
  const stars = box.querySelectorAll(`.${CONFIG.CLASS_ITEM}`);
  removeAllElementClass(stars, CONFIG.CLASS_PRE_ACTIVE);
};

export const removeAllActiveStarts = (box) => {
  if (!box) return;



  const stars = box.querySelectorAll(`.${CONFIG.CLASS_ITEM}`);

  removeAllElementClass(stars, CONFIG.CLASS_PRE_ACTIVE);
  removeAllElementClass(stars, CONFIG.CLASS_ACTIVE);
}

export const initRatingStars = (e) => {
  if (!e || !e.target) return;

  if (e.type === "click") {
    setActiveStars(e.target);
  }

  if (e.type === "mouseenter" && !isTouchDevice) {
    setPreActiveStars(e.target);
  }

  if (e.type === "mouseleave" && !isTouchDevice) {
    removePreActiveStars(e);
  }
};