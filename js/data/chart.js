import { getRetinaDPR } from "../modules/functions.js";

export const charts = {
  market: {
    id: "chart-market",
    config: {
      type: "line",
      data: {
        labels: [
          "Jan ‘24",
          "Feb ‘24",
          "Mar ‘24",
          "Apr ‘24",
          "May ‘24",
          "Jun ‘24",
          "Jul ‘24",
          "Aug ‘24",
          "Sep ‘24",
          "Oct ‘24",
          "Nov ‘24",
          "Dec ‘24",
        ],
        datasets: [
          {
            label: "Abu Dhabi median price",
            data: [450, 420, 475, 480, 450, 500, 510, 515, 505, 530, 535, 540],
            borderColor: "#DA0B35",
            backgroundColor: "transparent",
            borderColor: "#DA0B35",
            backgroundColor: "#DA0B35",
            pointBackgroundColor: "#DA0B35",
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 2,
            pointRadius: window.innerWidth <= 768 ? 0 : 6,
            pointHoverRadius: 8,
            borderWidth: 2,
            tension: 0.4,
            fill: {
              target: "origin",
              above: "rgba(218, 11, 53, 0.1)",
            },
          },
          {
            label: "Dubai median price",
            data: [600, 610, 625, 640, 420, 660, 670, 680, 690, 710, 730, 750],
            borderColor: "#636899",
            backgroundColor: "#636899",
            pointBackgroundColor: "#636899",
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 2,
            pointRadius: window.innerWidth <= 768 ? 0 : 6,
            pointHoverRadius: 8,
            borderWidth: 2,
            tension: 0.4,
            fill: {
              target: "-1",
              above: "rgba(99, 104, 153, 0.1)",
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: getRetinaDPR() || 1,
        scales: {
          x: {
            ticks: {
              color: "#6C7280",
              autoSkip: true,
              autoSkipPadding: 10,
              callback: function (value, index, values) {
                if (window.innerWidth <= 768) {
                  const labels = ["Jan", "Jun", "Dec"];
                  if (index === 0) return labels[0];
                  if (index === 5) return labels[1];
                  if (index === 11) return labels[2];
                  return null;
                }

                return this.getLabelForValue(value);
              },
            },
            grid: {
              display: false,
              color: "rgba(108, 114, 128, 0.1)",
            },
            title: {
              display: false,
            },
          },
          y: {
            beginAtZero: false,
            min: 400,
            max: 800,
            ticks: {
              color: "#6C7280",
              callback: function (value) {
                if (window.innerWidth <= 768) {
                  if (value === 500) return "$ 500k";
                  if (value === 600) return "$ 600k";
                  if (value === 700) return "$ 700k";
                  return null;
                }

                return `$ ${value}k`;
              },
              stepSize: function (context) {
                return window.innerWidth <= 768 ? 100 : 50;
              },
            },
            title: {
              display: false,
            },
            grid: {
              display: true,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    },
  },
  priceChange: {
    id: "chart-price-change",
    config: {
      type: "line",
      data: {
        labels: ["01.2024", "", "", "06.2024", "12.2024"],
        datasets: [
          {
            label: "Dynamics of Price Change",
            data: [172000, 175000, 171000, 185000, 187000],
            borderColor: "#636899",
            backgroundColor: "transparent",
            pointBackgroundColor: "#636899",
            pointBorderColor: "#FFFFFF",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 2,
            tension: 0.4,
            fill: {
              target: "-1",
              above: "rgba(99, 104, 153, 0.1)",
            },
          },
        ],
      },
      options: {
        responsive: true,
        devicePixelRatio: getRetinaDPR() || 1,
        scales: {
          x: {
            ticks: {
              color: "#6C7280",
            },
            grid: {
              display: false,
              color: "rgba(108, 114, 128, 0.1)",
            },
            title: {
              display: false,
            },
          },
          y: {
            beginAtZero: false,
            position: "right",
            min: 170000,
            max: 190000,
            ticks: {
              color: "#6C7280",

              stepSize: 10000,
            },
            title: {
              display: false,
            },
            grid: {
              display: true,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    },
  },
};
