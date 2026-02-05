import { initSwiperGallery } from "./initSwiperGallery.js";

export const renderSlides = (modalBlock, allSlides, type, activeBlock) => {
  const box = modalBlock.querySelector(".galleryModal__box");
  if (!box) return;

  const wrapperBig = box.querySelector(".swiper--big-gallery .swiper-wrapper");
  const wrapperSmall = box.querySelector(
    ".swiper--small-gallery .swiper-wrapper"
  );
  if (!wrapperBig || !wrapperSmall) return;

  if (wrapperBig.closest(".swiper").swiper)
    wrapperBig.closest(".swiper").swiper.destroy(true, true);
  if (wrapperSmall.closest(".swiper").swiper)
    wrapperSmall.closest(".swiper").swiper.destroy(true, true);

  wrapperBig.innerHTML = "";
  wrapperSmall.innerHTML = "";

  const slides = allSlides.filter((s) => s.type === type);

  slides.forEach((slide) => {
    const bigSlide = document.createElement("div");
    bigSlide.className = "swiper-slide";
    bigSlide.dataset.block = slide.block;
    bigSlide.innerHTML = `<div class="galleryModal__img">${slide.html}</div>`;
    wrapperBig.appendChild(bigSlide);

    const smallSlide = document.createElement("div");
    smallSlide.className = "swiper-slide";
    smallSlide.innerHTML = `<div class="galleryModal__img">${slide.html}</div>`;
    wrapperSmall.appendChild(smallSlide);
  });

  initSwiperGallery(modalBlock, type, activeBlock);
};
