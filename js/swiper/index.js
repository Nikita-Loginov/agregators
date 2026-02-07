import {
  toggleVideoSwiper,
  checkIfDisabledSwiper,
  setTableCountItems,
} from "./functions.js";

export const MOUSE_WHEEL_CONFIG = {
  enabled: true,
  forceToAxis: true,
  sensitivity: 1,
  eventsTarget: "container",
};

const BREAKPOINTS_DEATAIL_BLOCK = {
  1024: {
    slidesPerView: 3,
    spaceBetween: 14,
  },
  767: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  600: {
    slidesPerView: 2.3,
  },
};

const BREAKPOINTS_CARDS_ITEMS = {
  1280: {
    slidesPerView: 4,
  },
  1024: {
    slidesPerView: 3,
  },
  767: {
    slidesPerView: 2.7,
  },
  600: {
    slidesPerView: 2.1,
  },
};

export const TABLE_OPTIONS = {
  slidesPerView: 1,
  spaceBetween: 16,
  speed: 0,
  followFinger: false,
  touchReleaseOnEdges: true,
  allowTouchMove: false,
  simulateTouch: false,
  shortSwipes: false,
  longSwipes: false,
  allowSlidePrev: true,
  allowSlideNext: true,
  preventInteractionOnTransition: true,
  touchRatio: 0,
  touchAngle: 0,
  grabCursor: false,
  mousewheel: false,
};

export const CARDS_OPTIONS = {
  mousewheel: MOUSE_WHEEL_CONFIG,
  slidesPerView: 1.1,
  spaceBetween: 16,
  breakpoints: {
    ...BREAKPOINTS_CARDS_ITEMS,
  },
};

