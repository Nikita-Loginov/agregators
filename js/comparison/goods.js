import { initSwiper } from "../modules/functions.js";
import { MOUSE_WHEEL_CONFIG } from "../swiper/index.js";
import { setTableCountItems } from "../swiper/functions.js";

export const renderGoodsSwiper = (swiperEl, data) => {
  const wrapper = swiperEl.querySelector(".swiper-wrapper");
  wrapper.innerHTML = "";

  data.forEach((item) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
      <div class="good-small">
        <div class="good-small__img-box">
          <a
            href="#"
            class="good-small__img"
            aria-label="Перейти к товару"
            title="${item.title}"
          >
            <picture>
              <source
                srcset="
                  ${item.img.src}.webp 1x,
                  ${item.img.src}2x.webp 2x
                "
                type="image/webp"
              />
              <img
                src="${item.img.src}.webp"
                alt="${item.title}"
                loading="lazy"
              />
            </picture>
          </a>

          <div class="good-small__img-decor">
            <div class="good-small__btns">

              <!-- favorite -->
              <button
                aria-label="Добавить в избранное"
                class="button button--bg-gray-200 button--cub button--cub-md-add button--rounded-base button--favorite
                  ${item.favorite ? "active" : ""}"
                data-action="favorite"
              >
                <div class="icon">
                  <span class="kit-icon heart"></span>
                </div>
              </button>

              <!-- comparison -->
              <button
                aria-label="Добавить в сравнение"
                class="button button--bg-gray-200 button--cub button--cub-md-add button--rounded-base button--comparison
                  ${item.comparison ? "active" : ""}"
                data-action="comparison"
              >
                <div class="icon">
                  <span class="kit-icon chart-bar-vertical"></span>
                </div>
              </button>

            </div>
          </div>
        </div>

        <div class="good-small__content">
          <div class="textbox">
            <a
              href="#"
              class="p2 fz-16-12 text-secondary-300 ellipsis-text ellipsis-text--three ellipsis-text--media-one"
              title="${item.title}"
            >
              ${item.title}
            </a>
          </div>
        </div>
      </div>
    `;

    wrapper.append(slide);
  });
};

export const initGoodsSwiper = (element) => {
  return initSwiper(element, {
    slidesPerView: 1,
    spaceBetween: 16,
    mousewheel: MOUSE_WHEEL_CONFIG,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    navigation: {
      nextEl: ".comparison .arrow-swiper.next",
      prevEl: ".comparison .arrow-swiper.prev",
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1100: { slidesPerView: 3, spaceBetween: 32 },
    },
    on: {
      init(swiper) {
        setTableCountItems(swiper);
      },
      resize(swiper) {
        setTableCountItems(swiper);
      },
    },
  });
};
