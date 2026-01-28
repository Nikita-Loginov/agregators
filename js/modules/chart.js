import { hiddenLoader } from "./loader.js";
import { chartsItems } from "../data/chart.js";

const chartsMap = new Map();

export const initCharts = (chartsConfig = []) => {
  chartsConfig.forEach(({ id, config }) => {
    const ctx = document.getElementById(id);
    if (!ctx) return;

    hiddenLoader(ctx);

    const chart = new Chart(ctx, { ...config });
    chartsMap.set(id, chart);

    const relative = ctx.closest('[data-chart="relative"]');
    const select = relative?.querySelector('[data-chart="select"] select');

    if (!select?.tomselect) return;

    const ts = select.tomselect;

    syncChartWithSelect(chart, ts, relative);

    ts.on("item_add", (value) => {
      addDataset(chart, value, relative);
    });

    ts.on("item_remove", (value) => {
      removeDataset(chart, value, relative);
    });
  });
};

const syncChartWithSelect = (chart, ts, box) => {
  const values = ts.getValue();

  (Array.isArray(values) ? values : [values]).forEach((value) => {
    addDataset(chart, value, box);
  });

  chart.update();
};

const removeDataset = (chart, value, box) => {
  const item = chartsItems[value];
  if (!item) return;

  chart.data.datasets = chart.data.datasets.filter(
    (ds) => ds.label !== item.label
  );

  box
    .querySelectorAll(`[data-chart-value="${value}"]`)
    .forEach((el) => el.remove());

  chart.update();
};

const addDataset = (chart, value, box) => {
  const item = chartsItems[value];
  if (!item) return;

  const exists = chart.data.datasets.some((ds) => ds.label === item.label);
  if (exists) return;

  chart.data.datasets.push(item);

  renderBadge(box, value, item);
  renderBtn(box, value, item);

  chart.update();
};

const renderBtn = (box, value, item) => {
  const boxBtns = box.querySelector('[data-chart="btns"]');

  boxBtns.insertAdjacentHTML(
    "beforeend",
    `<button
      class="button ${item.classBtn}"
      type="button"
      data-chart-value="${value}"
      
    >
      <p class="p2 regular-font">${value}</p>
      <div class="icon" data-chart="delete-btn">
        <span class="kit-icon close-md"></span>
      </div>
    </button>`
  );
};

const renderBadge = (box, value, item) => {
  if (!box) return;
  const boxBadges = box.querySelector('[data-chart="badges"]');
  if (!boxBadges) return;

  if (boxBadges.querySelector(`[data-chart-value="${value}"]`)) return;

  boxBadges.insertAdjacentHTML(
    "beforeend",
    `
    <div
      class="badge ${item.classBadge}"
      data-chart-value="${value}"
      style="gap: 8px"
    >
      <div class="dot ${item.classBadgeDot}"></div>

      <p
        class="p3 regular-font"
        style="line-height: var(--line-height-tighter)"
      >
        ${item.label}
      </p>
    </div>
    `
  );
};

export const handleChartDeleteClick = (e) => {
  const deleteBtn = e.target.closest('[data-chart="delete-btn"]');
  if (!deleteBtn) return;

  const btn = deleteBtn.closest("[data-chart-value]");
  if (!btn) return;

  const value = btn.dataset.chartValue;
  if (!value) return;

  const relative = btn.closest('[data-chart="relative"]');
  if (!relative) return;

  const select = relative.querySelector('[data-chart="select"] select');
  if (!select?.tomselect) return;

  select.tomselect.removeItem(value);
};
