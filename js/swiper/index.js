export const SWIPERS = {
  IMG_GOODS: {
    selector: ".catalogy .swiper--good-img",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
  },
  PRICING_CARD: {
    selector: ".catalogy .swiper--price",
    breakpoint: 122300000000,
    options: {
      slidesPerView: 5,
      spaceBetween: 8,
      pagination: {
        el: ".catalogy .swiper--price .swiper-pagination",
       type: 'progressbar'
      },
    },
  },
};
