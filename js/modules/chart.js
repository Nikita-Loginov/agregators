import { hiddenLoader } from "./loader.js";

export const initCharts = (chartsConfig = []) => {
  chartsConfig.forEach(({ id, config }) => {
    const ctx = document.getElementById(id);

    hiddenLoader(ctx)

    new Chart(ctx, { ...config });
  });
};
