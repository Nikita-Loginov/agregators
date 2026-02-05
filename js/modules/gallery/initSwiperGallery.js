import { initSwiper } from "../functions.js";
import { MOUSE_WHEEL_CONFIG } from "../../swiper/index.js";
import { getArrowSwiper } from "../functions.js";

export const initSwiperGallery = (modalBlock, type, nameActive) => {
  const box = modalBlock.querySelector(".galleryModal__box");
  const swiperBig = box.querySelector(".swiper--big-gallery");
  const swiperSmall = box.querySelector(".swiper--small-gallery");
  if (!swiperBig || !swiperSmall) return;

  const swiperBoxSmall = swiperSmall.closest(".galleryModal__swiper-box");

  initSwiper(swiperSmall, {
    slidesPerView: 4,
    spaceBetween: 8,
    watchSlidesProgress: true,
    mousewheel: MOUSE_WHEEL_CONFIG,
    navigation: {
      nextEl: getArrowSwiper(swiperBoxSmall).arrowNext,
      prevEl: getArrowSwiper(swiperBoxSmall).arrowPrev,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: { 1200: { slidesPerView: 5 } },
  });

  const slides = Array.from(
    swiperBig.querySelector(".swiper-wrapper").children
  );
  const findItem = swiperBig.querySelector(`[data-block="${nameActive}"]`);
  const activeIndex = slides.findIndex((item) => item === findItem);

  const swiperBoxBig = swiperBig.closest(".galleryModal__swiper-box");
  const arrowMainBox = modalBlock.querySelector(
    ".arrows-swiper.galleryModal__arrows-main"
  );
  const isMobile = window.innerWidth < 1023;

  const bigOptions = {
    initialSlide: activeIndex >= 0 ? activeIndex : 0,
    thumbs: { swiper: swiperSmall.swiper },
    navigation: {
      nextEl: isMobile
        ? getArrowSwiper(arrowMainBox).arrowNext
        : getArrowSwiper(swiperBoxBig).arrowNext,
      prevEl: isMobile
        ? getArrowSwiper(arrowMainBox).arrowPrev
        : getArrowSwiper(swiperBoxBig).arrowPrev,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: MOUSE_WHEEL_CONFIG,
    pagination: {
      el: ".galleryModal .swiper-pagination",
      type: "custom",
      renderCustom: (swiper, current, total) =>
        `<span class="current-slide">${current}</span>of<span class="total-slides">${total}</span>`,
    },
  };

  if (type === "video") {
    bigOptions.on = {
      init: (swiper) => {
        const activeVideo = slides[swiper.activeIndex].querySelector("video");
        if (activeVideo) activeVideo.play();
      },
      slideChange: () => {
        slides.forEach((slide) => slide.querySelector("video")?.pause());
        const activeVideo =
          slides[swiperBig.swiper.activeIndex].querySelector("video");
        if (activeVideo) activeVideo.play();
      },
    };
  }

  initSwiper(swiperBig, bigOptions);
};
