import { initSwiper } from "./functions.js";
import { MOUSE_WHEEL_CONFIG } from "../swiper/index.js";
import { getArrowSwiper } from "./functions.js";

export const initGallery = (slide, modalBlock, skipClick = false) => {
  const galleryItem = slide.closest("[data-gallery-item]");

  if (!galleryItem) return;

  const name = galleryItem.dataset.block;
  const type = name.startsWith("img") ? "img" : "video";

  if (!type || !name) return;

  initSwiperGallery(modalBlock, type, name, skipClick);
};

export const initSwiperGallery = (
  modalBlock,
  type,
  nameActive,
  skipClick = false
) => {
  const tabSelector =
    type === "img"
      ? '[data-btn-tab="gallery-imgs"]'
      : '[data-btn-tab="gallery-videos"]';
  const boxSelector =
    type === "img" ? ".galleryModal__box-imgs" : ".galleryModal__box-videos";

  const checkedBox = modalBlock.querySelector(tabSelector);

  if (checkedBox && !skipClick) {
    checkedBox.click();
  }

  const swiperBig = modalBlock.querySelector(
    `${boxSelector} .swiper--big-gallery`
  );
  const swiperSmall = modalBlock.querySelector(
    `${boxSelector} .swiper--small-gallery`
  );

  if (!swiperBig || !swiperSmall) return;

  const swiperBoxSmall = swiperSmall.closest(".galleryModal__swiper-box");

  if (!swiperSmall.classList.contains("swiper-initialized")) {
    initSwiper(swiperSmall, {
      slidesPerView: 4,
      spaceBetween: 8,
      watchSlidesProgress: true,
      mousewheel: MOUSE_WHEEL_CONFIG,
      navigation: {
        nextEl: getArrowSwiper(swiperBoxSmall).arrowNext,
        prevEl: getArrowSwiper(swiperBoxSmall).arrowPrev,
      },

      breakpoints: {
        1200: {
          slidesPerView: 5,
        },
      },
    });
  }

  const slides = Array.from(
    swiperBig.querySelector(".swiper-wrapper").children
  );
  const findItem = swiperBig.querySelector(`[data-block="${nameActive}"]`);
  const activeIndex = slides.findIndex((item) => item === findItem);

  const swiperBoxBig = swiperBig.closest(".galleryModal__swiper-box");

  const arrowMainBox = modalBlock.querySelector(
    ".arrows-swiper.galleryModal__arrows-main"
  );

  const isModile = window.innerWidth < 1023;

  const bigOptions = {
    initialSlide: activeIndex >= 0 ? activeIndex : 0,
    thumbs: { swiper: swiperSmall.swiper },
    navigation: {
      nextEl: isModile
        ? getArrowSwiper(arrowMainBox).arrowNext
        : getArrowSwiper(swiperBoxBig).arrowNext,
      prevEl: isModile
        ? getArrowSwiper(arrowMainBox).arrowPrev
        : getArrowSwiper(swiperBoxBig).arrowPrev,
    },
    mousewheel: MOUSE_WHEEL_CONFIG,
    pagination: {
      el: ".galleryModal .swiper-pagination",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return `<span class="current-slide">${current}</span>of<span class="total-slides">${total}</span>`;
      },
    },
  };

  if (type === "video") {
    bigOptions.on = {
      ...bigOptions.on,
      init: (swiper) => {
        const activeVideo = slides[swiper.activeIndex].querySelector("video");

        if (activeVideo) activeVideo.play();
      },
      slideChange: () => {
        slides.forEach((slide) => {
          const video = slide.querySelector("video");
          if (video) video.pause();
        });

        const activeVideo =
          slides[swiperBig.swiper.activeIndex].querySelector("video");
        if (activeVideo) activeVideo.play();
      },
    };
  }

  if (!swiperBig.classList.contains("swiper-initialized")) {
    initSwiper(swiperBig, bigOptions);
  } else {
    swiperBig.swiper.slideTo(activeIndex, 0);
  }
};
