import { toggleVideoSwiper } from "./functions.js";

export const MOUSE_WHEEL_CONFIG = {
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
        },
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
      pagination: {
        el: ".also-section .swiper-pagination--also",
      },
    },
  },
  ALSO_CARDS_THREE: {
    selector: ".also-section .swiper--also",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 3,
      spaceBetween: 14,
      pagination: {
        el: ".also-section .swiper-pagination--also",
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
    },
  },
  PROPERTY: {
    selector: ".object-bottom__property-swiper-box .swiper--property",
    breakpoint: 122300000000,
    
    options: {
      slidesPerView: 3,
      spaceBetween: 14,
      mousewheel: MOUSE_WHEEL_CONFIG,
      pagination: {
        el: ".object-bottom__property-swiper-box .swiper-pagination",
      },
    },
  },
  COMPARISON: {
    selector: ".comparison .swiper--comparison",
    breakpoint: 122300000000,
    
    options: {
      slidesPerView: 3,
      spaceBetween: 32,
      mousewheel: MOUSE_WHEEL_CONFIG,
      navigation: {
        nextEl: ".comparison .arrow-swiper.next",
        prevEl: ".comparison .arrow-swiper.prev",
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
};
