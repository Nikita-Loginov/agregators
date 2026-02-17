export const renderComparisonTable = (table, categories, data) => {
  table.innerHTML = "";

  let currentItemsWrapper = null;

  categories.forEach((category) => {
    if (category.type === "decor") {
      currentItemsWrapper = null;
      table.append(renderDecorRow(category.title));
      return;
    }

    if (!currentItemsWrapper) {
      currentItemsWrapper = document.createElement("div");
      currentItemsWrapper.className = "table-grid__items";
      table.append(currentItemsWrapper);
    }

    currentItemsWrapper.append(renderDataRow(category, data));
  });
};


const renderDecorRow = (title) => {
  const decor = document.createElement("div");
  decor.className = "table-grid__decor";

  decor.innerHTML = `
      <div class="table-grid__decor-cell table-grid__decor-cell--big table-grid__decor-cell--gray-color-100">
        <p class="p1 medium-font">${title}</p>
      </div>
    `;

  return decor;
};

const renderDataRow = (category, data) => {
  const row = document.createElement("div");
  row.className = "table-grid__row";

  row.innerHTML = `
    <div class="table-grid__cell">
      <p class="p2 semibold-font">${category.title}</p>
    </div>
  `;

  data.forEach((item, index) => {
    const value = item.items?.[category.type] ?? "-";

    row.innerHTML += `
      <div class="table-grid__cell" data-col="${index}">
        <p class="p2">${value}</p>
      </div>
    `;
  });

  return row;
};

