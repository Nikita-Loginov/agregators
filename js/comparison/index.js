import { categoryItems, comparisonData } from "./data.js";
import { renderGoodsSwiper } from "./goods.js";
import { renderComparisonTable } from "./comparisonTable.js";
import { initGoodsSwiper } from "./goods.js";

export const initComparison = () => {
  const table = document.querySelector('[data-block="comparison-goods-table"]');
  const goodsSwiperEl = document.querySelector(
    '[data-block="comparison-goods-swiper"]'
  );

  if (!table || !goodsSwiperEl) return;

  renderComparisonTable(table, categoryItems, comparisonData);
  renderGoodsSwiper(goodsSwiperEl, comparisonData);

  const goodsSwiper = initGoodsSwiper(goodsSwiperEl);

  syncTableWithSwiper(goodsSwiper, table);
};

const syncTableWithSwiper = (swiper, table) => {
  if (!swiper) return;

  const updateTable = () => {
    const start = swiper.activeIndex;
    const visibleCount = swiper.params.slidesPerView === "auto"
      ? 1
      : swiper.params.slidesPerView;

    const end = start + visibleCount - 1;

    table.querySelectorAll("[data-col]").forEach((cell) => {
      const colIndex = Number(cell.dataset.col);

      cell.style.display =
        colIndex >= start && colIndex <= end ? "" : "none";
    });
  };

  swiper.on("init", updateTable);
  swiper.on("slideChange", updateTable);
  swiper.on("resize", updateTable);

  updateTable();
};