export const CARDS_EVENTS = {
  init: function (swiper) {
    checkIfDisabledSwiper(swiper);
  },
  update: function (swiper) {
    checkIfDisabledSwiper(swiper);
  },
  resize: function (swiper) {
    checkIfDisabledSwiper(swiper);
  },
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
        },
      },
    },
  },
  ARTICLE_CARDS: {
    selector: ".swiper-box--articles .swiper--articles",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 1.2,
      spaceBetween: 12,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".swiper-box--articles .swiper-pagination",
      },
      breakpoints: {
        767: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        600: {
          slidesPerView: 2.1,
        },
      },
    },
  },
  ALSO_CARDS: {
    selector: ".also-section .swiper--also",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 1.03,
      spaceBetween: 12,
      watchOverflow: true,
      pagination: {
        el: ".also-section .swiper-pagination--also",
      },
      breakpoints: {
        1220: {
          slidesPerView: 4,
          spaceBetween: 14,
        },
        1024: {
          slidesPerView: 3.4,
        },
        767: {
          slidesPerView: 2.4,
        },
        570: {
          slidesPerView: 1.8,
        },
        360: {
          slidesPerView: 1.2,
        },
      },
    },
    events: {
      init: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
      update: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
      resize: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
    },
  },
  ALSO_CARDS_THREE: {
    selector: ".also-section .swiper--also",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 1.2,
      spaceBetween: 12,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".also-section .swiper-pagination--also",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
        767: {
          slidesPerView: 2.4,
          spaceBetween: 12,
        },
        600: {
          slidesPerView: 1.7,
        },
      },
    },
    events: {
      init: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
      update: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
      resize: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
    },
  },
  GALLERY_BIG: {
    selector: ".gallery .swiper--gallery-big",
    breakpoint: 122300000000,

    options: {
      slidesPerView: 1,
      spaceBetween: 16,
      mousewheel: MOUSE_WHEEL_CONFIG,

      pagination: {
        el: ".gallery .swiper--gallery-big .swiper-pagination",
      },

      keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
      },

      navigation: {
        nextEl: ".gallery .arrow-swiper.next",
        prevEl: ".gallery .arrow-swiper.prev",
      },
    },
    events: {
      slideChange: (swiper) => {
        toggleVideoSwiper(swiper.slides[swiper.activeIndex]);
      },
    },
  },
  GALLERY_SMALL: {
    selector: ".gallery .swiper--gallery-small",
    breakpoint: 122300000000,

    options: {
      slidesPerView: 3,
      spaceBetween: 8,
      mousewheel: MOUSE_WHEEL_CONFIG,
      direction: "vertical",
      navigation: {
        nextEl: ".gallery .swiper--gallery-small .arrow-swiper.next",
        prevEl: ".gallery .swiper--gallery-small .arrow-swiper.prev",
      },

      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    },
  },
  PROPERTY: {
    selector: ".object-bottom__property-swiper-box .swiper--property",
    breakpoint: 10000000,

    options: {
      slidesPerView: 1.1,
      spaceBetween: 12,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".object-bottom__property-swiper-box .swiper-pagination",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 14,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
      },
    },
    events: {
      init: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
      update: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
      resize: function (swiper) {
        checkIfDisabledSwiper(swiper);
      },
    },
  },
  COMPARISON: {
    selector: ".comparison .swiper--comparison",
    breakpoint: 122300000000,

    options: {
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
        1100: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        768: {
          slidesPerView: 2,
        },
      },
    },

    events: {
      init: (swiper) => {
        setTableCountItems(swiper);
      },
      resize: (swiper) => {
        setTableCountItems(swiper);
      },
    },
  },
  RESULT_CARD: {
    selector: ".result-block .swiper--result",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 1,
      spaceBetween: 8,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".result-block .swiper--result .swiper-pagination",
      },
      breakpoints: {
        900: {
          slidesPerView: 5,
        },

        550: {
          slidesPerView: 2,
        },
      },
    },
  },
  MARKET_TABLE: {
    selector: ".marketModal .swiper--market",
    breakpoint: 122300000000,
    options: {
      ...TABLE_OPTIONS,

      navigation: {
        nextEl: ".marketModal .table-swiper .arrow-swiper.next",
        prevEl: ".marketModal .table-swiper .arrow-swiper.prev",
      },

      pagination: {
        el: ".marketModal .table-swiper .swiper-pagination",
        type: "custom",
        renderCustom: function (swiper, current, total) {
          return `<span class="current-slide">${current}</span>/<span class="total-slides">${total}</span>`;
        },
      },
    },
  },
  MAP_SIBEBAR_CARDS: {
    selector: ".map-sibebar .swiper--goods",
    breakpoint: 767,
    options: {
      slidesPerView: 1.05,
      spaceBetween: 8,
      mousewheel: MOUSE_WHEEL_CONFIG,
      breakpoints: {
        600: {
          slidesPerView: 1.8,
        },
        360: {
          slidesPerView: 1.1,
        },
      },
    },
  },
  STATIC_TABLE: {
    selector: ".object .swiper--static",
    breakpoint: 122300000000,
    options: {
      ...TABLE_OPTIONS,

      navigation: {
        nextEl: ".object .table-swiper .arrow-swiper.next",
        prevEl: ".object .table-swiper .arrow-swiper.prev",
      },

      pagination: {
        el: ".object .table-swiper .swiper-pagination",
        type: "custom",
        renderCustom: function (swiper, current, total) {
          return `<span class="current-slide">${current}</span>/<span class="total-slides">${total}</span>`;
        },
      },
    },
  },
  DEV: {
    selector: ".object-bottom__item-dev .swiper--dev",
    breakpoint: 122300000000,

    options: {
      slidesPerView: 1.2,
      spaceBetween: 12,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".object-bottom__item-dev .swiper-pagination",
      },
      navigation: {
        nextEl: ".object-bottom__item-dev .arrow-swiper.next",
        prevEl: ".object-bottom__item-dev .arrow-swiper.prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 23,
        },
        767: {
          slidesPerView: 3,
        },
        481: {
          slidesPerView: 2.1,
        },
      },
    },
  },
  EMPLOYEES: {
    selector: ".swiper-box--employees .swiper--employees",
    breakpoint: 122300000000,

    options: {
      slidesPerView: 1.2,
      spaceBetween: 8,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".swiper-box--employees .swiper-pagination",
      },
      breakpoints: {
        ...BREAKPOINTS_DEATAIL_BLOCK,
      },
    },
  },
  COMPANY_PROPERTY: {
    selector: ".companies-detail .swiper--property",
    breakpoint: 767,
    options: {
      slidesPerView: 1.1,
      spaceBetween: 12,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".companies-detail .swiper-pagination--property",
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
      },
    },
  },
  DETAIL: {
    selector: ".swiper-box--detail .swiper--detail",
    breakpoint: 122300000000,

    options: {
      slidesPerView: 1.2,
      spaceBetween: 8,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".swiper-box--detail .swiper-pagination",
      },
      breakpoints: {
        ...BREAKPOINTS_DEATAIL_BLOCK,
      },
    },
  },
  GALLERY_CAPTION: {
    selector: ".swiper--gallery-caption",
    breakpoint: 122300000000,

    options: {
      slidesPerView: 1,
      spaceBetween: 8,
      mousewheel: MOUSE_WHEEL_CONFIG,
      navigation: {
        nextEl: ".swiper--gallery-caption .arrow-swiper.next",
        prevEl: ".swiper--gallery-caption .arrow-swiper.prev",
      },
    },
  },
};
