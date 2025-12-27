const MOUSE_WHEEL_CONFIG = {
  enabled: true,
  forceToAxis: true,
  sensitivity: 1,
  eventsTarget: "container",
};

export const SWIPERS = {
  IMG_GOODS: {
    selector: ".catalogy .swiper--good-img",
    breakpoint: 122300000000,
    mousewheel: MOUSE_WHEEL_CONFIG,
    options: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
  },
  PRICING_CARD: {
    selector: ".catalogy .swiper--price",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 1,
      spaceBetween: 8,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".catalogy .swiper--price .swiper-pagination",
        type: "progressbar",
      },
      breakpoints: {
        1280: {
          slidesPerView: 5,
        },

        767: {
          slidesPerView: 4,
        },

        360: {
          slidesPerView: 2,
        }
      },
    },
  },
  ARTICLE_CARDS: {
    selector: ".article .swiper--articles",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 3,
      spaceBetween: 32,
      pagination: {
        el: ".article .swiper-pagination",
      },
    },
  },
  ALSO_CARDS: {
    selector: ".also-section .swiper--also",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 4,
      spaceBetween: 14,
      navigation : {
        nextEl: '.also-section .arrow-swiper.next',
        prevEl: '.also-section .arrow-swiper.prev',
      }
    },
  },
};
