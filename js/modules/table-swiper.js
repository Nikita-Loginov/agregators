import { initSwiper, debounce } from "./functions.js";
import { SWIPERS } from "../swiper/index.js";

const tabletSwiperState = new WeakMap();

const initBoxSwipers = (box) => {
  const swiperEls = Array.from(box.querySelectorAll(".swiper--table"));
  if (!swiperEls.length) return;

  const nextEl = box.querySelector(".arrow-swiper.next");
  const prevEl = box.querySelector(".arrow-swiper.prev");
  const pagination = box.querySelector(".swiper-pagination");

  const swiperInstances = swiperEls.map((el) =>
    initSwiper(el, {
      ...SWIPERS.TABLET.options,
      mousewheel: true,
      allowTouchMove: true,
      pagination: {
        el: pagination,
        type: "custom",
        renderCustom: (swiper, current, total) =>
          `<span class="current-slide">${current}</span>/<span class="total-slides">${total}</span>`,
      },
    })
  );

  let isSyncing = false;

  swiperInstances.forEach((swiper, index) => {
    swiper.on("slideChange", () => {
      if (isSyncing) return;

      isSyncing = true;
      const activeIndex = swiper.activeIndex;
      const {params} = swiper

      swiperInstances.forEach((sw, i) => {
        if (i !== index && sw.activeIndex !== activeIndex) {
          sw.slideTo(activeIndex, params.speed);
        }
      });

      isSyncing = false;
    });
  });

  const onNext = () => swiperInstances[0].slideNext();
  const onPrev = () => swiperInstances[0].slidePrev();

  nextEl?.addEventListener("click", onNext);
  prevEl?.addEventListener("click", onPrev);

  tabletSwiperState.set(box, {
    swiperInstances,
    onNext,
    onPrev,
  });
};

const destroyBoxSwipers = (box) => {
  const state = tabletSwiperState.get(box);
  if (!state) return;

  const { swiperInstances, onNext, onPrev } = state;

  const nextEl = box.querySelector(".arrow-swiper.next");
  const prevEl = box.querySelector(".arrow-swiper.prev");

  nextEl?.removeEventListener("click", onNext);
  prevEl?.removeEventListener("click", onPrev);

  swiperInstances.forEach((swiper) => {
    swiper.off("slideChange");
    swiper.destroy(true, true);
  });

  tabletSwiperState.delete(box);
};

export const initTabletSwipers = () => {
  const boxes = document.querySelectorAll(".table-swiper");
  if (!boxes.length) return;

  const handleResize = () => {
    boxes.forEach((box) => {
      const initWidth = parseInt(box.dataset.init, 10) || Infinity;

      const isActive = tabletSwiperState.has(box);

      if (window.innerWidth <= initWidth && !isActive) {
        initBoxSwipers(box);
      }

      if (window.innerWidth > initWidth && isActive) {
        destroyBoxSwipers(box);
      }
    });
  };

  handleResize();

  window.addEventListener("resize", debounce(handleResize, 150));
};
