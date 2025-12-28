import { SWIPERS } from "./index.js";
import { initSwiper } from "../modules/functions.js";

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
