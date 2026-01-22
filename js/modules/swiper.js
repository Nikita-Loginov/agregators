import { classAction } from "./classActions.js";
import { hiddenLoader } from "./loader.js";

const swiperInstances = {};

export const slidersConfig = [];

function removeAllElementsActiveClass(items, className) {
  items?.forEach((item) => {
    classAction(item, className, "remove");
  });
}

function initSwiper(config) {
  const elements = document.querySelectorAll(config.selector);
  if (!elements.length) return null;

  destroySwipersBySelector(config.selector);

  const swiperOptions = {
    ...config.options,
    ...(config.events ? { on: config.events } : {}),
  };

  // console.log(element)

  elements.forEach((element, index) => {
    const instanceKey = `${config.selector}--${index}`;
    swiperInstances[instanceKey] = new Swiper(element, swiperOptions);
  });

  return getSwipersBySelector(config.selector);
}

function destroySwiper(instanceKey) {
  if (swiperInstances[instanceKey]) {
    swiperInstances[instanceKey].destroy(true, true);
    delete swiperInstances[instanceKey];
  }
}

function destroySwipersBySelector(selector) {
  Object.keys(swiperInstances)
    .filter((key) => key.startsWith(`${selector}--`))
    .forEach((key) => destroySwiper(key));
}

function getSwipersBySelector(selector) {
  return Object.keys(swiperInstances)
    .filter((key) => key.startsWith(`${selector}--`))
    .map((key) => swiperInstances[key]);
}

function checkBreakpoint(breakpoint) {
  return window.innerWidth < breakpoint;
}

export function handleAllSliders() {
  slidersConfig.forEach((config) => {
    if (config.breakpointMax && checkBreakpoint(config.breakpointMax)) {
      destroySwipersBySelector(config.selector);
      return;
    }

    if (checkBreakpoint(config.breakpoint)) {
      const existingInstances = getSwipersBySelector(config.selector);

      if (!existingInstances.length) {
        initSwiper(config);

        initHiddenLoader(config.selector);
      }
    } else {
      destroySwipersBySelector(config.selector);
    }
  });
}

const initHiddenLoader = (selectorSwiper) => {
  if (!selectorSwiper) return;

  const el = document.querySelector(selectorSwiper);

  if (!el) return;

  const loadingBox = el.closest("[data-loader-relative]");

  if (loadingBox) hiddenLoader(loadingBox);
};
