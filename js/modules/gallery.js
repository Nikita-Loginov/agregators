import { initSwiper } from "./functions.js";
import { MOUSE_WHEEL_CONFIG } from "../swiper/index.js";

export const initGallery = (slide, modalBlock, skipClick = false) => {
  const galleryItem = slide.closest("[data-gallery-item]");
  
  
  if (!galleryItem) return;

  const name = galleryItem.dataset.block;
  const type = name.startsWith("img") ? "img" : "video";

  if (!type || !name) return;

  initSwiperGallery(modalBlock, type, name, skipClick);
};

export const initSwiperGallery = (modalBlock, type, nameActive, skipClick = false) => {
  
  const tabSelector =
    type === "img"
      ? '[data-btn-tab="gallery-imgs"]'
      : '[data-btn-tab="gallery-videos"]';
  const boxSelector =
    type === "img" ? ".galleryModal__box-imgs" : ".galleryModal__box-videos";

  const checkedBox = modalBlock.querySelector(tabSelector);
  
  if (checkedBox && !skipClick) {
    checkedBox.click()
  };

  const swiperBig = modalBlock.querySelector(
    `${boxSelector} .swiper--big-gallery`
  );
  const swiperSmall = modalBlock.querySelector(
    `${boxSelector} .swiper--small-gallery`
  );

  if (!swiperBig || !swiperSmall) return;

  if (!swiperSmall.classList.contains("swiper-initialized")) {
    initSwiper(swiperSmall, {
      slidesPerView: 5,
      spaceBetween: 8,
      watchSlidesProgress: true,
      mousewheel: MOUSE_WHEEL_CONFIG,
    });
  }

  const slides = Array.from(
    swiperBig.querySelector(".swiper-wrapper").children
  );
  const findItem = swiperBig.querySelector(`[data-block="${nameActive}"]`);
  const activeIndex = slides.findIndex((item) => item === findItem);

  const swiperBox = swiperBig.closest('.galleryModal__swiper-box')
  const arrowPrevBig = swiperBox.querySelector('.arrow-swiper.prev');
  const arrowNextBig = swiperBox.querySelector('.arrow-swiper.next');

  const bigOptions = {
    initialSlide: activeIndex >= 0 ? activeIndex : 0,
    thumbs: { swiper: swiperSmall.swiper },
    navigation: {
      nextEl: arrowNextBig,
      prevEl: arrowPrevBig,
    },
    mousewheel: MOUSE_WHEEL_CONFIG,
  };

  if (type === "video") {
    bigOptions.on = {
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
