export const getPositionsElementsScroll = (options) => {
  const { elementScroll, elementStatic, className = "scroll" } = options;

  if (!elementScroll || !elementStatic) return;

  let ticking = false;
  let isBelow = false;

  const checkPosition = () => {
    const scrollRect = elementScroll.getBoundingClientRect();
    const staticRect = elementStatic.getBoundingClientRect();

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    const absoluteScrollTop = scrollRect.top + scrollY + 50;

    const absoluteStaticBottom = staticRect.top + scrollY;

    const newIsBelow = absoluteScrollTop > absoluteStaticBottom;

    if (newIsBelow !== isBelow) {
      isBelow = newIsBelow;

      if (isBelow) {
        elementScroll.classList.add(className);
      } else {
        elementScroll.classList.remove(className);
      }
    }
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkPosition();
        ticking = false;
      });

      ticking = true;
    }
  };

  checkPosition();

  document.addEventListener("scroll", handleScroll, { passive: true });

  window.addEventListener("resize", handleScroll, { passive: true });

  return () => {
    document.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
};

export function isTouchDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );
}

export const initSwiper = (element, config = {}) => {
  if (!element) return;

  const swiperConfig = {
    ...config,
  };

  const swiper = new Swiper(element, swiperConfig);

  return swiper;
};
