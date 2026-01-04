export const initCharts = (chartsConfig = []) => {
  chartsConfig.forEach(({ id, config }) => {
    const ctx = document.getElementById(id);

    new Chart(ctx, { ...config });
  });
};
