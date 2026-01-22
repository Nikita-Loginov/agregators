import { SWIPERS } from "./index.js";
import { initSwiper, setVarElement } from "../modules/functions.js";

export const initImgsSwiperGoods = () => {
  const imgSwipers = document.querySelectorAll(".swiper--good-img");

  imgSwipers.forEach((swiper) => {
    const nextEl = swiper.querySelector(".arrow-swiper.next");
    const prevEl = swiper.querySelector(".arrow-swiper.prev");
    const paginationEl = swiper.querySelector(".swiper-pagination");

    const config = {
      ...SWIPERS.IMG_GOODS,
      navigation:
        nextEl && prevEl
          ? {
              nextEl: nextEl,
              prevEl: prevEl,
            }
          : false,
      pagination: paginationEl
        ? {
            el: paginationEl,
            clickable: true,
          }
        : false,
    };

    initSwiper(swiper, config);

    if (config.mousewheel) {
      swiper.addEventListener('wheel', (event) => {
        event.stopPropagation();
      }, { passive: false });
    }
  });
};

let activeVideo = null;

export const toggleVideoSwiper = (slide) => {
  const video = slide.querySelector("video");

  if (activeVideo && activeVideo !== video) {
    activeVideo.pause();
    activeVideo.currentTime = 0;
  }

  if (video) {
    video.play();
    activeVideo = video;
  }
};

export const checkIfDisabledSwiper = (swiper) => {
  const wrapper = swiper.el;
  const slides = swiper.slides;
  const slidesPerView = swiper.params.slidesPerView;

  setTimeout(() => {
    if (slides.length <= slidesPerView) {
      wrapper.classList.add("swiper-disabled");
      swiper.enabled = false;

      if (swiper.pagination) {
        swiper.pagination.update();
      }
    } else {
      wrapper.classList.remove("swiper-disabled");
      swiper.enabled = true;

      if (swiper.pagination) {
        swiper.pagination.update();
      }
    }
  }, 10);
};

export const setTableCountItems = (swiper) => {
  if (!swiper) return;

  const { slidesPerView } = swiper.params;

  const tableCount = Number(slidesPerView) + 1;

  const comparison = swiper.el.closest(".comparison");

  if (comparison)
    setVarElement(comparison, "--count-item-table", tableCount);

  comparison.setAttribute('data-count', tableCount);
};
