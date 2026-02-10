import { initSwiper } from "./functions.js";
import { SWIPERS } from "../swiper/index.js";
import { checkIfDisabledSwiper } from "../swiper/functions.js";

export const floorInit = (data, box) => {
  if (!data || !data.length) return;

  const swiperBox = box.querySelector('[data-block="floor-swiper"]');

  if (!swiperBox) return;

  const swiper = swiperBox.querySelector(".swiper--floor");

  renderSlides(swiper, data);
  initFloorSwiper(box, swiper, data);
};

const initFloorSwiper = (box, swiper, data) => {
  const prevArrow = box.querySelector(".arrow-swiper.prev");
  const nextArrow = box.querySelector(".arrow-swiper.next");
  const paginationBox = box.querySelector(".swiper-pagination");

  initSwiper(swiper, {
    ...SWIPERS.FLOOR.options,
    navigation: {
      nextEl: nextArrow,
      prevEl: prevArrow,
    },
    pagination: {
      el: paginationBox,
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return `<p class="p2">Layout ${current} of ${total}</p>`;
      },
    },
    on: {
      init: function (swiper) {
        renderTitle(box, data[swiper.activeIndex]);

        checkIfDisabledSwiper(swiper);
      },
      update: function (swiper) {
        renderTitle(box, data[swiper.activeIndex]);
        checkIfDisabledSwiper(swiper);
      },
      slideChange: function (swiper) {
        renderTitle(box, data[swiper.activeIndex]);
      },
      resize: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
    },
  });
};

const renderSlides = (swiper, data) => {
  if (!swiper || !data) return;

  const wrapper = swiper.querySelector(".swiper-wrapper");

  if (!wrapper) return;

  wrapper.innerHTML = "";

  data.forEach((item, index) => {
    const slideHtml = getHtmlSlide(item, index);

    wrapper.insertAdjacentHTML("beforeend", slideHtml);
  });
};

const getHtmlSlide = (item, index) => {
  const { images, items, title } = item;
  const format = images.format || "webp";
  const radioName = `floor-${index}`;

  const renderImages = () =>
    ["2d", "3d"]
      .map((type, i) => {
        if (!images[type]) return "";

        return `
          <div
            class="floor-plan__img tab-item ${i === 0 ? "active" : ""}"
            data-block-tab="${type}-floor-${index}"
            data-block-category="floor-${index}"
          >
            <picture>
              <source
                srcset="
                  ${images[type]}.${format} 1x,
                  ${images[type]}2x.${format} 2x
                "
              />
              <img
                src="${images[type]}.${format}"
                alt="${title}"
                loading="lazy"
                style="object-fit: contain;"
              />
            </picture>
          </div>
        `;
      })
      .join("");

  const renderDecors = () => `
    <div class="checkbox-box tab-btns">
      ${["2d", "3d"]
        .map((type, i) => {
          if (!images[type]) return "";

          return `
            <label class="check tab-btn" data-btn-tab="${type}-floor-${index}">
              <div class="check__info">
                <input
                  type="radio"
                  name="${radioName}"
                  ${i === 0 ? "checked" : ""}
                />
                <div class="p2 check__info-content">
                  <!-- <div class="icon">
                    <span class="kit-icon ${
                      type === "2d" ? "d2" : "d3"
                    }"></span>
                  </div>  -->
                  ${type.toUpperCase()}
                </div>
              </div>
            </label>
          `;
        })
        .join("")}
    </div>
  `;

  const renderItems = () =>
    items
      .map(
        (item) => `
          <div class="table-grid__row">
            <div class="table-grid__cell">
              <p class="p2 semibold-font">${item.title}</p>
            </div>
            <div class="table-grid__cell" style="justify-content: flex-end;">
              <p class="p2">${item.text}</p>
            </div>
          </div>
        `
      )
      .join("");

  return `
    <div class="swiper-slide">
      <div class="floor__block">
        <div class="floor__content">
          <div class="floor-plan">
            <div class="floor-plan__content">
              <div
                class="floor-plan__img-box tabs-box"
                data-tab-category="floor-${index}"
              >
                ${renderImages()}
                <div class="floor-plan__decors">
                  ${renderDecors()}
                </div>
              </div>
            </div>
          </div>

          <p
            class="h6 semibold-font tablet-show"
            style="justify-content: center"
          >
            ${title}
          </p>

          <div class="floor__item">
            <div class="floor__item-content">
              <div
                class="table-grid table-grid--two table-grid--odd table-grid--noGap"
              >
                <div class="table-grid__items">
                  ${renderItems()}
                </div>
              </div>

              <button
                class="button button--lg button--bg-primary-100 modal-open tablet-none"
                type="button"
                data-modal="requestModal"
              >
                <p class="p2 medium-font">Get all floor plans</p>
                <div class="icon icon--big" style="rotate: -45deg">
                  <span class="kit-icon arrow-right-md"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

const renderTitle = (box, itemData) => {
  if (!box) return;

  const relative = box.closest('[data-block="floor-relative"]');

  const { title } = itemData;

  const titleBox = relative.querySelector('[data-block="floor-title"]');

  if (titleBox) {
    titleBox.innerHTML = "";

    titleBox.textContent = title;
  }
};
